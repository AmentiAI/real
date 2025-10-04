import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'

// Query helper function
async function query(text: string, params?: any[]) {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
}

interface SEOAnalysisResult {
  id: string
  title: string
  slug: string
  url: string
  meta_title?: string
  meta_description?: string
  focus_keyword?: string
  og_title?: string
  og_description?: string
  og_image?: string
  canonical_url?: string
  robots_index?: boolean
  robots_follow?: boolean
  schema_type?: string
  seo_score?: number
  published: boolean
  word_count?: number
  heading_structure?: {
    h1_count: number
    h2_count: number
    h3_count: number
    h4_count: number
    has_h1: boolean
  }
  internal_links?: number
  external_links?: number
  image_count?: number
  images_with_alt?: number
  readability_score?: number
  keyword_density?: number
  content_freshness?: string
  page_speed_score?: number
}

async function analyzePageSEO(url: string): Promise<Partial<SEOAnalysisResult>> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SEO-Analyzer/1.0)'
      }
    })
    
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.status}`)
    }
    
    const html = await response.text()
    
    // Parse HTML content
    const dom = new DOMParser().parseFromString(html, 'text/html')
    
    // Extract meta tags
    const metaTitle = dom.querySelector('title')?.textContent || ''
    const metaDescription = dom.querySelector('meta[name="description"]')?.getAttribute('content') || ''
    const ogTitle = dom.querySelector('meta[property="og:title"]')?.getAttribute('content') || ''
    const ogDescription = dom.querySelector('meta[property="og:description"]')?.getAttribute('content') || ''
    const ogImage = dom.querySelector('meta[property="og:image"]')?.getAttribute('content') || ''
    const canonicalUrl = dom.querySelector('link[rel="canonical"]')?.getAttribute('href') || ''
    
    // Robots meta
    const robotsMeta = dom.querySelector('meta[name="robots"]')?.getAttribute('content') || ''
    const robotsIndex = !robotsMeta.includes('noindex')
    const robotsFollow = !robotsMeta.includes('nofollow')
    
    // Extract main content
    const mainContent = dom.querySelector('main') || dom.querySelector('article') || dom.querySelector('.content') || dom.body
    const contentText = mainContent?.textContent || ''
    
    // Word count
    const wordCount = contentText.trim().split(/\s+/).filter(word => word.length > 0).length
    
    // Heading structure
    const h1Elements = dom.querySelectorAll('h1')
    const h2Elements = dom.querySelectorAll('h2')
    const h3Elements = dom.querySelectorAll('h3')
    const h4Elements = dom.querySelectorAll('h4')
    
    const headingStructure = {
      h1_count: h1Elements.length,
      h2_count: h2Elements.length,
      h3_count: h3Elements.length,
      h4_count: h4Elements.length,
      has_h1: h1Elements.length > 0
    }
    
    // Links analysis
    const allLinks = dom.querySelectorAll('a[href]')
    let internalLinks = 0
    let externalLinks = 0
    
    allLinks.forEach(link => {
      const href = link.getAttribute('href')
      if (href) {
        if (href.startsWith('http') && !href.includes('amentiai.com')) {
          externalLinks++
        } else if (href.startsWith('/') || href.includes('amentiai.com')) {
          internalLinks++
        }
      }
    })
    
    // Images analysis
    const allImages = dom.querySelectorAll('img')
    const imagesWithAlt = Array.from(allImages).filter(img => img.getAttribute('alt') && img.getAttribute('alt')!.trim().length > 0).length
    
    // Basic readability score (simplified Flesch Reading Ease)
    const sentences = contentText.split(/[.!?]+/).filter(s => s.trim().length > 0).length
    const words = contentText.trim().split(/\s+/).filter(word => word.length > 0).length
    const syllables = contentText.toLowerCase().replace(/[^a-z]/g, '').length * 0.5 // Rough estimate
    
    let readabilityScore = 0
    if (sentences > 0 && words > 0) {
      const avgWordsPerSentence = words / sentences
      const avgSyllablesPerWord = syllables / words
      readabilityScore = Math.max(0, Math.min(100, 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord)))
    }
    
    // Calculate SEO score
    let seoScore = 0
    if (metaTitle && metaTitle.length > 0) seoScore += 10
    if (metaDescription && metaDescription.length > 0) seoScore += 10
    if (headingStructure.has_h1) seoScore += 10
    if (wordCount > 300) seoScore += 10
    if (imagesWithAlt === allImages.length && allImages.length > 0) seoScore += 10
    if (robotsIndex) seoScore += 10
    if (canonicalUrl) seoScore += 10
    if (internalLinks > 0) seoScore += 10
    if (readabilityScore > 60) seoScore += 10
    if (ogTitle && ogDescription) seoScore += 10
    
    return {
      meta_title: metaTitle,
      meta_description: metaDescription,
      og_title: ogTitle,
      og_description: ogDescription,
      og_image: ogImage,
      canonical_url: canonicalUrl,
      robots_index: robotsIndex,
      robots_follow: robotsFollow,
      word_count: wordCount,
      heading_structure: headingStructure,
      internal_links: internalLinks,
      external_links: externalLinks,
      image_count: allImages.length,
      images_with_alt: imagesWithAlt,
      readability_score: Math.round(readabilityScore),
      seo_score: seoScore,
      content_freshness: new Date().toISOString().split('T')[0]
    }
  } catch (error) {
    console.error(`Error analyzing page ${url}:`, error)
    return {
      seo_score: 0,
      word_count: 0,
      readability_score: 0,
      content_freshness: new Date().toISOString().split('T')[0]
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get all pages from database (include all pages)
    const pagesResult = await query(`
      SELECT id, title, slug, meta_title, meta_description, meta_keywords, 
             published, updated_at, content, description,
             og_title, og_description, og_image, canonical_url,
             robots_index, robots_follow, schema_type
      FROM pages 
      ORDER BY created_at DESC
    `)
    
    const pages = pagesResult.rows
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://amentiai.com'
    
    const analysisResults: SEOAnalysisResult[] = []
    
    // Analyze each page
    for (const page of pages) {
      const url = `${baseUrl}/${page.slug}`.replace('//', '/').replace(':/', '://')
      
      console.log(`Analyzing page: ${url}`)
      
      // Get real-time SEO analysis
      const seoAnalysis = await analyzePageSEO(url)
      
      // Combine database data with real-time analysis
      const result: SEOAnalysisResult = {
        id: page.id.toString(),
        title: page.title,
        slug: page.slug,
        url: url,
        meta_title: seoAnalysis.meta_title || page.meta_title,
        meta_description: seoAnalysis.meta_description || page.meta_description,
        focus_keyword: page.focus_keyword,
        og_title: seoAnalysis.og_title || page.og_title,
        og_description: seoAnalysis.og_description || page.og_description,
        og_image: seoAnalysis.og_image || page.og_image,
        canonical_url: seoAnalysis.canonical_url || page.canonical_url,
        robots_index: seoAnalysis.robots_index ?? page.robots_index,
        robots_follow: seoAnalysis.robots_follow ?? page.robots_follow,
        schema_type: page.schema_type,
        published: page.published,
        ...seoAnalysis
      }
      
      analysisResults.push(result)
    }
    
    return NextResponse.json({
      success: true,
      data: analysisResults,
      analyzed_at: new Date().toISOString(),
      total_pages: analysisResults.length
    })
    
  } catch (error) {
    console.error('Error in SEO analysis:', error)
    return NextResponse.json(
      { 
        error: 'Failed to analyze SEO data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    console.log('Fetching pages from database...')
    
    // First check if pages table exists
    const tableCheck = await query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'pages'
      )
    `)
    
    if (!tableCheck.rows[0].exists) {
      console.log('Pages table does not exist, returning sample data')
      return NextResponse.json({
        success: true,
        data: [
          {
            id: '1',
            title: 'Home',
            slug: '',
            meta_title: 'Amenti AI - Digital Marketing & SEO Services | Rhode Island',
            meta_description: 'Rhode Island premier digital marketing agency.',
            focus_keyword: 'digital marketing Rhode Island',
            canonical_url: 'https://amentiai.com',
            robots_index: true,
            robots_follow: true,
            schema_type: 'Organization',
            published: true,
            content_freshness: new Date().toISOString().split('T')[0]
          }
        ],
        total_pages: 1,
        note: 'Using sample data - pages table not found. Run database migration to create pages table.'
      })
    }
    
    // Return cached analysis or trigger new analysis (include all pages)
    const pagesResult = await query(`
      SELECT id, title, slug, meta_title, meta_description, meta_keywords, 
             published, updated_at, content, description,
             og_title, og_description, og_image, canonical_url,
             robots_index, robots_follow, schema_type
      FROM pages 
      ORDER BY created_at DESC
    `)
    
    console.log(`Found ${pagesResult.rows.length} total pages (published and drafts)`)
    
    const pages = pagesResult.rows.map(page => {
      // Calculate word count from content and description
      const content = page.content || ''
      const description = page.description || ''
      const metaDescription = page.meta_description || ''
      const fullText = `${content} ${description} ${metaDescription}`.trim()
      
      // Remove HTML tags and count words
      const textWithoutHtml = fullText.replace(/<[^>]*>/g, ' ')
      const words = textWithoutHtml.split(/\s+/).filter(word => word.length > 0)
      const wordCount = words.length

      return {
        id: page.id.toString(),
        title: page.title,
        slug: page.slug,
        meta_title: page.meta_title,
        meta_description: page.meta_description,
        focus_keyword: page.meta_keywords, // Use meta_keywords as focus_keyword
        og_title: page.og_title,
        og_description: page.og_description,
        og_image: page.og_image,
        canonical_url: page.canonical_url,
        robots_index: page.robots_index,
        robots_follow: page.robots_follow,
        schema_type: page.schema_type,
        published: page.published,
        word_count: wordCount,
        content_freshness: page.updated_at ? new Date(page.updated_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
      }
    })
    
    return NextResponse.json({
      success: true,
      data: pages,
      total_pages: pages.length,
      note: 'Use POST /api/admin/seo/analyze to get real-time SEO analysis'
    })
    
  } catch (error) {
    console.error('Error fetching pages:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch pages',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { query } from '@/lib/db'

interface Page {
  id: string
  title: string
  slug: string
  description: string
  content: string
  featured_image?: string
  meta_title?: string
  meta_description?: string
  meta_keywords?: string
  nav_location?: string
  text_overlay?: 'light' | 'dark'
  published: boolean
  created_at: string
  updated_at: string
  // SEO fields
  og_title?: string
  og_description?: string
  og_image?: string
  canonical_url?: string
}

export async function generateMetadata({ params }: { params: { slug: string[] } }): Promise<Metadata> {
  const slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug
  
  try {
    const result = await query('SELECT * FROM pages WHERE slug = $1 AND published = true', [slug])
    const page = result.rows[0] as Page
    
    if (!page) {
      return {
        title: 'Page Not Found',
      }
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://amentiai.com'
    const canonicalUrl = page.canonical_url || `${baseUrl}/${slug}`
    const ogImage = page.og_image || page.featured_image || `${baseUrl}/images/og-default.jpg`
    
    // Use database SEO fields when available, fallback to generated ones
    const metaTitle = page.meta_title || page.title
    const metaDescription = page.meta_description || page.description
    const ogTitle = page.og_title || metaTitle
    const ogDescription = page.og_description || metaDescription

    return {
      title: metaTitle,
      description: metaDescription,
      keywords: page.meta_keywords,
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: ogTitle,
        description: ogDescription,
        url: canonicalUrl,
        siteName: '{branding?.company_name || "Amenti AI"}',
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: page.title,
          },
        ],
        locale: 'en_US',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: ogTitle,
        description: ogDescription,
        images: [ogImage],
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    }
  } catch (error) {
    console.error('Error fetching page for metadata:', error)
    return {
      title: 'Page Not Found',
    }
  }
}

export default async function DynamicPage({ params }: { params: { slug: string[] } }) {
  const slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug
  
  try {
    const result = await query('SELECT * FROM pages WHERE slug = $1 AND published = true', [slug])
    const page = result.rows[0] as Page
    
    if (!page) {
      notFound()
    }

    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Enhanced Hero Section */}
        {page.featured_image ? (
          <section className="relative h-[600px] md:h-[700px] lg:h-[800px] xl:h-[900px] bg-slate-900 overflow-hidden">
            <img
              src={page.featured_image}
              alt={page.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-blue-900/60 to-indigo-900/80"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center max-w-4xl mx-auto px-6">
                <h1 className="text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
                  {page.title}
                </h1>
                {page.description && (
                  <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                    {page.description}
                  </p>
                )}
              </div>
            </div>
          </section>
        ) : (
          <section className="relative pt-24 pb-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
              <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
              
              {/* Grid Pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
              <div className="text-center">
                <h1 className="text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
                  {page.title}
                </h1>
                {page.description && (
                  <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
                    {page.description}
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Enhanced Content Section */}
        <section className="py-24 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-4xl mx-auto px-6 lg:px-8 relative">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/50">
              <div 
                className="prose prose-lg max-w-none prose-slate"
                dangerouslySetInnerHTML={{ __html: page.content }}
              />
            </div>
          </div>
        </section>
      </main>
    )
  } catch (error) {
    console.error('Error fetching page:', error)
    notFound()
  }
}

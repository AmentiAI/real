const { Pool } = require('pg')
require('dotenv').config({ path: '.env.local' })

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

// ALL existing pages with their content
const allPages = [
  // Main Pages
  {
    title: 'Home',
    slug: '',
    description: 'Amenti AI - Rhode Island\'s premier digital marketing agency. We help businesses grow with proven SEO, web design, and marketing strategies.',
    content: '<main>Homepage content with hero section, services, portfolio, testimonials, and contact form...</main>',
    meta_title: 'Amenti AI - Digital Marketing & SEO Services | Rhode Island',
    meta_description: 'Rhode Island\'s premier digital marketing agency. Proven SEO, web design, and marketing strategies that help businesses grow.',
    meta_keywords: 'digital marketing Rhode Island, SEO services, web design, marketing agency, Providence RI',
    og_title: 'Amenti AI - Digital Marketing & SEO Services | Rhode Island',
    og_description: 'Rhode Island\'s premier digital marketing agency. Proven SEO, web design, and marketing strategies.',
    og_type: 'website',
    twitter_card: 'summary_large_image',
    canonical_url: 'https://amentiai.com',
    robots_index: true,
    robots_follow: true,
    schema_type: 'Organization',
    focus_keyword: 'digital marketing Rhode Island',
    seo_score: 92,
    published: true
  },
  {
    title: 'About Us',
    slug: 'about',
    description: 'Learn about Amenti AI, Rhode Island\'s premier digital marketing agency. Our team of experts helps businesses grow with proven SEO, web design, and marketing strategies.',
    content: '<main>About page content including company story, mission, team, values, and local expertise...</main>',
    meta_title: 'About Amenti AI - Rhode Island Digital Marketing Experts',
    meta_description: 'Learn about Amenti AI, Rhode Island\'s premier digital marketing agency. Our team of experts helps businesses grow with proven strategies.',
    meta_keywords: 'about Amenti AI, Rhode Island digital marketing agency, SEO experts, web design team, digital marketing company',
    og_title: 'About Amenti AI - Rhode Island Digital Marketing Experts',
    og_description: 'Learn about Amenti AI, Rhode Island\'s premier digital marketing agency.',
    og_type: 'website',
    twitter_card: 'summary_large_image',
    canonical_url: 'https://amentiai.com/about',
    robots_index: true,
    robots_follow: true,
    schema_type: 'Organization',
    focus_keyword: 'Rhode Island digital marketing agency',
    seo_score: 85,
    published: true
  },
  {
    title: 'Pricing',
    slug: 'pricing',
    description: 'Transparent pricing for professional digital marketing services. Choose from our SEO, web design, and complete growth packages. No hidden fees, guaranteed results.',
    content: '<main>Pricing page with detailed packages for SEO, web design, and growth packages...</main>',
    meta_title: 'Pricing - Amenti AI Digital Marketing Services | Rhode Island',
    meta_description: 'Transparent pricing for professional digital marketing services. Choose from our SEO, web design, and complete growth packages.',
    meta_keywords: 'digital marketing pricing, SEO pricing, web design cost, Rhode Island marketing rates, transparent pricing',
    og_title: 'Pricing - Amenti AI Digital Marketing Services',
    og_description: 'Transparent pricing for professional digital marketing services.',
    og_type: 'website',
    twitter_card: 'summary_large_image',
    canonical_url: 'https://amentiai.com/pricing',
    robots_index: true,
    robots_follow: true,
    schema_type: 'Service',
    focus_keyword: 'digital marketing pricing',
    seo_score: 78,
    published: true
  },
  {
    title: 'Blog',
    slug: 'blog',
    description: 'Stay updated with the latest digital marketing trends, SEO tips, and business growth strategies from Amenti AI experts.',
    content: '<main>Blog listing page with featured articles, search functionality, and newsletter signup...</main>',
    meta_title: 'Blog - Digital Marketing Insights | Amenti AI',
    meta_description: 'Stay updated with the latest digital marketing trends, SEO tips, and business growth strategies from Amenti AI experts.',
    meta_keywords: 'digital marketing blog, SEO tips, business growth, marketing strategies, Rhode Island marketing insights',
    og_title: 'Blog - Digital Marketing Insights | Amenti AI',
    og_description: 'Digital marketing insights and strategies.',
    og_type: 'website',
    twitter_card: 'summary_large_image',
    canonical_url: 'https://amentiai.com/blog',
    robots_index: true,
    robots_follow: true,
    schema_type: 'Blog',
    focus_keyword: 'digital marketing blog',
    seo_score: 92,
    published: true
  },
  {
    title: 'Case Studies',
    slug: 'case-studies',
    description: 'Real results from real clients. See how Amenti AI has helped businesses across Rhode Island achieve remarkable growth through our proven digital marketing strategies.',
    content: '<main>Case studies showcasing real results from roofing companies, law firms, restaurants, medical practices, fitness centers, and real estate...</main>',
    meta_title: 'Case Studies - Real Results from Amenti AI Clients',
    meta_description: 'Real results from real clients. See how Amenti AI has helped businesses across Rhode Island achieve remarkable growth.',
    meta_keywords: 'case studies, digital marketing results, SEO success stories, Rhode Island marketing results, client success',
    og_title: 'Case Studies - Real Results from Amenti AI Clients',
    og_description: 'Real results from real clients. See how Amenti AI has helped businesses achieve remarkable growth.',
    og_type: 'website',
    twitter_card: 'summary_large_image',
    canonical_url: 'https://amentiai.com/case-studies',
    robots_index: true,
    robots_follow: true,
    schema_type: 'WebPage',
    focus_keyword: 'digital marketing case studies',
    seo_score: 88,
    published: true
  },
  {
    title: 'Contact Us',
    slug: 'contact',
    description: 'Get in touch with Amenti AI for your digital marketing needs. Free consultation and custom strategy for your business growth.',
    content: '<main>Contact form, company information, office hours, and FAQ section...</main>',
    meta_title: 'Contact Us - Free Digital Marketing Consultation | Amenti AI',
    meta_description: 'Get in touch with Amenti AI for your digital marketing needs. Free consultation and custom strategy for your business growth.',
    meta_keywords: 'contact Amenti AI, digital marketing consultation, Rhode Island marketing agency contact, free SEO audit',
    og_title: 'Contact Us - Free Digital Marketing Consultation',
    og_description: 'Get in touch with Amenti AI for your digital marketing needs.',
    og_type: 'website',
    twitter_card: 'summary_large_image',
    canonical_url: 'https://amentiai.com/contact',
    robots_index: true,
    robots_follow: true,
    schema_type: 'ContactPage',
    focus_keyword: 'contact digital marketing agency',
    seo_score: 88,
    published: true
  },
  {
    title: 'Checkout',
    slug: 'checkout',
    description: 'Secure checkout for Amenti AI digital marketing services. Choose your package and start growing your business today.',
    content: '<main>Checkout form for digital marketing packages...</main>',
    meta_title: 'Checkout - Secure Payment | Amenti AI',
    meta_description: 'Secure checkout for Amenti AI digital marketing services. Choose your package and start growing your business.',
    meta_keywords: 'checkout, payment, digital marketing packages, secure payment, Amenti AI services',
    og_title: 'Checkout - Secure Payment | Amenti AI',
    og_description: 'Secure checkout for digital marketing services.',
    og_type: 'website',
    twitter_card: 'summary',
    canonical_url: 'https://amentiai.com/checkout',
    robots_index: false,
    robots_follow: true,
    schema_type: 'WebPage',
    focus_keyword: 'digital marketing checkout',
    seo_score: 65,
    published: false
  },

  // Industries Pages
  {
    title: 'Industries',
    slug: 'industries',
    description: 'Specialized digital marketing services for roofers, lawyers, contractors, and other industries. Custom strategies that deliver results.',
    content: '<main>Industry-specific marketing services overview...</main>',
    meta_title: 'Industry-Specific Digital Marketing Services | Amenti AI',
    meta_description: 'Specialized digital marketing services for roofers, lawyers, contractors, and other industries. Custom strategies that deliver results.',
    meta_keywords: 'industry marketing, roofer SEO, lawyer marketing, contractor advertising, industry-specific digital marketing',
    og_title: 'Industry-Specific Digital Marketing Services',
    og_description: 'Specialized digital marketing services for different industries.',
    og_type: 'website',
    twitter_card: 'summary_large_image',
    canonical_url: 'https://amentiai.com/industries',
    robots_index: true,
    robots_follow: true,
    schema_type: 'WebPage',
    focus_keyword: 'industry digital marketing',
    seo_score: 82,
    published: true
  },
  {
    title: 'Digital Marketing for Roofers',
    slug: 'industries/roofers',
    description: 'Specialized digital marketing for roofing contractors. Local SEO, Google Ads, and lead generation strategies designed for roofing companies.',
    content: '<main>Roofing-specific marketing content including local SEO, lead generation, and roofing industry expertise...</main>',
    meta_title: 'Digital Marketing for Roofers | Rhode Island Roofing SEO',
    meta_description: 'Specialized digital marketing for roofing contractors. Local SEO, Google Ads, and lead generation for roofing companies.',
    meta_keywords: 'roofer marketing, roofing SEO, contractor marketing, roofing leads, Rhode Island roofers',
    og_title: 'Digital Marketing for Roofers | Rhode Island',
    og_description: 'Specialized digital marketing for roofing contractors.',
    og_type: 'website',
    twitter_card: 'summary_large_image',
    canonical_url: 'https://amentiai.com/industries/roofers',
    robots_index: true,
    robots_follow: true,
    schema_type: 'Service',
    focus_keyword: 'roofer digital marketing',
    seo_score: 86,
    published: true
  },
  {
    title: 'Digital Marketing for Lawyers',
    slug: 'industries/lawyers',
    description: 'Professional digital marketing for law firms. SEO, content marketing, and lead generation strategies tailored for legal practices.',
    content: '<main>Legal marketing content including attorney SEO, law firm marketing, and legal industry expertise...</main>',
    meta_title: 'Digital Marketing for Lawyers | Law Firm SEO Services',
    meta_description: 'Professional digital marketing for law firms. SEO, content marketing, and lead generation for legal practices.',
    meta_keywords: 'lawyer marketing, law firm SEO, attorney marketing, legal marketing, law firm leads',
    og_title: 'Digital Marketing for Lawyers | Law Firm SEO',
    og_description: 'Professional digital marketing for law firms.',
    og_type: 'website',
    twitter_card: 'summary_large_image',
    canonical_url: 'https://amentiai.com/industries/lawyers',
    robots_index: true,
    robots_follow: true,
    schema_type: 'Service',
    focus_keyword: 'lawyer digital marketing',
    seo_score: 84,
    published: true
  },
  {
    title: 'Digital Marketing for Contractors',
    slug: 'industries/contractors',
    description: 'Construction contractor digital marketing services. Local SEO, Google Business optimization, and lead generation for construction companies.',
    content: '<main>Contractor marketing content including construction SEO, contractor leads, and construction industry expertise...</main>',
    meta_title: 'Digital Marketing for Contractors | Construction SEO',
    meta_description: 'Construction contractor digital marketing services. Local SEO, Google Business optimization, and lead generation.',
    meta_keywords: 'contractor marketing, construction SEO, contractor leads, construction marketing, contractor advertising',
    og_title: 'Digital Marketing for Contractors | Construction SEO',
    og_description: 'Construction contractor digital marketing services.',
    og_type: 'website',
    twitter_card: 'summary_large_image',
    canonical_url: 'https://amentiai.com/industries/contractors',
    robots_index: true,
    robots_follow: true,
    schema_type: 'Service',
    focus_keyword: 'contractor digital marketing',
    seo_score: 83,
    published: true
  },

  // Locations Pages
  {
    title: 'Digital Marketing in Providence',
    slug: 'locations/providence',
    description: 'Local digital marketing services for Providence, RI businesses. SEO, web design, and marketing strategies for Providence companies.',
    content: '<main>Providence-specific marketing content including local SEO, Providence business directory, and local market expertise...</main>',
    meta_title: 'Digital Marketing in Providence RI | Local SEO Services',
    meta_description: 'Local digital marketing services for Providence, RI businesses. SEO, web design, and marketing strategies for Providence companies.',
    meta_keywords: 'Providence digital marketing, Providence SEO, local marketing Providence, Rhode Island marketing',
    og_title: 'Digital Marketing in Providence RI',
    og_description: 'Local digital marketing services for Providence, RI businesses.',
    og_type: 'website',
    twitter_card: 'summary_large_image',
    canonical_url: 'https://amentiai.com/locations/providence',
    robots_index: true,
    robots_follow: true,
    schema_type: 'LocalBusiness',
    focus_keyword: 'Providence digital marketing',
    seo_score: 87,
    published: true
  },
  {
    title: 'Digital Marketing in Warwick',
    slug: 'locations/warwick',
    description: 'Local digital marketing services for Warwick, RI businesses. SEO, web design, and marketing strategies for Warwick companies.',
    content: '<main>Warwick-specific marketing content including local SEO, Warwick business directory, and local market expertise...</main>',
    meta_title: 'Digital Marketing in Warwick RI | Local SEO Services',
    meta_description: 'Local digital marketing services for Warwick, RI businesses. SEO, web design, and marketing strategies for Warwick companies.',
    meta_keywords: 'Warwick digital marketing, Warwick SEO, local marketing Warwick, Rhode Island marketing',
    og_title: 'Digital Marketing in Warwick RI',
    og_description: 'Local digital marketing services for Warwick, RI businesses.',
    og_type: 'website',
    twitter_card: 'summary_large_image',
    canonical_url: 'https://amentiai.com/locations/warwick',
    robots_index: true,
    robots_follow: true,
    schema_type: 'LocalBusiness',
    focus_keyword: 'Warwick digital marketing',
    seo_score: 85,
    published: true
  },
  {
    title: 'Digital Marketing in Cranston',
    slug: 'locations/cranston',
    description: 'Local digital marketing services for Cranston, RI businesses. SEO, web design, and marketing strategies for Cranston companies.',
    content: '<main>Cranston-specific marketing content including local SEO, Cranston business directory, and local market expertise...</main>',
    meta_title: 'Digital Marketing in Cranston RI | Local SEO Services',
    meta_description: 'Local digital marketing services for Cranston, RI businesses. SEO, web design, and marketing strategies for Cranston companies.',
    meta_keywords: 'Cranston digital marketing, Cranston SEO, local marketing Cranston, Rhode Island marketing',
    og_title: 'Digital Marketing in Cranston RI',
    og_description: 'Local digital marketing services for Cranston, RI businesses.',
    og_type: 'website',
    twitter_card: 'summary_large_image',
    canonical_url: 'https://amentiai.com/locations/cranston',
    robots_index: true,
    robots_follow: true,
    schema_type: 'LocalBusiness',
    focus_keyword: 'Cranston digital marketing',
    seo_score: 84,
    published: true
  },
  {
    title: 'Digital Marketing in Newport',
    slug: 'locations/newport',
    description: 'Local digital marketing services for Newport, RI businesses. SEO, web design, and marketing strategies for Newport companies.',
    content: '<main>Newport-specific marketing content including local SEO, Newport business directory, and local market expertise...</main>',
    meta_title: 'Digital Marketing in Newport RI | Local SEO Services',
    meta_description: 'Local digital marketing services for Newport, RI businesses. SEO, web design, and marketing strategies for Newport companies.',
    meta_keywords: 'Newport digital marketing, Newport SEO, local marketing Newport, Rhode Island marketing',
    og_title: 'Digital Marketing in Newport RI',
    og_description: 'Local digital marketing services for Newport, RI businesses.',
    og_type: 'website',
    twitter_card: 'summary_large_image',
    canonical_url: 'https://amentiai.com/locations/newport',
    robots_index: true,
    robots_follow: true,
    schema_type: 'LocalBusiness',
    focus_keyword: 'Newport digital marketing',
    seo_score: 86,
    published: true
  },

  // Services Pages (Dynamic)
  {
    title: 'Website Design & Development',
    slug: 'services/website-design-development',
    description: 'Professional website design and development services. Custom websites that convert visitors into customers with modern design and advanced functionality.',
    content: '<main>Website design and development services including responsive design, e-commerce, custom development...</main>',
    meta_title: 'Website Design & Development Services | Custom Websites',
    meta_description: 'Professional website design and development services. Custom websites that convert visitors into customers.',
    meta_keywords: 'website design, web development, custom websites, responsive design, website development',
    og_title: 'Website Design & Development Services',
    og_description: 'Professional website design and development services.',
    og_type: 'website',
    twitter_card: 'summary_large_image',
    canonical_url: 'https://amentiai.com/services/website-design-development',
    robots_index: true,
    robots_follow: true,
    schema_type: 'Service',
    focus_keyword: 'website design development',
    seo_score: 89,
    published: true
  },
  {
    title: 'SEO Services',
    slug: 'services/seo-services',
    description: 'Comprehensive SEO services that help your business rank higher in search results and attract more qualified customers.',
    content: '<main>SEO services including keyword research, on-page optimization, technical SEO, local SEO...</main>',
    meta_title: 'SEO Services | Search Engine Optimization | Rhode Island',
    meta_description: 'Comprehensive SEO services that help your business rank higher in search results and attract more qualified customers.',
    meta_keywords: 'SEO services, search engine optimization, local SEO, organic traffic, SEO company',
    og_title: 'SEO Services | Search Engine Optimization',
    og_description: 'Comprehensive SEO services for better search rankings.',
    og_type: 'website',
    twitter_card: 'summary_large_image',
    canonical_url: 'https://amentiai.com/services/seo-services',
    robots_index: true,
    robots_follow: true,
    schema_type: 'Service',
    focus_keyword: 'SEO services',
    seo_score: 91,
    published: true
  },
  {
    title: 'Branding & Identity Design',
    slug: 'services/branding-identity',
    description: 'Create a memorable brand identity that resonates with your target audience and drives business growth.',
    content: '<main>Branding services including logo design, brand strategy, visual identity, brand guidelines...</main>',
    meta_title: 'Branding & Identity Design Services | Logo Design',
    meta_description: 'Create a memorable brand identity that resonates with your target audience and drives business growth.',
    meta_keywords: 'branding, logo design, brand identity, visual identity, brand strategy',
    og_title: 'Branding & Identity Design Services',
    og_description: 'Create a memorable brand identity for your business.',
    og_type: 'website',
    twitter_card: 'summary_large_image',
    canonical_url: 'https://amentiai.com/services/branding-identity',
    robots_index: true,
    robots_follow: true,
    schema_type: 'Service',
    focus_keyword: 'branding identity design',
    seo_score: 87,
    published: true
  },
  {
    title: 'Complete Growth Packages',
    slug: 'services/complete-growth-packages',
    description: 'All-in-one digital marketing solutions that combine website development with ongoing SEO and marketing.',
    content: '<main>Complete growth packages including website development, SEO, content marketing, social media...</main>',
    meta_title: 'Complete Growth Packages | All-in-One Marketing Solutions',
    meta_description: 'All-in-one digital marketing solutions that combine website development with ongoing SEO and marketing.',
    meta_keywords: 'complete marketing packages, all-in-one marketing, growth packages, digital marketing solutions',
    og_title: 'Complete Growth Packages | All-in-One Solutions',
    og_description: 'All-in-one digital marketing solutions for business growth.',
    og_type: 'website',
    twitter_card: 'summary_large_image',
    canonical_url: 'https://amentiai.com/services/complete-growth-packages',
    robots_index: true,
    robots_follow: true,
    schema_type: 'Service',
    focus_keyword: 'complete growth packages',
    seo_score: 90,
    published: true
  }
]

async function importAllPages() {
  const client = await pool.connect()
  
  try {
    console.log('🚀 Importing ALL existing pages to database...')
    console.log('')
    
    let importedCount = 0
    let skippedCount = 0
    
    for (const page of allPages) {
      // Check if page already exists
      const existingPage = await client.query(
        'SELECT id FROM pages WHERE slug = $1',
        [page.slug]
      )
      
      if (existingPage.rows.length > 0) {
        console.log(`⏭️  Page "${page.title}" already exists, skipping...`)
        skippedCount++
        continue
      }
      
      // Insert the page
      const result = await client.query(
        `INSERT INTO pages (
          title, slug, description, content, meta_title, meta_description, meta_keywords,
          og_title, og_description, og_type, twitter_card, canonical_url, robots_index, 
          robots_follow, schema_type, focus_keyword, seo_score, published
         ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) 
         RETURNING id`,
        [
          page.title, page.slug, page.description, page.content, page.meta_title, 
          page.meta_description, page.meta_keywords, page.og_title, page.og_description, 
          page.og_type, page.twitter_card, page.canonical_url, page.robots_index, 
          page.robots_follow, page.schema_type, page.focus_keyword, page.seo_score, page.published
        ]
      )
      
      console.log(`✅ Imported page: "${page.title}" (ID: ${result.rows[0].id})`)
      importedCount++
    }
    
    console.log('')
    console.log('🎉 All pages import completed!')
    console.log('')
    console.log('📊 Summary:')
    console.log(`   ✅ Imported: ${importedCount} pages`)
    console.log(`   ⏭️  Skipped: ${skippedCount} pages (already exist)`)
    console.log(`   📄 Total pages in database: ${importedCount + skippedCount}`)
    
    // Show summary by category
    const categories = {
      'Main Pages': ['', 'about', 'pricing', 'blog', 'case-studies', 'contact', 'checkout'],
      'Industries': ['industries', 'industries/roofers', 'industries/lawyers', 'industries/contractors'],
      'Locations': ['locations/providence', 'locations/warwick', 'locations/cranston', 'locations/newport'],
      'Services': ['services/website-design-development', 'services/seo-services', 'services/branding-identity', 'services/complete-growth-packages']
    }
    
    console.log('')
    console.log('📋 Pages by Category:')
    for (const [category, slugs] of Object.entries(categories)) {
      const count = await client.query(
        'SELECT COUNT(*) FROM pages WHERE slug = ANY($1)',
        [slugs]
      )
      console.log(`   ${category}: ${count.rows[0].count} pages`)
    }
    
  } catch (error) {
    console.error('❌ Error importing pages:', error)
    throw error
  } finally {
    client.release()
  }
}

importAllPages()
  .then(() => {
    console.log('')
    console.log('✅ Page import process completed successfully!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('')
    console.error('❌ Page import failed:', error)
    process.exit(1)
  })










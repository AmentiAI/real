const { Pool } = require('pg')
require('dotenv').config({ path: '.env.local' })

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

// All existing pages with their content
const existingPages = [
  {
    title: 'About Us',
    slug: 'about',
    description: 'Learn about Amenti AI, Rhode Island\'s premier digital marketing agency. Our team of experts helps businesses grow with proven SEO, web design, and marketing strategies.',
    content: `
      <main className="min-h-screen bg-white">
        <section className="pt-24 pb-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl font-semibold text-slate-900 mb-8">
                We're Rhode Island's Digital Marketing Experts
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                At Amenti AI, we combine cutting-edge technology with proven marketing strategies 
                to help businesses across Rhode Island and New England achieve unprecedented growth.
              </p>
            </div>
          </div>
        </section>
        <!-- Rest of about page content would go here -->
      </main>
    `,
    meta_title: 'About Amenti AI - Rhode Island Digital Marketing Experts',
    meta_description: 'Learn about Amenti AI, Rhode Island\'s premier digital marketing agency. Our team of experts helps businesses grow with proven SEO, web design, and marketing strategies.',
    meta_keywords: 'about Amenti AI, Rhode Island digital marketing agency, SEO experts, web design team, digital marketing company',
    published: true
  },
  {
    title: 'Pricing',
    slug: 'pricing',
    description: 'Transparent pricing for professional digital marketing services. Choose from our SEO, web design, and complete growth packages. No hidden fees, guaranteed results.',
    content: `
      <main className="min-h-screen bg-white">
        <section className="pt-24 pb-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-semibold text-slate-900 mb-8">
              Transparent Pricing for Real Results
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12">
              No hidden fees, no long-term contracts. Choose the plan that fits your business needs 
              and watch your digital presence grow with our proven strategies.
            </p>
          </div>
        </section>
        <!-- Rest of pricing page content would go here -->
      </main>
    `,
    meta_title: 'Pricing - Amenti AI Digital Marketing Services | Rhode Island',
    meta_description: 'Transparent pricing for professional digital marketing services. Choose from our SEO, web design, and complete growth packages.',
    meta_keywords: 'digital marketing pricing, SEO pricing, web design cost, Rhode Island marketing rates, transparent pricing',
    published: true
  },
  {
    title: 'Blog',
    slug: 'blog',
    description: 'Stay updated with the latest digital marketing trends, SEO tips, and business growth strategies from Amenti AI experts.',
    content: `
      <main className="min-h-screen bg-white">
        <section className="pt-24 pb-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl font-semibold text-slate-900 mb-8">
                Digital Marketing Insights
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12">
                Stay ahead of the competition with expert insights, proven strategies, and actionable tips 
                from our digital marketing experts.
              </p>
            </div>
          </div>
        </section>
        <!-- Rest of blog page content would go here -->
      </main>
    `,
    meta_title: 'Blog - Digital Marketing Insights | Amenti AI',
    meta_description: 'Stay updated with the latest digital marketing trends, SEO tips, and business growth strategies from Amenti AI experts.',
    meta_keywords: 'digital marketing blog, SEO tips, business growth, marketing strategies, Rhode Island marketing insights',
    published: true
  },
  {
    title: 'Case Studies',
    slug: 'case-studies',
    description: 'Real results from real clients. See how Amenti AI has helped businesses across Rhode Island achieve remarkable growth through our proven digital marketing strategies.',
    content: `
      <main className="min-h-screen pt-24">
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl font-semibold text-slate-900 mb-8">
                Real Results, Real Growth
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                See how we've helped businesses across Rhode Island achieve remarkable growth 
                through our proven digital marketing strategies.
              </p>
            </div>
          </div>
        </section>
        <!-- Rest of case studies page content would go here -->
      </main>
    `,
    meta_title: 'Case Studies - Real Results from Amenti AI Clients',
    meta_description: 'Real results from real clients. See how Amenti AI has helped businesses across Rhode Island achieve remarkable growth.',
    meta_keywords: 'case studies, digital marketing results, SEO success stories, Rhode Island marketing results, client success',
    published: true
  },
  {
    title: 'Contact Us',
    slug: 'contact',
    description: 'Get in touch with Amenti AI for your digital marketing needs. Free consultation and custom strategy for your business growth.',
    content: `
      <main className="min-h-screen bg-white">
        <section className="pt-24 pb-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl font-semibold text-slate-900 mb-8">
                Ready to Grow Your Business?
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Let's discuss how Amenti AI can help your business achieve its digital marketing goals. 
                Get a free consultation today.
              </p>
            </div>
          </div>
        </section>
        <!-- Contact form and information would go here -->
      </main>
    `,
    meta_title: 'Contact Us - Free Digital Marketing Consultation | Amenti AI',
    meta_description: 'Get in touch with Amenti AI for your digital marketing needs. Free consultation and custom strategy for your business growth.',
    meta_keywords: 'contact Amenti AI, digital marketing consultation, Rhode Island marketing agency contact, free SEO audit',
    published: true
  },
  {
    title: 'Industries',
    slug: 'industries',
    description: 'Specialized digital marketing services for roofers, lawyers, contractors, and other industries. Custom strategies that deliver results.',
    content: `
      <main className="min-h-screen bg-white">
        <section className="pt-24 pb-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl font-semibold text-slate-900 mb-8">
                Industry-Specific Digital Marketing
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12">
                We understand that each industry has unique challenges and opportunities. 
                Our specialized strategies are tailored to your specific business type and market.
              </p>
            </div>
          </div>
        </section>
        <!-- Industry content would go here -->
      </main>
    `,
    meta_title: 'Industry-Specific Digital Marketing Services | Amenti AI',
    meta_description: 'Specialized digital marketing services for roofers, lawyers, contractors, and other industries. Custom strategies that deliver results.',
    meta_keywords: 'industry marketing, roofer SEO, lawyer marketing, contractor advertising, industry-specific digital marketing',
    published: true
  },
  {
    title: 'Services',
    slug: 'services',
    description: 'Comprehensive digital marketing services including SEO, web design, content marketing, and complete growth packages. All designed to grow your business.',
    content: `
      <main className="min-h-screen bg-white">
        <section className="pt-24 pb-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl font-semibold text-slate-900 mb-8">
                Complete Digital Marketing Services
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                From SEO and web design to content marketing and growth packages, 
                we provide everything you need to dominate your market.
              </p>
            </div>
          </div>
        </section>
        <!-- Services content would go here -->
      </main>
    `,
    meta_title: 'Digital Marketing Services | SEO, Web Design, Content Marketing',
    meta_description: 'Comprehensive digital marketing services including SEO, web design, content marketing, and complete growth packages.',
    meta_keywords: 'digital marketing services, SEO services, web design, content marketing, Rhode Island marketing agency',
    published: true
  },
  {
    title: 'Checkout',
    slug: 'checkout',
    description: 'Secure checkout for Amenti AI digital marketing services. Choose your package and start growing your business today.',
    content: `
      <main className="min-h-screen bg-white">
        <section className="pt-24 pb-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl font-semibold text-slate-900 mb-8">
                Complete Your Purchase
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Secure checkout for your digital marketing package. 
                Start growing your business today with our proven strategies.
              </p>
            </div>
          </div>
        </section>
        <!-- Checkout form would go here -->
      </main>
    `,
    meta_title: 'Checkout - Secure Payment | Amenti AI',
    meta_description: 'Secure checkout for Amenti AI digital marketing services. Choose your package and start growing your business today.',
    meta_keywords: 'checkout, payment, digital marketing packages, secure payment, Amenti AI services',
    published: false // Keep as draft since it's likely incomplete
  }
]

async function importExistingPages() {
  const client = await pool.connect()
  
  try {
    console.log('Importing existing pages to database...')
    
    for (const page of existingPages) {
      // Check if page already exists
      const existingPage = await client.query(
        'SELECT id FROM pages WHERE slug = $1',
        [page.slug]
      )
      
      if (existingPage.rows.length > 0) {
        console.log(`⏭️  Page "${page.title}" already exists, skipping...`)
        continue
      }
      
      // Insert the page
      const result = await client.query(
        `INSERT INTO pages (title, slug, description, content, meta_title, meta_description, meta_keywords, published)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
        [page.title, page.slug, page.description, page.content, page.meta_title, page.meta_description, page.meta_keywords, page.published]
      )
      
      console.log(`✅ Imported page: "${page.title}" (ID: ${result.rows[0].id})`)
    }
    
    console.log('🎉 All existing pages imported successfully!')
    
    // Show summary
    const totalPages = await client.query('SELECT COUNT(*) FROM pages')
    const publishedPages = await client.query('SELECT COUNT(*) FROM pages WHERE published = true')
    
    console.log(`📊 Summary:`)
    console.log(`   Total pages: ${totalPages.rows[0].count}`)
    console.log(`   Published pages: ${publishedPages.rows[0].count}`)
    
  } catch (error) {
    console.error('❌ Error importing pages:', error)
    throw error
  } finally {
    client.release()
  }
}

importExistingPages()
  .then(() => {
    console.log('Page import process completed')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Page import failed:', error)
    process.exit(1)
  })










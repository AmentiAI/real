const { Pool } = require('pg')
require('dotenv').config({ path: '.env.local' })

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

async function setupCompleteAdmin() {
  const client = await pool.connect()
  
  try {
    console.log('🚀 Setting up complete admin system...')
    console.log('')
    
    // Step 1: Create tables
    console.log('📊 Step 1: Creating database tables...')
    
    // Create website_content table
    await client.query(`
      CREATE TABLE IF NOT EXISTS website_content (
        id SERIAL PRIMARY KEY,
        section VARCHAR(100) NOT NULL,
        title VARCHAR(255) NOT NULL,
        subtitle VARCHAR(255),
        description TEXT,
        image TEXT,
        button_text VARCHAR(255),
        button_link VARCHAR(500),
        order_index INTEGER DEFAULT 0,
        active BOOLEAN DEFAULT true,
        content JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log('✅ website_content table created')

    // Create pages table
    await client.query(`
      CREATE TABLE IF NOT EXISTS pages (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        content TEXT,
        featured_image TEXT,
        meta_title VARCHAR(255),
        meta_description TEXT,
        meta_keywords TEXT,
        published BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log('✅ pages table created')

    // Create branding_settings table
    await client.query(`
      CREATE TABLE IF NOT EXISTS branding_settings (
        id SERIAL PRIMARY KEY,
        logo_light TEXT,
        logo_dark TEXT,
        favicon TEXT,
        primary_color VARCHAR(7) DEFAULT '#2563eb',
        secondary_color VARCHAR(7) DEFAULT '#64748b',
        accent_color VARCHAR(7) DEFAULT '#f59e0b',
        font_family VARCHAR(100) DEFAULT 'Inter',
        company_name VARCHAR(255) DEFAULT 'Amenti AI',
        tagline VARCHAR(255) DEFAULT 'Digital Marketing & SEO Services',
        contact_email VARCHAR(255) DEFAULT 'hello@amentiai.com',
        contact_phone VARCHAR(50) DEFAULT '(401) 123-4567',
        address TEXT DEFAULT 'Providence, Rhode Island',
        social_media JSONB DEFAULT '{}',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log('✅ branding_settings table created')
    console.log('')

    // Step 2: Insert default branding settings
    console.log('🎨 Step 2: Setting up default branding...')
    const brandingExists = await client.query('SELECT COUNT(*) FROM branding_settings')
    if (parseInt(brandingExists.rows[0].count) === 0) {
      await client.query(`
        INSERT INTO branding_settings (company_name, tagline, contact_email, contact_phone, address)
        VALUES ('Amenti AI', 'Digital Marketing & SEO Services', 'hello@amentiai.com', '(401) 123-4567', 'Providence, Rhode Island')
      `)
      console.log('✅ Default branding settings inserted')
    } else {
      console.log('⏭️  Branding settings already exist')
    }
    console.log('')

    // Step 3: Import existing pages
    console.log('📄 Step 3: Importing existing pages...')
    
    const existingPages = [
      {
        title: 'About Us',
        slug: 'about',
        description: 'Learn about Amenti AI, Rhode Island\'s premier digital marketing agency.',
        content: '<main>About page content...</main>',
        meta_title: 'About Amenti AI - Rhode Island Digital Marketing Experts',
        meta_description: 'Learn about Amenti AI, Rhode Island\'s premier digital marketing agency.',
        meta_keywords: 'about Amenti AI, Rhode Island digital marketing agency',
        published: true
      },
      {
        title: 'Pricing',
        slug: 'pricing',
        description: 'Transparent pricing for professional digital marketing services.',
        content: '<main>Pricing page content...</main>',
        meta_title: 'Pricing - Amenti AI Digital Marketing Services',
        meta_description: 'Transparent pricing for professional digital marketing services.',
        meta_keywords: 'digital marketing pricing, SEO pricing',
        published: true
      },
      {
        title: 'Blog',
        slug: 'blog',
        description: 'Digital marketing insights and strategies.',
        content: '<main>Blog page content...</main>',
        meta_title: 'Blog - Digital Marketing Insights | Amenti AI',
        meta_description: 'Digital marketing insights and strategies.',
        meta_keywords: 'digital marketing blog, SEO tips',
        published: true
      },
      {
        title: 'Case Studies',
        slug: 'case-studies',
        description: 'Real results from real clients.',
        content: '<main>Case studies page content...</main>',
        meta_title: 'Case Studies - Real Results from Amenti AI Clients',
        meta_description: 'Real results from real clients.',
        meta_keywords: 'case studies, digital marketing results',
        published: true
      },
      {
        title: 'Contact Us',
        slug: 'contact',
        description: 'Get in touch with Amenti AI for your digital marketing needs.',
        content: '<main>Contact page content...</main>',
        meta_title: 'Contact Us - Free Digital Marketing Consultation',
        meta_description: 'Get in touch with Amenti AI for your digital marketing needs.',
        meta_keywords: 'contact Amenti AI, digital marketing consultation',
        published: true
      },
      {
        title: 'Industries',
        slug: 'industries',
        description: 'Industry-specific digital marketing services.',
        content: '<main>Industries page content...</main>',
        meta_title: 'Industry-Specific Digital Marketing Services',
        meta_description: 'Industry-specific digital marketing services.',
        meta_keywords: 'industry marketing, roofer SEO',
        published: true
      },
      {
        title: 'Services',
        slug: 'services',
        description: 'Comprehensive digital marketing services.',
        content: '<main>Services page content...</main>',
        meta_title: 'Digital Marketing Services | SEO, Web Design',
        meta_description: 'Comprehensive digital marketing services.',
        meta_keywords: 'digital marketing services, SEO services',
        published: true
      }
    ]

    for (const page of existingPages) {
      const existingPage = await client.query('SELECT id FROM pages WHERE slug = $1', [page.slug])
      
      if (existingPage.rows.length === 0) {
        await client.query(
          `INSERT INTO pages (title, slug, description, content, meta_title, meta_description, meta_keywords, published)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
          [page.title, page.slug, page.description, page.content, page.meta_title, page.meta_description, page.meta_keywords, page.published]
        )
        console.log(`✅ Imported page: "${page.title}"`)
      } else {
        console.log(`⏭️  Page "${page.title}" already exists`)
      }
    }
    console.log('')

    // Step 4: Import existing content sections
    console.log('📝 Step 4: Importing existing content sections...')
    
    const existingContent = [
      {
        section: 'hero',
        title: 'Dominate Your Market with Proven Digital Marketing',
        subtitle: 'Rhode Island\'s Premier Digital Marketing Agency',
        description: 'We help businesses across Rhode Island achieve unprecedented growth through cutting-edge SEO, web design, and marketing strategies.',
        button_text: 'Get Free Strategy Call',
        button_link: '/contact',
        order_index: 1,
        active: true
      },
      {
        section: 'services',
        title: 'Complete Digital Marketing Services',
        subtitle: 'Everything you need to dominate your market',
        description: 'From SEO and web design to content marketing and growth packages, we provide comprehensive solutions.',
        button_text: 'View All Services',
        button_link: '/services',
        order_index: 1,
        active: true
      },
      {
        section: 'portfolio',
        title: 'Real Results, Real Growth',
        subtitle: 'See how we\'ve helped businesses succeed',
        description: 'Our proven strategies have helped hundreds of businesses across Rhode Island achieve remarkable growth.',
        button_text: 'View Case Studies',
        button_link: '/case-studies',
        order_index: 1,
        active: true
      },
      {
        section: 'contact',
        title: 'Ready to Grow Your Business?',
        subtitle: 'Let\'s discuss your digital marketing goals',
        description: 'Get a free consultation and discover how Amenti AI can help your business achieve unprecedented growth.',
        button_text: 'Get Free Consultation',
        button_link: '/contact',
        order_index: 1,
        active: true
      }
    ]

    for (const content of existingContent) {
      const existingContent = await client.query(
        'SELECT id FROM website_content WHERE section = $1 AND title = $2',
        [content.section, content.title]
      )
      
      if (existingContent.rows.length === 0) {
        await client.query(
          `INSERT INTO website_content (section, title, subtitle, description, button_text, button_link, order_index, active)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
          [content.section, content.title, content.subtitle, content.description, content.button_text, content.button_link, content.order_index, content.active]
        )
        console.log(`✅ Imported content: "${content.title}" (${content.section})`)
      } else {
        console.log(`⏭️  Content "${content.title}" already exists`)
      }
    }
    console.log('')

    // Step 5: Show summary
    console.log('📊 Step 5: Summary')
    const totalPages = await client.query('SELECT COUNT(*) FROM pages')
    const publishedPages = await client.query('SELECT COUNT(*) FROM pages WHERE published = true')
    const totalContent = await client.query('SELECT COUNT(*) FROM website_content')
    const activeContent = await client.query('SELECT COUNT(*) FROM website_content WHERE active = true')
    
    console.log(`   📄 Total pages: ${totalPages.rows[0].count}`)
    console.log(`   📄 Published pages: ${publishedPages.rows[0].count}`)
    console.log(`   📝 Total content items: ${totalContent.rows[0].count}`)
    console.log(`   📝 Active content items: ${activeContent.rows[0].count}`)
    console.log('')
    
    console.log('🎉 Complete admin system setup finished!')
    console.log('')
    console.log('🚀 Next steps:')
    console.log('   1. Add BLOB_READ_WRITE_TOKEN to your .env.local')
    console.log('   2. Run: npm run dev')
    console.log('   3. Go to: http://localhost:3000/admin/login')
    console.log('   4. Login with: admin@amentiai.com / admin123')
    console.log('   5. Start managing your website!')
    
  } catch (error) {
    console.error('❌ Error setting up admin system:', error)
    throw error
  } finally {
    client.release()
  }
}

setupCompleteAdmin()
  .then(() => {
    console.log('')
    console.log('✅ Admin setup process completed successfully!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('')
    console.error('❌ Admin setup failed:', error)
    process.exit(1)
  })










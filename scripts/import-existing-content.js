const { Pool } = require('pg')
require('dotenv').config({ path: '.env.local' })

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

// Existing content sections from your website
const existingContent = [
  // Hero Section
  {
    section: 'hero',
    title: 'Dominate Your Market with Proven Digital Marketing',
    subtitle: 'Rhode Island\'s Premier Digital Marketing Agency',
    description: 'We help businesses across Rhode Island and New England achieve unprecedented growth through cutting-edge SEO, web design, and marketing strategies that deliver real results.',
    button_text: 'Get Free Strategy Call',
    button_link: '/contact',
    order_index: 1,
    active: true
  },
  {
    section: 'hero',
    title: 'Transform Your Business Today',
    subtitle: 'Ready to see real growth?',
    description: 'Join hundreds of successful businesses who trust Amenti AI for their digital marketing needs.',
    button_text: 'Start Your Journey',
    button_link: '/pricing',
    order_index: 2,
    active: true
  },

  // Services Section
  {
    section: 'services',
    title: 'Complete Digital Marketing Services',
    subtitle: 'Everything you need to dominate your market',
    description: 'From SEO and web design to content marketing and growth packages, we provide comprehensive solutions tailored to your business needs.',
    button_text: 'View All Services',
    button_link: '/services',
    order_index: 1,
    active: true
  },
  {
    section: 'services',
    title: 'SEO Services',
    subtitle: 'Dominate search results',
    description: 'Comprehensive SEO strategies that help your business rank higher and attract more qualified customers.',
    button_text: 'Learn More',
    button_link: '/services/seo-services',
    order_index: 2,
    active: true
  },
  {
    section: 'services',
    title: 'Website Design & Development',
    subtitle: 'Professional websites that convert',
    description: 'Stunning, high-converting websites built with the latest technologies and optimized for speed and search engines.',
    button_text: 'Get Started',
    button_link: '/services/website-design-development',
    order_index: 3,
    active: true
  },
  {
    section: 'services',
    title: 'Complete Growth Packages',
    subtitle: 'All-in-one solutions',
    description: 'Everything you need in one package: website development, SEO, content marketing, and ongoing optimization.',
    button_text: 'View Packages',
    button_link: '/services/complete-growth-packages',
    order_index: 4,
    active: true
  },

  // Portfolio Section
  {
    section: 'portfolio',
    title: 'Real Results, Real Growth',
    subtitle: 'See how we\'ve helped businesses succeed',
    description: 'Our proven strategies have helped hundreds of businesses across Rhode Island achieve remarkable growth and success.',
    button_text: 'View Case Studies',
    button_link: '/case-studies',
    order_index: 1,
    active: true
  },

  // Testimonials Section
  {
    section: 'testimonials',
    title: 'What Our Clients Say',
    subtitle: 'Real feedback from real businesses',
    description: 'Don\'t just take our word for it. Hear from the businesses we\'ve helped achieve their digital marketing goals.',
    order_index: 1,
    active: true
  },

  // About Section
  {
    section: 'about',
    title: 'Why Choose Amenti AI?',
    subtitle: 'Your trusted digital marketing partner',
    description: 'With years of experience and a proven track record, we\'re the digital marketing agency Rhode Island businesses trust for growth.',
    button_text: 'Learn About Us',
    button_link: '/about',
    order_index: 1,
    active: true
  },

  // Contact Section
  {
    section: 'contact',
    title: 'Ready to Grow Your Business?',
    subtitle: 'Let\'s discuss your digital marketing goals',
    description: 'Get a free consultation and discover how Amenti AI can help your business achieve unprecedented growth.',
    button_text: 'Get Free Consultation',
    button_link: '/contact',
    order_index: 1,
    active: true
  },

  // Footer Section
  {
    section: 'footer',
    title: 'Amenti AI',
    subtitle: 'Digital Marketing & SEO Services',
    description: 'Helping businesses across Rhode Island and New England achieve unprecedented growth through proven digital marketing strategies.',
    order_index: 1,
    active: true
  }
]

async function importExistingContent() {
  const client = await pool.connect()
  
  try {
    console.log('Importing existing content sections to database...')
    
    for (const content of existingContent) {
      // Check if content already exists
      const existingContent = await client.query(
        'SELECT id FROM website_content WHERE section = $1 AND title = $2',
        [content.section, content.title]
      )
      
      if (existingContent.rows.length > 0) {
        console.log(`⏭️  Content "${content.title}" already exists, skipping...`)
        continue
      }
      
      // Insert the content
      const result = await client.query(
        `INSERT INTO website_content (section, title, subtitle, description, button_text, button_link, order_index, active)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
        [content.section, content.title, content.subtitle, content.description, content.button_text, content.button_link, content.order_index, content.active]
      )
      
      console.log(`✅ Imported content: "${content.title}" in section "${content.section}" (ID: ${result.rows[0].id})`)
    }
    
    console.log('🎉 All existing content imported successfully!')
    
    // Show summary by section
    const sections = ['hero', 'services', 'portfolio', 'testimonials', 'about', 'contact', 'footer']
    
    console.log(`📊 Summary by section:`)
    for (const section of sections) {
      const count = await client.query('SELECT COUNT(*) FROM website_content WHERE section = $1', [section])
      console.log(`   ${section}: ${count.rows[0].count} items`)
    }
    
  } catch (error) {
    console.error('❌ Error importing content:', error)
    throw error
  } finally {
    client.release()
  }
}

importExistingContent()
  .then(() => {
    console.log('Content import process completed')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Content import failed:', error)
    process.exit(1)
  })










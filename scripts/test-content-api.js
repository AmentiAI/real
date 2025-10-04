const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_jzymWCDE7IF4@ep-calm-field-adqp91o1-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: {
    rejectUnauthorized: false
  }
})

async function testContentAPI() {
  const client = await pool.connect()
  
  try {
    console.log('Testing content API data...')

    // Test blog posts
    const blogResult = await client.query('SELECT COUNT(*) as count FROM blog_posts')
    console.log('Blog posts count:', blogResult.rows[0].count)

    // Test hero content
    const heroResult = await client.query('SELECT COUNT(*) as count FROM hero_content')
    console.log('Hero content count:', heroResult.rows[0].count)

    // Test case studies
    const caseResult = await client.query('SELECT COUNT(*) as count FROM case_studies')
    console.log('Case studies count:', caseResult.rows[0].count)

    // Test industries
    const industryResult = await client.query('SELECT COUNT(*) as count FROM industries')
    console.log('Industries count:', industryResult.rows[0].count)

    // Test testimonials
    const testimonialResult = await client.query('SELECT COUNT(*) as count FROM testimonials')
    console.log('Testimonials count:', testimonialResult.rows[0].count)

    // Test team members
    const teamResult = await client.query('SELECT COUNT(*) as count FROM team_members')
    console.log('Team members count:', teamResult.rows[0].count)

    // Test stats
    const statsResult = await client.query('SELECT COUNT(*) as count FROM stats')
    console.log('Stats count:', statsResult.rows[0].count)

    // Test faqs
    const faqResult = await client.query('SELECT COUNT(*) as count FROM faqs')
    console.log('FAQs count:', faqResult.rows[0].count)

    // Sample data from blog_posts
    const sampleBlog = await client.query('SELECT title, author, category FROM blog_posts LIMIT 3')
    console.log('Sample blog posts:', sampleBlog.rows)

  } catch (error) {
    console.error('Error testing content API:', error)
  } finally {
    client.release()
    await pool.end()
  }
}

testContentAPI()

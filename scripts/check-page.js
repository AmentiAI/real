const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_jzymWCDE7IF4@ep-calm-field-adqp91o1-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
})

async function checkPage() {
  try {
    const result = await pool.query(
      'SELECT title, slug, published FROM pages WHERE slug = $1', 
      ['connecticut-seo-amenti-ai-amenti-ai-powered-digital-solutions']
    )
    
    console.log('Page found:', JSON.stringify(result.rows[0], null, 2))
    
    if (result.rows[0] && !result.rows[0].published) {
      console.log('Page is not published! Updating...')
      await pool.query(
        'UPDATE pages SET published = true WHERE slug = $1',
        ['connecticut-seo-amenti-ai-amenti-ai-powered-digital-solutions']
      )
      console.log('Page published successfully!')
    }
    
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await pool.end()
  }
}

checkPage()




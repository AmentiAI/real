const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_jzymWCDE7IF4@ep-calm-field-adqp91o1-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: {
    rejectUnauthorized: false
  }
})

async function testConnection() {
  try {
    console.log('Testing database connection...')
    const client = await pool.connect()
    
    const result = await client.query('SELECT NOW() as current_time')
    console.log('Database connection successful!')
    console.log('Current time:', result.rows[0].current_time)
    
    // Test blog posts query
    const blogResult = await client.query('SELECT COUNT(*) as count FROM blog_posts')
    console.log('Blog posts count:', blogResult.rows[0].count)
    
    client.release()
    await pool.end()
    console.log('Connection test completed successfully!')
  } catch (error) {
    console.error('Database connection failed:', error)
    process.exit(1)
  }
}

testConnection()

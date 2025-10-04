const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_jzymWCDE7IF4@ep-calm-field-adqp91o1-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: {
    rejectUnauthorized: false
  }
})

async function checkTables() {
  const client = await pool.connect()
  
  try {
    // Check if blog_posts table exists and get its structure
    const result = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'blog_posts' 
      ORDER BY ordinal_position
    `)
    
    console.log('Blog posts table columns:')
    result.rows.forEach(row => {
      console.log(`- ${row.column_name}: ${row.data_type}`)
    })
    
  } catch (error) {
    console.error('Error checking tables:', error)
  } finally {
    client.release()
    await pool.end()
  }
}

checkTables()

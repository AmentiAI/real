const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_jzymWCDE7IF4@ep-calm-field-adqp91o1-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: {
    rejectUnauthorized: false
  }
})

async function checkTableStructures() {
  const client = await pool.connect()
  
  try {
    const tables = ['hero_content', 'blog_posts', 'case_studies', 'industries', 'testimonials', 'team_members', 'stats', 'faqs']
    
    for (const table of tables) {
      console.log(`\n=== ${table.toUpperCase()} ===`)
      const result = await client.query(`
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns 
        WHERE table_name = '${table}' 
        ORDER BY ordinal_position
      `)
      
      result.rows.forEach(row => {
        console.log(`- ${row.column_name}: ${row.data_type} (${row.is_nullable === 'YES' ? 'nullable' : 'not null'})`)
      })
    }
    
  } catch (error) {
    console.error('Error checking table structures:', error)
  } finally {
    client.release()
    await pool.end()
  }
}

checkTableStructures()

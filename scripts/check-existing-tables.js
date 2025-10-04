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
    const result = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `)
    
    console.log('Existing tables:')
    result.rows.forEach(row => {
      console.log(`- ${row.table_name}`)
    })
    
  } catch (error) {
    console.error('Error checking tables:', error)
  } finally {
    client.release()
    await pool.end()
  }
}

checkTables()

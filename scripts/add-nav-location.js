const { Pool } = require('pg')

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/amentiai'
})

async function addNavLocationColumn() {
  const client = await pool.connect()
  
  try {
    console.log('Adding nav_location column to pages table...')
    
    // Add nav_location column if it doesn't exist
    try {
      await client.query(`
        ALTER TABLE pages 
        ADD COLUMN nav_location VARCHAR(50) DEFAULT 'none'
      `)
      console.log('✓ Added nav_location column to pages table')
    } catch (error) {
      if (error.code === '42701') {
        console.log('- nav_location column already exists')
      } else {
        console.error('✗ Error adding nav_location column:', error.message)
      }
    }
    
    console.log('✅ Navigation location column added successfully!')
    
  } catch (error) {
    console.error('❌ Error adding nav_location column:', error)
  } finally {
    client.release()
    await pool.end()
  }
}

addNavLocationColumn()




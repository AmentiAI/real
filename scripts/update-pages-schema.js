const { Pool } = require('pg')

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/amentiai'
})

async function updatePagesSchema() {
  const client = await pool.connect()
  
  try {
    console.log('Updating pages table schema...')
    
    // Add new columns if they don't exist
    const columns = [
      'og_title VARCHAR(255)',
      'og_description TEXT',
      'og_image TEXT',
      'og_type VARCHAR(50) DEFAULT \'website\'',
      'twitter_card VARCHAR(50) DEFAULT \'summary_large_image\'',
      'twitter_title VARCHAR(255)',
      'twitter_description TEXT',
      'twitter_image TEXT',
      'canonical_url TEXT',
      'robots_index BOOLEAN DEFAULT true',
      'robots_follow BOOLEAN DEFAULT true',
      'structured_data TEXT',
      'schema_type VARCHAR(100) DEFAULT \'WebPage\'',
      'focus_keyword VARCHAR(255)',
      'seo_score INTEGER DEFAULT 0'
    ]
    
    for (const column of columns) {
      const columnName = column.split(' ')[0]
      try {
        await client.query(`ALTER TABLE pages ADD COLUMN ${columnName} ${column.split(' ').slice(1).join(' ')}`)
        console.log(`✓ Added column: ${columnName}`)
      } catch (error) {
        if (error.code === '42701') {
          console.log(`- Column ${columnName} already exists`)
        } else {
          console.error(`✗ Error adding column ${columnName}:`, error.message)
        }
      }
    }
    
    console.log('✅ Pages table schema updated successfully!')
    
  } catch (error) {
    console.error('❌ Error updating pages schema:', error)
  } finally {
    client.release()
    await pool.end()
  }
}

updatePagesSchema()




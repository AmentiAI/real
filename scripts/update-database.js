const { Pool } = require('pg')
require('dotenv').config({ path: '.env.local' })

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

async function updateDatabase() {
  const client = await pool.connect()
  
  try {
    console.log('Updating database schema...')
    
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

    // Insert default branding settings if none exist
    const brandingExists = await client.query('SELECT COUNT(*) FROM branding_settings')
    if (parseInt(brandingExists.rows[0].count) === 0) {
      await client.query(`
        INSERT INTO branding_settings (company_name, tagline, contact_email, contact_phone, address)
        VALUES ('Amenti AI', 'Digital Marketing & SEO Services', 'hello@amentiai.com', '(401) 123-4567', 'Providence, Rhode Island')
      `)
      console.log('✅ Default branding settings inserted')
    }

    console.log('🎉 Database update completed successfully!')
    
  } catch (error) {
    console.error('❌ Error updating database:', error)
    throw error
  } finally {
    client.release()
  }
}

updateDatabase()
  .then(() => {
    console.log('Database update process completed')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Database update failed:', error)
    process.exit(1)
  })










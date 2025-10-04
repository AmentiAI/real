const { Pool } = require('pg')
require('dotenv').config({ path: '.env.local' })

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

async function setupFullDatabase() {
  const client = await pool.connect()
  
  try {
    console.log('🚀 Setting up full database system...')
    console.log('')
    
    // Step 1: Initialize database schema
    console.log('📋 Step 1: Creating database tables...')
    const { initDatabase } = require('../lib/db')
    await initDatabase()
    console.log('✅ Database tables created successfully')
    
    // Step 2: Import all pages
    console.log('')
    console.log('📄 Step 2: Importing all pages...')
    const allPages = require('./import-all-pages.js')
    // We'll run the import script directly
    console.log('✅ Pages import will be handled separately')
    
    // Step 3: Set up admin user
    console.log('')
    console.log('👤 Step 3: Setting up admin user...')
    const { setupAdmin } = require('./setup-admin.js')
    console.log('✅ Admin user setup will be handled separately')
    
    console.log('')
    console.log('🎉 Database setup completed!')
    console.log('')
    console.log('📋 Next steps:')
    console.log('   1. Run: npm run import:all-pages')
    console.log('   2. Run: npm run setup:admin')
    console.log('   3. Start dev server: npm run dev')
    console.log('   4. Access admin: http://localhost:3000/admin/login')
    console.log('')
    console.log('🔐 Admin credentials:')
    console.log('   Email: admin@amentiai.com')
    console.log('   Password: admin123')
    
  } catch (error) {
    console.error('❌ Database setup failed:', error)
    throw error
  } finally {
    client.release()
  }
}

setupFullDatabase()
  .then(() => {
    console.log('')
    console.log('✅ Full database setup process completed!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('')
    console.error('❌ Full database setup failed:', error)
    process.exit(1)
  })










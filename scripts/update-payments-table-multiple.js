const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_jzymWCDE7IF4@ep-calm-field-adqp91o1-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: {
    rejectUnauthorized: false
  }
})

async function updatePaymentsTable() {
  const client = await pool.connect()
  
  try {
    console.log('Updating client_payments table for multiple payments...')
    
    // Remove the UNIQUE constraint on client_id to allow multiple payments per client
    await client.query(`
      ALTER TABLE client_payments 
      DROP CONSTRAINT IF EXISTS client_payments_client_id_key;
    `)
    
    console.log('✓ Removed unique constraint on client_id')
    
    // Add is_active column to track active/cancelled payments
    await client.query(`
      ALTER TABLE client_payments 
      ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;
    `)
    
    console.log('✓ Added is_active column')
    
    // Add status column for payment tracking
    await client.query(`
      ALTER TABLE client_payments 
      ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'active';
    `)
    
    console.log('✓ Added status column')
    
    // Add start_date column
    await client.query(`
      ALTER TABLE client_payments 
      ADD COLUMN IF NOT EXISTS start_date DATE DEFAULT CURRENT_DATE;
    `)
    
    console.log('✓ Added start_date column')
    
  } catch (error) {
    console.error('Error updating payments table:', error)
    throw error
  } finally {
    client.release()
    await pool.end()
  }
}

updatePaymentsTable()
  .then(() => {
    console.log('\n✓ Database update complete')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Update failed:', error)
    process.exit(1)
  })


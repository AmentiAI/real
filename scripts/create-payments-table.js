const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_jzymWCDE7IF4@ep-calm-field-adqp91o1-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: {
    rejectUnauthorized: false
  }
})

async function createPaymentsTable() {
  const client = await pool.connect()
  
  try {
    console.log('Creating client_payments table...')
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS client_payments (
        id SERIAL PRIMARY KEY,
        client_id INTEGER NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
        package_id INTEGER REFERENCES packages(id) ON DELETE SET NULL,
        package_name VARCHAR(255),
        amount DECIMAL(10, 2),
        billing_frequency VARCHAR(50) DEFAULT 'monthly',
        next_billing_date DATE,
        is_custom BOOLEAN DEFAULT FALSE,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(client_id)
      )
    `)
    
    console.log('✓ client_payments table created successfully')
    
    // Add indexes for better performance
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_client_payments_client_id ON client_payments(client_id);
      CREATE INDEX IF NOT EXISTS idx_client_payments_package_id ON client_payments(package_id);
      CREATE INDEX IF NOT EXISTS idx_client_payments_next_billing_date ON client_payments(next_billing_date);
    `)
    
    console.log('✓ Indexes created successfully')
    
  } catch (error) {
    console.error('Error creating payments table:', error)
    throw error
  } finally {
    client.release()
    await pool.end()
  }
}

createPaymentsTable()
  .then(() => {
    console.log('\n✓ Database setup complete')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Setup failed:', error)
    process.exit(1)
  })


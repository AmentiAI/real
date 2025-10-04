const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_jzymWCDE7IF4@ep-calm-field-adqp91o1-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: {
    rejectUnauthorized: false
  }
});

async function migrateClientsSchema() {
  const client = await pool.connect();
  
  try {
    console.log('Starting clients table migration...');

    // Check if columns exist and add them if they don't
    const columnsToAdd = [
      {
        name: 'website_status',
        definition: 'VARCHAR(50) DEFAULT \'not_started\''
      },
      {
        name: 'seo_status', 
        definition: 'VARCHAR(50) DEFAULT \'not_started\''
      },
      {
        name: 'billing_date',
        definition: 'DATE'
      },
      {
        name: 'join_date',
        definition: 'DATE'
      },
      {
        name: 'payment_method',
        definition: 'VARCHAR(100)'
      }
    ];

    for (const column of columnsToAdd) {
      try {
        // Check if column exists
        const checkQuery = `
          SELECT column_name 
          FROM information_schema.columns 
          WHERE table_name = 'clients' 
          AND column_name = $1
        `;
        const result = await client.query(checkQuery, [column.name]);
        
        if (result.rows.length === 0) {
          console.log(`Adding column: ${column.name}`);
          await client.query(`ALTER TABLE clients ADD COLUMN ${column.name} ${column.definition}`);
          console.log(`✓ Added ${column.name}`);
        } else {
          console.log(`✓ Column ${column.name} already exists`);
        }
      } catch (error) {
        console.error(`Error adding column ${column.name}:`, error.message);
      }
    }

    // Create client_keywords table if it doesn't exist
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS client_keywords (
          id SERIAL PRIMARY KEY,
          client_id INTEGER NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
          keyword VARCHAR(255) NOT NULL,
          target_url VARCHAR(500),
          current_rank INTEGER,
          target_rank INTEGER,
          difficulty VARCHAR(20) DEFAULT 'medium',
          search_volume INTEGER,
          competition VARCHAR(20) DEFAULT 'medium',
          notes TEXT,
          is_active BOOLEAN DEFAULT true,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('✓ client_keywords table created/verified');
    } catch (error) {
      console.error('Error creating client_keywords table:', error.message);
    }

    // Update existing clients with default values for new columns
    try {
      await client.query(`
        UPDATE clients 
        SET 
          website_status = COALESCE(website_status, 'not_started'),
          seo_status = COALESCE(seo_status, 'not_started'),
          join_date = COALESCE(join_date, CURRENT_DATE)
        WHERE website_status IS NULL OR seo_status IS NULL
      `);
      console.log('✓ Updated existing clients with default values');
    } catch (error) {
      console.error('Error updating existing clients:', error.message);
    }

    console.log('✅ Clients table migration completed successfully!');
    
    // Show final table structure
    const tableInfo = await client.query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_name = 'clients'
      ORDER BY ordinal_position
    `);
    
    console.log('\nFinal clients table structure:');
    tableInfo.rows.forEach(row => {
      console.log(`  ${row.column_name}: ${row.data_type} ${row.is_nullable === 'NO' ? 'NOT NULL' : ''} ${row.column_default ? `DEFAULT ${row.column_default}` : ''}`);
    });

  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

// Run the migration
migrateClientsSchema().catch(console.error);





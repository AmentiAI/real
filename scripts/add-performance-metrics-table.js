const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_jzymWCDE7IF4@ep-calm-field-adqp91o1-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: {
    rejectUnauthorized: false
  }
});

async function addPerformanceMetricsTable() {
  const client = await pool.connect();
  
  try {
    // Create performance_metrics table
    await client.query(`
      CREATE TABLE IF NOT EXISTS performance_metrics (
        id SERIAL PRIMARY KEY,
        client_id INTEGER NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
        metric_type VARCHAR(50) NOT NULL,
        metric_value DECIMAL(10,2) NOT NULL,
        previous_value DECIMAL(10,2),
        change_percentage DECIMAL(5,2),
        measurement_date DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create website_analytics table for more detailed analytics
    await client.query(`
      CREATE TABLE IF NOT EXISTS website_analytics (
        id SERIAL PRIMARY KEY,
        client_id INTEGER NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
        date DATE NOT NULL,
        organic_traffic INTEGER DEFAULT 0,
        organic_traffic_change DECIMAL(5,2) DEFAULT 0,
        click_through_rate DECIMAL(5,2) DEFAULT 0,
        click_through_rate_change DECIMAL(5,2) DEFAULT 0,
        average_position DECIMAL(5,2) DEFAULT 0,
        average_position_change DECIMAL(5,2) DEFAULT 0,
        impressions INTEGER DEFAULT 0,
        clicks INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(client_id, date)
      )
    `);

    console.log('Performance metrics tables created successfully!');

  } catch (error) {
    console.error('Error creating performance metrics tables:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

addPerformanceMetricsTable();



const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_jzymWCDE7IF4@ep-calm-field-adqp91o1-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: {
    rejectUnauthorized: false
  }
});

async function checkTestClient() {
  const client = await pool.connect();
  
  try {
    const result = await client.query('SELECT id, name, email FROM clients WHERE email = $1', ['test@example.com']);
    
    if (result.rows.length > 0) {
      console.log('Test client found:');
      console.log(JSON.stringify(result.rows[0], null, 2));
    } else {
      console.log('No test client found with email test@example.com');
      console.log('Available clients:');
      const allClients = await client.query('SELECT id, name, email FROM clients ORDER BY id');
      console.log(JSON.stringify(allClients.rows, null, 2));
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

checkTestClient();



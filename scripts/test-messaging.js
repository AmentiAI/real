const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_jzymWCDE7IF4@ep-calm-field-adqp91o1-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: {
    rejectUnauthorized: false
  }
});

async function testMessaging() {
  const client = await pool.connect();
  
  try {
    // Get the first client
    const clientResult = await client.query('SELECT id, name, email FROM clients LIMIT 1');
    
    if (clientResult.rows.length === 0) {
      console.log('No clients found. Please create a client first.');
      return;
    }

    const testClient = clientResult.rows[0];
    console.log(`Testing messaging with client: ${testClient.name} (${testClient.email})`);

    // Send a test message from admin to client
    const messageResult = await client.query(`
      INSERT INTO client_messages (client_id, sender_type, subject, message, priority) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING id, created_at
    `, [testClient.id, 'admin', 'Test Message', 'This is a test message to verify real-time messaging is working!', 'normal']);

    console.log('✅ Test message sent successfully!');
    console.log(`Message ID: ${messageResult.rows[0].id}`);
    console.log(`Sent at: ${messageResult.rows[0].created_at}`);
    console.log('\nYou should see this message appear in both admin and client interfaces without refreshing!');

  } catch (error) {
    console.error('Error testing messaging:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

testMessaging();



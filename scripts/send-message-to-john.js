const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_jzymWCDE7IF4@ep-calm-field-adqp91o1-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: {
    rejectUnauthorized: false
  }
});

async function sendMessageToJohn() {
  const client = await pool.connect();
  
  try {
    // Send a message from admin to John Smith (client ID 4)
    const result = await client.query(`
      INSERT INTO client_messages (client_id, sender_type, subject, message, priority) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING id, created_at
    `, [4, 'admin', 'Welcome to Amenti AI!', 'Hello John! Welcome to our digital marketing platform. We\'re excited to help grow your business with our AI-powered strategies.', 'normal']);

    console.log('✅ Message sent to John Smith successfully!');
    console.log(`Message ID: ${result.rows[0].id}`);
    console.log(`Sent at: ${result.rows[0].created_at}`);
    console.log('\nJohn should now see this message in his client portal!');

  } catch (error) {
    console.error('Error sending message:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

sendMessageToJohn();



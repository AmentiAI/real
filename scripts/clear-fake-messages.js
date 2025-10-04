const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_jzymWCDE7IF4@ep-calm-field-adqp91o1-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: {
    rejectUnauthorized: false
  }
});

async function clearFakeMessages() {
  const client = await pool.connect();
  
  try {
    // Clear all existing messages to start fresh
    await client.query('DELETE FROM client_messages');
    
    console.log('All fake messages cleared successfully!');
    console.log('The messaging system is now ready for real admin-client communication.');

  } catch (error) {
    console.error('Error clearing messages:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

clearFakeMessages();



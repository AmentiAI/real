const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_jzymWCDE7IF4@ep-calm-field-adqp91o1-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: {
    rejectUnauthorized: false
  }
});

async function verifyKeywords() {
  const client = await pool.connect();
  
  try {
    // Get total count
    const totalResult = await client.query('SELECT COUNT(*) as count FROM keywords');
    console.log(`Total keywords in database: ${totalResult.rows[0].count}`);

    // Get count by state
    const stateResult = await client.query(`
      SELECT state, COUNT(*) as count 
      FROM keywords 
      GROUP BY state 
      ORDER BY state
    `);
    
    console.log('\nKeywords by state:');
    stateResult.rows.forEach(row => {
      console.log(`  ${row.state}: ${row.count} keywords`);
    });

    // Get count by category
    const categoryResult = await client.query(`
      SELECT category, COUNT(*) as count 
      FROM keywords 
      GROUP BY category 
      ORDER BY count DESC
    `);
    
    console.log('\nKeywords by category:');
    categoryResult.rows.forEach(row => {
      console.log(`  ${row.category}: ${row.count} keywords`);
    });

    // Show sample keywords
    console.log('\nSample keywords:');
    const sampleResult = await client.query(`
      SELECT keyword, state, category 
      FROM keywords 
      ORDER BY state, category, keyword 
      LIMIT 10
    `);
    
    sampleResult.rows.forEach(row => {
      console.log(`  ${row.keyword} (${row.state} - ${row.category})`);
    });

  } catch (error) {
    console.error('Error verifying keywords:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

verifyKeywords();



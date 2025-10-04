const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_jzymWCDE7IF4@ep-calm-field-adqp91o1-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: {
    rejectUnauthorized: false
  }
});

const keywords = [
  // Rhode Island Keywords
  { keyword: 'Rhode Island SEO', state: 'Rhode Island', category: 'SEO' },
  { keyword: 'Rhode Island Website Design', state: 'Rhode Island', category: 'Website Design' },
  { keyword: 'Rhode Island Internet Marketing', state: 'Rhode Island', category: 'Internet Marketing' },
  { keyword: 'Rhode Island SEO Agency', state: 'Rhode Island', category: 'SEO Agency' },
  { keyword: 'Best Rhode Island SEO Company', state: 'Rhode Island', category: 'SEO Company' },
  { keyword: 'Affordable Rhode Island Website Design', state: 'Rhode Island', category: 'Website Design' },
  { keyword: 'Rhode Island Web Development Services', state: 'Rhode Island', category: 'Web Development' },
  { keyword: 'Rhode Island Internet Marketing Agency', state: 'Rhode Island', category: 'Internet Marketing' },
  { keyword: 'Local Rhode Island SEO Experts', state: 'Rhode Island', category: 'SEO Experts' },
  { keyword: 'Rhode Island Digital Marketing & SEO Agency', state: 'Rhode Island', category: 'Digital Marketing' },
  
  // Connecticut Keywords
  { keyword: 'Connecticut SEO', state: 'Connecticut', category: 'SEO' },
  { keyword: 'Connecticut Website Design', state: 'Connecticut', category: 'Website Design' },
  { keyword: 'Connecticut Internet Marketing', state: 'Connecticut', category: 'Internet Marketing' },
  { keyword: 'Connecticut SEO Agency', state: 'Connecticut', category: 'SEO Agency' },
  { keyword: 'Best Connecticut SEO Company', state: 'Connecticut', category: 'SEO Company' },
  { keyword: 'Affordable Connecticut Website Design', state: 'Connecticut', category: 'Website Design' },
  { keyword: 'Connecticut Web Development Services', state: 'Connecticut', category: 'Web Development' },
  { keyword: 'Connecticut Internet Marketing Agency', state: 'Connecticut', category: 'Internet Marketing' },
  { keyword: 'Local Connecticut SEO Experts', state: 'Connecticut', category: 'SEO Experts' },
  { keyword: 'Connecticut Digital Marketing & SEO Agency', state: 'Connecticut', category: 'Digital Marketing' },
  
  // Massachusetts Keywords
  { keyword: 'Massachusetts SEO', state: 'Massachusetts', category: 'SEO' },
  { keyword: 'Massachusetts Website Design', state: 'Massachusetts', category: 'Website Design' },
  { keyword: 'Massachusetts Internet Marketing', state: 'Massachusetts', category: 'Internet Marketing' },
  { keyword: 'Massachusetts SEO Agency', state: 'Massachusetts', category: 'SEO Agency' },
  { keyword: 'Best Massachusetts SEO Company', state: 'Massachusetts', category: 'SEO Company' },
  { keyword: 'Affordable Massachusetts Website Design', state: 'Massachusetts', category: 'Website Design' },
  { keyword: 'Massachusetts Web Development Services', state: 'Massachusetts', category: 'Web Development' },
  { keyword: 'Massachusetts Internet Marketing Agency', state: 'Massachusetts', category: 'Internet Marketing' },
  { keyword: 'Local Massachusetts SEO Experts', state: 'Massachusetts', category: 'SEO Experts' },
  { keyword: 'Massachusetts Digital Marketing & SEO Agency', state: 'Massachusetts', category: 'Digital Marketing' }
];

async function createKeywordsTable() {
  const client = await pool.connect();
  
  try {
    // Create keywords table
    await client.query(`
      CREATE TABLE IF NOT EXISTS keywords (
        id SERIAL PRIMARY KEY,
        keyword VARCHAR(255) NOT NULL UNIQUE,
        state VARCHAR(100) NOT NULL,
        category VARCHAR(100) NOT NULL,
        search_volume INTEGER DEFAULT 0,
        difficulty VARCHAR(20) DEFAULT 'medium',
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('✅ Keywords table created successfully!');

    // Insert keywords
    for (const keywordData of keywords) {
      try {
        await client.query(`
          INSERT INTO keywords (keyword, state, category) 
          VALUES ($1, $2, $3) 
          ON CONFLICT (keyword) DO NOTHING
        `, [keywordData.keyword, keywordData.state, keywordData.category]);
      } catch (error) {
        console.log(`Skipped duplicate keyword: ${keywordData.keyword}`);
      }
    }

    console.log(`✅ Inserted ${keywords.length} keywords successfully!`);

    // Verify insertion
    const result = await client.query('SELECT COUNT(*) as count FROM keywords');
    console.log(`Total keywords in database: ${result.rows[0].count}`);

  } catch (error) {
    console.error('Error creating keywords table:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

createKeywordsTable();



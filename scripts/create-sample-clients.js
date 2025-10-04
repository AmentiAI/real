const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_jzymWCDE7IF4@ep-calm-field-adqp91o1-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: {
    rejectUnauthorized: false
  }
});

async function createSampleClients() {
  const client = await pool.connect();
  
  try {
    // Create sample clients
    const sampleClients = [
      {
        name: 'John Smith',
        email: 'john@example.com',
        password: await bcrypt.hash('password123', 10),
        company: 'Smith & Associates',
        website: 'https://smithassociates.com',
        industry: 'Legal Services',
        location: 'Providence, RI',
        status: 'active',
        website_status: 'active',
        seo_status: 'active',
        join_date: '2024-01-15'
      },
      {
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        password: await bcrypt.hash('password123', 10),
        company: 'Johnson Medical Group',
        website: 'https://johnsonmedical.com',
        industry: 'Healthcare',
        location: 'Cranston, RI',
        status: 'active',
        website_status: 'active',
        seo_status: 'active',
        join_date: '2024-02-01'
      },
      {
        name: 'Mike Rodriguez',
        email: 'mike@example.com',
        password: await bcrypt.hash('password123', 10),
        company: 'Rodriguez Roofing',
        website: 'https://rodriguezroofing.com',
        industry: 'Construction',
        location: 'Warwick, RI',
        status: 'active',
        website_status: 'in_progress',
        seo_status: 'not_started',
        join_date: '2024-03-10'
      }
    ];

    for (const clientData of sampleClients) {
      // Insert client
      const clientResult = await client.query(
        'INSERT INTO clients (name, email, password, company, website, industry, location, status, website_status, seo_status, join_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id',
        [clientData.name, clientData.email, clientData.password, clientData.company, clientData.website, clientData.industry, clientData.location, clientData.status, clientData.website_status, clientData.seo_status, clientData.join_date]
      );

      const clientId = clientResult.rows[0].id;

      // Add sample keywords for each client
      const keywords = [
        { keyword: 'personal injury lawyer providence', target_rank: 1, search_volume: 1200, difficulty: 'high', competition: 'high' },
        { keyword: 'car accident attorney ri', target_rank: 3, search_volume: 800, difficulty: 'medium', competition: 'medium' },
        { keyword: 'workers compensation lawyer', target_rank: 5, search_volume: 600, difficulty: 'medium', competition: 'medium' }
      ];

      for (const keyword of keywords) {
        await client.query(
          'INSERT INTO client_keywords (client_id, keyword, target_rank, search_volume, difficulty, competition, current_rank) VALUES ($1, $2, $3, $4, $5, $6, $7)',
          [clientId, keyword.keyword, keyword.target_rank, keyword.search_volume, keyword.difficulty, keyword.competition, Math.floor(Math.random() * 20) + 1]
        );
      }

      // Add sample projects
      const projects = [
        {
          title: 'Website Redesign',
          description: 'Complete website redesign with modern UI/UX',
          services_used: ['Website Design', 'SEO Optimization'],
          results: { traffic_increase: '150%', conversion_rate: '25%' }
        },
        {
          title: 'Local SEO Campaign',
          description: 'Local SEO optimization for better visibility',
          services_used: ['Local SEO', 'Google My Business'],
          results: { rankings_improved: '12 keywords', local_visibility: '300%' }
        }
      ];

      for (const project of projects) {
        await client.query(
          'INSERT INTO projects (client_id, title, description, services_used, results) VALUES ($1, $2, $3, $4, $5)',
          [clientId, project.title, project.description, JSON.stringify(project.services_used), JSON.stringify(project.results)]
        );
      }

      // No fake messages - real communication only

      console.log(`Created client: ${clientData.name} (${clientData.email})`);
    }

    console.log('Sample clients created successfully!');
    console.log('\nTest credentials:');
    console.log('Email: john@example.com | Password: password123');
    console.log('Email: sarah@example.com | Password: password123');
    console.log('Email: mike@example.com | Password: password123');

  } catch (error) {
    console.error('Error creating sample clients:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

createSampleClients();

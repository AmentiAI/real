const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function checkPackages() {
  try {
    console.log('Checking packages in database...\n');
    
    // Get all packages
    const result = await pool.query(`
      SELECT id, name, description, price, currency, billing_period, is_popular, is_active, display_order
      FROM packages 
      ORDER BY display_order ASC
    `);
    
    console.log('Packages found:', result.rows.length);
    console.log('\nPackage details:');
    result.rows.forEach((pkg, index) => {
      console.log(`${index + 1}. ${pkg.name}`);
      console.log(`   Price: $${pkg.price}/${pkg.billing_period}`);
      console.log(`   Popular: ${pkg.is_popular}`);
      console.log(`   Active: ${pkg.is_active}`);
      console.log(`   Display Order: ${pkg.display_order}`);
      console.log('');
    });
    
    // Check if we have exactly 3 packages
    if (result.rows.length < 3) {
      console.log('⚠️  Less than 3 packages found. Adding missing packages...');
      
      // Add missing packages to reach 3
      const packagesToAdd = [
        {
          name: 'Basic SEO Package',
          description: 'Essential SEO services to get your business started online',
          price: 500,
          currency: 'USD',
          billing_period: 'monthly',
          features: ['Keyword research', 'On-page optimization', 'Google My Business setup', 'Monthly reporting', 'Basic analytics'],
          is_popular: false,
          is_active: true,
          display_order: 1
        },
        {
          name: 'Professional SEO Package',
          description: 'Comprehensive SEO strategy for established businesses',
          price: 1200,
          currency: 'USD',
          billing_period: 'monthly',
          features: ['Advanced keyword research', 'Technical SEO audit', 'Content strategy', 'Link building', 'Local SEO', 'Monthly reporting', 'Analytics dashboard'],
          is_popular: true,
          is_active: true,
          display_order: 2
        },
        {
          name: 'Enterprise SEO Package',
          description: 'Full-scale SEO solution for large businesses',
          price: 2500,
          currency: 'USD',
          billing_period: 'monthly',
          features: ['Complete SEO audit', 'Advanced technical optimization', 'Content marketing', 'Advanced link building', 'Local & national SEO', 'Competitor analysis', 'Custom reporting', 'Dedicated account manager'],
          is_popular: false,
          is_active: true,
          display_order: 3
        }
      ];
      
      // Clear existing packages first
      await pool.query('DELETE FROM packages');
      
      // Insert new packages
      for (const pkg of packagesToAdd) {
        await pool.query(`
          INSERT INTO packages (name, description, price, currency, billing_period, features, is_popular, is_active, display_order)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        `, [
          pkg.name,
          pkg.description,
          pkg.price,
          pkg.currency,
          pkg.billing_period,
          JSON.stringify(pkg.features),
          pkg.is_popular,
          pkg.is_active,
          pkg.display_order
        ]);
      }
      
      console.log('✅ Added 3 packages successfully!');
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await pool.end();
  }
}

checkPackages();



const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function checkPackages() {
  try {
    // Check if packages table exists and has data
    const result = await pool.query('SELECT COUNT(*) FROM packages');
    console.log('Packages count:', result.rows[0].count);
    
    if (result.rows[0].count === '0') {
      console.log('No packages found. Adding sample packages...');
      
      // Insert sample packages
      await pool.query(`
        INSERT INTO packages (name, description, price, currency, billing_period, features, is_popular, is_active, display_order)
        VALUES 
        ('Basic SEO Package', 'Essential SEO services to get your business started online', 500, 'USD', 'monthly', 
         '["Keyword research", "On-page optimization", "Google My Business setup", "Monthly reporting", "Basic analytics"]', 
         false, true, 1),
        ('Professional SEO Package', 'Comprehensive SEO strategy for established businesses', 1200, 'USD', 'monthly', 
         '["Advanced keyword research", "Technical SEO audit", "Content strategy", "Link building", "Local SEO", "Monthly reporting", "Analytics dashboard"]', 
         true, true, 2),
        ('Enterprise SEO Package', 'Full-scale SEO solution for large businesses', 2500, 'USD', 'monthly', 
         '["Complete SEO audit", "Advanced technical optimization", "Content marketing", "Advanced link building", "Local & national SEO", "Competitor analysis", "Custom reporting", "Dedicated account manager"]', 
         false, true, 3),
        ('Starter Website Package', 'Professional website for small businesses', 800, 'USD', 'one-time', 
         '["Custom domain + hosting setup", "5-7 professionally designed pages", "Mobile-responsive design", "Contact form integration", "Basic SEO setup", "1 year hosting included"]', 
         false, true, 4),
        ('Professional Website Package', 'Advanced website with custom features', 1500, 'USD', 'one-time', 
         '["Custom domain + hosting setup", "10-15 professionally designed pages", "Mobile-responsive design", "Advanced contact forms", "SEO optimization", "Blog integration", "E-commerce ready", "2 years hosting included"]', 
         true, true, 5),
        ('Enterprise Website Package', 'Full-scale website solution', 3000, 'USD', 'one-time', 
         '["Custom domain + hosting setup", "Unlimited pages", "Custom design", "Advanced functionality", "E-commerce integration", "Advanced SEO", "Content management system", "3 years hosting included", "Priority support"]', 
         false, true, 6),
        ('Complete Growth Package', 'All-in-one digital marketing solution', 2000, 'USD', 'monthly', 
         '["SEO services", "Website maintenance", "Social media management", "Content creation", "Email marketing", "Analytics & reporting", "Monthly strategy calls"]', 
         true, true, 7)
      `);
      
      console.log('Sample packages added successfully!');
    }
    
    // Show current packages
    const packages = await pool.query('SELECT * FROM packages ORDER BY display_order');
    console.log('\nCurrent packages:');
    packages.rows.forEach(pkg => {
      console.log(`- ${pkg.name}: $${pkg.price}/${pkg.billing_period} (Popular: ${pkg.is_popular})`);
    });
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await pool.end();
  }
}

checkPackages();



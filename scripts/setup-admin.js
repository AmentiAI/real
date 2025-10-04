const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_jzymWCDE7IF4@ep-calm-field-adqp91o1-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: {
    rejectUnauthorized: false
  }
});

async function setupAdmin() {
  const client = await pool.connect();
  
  try {
    console.log('🚀 Setting up Amenti AI admin system...\n');

    // Create admin user
    const email = 'admin@amentiai.com';
    const password = 'AmentiAdmin2024!';
    const name = 'Amenti AI Admin';
    
    const hashedPassword = await bcrypt.hash(password, 12);
    
    await client.query(
      'INSERT INTO users (email, password, name, role) VALUES ($1, $2, $3, $4) ON CONFLICT (email) DO UPDATE SET password = $2, name = $3',
      [email, hashedPassword, name, 'admin']
    );
    
    console.log('✅ Admin user created successfully!');
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
    
    // Create initial SEO data
    const seoData = [
      {
        page: 'home',
        title: 'Amenti AI - Professional Digital Marketing & SEO Services | Rhode Island',
        description: 'Professional internet marketing and SEO services for businesses across Rhode Island and the USA. We build websites and deliver high-powered SEO solutions that drive real results.',
        keywords: 'SEO services Rhode Island, digital marketing Providence, website development, internet marketing, local SEO, Rhode Island SEO company'
      },
      {
        page: 'services',
        title: 'Digital Marketing Services - Amenti AI | Rhode Island',
        description: 'Comprehensive digital marketing services including SEO, web design, and online advertising for Rhode Island businesses. Grow your business with our proven strategies.',
        keywords: 'digital marketing services, SEO services, web design, online advertising, Rhode Island marketing agency'
      },
      {
        page: 'contact',
        title: 'Contact Amenti AI - Get Your Free SEO Audit | Rhode Island',
        description: 'Ready to grow your business? Contact Amenti AI for professional digital marketing services. Get your free SEO audit and consultation today.',
        keywords: 'contact digital marketing agency, free SEO audit, Rhode Island marketing consultation'
      }
    ];

    for (const seo of seoData) {
      await client.query(
        'INSERT INTO seo_data (page, title, description, keywords) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING',
        [seo.page, seo.title, seo.description, seo.keywords]
      );
    }
    
    console.log('✅ SEO data initialized');
    
    console.log('\n🎉 Admin setup complete!');
    console.log('\n📋 Next steps:');
    console.log('1. Visit http://localhost:3000/admin to login');
    console.log('2. Add your services through the admin panel');
    console.log('3. Create blog posts and case studies');
    console.log('4. Set up your Stripe and SendGrid credentials');
    console.log('5. Configure your analytics tracking');
    
  } catch (error) {
    console.error('❌ Error setting up admin:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

setupAdmin();

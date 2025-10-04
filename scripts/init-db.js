const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_jzymWCDE7IF4@ep-calm-field-adqp91o1-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: {
    rejectUnauthorized: false
  }
});

async function initDatabase() {
  const client = await pool.connect();
  
  try {
    console.log('Initializing database schema...');

    // Users table (admin users)
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'admin',
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Clients table (business clients)
    await client.query(`
      CREATE TABLE IF NOT EXISTS clients (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        company VARCHAR(255),
        website VARCHAR(255),
        industry VARCHAR(100),
        location VARCHAR(255),
        status VARCHAR(50) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Drop existing services table if it exists and recreate with new structure
    await client.query(`DROP TABLE IF EXISTS service_tiers CASCADE`)
    await client.query(`DROP TABLE IF EXISTS services CASCADE`)

    // Services table
    await client.query(`
      CREATE TABLE services (
        id VARCHAR(100) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        icon VARCHAR(10),
        category VARCHAR(50) DEFAULT 'Direct Services',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Service tiers table
    await client.query(`
      CREATE TABLE service_tiers (
        id SERIAL PRIMARY KEY,
        service_id VARCHAR(100) REFERENCES services(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        price VARCHAR(50) NOT NULL,
        setup_price VARCHAR(50) DEFAULT '$0',
        monthly_price VARCHAR(50) DEFAULT '$0',
        period VARCHAR(20) DEFAULT 'one-time',
        popular BOOLEAN DEFAULT FALSE,
        best_for TEXT,
        features JSONB DEFAULT '[]',
        sort_order INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Portfolio/Projects table
    await client.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        image_url VARCHAR(500),
        client_id INTEGER REFERENCES clients(id),
        services_used JSONB,
        results JSONB,
        is_featured BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Content table for dynamic content
    await client.query(`
      CREATE TABLE IF NOT EXISTS content (
        id SERIAL PRIMARY KEY,
        page VARCHAR(100) NOT NULL,
        section VARCHAR(100) NOT NULL,
        title VARCHAR(255),
        content TEXT,
        content_type VARCHAR(50) DEFAULT 'text',
        order_index INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Contact inquiries table
    await client.query(`
      CREATE TABLE IF NOT EXISTS inquiries (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        company VARCHAR(255),
        message TEXT,
        service_interest VARCHAR(255),
        status VARCHAR(50) DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Client notes table
    await client.query(`
      CREATE TABLE IF NOT EXISTS client_notes (
        id SERIAL PRIMARY KEY,
        client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
        note TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Client communications table
    await client.query(`
      CREATE TABLE IF NOT EXISTS client_communications (
        id SERIAL PRIMARY KEY,
        client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
        type VARCHAR(50) NOT NULL CHECK (type IN ('email', 'call', 'meeting', 'note')),
        subject VARCHAR(255),
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Client documents table
    await client.query(`
      CREATE TABLE IF NOT EXISTS client_documents (
        id SERIAL PRIMARY KEY,
        client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        file_path VARCHAR(500) NOT NULL,
        file_type VARCHAR(100),
        file_size INTEGER,
        category VARCHAR(100) DEFAULT 'general',
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Blog posts table
    await client.query(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        excerpt TEXT,
        content TEXT,
        featured_image VARCHAR(500),
        author_id INTEGER REFERENCES users(id),
        is_published BOOLEAN DEFAULT false,
        published_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // SEO data table
    await client.query(`
      CREATE TABLE IF NOT EXISTS seo_data (
        id SERIAL PRIMARY KEY,
        page VARCHAR(100) NOT NULL,
        title VARCHAR(255),
        description TEXT,
        keywords TEXT,
        og_title VARCHAR(255),
        og_description TEXT,
        og_image VARCHAR(500),
        canonical_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert service data
    console.log('Inserting service data...');

    // Services with tiers
    await client.query(`
      INSERT INTO services (id, title, description, icon, category) VALUES
      ('complete-growth-packages', 'Complete Growth Packages', 'All-in-one solutions combining website development and SEO services for maximum business growth.', '🚀', 'Direct Services'),
      ('website-design', 'Website Design & Development', 'Professional websites that convert visitors into customers with modern design and advanced functionality.', '🖥️', 'Direct Services'),
      ('seo-services', 'SEO Services', 'Comprehensive SEO strategies that dominate search results and drive qualified traffic to your business.', '🔍', 'Direct Services'),
      ('white-label-seo', 'White Label SEO', 'Agency-focused SEO services that you can resell to your clients at 2-3x markup for maximum profit.', '🏷️', 'White Label Services'),
      ('white-label-web-design', 'White Label Website Design', 'Professional website design services for agencies to resell at 2-3x markup with full white-label support.', '🖥️', 'White Label Services')
      ON CONFLICT (id) DO NOTHING
    `);

    // Service tiers
    await client.query(`
      INSERT INTO service_tiers (service_id, name, price, setup_price, monthly_price, period, popular, best_for, features, sort_order) VALUES
      ('complete-growth-packages', 'Starter Growth Package', '$2,200 + $1,200/mo', '$2,200', '$1,200', 'setup + monthly', false, 'local shops, contractors, salons, restaurants', '["Up to 5-page SEO-ready site", "20 local keywords targeted", "Google Business optimization", "Basic backlinks"]', 0),
      ('complete-growth-packages', 'Business Growth Package', '$5,000 + $3,500/mo', '$5,000', '$3,500', 'setup + monthly', true, 'law firms, e-commerce shops, agencies, clinics', '["10-15 page custom website", "60 targeted keywords", "Full technical SEO audit", "4 SEO-optimized blogs/month"]', 1),
      ('complete-growth-packages', 'Enterprise Domination Package', '$12,500 + $8,000/mo', '$12,500', '$8,000', 'setup + monthly', false, 'franchises, SaaS, large e-commerce', '["20-30+ page premium website", "150 targeted keywords", "Enterprise technical SEO", "8+ blogs/month + automation"]', 2),
      ('website-design', 'Starter Website', '$1,000', '$1,000', '$0', 'one-time', false, 'small businesses, startups', '["Up to 5 SEO-ready pages", "Mobile-friendly design", "Basic SEO setup", "Google Analytics"]', 0),
      ('website-design', 'Growth Website', '$3,500', '$3,500', '$0', 'one-time', true, 'growing businesses', '["10-15 SEO-optimized pages", "Keyword-targeted copywriting", "Lead capture forms", "Blog system setup"]', 1),
      ('website-design', 'Dominate Website', '$7,500+', '$7,500', '$0', 'one-time', false, 'enterprise businesses', '["20-30+ pages", "Conversion funnels", "Multi-location SEO", "Custom integrations"]', 2),
      ('seo-services', 'Starter SEO', '$1,200', '$0', '$1,200', 'monthly', false, 'local businesses', '["20 local keywords", "Google Business optimization", "On-page SEO + citations", "Basic backlink building"]', 0),
      ('seo-services', 'Growth SEO', '$3,500', '$0', '$3,500', 'monthly', true, 'regional businesses', '["60 regional/national keywords", "Full technical SEO audit", "4 SEO-optimized blogs/month", "White-hat backlink campaigns"]', 1),
      ('seo-services', 'Dominate SEO', '$8,000+', '$0', '$8,000', 'monthly', false, 'enterprise businesses', '["150+ targeted keywords", "Enterprise technical SEO", "Advanced backlink outreach", "8+ blogs/month + automation"]', 2),
      ('white-label-seo', 'Starter SEO', '$1,200', '$0', '$1,200', 'monthly', false, 'small agencies', '["20 keywords (local focus)", "Google Business optimization", "On-page SEO + citations", "Monthly report (agency-branded)"]', 0),
      ('white-label-seo', 'Growth SEO', '$3,500', '$0', '$3,500', 'monthly', true, 'growing agencies', '["60 keywords (local + regional)", "Full technical SEO audit", "4 SEO-optimized blogs/month", "Live dashboard (whitelabel)"]', 1),
      ('white-label-seo', 'Dominate SEO', '$8,000', '$0', '$8,000', 'monthly', false, 'enterprise agencies', '["150 keywords (local + national)", "Enterprise technical SEO", "Advanced backlink outreach", "Dedicated account manager"]', 2),
      ('white-label-web-design', 'Starter Website', '$1,000', '$1,000', '$0', 'one-time', false, 'small agencies', '["Up to 5 SEO-optimized pages", "Responsive, mobile-friendly", "Basic SEO setup", "White-label delivery"]', 0),
      ('white-label-web-design', 'Growth Website', '$3,500', '$3,500', '$0', 'one-time', true, 'growing agencies', '["10-15 SEO-optimized pages", "Service + location landing pages", "Keyword-targeted copywriting", "White-label branding"]', 1),
      ('white-label-web-design', 'Dominate Website', '$7,500+', '$7,500', '$0', 'one-time', false, 'enterprise agencies', '["20-30+ custom pages", "Conversion funnels", "Multi-location SEO", "Full white-label support"]', 2)
      ON CONFLICT DO NOTHING
    `);

    // No clients or projects - will be populated with real data

    // Content
    await client.query(`
      INSERT INTO content (page, section, title, content, order_index) VALUES
      ('home', 'hero', 'Hero Title', 'High-Powered SEO Services for Your Business', 1),
      ('home', 'hero', 'Hero Subtitle', 'We build professional websites and deliver cutting-edge SEO solutions that drive real results for businesses across Rhode Island and the USA.', 2),
      ('home', 'services', 'Services Title', 'Our Services', 1),
      ('home', 'services', 'Services Subtitle', 'We offer comprehensive digital marketing solutions designed to grow your business and increase your online presence.', 2),
      ('home', 'portfolio', 'Portfolio Title', 'Our Portfolio', 1),
      ('home', 'portfolio', 'Portfolio Subtitle', 'See how we''ve helped businesses across Rhode Island and the USA achieve remarkable growth.', 2)
      ON CONFLICT DO NOTHING
    `);

    console.log('Database initialized successfully!');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Run the initialization
initDatabase()
  .then(() => {
    console.log('Database setup complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Database setup failed:', error);
    process.exit(1);
  });

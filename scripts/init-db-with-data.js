const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_jzymWCDE7IF4@ep-calm-field-adqp91o1-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: {
    rejectUnauthorized: false
  }
});

async function initDatabaseTables(client) {
  try {
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

    // Services table
    await client.query(`
      CREATE TABLE IF NOT EXISTS services (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        icon VARCHAR(100),
        category VARCHAR(100),
        is_active BOOLEAN DEFAULT true,
        order_index INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Reset sequences after clearing data (if table exists)
    try {
      await client.query(`SELECT setval(pg_get_serial_sequence('services', 'id'), 1, false)`);
    } catch (e) {
      // Sequence doesn't exist yet, that's okay
    }

    // Service tiers table
    await client.query(`
      CREATE TABLE IF NOT EXISTS service_tiers (
        id SERIAL PRIMARY KEY,
        service_id INTEGER REFERENCES services(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        price VARCHAR(100),
        setup_price DECIMAL(10,2),
        monthly_price DECIMAL(10,2),
        period VARCHAR(50),
        popular BOOLEAN DEFAULT false,
        best_for TEXT,
        features JSONB,
        sort_order INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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

    // Drop existing tables first
    await client.query('DROP TABLE IF EXISTS service_tiers CASCADE');
    await client.query('DROP TABLE IF EXISTS services CASCADE');
    await client.query('DROP TABLE IF EXISTS inquiries CASCADE');
    await client.query('DROP TABLE IF EXISTS blog_posts CASCADE');
    await client.query('DROP TABLE IF EXISTS seo_data CASCADE');
    await client.query('DROP TABLE IF EXISTS users CASCADE');
    await client.query('DROP TABLE IF EXISTS clients CASCADE');
    await client.query('DROP TABLE IF EXISTS projects CASCADE');
    await client.query('DROP TABLE IF EXISTS content CASCADE');
    console.log('Dropped existing tables');
    
    console.log('Database tables created successfully');
  } catch (error) {
    console.error('Error creating database tables:', error);
    throw error;
  }
}

async function initDatabaseWithData() {
  const client = await pool.connect();
  
  try {
    console.log('Initializing database with sample data...');

    // Create tables first (inline database initialization)
    await initDatabaseTables(client);

    // Insert sample services
    const services = [
      {
        title: 'Complete Growth Packages',
        description: 'All-in-one solutions combining website development with ongoing SEO for maximum business growth.',
        icon: 'Target',
        category: 'Complete Packages'
      },
      {
        title: 'Website Design & Development',
        description: 'Professional websites that convert visitors into customers with modern design and advanced functionality.',
        icon: 'Target',
        category: 'Development'
      },
      {
        title: 'SEO Services',
        description: 'Comprehensive SEO strategies that dominate search results and drive qualified traffic to your business.',
        icon: 'Search',
        category: 'SEO Services'
      }
    ];

    for (const service of services) {
      const serviceResult = await client.query(
        'INSERT INTO services (title, description, icon, category) VALUES ($1, $2, $3, $4) RETURNING id',
        [service.title, service.description, service.icon, service.category]
      );

      const serviceId = serviceResult.rows[0].id;

      // Insert service tiers
      const tiers = [
        {
          name: 'Starter Package',
          price: '$2,200 + $1,200/mo',
          popular: false,
          features: ['5-page SEO-ready website', '20 local keywords', 'Google Business optimization', 'Monthly SEO reports']
        },
        {
          name: 'Business Package',
          price: '$5,000 + $3,500/mo',
          popular: true,
          features: ['10-15 page custom website', '60 targeted keywords', 'Technical SEO audit', '4 blogs/month']
        },
        {
          name: 'Enterprise Package',
          price: '$12,500 + $8,000/mo',
          popular: false,
          features: ['20-30+ page premium website', '150 targeted keywords', 'Advanced backlink outreach', 'Dedicated account manager']
        }
      ];

      for (let i = 0; i < tiers.length; i++) {
        const tier = tiers[i];
        await client.query(
          `INSERT INTO service_tiers (service_id, name, price, popular, features, sort_order) 
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [
            serviceId,
            tier.name,
            tier.price,
            tier.popular,
            JSON.stringify(tier.features),
            i
          ]
        );
      }
    }

    // Insert sample admin user
    await client.query(
      'INSERT INTO users (email, password, name, role) VALUES ($1, $2, $3, $4) ON CONFLICT (email) DO NOTHING',
      ['admin@amentiai.com', 'admin123', 'Admin User', 'admin']
    );

    // Insert sample blog posts
    const blogPosts = [
      {
        title: 'How to Choose the Right SEO Agency for Your Business',
        slug: 'how-to-choose-seo-agency',
        excerpt: 'Learn the key factors to consider when selecting an SEO agency that will deliver real results for your business.',
        content: 'Full blog post content here...',
        is_published: true
      },
      {
        title: '10 Essential Elements of a High-Converting Website',
        slug: 'essential-website-elements',
        excerpt: 'Discover the must-have elements that turn website visitors into paying customers.',
        content: 'Full blog post content here...',
        is_published: true
      }
    ];

    for (const post of blogPosts) {
      await client.query(
        `INSERT INTO blog_posts (title, slug, excerpt, content, is_published, published_at) 
         VALUES ($1, $2, $3, $4, $5, NOW()) ON CONFLICT (slug) DO NOTHING`,
        [post.title, post.slug, post.excerpt, post.content, post.is_published]
      );
    }

    // Insert sample SEO data
    const seoData = [
      {
        page: 'home',
        title: 'Amenti AI - Internet Marketing & SEO Services | Rhode Island',
        description: 'Professional internet marketing and SEO services for businesses across Rhode Island and the USA. We build websites and deliver high-powered SEO solutions.',
        keywords: 'SEO, internet marketing, website development, digital marketing, Rhode Island, USA'
      },
      {
        page: 'services',
        title: 'Digital Marketing Services - Amenti AI',
        description: 'Comprehensive digital marketing services including SEO, web design, and online advertising for Rhode Island businesses.',
        keywords: 'digital marketing services, SEO services, web design, online advertising'
      }
    ];

    for (const seo of seoData) {
      await client.query(
        `INSERT INTO seo_data (page, title, description, keywords) 
         VALUES ($1, $2, $3, $4) ON CONFLICT (page) DO NOTHING`,
        [seo.page, seo.title, seo.description, seo.keywords]
      );
    }

    console.log('Database initialized with sample data successfully!');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

initDatabaseWithData().catch(console.error);

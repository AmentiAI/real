const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_jzymWCDE7IF4@ep-calm-field-adqp91o1-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: {
    rejectUnauthorized: false
  }
});

// Database schema initialization
async function initDatabase() {
  const client = await pool.connect();
  
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
        );

        CREATE TABLE IF NOT EXISTS website_content (
          id SERIAL PRIMARY KEY,
          section VARCHAR(100) NOT NULL,
          title VARCHAR(255) NOT NULL,
          subtitle VARCHAR(255),
          description TEXT,
          image TEXT,
          button_text VARCHAR(255),
          button_link VARCHAR(500),
          order_index INTEGER DEFAULT 0,
          active BOOLEAN DEFAULT true,
          content JSONB,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS pages (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          slug VARCHAR(255) UNIQUE NOT NULL,
          description TEXT,
          content TEXT,
          featured_image TEXT,
          meta_title VARCHAR(255),
          meta_description TEXT,
          meta_keywords TEXT,
          published BOOLEAN DEFAULT false,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS branding_settings (
          id SERIAL PRIMARY KEY,
          logo_light TEXT,
          logo_dark TEXT,
          favicon TEXT,
          primary_color VARCHAR(7) DEFAULT '#2563eb',
          secondary_color VARCHAR(7) DEFAULT '#64748b',
          accent_color VARCHAR(7) DEFAULT '#f59e0b',
          font_family VARCHAR(100) DEFAULT 'Inter',
          company_name VARCHAR(255) DEFAULT 'Amenti AI',
          tagline VARCHAR(255) DEFAULT 'Digital Marketing & SEO Services',
          contact_email VARCHAR(255) DEFAULT 'hello@amentiai.com',
          contact_phone VARCHAR(50) DEFAULT '(401) 123-4567',
          address TEXT DEFAULT 'Providence, Rhode Island',
          social_media JSONB DEFAULT '{}',
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

    // FAQ table
    await client.query(`
      CREATE TABLE IF NOT EXISTS faqs (
        id SERIAL PRIMARY KEY,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        category VARCHAR(100) DEFAULT 'general',
        order_index INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Social proof data table
    await client.query(`
      CREATE TABLE IF NOT EXISTS social_proof (
        id SERIAL PRIMARY KEY,
        type VARCHAR(50) NOT NULL,
        value VARCHAR(100) NOT NULL,
        label VARCHAR(255) NOT NULL,
        icon VARCHAR(100),
        order_index INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Client logos table
    await client.query(`
      CREATE TABLE IF NOT EXISTS client_logos (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        logo_url VARCHAR(500),
        website VARCHAR(500),
        order_index INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Key outcomes table
    await client.query(`
      CREATE TABLE IF NOT EXISTS key_outcomes (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        metric VARCHAR(100) NOT NULL,
        description TEXT,
        icon VARCHAR(100),
        color VARCHAR(50) DEFAULT 'bg-blue-500',
        bg_color VARCHAR(50) DEFAULT 'bg-blue-50',
        order_index INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Case studies table
    await client.query(`
      CREATE TABLE IF NOT EXISTS case_studies (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        before_value VARCHAR(100),
        after_value VARCHAR(100),
        improvement VARCHAR(100),
        description TEXT,
        image_url VARCHAR(500),
        is_featured BOOLEAN DEFAULT false,
        order_index INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Credentials table
    await client.query(`
      CREATE TABLE IF NOT EXISTS credentials (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        icon VARCHAR(100),
        order_index INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Media mentions table
    await client.query(`
      CREATE TABLE IF NOT EXISTS media_mentions (
        id SERIAL PRIMARY KEY,
        mention TEXT NOT NULL,
        order_index INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Process steps table
    await client.query(`
      CREATE TABLE IF NOT EXISTS process_steps (
        id SERIAL PRIMARY KEY,
        step_number INTEGER NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        order_index INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Location-specific content table
    await client.query(`
      CREATE TABLE IF NOT EXISTS location_content (
        id SERIAL PRIMARY KEY,
        location VARCHAR(100) NOT NULL,
        page_title VARCHAR(255) NOT NULL,
        hero_title VARCHAR(255) NOT NULL,
        hero_description TEXT,
        stats JSONB DEFAULT '[]',
        success_story JSONB,
        cta_title VARCHAR(255),
        cta_description TEXT,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Industry-specific content table
    await client.query(`
      CREATE TABLE IF NOT EXISTS industry_content (
        id SERIAL PRIMARY KEY,
        industry VARCHAR(100) NOT NULL,
        page_title VARCHAR(255) NOT NULL,
        hero_title VARCHAR(255) NOT NULL,
        hero_description TEXT,
        services JSONB DEFAULT '[]',
        benefits JSONB DEFAULT '[]',
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // CTA content table
    await client.query(`
      CREATE TABLE IF NOT EXISTS cta_content (
        id SERIAL PRIMARY KEY,
        section VARCHAR(100) NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        primary_button_text VARCHAR(255),
        primary_button_link VARCHAR(500),
        secondary_button_text VARCHAR(255),
        secondary_button_link VARCHAR(500),
        trust_indicators JSONB DEFAULT '[]',
        microcopy TEXT,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Hero content table
    await client.query(`
      CREATE TABLE IF NOT EXISTS hero_content (
        id SERIAL PRIMARY KEY,
        page VARCHAR(100) NOT NULL,
        trust_badge_text VARCHAR(255),
        main_headline VARCHAR(255) NOT NULL,
        guarantee_text VARCHAR(255),
        supporting_text TEXT,
        primary_button_text VARCHAR(255),
        primary_button_link VARCHAR(500),
        secondary_button_text VARCHAR(255),
        secondary_button_link VARCHAR(500),
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Footer content table
    await client.query(`
      CREATE TABLE IF NOT EXISTS footer_content (
        id SERIAL PRIMARY KEY,
        company_name VARCHAR(255) NOT NULL,
        description TEXT,
        quick_links JSONB DEFAULT '[]',
        contact_info JSONB DEFAULT '{}',
        social_links JSONB DEFAULT '{}',
        copyright_text VARCHAR(255),
        legal_links JSONB DEFAULT '[]',
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Database schema initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Migration function
async function migrateHardcodedContent() {
  const client = await pool.connect();
  
  try {
    console.log('Starting migration of hardcoded content to database...');

    // 1. Migrate FAQs
    console.log('Migrating FAQs...');
    const faqs = [
      {
        question: "How quickly will I see results from your SEO services?",
        answer: "Most clients see initial improvements in rankings within 30-60 days, with significant lead increases typically occurring within 90 days. Our average client sees a 247% increase in organic leads within 12 weeks.",
        category: "general",
        order_index: 1
      },
      {
        question: "Do you guarantee results?",
        answer: "Yes! If we don't increase your organic leads by at least 25% in 90 days, we'll work for free the next month until we do. We're confident in our process and stand behind our work.",
        category: "general",
        order_index: 2
      },
      {
        question: "What makes you different from other SEO agencies?",
        answer: "We're Rhode Island natives who understand local business challenges. We combine technical expertise with deep local market knowledge and provide transparent reporting with real results, not vanity metrics.",
        category: "general",
        order_index: 3
      },
      {
        question: "How much do your services cost?",
        answer: "Our SEO services start at $2,500/month for local businesses. We also offer website development starting at $5,000 and digital marketing packages from $3,000/month. Every package is customized to your specific needs and goals.",
        category: "general",
        order_index: 4
      },
      {
        question: "Do you work with businesses outside of Rhode Island?",
        answer: "While we specialize in Rhode Island businesses, we work with clients across New England and select national accounts. Our local expertise gives us unique insights into regional market dynamics.",
        category: "general",
        order_index: 5
      },
      {
        question: "What information do you need to get started?",
        answer: "We'll need access to your Google Analytics, Google Search Console, and website hosting. We also need to understand your current marketing efforts, target keywords, and business goals. We handle all the technical setup.",
        category: "general",
        order_index: 6
      },
      {
        question: "How do you measure success?",
        answer: "We focus on metrics that matter to your business: organic leads, phone calls, form submissions, and revenue. We track rankings, traffic, and conversions, but our primary goal is increasing your qualified leads and sales.",
        category: "general",
        order_index: 7
      }
    ];

    for (const faq of faqs) {
      await client.query(
        'INSERT INTO faqs (question, answer, category, order_index) VALUES ($1, $2, $3, $4)',
        [faq.question, faq.answer, faq.category, faq.order_index]
      );
    }

    // 2. Migrate Social Proof
    console.log('Migrating social proof...');
    const socialProof = [
      { type: 'rating', value: '4.9', label: 'Google Rating', icon: 'Star', order_index: 1 },
      { type: 'clients', value: '150+', label: 'Happy Clients', icon: 'Users', order_index: 2 },
      { type: 'awards', value: '5', label: 'Years Experience', icon: 'Award', order_index: 3 },
      { type: 'guarantee', value: '100%', label: 'Satisfaction', icon: 'CheckCircle', order_index: 4 }
    ];

    for (const proof of socialProof) {
      await client.query(
        'INSERT INTO social_proof (type, value, label, icon, order_index) VALUES ($1, $2, $3, $4, $5)',
        [proof.type, proof.value, proof.label, proof.icon, proof.order_index]
      );
    }

    // 3. Migrate Client Logos
    console.log('Migrating client logos...');
    const clientLogos = [
      { name: 'Smith Restaurant Group', order_index: 1 },
      { name: 'Providence Law Firm', order_index: 2 },
      { name: 'Rhode Island Roofing', order_index: 3 },
      { name: 'Cranston Contractors', order_index: 4 },
      { name: 'Newport Medical Center', order_index: 5 }
    ];

    for (const logo of clientLogos) {
      await client.query(
        'INSERT INTO client_logos (name, order_index) VALUES ($1, $2)',
        [logo.name, logo.order_index]
      );
    }

    // 4. Migrate Key Outcomes
    console.log('Migrating key outcomes...');
    const keyOutcomes = [
      {
        title: 'More Qualified Leads',
        metric: '+247%',
        description: 'Average increase in organic leads within 90 days',
        icon: 'Phone',
        color: 'bg-green-500',
        bg_color: 'bg-green-50',
        order_index: 1
      },
      {
        title: 'Higher Rankings',
        metric: '#1-3',
        description: 'Top 3 Google rankings for your main keywords',
        icon: 'TrendingUp',
        color: 'bg-blue-500',
        bg_color: 'bg-blue-50',
        order_index: 2
      },
      {
        title: 'Faster Website',
        metric: '<2.5s',
        description: 'Lightning-fast load times that convert better',
        icon: 'Zap',
        color: 'bg-purple-500',
        bg_color: 'bg-purple-50',
        order_index: 3
      }
    ];

    for (const outcome of keyOutcomes) {
      await client.query(
        'INSERT INTO key_outcomes (title, metric, description, icon, color, bg_color, order_index) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [outcome.title, outcome.metric, outcome.description, outcome.icon, outcome.color, outcome.bg_color, outcome.order_index]
      );
    }

    // 5. Migrate Case Studies
    console.log('Migrating case studies...');
    const caseStudies = [
      {
        title: 'Amp Roofing: +73% Organic Leads in 4 Months',
        before_value: '12 leads/month',
        after_value: '21 leads/month',
        improvement: '+73%',
        description: 'See how we helped a local roofing company dominate Google Maps and organic search results.',
        is_featured: true,
        order_index: 1
      }
    ];

    for (const study of caseStudies) {
      await client.query(
        'INSERT INTO case_studies (title, before_value, after_value, improvement, description, is_featured, order_index) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [study.title, study.before_value, study.after_value, study.improvement, study.description, study.is_featured, study.order_index]
      );
    }

    // 6. Migrate Credentials
    console.log('Migrating credentials...');
    const credentials = [
      {
        title: 'Google Partner',
        description: 'Certified Google Ads and Analytics partner',
        icon: 'Award',
        order_index: 1
      },
      {
        title: 'Chamber of Commerce',
        description: 'Active member of Providence Chamber',
        icon: 'Shield',
        order_index: 2
      },
      {
        title: '150+ Local Clients',
        description: 'Serving Rhode Island businesses since 2019',
        icon: 'Users',
        order_index: 3
      }
    ];

    for (const credential of credentials) {
      await client.query(
        'INSERT INTO credentials (title, description, icon, order_index) VALUES ($1, $2, $3, $4)',
        [credential.title, credential.description, credential.icon, credential.order_index]
      );
    }

    // 7. Migrate Media Mentions
    console.log('Migrating media mentions...');
    const mediaMentions = [
      { mention: 'Featured in Providence Business News', order_index: 1 },
      { mention: 'Guest speaker at RI Marketing Summit', order_index: 2 },
      { mention: 'Awarded "Best Local SEO Agency" 2023', order_index: 3 }
    ];

    for (const mention of mediaMentions) {
      await client.query(
        'INSERT INTO media_mentions (mention, order_index) VALUES ($1, $2)',
        [mention.mention, mention.order_index]
      );
    }

    // 8. Migrate Process Steps
    console.log('Migrating process steps...');
    const processSteps = [
      { step_number: 1, title: 'Discovery & Audit', order_index: 1 },
      { step_number: 2, title: 'Strategy & Roadmap', order_index: 2 },
      { step_number: 3, title: 'Execution & Optimization', order_index: 3 },
      { step_number: 4, title: 'Reporting & Growth', order_index: 4 }
    ];

    for (const step of processSteps) {
      await client.query(
        'INSERT INTO process_steps (step_number, title, order_index) VALUES ($1, $2, $3)',
        [step.step_number, step.title, step.order_index]
      );
    }

    // 9. Migrate Location Content
    console.log('Migrating location content...');
    const locationContent = [
      {
        location: 'providence',
        page_title: 'Providence SEO Company',
        hero_title: 'Providence SEO Company',
        hero_description: 'We help Providence businesses dominate local search results and get more qualified leads. Our proven strategies have helped 150+ local businesses increase their organic traffic by an average of 247%.',
        stats: JSON.stringify([
          { label: 'Providence Businesses Served', value: '25+' },
          { label: 'Average Traffic Increase', value: '310%' },
          { label: 'Client Satisfaction Rate', value: '97%' },
          { label: 'Years Serving Providence', value: '3+' }
        ]),
        success_story: JSON.stringify({
          title: 'Providence Roofing Company Success',
          description: 'Complete digital transformation for local roofing contractor',
          results: { traffic: '+450%', leads: '+320%', revenue: '+280%' }
        }),
        cta_title: 'Ready to Grow Your Providence Business?',
        cta_description: 'Get a free SEO audit and discover how we can help your Providence business attract more customers.'
      },
      {
        location: 'cranston',
        page_title: 'Cranston RI Digital Marketing Services | Amenti AI',
        hero_title: 'Digital Marketing Services in Cranston, RI',
        hero_description: 'Help your Cranston business dominate local search results and attract more customers with our proven digital marketing strategies.',
        stats: JSON.stringify([
          { label: 'Cranston Businesses Served', value: '25+' },
          { label: 'Average Traffic Increase', value: '310%' },
          { label: 'Client Satisfaction Rate', value: '97%' },
          { label: 'Years Serving Cranston', value: '3+' }
        ]),
        success_story: JSON.stringify({
          title: 'Cranston Medical Practice Success',
          description: 'Modernized online presence and patient acquisition',
          results: { traffic: '+340%', leads: '+160%', revenue: '+140%' }
        }),
        cta_title: 'Ready to Grow Your Cranston Business?',
        cta_description: 'Get a free SEO audit and discover how we can help your Cranston business attract more customers.'
      }
    ];

    for (const content of locationContent) {
      await client.query(
        'INSERT INTO location_content (location, page_title, hero_title, hero_description, stats, success_story, cta_title, cta_description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
        [content.location, content.page_title, content.hero_title, content.hero_description, content.stats, content.success_story, content.cta_title, content.cta_description]
      );
    }

    // 10. Migrate CTA Content
    console.log('Migrating CTA content...');
    const ctaContent = [
      {
        section: 'main',
        title: 'Ready to Get 3-10 New Leads Per Month?',
        description: 'Book a free 15-minute strategy call. We\'ll analyze your current setup and show you exactly how to get more qualified leads from Google.',
        primary_button_text: 'Book Free Strategy Call',
        primary_button_link: 'https://calendly.com/amenti-ai/strategy-call',
        secondary_button_text: 'Call (401) 123-4567',
        secondary_button_link: 'tel:+14011234567',
        trust_indicators: JSON.stringify([
          { text: '15-minute call', icon: 'Clock' },
          { text: 'No obligation', icon: 'CheckCircle' },
          { text: 'Instant booking', icon: 'Calendar' }
        ]),
        microcopy: 'We reply within 1 business day • Your information is 100% secure'
      }
    ];

    for (const cta of ctaContent) {
      await client.query(
        'INSERT INTO cta_content (section, title, description, primary_button_text, primary_button_link, secondary_button_text, secondary_button_link, trust_indicators, microcopy) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
        [cta.section, cta.title, cta.description, cta.primary_button_text, cta.primary_button_link, cta.secondary_button_text, cta.secondary_button_link, cta.trust_indicators, cta.microcopy]
      );
    }

    // 11. Migrate Hero Content
    console.log('Migrating hero content...');
    const heroContent = [
      {
        page: 'home',
        trust_badge_text: 'Trusted by 150+ Rhode Island Businesses',
        main_headline: 'Get 3-10 New Leads Per Month in 90 Days',
        guarantee_text: 'Or We Work Free Next Month',
        supporting_text: 'Average +247% organic leads in 12 weeks across Rhode Island service businesses. We guarantee results or we work for free.',
        primary_button_text: 'Get Free SEO Audit',
        primary_button_link: '/contact',
        secondary_button_text: 'Call (401) 123-4567',
        secondary_button_link: 'tel:+14011234567'
      }
    ];

    for (const hero of heroContent) {
      await client.query(
        'INSERT INTO hero_content (page, trust_badge_text, main_headline, guarantee_text, supporting_text, primary_button_text, primary_button_link, secondary_button_text, secondary_button_link) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
        [hero.page, hero.trust_badge_text, hero.main_headline, hero.guarantee_text, hero.supporting_text, hero.primary_button_text, hero.primary_button_link, hero.secondary_button_text, hero.secondary_button_link]
      );
    }

    // 12. Migrate Footer Content
    console.log('Migrating footer content...');
    const footerContent = {
      company_name: 'Amenti AI',
      description: 'We build professional websites and deliver cutting-edge SEO solutions that drive real results for businesses across Rhode Island and the USA.',
      quick_links: JSON.stringify([
        { text: 'Home', link: '/' },
        { text: 'Services', link: '/services' },
        { text: 'Portfolio', link: '/portfolio' },
        { text: 'About', link: '/about' },
        { text: 'Blog', link: '/blog' },
        { text: 'Contact', link: '/contact' }
      ]),
      contact_info: JSON.stringify({
        email: 'hello@amentiai.com',
        email2: 'support@amentiai.com',
        phone: '(401) 123-4567',
        address: '123 Business Ave',
        city: 'Providence, RI 02903'
      }),
      social_links: JSON.stringify({
        facebook: '#',
        twitter: '#',
        linkedin: '#',
        instagram: '#'
      }),
      copyright_text: '© 2024 Amenti AI. All rights reserved.',
      legal_links: JSON.stringify([
        { text: 'Privacy Policy', link: '/privacy' },
        { text: 'Terms of Service', link: '/terms' }
      ])
    };

    await client.query(
      'INSERT INTO footer_content (company_name, description, quick_links, contact_info, social_links, copyright_text, legal_links) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [footerContent.company_name, footerContent.description, footerContent.quick_links, footerContent.contact_info, footerContent.social_links, footerContent.copyright_text, footerContent.legal_links]
    );

    console.log('✅ All hardcoded content migrated successfully!');
    
  } catch (error) {
    console.error('❌ Error migrating content:', error);
    throw error;
  } finally {
    client.release();
  }
}

async function setupDatabaseContent() {
  const client = await pool.connect();
  
  try {
    console.log('🚀 Setting up database content...');

    // First, initialize the database schema
    console.log('📋 Initializing database schema...');
    await initDatabase();

    // Then run the migration
    console.log('📦 Migrating hardcoded content...');
    await migrateHardcodedContent();

    console.log('✅ Database content setup completed successfully!');
    console.log('');
    console.log('🎉 Your application is now fully database-driven!');
    console.log('');
    console.log('📊 What was migrated:');
    console.log('  • FAQs');
    console.log('  • Social proof data');
    console.log('  • Client logos');
    console.log('  • Key outcomes');
    console.log('  • Case studies');
    console.log('  • Credentials');
    console.log('  • Media mentions');
    console.log('  • Process steps');
    console.log('  • Location-specific content');
    console.log('  • CTA content');
    console.log('  • Hero content');
    console.log('  • Footer content');
    console.log('');
    console.log('🔧 Next steps:');
    console.log('  1. Start your development server: npm run dev');
    console.log('  2. Visit http://localhost:3000 to see the changes');
    console.log('  3. Use the admin panel to manage content');
    
  } catch (error) {
    console.error('❌ Error setting up database content:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Run the setup
setupDatabaseContent()
  .then(() => {
    console.log('Setup completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Setup failed:', error);
    process.exit(1);
  });

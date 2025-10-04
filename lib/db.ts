import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_jzymWCDE7IF4@ep-calm-field-adqp91o1-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;

// Query helper function
export async function query(text: string, params?: any[]) {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
}

// Database schema initialization
export async function initDatabase() {
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
        password VARCHAR(255),
        website_status VARCHAR(50) DEFAULT 'not_started',
        seo_status VARCHAR(50) DEFAULT 'not_started',
        billing_date DATE,
        join_date DATE DEFAULT CURRENT_DATE,
        payment_method VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Client keywords table
    await client.query(`
      CREATE TABLE IF NOT EXISTS client_keywords (
        id SERIAL PRIMARY KEY,
        client_id INTEGER NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
        keyword VARCHAR(255) NOT NULL,
        target_url VARCHAR(500),
        current_rank INTEGER,
        target_rank INTEGER,
        difficulty VARCHAR(20) DEFAULT 'medium',
        search_volume INTEGER,
        competition VARCHAR(20) DEFAULT 'medium',
        notes TEXT,
        is_active BOOLEAN DEFAULT true,
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
          nav_location VARCHAR(50) DEFAULT 'none',
          og_title VARCHAR(255),
          og_description TEXT,
          og_image TEXT,
          og_type VARCHAR(50) DEFAULT 'website',
          twitter_card VARCHAR(50) DEFAULT 'summary_large_image',
          twitter_title VARCHAR(255),
          twitter_description TEXT,
          twitter_image TEXT,
          canonical_url TEXT,
          robots_index BOOLEAN DEFAULT true,
          robots_follow BOOLEAN DEFAULT true,
          structured_data TEXT,
          schema_type VARCHAR(100) DEFAULT 'WebPage',
          focus_keyword VARCHAR(255),
          seo_score INTEGER DEFAULT 0,
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
        );

        CREATE TABLE IF NOT EXISTS packages (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          description TEXT,
          price DECIMAL(10,2) NOT NULL,
          currency VARCHAR(3) DEFAULT 'USD',
          billing_period VARCHAR(50) DEFAULT 'monthly',
          features TEXT[],
          is_popular BOOLEAN DEFAULT false,
          is_active BOOLEAN DEFAULT true,
          display_order INTEGER DEFAULT 0,
          tier_level INTEGER DEFAULT 1,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS package_tiers (
          id SERIAL PRIMARY KEY,
          package_id INTEGER REFERENCES packages(id) ON DELETE CASCADE,
          tier_name VARCHAR(100) NOT NULL,
          tier_description TEXT,
          price DECIMAL(10,2) NOT NULL,
          currency VARCHAR(3) DEFAULT 'USD',
          billing_period VARCHAR(50) DEFAULT 'monthly',
          features TEXT[],
          is_popular BOOLEAN DEFAULT false,
          is_active BOOLEAN DEFAULT true,
          display_order INTEGER DEFAULT 0,
          tier_level INTEGER DEFAULT 1,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(package_id, tier_level)
        );

        CREATE TABLE IF NOT EXISTS paypal_settings (
          id SERIAL PRIMARY KEY,
          environment VARCHAR(20) DEFAULT 'sandbox',
          client_id VARCHAR(255),
          client_secret VARCHAR(255),
          webhook_id VARCHAR(255),
          webhook_url VARCHAR(500),
          return_url VARCHAR(500),
          cancel_url VARCHAR(500),
          currency VARCHAR(3) DEFAULT 'USD',
          tax_rate DECIMAL(5,4) DEFAULT 0.0000,
          processing_fee_rate DECIMAL(5,4) DEFAULT 0.0290,
          processing_fee_fixed DECIMAL(10,2) DEFAULT 0.30,
          auto_capture BOOLEAN DEFAULT true,
          enable_recurring BOOLEAN DEFAULT true,
          trial_period_days INTEGER DEFAULT 0,
          grace_period_days INTEGER DEFAULT 3,
          email_notifications BOOLEAN DEFAULT true,
          admin_email VARCHAR(255),
          customer_email_template TEXT,
          admin_email_template TEXT,
          is_active BOOLEAN DEFAULT false,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS payments (
          id SERIAL PRIMARY KEY,
          payment_id VARCHAR(255) UNIQUE NOT NULL,
          client_id INTEGER REFERENCES clients(id),
          package_id INTEGER REFERENCES packages(id),
          amount DECIMAL(10,2) NOT NULL,
          currency VARCHAR(3) DEFAULT 'USD',
          status VARCHAR(50) DEFAULT 'pending',
          paypal_token VARCHAR(255),
          payer_id VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS client_access (
          id SERIAL PRIMARY KEY,
          client_id INTEGER REFERENCES clients(id),
          package_id INTEGER REFERENCES packages(id),
          access_type VARCHAR(100) NOT NULL,
          granted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          expires_at TIMESTAMP,
          is_active BOOLEAN DEFAULT true
        );

        CREATE TABLE IF NOT EXISTS payment_logs (
          id SERIAL PRIMARY KEY,
          payment_id VARCHAR(255),
          status VARCHAR(50) NOT NULL,
          reason VARCHAR(255),
          token VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
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

    // Admin settings table
    await client.query(`
      CREATE TABLE IF NOT EXISTS admin_settings (
        id SERIAL PRIMARY KEY,
        general_settings JSONB DEFAULT '{}',
        notification_settings JSONB DEFAULT '{}',
        security_settings JSONB DEFAULT '{}',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Keywords table for SEO
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

    // Client messages table for client-admin communication
    await client.query(`
      CREATE TABLE IF NOT EXISTS client_messages (
        id SERIAL PRIMARY KEY,
        client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
        sender_type VARCHAR(20) NOT NULL CHECK (sender_type IN ('client', 'admin')),
        sender_id INTEGER,
        subject VARCHAR(255),
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT false,
        priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
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


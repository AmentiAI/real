const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_jzymWCDE7IF4@ep-calm-field-adqp91o1-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: {
    rejectUnauthorized: false
  }
})

async function createContentTables() {
  const client = await pool.connect()
  
  try {
    console.log('Creating content tables...')

    // Hero Content Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS hero_content (
        id SERIAL PRIMARY KEY,
        page VARCHAR(50) NOT NULL,
        trust_badge_text TEXT,
        main_headline TEXT NOT NULL,
        guarantee_text TEXT,
        supporting_text TEXT,
        primary_button_text VARCHAR(100),
        primary_button_link VARCHAR(200),
        secondary_button_text VARCHAR(100),
        secondary_button_link VARCHAR(200),
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Blog Posts Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        excerpt TEXT,
        content TEXT,
        featured_image VARCHAR(500),
        author VARCHAR(100),
        published_at TIMESTAMP,
        read_time VARCHAR(20),
        category VARCHAR(50),
        tags JSONB DEFAULT '[]',
        views INTEGER DEFAULT 0,
        shares INTEGER DEFAULT 0,
        is_featured BOOLEAN DEFAULT false,
        is_published BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Case Studies Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS case_studies (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        company VARCHAR(100) NOT NULL,
        industry VARCHAR(50),
        location VARCHAR(100),
        duration VARCHAR(50),
        challenge TEXT,
        solution TEXT,
        results JSONB DEFAULT '[]',
        metrics JSONB DEFAULT '{}',
        testimonial JSONB DEFAULT '{}',
        is_featured BOOLEAN DEFAULT false,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Industries Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS industries (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        icon VARCHAR(50),
        color VARCHAR(20),
        gradient VARCHAR(100),
        bg_gradient VARCHAR(100),
        stats JSONB DEFAULT '{}',
        challenges JSONB DEFAULT '[]',
        solutions JSONB DEFAULT '[]',
        results JSONB DEFAULT '[]',
        href VARCHAR(200),
        is_featured BOOLEAN DEFAULT false,
        is_active BOOLEAN DEFAULT true,
        display_order INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Testimonials Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        company VARCHAR(100) NOT NULL,
        role VARCHAR(100),
        industry VARCHAR(50),
        image VARCHAR(500),
        rating INTEGER DEFAULT 5,
        content TEXT NOT NULL,
        results JSONB DEFAULT '[]',
        is_featured BOOLEAN DEFAULT false,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Team Members Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS team_members (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        role VARCHAR(100) NOT NULL,
        bio TEXT,
        image VARCHAR(500),
        linkedin VARCHAR(200),
        twitter VARCHAR(200),
        email VARCHAR(100),
        is_featured BOOLEAN DEFAULT false,
        is_active BOOLEAN DEFAULT true,
        display_order INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Stats Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS stats (
        id SERIAL PRIMARY KEY,
        icon VARCHAR(50),
        value VARCHAR(50) NOT NULL,
        label VARCHAR(100) NOT NULL,
        description TEXT,
        is_featured BOOLEAN DEFAULT false,
        is_active BOOLEAN DEFAULT true,
        display_order INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // FAQ Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS faqs (
        id SERIAL PRIMARY KEY,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        category VARCHAR(50),
        is_featured BOOLEAN DEFAULT false,
        is_active BOOLEAN DEFAULT true,
        display_order INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    console.log('Content tables created successfully!')
  } catch (error) {
    console.error('Error creating content tables:', error)
    throw error
  } finally {
    client.release()
  }
}

async function populateSampleData() {
  const client = await pool.connect()
  
  try {
    console.log('Populating sample content data...')

    // Hero Content
    await client.query(`
      INSERT INTO hero_content (page, trust_badge_text, main_headline, supporting_text, primary_button_text, primary_button_link, secondary_button_text, secondary_button_link)
      VALUES 
      ('home', 'Trusted by 150+ Businesses Nationwide', 'Dominate Google Rankings with AI-Powered SEO', 'Stop losing customers to competitors. Our proven AI system generates 400% more traffic, 98% first-page rankings, and millions in additional revenue for businesses like yours.', 'Get Started Today', '/checkout', 'Watch Demo', '/contact'),
      ('about', 'About Amenti AI', 'We''re Rhode Island-Based Digital Marketing Experts Serving the Entire USA', 'At Amenti AI, we combine cutting-edge technology with proven marketing strategies to help businesses nationwide achieve unprecedented growth from our Rhode Island headquarters.', 'Learn More About Us', '/about', 'Get Free Consultation', '/contact'),
      ('contact', 'Get In Touch', 'Ready to Transform Your Digital Presence?', 'Let''s discuss how we can help your business achieve unprecedented growth. Get a free consultation with our digital marketing experts.', 'Get Free Consultation', '/contact', 'Call (401) 123-4567', 'tel:+14011234567')
      ON CONFLICT DO NOTHING
    `)

    // Blog Posts
    await client.query(`
      INSERT INTO blog_posts (title, slug, excerpt, author, published_at, read_time, category, tags, views, shares, is_featured)
      VALUES 
      ('The Complete Guide to Local SEO for Rhode Island Businesses', 'complete-guide-local-seo-rhode-island-businesses', 'Master local SEO strategies specifically designed for Rhode Island businesses. Learn how to dominate local search results and attract more customers in your area.', 'Sarah Chen', '2024-01-15', '12 min read', 'Local SEO', '["Local SEO", "Rhode Island", "Google My Business", "Local Search"]', 2847, 156, true),
      ('How AI is Revolutionizing Digital Marketing in 2024', 'ai-revolutionizing-digital-marketing-2024', 'Discover how artificial intelligence is transforming digital marketing strategies and learn how to leverage AI tools for better business results.', 'Alex Johnson', '2024-01-12', '8 min read', 'AI Marketing', '["Artificial Intelligence", "Digital Marketing", "Automation", "Future Trends"]', 3421, 234, true),
      ('10 Essential SEO Tools Every Business Owner Should Know', '10-essential-seo-tools-business-owners', 'A comprehensive list of must-have SEO tools that will help you optimize your website, track performance, and stay ahead of the competition.', 'Mike Rodriguez', '2024-01-10', '10 min read', 'SEO Tools', '["SEO Tools", "Website Optimization", "Analytics", "Keyword Research"]', 1892, 98, false)
      ON CONFLICT (slug) DO NOTHING
    `)

    // Case Studies
    await client.query(`
      INSERT INTO case_studies (title, company, industry, location, duration, challenge, solution, results, metrics, testimonial, is_featured)
      VALUES 
      ('Premier Construction: From Local Contractor to Regional Leader', 'Premier Construction', 'Construction', 'Providence, RI', '12 months', 'Premier Construction was struggling to compete with larger contractors and needed to establish a strong online presence to attract more local customers.', 'We implemented a comprehensive local SEO strategy, created a conversion-optimized website, and launched targeted Google Ads campaigns.', '["400% increase in organic traffic", "98% of target keywords ranking on first page", "250% increase in qualified leads", "$2.3M additional revenue generated", "Became #1 contractor in Providence area"]', '{"traffic": "+400%", "rankings": "98%", "leads": "+250%", "revenue": "$2.3M"}', '{"quote": "Amenti AI transformed our business completely. We went from struggling to get leads to being the #1 contractor in our area. Our revenue increased by 300% in just 6 months.", "author": "Sarah Johnson", "role": "CEO", "company": "Premier Construction"}', true),
      ('Elite Law Firm: Dominating Legal Search Results', 'Elite Law Firm', 'Legal Services', 'Cranston, RI', '8 months', 'Elite Law Firm needed to increase their online visibility and attract more high-value clients in competitive legal markets.', 'We developed a content marketing strategy focused on legal expertise, optimized their website for conversion, and implemented local SEO for multiple practice areas.', '["500% increase in organic traffic", "95% first-page rankings for target keywords", "180% increase in consultation requests", "$4.1M additional revenue", "Expanded to 3 new practice areas"]', '{"traffic": "+500%", "rankings": "95%", "leads": "+180%", "revenue": "$4.1M"}', '{"quote": "The results speak for themselves. Our organic traffic increased by 400% and we''re now ranking #1 for all our target keywords. The ROI has been incredible.", "author": "Michael Chen", "role": "Managing Partner", "company": "Elite Law Firm"}', true)
      ON CONFLICT DO NOTHING
    `)

    // Industries
    await client.query(`
      INSERT INTO industries (name, description, icon, color, gradient, bg_gradient, stats, challenges, solutions, results, href, is_featured, display_order)
      VALUES 
      ('Construction', 'Dominate local search and showcase your best work to attract more high-value projects.', 'Building2', 'blue', 'from-blue-500 to-blue-600', 'from-blue-50 to-blue-100', '{"clients": "45+", "growth": "350%", "revenue": "$2.3M", "rankings": "95%"}', '["High competition for local projects", "Seasonal business fluctuations", "Need to showcase work quality", "Lead generation from referrals only"]', '["Local SEO optimization", "Project portfolio websites", "Google My Business optimization", "Lead generation systems"]', '["350% increase in qualified leads", "95% first-page local rankings", "200% increase in project inquiries", "$2.3M additional revenue generated"]', '/industries/contractors', true, 1),
      ('Legal Services', 'Build authority and attract high-value clients with specialized legal marketing strategies.', 'Scale', 'purple', 'from-purple-500 to-purple-600', 'from-purple-50 to-purple-100', '{"clients": "32+", "growth": "400%", "revenue": "$4.1M", "rankings": "98%"}', '["High competition in legal market", "Need to build trust and authority", "Complex service offerings", "Long sales cycles"]', '["Content marketing for expertise", "Local SEO for practice areas", "Conversion-optimized websites", "Client testimonial strategies"]', '["400% increase in organic traffic", "98% first-page rankings", "180% increase in consultations", "$4.1M additional revenue"]', '/industries/lawyers', true, 2)
      ON CONFLICT DO NOTHING
    `)

    // Testimonials
    await client.query(`
      INSERT INTO testimonials (name, company, role, industry, rating, content, results, is_featured)
      VALUES 
      ('Sarah Johnson', 'Premier Construction', 'CEO', 'Construction', 5, 'Amenti AI transformed our online presence completely. We went from struggling to get leads to being the #1 contractor in our area. Our revenue increased by 300% in just 6 months.', '["300% Revenue Increase", "50+ New Leads/Month", "#1 Google Rankings"]', true),
      ('Michael Chen', 'Elite Law Firm', 'Managing Partner', 'Legal Services', 5, 'The results speak for themselves. Our organic traffic increased by 400% and we''re now ranking #1 for all our target keywords. The ROI has been incredible.', '["400% Traffic Growth", "98% First Page Rankings", "$2.3M+ Additional Revenue"]', true)
      ON CONFLICT DO NOTHING
    `)

    // Team Members
    await client.query(`
      INSERT INTO team_members (name, role, bio, is_featured, display_order)
      VALUES 
      ('Alex Johnson', 'CEO & Founder', '10+ years in digital marketing. Former Google Ads specialist with expertise in scaling businesses through data-driven strategies.', true, 1),
      ('Sarah Chen', 'Head of SEO', 'SEO expert with 8+ years experience. Specializes in local SEO and has helped hundreds of Rhode Island businesses dominate search results.', true, 2),
      ('Mike Rodriguez', 'Lead Developer', 'Full-stack developer with expertise in modern web technologies. Creates fast, secure, and conversion-optimized websites.', true, 3)
      ON CONFLICT DO NOTHING
    `)

    // Stats
    await client.query(`
      INSERT INTO stats (icon, value, label, description, is_featured, display_order)
      VALUES 
      ('TrendingUp', '400%', 'Average Traffic Increase', 'Our clients see dramatic growth in organic traffic', true, 1),
      ('Users', '150+', 'Successful Clients', 'Businesses transformed with our proven strategies', true, 2),
      ('Award', '98%', 'First Page Rankings', 'Achievement rate for targeted keywords', true, 3),
      ('Clock', '30 Days', 'Average Time to Results', 'See measurable improvements in just one month', true, 4)
      ON CONFLICT DO NOTHING
    `)

    // FAQs
    await client.query(`
      INSERT INTO faqs (question, answer, category, is_featured, display_order)
      VALUES 
      ('How quickly can I expect to see results?', 'Most clients see initial improvements within 30 days, with significant growth typically occurring within 3-6 months. Our SEO strategies are designed for long-term, sustainable growth.', 'General', true, 1),
      ('Do you work with businesses outside of Rhode Island?', 'Yes! While we''re based in Rhode Island, we serve clients nationwide. Our digital marketing strategies work for businesses in any location.', 'General', true, 2),
      ('What''s included in the free consultation?', 'Our free consultation includes a comprehensive analysis of your current digital presence, competitor research, and a customized strategy recommendation for your business goals.', 'General', true, 3),
      ('How do you measure success?', 'We track key metrics including organic traffic growth, keyword rankings, conversion rates, and revenue impact. You''ll receive detailed monthly reports showing your progress.', 'General', true, 4)
      ON CONFLICT DO NOTHING
    `)

    console.log('Sample content data populated successfully!')
  } catch (error) {
    console.error('Error populating sample data:', error)
    throw error
  } finally {
    client.release()
  }
}

async function main() {
  try {
    await createContentTables()
    await populateSampleData()
    console.log('Content database setup completed successfully!')
  } catch (error) {
    console.error('Error setting up content database:', error)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

main()

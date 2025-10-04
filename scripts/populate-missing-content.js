const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_jzymWCDE7IF4@ep-calm-field-adqp91o1-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: {
    rejectUnauthorized: false
  }
})

async function populateMissingContent() {
  const client = await pool.connect()
  
  try {
    console.log('Populating missing content...')

    // Industries
    await client.query(`
      INSERT INTO industries (name, description, icon, color, gradient, bg_gradient, stats, challenges, solutions, results, href, is_featured, display_order)
      VALUES 
      ('Construction', 'Dominate local search and showcase your best work to attract more high-value projects.', 'Building2', 'blue', 'from-blue-500 to-blue-600', 'from-blue-50 to-blue-100', '{"clients": "45+", "growth": "350%", "revenue": "$2.3M", "rankings": "95%"}', '["High competition for local projects", "Seasonal business fluctuations", "Need to showcase work quality", "Lead generation from referrals only"]', '["Local SEO optimization", "Project portfolio websites", "Google My Business optimization", "Lead generation systems"]', '["350% increase in qualified leads", "95% first-page local rankings", "200% increase in project inquiries", "$2.3M additional revenue generated"]', '/industries/contractors', true, 1),
      ('Legal Services', 'Build authority and attract high-value clients with specialized legal marketing strategies.', 'Scale', 'purple', 'from-purple-500 to-purple-600', 'from-purple-50 to-purple-100', '{"clients": "32+", "growth": "400%", "revenue": "$4.1M", "rankings": "98%"}', '["High competition in legal market", "Need to build trust and authority", "Complex service offerings", "Long sales cycles"]', '["Content marketing for expertise", "Local SEO for practice areas", "Conversion-optimized websites", "Client testimonial strategies"]', '["400% increase in organic traffic", "98% first-page rankings", "180% increase in consultations", "$4.1M additional revenue"]', '/industries/lawyers', true, 2),
      ('Healthcare', 'Attract more patients and build trust with healthcare-specific digital marketing.', 'Heart', 'green', 'from-green-500 to-green-600', 'from-green-50 to-green-100', '{"clients": "28+", "growth": "500%", "revenue": "$3.2M", "rankings": "92%"}', '["HIPAA compliance requirements", "Building patient trust online", "Competing with large systems", "Local patient acquisition"]', '["HIPAA-compliant marketing", "Patient education content", "Local SEO for specialties", "Online reputation management"]', '["500% increase in patient inquiries", "92% first-page rankings", "300% increase in appointments", "$3.2M additional revenue"]', '/industries/healthcare', false, 3)
      ON CONFLICT DO NOTHING
    `)

    // Testimonials
    await client.query(`
      INSERT INTO testimonials (name, company, role, industry, rating, content, results, is_featured)
      VALUES 
      ('Sarah Johnson', 'Premier Construction', 'CEO', 'Construction', 5, 'Amenti AI transformed our online presence completely. We went from struggling to get leads to being the #1 contractor in our area. Our revenue increased by 300% in just 6 months.', '["300% Revenue Increase", "50+ New Leads/Month", "#1 Google Rankings"]', true),
      ('Michael Chen', 'Elite Law Firm', 'Managing Partner', 'Legal Services', 5, 'The results speak for themselves. Our organic traffic increased by 400% and we''re now ranking #1 for all our target keywords. The ROI has been incredible.', '["400% Traffic Growth", "98% First Page Rankings", "$2.3M+ Additional Revenue"]', true),
      ('Emily Rodriguez', 'HealthCare Plus', 'Marketing Director', 'Healthcare', 5, 'Working with Amenti AI has been a game-changer. Their AI-powered approach and data-driven strategies have helped us dominate our local market and expand nationally.', '["500% Patient Growth", "92% First Page Rankings", "$3.2M+ Additional Revenue"]', false)
      ON CONFLICT DO NOTHING
    `)

    // Team Members
    await client.query(`
      INSERT INTO team_members (name, role, bio, is_featured, display_order)
      VALUES 
      ('Alex Johnson', 'CEO & Founder', '10+ years in digital marketing. Former Google Ads specialist with expertise in scaling businesses through data-driven strategies.', true, 1),
      ('Sarah Chen', 'Head of SEO', 'SEO expert with 8+ years experience. Specializes in local SEO and has helped hundreds of Rhode Island businesses dominate search results.', true, 2),
      ('Mike Rodriguez', 'Lead Developer', 'Full-stack developer with expertise in modern web technologies. Creates fast, secure, and conversion-optimized websites.', true, 3),
      ('Emily Davis', 'Content Strategist', 'Content marketing expert who creates compelling narratives that engage audiences and drive conversions across all digital channels.', false, 4),
      ('David Kim', 'PPC Specialist', 'Google Ads and Facebook Ads expert with a track record of reducing cost-per-acquisition while increasing conversion rates.', false, 5),
      ('Lisa Thompson', 'Client Success Manager', 'Ensures every client receives exceptional service and achieves their business goals through strategic account management.', false, 6)
      ON CONFLICT DO NOTHING
    `)

    // Stats
    await client.query(`
      INSERT INTO stats (icon, value, label, description, is_featured, display_order)
      VALUES 
      ('TrendingUp', '400%', 'Average Traffic Increase', 'Our clients see dramatic growth in organic traffic', true, 1),
      ('Users', '150+', 'Successful Clients', 'Businesses transformed with our proven strategies', true, 2),
      ('Award', '98%', 'First Page Rankings', 'Achievement rate for targeted keywords', true, 3),
      ('Clock', '30 Days', 'Average Time to Results', 'See measurable improvements in just one month', true, 4),
      ('DollarSign', '$50M+', 'Revenue Generated', 'Additional revenue created for our clients', false, 5),
      ('Target', '95%', 'Client Satisfaction', 'Clients who would recommend our services', false, 6)
      ON CONFLICT DO NOTHING
    `)

    console.log('Missing content populated successfully!')
  } catch (error) {
    console.error('Error populating missing content:', error)
  } finally {
    client.release()
    await pool.end()
  }
}

populateMissingContent()

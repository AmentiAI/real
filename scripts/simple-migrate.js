const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_jzymWCDE7IF4@ep-calm-field-adqp91o1-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: {
    rejectUnauthorized: false
  }
});

async function simpleMigrate() {
  const client = await pool.connect();
  
  try {
    console.log('🚀 Starting simple data migration...');
    
    // Clear existing data first
    console.log('🧹 Clearing existing data...');
    await client.query('DELETE FROM service_tiers');
    await client.query('DELETE FROM services');
    await client.query('DELETE FROM pages');
    await client.query('DELETE FROM hero_content');
    await client.query('DELETE FROM footer_content');
    await client.query('DELETE FROM key_outcomes');
    await client.query('DELETE FROM case_studies');
    await client.query('DELETE FROM faqs');
    await client.query('DELETE FROM location_content');
    await client.query('DELETE FROM industry_content');
    
    // 1. Insert Pages Data
    console.log('📄 Migrating pages...');
    const pages = [
      {
        title: 'Home - Amenti AI Digital Marketing Services',
        slug: 'home',
        description: 'Professional digital marketing and SEO services for Rhode Island businesses. Get more leads, dominate search results, and grow your business.',
        content: 'Amenti AI provides comprehensive digital marketing services including SEO, web design, content marketing, and paid advertising for businesses across Rhode Island.',
        meta_title: 'Amenti AI - Rhode Island Digital Marketing & SEO Services',
        meta_description: 'Professional digital marketing and SEO services for Rhode Island businesses. Get more leads, dominate search results, and grow your business.',
        meta_keywords: 'digital marketing Rhode Island, SEO services, web design, content marketing, paid advertising',
        published: true
      },
      {
        title: 'About Amenti AI - Rhode Island Digital Marketing Experts',
        slug: 'about',
        description: 'Learn about Amenti AI, Rhode Island\'s premier digital marketing agency. Our team of experts helps businesses grow with proven SEO, web design, and marketing strategies.',
        content: 'We\'re Rhode Island\'s Digital Marketing Experts. At Amenti AI, we combine cutting-edge technology with proven marketing strategies to help businesses across Rhode Island and New England achieve unprecedented growth.',
        meta_title: 'About Amenti AI - Rhode Island Digital Marketing Experts',
        meta_description: 'Learn about Amenti AI, Rhode Island\'s premier digital marketing agency. Our team of experts helps businesses grow with proven SEO, web design, and marketing strategies.',
        meta_keywords: 'about Amenti AI, Rhode Island digital marketing agency, SEO experts, web design team, digital marketing company',
        published: true
      },
      {
        title: 'Pricing - Amenti AI Digital Marketing Services',
        slug: 'pricing',
        description: 'Transparent pricing for professional digital marketing services. Choose from our SEO, web design, and complete growth packages.',
        content: 'Transparent pricing for real results. No hidden fees, no long-term contracts. Choose the plan that fits your business needs.',
        meta_title: 'Pricing - Amenti AI Digital Marketing Services | Rhode Island',
        meta_description: 'Transparent pricing for professional digital marketing services. Choose from our SEO, web design, and complete growth packages.',
        meta_keywords: 'digital marketing pricing, SEO pricing, web design cost, Rhode Island marketing rates',
        published: true
      },
      {
        title: 'Contact Us - Amenti AI | Rhode Island Digital Marketing',
        slug: 'contact',
        description: 'Get in touch with Amenti AI for professional digital marketing services. Contact us for SEO, web design, and online marketing solutions.',
        content: 'Let\'s Build Something Amazing Together. Ready to take your business to the next level? Get in touch with our team of digital marketing experts.',
        meta_title: 'Contact Us - Amenti AI | Rhode Island Digital Marketing',
        meta_description: 'Get in touch with Amenti AI for professional digital marketing services. Contact us for SEO, web design, and online marketing solutions.',
        meta_keywords: 'contact, digital marketing, SEO services, web design, Rhode Island',
        published: true
      },
      {
        title: 'Providence SEO Company - Local Digital Marketing',
        slug: 'locations/providence',
        description: 'Providence SEO services that help local businesses dominate search results. Get more qualified leads with our proven local SEO strategies.',
        content: 'We help Providence businesses dominate local search results and get more qualified leads. Our proven strategies have helped 150+ local businesses increase their organic traffic by an average of 247%.',
        meta_title: 'Providence SEO Company - Local Digital Marketing',
        meta_description: 'Providence SEO services that help local businesses dominate search results. Get more qualified leads with our proven local SEO strategies.',
        meta_keywords: 'Providence SEO, local SEO Providence, digital marketing Providence, Rhode Island SEO',
        published: true
      },
      {
        title: 'Contractor Digital Marketing Services | Amenti AI',
        slug: 'industries/contractors',
        description: 'Specialized digital marketing for contractors and construction companies. Build your business with proven contractor marketing strategies.',
        content: 'Build your contracting business with proven digital marketing strategies. From local SEO to project showcases, we help contractors compete and grow.',
        meta_title: 'Contractor Digital Marketing Services | Amenti AI',
        meta_description: 'Specialized digital marketing for contractors and construction companies. Build your business with proven contractor marketing strategies.',
        meta_keywords: 'contractor marketing, construction SEO, contractor advertising, construction company marketing, contractor digital marketing',
        published: true
      }
    ];

    for (const page of pages) {
      await client.query(`
        INSERT INTO pages (title, slug, description, content, meta_title, meta_description, meta_keywords, published)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `, [page.title, page.slug, page.description, page.content, page.meta_title, page.meta_description, page.meta_keywords, page.published]);
    }

    // 2. Insert Services Data
    console.log('🔧 Migrating services...');
    const services = [
      {
        id: 'complete-growth-packages',
        title: 'Complete Growth Packages',
        description: 'All-in-one solutions combining website development with ongoing SEO for maximum business growth.',
        icon: 'Target',
        category: 'Complete Packages'
      },
      {
        id: 'website-design',
        title: 'Website Design & Development',
        description: 'Professional websites that convert visitors into customers with modern design and advanced functionality.',
        icon: 'Target',
        category: 'Development'
      },
      {
        id: 'seo-services',
        title: 'SEO Services',
        description: 'Comprehensive SEO strategies that dominate search results and drive qualified traffic to your business.',
        icon: 'Search',
        category: 'SEO Services'
      },
      {
        id: 'branding-identity',
        title: 'Branding & Identity',
        description: 'Create a powerful brand identity that resonates with your audience and builds trust in your business.',
        icon: 'BarChart3',
        category: 'Branding'
      },
      {
        id: 'content-marketing',
        title: 'Content Marketing',
        description: 'Strategic content that ranks, engages, and converts your target audience into loyal customers.',
        icon: 'Users',
        category: 'Content'
      },
      {
        id: 'paid-ads-social',
        title: 'Paid Ads & Social Media',
        description: 'Targeted advertising campaigns that reach your ideal customers and drive measurable results.',
        icon: 'Globe',
        category: 'Marketing'
      },
      {
        id: 'platforms-systems',
        title: 'Platforms & Custom Systems',
        description: 'Build comprehensive digital platforms and custom systems that scale with your business growth.',
        icon: 'Zap',
        category: 'Platforms'
      },
      {
        id: 'white-label-seo',
        title: 'White Label SEO',
        description: 'Agency-focused SEO services that you can resell to your clients at 2-3x markup for maximum profit.',
        icon: 'Globe',
        category: 'White Label'
      },
      {
        id: 'white-label-website',
        title: 'White Label Website Design',
        description: 'Professional website design services for agencies to resell at 2-3x markup with full white-label support.',
        icon: 'Target',
        category: 'White Label'
      }
    ];

    for (const service of services) {
      await client.query(`
        INSERT INTO services (id, title, description, icon, category)
        VALUES ($1, $2, $3, $4, $5)
      `, [service.id, service.title, service.description, service.icon, service.category]);
      
      // Insert service tiers
      const tiers = getServiceTiers(service.title);
      for (const tier of tiers) {
        await client.query(`
          INSERT INTO service_tiers (service_id, name, price, setup_price, monthly_price, period, popular, best_for, features, sort_order)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        `, [service.id, tier.name, tier.price, tier.setup_price, tier.monthly_price, tier.period, tier.popular, tier.best_for, JSON.stringify(tier.features), tier.sort_order]);
      }
    }

    // 3. Insert Hero Content
    console.log('🎯 Migrating hero content...');
    await client.query(`
      INSERT INTO hero_content (page, trust_badge_text, main_headline, guarantee_text, supporting_text, primary_button_text, primary_button_link, secondary_button_text, secondary_button_link, is_active)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `, [
      'home',
      'Trusted by 150+ Rhode Island Businesses',
      'We Build Any Platform Your Business Needs',
      'From simple websites to complex enterprise platforms, we create comprehensive digital solutions that scale with your business.',
      'Whether you need a simple website or a complex enterprise platform, we have the expertise to build exactly what your business needs. From custom applications to AI-powered solutions, we create digital platforms that scale with your growth.',
      'Get Started Today',
      '/contact',
      'View Our Work',
      '/case-studies',
      true
    ]);

    // 4. Insert Footer Content
    console.log('🦶 Migrating footer content...');
    await client.query(`
      INSERT INTO footer_content (company_name, description, quick_links, contact_info, social_links, copyright_text, legal_links, is_active)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `, [
      'Amenti AI',
      'We help Rhode Island businesses grow through proven digital marketing strategies. From SEO to web design, we create comprehensive solutions that deliver real results.',
      JSON.stringify([
        { text: 'Home', link: '/' },
        { text: 'About', link: '/about' },
        { text: 'Services', link: '/services' },
        { text: 'Pricing', link: '/pricing' },
        { text: 'Contact', link: '/contact' },
        { text: 'Case Studies', link: '/case-studies' }
      ]),
      JSON.stringify({
        email: 'hello@amentiai.com',
        email2: 'support@amentiai.com',
        phone: '(401) 123-4567',
        address: '123 Main Street',
        city: 'Providence, RI 02903'
      }),
      JSON.stringify({
        facebook: 'https://facebook.com/amentiai',
        twitter: 'https://twitter.com/amentiai',
        linkedin: 'https://linkedin.com/company/amentiai',
        instagram: 'https://instagram.com/amentiai'
      }),
      '© 2024 Amenti AI. All rights reserved.',
      JSON.stringify([
        { text: 'Privacy Policy', link: '/privacy' },
        { text: 'Terms of Service', link: '/terms' },
        { text: 'Cookie Policy', link: '/cookies' }
      ]),
      true
    ]);

    // 5. Insert Key Outcomes
    console.log('📊 Migrating key outcomes...');
    const keyOutcomes = [
      { title: 'Projects Completed', metric: '150+', description: 'Successful projects delivered', icon: 'Target', color: 'bg-blue-500', bg_color: 'bg-blue-50', order_index: 1 },
      { title: 'Client Satisfaction', metric: '98%', description: 'Happy clients rate our service', icon: 'Star', color: 'bg-green-500', bg_color: 'bg-green-50', order_index: 2 },
      { title: 'Support Available', metric: '24/7', description: 'Round-the-clock assistance', icon: 'Clock', color: 'bg-purple-500', bg_color: 'bg-purple-50', order_index: 3 },
      { title: 'Years Experience', metric: '5+', description: 'Industry expertise', icon: 'Award', color: 'bg-orange-500', bg_color: 'bg-orange-50', order_index: 4 }
    ];

    for (const outcome of keyOutcomes) {
      await client.query(`
        INSERT INTO key_outcomes (title, metric, description, icon, color, bg_color, order_index, is_active)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `, [outcome.title, outcome.metric, outcome.description, outcome.icon, outcome.color, outcome.bg_color, outcome.order_index, true]);
    }

    // 6. Insert Case Studies
    console.log('📈 Migrating case studies...');
    const caseStudies = [
      {
        title: 'East Greenwich Construction Success',
        before_value: '2-3 leads/month',
        after_value: '15+ qualified leads',
        improvement: '500% increase',
        description: 'Amenti AI helped us showcase our work and expand our service area. We\'ve doubled our project volume and expanded into three new markets.',
        is_featured: true,
        order_index: 1
      },
      {
        title: 'Providence Law Firm Growth',
        before_value: 'Low visibility',
        after_value: '#1-3 rankings',
        improvement: '300% traffic increase',
        description: 'We went from 2-3 leads per month to 15+ qualified leads. Our phone hasn\'t stopped ringing!',
        is_featured: true,
        order_index: 2
      }
    ];

    for (const study of caseStudies) {
      await client.query(`
        INSERT INTO case_studies (title, before_value, after_value, improvement, description, is_featured, order_index, is_active)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `, [study.title, study.before_value, study.after_value, study.improvement, study.description, study.is_featured, study.order_index, true]);
    }

    // 7. Insert FAQs
    console.log('❓ Migrating FAQs...');
    const faqs = [
      {
        question: 'How quickly can you start my project?',
        answer: 'Most projects can begin within 1-2 weeks of signing. We\'ll provide a detailed timeline during our initial consultation based on your specific needs.',
        category: 'general',
        order_index: 1
      },
      {
        question: 'What\'s included in your SEO services?',
        answer: 'Our SEO services include keyword research, on-page optimization, technical SEO, content creation, local SEO, and monthly reporting with detailed analytics.',
        category: 'services',
        order_index: 2
      },
      {
        question: 'Do you work with businesses outside Rhode Island?',
        answer: 'Yes! While we specialize in Rhode Island and New England businesses, we work with clients nationwide and can adapt our strategies for any location.',
        category: 'general',
        order_index: 3
      },
      {
        question: 'What makes you different from other agencies?',
        answer: 'We\'re local Rhode Island natives who understand the market, offer guaranteed results, and provide personalized service with dedicated account managers.',
        category: 'general',
        order_index: 4
      }
    ];

    for (const faq of faqs) {
      await client.query(`
        INSERT INTO faqs (question, answer, category, order_index, is_active)
        VALUES ($1, $2, $3, $4, $5)
      `, [faq.question, faq.answer, faq.category, faq.order_index, true]);
    }

    // 8. Insert Location Content
    console.log('📍 Migrating location content...');
    await client.query(`
      INSERT INTO location_content (location, page_title, hero_title, hero_description, stats, success_story, cta_title, cta_description, is_active)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `, [
      'providence',
      'Providence SEO Company - Local Digital Marketing',
      'Providence SEO Company',
      'We help Providence businesses dominate local search results and get more qualified leads. Our proven strategies have helped 150+ local businesses increase their organic traffic by an average of 247%.',
      JSON.stringify([
        { metric: '150+', label: 'Local Clients' },
        { metric: '4.9/5', label: 'Google Rating' },
        { metric: '5+', label: 'Years in RI' },
        { metric: '247%', label: 'Avg Lead Increase' }
      ]),
      JSON.stringify({
        name: 'Sarah Johnson',
        company: 'Providence Law Firm',
        content: 'Amenti AI helped us dominate local search results. We went from 2-3 leads per month to 15+ qualified leads. Our phone hasn\'t stopped ringing!'
      }),
      'Ready to Dominate Providence Search Results?',
      'Get your free Providence SEO audit and see how we can help your business get found locally.',
      true
    ]);

    // 9. Insert Industry Content
    console.log('🏭 Migrating industry content...');
    await client.query(`
      INSERT INTO industry_content (industry, page_title, hero_title, hero_description, services, benefits, is_active)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `, [
      'contractors',
      'Contractor Digital Marketing Services | Amenti AI',
      'Digital Marketing for Contractors',
      'Build your contracting business with proven digital marketing strategies. From local SEO to project showcases, we help contractors compete and grow.',
      JSON.stringify([
        'Contractor SEO',
        'Project Portfolio',
        'Service Area Expansion',
        'Seasonal Marketing',
        'Trade Show Integration',
        'Subcontractor Network'
      ]),
      JSON.stringify([
        'Dominate local search results',
        'Showcase your best work',
        'Expand service areas',
        'Maximize seasonal opportunities'
      ]),
      true
    ]);

    console.log('✅ Simple data migration completed successfully!');
    
  } catch (error) {
    console.error('❌ Error during migration:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

function getServiceTiers(serviceTitle) {
  const tierData = {
    'Complete Growth Packages': [
      { name: 'Starter Growth Package', price: '$2,200 + $1,200/mo', setup_price: '$2,200', monthly_price: '$1,200', period: 'monthly', popular: false, best_for: 'Small local businesses', features: ['5-page SEO-ready website', '20 local keywords', 'Google Business optimization', 'Monthly SEO reports'], sort_order: 1 },
      { name: 'Business Growth Package', price: '$5,000 + $3,500/mo', setup_price: '$5,000', monthly_price: '$3,500', period: 'monthly', popular: true, best_for: 'Growing businesses', features: ['10-15 page custom website', '60 targeted keywords', 'Technical SEO audit', '4 blogs/month'], sort_order: 2 },
      { name: 'Enterprise Domination Package', price: '$12,500 + $8,000/mo', setup_price: '$12,500', monthly_price: '$8,000', period: 'monthly', popular: false, best_for: 'Large enterprises', features: ['20-30+ page premium website', '150 targeted keywords', 'Advanced backlink outreach', 'Dedicated account manager'], sort_order: 3 }
    ],
    'Website Design & Development': [
      { name: 'Starter Website', price: '$1,000', setup_price: '$1,000', monthly_price: '$0', period: 'one-time', popular: false, best_for: 'Small businesses', features: ['Up to 5 SEO-ready pages', 'Mobile-friendly design', 'Basic SEO setup', 'Google Analytics'], sort_order: 1 },
      { name: 'Growth Website', price: '$3,500', setup_price: '$3,500', monthly_price: '$0', period: 'one-time', popular: true, best_for: 'Growing businesses', features: ['10-15 SEO-optimized pages', 'Keyword-targeted copywriting', 'Lead capture forms', 'Blog system setup'], sort_order: 2 },
      { name: 'Dominate Website', price: '$7,500+', setup_price: '$7,500', monthly_price: '$0', period: 'one-time', popular: false, best_for: 'Large businesses', features: ['20-30+ pages', 'Conversion funnels', 'Multi-location SEO', 'Custom integrations'], sort_order: 3 }
    ],
    'SEO Services': [
      { name: 'Starter SEO', price: '$1,200/mo', setup_price: '$0', monthly_price: '$1,200', period: 'monthly', popular: false, best_for: 'Small local businesses', features: ['20 local keywords', 'Google Business optimization', 'On-page SEO', 'Monthly reports'], sort_order: 1 },
      { name: 'Growth SEO', price: '$3,500/mo', setup_price: '$0', monthly_price: '$3,500', period: 'monthly', popular: true, best_for: 'Growing businesses', features: ['60 regional keywords', 'Technical SEO audit', '4 blogs/month', 'Backlink campaigns'], sort_order: 2 },
      { name: 'Dominate SEO', price: '$8,000+/mo', setup_price: '$0', monthly_price: '$8,000', period: 'monthly', popular: false, best_for: 'Large enterprises', features: ['150+ keywords', 'Enterprise technical SEO', '8+ blogs/month', 'Dedicated manager'], sort_order: 3 }
    ],
    'Branding & Identity': [
      { name: 'Starter Branding', price: '$750', setup_price: '$750', monthly_price: '$0', period: 'one-time', popular: false, best_for: 'Small businesses', features: ['Logo design (3 concepts)', 'Basic color palette', 'Font selection'], sort_order: 1 },
      { name: 'Growth Branding', price: '$2,500', setup_price: '$2,500', monthly_price: '$0', period: 'one-time', popular: true, best_for: 'Growing businesses', features: ['Full brand kit', 'Style guide', 'Marketing collateral'], sort_order: 2 },
      { name: 'Dominate Branding', price: '$5,000+', setup_price: '$5,000', monthly_price: '$0', period: 'one-time', popular: false, best_for: 'Large enterprises', features: ['Enterprise identity system', 'Multi-logo variations', 'Full corporate collateral'], sort_order: 3 }
    ],
    'Content Marketing': [
      { name: 'Starter Content', price: '$500/mo', setup_price: '$0', monthly_price: '$500', period: 'monthly', popular: false, best_for: 'Small businesses', features: ['2 SEO blog posts', 'Keyword research', 'Topic research'], sort_order: 1 },
      { name: 'Growth Content', price: '$1,200/mo', setup_price: '$0', monthly_price: '$1,200', period: 'monthly', popular: true, best_for: 'Growing businesses', features: ['4-6 blog posts', 'Content calendar', 'SEO clustering'], sort_order: 2 },
      { name: 'Dominate Content', price: '$2,500+/mo', setup_price: '$0', monthly_price: '$2,500', period: 'monthly', popular: false, best_for: 'Large enterprises', features: ['8-12 blogs/month', 'Infographics', 'AI-assisted scaling'], sort_order: 3 }
    ],
    'Paid Ads & Social Media': [
      { name: 'Starter Ads/Social', price: '$750/mo', setup_price: '$0', monthly_price: '$750', period: 'monthly', popular: false, best_for: 'Small businesses', features: ['Google Ads setup', '3 posts/week', 'Basic reporting'], sort_order: 1 },
      { name: 'Growth Ads/Social', price: '$1,500-2,000/mo', setup_price: '$0', monthly_price: '$1,750', period: 'monthly', popular: true, best_for: 'Growing businesses', features: ['Multiple campaigns', '5 posts/week', 'Growth strategy'], sort_order: 2 },
      { name: 'Dominate Ads/Social', price: '$3,000+/mo', setup_price: '$0', monthly_price: '$3,000', period: 'monthly', popular: false, best_for: 'Large enterprises', features: ['Advanced funnels', 'Daily content', 'Dedicated manager'], sort_order: 3 }
    ],
    'Platforms & Custom Systems': [
      { name: 'Startup MVP', price: '$15,000+', setup_price: '$15,000', monthly_price: '$0', period: 'one-time', popular: false, best_for: 'Startups', features: ['Basic SaaS app', 'Admin panel', 'Core features'], sort_order: 1 },
      { name: 'Growth Platform', price: '$50,000+', setup_price: '$50,000', monthly_price: '$0', period: 'one-time', popular: true, best_for: 'Growing companies', features: ['Multi-user system', 'Payment integration', 'API integrations'], sort_order: 2 },
      { name: 'Enterprise Platform', price: '$100,000+', setup_price: '$100,000', monthly_price: '$0', period: 'one-time', popular: false, best_for: 'Large enterprises', features: ['Multi-tenant platform', 'AI features', 'Custom architecture'], sort_order: 3 }
    ],
    'White Label SEO': [
      { name: 'Starter SEO', price: '$1,200/mo', setup_price: '$0', monthly_price: '$1,200', period: 'monthly', popular: false, best_for: 'Small agencies', features: ['20 keywords (local focus)', 'Google Business optimization', 'On-page SEO + citations', 'Agency-branded reports'], sort_order: 1 },
      { name: 'Growth SEO', price: '$3,500/mo', setup_price: '$0', monthly_price: '$3,500', period: 'monthly', popular: true, best_for: 'Growing agencies', features: ['60 keywords (local + regional)', 'Technical SEO audit', '4 blogs/month', 'White-label dashboard'], sort_order: 2 },
      { name: 'Dominate SEO', price: '$8,000/mo', setup_price: '$0', monthly_price: '$8,000', period: 'monthly', popular: false, best_for: 'Large agencies', features: ['150 keywords (local + national)', 'Enterprise technical SEO', '8+ blogs/month + automation', 'Dedicated account manager'], sort_order: 3 }
    ],
    'White Label Website Design': [
      { name: 'Starter Website', price: '$1,000', setup_price: '$1,000', monthly_price: '$0', period: 'one-time', popular: false, best_for: 'Small agencies', features: ['Up to 5 SEO-optimized pages', 'Responsive, mobile-friendly', 'Basic SEO setup', 'Google Analytics + Search Console'], sort_order: 1 },
      { name: 'Growth Website', price: '$3,500', setup_price: '$3,500', monthly_price: '$0', period: 'one-time', popular: true, best_for: 'Growing agencies', features: ['10-15 SEO-optimized pages', 'Service + location landing pages', 'Keyword-targeted copywriting', 'Lead capture forms'], sort_order: 2 },
      { name: 'Dominate Website', price: '$7,500+', setup_price: '$7,500', monthly_price: '$0', period: 'one-time', popular: false, best_for: 'Large agencies', features: ['20-30+ custom pages', 'Conversion funnels', 'Multi-location SEO', 'Custom integrations'], sort_order: 3 }
    ]
  };

  return tierData[serviceTitle] || [];
}

// Run the migration
simpleMigrate().catch(console.error);








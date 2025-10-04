const { Pool } = require('pg');
require('dotenv').config({ path: './.env.local' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function initBrandingSettings() {
  try {
    console.log('Initializing branding settings...');
    
    // Check if branding settings already exist
    const existingResult = await pool.query('SELECT id FROM branding_settings LIMIT 1');
    
    if (existingResult.rows.length > 0) {
      console.log('✅ Branding settings already exist');
      return;
    }

    // Insert default branding settings
    const result = await pool.query(`
      INSERT INTO branding_settings 
      (logo_light, logo_dark, favicon, primary_color, secondary_color, accent_color, 
       font_family, company_name, tagline, contact_email, contact_phone, address, social_media)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) 
      RETURNING *
    `, [
      null, // logo_light
      null, // logo_dark
      null, // favicon
      '#2563eb', // primary_color
      '#64748b', // secondary_color
      '#f59e0b', // accent_color
      'Inter', // font_family
      'Amenti AI', // company_name
      'Digital Marketing & SEO Services', // tagline
      'hello@amentiai.com', // contact_email
      '(401) 123-4567', // contact_phone
      'Providence, Rhode Island', // address
      JSON.stringify({
        facebook: '',
        twitter: '',
        linkedin: '',
        instagram: '',
        youtube: ''
      }) // social_media
    ]);

    console.log('✅ Successfully initialized branding settings');
    console.log('📋 Created branding settings:', result.rows[0]);

  } catch (error) {
    console.error('Error initializing branding settings:', error);
  } finally {
    await pool.end();
  }
}

initBrandingSettings();




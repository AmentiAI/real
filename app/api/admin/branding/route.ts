import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    // First check if table exists
    const tableCheck = await query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'branding_settings'
      );
    `)
    
    if (!tableCheck.rows[0].exists) {
      console.log('Branding table does not exist, creating it...')
      // Create the table
      await query(`
        CREATE TABLE branding_settings (
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
      `)
      
      // Insert default data
      await query(`
        INSERT INTO branding_settings 
        (logo_light, logo_dark, favicon, primary_color, secondary_color, accent_color, 
         font_family, company_name, tagline, contact_email, contact_phone, address, social_media)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      `, [
        null, null, null, '#2563eb', '#64748b', '#f59e0b', 
        'Inter', 'Amenti AI', 'Digital Marketing & SEO Services', 
        'hello@amentiai.com', '(401) 123-4567', 'Providence, Rhode Island',
        JSON.stringify({ facebook: '', twitter: '', linkedin: '', instagram: '', youtube: '' })
      ])
    }
    
    const result = await query('SELECT * FROM branding_settings LIMIT 1')
    return NextResponse.json(result.rows[0] || null)
  } catch (error) {
    console.error('Error fetching branding:', error)
    return NextResponse.json({ error: 'Failed to fetch branding', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      id,
      logo_light,
      logo_dark,
      favicon,
      primary_color,
      secondary_color,
      accent_color,
      font_family,
      company_name,
      tagline,
      contact_email,
      contact_phone,
      address,
      social_media
    } = body

    console.log('Saving branding settings:', { id, company_name, primary_color })

    // First, ensure table exists
    try {
      await query(`
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
      `)
      console.log('✅ Table created/verified')
    } catch (tableError) {
      console.error('Table creation error:', tableError)
      // Continue anyway, table might already exist
    }

    // Check if we have any existing data
    const existingData = await query('SELECT id FROM branding_settings LIMIT 1')
    const hasExistingData = existingData.rows.length > 0

    if (hasExistingData) {
      // Update existing branding
      console.log('Updating existing branding...')
      const result = await query(
        `UPDATE branding_settings SET 
         logo_light = $1, logo_dark = $2, favicon = $3, primary_color = $4, 
         secondary_color = $5, accent_color = $6, font_family = $7, 
         company_name = $8, tagline = $9, contact_email = $10, 
         contact_phone = $11, address = $12, social_media = $13, 
         updated_at = CURRENT_TIMESTAMP 
         WHERE id = (SELECT id FROM branding_settings LIMIT 1) 
         RETURNING *`,
        [logo_light, logo_dark, favicon, primary_color, secondary_color, accent_color, 
         font_family, company_name, tagline, contact_email, contact_phone, address, 
         JSON.stringify(social_media)]
      )
      console.log('✅ Updated branding:', result.rows[0])
      return NextResponse.json(result.rows[0])
    } else {
      // Create new branding
      console.log('Creating new branding...')
      const result = await query(
        `INSERT INTO branding_settings 
         (logo_light, logo_dark, favicon, primary_color, secondary_color, accent_color, 
          font_family, company_name, tagline, contact_email, contact_phone, address, social_media)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
        [logo_light, logo_dark, favicon, primary_color, secondary_color, accent_color, 
         font_family, company_name, tagline, contact_email, contact_phone, address, 
         JSON.stringify(social_media)]
      )
      console.log('✅ Created branding:', result.rows[0])
      return NextResponse.json(result.rows[0])
    }
  } catch (error) {
    console.error('❌ Error saving branding:', error)
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      code: (error as any).code,
      detail: (error as any).detail,
      hint: (error as any).hint,
      stack: error instanceof Error ? error.stack : undefined
    })
    return NextResponse.json({ 
      error: 'Failed to save branding', 
      details: error instanceof Error ? error.message : 'Unknown error',
      code: (error as any).code,
      detail: (error as any).detail,
      hint: (error as any).hint
    }, { status: 500 })
  }
}



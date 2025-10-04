import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const client = await pool.connect()
    
    try {
      // Get all settings from the database
      const result = await client.query(`
        SELECT 
          id,
          general_settings,
          notification_settings,
          security_settings,
          created_at,
          updated_at
        FROM admin_settings 
        ORDER BY created_at DESC 
        LIMIT 1
      `)
      
      if (result.rows.length === 0) {
        // Return default settings if none exist
        const defaultSettings = {
          general: {
            siteName: branding?.company_name || 'Amenti AI',
            siteDescription: 'Professional internet marketing and SEO services',
            siteUrl: 'https://amentiai.com',
            adminEmail: 'admin@amentiai.com'
          },
          notifications: {
            emailNotifications: true,
            newClientAlerts: true,
            newInquiryAlerts: true,
            systemAlerts: false
          },
          security: {
            twoFactorAuth: false,
            sessionTimeout: 30,
            passwordExpiry: 90
          }
        }
        
        return NextResponse.json(defaultSettings)
      }
      
      const settings = result.rows[0]
      
      return NextResponse.json({
        general: settings.general_settings || {},
        notifications: settings.notification_settings || {},
        security: settings.security_settings || {}
      })
      
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const settings = await request.json()
    const client = await pool.connect()
    
    try {
      // Check if settings already exist
      const existingResult = await client.query(`
        SELECT id FROM admin_settings 
        ORDER BY created_at DESC 
        LIMIT 1
      `)
      
      if (existingResult.rows.length > 0) {
        // Update existing settings
        await client.query(`
          UPDATE admin_settings 
          SET 
            general_settings = $1,
            notification_settings = $2,
            security_settings = $3,
            updated_at = CURRENT_TIMESTAMP
          WHERE id = $4
        `, [
          JSON.stringify(settings.general),
          JSON.stringify(settings.notifications),
          JSON.stringify(settings.security),
          existingResult.rows[0].id
        ])
      } else {
        // Insert new settings
        await client.query(`
          INSERT INTO admin_settings (
            general_settings,
            notification_settings,
            security_settings
          ) VALUES ($1, $2, $3)
        `, [
          JSON.stringify(settings.general),
          JSON.stringify(settings.notifications),
          JSON.stringify(settings.security)
        ])
      }
      
      return NextResponse.json({ success: true, message: 'Settings saved successfully' })
      
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error saving settings:', error)
    return NextResponse.json(
      { error: 'Failed to save settings' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const settings = await request.json()
    const client = await pool.connect()
    
    try {
      // Always insert new settings (for creating initial settings)
      await client.query(`
        INSERT INTO admin_settings (
          general_settings,
          notification_settings,
          security_settings
        ) VALUES ($1, $2, $3)
      `, [
        JSON.stringify(settings.general),
        JSON.stringify(settings.notifications),
        JSON.stringify(settings.security)
      ])
      
      return NextResponse.json({ success: true, message: 'Settings created successfully' })
      
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error creating settings:', error)
    return NextResponse.json(
      { error: 'Failed to create settings' },
      { status: 500 }
    )
  }
}






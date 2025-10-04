import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'

// Query helper function
async function query(text: string, params?: any[]) {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
}

export async function GET() {
  try {
    const result = await query(`
      SELECT * FROM paypal_settings ORDER BY id DESC LIMIT 1
    `)
    
    if (result.rows.length === 0) {
      // Return default settings if none exist
      return NextResponse.json({
        success: true,
        data: {
          id: null,
          environment: 'sandbox',
          client_id: '',
          client_secret: '',
            webhook_id: '',
            webhook_url: '',
            return_url: 'https://amentiai.com/payment/success',
            cancel_url: 'https://amentiai.com/payment/cancel',
          currency: 'USD',
          tax_rate: 0,
          processing_fee_rate: 0.029,
          processing_fee_fixed: 0.30,
          auto_capture: true,
          enable_recurring: true,
          trial_period_days: 0,
          grace_period_days: 3,
          email_notifications: true,
          admin_email: '',
          customer_email_template: 'Thank you for your purchase! Your package has been activated.',
          admin_email_template: 'New payment received for package: {package_name}',
          is_active: false
        }
      })
    }
    
    return NextResponse.json({
      success: true,
      data: result.rows[0]
    })
  } catch (error) {
    console.error('Error fetching PayPal settings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch PayPal settings' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      environment,
      client_id,
      client_secret,
      webhook_id,
      webhook_url,
      return_url,
      cancel_url,
      currency,
      tax_rate,
      processing_fee_rate,
      processing_fee_fixed,
      auto_capture,
      enable_recurring,
      trial_period_days,
      grace_period_days,
      email_notifications,
      admin_email,
      customer_email_template,
      admin_email_template,
      is_active
    } = body

    // Check if settings exist
    const existingResult = await query('SELECT id FROM paypal_settings ORDER BY id DESC LIMIT 1')
    
    if (existingResult.rows.length === 0) {
      // Create new settings
      const result = await query(`
        INSERT INTO paypal_settings (
          environment, client_id, client_secret, webhook_id, webhook_url,
          return_url, cancel_url, currency, tax_rate, processing_fee_rate,
          processing_fee_fixed, auto_capture, enable_recurring, trial_period_days,
          grace_period_days, email_notifications, admin_email,
          customer_email_template, admin_email_template, is_active
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20
        ) RETURNING *
      `, [
        environment, client_id, client_secret, webhook_id, webhook_url,
        return_url, cancel_url, currency, tax_rate, processing_fee_rate,
        processing_fee_fixed, auto_capture, enable_recurring, trial_period_days,
        grace_period_days, email_notifications, admin_email,
        customer_email_template, admin_email_template, is_active
      ])
      
      return NextResponse.json({
        success: true,
        data: result.rows[0]
      })
    } else {
      // Update existing settings
      const result = await query(`
        UPDATE paypal_settings SET
          environment = $1,
          client_id = $2,
          client_secret = $3,
          webhook_id = $4,
          webhook_url = $5,
          return_url = $6,
          cancel_url = $7,
          currency = $8,
          tax_rate = $9,
          processing_fee_rate = $10,
          processing_fee_fixed = $11,
          auto_capture = $12,
          enable_recurring = $13,
          trial_period_days = $14,
          grace_period_days = $15,
          email_notifications = $16,
          admin_email = $17,
          customer_email_template = $18,
          admin_email_template = $19,
          is_active = $20,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $21
        RETURNING *
      `, [
        environment, client_id, client_secret, webhook_id, webhook_url,
        return_url, cancel_url, currency, tax_rate, processing_fee_rate,
        processing_fee_fixed, auto_capture, enable_recurring, trial_period_days,
        grace_period_days, email_notifications, admin_email,
        customer_email_template, admin_email_template, is_active,
        existingResult.rows[0].id
      ])
      
      return NextResponse.json({
        success: true,
        data: result.rows[0]
      })
    }
  } catch (error) {
    console.error('Error updating PayPal settings:', error)
    return NextResponse.json(
      { error: 'Failed to update PayPal settings' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, settings } = body

    console.log('PayPal test connection request:', { action, hasSettings: !!settings })

    if (action === 'check_env_vars') {
      // Check if environment variables are available
      const hasEnvClientId = !!process.env.PPCLIENT
      const hasEnvClientSecret = !!process.env.PPSECRET
      
      return NextResponse.json({
        success: true,
        data: {
          has_env_client_id: hasEnvClientId,
          has_env_client_secret: hasEnvClientSecret,
          both_available: hasEnvClientId && hasEnvClientSecret
        }
      })
    }

    if (action === 'test_connection') {
      let testSettings = settings
      
      // If no settings provided, try to get from database
      if (!testSettings) {
        const settingsResult = await query('SELECT * FROM paypal_settings ORDER BY id DESC LIMIT 1')
        
        console.log('Settings query result:', settingsResult.rows.length)
        
        if (settingsResult.rows.length === 0) {
          console.log('No PayPal settings found')
          return NextResponse.json(
            { error: 'PayPal settings not configured. Please enter your credentials first.' },
            { status: 400 }
          )
        }

        testSettings = settingsResult.rows[0]
      }
      
      // Use environment variables for credentials if available
      const clientId = process.env.PPCLIENT || testSettings.client_id
      const clientSecret = process.env.PPSECRET || testSettings.client_secret
      
      console.log('Test settings:', { 
        has_env_client_id: !!process.env.PPCLIENT,
        has_env_client_secret: !!process.env.PPSECRET,
        has_db_client_id: !!testSettings.client_id, 
        has_db_client_secret: !!testSettings.client_secret,
        environment: testSettings.environment 
      })
      
      if (!clientId || !clientSecret) {
        console.log('Missing credentials')
        return NextResponse.json(
          { error: 'PayPal credentials not configured. Please set PPCLIENT and PPSECRET environment variables or enter credentials in the form.' },
          { status: 400 }
        )
      }

      // Test connection by getting access token
      const baseURL = testSettings.environment === 'live' 
        ? 'https://api-m.paypal.com' 
        : 'https://api-m.sandbox.paypal.com'
      
      console.log('Testing connection to:', baseURL)
      
      try {
        const response = await fetch(`${baseURL}/v1/oauth2/token`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Accept-Language': 'en_US',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
          },
          body: 'grant_type=client_credentials'
        })

        console.log('PayPal API response status:', response.status)

        if (response.ok) {
          const data = await response.json()
          console.log('PayPal API response successful')
          return NextResponse.json({
            success: true,
            message: 'PayPal connection successful',
            data: {
              environment: testSettings.environment,
              expires_in: data.expires_in
            }
          })
        } else {
          const errorData = await response.json().catch(() => ({}))
          console.log('PayPal API error:', errorData)
          return NextResponse.json(
            { error: `PayPal connection failed: ${errorData.error_description || errorData.error || 'Invalid credentials'}` },
            { status: 400 }
          )
        }
      } catch (fetchError) {
        console.error('Fetch error:', fetchError)
        const errorMessage = fetchError instanceof Error ? fetchError.message : 'Unknown error'
        return NextResponse.json(
          { error: `Failed to connect to PayPal API: ${errorMessage}` },
          { status: 500 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error testing PayPal connection:', error)
    return NextResponse.json(
      { error: 'Failed to test PayPal connection' },
      { status: 500 }
    )
  }
}

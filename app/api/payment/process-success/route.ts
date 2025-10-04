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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { paymentId, token, PayerID } = body

    console.log('Processing payment success:', { paymentId, token, PayerID })

    // Verify payment with PayPal
    const paypalResponse = await verifyPayPalPayment(paymentId, token)
    
    if (!paypalResponse.success) {
      return NextResponse.json(
        { error: 'Payment verification failed' },
        { status: 400 }
      )
    }

    // Get package and client information
    const packageId = paypalResponse.packageId
    const clientEmail = paypalResponse.clientEmail

    // Find or create client
    let clientResult = await query(
      'SELECT * FROM clients WHERE email = $1',
      [clientEmail]
    )

    let clientId
    if (clientResult.rows.length === 0) {
      // Create new client from PayPal data
      const newClientResult = await query(`
        INSERT INTO clients (
          name, email, company, website, industry, 
          status, website_status, seo_status, 
          billing_date, join_date, payment_method, password
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        RETURNING id
      `, [
        paypalResponse.clientName || 'Client',
        clientEmail,
        paypalResponse.company || '',
        paypalResponse.website || '',
        'Unknown',
        'active',
        'pending',
        'pending',
        new Date().toISOString().split('T')[0],
        new Date().toISOString().split('T')[0],
        'paypal',
        'temp_password_' + Math.random().toString(36).substring(7)
      ])
      clientId = newClientResult.rows[0].id
    } else {
      clientId = clientResult.rows[0].id
    }

    // Get package details
    const packageResult = await query(
      'SELECT * FROM packages WHERE id = $1',
      [packageId]
    )

    if (packageResult.rows.length === 0) {
      return NextResponse.json(
        { error: 'Package not found' },
        { status: 404 }
      )
    }

    const packageData = packageResult.rows[0]

    // Create payment record
    await query(`
      INSERT INTO payments (
        payment_id, client_id, package_id, amount, currency, 
        status, paypal_token, payer_id, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP)
    `, [
      paymentId,
      clientId,
      packageId,
      paypalResponse.amount,
      paypalResponse.currency || 'USD',
      'completed',
      token,
      PayerID
    ])

    // Update client status based on package
    if (packageData.billing_period === 'one-time') {
      await query(`
        UPDATE clients SET 
          status = 'active',
          website_status = CASE WHEN $1 = 'Website Design' THEN 'active' ELSE website_status END,
          seo_status = CASE WHEN $1 LIKE '%SEO%' THEN 'active' ELSE seo_status END,
          payment_method = 'paypal'
        WHERE id = $2
      `, [packageData.name, clientId])
    } else {
      // For recurring packages, set up subscription
      await query(`
        UPDATE clients SET 
          status = 'active',
          payment_method = 'paypal'
        WHERE id = $1
      `, [clientId])
    }

    // Get client details for response
    const clientDetails = await query(
      'SELECT * FROM clients WHERE id = $1',
      [clientId]
    )

    const paymentData = {
      paymentId,
      packageId,
      packageName: packageData.name,
      amount: paypalResponse.amount,
      clientId,
      clientName: clientDetails.rows[0].name,
      clientEmail: clientDetails.rows[0].email,
      status: 'success',
      accessGranted: true,
      portalUrl: `/clients/login?email=${encodeURIComponent(clientEmail)}`
    }

    return NextResponse.json({
      success: true,
      paymentData
    })

  } catch (error) {
    console.error('Error processing payment success:', error)
    return NextResponse.json(
      { error: 'Failed to process payment' },
      { status: 500 }
    )
  }
}

async function verifyPayPalPayment(paymentId: string, token: string) {
  try {
    // Get PayPal settings
    const settingsResult = await query('SELECT * FROM paypal_settings ORDER BY id DESC LIMIT 1')
    
    if (settingsResult.rows.length === 0) {
      throw new Error('PayPal settings not configured')
    }

    const settings = settingsResult.rows[0]
    const clientId = process.env.PPCLIENT || settings.client_id
    const clientSecret = process.env.PPSECRET || settings.client_secret

    if (!clientId || !clientSecret) {
      throw new Error('PayPal credentials not configured')
    }

    // Get access token
    const baseURL = settings.environment === 'live' 
      ? 'https://api-m.paypal.com' 
      : 'https://api-m.sandbox.paypal.com'

    const tokenResponse = await fetch(`${baseURL}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Accept-Language': 'en_US',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
      },
      body: 'grant_type=client_credentials'
    })

    if (!tokenResponse.ok) {
      throw new Error('Failed to get PayPal access token')
    }

    const tokenData = await tokenResponse.json()
    const accessToken = tokenData.access_token

    // Execute payment
    const executeResponse = await fetch(`${baseURL}/v1/payments/payment/${paymentId}/execute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        payer_id: token // This should be the PayerID from the frontend
      })
    })

    if (!executeResponse.ok) {
      throw new Error('Failed to execute PayPal payment')
    }

    const paymentData = await executeResponse.json()

    // Extract relevant information
    const transaction = paymentData.transactions[0]
    const amount = transaction.amount.total
    const currency = transaction.amount.currency
    const custom = transaction.custom || '{}'
    const customData = JSON.parse(custom)

    return {
      success: true,
      amount,
      currency,
      packageId: customData.packageId,
      clientEmail: customData.clientEmail,
      clientName: customData.clientName,
      company: customData.company,
      website: customData.website
    }

  } catch (error) {
    console.error('PayPal verification error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, error: errorMessage }
  }
}

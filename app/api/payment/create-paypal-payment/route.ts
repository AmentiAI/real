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
    const { packageId, tierId, amount, currency, billing_period, clientData } = body

    console.log('Creating PayPal payment:', { packageId, tierId, amount, currency, billing_period })

    // Get package details
    const packageResult = await query(
      'SELECT * FROM packages WHERE id = $1 AND is_active = true',
      [packageId]
    )

    if (packageResult.rows.length === 0) {
      return NextResponse.json(
        { error: 'Package not found or inactive' },
        { status: 404 }
      )
    }

    const packageData = packageResult.rows[0]

    // Get tier details if tierId is provided
    let tierData = null
    if (tierId) {
      const tierResult = await query(
        'SELECT * FROM package_tiers WHERE id = $1 AND package_id = $2 AND is_active = true',
        [tierId, packageId]
      )

      if (tierResult.rows.length === 0) {
        return NextResponse.json(
          { error: 'Package tier not found or inactive' },
          { status: 404 }
        )
      }

      tierData = tierResult.rows[0]
    }

    // Get PayPal settings
    const settingsResult = await query('SELECT * FROM paypal_settings ORDER BY id DESC LIMIT 1')
    
    if (settingsResult.rows.length === 0) {
      return NextResponse.json(
        { error: 'PayPal settings not configured' },
        { status: 400 }
      )
    }

    const settings = settingsResult.rows[0]
    const clientId = process.env.PPCLIENT || settings.client_id
    const clientSecret = process.env.PPSECRET || settings.client_secret

    if (!clientId || !clientSecret) {
      return NextResponse.json(
        { error: 'PayPal credentials not configured' },
        { status: 400 }
      )
    }

    // Create PayPal payment
    const paypalPayment = await createPayPalPayment({
      packageData,
      tierData,
      clientData,
      amount,
      currency,
      settings,
      clientId,
      clientSecret
    })

    if (paypalPayment.success) {
      return NextResponse.json({
        success: true,
        paymentUrl: paypalPayment.approval_url,
        paymentId: paypalPayment.payment_id
      })
    } else {
      return NextResponse.json(
        { error: paypalPayment.error || 'Failed to create PayPal payment' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Error creating PayPal payment:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: `Failed to create payment: ${errorMessage}` },
      { status: 500 }
    )
  }
}

async function createPayPalPayment({
  packageData,
  tierData,
  clientData,
  amount,
  currency,
  settings,
  clientId,
  clientSecret
}: {
  packageData: any
  tierData: any
  clientData: any
  amount: number
  currency: string
  settings: any
  clientId: string
  clientSecret: string
}) {
  try {
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

    // Create payment
    const paymentData = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal'
      },
      transactions: [{
        amount: {
          total: amount.toFixed(2),
          currency: currency
        },
        description: tierData 
          ? `${packageData.name} - ${tierData.tier_name} - ${tierData.tier_description}`
          : `${packageData.name} - ${packageData.description}`,
        custom: JSON.stringify({
          packageId: packageData.id,
          packageName: packageData.name,
          tierId: tierData?.id || null,
          tierName: tierData?.tier_name || null,
          billing_period: tierData?.billing_period || packageData.billing_period,
          clientEmail: clientData.email,
          clientName: clientData.name,
          company: clientData.company,
          website: clientData.website,
          phone: clientData.phone,
          industry: clientData.industry
        }),
        item_list: {
          items: [{
            name: tierData ? `${packageData.name} - ${tierData.tier_name}` : packageData.name,
            description: tierData ? tierData.tier_description : packageData.description,
            quantity: '1',
            price: amount.toFixed(2),
            currency: currency
          }]
        }
      }],
      redirect_urls: {
        return_url: settings.return_url || 'https://amentiai.com/payment/success',
        cancel_url: settings.cancel_url || 'https://amentiai.com/payment/cancel'
      }
    }

    const paymentResponse = await fetch(`${baseURL}/v1/payments/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(paymentData)
    })

    if (!paymentResponse.ok) {
      const errorData = await paymentResponse.json()
      throw new Error(`PayPal payment creation failed: ${errorData.message || 'Unknown error'}`)
    }

    const payment = await paymentResponse.json()

    // Find approval URL
    const approvalUrl = payment.links?.find((link: any) => link.rel === 'approval_url')?.href

    if (!approvalUrl) {
      throw new Error('No approval URL found in PayPal response')
    }

    return {
      success: true,
      payment_id: payment.id,
      approval_url: approvalUrl
    }

  } catch (error) {
    console.error('PayPal payment creation error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, error: errorMessage }
  }
}


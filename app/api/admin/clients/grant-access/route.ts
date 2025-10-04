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
    const { clientId, packageId, accessType } = body

    console.log('Granting client access:', { clientId, packageId, accessType })

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

    // Update client status based on package type
    if (packageData.name.includes('Website') || packageData.name.includes('Design')) {
      await query(`
        UPDATE clients SET 
          website_status = 'active',
          status = 'active'
        WHERE id = $1
      `, [clientId])
    }

    if (packageData.name.includes('SEO') || packageData.name.includes('Marketing')) {
      await query(`
        UPDATE clients SET 
          seo_status = 'active',
          status = 'active'
        WHERE id = $1
      `, [clientId])
    }

    // Create access record
    await query(`
      INSERT INTO client_access (
        client_id, package_id, access_type, granted_at, expires_at
      ) VALUES ($1, $2, $3, CURRENT_TIMESTAMP, $4)
    `, [
      clientId,
      packageId,
      accessType,
      packageData.billing_period === 'one-time' 
        ? null // No expiration for one-time purchases
        : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days for recurring
    ])

    // Send welcome email (you can implement this later)
    // await sendWelcomeEmail(clientId, packageData)

    return NextResponse.json({
      success: true,
      message: 'Client access granted successfully'
    })

  } catch (error) {
    console.error('Error granting client access:', error)
    return NextResponse.json(
      { error: 'Failed to grant client access' },
      { status: 500 }
    )
  }
}





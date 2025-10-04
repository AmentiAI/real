import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'

// Get all payments for a client
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const clientId = params.id
    const dbClient = await pool.connect()
    
    try {
      const result = await dbClient.query(`
        SELECT * FROM client_payments 
        WHERE client_id = $1 AND is_active = true
        ORDER BY created_at DESC
      `, [clientId])

      return NextResponse.json(result.rows)
    } finally {
      dbClient.release()
    }
  } catch (error) {
    console.error('Error fetching payment info:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Add a new payment for a client
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const clientId = params.id
    const { 
      package_id, 
      package_name, 
      amount, 
      billing_frequency, 
      next_billing_date,
      start_date,
      is_custom,
      status,
      notes 
    } = await request.json()

    const dbClient = await pool.connect()
    
    try {
      const result = await dbClient.query(`
        INSERT INTO client_payments (
          client_id, 
          package_id, 
          package_name, 
          amount, 
          billing_frequency, 
          next_billing_date,
          start_date,
          is_custom,
          status,
          is_active,
          notes,
          created_at,
          updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW(), NOW())
        RETURNING *
      `, [
        clientId, 
        package_id, 
        package_name, 
        amount, 
        billing_frequency, 
        next_billing_date,
        start_date || new Date().toISOString().split('T')[0],
        is_custom,
        status || 'active',
        true,
        notes
      ])

      return NextResponse.json({
        success: true,
        message: 'Payment added successfully',
        payment: result.rows[0]
      })
    } finally {
      dbClient.release()
    }
  } catch (error) {
    console.error('Error creating payment info:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}



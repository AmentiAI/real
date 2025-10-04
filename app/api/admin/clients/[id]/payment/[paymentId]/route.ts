import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'

// Update a specific payment
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string, paymentId: string } }
) {
  try {
    const clientId = params.id
    const paymentId = params.paymentId
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
        UPDATE client_payments 
        SET 
          package_id = $1,
          package_name = $2,
          amount = $3,
          billing_frequency = $4,
          next_billing_date = $5,
          start_date = $6,
          is_custom = $7,
          status = $8,
          notes = $9,
          updated_at = NOW()
        WHERE id = $10 AND client_id = $11
        RETURNING *
      `, [
        package_id, 
        package_name, 
        amount, 
        billing_frequency, 
        next_billing_date,
        start_date,
        is_custom,
        status,
        notes,
        paymentId,
        clientId
      ])

      if (result.rows.length === 0) {
        return NextResponse.json(
          { error: 'Payment not found or not associated with this client' },
          { status: 404 }
        )
      }

      return NextResponse.json({
        success: true,
        message: 'Payment updated successfully',
        payment: result.rows[0]
      })
    } finally {
      dbClient.release()
    }
  } catch (error) {
    console.error('Error updating payment:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Delete a specific payment
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string, paymentId: string } }
) {
  try {
    const clientId = params.id
    const paymentId = params.paymentId

    const dbClient = await pool.connect()
    
    try {
      // Soft delete by setting is_active to false
      const result = await dbClient.query(`
        UPDATE client_payments 
        SET is_active = false, updated_at = NOW()
        WHERE id = $1 AND client_id = $2
        RETURNING *
      `, [paymentId, clientId])

      if (result.rows.length === 0) {
        return NextResponse.json(
          { error: 'Payment not found or not associated with this client' },
          { status: 404 }
        )
      }

      return NextResponse.json({
        success: true,
        message: 'Payment deleted successfully'
      })
    } finally {
      dbClient.release()
    }
  } catch (error) {
    console.error('Error deleting payment:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}


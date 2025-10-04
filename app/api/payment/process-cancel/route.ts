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
    const { paymentId, token, reason } = body

    console.log('Processing payment cancellation:', { paymentId, token, reason })

    // Log the cancellation for analytics
    await query(`
      INSERT INTO payment_logs (
        payment_id, status, reason, token, created_at
      ) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)
    `, [paymentId, 'cancelled', reason, token])

    // You could also update any pending payment records here
    // or send notifications to the sales team

    return NextResponse.json({
      success: true,
      message: 'Payment cancellation logged'
    })

  } catch (error) {
    console.error('Error processing payment cancellation:', error)
    return NextResponse.json(
      { error: 'Failed to process cancellation' },
      { status: 500 }
    )
  }
}





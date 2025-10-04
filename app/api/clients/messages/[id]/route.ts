import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'
import { verifyClientToken } from '@/lib/client-auth'

// Mark a message as read
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const clientPayload = verifyClientToken(request)
    if (!clientPayload) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const messageId = params.id
    const dbClient = await pool.connect()
    
    try {
      const result = await dbClient.query(`
        UPDATE client_messages 
        SET is_read = true, updated_at = NOW()
        WHERE id = $1 AND client_id = $2
        RETURNING id, is_read
      `, [messageId, clientPayload.clientId])

      if (result.rows.length === 0) {
        return NextResponse.json(
          { error: 'Message not found' },
          { status: 404 }
        )
      }

      return NextResponse.json({
        success: true,
        message: 'Message marked as read',
        messageId: result.rows[0].id,
        isRead: result.rows[0].is_read
      })
    } finally {
      dbClient.release()
    }
  } catch (error) {
    console.error('Error marking message as read:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

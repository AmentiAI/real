import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'

// Get messages for a specific client
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const clientId = params.id
    const dbClient = await pool.connect()
    
    try {
      const result = await dbClient.query(`
        SELECT 
          m.id,
          m.sender_type,
          m.subject,
          m.message,
          m.is_read,
          m.priority,
          m.created_at,
          m.parent_message_id,
          m.thread_id,
          c.name as client_name,
          c.email as client_email
        FROM client_messages m
        LEFT JOIN clients c ON m.client_id = c.id
        WHERE m.client_id = $1
        ORDER BY m.thread_id DESC, m.created_at ASC
      `, [clientId])

      return NextResponse.json(result.rows)
    } finally {
      dbClient.release()
    }
  } catch (error) {
    console.error('Error fetching client messages:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

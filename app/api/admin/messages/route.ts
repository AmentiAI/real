import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'

// Get all messages for admin (with client info)
export async function GET(request: NextRequest) {
  try {
    const dbClient = await pool.connect()
    
    try {
      const result = await dbClient.query(`
        SELECT 
          m.id,
          m.client_id,
          m.sender_type,
          m.subject,
          m.message,
          m.is_read,
          m.priority,
          m.created_at,
          m.parent_message_id,
          m.thread_id,
          c.name as client_name,
          c.email as client_email,
          c.company as client_company
        FROM client_messages m
        LEFT JOIN clients c ON m.client_id = c.id
        ORDER BY m.thread_id DESC, m.created_at ASC
        LIMIT 100
      `)

      return NextResponse.json(result.rows)
    } finally {
      dbClient.release()
    }
  } catch (error) {
    console.error('Error fetching admin messages:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Send a message from admin to client
export async function POST(request: NextRequest) {
  try {
    const { clientId, subject, message, priority = 'normal', parent_message_id } = await request.json()

    if (!clientId || !message || message.trim() === '') {
      return NextResponse.json(
        { error: 'Client ID and message are required' },
        { status: 400 }
      )
    }

    const dbClient = await pool.connect()
    
    try {
      // Verify client exists
      const clientCheck = await dbClient.query(
        'SELECT id, name FROM clients WHERE id = $1',
        [clientId]
      )

      if (clientCheck.rows.length === 0) {
        return NextResponse.json(
          { error: 'Client not found' },
          { status: 404 }
        )
      }

      let thread_id = null
      
      // If this is a reply, get the thread_id from the parent message
      if (parent_message_id) {
        const parentResult = await dbClient.query(
          'SELECT thread_id FROM client_messages WHERE id = $1',
          [parent_message_id]
        )
        
        if (parentResult.rows.length === 0) {
          return NextResponse.json(
            { error: 'Parent message not found' },
            { status: 404 }
          )
        }
        
        thread_id = parentResult.rows[0].thread_id
      }

      const result = await dbClient.query(`
        INSERT INTO client_messages (client_id, sender_type, subject, message, priority, parent_message_id, thread_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id, created_at, thread_id
      `, [clientId, 'admin', subject || 'Admin Response', message, priority, parent_message_id || null, thread_id])

      return NextResponse.json({
        success: true,
        message: 'Message sent successfully',
        messageId: result.rows[0].id,
        createdAt: result.rows[0].created_at
      })
    } finally {
      dbClient.release()
    }
  } catch (error) {
    console.error('Error sending admin message:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import jwt from 'jsonwebtoken'

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any
    const clientId = decoded.clientId

    const result = await query(
      'SELECT id, sender_type, subject, message, is_read, priority, created_at FROM client_messages WHERE client_id = $1 ORDER BY created_at DESC',
      [clientId]
    )

    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any
    const clientId = decoded.clientId

    const body = await request.json()
    const { subject, message, priority = 'normal' } = body

    if (!subject || !message) {
      return NextResponse.json({ error: 'Subject and message are required' }, { status: 400 })
    }

    const result = await query(
      'INSERT INTO client_messages (client_id, sender_type, subject, message, priority) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [clientId, 'client', subject, message, priority]
    )

    return NextResponse.json({ 
      success: true, 
      messageId: result.rows[0].id,
      message: 'Message sent successfully' 
    })
  } catch (error) {
    console.error('Error sending message:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
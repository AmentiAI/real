import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const clientId = params.id

    const client = await pool.connect()
    
    try {
      const result = await client.query(
        `SELECT id, client_id, type, subject, content, created_at, updated_at
         FROM client_communications 
         WHERE client_id = $1
         ORDER BY created_at DESC`,
        [clientId]
      )

      return NextResponse.json(result.rows)
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error fetching client communications:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const clientId = params.id
    const body = await request.json()
    const { type, subject, content } = body

    if (!type || !content || content.trim() === '') {
      return NextResponse.json(
        { error: 'Type and content are required' },
        { status: 400 }
      )
    }

    const validTypes = ['email', 'call', 'meeting', 'note']
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: 'Invalid communication type' },
        { status: 400 }
      )
    }

    const client = await pool.connect()
    
    try {
      const result = await client.query(
        `INSERT INTO client_communications (client_id, type, subject, content)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [clientId, type, subject || null, content.trim()]
      )

      return NextResponse.json({
        success: true,
        message: 'Communication logged successfully',
        communication: result.rows[0]
      }, { status: 201 })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error creating client communication:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}



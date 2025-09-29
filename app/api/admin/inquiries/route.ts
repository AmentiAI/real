import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET() {
  try {
    const client = await pool.connect()
    
    try {
      const result = await client.query(`
        SELECT id, name, email, phone, company, message, service_interest, status, created_at
        FROM inquiries 
        ORDER BY created_at DESC
      `)
      
      return NextResponse.json(result.rows)
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error fetching inquiries:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json(
        { error: 'ID and status are required' },
        { status: 400 }
      )
    }

    const client = await pool.connect()
    
    try {
      await client.query(
        'UPDATE inquiries SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
        [status, id]
      )

      return NextResponse.json(
        { 
          success: true, 
          message: 'Inquiry status updated successfully'
        }
      )
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error updating inquiry:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}


import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const clientId = params.id

    const client = await pool.connect()
    
    try {
      const result = await client.query(
        `SELECT id, client_id, name, file_path, file_type, file_size, category, description, created_at, updated_at
         FROM client_documents 
         WHERE client_id = $1
         ORDER BY created_at DESC`,
        [clientId]
      )

      return NextResponse.json(result.rows)
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error fetching client documents:', error)
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
    const { name, file_path, file_type, file_size, category, description } = body

    if (!name || !file_path) {
      return NextResponse.json(
        { error: 'Name and file path are required' },
        { status: 400 }
      )
    }

    const client = await pool.connect()
    
    try {
      const result = await client.query(
        `INSERT INTO client_documents (client_id, name, file_path, file_type, file_size, category, description)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING *`,
        [clientId, name, file_path, file_type || null, file_size || null, 
         category || 'general', description || null]
      )

      return NextResponse.json({
        success: true,
        message: 'Document added successfully',
        document: result.rows[0]
      }, { status: 201 })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error creating client document:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}



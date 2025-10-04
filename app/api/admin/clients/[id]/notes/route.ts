import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'

// Get notes for a specific client
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
          id,
          note,
          note_type,
          created_by,
          created_at,
          updated_at
        FROM client_notes
        WHERE client_id = $1
        ORDER BY created_at DESC
      `, [clientId])

      return NextResponse.json(result.rows)
    } finally {
      dbClient.release()
    }
  } catch (error) {
    console.error('Error fetching client notes:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Add a new note for a client
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const clientId = params.id
    const { note, note_type = 'general', created_by = 'admin' } = await request.json()

    if (!note || note.trim() === '') {
      return NextResponse.json(
        { error: 'Note content is required' },
        { status: 400 }
      )
    }

    const dbClient = await pool.connect()
    
    try {
      const result = await dbClient.query(`
        INSERT INTO client_notes (client_id, note, note_type, created_by)
        VALUES ($1, $2, $3, $4)
        RETURNING id, created_at
      `, [clientId, note, note_type, created_by])

      return NextResponse.json({
        success: true,
        message: 'Note added successfully',
        noteId: result.rows[0].id,
        createdAt: result.rows[0].created_at
      })
    } finally {
      dbClient.release()
    }
  } catch (error) {
    console.error('Error adding note:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
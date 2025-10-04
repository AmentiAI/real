import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'

// Delete a specific keyword for a client
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string, keywordId: string } }
) {
  try {
    const clientId = params.id
    const keywordId = params.keywordId

    const dbClient = await pool.connect()
    
    try {
      const result = await dbClient.query(`
        DELETE FROM client_keywords 
        WHERE id = $1 AND client_id = $2
      `, [keywordId, clientId])

      if (result.rowCount === 0) {
        return NextResponse.json(
          { error: 'Keyword not found or not associated with this client' },
          { status: 404 }
        )
      }

      return NextResponse.json({
        success: true,
        message: 'Keyword deleted successfully'
      })
    } finally {
      dbClient.release()
    }
  } catch (error) {
    console.error('Error deleting keyword:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Update a specific keyword for a client
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string, keywordId: string } }
) {
  try {
    const clientId = params.id
    const keywordId = params.keywordId
    const { 
      keyword, 
      target_url, 
      current_rank, 
      target_rank, 
      difficulty, 
      search_volume, 
      competition, 
      notes 
    } = await request.json()

    const dbClient = await pool.connect()
    
    try {
      const result = await dbClient.query(`
        UPDATE client_keywords 
        SET 
          keyword = $1,
          target_url = $2,
          current_rank = $3,
          target_rank = $4,
          difficulty = $5,
          search_volume = $6,
          competition = $7,
          notes = $8,
          updated_at = NOW()
        WHERE id = $9 AND client_id = $10
        RETURNING *
      `, [keyword, target_url, current_rank, target_rank, difficulty, search_volume, competition, notes, keywordId, clientId])

      if (result.rows.length === 0) {
        return NextResponse.json(
          { error: 'Keyword not found or not associated with this client' },
          { status: 404 }
        )
      }

      return NextResponse.json({
        success: true,
        message: 'Keyword updated successfully',
        keyword: result.rows[0]
      })
    } finally {
      dbClient.release()
    }
  } catch (error) {
    console.error('Error updating keyword:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}





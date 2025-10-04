import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'

// Get keywords for a specific client
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
          keyword,
          target_url,
          current_rank,
          target_rank,
          difficulty,
          search_volume,
          competition,
          notes,
          is_active,
          created_at,
          updated_at
        FROM client_keywords
        WHERE client_id = $1
        ORDER BY created_at DESC
      `, [clientId])

      return NextResponse.json(result.rows)
    } finally {
      dbClient.release()
    }
  } catch (error) {
    console.error('Error fetching client keywords:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Add a new keyword for a client
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const clientId = params.id
    const { 
      keyword, 
      target_url, 
      current_rank, 
      target_rank, 
      difficulty = 'medium', 
      search_volume, 
      competition = 'medium', 
      notes 
    } = await request.json()

    if (!keyword || keyword.trim() === '') {
      return NextResponse.json(
        { error: 'Keyword is required' },
        { status: 400 }
      )
    }

    const dbClient = await pool.connect()
    
    try {
      const result = await dbClient.query(`
        INSERT INTO client_keywords (
          client_id, keyword, target_url, current_rank, target_rank, 
          difficulty, search_volume, competition, notes
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING id, created_at
      `, [clientId, keyword, target_url, current_rank, target_rank, difficulty, search_volume, competition, notes])

      return NextResponse.json({
        success: true,
        message: 'Keyword added successfully',
        keywordId: result.rows[0].id,
        createdAt: result.rows[0].created_at
      })
    } finally {
      dbClient.release()
    }
  } catch (error) {
    console.error('Error adding keyword:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

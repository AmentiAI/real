import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured') === 'true'
    const limit = parseInt(searchParams.get('limit') || '10')

    let whereClause = ''
    let params: any[] = []
    
    if (featured) {
      whereClause = 'WHERE is_featured = true'
    }

    const result = await query(
      `SELECT p.*, c.name as client_name, c.company 
       FROM projects p 
       LEFT JOIN clients c ON p.client_id = c.id 
       ${whereClause}
       ORDER BY p.is_featured DESC, p.created_at DESC 
       ${limit ? `LIMIT $${params.length + 1}` : ''}`,
      limit ? [...params, limit] : params
    )

    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { 
      title, 
      description, 
      image_url, 
      client_id, 
      services_used, 
      results, 
      is_featured 
    } = await request.json()

    // Validate required fields
    if (!title || !description) {
      return NextResponse.json({ error: 'Title and description are required' }, { status: 400 })
    }

    // Insert project
    const result = await query(
      `INSERT INTO projects (title, description, image_url, client_id, services_used, results, is_featured) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        title,
        description,
        image_url || null,
        client_id || null,
        JSON.stringify(services_used || []),
        JSON.stringify(results || {}),
        is_featured || false
      ]
    )

    return NextResponse.json(result.rows[0], { status: 201 })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}










import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const clientId = params.id

    const client = await pool.connect()
    
    try {
      const result = await client.query(
        `SELECT p.id, p.title, p.description, p.image_url, p.services_used, p.results, 
                p.is_featured, p.created_at, p.updated_at
         FROM projects p
         WHERE p.client_id = $1
         ORDER BY p.created_at DESC`,
        [clientId]
      )

      return NextResponse.json(result.rows)
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error fetching client projects:', error)
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
    const { title, description, image_url, services_used, results, is_featured } = body

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      )
    }

    const client = await pool.connect()
    
    try {
      const result = await client.query(
        `INSERT INTO projects (client_id, title, description, image_url, services_used, results, is_featured)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING *`,
        [clientId, title, description, image_url || null, 
         JSON.stringify(services_used || []), 
         JSON.stringify(results || {}), 
         is_featured || false]
      )

      return NextResponse.json({
        success: true,
        message: 'Project created successfully',
        project: result.rows[0]
      }, { status: 201 })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error creating client project:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}



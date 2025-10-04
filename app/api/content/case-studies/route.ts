import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const industry = searchParams.get('industry')
    const featured = searchParams.get('featured') === 'true'

    let whereClause = 'WHERE is_active = true'
    let params: any[] = []
    let paramCount = 0

    if (industry && industry !== 'All') {
      paramCount++
      whereClause += ` AND industry = $${paramCount}`
      params.push(industry)
    }

    if (featured) {
      paramCount++
      whereClause += ` AND is_featured = $${paramCount}`
      params.push(true)
    }

    const result = await query(`
      SELECT 
        id, title, before_value, after_value, improvement, description, 
        image_url, is_featured, order_index, is_active,
        created_at, updated_at
      FROM case_studies 
      ${whereClause}
      ORDER BY is_featured DESC, order_index ASC, created_at DESC
    `, params)

    return NextResponse.json({
      success: true,
      data: result.rows
    })
  } catch (error) {
    console.error('Error fetching case studies:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      title,
      before_value,
      after_value,
      improvement,
      description,
      image_url,
      is_featured,
      order_index
    } = await request.json()

    const result = await query(`
      INSERT INTO case_studies (
        title, before_value, after_value, improvement, description, 
        image_url, is_featured, order_index
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `, [
      title, before_value, after_value, improvement, description,
      image_url, is_featured, order_index
    ])

    return NextResponse.json(result.rows[0], { status: 201 })
  } catch (error) {
    console.error('Error creating case study:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
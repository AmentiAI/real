import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const industry = searchParams.get('industry')
    const limit = parseInt(searchParams.get('limit') || '10')

    let whereClause = 'WHERE is_active = true'
    let params: any[] = []
    let paramCount = 0

    if (industry && industry !== 'All') {
      paramCount++
      whereClause += ` AND industry = $${paramCount}`
      params.push(industry)
    }

    const result = await query(`
      SELECT 
        id, name, company, role, industry, image, rating, content, 
        results, is_featured, created_at, updated_at
      FROM testimonials 
      ${whereClause}
      ORDER BY is_featured DESC, rating DESC, created_at DESC
      LIMIT $${paramCount + 1}
    `, [...params, limit])

    return NextResponse.json({
      success: true,
      data: result.rows
    })
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      name,
      company,
      role,
      industry,
      image,
      rating,
      content,
      results,
      is_featured
    } = await request.json()

    const result = await query(`
      INSERT INTO testimonials (
        name, company, role, industry, image, rating, content, results, is_featured
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `, [
      name, company, role, industry, image, rating, 
      content, JSON.stringify(results), is_featured
    ])

    return NextResponse.json(result.rows[0], { status: 201 })
  } catch (error) {
    console.error('Error creating testimonial:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

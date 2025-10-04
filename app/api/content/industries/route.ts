import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured') === 'true'

    let whereClause = 'WHERE is_active = true'
    let params: any[] = []

    if (featured) {
      whereClause += ' AND is_featured = $1'
      params.push(true)
    }

    const result = await query(`
      SELECT 
        id, name, description, icon, color, gradient, bg_gradient,
        stats, challenges, solutions, results, href, is_featured,
        created_at, updated_at
      FROM industries 
      ${whereClause}
      ORDER BY is_featured DESC, display_order ASC, created_at DESC
    `, params)

    return NextResponse.json({
      success: true,
      data: result.rows
    })
  } catch (error) {
    console.error('Error fetching industries:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      name,
      description,
      icon,
      color,
      gradient,
      bg_gradient,
      stats,
      challenges,
      solutions,
      results,
      href,
      is_featured,
      display_order
    } = await request.json()

    const result = await query(`
      INSERT INTO industries (
        name, description, icon, color, gradient, bg_gradient,
        stats, challenges, solutions, results, href, is_featured, display_order
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *
    `, [
      name, description, icon, color, gradient, bg_gradient,
      JSON.stringify(stats), JSON.stringify(challenges), 
      JSON.stringify(solutions), JSON.stringify(results), 
      href, is_featured, display_order
    ])

    return NextResponse.json(result.rows[0], { status: 201 })
  } catch (error) {
    console.error('Error creating industry:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

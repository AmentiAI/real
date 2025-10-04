import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const state = searchParams.get('state')
    const category = searchParams.get('category')
    const limit = searchParams.get('limit') || '50'

    let whereClause = 'WHERE is_active = true'
    const params: any[] = []
    let paramCount = 0

    if (state) {
      paramCount++
      whereClause += ` AND state = $${paramCount}`
      params.push(state)
    }

    if (category) {
      paramCount++
      whereClause += ` AND category = $${paramCount}`
      params.push(category)
    }

    const result = await query(
      `SELECT keyword, state, category FROM keywords ${whereClause} ORDER BY state, category, keyword LIMIT $${paramCount + 1}`,
      [...params, parseInt(limit)]
    )

    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('Error fetching keywords:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}



import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const location = searchParams.get('location') // 'header', 'footer', 'both', 'mobile', 'widget'

    if (!location) {
      return NextResponse.json({ error: 'Location parameter is required' }, { status: 400 })
    }

    // Fetch pages that should appear in the specified navigation location
    const result = await query(
      `SELECT id, title, slug, description, nav_location 
       FROM pages 
       WHERE published = true 
       AND (nav_location = $1 OR nav_location = 'both')
       ORDER BY created_at ASC`,
      [location]
    )

    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('Error fetching navigation pages:', error)
    return NextResponse.json({ error: 'Failed to fetch navigation pages' }, { status: 500 })
  }
}




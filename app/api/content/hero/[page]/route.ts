import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: { page: string } }
) {
  try {
    const result = await query(
      'SELECT * FROM hero_content WHERE page = $1 AND is_active = true',
      [params.page]
    )
    
    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Hero content not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error('Error fetching hero content:', error)
    return NextResponse.json(
      { error: 'Failed to fetch hero content' },
      { status: 500 }
    )
  }
}


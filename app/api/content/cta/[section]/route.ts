import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: { section: string } }
) {
  try {
    const result = await query(
      'SELECT * FROM cta_content WHERE section = $1 AND is_active = true',
      [params.section]
    )
    
    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'CTA content not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error('Error fetching CTA content:', error)
    return NextResponse.json(
      { error: 'Failed to fetch CTA content' },
      { status: 500 }
    )
  }
}


import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: { location: string } }
) {
  try {
    const result = await query(
      'SELECT * FROM location_content WHERE location = $1 AND is_active = true',
      [params.location]
    )
    
    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Location content not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error('Error fetching location content:', error)
    return NextResponse.json(
      { error: 'Failed to fetch location content' },
      { status: 500 }
    )
  }
}


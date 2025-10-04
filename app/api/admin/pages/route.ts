import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (id) {
      // Get single page
      const result = await query('SELECT * FROM pages WHERE id = $1', [id])
      return NextResponse.json(result.rows[0] || null)
    } else {
      // Get all pages
      const result = await query('SELECT * FROM pages ORDER BY created_at DESC')
      return NextResponse.json(result.rows)
    }
  } catch (error) {
    console.error('Error fetching pages:', error)
    return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      slug,
      description,
      content,
      featured_image,
      text_overlay,
      meta_title,
      meta_description,
      meta_keywords,
      nav_location,
      published
    } = body

    // Create new page with only basic fields
    const result = await query(
      `INSERT INTO pages 
       (title, slug, description, content, featured_image, text_overlay, meta_title, meta_description, meta_keywords, nav_location, published)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
      [title, slug, description, content, featured_image, text_overlay, meta_title, meta_description, meta_keywords, nav_location, published]
    )
    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error('Error saving page:', error)
    return NextResponse.json({ error: 'Failed to save page' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, published } = body

    const result = await query(
      'UPDATE pages SET published = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [published, id]
    )

    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error('Error updating page:', error)
    return NextResponse.json({ error: 'Failed to update page' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    await query('DELETE FROM pages WHERE id = $1', [id])
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting page:', error)
    return NextResponse.json({ error: 'Failed to delete page' }, { status: 500 })
  }
}



import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const result = await query('SELECT * FROM pages WHERE id = $1', [id])
    
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }

    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error('Error fetching page:', error)
    return NextResponse.json({ error: 'Failed to fetch page' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    console.log('PUT request for page ID:', id)
    
    const body = await request.json()
    console.log('Request body:', JSON.stringify(body, null, 2))
    
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
      published,
      canonical_url,
      og_title,
      og_description,
      og_image,
      schema_type,
      robots_index,
      robots_follow
    } = body

    // Get existing page data first to preserve fields not being updated
    const existingPage = await query('SELECT * FROM pages WHERE id = $1', [id])
    if (existingPage.rows.length === 0) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }

    const existing = existingPage.rows[0]

    const result = await query(
      `UPDATE pages SET 
       title = $1, slug = $2, description = $3, content = $4, 
       featured_image = $5, text_overlay = $6, meta_title = $7, meta_description = $8, 
       meta_keywords = $9, nav_location = $10, published = $11, 
       canonical_url = $12, og_title = $13, og_description = $14, og_image = $15,
       schema_type = $16, robots_index = $17, robots_follow = $18,
       updated_at = CURRENT_TIMESTAMP
       WHERE id = $19 RETURNING *`,
      [
        title || existing.title,
        slug || existing.slug,
        description || existing.description,
        content || existing.content,
        featured_image || existing.featured_image,
        text_overlay || existing.text_overlay,
        meta_title || existing.meta_title,
        meta_description || existing.meta_description,
        meta_keywords || existing.meta_keywords,
        nav_location || existing.nav_location,
        published !== undefined ? published : existing.published,
        canonical_url || existing.canonical_url,
        og_title || existing.og_title,
        og_description || existing.og_description,
        og_image || existing.og_image,
        schema_type || existing.schema_type,
        robots_index !== undefined ? robots_index : existing.robots_index,
        robots_follow !== undefined ? robots_follow : existing.robots_follow,
        id
      ]
    )

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }

    console.log('Update successful for page:', result.rows[0].title)
    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error('Error updating page:', error)
    return NextResponse.json({ 
      error: 'Failed to update page',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    const { published } = body

    const result = await query(
      'UPDATE pages SET published = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [published, id]
    )

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }

    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error('Error updating page:', error)
    return NextResponse.json({ error: 'Failed to update page' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const result = await query('DELETE FROM pages WHERE id = $1 RETURNING *', [id])
    
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting page:', error)
    return NextResponse.json({ error: 'Failed to delete page' }, { status: 500 })
  }
}

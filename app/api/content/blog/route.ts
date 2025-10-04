import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    let whereClause = 'WHERE is_published = true'
    let params: any[] = []
    let paramCount = 0

    if (category && category !== 'All') {
      paramCount++
      whereClause += ` AND category = $${paramCount}`
      params.push(category)
    }

    const result = await query(`
      SELECT 
        id, title, slug, excerpt, content, featured_image, author, 
        published_at, read_time, category, tags, views, shares, 
        is_featured, created_at, updated_at
      FROM blog_posts 
      ${whereClause}
      ORDER BY published_at DESC
      LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}
    `, [...params, limit, offset])

    return NextResponse.json({
      success: true,
      data: result.rows
    })
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      title,
      slug,
      excerpt,
      content,
      featured_image,
      author,
      read_time,
      category,
      tags,
      is_featured
    } = await request.json()

    const result = await query(`
      INSERT INTO blog_posts (
        title, slug, excerpt, content, featured_image, author, 
        read_time, category, tags, is_featured
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `, [
      title, slug, excerpt, content, featured_image, author,
      read_time, category, JSON.stringify(tags), is_featured
    ])

    return NextResponse.json(result.rows[0], { status: 201 })
  } catch (error) {
    console.error('Error creating blog post:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

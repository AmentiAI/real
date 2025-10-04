import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const published = searchParams.get('published') === 'true'
    const offset = (page - 1) * limit

    let whereClause = ''
    let params: any[] = []
    
    if (published) {
      whereClause = 'WHERE is_published = true'
    }

    // Get total count
    const countResult = await query(`SELECT COUNT(*) FROM blog_posts ${whereClause}`, params)
    const total = parseInt(countResult.rows[0].count)

    // Get posts
    const result = await query(
      `SELECT id, title, slug, excerpt, featured_image, is_published, published_at, created_at, updated_at 
       FROM blog_posts ${whereClause} 
       ORDER BY published_at DESC NULLS LAST, created_at DESC 
       LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
      [...params, limit, offset]
    )

    return NextResponse.json({
      posts: result.rows,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, slug, excerpt, content, featured_image, is_published } = await request.json()

    // Validate required fields
    if (!title || !slug || !content) {
      return NextResponse.json({ error: 'Title, slug, and content are required' }, { status: 400 })
    }

    // Check if slug already exists
    const existingPost = await query('SELECT id FROM blog_posts WHERE slug = $1', [slug])
    if (existingPost.rows.length > 0) {
      return NextResponse.json({ error: 'A post with this slug already exists' }, { status: 400 })
    }

    // Insert blog post
    const result = await query(
      `INSERT INTO blog_posts (title, slug, excerpt, content, featured_image, is_published, published_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        title,
        slug,
        excerpt || null,
        content,
        featured_image || null,
        is_published || false,
        is_published ? new Date() : null
      ]
    )

    return NextResponse.json(result.rows[0], { status: 201 })
  } catch (error) {
    console.error('Error creating blog post:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}








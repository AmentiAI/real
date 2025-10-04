import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page') || 'home'

    const result = await query(`
      SELECT * FROM hero_content 
      WHERE page = $1 AND is_active = true
      ORDER BY created_at DESC
      LIMIT 1
    `, [page])

    if (result.rows.length === 0) {
      // Return default content if none found
      return NextResponse.json({
        id: 1,
        page: page,
        trust_badge_text: 'Trusted by 150+ Businesses Nationwide',
        main_headline: 'Dominate Google Rankings with AI-Powered SEO',
        guarantee_text: '30-Day Money-Back Guarantee',
        supporting_text: 'Stop losing customers to competitors. Our proven AI system generates 400% more traffic, 98% first-page rankings, and millions in additional revenue for businesses like yours.',
        primary_button_text: 'Get Started Today',
        primary_button_link: '/checkout',
        secondary_button_text: 'Watch Demo',
        secondary_button_link: '/contact',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
    }

    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error('Error fetching hero content:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      page,
      trust_badge_text,
      main_headline,
      guarantee_text,
      supporting_text,
      primary_button_text,
      primary_button_link,
      secondary_button_text,
      secondary_button_link
    } = await request.json()

    const result = await query(`
      INSERT INTO hero_content (
        page, trust_badge_text, main_headline, guarantee_text, supporting_text,
        primary_button_text, primary_button_link, secondary_button_text, secondary_button_link
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `, [
      page, trust_badge_text, main_headline, guarantee_text, supporting_text,
      primary_button_text, primary_button_link, secondary_button_text, secondary_button_link
    ])

    return NextResponse.json(result.rows[0], { status: 201 })
  } catch (error) {
    console.error('Error creating hero content:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET() {
  try {

    const client = await pool.connect()
    
    try {
      const result = await client.query(`
        SELECT id, name, description, services_used, default_budget, 
               default_duration_days, milestones, is_active, created_at, updated_at
        FROM project_templates 
        WHERE is_active = true
        ORDER BY name
      `)

      return NextResponse.json(result.rows)
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error fetching project templates:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {

    const body = await request.json()
    const {
      name,
      description,
      services_used = [],
      default_budget = 0,
      default_duration_days = 30,
      milestones = [],
      is_active = true
    } = body

    if (!name || !description) {
      return NextResponse.json(
        { error: 'Name and description are required' },
        { status: 400 }
      )
    }

    const client = await pool.connect()
    
    try {
      const result = await client.query(
        `INSERT INTO project_templates (
          name, description, services_used, default_budget, 
          default_duration_days, milestones, is_active
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`,
        [
          name, description, JSON.stringify(services_used), default_budget,
          default_duration_days, JSON.stringify(milestones), is_active
        ]
      )

      return NextResponse.json({
        success: true,
        message: 'Project template created successfully',
        template: result.rows[0]
      }, { status: 201 })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error creating project template:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

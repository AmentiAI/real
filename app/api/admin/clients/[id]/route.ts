import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const clientId = params.id

    const client = await pool.connect()
    
    try {
      const result = await client.query(
        `SELECT id, name, email, phone, company, website, industry, location, status, 
                website_status, seo_status, billing_date, join_date, payment_method, created_at, updated_at
         FROM clients 
         WHERE id = $1`,
        [clientId]
      )

      if (result.rows.length === 0) {
        return NextResponse.json(
          { error: 'Client not found' },
          { status: 404 }
        )
      }

      return NextResponse.json(result.rows[0])
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error fetching client:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const clientId = params.id
    const body = await request.json()
    const { name, email, phone, company, website, industry, location, status } = body

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    const client = await pool.connect()
    
    try {
      const result = await client.query(
        `UPDATE clients 
         SET name = $1, email = $2, phone = $3, company = $4, website = $5, 
             industry = $6, location = $7, status = $8, updated_at = NOW()
         WHERE id = $9
         RETURNING *`,
        [name, email, phone || null, company || null, website || null, 
         industry || null, location || null, status || 'active', clientId]
      )

      if (result.rows.length === 0) {
        return NextResponse.json(
          { error: 'Client not found' },
          { status: 404 }
        )
      }

      return NextResponse.json({
        success: true,
        message: 'Client updated successfully',
        client: result.rows[0]
      })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error updating client:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const clientId = params.id

    const client = await pool.connect()
    
    try {
      const result = await client.query(
        'DELETE FROM clients WHERE id = $1',
        [clientId]
      )

      if (result.rowCount === 0) {
        return NextResponse.json(
          { error: 'Client not found' },
          { status: 404 }
        )
      }

      return NextResponse.json({
        success: true,
        message: 'Client deleted successfully'
      })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error deleting client:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}



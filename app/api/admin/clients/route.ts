import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || 'all'
    const industry = searchParams.get('industry') || 'all'
    const location = searchParams.get('location') || 'all'
    const sortBy = searchParams.get('sortBy') || 'created_at'
    const sortOrder = searchParams.get('sortOrder') || 'DESC'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = (page - 1) * limit

    const client = await pool.connect()
    
    try {
      // Build dynamic query
      let whereConditions = []
      let queryParams = []
      let paramCount = 0

      if (search) {
        paramCount++
        whereConditions.push(`(name ILIKE $${paramCount} OR company ILIKE $${paramCount} OR email ILIKE $${paramCount})`)
        queryParams.push(`%${search}%`)
      }

      if (status !== 'all') {
        paramCount++
        whereConditions.push(`status = $${paramCount}`)
        queryParams.push(status)
      }

      if (industry !== 'all') {
        paramCount++
        whereConditions.push(`industry = $${paramCount}`)
        queryParams.push(industry)
      }

      if (location !== 'all') {
        paramCount++
        whereConditions.push(`location ILIKE $${paramCount}`)
        queryParams.push(`%${location}%`)
      }

      const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : ''

      // Get total count
      const countQuery = `SELECT COUNT(*) FROM clients ${whereClause}`
      const countResult = await client.query(countQuery, queryParams)
      const totalCount = parseInt(countResult.rows[0].count)

      // Get clients with pagination
      const clientsQuery = `
        SELECT id, name, email, phone, company, website, industry, location, status, 
               website_status, seo_status, billing_date, join_date, payment_method, created_at, updated_at
        FROM clients 
        ${whereClause}
        ORDER BY ${sortBy} ${sortOrder}
        LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}
      `
      
      queryParams.push(limit, offset)
      const result = await client.query(clientsQuery, queryParams)
      
      return NextResponse.json({
        clients: result.rows,
        pagination: {
          page,
          limit,
          totalCount,
          totalPages: Math.ceil(totalCount / limit)
        }
      })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error fetching clients:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      name, email, phone, company, website, industry, location, status, password,
      website_status, seo_status, billing_date, join_date
    } = body

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      )
    }

    const client = await pool.connect()
    
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 12)

      const result = await client.query(
        `INSERT INTO clients (name, email, phone, company, website, industry, location, status, password, 
                             website_status, seo_status, billing_date, join_date)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
         RETURNING id`,
        [name, email, phone || null, company || null, website || null, industry || null, location || null, 
         status || 'active', hashedPassword, website_status || 'not_started', seo_status || 'not_started', 
         billing_date || null, join_date || new Date().toISOString().split('T')[0]]
      )

      const clientId = result.rows[0].id

      return NextResponse.json(
        { 
          success: true, 
          message: 'Client created successfully',
          id: clientId 
        },
        { status: 201 }
      )
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error creating client:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      id, name, email, phone, company, website, industry, location, status, password,
      website_status, seo_status, billing_date, join_date, payment_method
    } = body

    // Validate required fields
    if (!id || !name || !email) {
      return NextResponse.json(
        { error: 'ID, name and email are required' },
        { status: 400 }
      )
    }

    const client = await pool.connect()
    
    try {
      let query, params

      if (password && password.trim() !== '') {
        // Update with new password
        const hashedPassword = await bcrypt.hash(password, 12)
        query = `UPDATE clients 
                 SET name = $1, email = $2, phone = $3, company = $4, website = $5, 
                     industry = $6, location = $7, status = $8, password = $9, 
                     website_status = $10, seo_status = $11, billing_date = $12, join_date = $13, payment_method = $14, updated_at = NOW()
                 WHERE id = $15
                 RETURNING id`
        params = [name, email, phone || null, company || null, website || null, 
                 industry || null, location || null, status || 'active', hashedPassword,
                 website_status || 'not_started', seo_status || 'not_started', 
                 billing_date || null, join_date || null, payment_method || null, id]
      } else {
        // Update without changing password
        query = `UPDATE clients 
                 SET name = $1, email = $2, phone = $3, company = $4, website = $5, 
                     industry = $6, location = $7, status = $8, 
                     website_status = $9, seo_status = $10, billing_date = $11, join_date = $12, payment_method = $13, updated_at = NOW()
                 WHERE id = $14
                 RETURNING id`
        params = [name, email, phone || null, company || null, website || null, 
                 industry || null, location || null, status || 'active',
                 website_status || 'not_started', seo_status || 'not_started', 
                 billing_date || null, join_date || null, payment_method || null, id]
      }

      const result = await client.query(query, params)

      if (result.rows.length === 0) {
        return NextResponse.json(
          { error: 'Client not found' },
          { status: 404 }
        )
      }

      return NextResponse.json(
        { 
          success: true, 
          message: 'Client updated successfully',
          id: result.rows[0].id 
        }
      )
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

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const bulkIds = searchParams.get('bulkIds')

    if (!id && !bulkIds) {
      return NextResponse.json(
        { error: 'Client ID or bulk IDs are required' },
        { status: 400 }
      )
    }

    const client = await pool.connect()
    
    try {
      if (bulkIds) {
        // Bulk delete
        const ids = bulkIds.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id))
        
        if (ids.length === 0) {
          return NextResponse.json(
            { error: 'No valid IDs provided' },
            { status: 400 }
          )
        }

        const placeholders = ids.map((_, index) => `$${index + 1}`).join(',')
        const result = await client.query(
          `DELETE FROM clients WHERE id IN (${placeholders})`,
          ids
        )

        return NextResponse.json(
          { 
            success: true, 
            message: `${result.rowCount} clients deleted successfully` 
          }
        )
      } else {
        // Single delete
        const result = await client.query(
          'DELETE FROM clients WHERE id = $1',
          [id]
        )

        if (result.rowCount === 0) {
          return NextResponse.json(
            { error: 'Client not found' },
            { status: 404 }
          )
        }

        return NextResponse.json(
          { 
            success: true, 
            message: 'Client deleted successfully' 
          }
        )
      }
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


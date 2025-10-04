import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, clientIds, data } = body

    if (!action || !clientIds || !Array.isArray(clientIds) || clientIds.length === 0) {
      return NextResponse.json(
        { error: 'Action and client IDs are required' },
        { status: 400 }
      )
    }

    const client = await pool.connect()
    
    try {
      let result
      const placeholders = clientIds.map((_, index) => `$${index + 1}`).join(',')

      switch (action) {
        case 'updateStatus':
          if (!data?.status) {
            return NextResponse.json(
              { error: 'Status is required for updateStatus action' },
              { status: 400 }
            )
          }
          
          result = await client.query(
            `UPDATE clients 
             SET status = $${clientIds.length + 1}, updated_at = NOW()
             WHERE id IN (${placeholders})
             RETURNING id`,
            [...clientIds, data.status]
          )
          break

        case 'delete':
          result = await client.query(
            `DELETE FROM clients WHERE id IN (${placeholders})`,
            clientIds
          )
          break

        case 'export':
          result = await client.query(
            `SELECT id, name, email, phone, company, website, industry, location, status, payment_method, billing_date, created_at
             FROM clients 
             WHERE id IN (${placeholders})
             ORDER BY name`,
            clientIds
          )
          return NextResponse.json({
            success: true,
            data: result.rows,
            filename: `clients_export_${new Date().toISOString().split('T')[0]}.csv`
          })

        default:
          return NextResponse.json(
            { error: 'Invalid action' },
            { status: 400 }
          )
      }

      return NextResponse.json({
        success: true,
        message: `Bulk ${action} completed successfully`,
        affectedRows: result.rowCount || result.rows.length
      })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error performing bulk operation:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}



import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {

    const { id } = params

    // Delete service tiers first
    await query('DELETE FROM service_tiers WHERE service_id = $1', [id])
    
    // Delete service
    await query('DELETE FROM services WHERE id = $1', [id])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting service:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


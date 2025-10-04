import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'
import { verifyClientToken } from '@/lib/client-auth'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const clientPayload = verifyClientToken(request)
    if (!clientPayload) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { currentPassword, newPassword } = await request.json()

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Current password and new password are required' },
        { status: 400 }
      )
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: 'New password must be at least 6 characters long' },
        { status: 400 }
      )
    }

    const dbClient = await pool.connect()
    
    try {
      // Get current password hash
      const result = await dbClient.query(
        'SELECT password FROM clients WHERE id = $1',
        [clientPayload.clientId]
      )

      if (result.rows.length === 0) {
        return NextResponse.json(
          { error: 'Client not found' },
          { status: 404 }
        )
      }

      // Verify current password
      const isValidPassword = await bcrypt.compare(currentPassword, result.rows[0].password)
      if (!isValidPassword) {
        return NextResponse.json(
          { error: 'Current password is incorrect' },
          { status: 400 }
        )
      }

      // Hash new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 12)

      // Update password
      await dbClient.query(
        'UPDATE clients SET password = $1, updated_at = NOW() WHERE id = $2',
        [hashedNewPassword, clientPayload.clientId]
      )

      return NextResponse.json({
        success: true,
        message: 'Password changed successfully'
      })
    } finally {
      dbClient.release()
    }
  } catch (error) {
    console.error('Error changing password:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

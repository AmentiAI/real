import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const client = await pool.connect()
    
    try {
      // Find client by email
      const result = await client.query(
        'SELECT id, name, email, password, company, status, created_at FROM clients WHERE email = $1',
        [email]
      )

      if (result.rows.length === 0) {
        return NextResponse.json(
          { error: 'Invalid email or password' },
          { status: 401 }
        )
      }

      const clientData = result.rows[0]

      // Check if client is active
      if (clientData.status !== 'active') {
        return NextResponse.json(
          { error: 'Account is not active. Please contact support.' },
          { status: 401 }
        )
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, clientData.password)
      if (!isValidPassword) {
        return NextResponse.json(
          { error: 'Invalid email or password' },
          { status: 401 }
        )
      }

      // Generate JWT token
      const token = jwt.sign(
        { 
          clientId: clientData.id,
          email: clientData.email,
          type: 'client'
        },
        process.env.JWT_SECRET || 'fallback-secret',
        { expiresIn: '7d' }
      )

      // Return client data (without password)
      const { password: _, ...clientWithoutPassword } = clientData

      return NextResponse.json({
        token,
        client: clientWithoutPassword
      })

    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Client login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

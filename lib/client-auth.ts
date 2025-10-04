import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'

export interface ClientTokenPayload {
  clientId: number
  email: string
  type: 'client'
}

export function verifyClientToken(request: NextRequest): ClientTokenPayload | null {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null
    }

    const token = authHeader.substring(7)
    const payload = jwt.verify(
      token, 
      process.env.JWT_SECRET || 'fallback-secret'
    ) as ClientTokenPayload

    if (payload.type !== 'client') {
      return null
    }

    return payload
  } catch (error) {
    console.error('Token verification error:', error)
    return null
  }
}

export function getClientFromToken(token: string): ClientTokenPayload | null {
  try {
    const payload = jwt.verify(
      token, 
      process.env.JWT_SECRET || 'fallback-secret'
    ) as ClientTokenPayload

    if (payload.type !== 'client') {
      return null
    }

    return payload
  } catch (error) {
    console.error('Token verification error:', error)
    return null
  }
}

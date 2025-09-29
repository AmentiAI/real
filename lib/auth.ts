import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import pool from './db'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const client = await pool.connect()
          
          try {
            const result = await client.query(
              'SELECT * FROM users WHERE email = $1',
              [credentials.email]
            )

            if (result.rows.length === 0) {
              return null
            }

            const user = result.rows[0]
            const isValidPassword = await bcrypt.compare(credentials.password, user.password)

            if (!isValidPassword) {
              return null
            }

            return {
              id: user.id.toString(),
              email: user.email,
              name: user.name,
              role: user.role
            }
          } finally {
            client.release()
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/admin/login'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub
        session.user.role = token.role
      }
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development'
}

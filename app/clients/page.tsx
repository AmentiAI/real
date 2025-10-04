'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ClientPage() {
  const router = useRouter()

  useEffect(() => {
    // Check if client is already logged in
    const token = localStorage.getItem('clientToken')
    
    if (token) {
      // Redirect to dashboard if already logged in
      router.push('/clients/dashboard')
    } else {
      // Redirect to login if not logged in
      router.push('/clients/login')
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting...</p>
      </div>
    </div>
  )
}

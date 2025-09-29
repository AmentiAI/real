'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function PricingPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to checkout page
    router.push('/checkout')
  }, [router])

  return (
    <div className="min-h-screen bg-white pt-24 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Redirecting to Checkout...</h1>
        <p className="text-gray-600">Please wait while we redirect you to our checkout page.</p>
      </div>
    </div>
  )
}
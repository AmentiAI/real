'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CheckCircle, ArrowRight, Star, Zap } from 'lucide-react'

interface Package {
  id: number
  name: string
  price: string
  currency: string
  billing_period: string
  features: string[]
  is_popular: boolean
  service_name: string
}

export default function PricingPreview() {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch('/api/packages')
        const data = await response.json()
        
        if (data.success && data.data) {
          // Group packages by service and take the most popular from each
          const groupedPackages = data.data.reduce((acc: Record<string, Package>, pkg: any) => {
            const serviceName = pkg.service_name || 'Service'
            if (!acc[serviceName] || pkg.is_popular) {
              acc[serviceName] = {
                id: pkg.package_id,
                name: pkg.name,
                price: pkg.price,
                currency: pkg.currency,
                billing_period: pkg.billing_period,
                features: pkg.features || [],
                is_popular: pkg.is_popular,
                service_name: serviceName
              }
            }
            return acc
          }, {})

          setPackages(Object.values(groupedPackages).slice(0, 3)) // Show top 3 packages
        }
      } catch (error) {
        console.error('Error fetching packages:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPackages()
  }, [])

  const formatPrice = (price: string, currency: string, period: string) => {
    const formattedPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(parseFloat(price))
    
    if (period === 'one-time') {
      return formattedPrice
    }
    return `${formattedPrice}/${period}`
  }

  if (loading) {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading pricing...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4 mr-2" />
            Transparent Pricing
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Choose Your Growth Package
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            No hidden fees, no long-term contracts. Select the package that fits your business needs and start seeing results immediately.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              className={`relative bg-white rounded-3xl p-8 shadow-xl border-2 transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                pkg.is_popular 
                  ? 'border-blue-500 ring-4 ring-blue-500/20' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              {pkg.is_popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                <p className="text-gray-600 mb-4">{pkg.service_name}</p>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {formatPrice(pkg.price, pkg.currency, pkg.billing_period)}
                </div>
                <p className="text-gray-500">
                  {pkg.billing_period === 'one-time' ? 'One-time payment' : `Per ${pkg.billing_period}`}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {pkg.features.slice(0, 5).map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
                {pkg.features.length > 5 && (
                  <li className="text-sm text-gray-500">
                    +{pkg.features.length - 5} more features
                  </li>
                )}
              </ul>

              <Link
                href="/pricing"
                className={`w-full py-4 px-6 rounded-xl font-semibold text-center transition-all duration-300 ${
                  pkg.is_popular
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                }`}
              >
                Get Started
                <ArrowRight className="inline-block ml-2 w-5 h-5" />
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Zap className="w-8 h-8 text-blue-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">Need a Custom Solution?</h3>
            </div>
            <p className="text-gray-600 mb-6 text-lg">
              Every business is unique. Let us create a custom package tailored specifically to your goals and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Get Custom Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
              >
                View All Packages
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

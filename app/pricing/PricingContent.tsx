'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, Star, Phone, ArrowRight, Search, Monitor, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { useBranding } from '@/components/BrandingProvider'

interface PricingTier {
  id: number
  name: string
  description: string
  price: number
  currency: string
  billing_period: string
  features: string[]
  is_popular: boolean
  is_active: boolean
  display_order: number
}

interface Product {
  id: number
  name: string
  description: string
  icon: any
  color: string
  gradient: string
  textGradient: string
  badgeColor: string
  bgGradient: string
  hoverColor: string
  tiers: PricingTier[]
}

const productConfigs = {
  'SEO Services': {
    icon: Search,
    color: 'blue',
    gradient: 'from-blue-500 to-blue-600',
    textGradient: 'from-slate-900 via-blue-900 to-indigo-900',
    badgeColor: 'border-blue-200/50 text-blue-700',
    bgGradient: 'from-blue-500/10 to-purple-500/10',
    hoverColor: 'group-hover:text-blue-600'
  },
  'Website Design': {
    icon: Monitor,
    color: 'green',
    gradient: 'from-green-500 to-green-600',
    textGradient: 'from-slate-900 via-green-900 to-blue-900',
    badgeColor: 'border-green-200/50 text-green-700',
    bgGradient: 'from-green-500/10 to-blue-500/10',
    hoverColor: 'group-hover:text-green-600'
  },
  'Complete Growth Packages': {
    icon: TrendingUp,
    color: 'purple',
    gradient: 'from-purple-500 to-purple-600',
    textGradient: 'from-slate-900 via-purple-900 to-pink-900',
    badgeColor: 'border-purple-200/50 text-purple-700',
    bgGradient: 'from-purple-500/10 to-pink-500/10',
    hoverColor: 'group-hover:text-purple-600'
  }
}

export default function PricingContent() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { branding } = useBranding()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/packages')
      const data = await response.json()
      
      if (data.success && data.data && data.data.length > 0) {
        // Group packages by service
        const groupedProducts = data.data.reduce((acc: Record<string, Product>, pkg: any) => {
          // Skip if no package_id (service without tiers)
          if (!pkg.package_id) return acc
          
          const productName = pkg.service_name || 'Service'
          
          if (!acc[productName]) {
            const config = productConfigs[productName as keyof typeof productConfigs] || productConfigs['Complete Growth Packages']
            acc[productName] = {
              id: Object.keys(acc).length + 1,
              name: productName,
              description: pkg.service_description || `Professional ${productName.toLowerCase()} that deliver measurable results`,
              icon: pkg.service_icon || config.icon,
              color: config.color,
              gradient: config.gradient,
              textGradient: config.textGradient,
              badgeColor: config.badgeColor,
              bgGradient: config.bgGradient,
              hoverColor: config.hoverColor,
              tiers: []
            }
          }
          
          // Add package tier
          acc[productName].tiers.push({
            id: pkg.package_id,
            name: pkg.name,
            description: pkg.description,
            price: pkg.price,
            currency: pkg.currency,
            billing_period: pkg.billing_period,
            features: pkg.features || [],
            is_popular: pkg.is_popular,
            is_active: pkg.is_active,
            display_order: pkg.display_order
          })
          
          return acc
        }, {})
        
        // Convert to array and sort tiers within each product
        const productsArray = Object.values(groupedProducts).map(product => ({
          ...product,
          tiers: product.tiers.sort((a, b) => a.display_order - b.display_order)
        }))
        
        setProducts(productsArray)
      } else {
        setProducts([])
      }
    } catch (err) {
      console.error('Error fetching products:', err)
      setError('Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price: number, currency: string, period: string) => {
    const formattedPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
    
    if (period === 'one-time') {
      return formattedPrice
    }
    return `${formattedPrice}/${period}`
  }

  if (loading) {
    return (
      <div className="py-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
          <p className="text-slate-600 text-lg">Loading pricing information...</p>
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="py-24 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">No Packages Available</h2>
          <p className="text-slate-600 mb-6">
            No packages have been configured yet. Please contact us to set up your custom packages.
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <div className="text-white text-2xl">!</div>
          </div>
          <p className="text-red-600 text-lg">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="text-center">
            {/* Pricing Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm font-medium mb-8">
              <Star className="w-5 h-5 mr-2" />
              Choose Your Product & Pricing
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Simple, Transparent{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Pricing
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-12">
              Choose your product and the perfect pricing tier for your business needs. All products include our proven strategies and dedicated support.
            </p>
          </div>
        </div>
      </section>

      {/* Products and Pricing */}
      {products.map((product, productIndex) => {
        const IconComponent = product.icon
        const isEven = productIndex % 2 === 0
        
        return (
          <section key={product.id} className={`py-24 relative overflow-hidden ${isEven ? '' : 'bg-slate-50'}`}>
            {/* Background Elements */}
            <div className="absolute inset-0">
              <div className={`absolute top-20 ${isEven ? 'right-20' : 'left-20'} w-96 h-96 bg-gradient-to-r ${product.bgGradient} rounded-full blur-3xl`}></div>
              <div className={`absolute bottom-20 ${isEven ? 'left-20' : 'right-20'} w-80 h-80 bg-gradient-to-r ${product.bgGradient} rounded-full blur-3xl`}></div>
            </div>
            
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
              {/* Product Header */}
              <div className="text-center mb-16">
                <div className={`inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm border ${product.badgeColor} text-sm font-medium mb-8 shadow-lg`}>
                  <IconComponent className="w-5 h-5 mr-2 animate-pulse" />
                  {product.name}
                </div>
                <h2 className={`text-5xl lg:text-6xl font-bold bg-gradient-to-r ${product.textGradient} bg-clip-text text-transparent mb-8`}>
                  {product.name}
                </h2>
                <p className="text-xl lg:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Product Overview Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/50 mb-16">
                <div className="text-center">
                  <div className={`w-20 h-20 bg-gradient-to-br ${product.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-4xl font-bold text-slate-900 mb-4">{product.name}</h3>
                  <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
                    {product.description}
                  </p>
                  
                  {/* Product Features */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {product.tiers[0]?.features.slice(0, 6).map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-slate-600 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pricing Tiers */}
              <div className="grid md:grid-cols-3 gap-8">
                {product.tiers.map((tier, index) => (
                  <div key={tier.id} className={`group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 transform border ${tier.is_popular ? 'border-2 border-blue-500/50 relative' : 'border-white/50'}`}>
                    {tier.is_popular && (
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                        <div className="relative">
                          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-sm"></div>
                          <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center">
                            <Star className="w-4 h-4 mr-1" />
                            Most Popular
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="text-center mb-6">
                      <h3 className={`text-2xl font-bold text-slate-900 mb-2 ${product.hoverColor} transition-colors duration-300`}>
                        {tier.name}
                      </h3>
                      <p className="text-slate-600 mb-6 group-hover:text-slate-700 transition-colors duration-300">
                        {tier.description}
                      </p>
                    </div>
                    
                    <div className="text-center mb-8">
                      <span className={`text-5xl font-bold bg-gradient-to-r ${product.gradient} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
                        {formatPrice(tier.price, tier.currency, tier.billing_period)}
                      </span>
                    </div>
                    
                    <Link 
                      href="/checkout" 
                      className={`group/btn w-full block bg-gradient-to-r ${tier.is_popular ? 'from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl hover:shadow-blue-500/25' : 'from-slate-100 to-slate-200 text-slate-900 hover:from-blue-50 hover:to-purple-50 hover:text-blue-600'} font-bold px-8 py-4 rounded-2xl transition-all duration-300 text-center relative overflow-hidden`}
                    >
                      <span className="relative z-10">
                        {tier.is_popular ? 'Most Popular' : 'Get Started'}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 scale-0 group-hover/btn:scale-100 transition-transform duration-300"></div>
                    </Link>
                    
                    <div className="mt-8 space-y-4">
                      {tier.features.slice(0, 6).map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start group-hover:text-slate-700 transition-colors duration-300">
                          <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 group-hover:bg-green-200 transition-colors duration-300">
                            <CheckCircle className="w-3 h-3 text-green-600" />
                          </div>
                          <span className="text-slate-600 text-sm">{feature}</span>
                        </div>
                      ))}
                      {tier.features.length > 6 && (
                        <div className="text-slate-500 text-sm">
                          +{tier.features.length - 6} more features
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      })}

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative">
          <h2 className="text-5xl font-bold text-white mb-8">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
            Contact us today for a free consultation and custom quote tailored to your business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center px-10 py-5 bg-white text-blue-600 font-bold rounded-2xl hover:bg-blue-50 transition-all duration-300 shadow-2xl hover:shadow-white/25 hover:scale-105 transform"
            >
              Get Free Consultation
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <a
              href={`tel:${branding.contact_phone}`}
              className="group inline-flex items-center justify-center px-10 py-5 bg-white/10 backdrop-blur-md text-white font-bold rounded-2xl border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:scale-105 transform"
            >
              <Phone className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
              Call {branding.contact_phone}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
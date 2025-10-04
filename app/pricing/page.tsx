import { Metadata } from 'next'
import { CheckCircle, Star, Phone, ArrowRight, Search, Monitor, TrendingUp, Target, Globe, BarChart3 } from 'lucide-react'
import Link from 'next/link'
import PricingContent from './PricingContent'

export const metadata: Metadata = {
  title: 'Pricing - Amenti AI Digital Marketing Services | Rhode Island',
  description: 'Transparent pricing for professional digital marketing services. Choose from our SEO, web design, and complete growth packages.',
  keywords: 'digital marketing pricing, SEO pricing, web design cost, Rhode Island marketing rates',
  alternates: {
    canonical: 'https://amentiai.com/pricing',
  },
  openGraph: {
    title: 'Pricing - Amenti AI Digital Marketing Services | Rhode Island',
    description: 'Transparent pricing for professional digital marketing services. Choose from our SEO, web design, and complete growth packages.',
    url: 'https://amentiai.com/pricing',
    siteName: 'Amenti AI',
    images: [
      {
        url: 'https://amentiai.com/images/pricing-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Amenti AI Digital Marketing Pricing',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing - Amenti AI Digital Marketing Services | Rhode Island',
    description: 'Transparent pricing for professional digital marketing services. Choose from our SEO, web design, and complete growth packages.',
    images: ['https://amentiai.com/images/pricing-og.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Enhanced Hero Section */}
      <section className="relative pt-24 pb-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm font-medium mb-8">
            <Star className="w-5 h-5 mr-2 animate-pulse" />
            Transparent Pricing
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            Transparent Pricing for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Real Results
            </span>
          </h1>
          <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-12">
            No hidden fees, no long-term contracts. Choose the plan that fits your business needs 
            and start seeing results with our AI-powered strategies.
          </p>
        </div>
      </section>

      <PricingContent />
    </main>
  )
}
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Star, TrendingUp, Users, Award, Shield, Zap, Sparkles, Rocket, Target, Play, DollarSign } from 'lucide-react'
import { useBranding } from './BrandingProvider'

interface HeroContent {
  id: number
  page: string
  trust_badge_text: string
  main_headline: string
  guarantee_text: string
  supporting_text: string
  primary_button_text: string
  primary_button_link: string
  secondary_button_text: string
  secondary_button_link: string
}

export default function Hero() {
  const { branding } = useBranding()
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        const response = await fetch('/api/content/hero/home')
        if (response.ok) {
          const data = await response.json()
          setHeroContent(data)
        }
      } catch (error) {
        console.error('Error fetching hero content:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchHeroContent()
  }, [])

  if (loading) {
    return (
      <section className="relative min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading...</p>
          </div>
        </div>
      </section>
    )
  }

  if (!heroContent) {
    return (
      <section className="relative min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center py-20">
            <p className="text-red-500">Failed to load hero content.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative">
        {/* Trust Badge */}
        <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm font-medium mb-8 animate-fade-in-up">
          <Star className="w-5 h-5 mr-2 animate-pulse" />
          {heroContent.trust_badge_text}
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {heroContent.main_headline || 'Dominate Google Rankings in Rhode Island with AI-Powered SEO'}
        </h1>

        {/* Supporting Text */}
        <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          {heroContent.supporting_text || 'Stop losing customers to competitors. Our proven AI system helps Rhode Island businesses generate 400% more traffic, 98% first-page rankings, and millions in additional revenue. Providence-based experts serving all of RI.'}
        </p>

        {/* Key Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20">
            <TrendingUp className="w-6 h-6 text-green-400" />
            <span className="text-white font-semibold">400% Traffic Growth</span>
          </div>
          <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20">
            <Award className="w-6 h-6 text-yellow-400" />
            <span className="text-white font-semibold">98% First Page Rankings</span>
          </div>
          <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20">
            <DollarSign className="w-6 h-6 text-green-400" />
            <span className="text-white font-semibold">$50M+ Revenue Generated</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <Link 
            href={heroContent.primary_button_link} 
            className="group inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transform"
          >
            {heroContent.primary_button_text}
            <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
          <Link 
            href={heroContent.secondary_button_link} 
            className="group inline-flex items-center justify-center px-10 py-5 bg-white/10 backdrop-blur-md text-white font-bold rounded-2xl border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:scale-105 transform"
          >
            <Play className="w-5 h-5 mr-3" />
            {heroContent.secondary_button_text}
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-blue-200 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-sm font-medium">30-Day Money-Back Guarantee</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium">150+ Successful Clients</span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-medium">AI-Powered Results</span>
          </div>
        </div>
      </div>
    </section>
  )
}
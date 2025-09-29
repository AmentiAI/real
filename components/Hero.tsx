'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle, Star, TrendingUp, Users, Award } from 'lucide-react'

export default function Hero() {
  return (
    <>
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pt-32">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              {/* Main Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-slide-up">
                Get 3-10 New Leads Per Month in 90 Days
              </h1>
              
              {/* Gradient Guarantee */}
              <div className="text-3xl md:text-4xl font-bold mb-8 animate-slide-up delay-200">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  — Or We Work Free Next Month
                </span>
              </div>

              {/* Supporting Text */}
              <p className="text-lg md:text-xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed animate-slide-up delay-300">
                Average +247% organic leads in 12 weeks across Rhode Island service businesses. We guarantee results or we work for free.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up delay-400">
                <Link 
                  href="/contact" 
                  className="group relative px-8 py-4 bg-blue-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 hover:bg-blue-500"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Book a 15-Min Strategy Call
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
                  </span>
                </Link>
                <Link 
                  href="/case-studies" 
                  className="px-8 py-4 bg-white text-gray-900 font-bold text-lg rounded-2xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 flex items-center justify-center"
                >
                  <div className="w-4 h-4 mr-2 border-l-4 border-b-4 border-gray-900 transform rotate-[-45deg]"></div>
                  View Case Studies
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-slide-up delay-500">
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">150+</div>
                  <div className="text-blue-200 font-medium">Projects Completed</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">98%</div>
                  <div className="text-blue-200 font-medium">Client Satisfaction</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">24/7</div>
                  <div className="text-blue-200 font-medium">Support Available</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">5+</div>
                  <div className="text-blue-200 font-medium">Years Experience</div>
                </div>
              </div>
            </div>

            {/* Right Content - SEO Performance Dashboard */}
            <div className="hidden lg:block">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20 animate-slide-up delay-500">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">SEO Performance Dashboard</h3>
                  <p className="text-sm text-gray-600">Real-time analytics</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Organic Traffic</span>
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">+247%</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Google Rankings</span>
                      <Award className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">#1-3</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '90%'}}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Lead Generation</span>
                      <Users className="w-4 h-4 text-purple-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">+89%</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{width: '75%'}}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Revenue Growth</span>
                      <TrendingUp className="w-4 h-4 text-orange-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">$2.4M</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{width: '80%'}}></div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-100 to-green-100 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Overall SEO Score</span>
                    <span className="text-2xl font-bold text-gray-900">94/100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-purple-500 to-green-500 h-3 rounded-full" style={{width: '94%'}}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 mt-1">
                    <span>Poor</span>
                    <span>Excellent</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-4 h-4 bg-blue-400 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute top-40 right-20 w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-2000"></div>
          <div className="absolute bottom-40 left-20 w-5 h-5 bg-cyan-400 rounded-full animate-bounce delay-3000"></div>
          <div className="absolute bottom-20 right-10 w-2 h-2 bg-yellow-400 rounded-full animate-bounce delay-4000"></div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-4 bg-blue-600">
        <div className="container-custom">
          <div className="flex items-center justify-center">
            <Star className="w-5 h-5 text-yellow-400 mr-2" />
            <span className="text-white font-medium">Trusted by 150+ Rhode Island Businesses</span>
          </div>
        </div>
      </section>
    </>
  )
}
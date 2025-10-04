'use client'

import { ExternalLink, TrendingUp, Users, MapPin, ArrowRight, Rocket } from 'lucide-react'
import Link from 'next/link'

const portfolioItems = [
  {
    id: 1,
    title: 'Providence Roofing Company',
    category: 'Construction',
    description: 'From struggling local contractor to #1 Google ranking in 6 months',
    results: {
      traffic: '+1,250%',
      leads: '+890%',
      revenue: '+$2.3M'
    },
    services: ['AI-Powered SEO', 'Website Redesign', 'Google Ads'],
    link: '/case-studies/providence-roofing',
    location: 'Providence, RI'
  },
  {
    id: 2,
    title: 'Newport Law Firm',
    category: 'Legal Services',
    description: 'Personal injury law firm dominates first page for all major keywords',
    results: {
      traffic: '+1,100%',
      leads: '+750%',
      revenue: '+$4.1M'
    },
    services: ['Content Marketing', 'Local SEO', 'AI SEO'],
    link: '/case-studies/newport-law-firm',
    location: 'Newport, RI'
  },
  {
    id: 3,
    title: 'Warwick Restaurant',
    category: 'Food & Beverage',
    description: 'Local restaurant becomes the go-to destination in Warwick',
    results: {
      traffic: '+1,800%',
      leads: '+650%',
      revenue: '+$1.8M'
    },
    services: ['Local SEO', 'Social Media', 'Google Business'],
    link: '/case-studies/warwick-restaurant',
    location: 'Warwick, RI'
  }
]

export default function Portfolio() {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Enhanced Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm font-medium mb-8">
            <TrendingUp className="w-5 h-5 mr-2 animate-pulse" />
            Real Results from Real Clients
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-8">
            Success Stories That Speak Volumes
          </h2>
          <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            See how we've helped businesses across Rhode Island and the USA achieve remarkable growth with our proven AI-powered strategies.
          </p>
        </div>

        {/* Enhanced Portfolio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {portfolioItems.map((item, index) => (
            <div
              key={item.id}
              className="group bg-white/10 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 hover:-translate-y-2 hover:scale-105 transform overflow-hidden border border-white/20"
              style={{animationDelay: `${index * 0.2}s`}}
            >
              <div className="p-8">
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      {item.category}
                    </span>
                    <div className="flex items-center text-blue-200 text-sm font-medium">
                      <MapPin className="w-4 h-4 mr-2" />
                      {item.location}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-200 transition-colors duration-300">{item.title}</h3>
                  <p className="text-blue-100 leading-relaxed group-hover:text-white transition-colors duration-300">{item.description}</p>
                </div>

                {/* Results */}
                <div className="mb-8">
                  <h4 className="font-bold text-white mb-4 text-lg">Results Achieved:</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/10 group-hover:bg-white/10 transition-all duration-300">
                      <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-1 group-hover:scale-110 transition-transform duration-300">{item.results.traffic}</div>
                      <div className="text-xs text-blue-200 font-medium">Traffic Growth</div>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/10 group-hover:bg-white/10 transition-all duration-300">
                      <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-1 group-hover:scale-110 transition-transform duration-300">{item.results.leads}</div>
                      <div className="text-xs text-blue-200 font-medium">Lead Increase</div>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/10 group-hover:bg-white/10 transition-all duration-300">
                      <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1 group-hover:scale-110 transition-transform duration-300">{item.results.revenue}</div>
                      <div className="text-xs text-blue-200 font-medium">Revenue Growth</div>
                    </div>
                  </div>
                </div>

                {/* Services */}
                <div className="mb-8">
                  <h4 className="font-bold text-white mb-4 text-lg">Services Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {item.services.map((service, serviceIndex) => (
                      <span
                        key={serviceIndex}
                        className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20 group-hover:bg-white/20 transition-all duration-300"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Enhanced CTA */}
                <Link
                  href={item.link}
                  className="group/btn w-full inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 relative overflow-hidden"
                >
                  <span className="relative z-10">View Case Study</span>
                  <ArrowRight className="ml-3 h-5 w-5 relative z-10 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 scale-0 group-hover/btn:scale-100 transition-transform duration-300"></div>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center">
          <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-16 shadow-2xl border border-white/20 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
              <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-xl"></div>
            </div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm font-medium mb-8">
                <Users className="w-5 h-5 mr-2 animate-pulse" />
                Ready to See Similar Results?
              </div>
              <h3 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Your Success Story Starts Here
              </h3>
              <p className="text-xl lg:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
                Join our portfolio of successful clients and start generating the growth your business deserves with our proven AI-powered strategies.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="/case-studies"
                  className="group inline-flex items-center justify-center px-10 py-5 bg-white text-blue-600 font-bold rounded-2xl hover:bg-blue-50 transition-all duration-300 shadow-2xl hover:shadow-white/25 hover:scale-105 transform"
                >
                  View All Case Studies
                  <ExternalLink className="ml-3 h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
                </Link>
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center px-10 py-5 bg-white/10 backdrop-blur-md text-white font-bold rounded-2xl border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:scale-105 transform"
                >
                  Start Your Success Story
                  <Rocket className="ml-3 h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
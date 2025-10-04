'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, TrendingUp, Users, Award, Target, CheckCircle, Star, BarChart3, Calendar, Tag, ExternalLink } from 'lucide-react'

interface CaseStudy {
  id: number
  title: string
  before_value?: string
  after_value?: string
  improvement?: string
  description?: string
  image_url?: string
  is_featured?: boolean
  order_index?: number
  is_active?: boolean
  created_at: string
  updated_at: string
}

const industries = ['All', 'Construction', 'Legal Services', 'Healthcare', 'Technology', 'Retail', 'Manufacturing', 'Professional Services']

export default function CaseStudiesContent() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
  const [featuredStudies, setFeaturedStudies] = useState<CaseStudy[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedIndustry, setSelectedIndustry] = useState('All')

  useEffect(() => {
    fetchCaseStudies()
  }, [selectedIndustry])

  const fetchCaseStudies = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (selectedIndustry !== 'All') {
        params.append('industry', selectedIndustry)
      }
      
      const response = await fetch(`/api/content/case-studies?${params.toString()}`)
      const data = await response.json()
      
      if (data.success && data.data) {
        const allStudies = data.data
        setFeaturedStudies(allStudies.filter((study: CaseStudy) => study.is_featured))
        setCaseStudies(allStudies.filter((study: CaseStudy) => !study.is_featured))
      }
    } catch (error) {
      console.error('Error fetching case studies:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <section className="relative pt-24 pb-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto"></div>
            <p className="mt-2 text-blue-200">Loading case studies...</p>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
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
            <Award className="w-5 h-5 mr-2 animate-pulse" />
            Success Stories
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            Real Results from{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Real Businesses
            </span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-12">
            See how we've helped businesses across Rhode Island and beyond achieve unprecedented growth with our proven digital marketing strategies.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">150+</div>
              <div className="text-blue-200">Successful Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">400%</div>
              <div className="text-blue-200">Average Growth</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">98%</div>
              <div className="text-blue-200">First Page Rankings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">$50M+</div>
              <div className="text-blue-200">Revenue Generated</div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Filter */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {industries.map((industry, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndustry(industry)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedIndustry === industry
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                }`}
              >
                {industry}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Case Studies */}
      {featuredStudies.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Featured Success Stories</h2>
              <p className="text-xl text-gray-600">Our most impressive client transformations</p>
            </div>

            <div className="space-y-16">
              {featuredStudies.map((study, index) => (
                <div key={study.id} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                  <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                      <Tag className="w-4 h-4 mr-2" />
                      Featured Case Study
                    </div>
                    
                    <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                      {study.title}
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-6 mb-8">
                      {study.before_value && (
                        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-4 border border-red-100">
                          <div className="text-2xl font-bold text-red-600 mb-1">Before</div>
                          <div className="text-sm text-gray-600">{study.before_value}</div>
                        </div>
                      )}
                      {study.after_value && (
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                          <div className="text-2xl font-bold text-green-600 mb-1">After</div>
                          <div className="text-sm text-gray-600">{study.after_value}</div>
                        </div>
                      )}
                      {study.improvement && (
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100 col-span-2">
                          <div className="text-2xl font-bold text-blue-600 mb-1">Improvement</div>
                          <div className="text-sm text-gray-600">{study.improvement}</div>
                        </div>
                      )}
                    </div>

                    {study.description && (
                      <div className="space-y-4 mb-8">
                        <p className="text-gray-600 text-lg leading-relaxed">{study.description}</p>
                      </div>
                    )}

                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                          CS
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">Client Success</div>
                          <div className="text-gray-600">Real results from our proven strategies</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                    <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                      <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <BarChart3 className="w-10 h-10 text-white" />
                        </div>
                        <h4 className="text-2xl font-bold text-gray-900 mb-2">Key Results</h4>
                        <p className="text-gray-600">Measurable improvements achieved</p>
                      </div>

                      <div className="space-y-4">
                        {study.before_value && (
                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <span className="text-gray-700">Before:</span>
                            <span className="font-semibold text-gray-900">{study.before_value}</span>
                          </div>
                        )}
                        {study.after_value && (
                          <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                            <span className="text-gray-700">After:</span>
                            <span className="font-semibold text-green-600">{study.after_value}</span>
                          </div>
                        )}
                        {study.improvement && (
                          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                            <span className="text-gray-700">Improvement:</span>
                            <span className="font-semibold text-blue-600">{study.improvement}</span>
                          </div>
                        )}
                      </div>

                      <div className="mt-8 pt-6 border-t border-gray-200">
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            Case Study #{study.id}
                          </div>
                          <div className="flex items-center">
                            <Target className="w-4 h-4 mr-2" />
                            Featured
                          </div>
                        </div>
                        <button className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                          View Full Case Study
                          <ExternalLink className="inline-block ml-2 w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Case Studies */}
      {caseStudies.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">More Success Stories</h2>
              <p className="text-xl text-gray-600">Explore additional case studies from various industries</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((study) => (
                <div key={study.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden border border-gray-100">
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        Case Study
                      </span>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        #{study.id}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                      {study.title}
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {study.before_value && (
                        <div className="text-center">
                          <div className="text-lg font-bold text-red-600 mb-1">Before</div>
                          <div className="text-xs text-gray-600">{study.before_value}</div>
                        </div>
                      )}
                      {study.after_value && (
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-600 mb-1">After</div>
                          <div className="text-xs text-gray-600">{study.after_value}</div>
                        </div>
                      )}
                    </div>
                    
                    {study.description && (
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {study.description}
                      </p>
                    )}
                    
                    {study.improvement && (
                      <div className="bg-gray-50 rounded-xl p-4 mb-6">
                        <div className="text-sm text-gray-700">
                          <strong>Improvement:</strong> {study.improvement}
                        </div>
                      </div>
                    )}
                    
                    <button className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                      Read Full Case Study
                      <ArrowRight className="inline-block ml-2 w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">
            Ready to Join These Success Stories?
          </h2>
          <p className="text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Don't let your competitors get ahead. Get your FREE SEO audit and discover exactly how we can 
            transform your business into a lead-generating machine that dominates your market.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-6 px-12 rounded-xl transition-all duration-200 hover:scale-105 shadow-xl text-xl"
            >
              Get My FREE SEO Audit
            </Link>
            <Link
              href="/services"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-6 px-12 rounded-xl transition-all duration-200 hover:scale-105 text-xl"
            >
              View Our Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

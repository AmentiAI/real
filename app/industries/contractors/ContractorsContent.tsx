'use client'

import { Phone, Mail, MapPin, Clock, ArrowRight, Sparkles, Users, CheckCircle, Star, Shield, Zap, Target, TrendingUp, Award, BarChart3, Globe } from 'lucide-react'
import Link from 'next/link'
import { useBranding } from '@/components/BrandingProvider'

export default function ContractorsContent() {
  const { branding } = useBranding()

  return (
    <>
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
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="text-center">
            {/* Industry Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm font-medium mb-8">
              <Users className="w-5 h-5 mr-2 animate-pulse" />
              Contractors & Construction
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              AI-Powered Digital Marketing for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Contractors
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-12">
              Transform your contracting business with AI-powered digital marketing. Proven system that generated $2.3M+ for Providence Roofing Co. 
              Dominate local search, showcase projects, and generate qualified leads.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transform"
              >
                Get Free Contractor Marketing Audit
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <a
                href={`tel:${branding.contact_phone}`}
                className="group inline-flex items-center justify-center px-10 py-5 bg-white/10 backdrop-blur-md text-white font-semibold rounded-2xl border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:scale-105 transform"
              >
                <Phone className="w-6 h-6 mr-3" />
                Call {branding.contact_phone}
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <div className="group text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 transform">
                <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-200">$2.3M+</div>
                <div className="text-blue-200 text-sm font-medium">Revenue Generated</div>
              </div>
              <div className="group text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 transform">
                <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-200">340%</div>
                <div className="text-blue-200 text-sm font-medium">Traffic Growth</div>
              </div>
              <div className="group text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 transform">
                <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-200">50+</div>
                <div className="text-blue-200 text-sm font-medium">Monthly Leads</div>
              </div>
              <div className="group text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 transform">
                <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-200">#1</div>
                <div className="text-blue-200 text-sm font-medium">Local Rankings</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Story Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4 mr-2" />
              Real Contractor Success Story
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Providence Roofing Co. Transformation
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              See how we helped a local roofing company achieve extraordinary growth with our AI-powered contractor marketing system.
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-12 shadow-2xl border border-slate-200">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mr-4">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">Mike Rodriguez</h3>
                      <p className="text-blue-600 font-semibold">Providence Roofing Co.</p>
                    </div>
                  </div>
                  <blockquote className="text-xl text-slate-600 leading-relaxed italic mb-8">
                    "{branding.company_name} transformed our business completely. We went from struggling to get 2-3 leads per month 
                    to now getting 50+ qualified leads every month. Our revenue has increased by over $2.3 million 
                    in just 6 months!"
                  </blockquote>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                    <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">340%</div>
                    <p className="text-sm font-semibold text-green-700">Traffic Increase</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-200">
                    <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">50+</div>
                    <p className="text-sm font-semibold text-blue-700">Monthly Leads</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
                    <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">$2.3M</div>
                    <p className="text-sm font-semibold text-purple-700">Revenue Growth</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-slate-200">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                  <Target className="w-6 h-6 text-blue-600 mr-3" />
                  Services That Delivered Results
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start group">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-4 mt-1 group-hover:bg-green-200 transition-colors duration-300">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">AI-Powered Local SEO</h4>
                      <p className="text-slate-600 text-sm">Ranked #1 for "roofing Providence" in 3 months</p>
                    </div>
                  </div>
                  <div className="flex items-start group">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-4 mt-1 group-hover:bg-green-200 transition-colors duration-300">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Project Showcase Website</h4>
                      <p className="text-slate-600 text-sm">Before/after gallery that converts visitors to leads</p>
                    </div>
                  </div>
                  <div className="flex items-start group">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-4 mt-1 group-hover:bg-green-200 transition-colors duration-300">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Storm Damage Lead Generation</h4>
                      <p className="text-slate-600 text-sm">Automated system to capture emergency roofing leads</p>
                    </div>
                  </div>
                  <div className="flex items-start group">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-4 mt-1 group-hover:bg-green-200 transition-colors duration-300">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Google Business Optimization</h4>
                      <p className="text-slate-600 text-sm">4.9/5 star rating with 50+ new reviews</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-slate-900 mb-8">
              Why Contractors Choose {branding.company_name}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We understand the unique challenges contractors face and have developed specialized solutions 
              that deliver measurable results for your business.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 transform border border-white/50">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">Local Expertise</h3>
              <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
                Deep understanding of local construction markets and seasonal trends for maximum impact.
              </p>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 transform border border-white/50">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Zap className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">AI-Powered Results</h3>
              <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
                Advanced AI technology that delivers faster, more accurate results than traditional methods.
              </p>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 transform border border-white/50">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <Award className="w-4 h-4 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-green-600 transition-colors duration-300">Proven Track Record</h3>
              <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
                Track record of delivering measurable growth for contractors across all specialties.
              </p>
            </div>
          </div>
        </div>
      </section>

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
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm font-medium mb-8">
            <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
            Ready to Transform Your Contracting Business?
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            Join Successful{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Contractors Nationwide
            </span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
            Get your free contractor marketing audit and discover how our AI-powered strategies can help your business 
            dominate local search results and generate more qualified leads.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center px-10 py-5 bg-white text-blue-600 font-bold rounded-2xl hover:bg-blue-50 transition-all duration-300 shadow-2xl hover:shadow-white/25 hover:scale-105 transform"
            >
              Get Free Contractor Marketing Audit
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <a
              href={`tel:${branding.contact_phone}`}
              className="border-2 border-white text-white font-bold px-12 py-6 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-200 hover:scale-105 text-xl"
            >
              Call {branding.contact_phone}
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">Free</div>
              <div className="text-blue-200 text-sm font-medium">Marketing Audit</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">24hr</div>
              <div className="text-blue-200 text-sm font-medium">Response Time</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">No</div>
              <div className="text-blue-200 text-sm font-medium">Long-term Contracts</div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}



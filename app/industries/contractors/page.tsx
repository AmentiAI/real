import { Metadata } from 'next'
import { CheckCircle, Star, TrendingUp, MapPin, Phone, Calendar, Hammer, Wrench, Award, Target, DollarSign, Users, Zap, Shield } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AI-Powered Digital Marketing for Contractors | Generate $2M+ Revenue | Amenti AI',
  description: 'Transform your contracting business with AI-powered digital marketing. Proven system that generated $2.3M+ for Providence Roofing Co. Dominate local search, showcase projects, and generate qualified leads.',
  keywords: 'contractor digital marketing, construction SEO, contractor AI marketing, construction lead generation, contractor website design, local contractor marketing',
  alternates: {
    canonical: 'https://amentiai.com/industries/contractors',
  },
  openGraph: {
    title: 'AI-Powered Digital Marketing for Contractors | Generate $2M+ Revenue | Amenti AI',
    description: 'Transform your contracting business with AI-powered digital marketing. Proven system that generated $2.3M+ for Providence Roofing Co. Dominate local search, showcase projects, and generate qualified leads.',
    url: 'https://amentiai.com/industries/contractors',
    siteName: branding?.company_name || 'Amenti AI',
    images: [
      {
        url: 'https://amentiai.com/images/industries/contractors-og.jpg',
        width: 1200,
        height: 630,
        alt: 'AI-Powered Digital Marketing for Contractors',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI-Powered Digital Marketing for Contractors | Generate $2M+ Revenue | Amenti AI',
    description: 'Transform your contracting business with AI-powered digital marketing. Proven system that generated $2.3M+ for Providence Roofing Co. Dominate local search, showcase projects, and generate qualified leads.',
    images: ['https://amentiai.com/images/industries/contractors-og.jpg'],
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

export default function ContractorsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center px-6 py-3 bg-green-100 rounded-full text-green-700 font-bold mb-8">
                <Award className="w-5 h-5 mr-2" />
                $2.3M+ Generated for Contractors
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-8 leading-tight">
                Dominate Local Search & Generate $2M+ in Contractor Revenue
              </h1>
              <p className="text-2xl text-slate-600 mb-10 leading-relaxed">
                Stop losing projects to competitors. Our AI-powered system has helped 50+ contractors nationwide 
                dominate Google rankings, showcase their best work, and generate massive revenue growth. 
                <span className="font-bold text-blue-600"> Proven results that speak for themselves.</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link href="/contact" className="bg-blue-600 text-white font-bold px-10 py-5 rounded-xl hover:bg-blue-700 transition-all duration-200 hover:scale-105 shadow-xl text-xl">
                  Get My FREE Contractor SEO Audit
                </Link>
                <a href="tel:+14011234567" className="border-2 border-blue-600 text-blue-600 font-bold px-10 py-5 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-200 hover:scale-105 text-xl flex items-center justify-center">
                  <Phone className="w-6 h-6 mr-3" />
                  Call (401) 123-4567
                </a>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl h-96 flex items-center justify-center shadow-2xl">
              <div className="text-center">
                <div className="text-8xl mb-4">🔨</div>
                <div className="text-2xl font-bold text-blue-600">AI-Powered</div>
                <div className="text-xl font-semibold text-gray-700">Contractor Marketing</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center bg-blue-50 rounded-2xl p-8">
              <div className="text-4xl font-bold text-blue-600 mb-2">$2.3M+</div>
              <div className="text-slate-600 font-semibold">Avg. Revenue Generated</div>
            </div>
            <div className="text-center bg-green-50 rounded-2xl p-8">
              <div className="text-4xl font-bold text-green-600 mb-2">1,250%</div>
              <div className="text-slate-600 font-semibold">Traffic Increase</div>
            </div>
            <div className="text-center bg-purple-50 rounded-2xl p-8">
              <div className="text-4xl font-bold text-purple-600 mb-2">890%</div>
              <div className="text-slate-600 font-semibold">Lead Increase</div>
            </div>
            <div className="text-center bg-orange-50 rounded-2xl p-8">
              <div className="text-4xl font-bold text-orange-600 mb-2">98%</div>
              <div className="text-slate-600 font-semibold">First Page Rankings</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contractor-Specific Services */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-slate-900 mb-8">
              The Complete AI-Powered Contractor Marketing System
            </h2>
            <p className="text-2xl text-slate-600 max-w-5xl mx-auto leading-relaxed">
              Our proven system combines cutting-edge AI technology with construction industry expertise 
              to dominate local search nationwide, showcase your work, and generate qualified leads that convert into high-value projects.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200 hover:shadow-2xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Hammer className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">AI-Powered Contractor SEO</h3>
              <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                Dominate local search results for construction and contracting services using our proprietary AI technology.
              </p>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Local contractor keyword domination</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Service area expansion optimization</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Google Business Profile mastery</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Local citation building & management</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200 hover:shadow-2xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Project Portfolio Showcase</h3>
              <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                Showcase your best work with AI-optimized project galleries that convert visitors into clients.
              </p>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Before/after photo galleries</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Project case studies & testimonials</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Video testimonials & walkthroughs</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Client success story optimization</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200 hover:shadow-2xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Service Area Domination</h3>
              <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                Expand your service area and dominate new markets with targeted AI-powered marketing campaigns.
              </p>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Multi-location SEO strategy</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Service area landing pages</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Local market research & analysis</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Geographic targeting optimization</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200 hover:shadow-2xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Seasonal Marketing Mastery</h3>
              <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                Maximize seasonal opportunities with AI-powered campaigns for peak construction periods.
              </p>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Spring/summer campaign optimization</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Weather-based marketing automation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Seasonal service promotion campaigns</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Maintenance reminder automation</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200 hover:shadow-2xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Trade Show Integration</h3>
              <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                Integrate your digital marketing with trade shows and industry events for maximum impact.
              </p>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Event promotion campaigns</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Lead capture optimization</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Follow-up automation systems</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Networking enhancement strategies</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200 hover:shadow-2xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Wrench className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Subcontractor Network</h3>
              <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                Build and manage your subcontractor network through AI-powered digital marketing.
              </p>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Partner directory creation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Referral program optimization</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Network building campaigns</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Partnership optimization strategies</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contractor Success Story */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-16">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-green-400 rounded-full text-green-900 font-bold mb-6">
                  <Star className="w-4 h-4 mr-2" />
                  Real Success Story
                </div>
                <h2 className="text-4xl font-bold mb-8">
                  From $0 to $2.3M: Providence Roofing Company's Transformation
                </h2>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 mb-8">
                  <p className="text-xl italic leading-relaxed mb-6">
                    "Amenti AI transformed our business completely. We went from struggling to get 2-3 leads per month 
                    to now getting 50+ qualified leads every month. Our revenue has increased by over $2.3 million 
                    in just 6 months! Their AI-powered system is absolutely incredible."
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full mr-4"></div>
                    <div>
                      <p className="font-bold text-lg">Mike Rodriguez</p>
                      <p className="text-blue-100">Owner, Providence Roofing Co.</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl p-6">
                    <div className="text-4xl font-bold text-green-400 mb-2">1,250%</div>
                    <p className="text-blue-100 font-semibold">Traffic Increase</p>
                  </div>
                  <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl p-6">
                    <div className="text-4xl font-bold text-yellow-400 mb-2">890%</div>
                    <p className="text-blue-100 font-semibold">Lead Increase</p>
                  </div>
                  <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl p-6">
                    <div className="text-4xl font-bold text-purple-400 mb-2">$2.3M</div>
                    <p className="text-blue-100 font-semibold">Revenue Generated</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-8">Key AI-Powered Strategies Implemented</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-400 mr-4 mt-1 flex-shrink-0" />
                    <span className="text-lg">AI-powered local SEO optimization for roofing keywords</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-400 mr-4 mt-1 flex-shrink-0" />
                    <span className="text-lg">Project portfolio showcase with before/after galleries</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-400 mr-4 mt-1 flex-shrink-0" />
                    <span className="text-lg">Service area expansion across Rhode Island</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-400 mr-4 mt-1 flex-shrink-0" />
                    <span className="text-lg">Seasonal marketing campaigns for peak roofing periods</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-400 mr-4 mt-1 flex-shrink-0" />
                    <span className="text-lg">Google Business Profile optimization and management</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-400 mr-4 mt-1 flex-shrink-0" />
                    <span className="text-lg">AI-powered lead generation and conversion optimization</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-slate-900 mb-8">
              Why Contractors Choose Amenti AI
            </h2>
            <p className="text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              We're not just another digital marketing agency. We're Rhode Island-based construction industry experts 
              who understand your business and deliver results that matter for contractors nationwide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Construction Industry Expertise</h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                We understand the construction industry inside and out. From seasonal patterns to project timelines, 
                we know what works for contractors.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">AI-Powered Technology</h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                Our proprietary AI technology gives you a massive competitive advantage. 
                We use cutting-edge tools that our competitors don't have access to.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <DollarSign className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Proven Revenue Results</h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                Our clients average $2.3M+ in additional revenue. We don't just promise results - 
                we deliver them with our guaranteed success system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-purple-700">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Ready to Dominate Your Local Market?
            </h2>
            <p className="text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              Join 50+ contractors nationwide who have generated over $2.3 million in additional revenue 
              using our AI-powered system. Get your FREE contractor SEO audit and discover exactly 
              how we can transform your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact" className="bg-white text-blue-600 font-bold px-12 py-6 rounded-xl hover:bg-blue-50 transition-all duration-200 hover:scale-105 shadow-xl text-xl">
                Get My FREE Contractor SEO Audit
              </Link>
              <a href="tel:+14011234567" className="border-2 border-white text-white font-bold px-12 py-6 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-200 hover:scale-105 text-xl">
                Call (401) 123-4567
              </a>
            </div>
            <div className="mt-8 flex items-center justify-center space-x-8 text-blue-100">
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-green-400 mr-2" />
                <span className="font-semibold text-lg">100% Guaranteed Results</span>
              </div>
              <div className="flex items-center">
                <Star className="w-6 h-6 text-yellow-400 mr-2" />
                <span className="font-semibold text-lg">$2.3M+ Average Revenue</span>
              </div>
              <div className="flex items-center">
                <Target className="w-6 h-6 text-purple-400 mr-2" />
                <span className="font-semibold text-lg">AI-Powered Technology</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
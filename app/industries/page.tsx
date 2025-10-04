import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Building2, Scale, Heart, Wrench, ShoppingBag, Factory, Briefcase, TrendingUp, Users, Target, CheckCircle, Star, BarChart3 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Rhode Island Industry Digital Marketing - Construction, Legal, Healthcare | Amenti AI',
  description: 'Rhode Island\'s #1 industry-specific digital marketing agency. Specialized SEO, web design & PPC for RI construction, legal, healthcare, technology & more. Providence-based experts.',
  keywords: 'Rhode Island industry marketing, RI construction SEO, Providence legal marketing, Rhode Island healthcare digital marketing, RI technology marketing, Providence industry SEO, Rhode Island business marketing, RI professional services SEO, Providence healthcare marketing, Rhode Island construction digital marketing',
  alternates: {
    canonical: 'https://amentiai.com/industries',
  },
  openGraph: {
    title: 'Industry-Specific Digital Marketing - Amenti AI | Rhode Island',
    description: 'Specialized digital marketing services for every industry. From construction and legal to healthcare and technology, we understand your unique challenges and deliver proven results.',
    url: 'https://amentiai.com/industries',
    siteName: 'Amenti AI',
    images: [
      {
        url: 'https://amentiai.com/images/industries-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Industry-Specific Digital Marketing - Amenti AI',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Industry-Specific Digital Marketing - Amenti AI | Rhode Island',
    description: 'Specialized digital marketing services for every industry. From construction and legal to healthcare and technology, we understand your unique challenges and deliver proven results.',
    images: ['https://amentiai.com/images/industries-og.jpg'],
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

const industries = [
  {
    id: 1,
    name: 'Construction',
    icon: Building2,
    description: 'Dominate local search and showcase your best work to attract more high-value projects.',
    color: 'blue',
    gradient: 'from-blue-500 to-blue-600',
    bgGradient: 'from-blue-50 to-blue-100',
    stats: {
      clients: '45+',
      growth: '350%',
      revenue: '$2.3M',
      rankings: '95%'
    },
    challenges: [
      'High competition for local projects',
      'Seasonal business fluctuations',
      'Need to showcase work quality',
      'Lead generation from referrals only'
    ],
    solutions: [
      'Local SEO optimization',
      'Project portfolio websites',
      'Google My Business optimization',
      'Lead generation systems'
    ],
    results: [
      '350% increase in qualified leads',
      '95% first-page local rankings',
      '200% increase in project inquiries',
      '$2.3M additional revenue generated'
    ],
    href: '/industries/contractors',
    featured: true
  },
  {
    id: 2,
    name: 'Legal Services',
    icon: Scale,
    description: 'Build authority and attract high-value clients with specialized legal marketing strategies.',
    color: 'purple',
    gradient: 'from-purple-500 to-purple-600',
    bgGradient: 'from-purple-50 to-purple-100',
    stats: {
      clients: '32+',
      growth: '400%',
      revenue: '$4.1M',
      rankings: '98%'
    },
    challenges: [
      'High competition in legal market',
      'Need to build trust and authority',
      'Complex service offerings',
      'Long sales cycles'
    ],
    solutions: [
      'Content marketing for expertise',
      'Local SEO for practice areas',
      'Conversion-optimized websites',
      'Client testimonial strategies'
    ],
    results: [
      '400% increase in organic traffic',
      '98% first-page rankings',
      '180% increase in consultations',
      '$4.1M additional revenue'
    ],
    href: '/industries/lawyers',
    featured: true
  },
  {
    id: 3,
    name: 'Healthcare',
    icon: Heart,
    description: 'Attract more patients and build trust with healthcare-specific digital marketing.',
    color: 'green',
    gradient: 'from-green-500 to-green-600',
    bgGradient: 'from-green-50 to-green-100',
    stats: {
      clients: '28+',
      growth: '500%',
      revenue: '$3.2M',
      rankings: '92%'
    },
    challenges: [
      'HIPAA compliance requirements',
      'Building patient trust online',
      'Competing with large systems',
      'Local patient acquisition'
    ],
    solutions: [
      'HIPAA-compliant marketing',
      'Patient education content',
      'Local SEO for specialties',
      'Online reputation management'
    ],
    results: [
      '500% increase in patient inquiries',
      '92% first-page rankings',
      '300% increase in appointments',
      '$3.2M additional revenue'
    ],
    href: '/industries/healthcare',
    featured: false
  },
  {
    id: 4,
    name: 'Technology',
    icon: Wrench,
    description: 'Scale your tech business with B2B marketing strategies that generate enterprise leads.',
    color: 'orange',
    gradient: 'from-orange-500 to-orange-600',
    bgGradient: 'from-orange-50 to-orange-100',
    stats: {
      clients: '18+',
      growth: '600%',
      revenue: '$5.8M',
      rankings: '89%'
    },
    challenges: [
      'Complex technical services',
      'Long B2B sales cycles',
      'Need to establish credibility',
      'Competing with large firms'
    ],
    solutions: [
      'Thought leadership content',
      'Technical SEO optimization',
      'Account-based marketing',
      'Case study development'
    ],
    results: [
      '600% increase in qualified leads',
      '89% first-page rankings',
      '400% increase in enterprise clients',
      '$5.8M additional revenue'
    ],
    href: '/industries/technology',
    featured: false
  },
  {
    id: 5,
    name: 'Retail & E-commerce',
    icon: ShoppingBag,
    description: 'Drive online sales and compete with major retailers using advanced e-commerce marketing.',
    color: 'pink',
    gradient: 'from-pink-500 to-pink-600',
    bgGradient: 'from-pink-50 to-pink-100',
    stats: {
      clients: '22+',
      growth: '450%',
      revenue: '$2.8M',
      rankings: '94%'
    },
    challenges: [
      'Competing with Amazon and big retailers',
      'Seasonal sales fluctuations',
      'High customer acquisition costs',
      'Need for conversion optimization'
    ],
    solutions: [
      'E-commerce SEO optimization',
      'Conversion rate optimization',
      'Social media advertising',
      'Email marketing automation'
    ],
    results: [
      '450% increase in online sales',
      '94% first-page rankings',
      '250% increase in average order value',
      '$2.8M additional revenue'
    ],
    href: '/industries/retail',
    featured: false
  },
  {
    id: 6,
    name: 'Manufacturing',
    icon: Factory,
    description: 'Generate B2B leads and establish industry authority with specialized manufacturing marketing.',
    color: 'gray',
    gradient: 'from-gray-500 to-gray-600',
    bgGradient: 'from-gray-50 to-gray-100',
    stats: {
      clients: '15+',
      growth: '380%',
      revenue: '$3.5M',
      rankings: '91%'
    },
    challenges: [
      'Complex B2B sales processes',
      'Need to demonstrate expertise',
      'Long decision-making cycles',
      'Competing globally'
    ],
    solutions: [
      'Technical content marketing',
      'Industry-specific SEO',
      'Trade publication partnerships',
      'Lead nurturing systems'
    ],
    results: [
      '380% increase in qualified leads',
      '91% first-page rankings',
      '200% increase in RFQ volume',
      '$3.5M additional revenue'
    ],
    href: '/industries/manufacturing',
    featured: false
  },
  {
    id: 7,
    name: 'Professional Services',
    icon: Briefcase,
    description: 'Build credibility and attract high-value clients with professional service marketing.',
    color: 'indigo',
    gradient: 'from-indigo-500 to-indigo-600',
    bgGradient: 'from-indigo-50 to-indigo-100',
    stats: {
      clients: '35+',
      growth: '420%',
      revenue: '$2.9M',
      rankings: '96%'
    },
    challenges: [
      'Building trust and credibility',
      'Demonstrating expertise',
      'Long sales cycles',
      'Referral dependency'
    ],
    solutions: [
      'Authority content marketing',
      'Local SEO optimization',
      'Client testimonial strategies',
      'Thought leadership campaigns'
    ],
    results: [
      '420% increase in inquiries',
      '96% first-page rankings',
      '180% increase in consultations',
      '$2.9M additional revenue'
    ],
    href: '/industries/professional-services',
    featured: false
  }
]

export default function IndustriesPage() {
  const featuredIndustries = industries.filter(industry => industry.featured)
  const otherIndustries = industries.filter(industry => !industry.featured)

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
            <Building2 className="w-5 h-5 mr-2 animate-pulse" />
            Industry Expertise
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            Specialized Marketing for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Every Industry
            </span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-12">
            We understand that every industry has unique challenges and opportunities. Our specialized approach 
            delivers proven results across construction, legal, healthcare, technology, and more.
          </p>

          {/* Industry Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">7+</div>
              <div className="text-blue-200">Industries Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">195+</div>
              <div className="text-blue-200">Industry Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">$25M+</div>
              <div className="text-blue-200">Revenue Generated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">95%</div>
              <div className="text-blue-200">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Industries */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Featured Industries</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our most successful industry specializations with proven track records of delivering exceptional results.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {featuredIndustries.map((industry, index) => (
              <div key={industry.id} className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden border border-gray-100">
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 bg-gradient-to-r ${industry.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <industry.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                          {industry.name}
                        </h3>
                        <p className="text-gray-600">{industry.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Star className="w-4 h-4 mr-1 text-yellow-500" />
                      Featured
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className={`bg-gradient-to-r ${industry.bgGradient} rounded-xl p-4 border border-gray-200`}>
                      <div className="text-2xl font-bold text-gray-900 mb-1">{industry.stats.clients}</div>
                      <div className="text-sm text-gray-600">Clients Served</div>
                    </div>
                    <div className={`bg-gradient-to-r ${industry.bgGradient} rounded-xl p-4 border border-gray-200`}>
                      <div className="text-2xl font-bold text-gray-900 mb-1">{industry.stats.growth}</div>
                      <div className="text-sm text-gray-600">Average Growth</div>
                    </div>
                    <div className={`bg-gradient-to-r ${industry.bgGradient} rounded-xl p-4 border border-gray-200`}>
                      <div className="text-2xl font-bold text-gray-900 mb-1">{industry.stats.revenue}</div>
                      <div className="text-sm text-gray-600">Revenue Generated</div>
                    </div>
                    <div className={`bg-gradient-to-r ${industry.bgGradient} rounded-xl p-4 border border-gray-200`}>
                      <div className="text-2xl font-bold text-gray-900 mb-1">{industry.stats.rankings}</div>
                      <div className="text-sm text-gray-600">First Page Rankings</div>
                    </div>
                  </div>

                  {/* Key Results */}
                  <div className="space-y-3 mb-8">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Results:</h4>
                    {industry.results.slice(0, 3).map((result, resultIndex) => (
                      <div key={resultIndex} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{result}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={industry.href}
                    className={`w-full py-4 px-6 bg-gradient-to-r ${industry.gradient} text-white font-semibold rounded-xl hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center`}
                  >
                    Learn More About {industry.name}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Industries */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">All Industries We Serve</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              No matter your industry, we have the expertise and proven strategies to help your business grow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherIndustries.map((industry) => (
              <div key={industry.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden border border-gray-100">
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`w-12 h-12 bg-gradient-to-r ${industry.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <industry.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        {industry.name}
                      </h3>
                      <p className="text-gray-600 text-sm">{industry.description}</p>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{industry.stats.clients}</div>
                      <div className="text-xs text-gray-600">Clients</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{industry.stats.growth}</div>
                      <div className="text-xs text-gray-600">Growth</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{industry.stats.revenue}</div>
                      <div className="text-xs text-gray-600">Revenue</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{industry.stats.rankings}</div>
                      <div className="text-xs text-gray-600">Rankings</div>
                    </div>
                  </div>

                  {/* Key Results */}
                  <div className="space-y-2 mb-6">
                    {industry.results.slice(0, 2).map((result, resultIndex) => (
                      <div key={resultIndex} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{result}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={industry.href}
                    className={`w-full py-3 px-6 bg-gradient-to-r ${industry.gradient} text-white font-semibold rounded-xl hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center text-sm`}
                  >
                    View {industry.name} Services
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Industry Expertise Matters */}
      <section className="py-24 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Why Industry Expertise Matters
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Generic marketing strategies don't work. Each industry has unique challenges, regulations, and customer behaviors that require specialized knowledge.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Industry-Specific Strategies</h3>
              <p className="text-blue-100">
                We understand your industry's unique challenges, regulations, and customer behaviors to create targeted marketing strategies that work.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Proven Track Record</h3>
              <p className="text-blue-100">
                Our industry expertise is backed by real results. We've helped 195+ businesses across 7+ industries achieve unprecedented growth.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Faster Results</h3>
              <p className="text-blue-100">
                Skip the learning curve. Our industry expertise means we can implement proven strategies immediately, delivering results faster.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Ready to Dominate Your Industry?
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Let's discuss how our industry-specific expertise can help your business achieve unprecedented growth. 
            Get a free consultation tailored to your industry.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Get Industry-Specific Consultation
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-10 py-5 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
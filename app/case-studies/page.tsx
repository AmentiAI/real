import Footer from '@/components/Footer'
import { ExternalLink, TrendingUp, Phone, MapPin, Calendar, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const caseStudies = [
  // Case studies will be loaded from database
]

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen pt-24">
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Case Studies
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Real results from real Rhode Island businesses. See how we've helped local companies 
              increase their organic leads and dominate search results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                Get Your Free Strategy Call
              </Link>
              <Link href="/services" className="btn-secondary text-lg px-8 py-4">
                View Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {caseStudies.length > 0 ? (
            <div className="grid lg:grid-cols-3 gap-8">
              {caseStudies.map((caseStudy) => (
                <div key={caseStudy.id} className="card overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                  {/* Image */}
                  <div className="relative h-48 bg-gradient-to-br from-primary-100 to-secondary-100 overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 text-primary-600 px-3 py-1 rounded-full text-sm font-medium">
                        {caseStudy.industry}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center text-white">
                        <MapPin size={16} className="mr-1" />
                        <span className="text-sm">{caseStudy.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
                      {caseStudy.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm">
                      <strong>Client:</strong> {caseStudy.client}
                    </p>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {caseStudy.challenge.substring(0, 120)}...
                    </p>

                    {/* Results */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">{caseStudy.results.leads}</div>
                        <div className="text-xs text-gray-500">Leads</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">{caseStudy.results.rankings}</div>
                        <div className="text-xs text-gray-500">Rankings</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-600">{caseStudy.results.calls}</div>
                        <div className="text-xs text-gray-500">Calls</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-orange-600">{caseStudy.results.revenue}</div>
                        <div className="text-xs text-gray-500">Revenue</div>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <Calendar className="mr-2" size={16} />
                      <span>Timeline: {caseStudy.timeline}</span>
                    </div>

                    {/* Services */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {caseStudy.services.map((service, index) => (
                        <span key={index} className="bg-primary-100 text-primary-600 px-2 py-1 rounded text-xs">
                          {service}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/case-studies/${caseStudy.id}`}
                      className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                    >
                      Read Full Case Study
                      <ArrowRight className="ml-2" size={16} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-gray-50 rounded-2xl p-12">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Case Studies Coming Soon
                </h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  We're currently working on documenting our client success stories. 
                  Check back soon to see real results from our digital marketing campaigns.
                </p>
                <Link
                  href="/contact"
                  className="btn-primary"
                >
                  Get Started Today
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Proven Results Across Industries
            </h2>
            <p className="text-xl text-gray-600">
              Our strategies work for businesses of all sizes and industries
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">150+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">247%</div>
              <div className="text-gray-600">Avg Lead Increase</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">98%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">$2M+</div>
              <div className="text-gray-600">Revenue Generated</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Want Similar Results for Your Business?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Book a free 15-minute strategy call to see how we can help you achieve similar results.
          </p>
          <Link
            href="/contact"
            className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 inline-flex items-center text-lg"
          >
            Book Free Strategy Call
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}

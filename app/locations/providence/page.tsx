import Footer from '@/components/Footer'
import { MapPin, Phone, Clock, Star, CheckCircle, TrendingUp, Users } from 'lucide-react'
import Link from 'next/link'

const localStats = [
  { metric: '150+', label: 'Local Clients' },
  { metric: '4.9/5', label: 'Google Rating' },
  { metric: '5+', label: 'Years in RI' },
  { metric: '247%', label: 'Avg Lead Increase' }
]

const localTestimonials = [
  {
    name: 'Sarah Johnson',
    company: 'Providence Law Firm',
    location: 'Downtown Providence',
    content: 'Amenti AI helped us dominate local search results. We went from 2-3 leads per month to 15+ qualified leads. Our phone hasn\'t stopped ringing!',
    rating: 5
  },
  {
    name: 'Mike Rodriguez',
    company: 'Rhode Island Roofing',
    location: 'East Providence',
    content: 'The team at Amenti AI understands the local market better than anyone. They got us ranking #1 for "roofing Providence" in just 3 months.',
    rating: 5
  }
]

const localServices = [
  'Google My Business optimization',
  'Local citation building',
  'Providence-specific content',
  'Local link building',
  'Review management',
  'Local schema markup'
]

export default function ProvidencePage() {
  return (
    <main className="min-h-screen pt-24">
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Providence SEO Company
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                We help Providence businesses dominate local search results and get more qualified leads. 
                Our proven strategies have helped 150+ local businesses increase their organic traffic by an average of 247%.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                  Get Free Providence SEO Audit
                </Link>
                <a href="tel:+14011234567" className="btn-secondary text-lg px-8 py-4">
                  <Phone className="mr-2" size={20} />
                  Call (401) 123-4567
                </a>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Providence Market Insights</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="text-primary-600 mr-3" size={20} />
                  <span className="text-gray-700">Population: 190,000+</span>
                </div>
                <div className="flex items-center">
                  <Users className="text-primary-600 mr-3" size={20} />
                  <span className="text-gray-700">Businesses: 15,000+</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="text-primary-600 mr-3" size={20} />
                  <span className="text-gray-700">Avg. search volume: 45,000/month</span>
                </div>
                <div className="flex items-center">
                  <Star className="text-primary-600 mr-3" size={20} />
                  <span className="text-gray-700">Competition: Medium-High</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {localStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  {stat.metric}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Providence Businesses Say
            </h2>
            <p className="text-xl text-gray-600">
              Real results from real Providence businesses
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {localTestimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={20} />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div className="border-t border-gray-100 pt-4">
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.company}</div>
                  <div className="text-sm text-primary-600">{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Providence-Specific SEO Services
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                We understand the Providence market and know what it takes to rank locally. 
                Our strategies are tailored specifically for Providence businesses.
              </p>
              <ul className="space-y-4">
                {localServices.map((service, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="text-green-500 mr-3" size={20} />
                    <span className="text-gray-700">{service}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Service Area</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="text-primary-600 mr-3" size={20} />
                  <span className="text-gray-700">Downtown Providence</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="text-primary-600 mr-3" size={20} />
                  <span className="text-gray-700">East Providence</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="text-primary-600 mr-3" size={20} />
                  <span className="text-gray-700">North Providence</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="text-primary-600 mr-3" size={20} />
                  <span className="text-gray-700">South Providence</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="text-primary-600 mr-3" size={20} />
                  <span className="text-gray-700">West End</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Dominate Providence Search Results?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Get your free Providence SEO audit and see how we can help your business get found locally.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 inline-flex items-center text-lg"
            >
              Get Free Providence SEO Audit
            </Link>
            <a
              href="tel:+14011234567"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 inline-flex items-center text-lg"
            >
              <Phone className="mr-2" size={20} />
              Call (401) 123-4567
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

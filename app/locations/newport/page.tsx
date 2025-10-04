import { Metadata } from 'next'
import { MapPin, Phone, Users, TrendingUp, Star, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Newport RI Digital Marketing Services | Amenti AI',
  description: 'Professional digital marketing services for Newport, RI businesses. Local SEO, web design, and marketing strategies that drive results.',
  keywords: 'Newport RI digital marketing, Newport SEO, Newport web design, Rhode Island marketing agency',
  alternates: {
    canonical: 'https://amentiai.com/locations/newport',
  },
  openGraph: {
    title: 'Newport RI Digital Marketing Services | Amenti AI',
    description: 'Professional digital marketing services for Newport, RI businesses. Local SEO, web design, and marketing strategies that drive results.',
    url: 'https://amentiai.com/locations/newport',
    siteName: 'Amenti AI',
    images: [
      {
        url: 'https://amentiai.com/images/locations/newport-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Newport RI Digital Marketing Services',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Newport RI Digital Marketing Services | Amenti AI',
    description: 'Professional digital marketing services for Newport, RI businesses. Local SEO, web design, and marketing strategies that drive results.',
    images: ['https://amentiai.com/images/locations/newport-og.jpg'],
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

export default function NewportPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-semibold text-slate-900 mb-8">
              Digital Marketing Services in Newport, RI
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12">
              Help your Newport business dominate local search results and attract more customers 
              with our proven digital marketing strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors">
                Get Free SEO Audit
              </Link>
              <a href="tel:+14011234567" className="border-2 border-blue-600 text-blue-600 font-semibold px-8 py-4 rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
                Call {branding?.contact_phone || '(401) 123-4567'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Newport Stats */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-slate-900 mb-8">
              Why Newport Businesses Choose Amenti AI
            </h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">18+</div>
              <p className="text-slate-600">Newport Businesses Served</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">380%</div>
              <p className="text-slate-600">Average Traffic Increase</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
              <p className="text-slate-600">Client Satisfaction Rate</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">2+</div>
              <p className="text-slate-600">Years Serving Newport</p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Story */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-semibold text-slate-900 mb-6">
                  Newport Law Firm Success
                </h2>
                <p className="text-slate-600 mb-6">
                  "Amenti AI helped us establish authority in personal injury law and compete with 
                  larger firms. Our online presence now generates consistent high-value leads."
                </p>
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">380%</div>
                    <p className="text-sm text-slate-600">Traffic Increase</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">250%</div>
                    <p className="text-sm text-slate-600">More Leads</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">190%</div>
                    <p className="text-sm text-slate-600">Revenue Growth</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-100 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Services Provided</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Strategic content marketing for legal services</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Local SEO optimization for Newport area</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Attorney directory optimization</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Client testimonial showcases</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-600">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-semibold text-white mb-8">
            Ready to Grow Your Newport Business?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
            Get a free SEO audit and discover how we can help your Newport business attract more customers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors">
              Get Free SEO Audit
            </Link>
            <a href="tel:+14011234567" className="border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 transition-colors">
              Call {branding?.contact_phone || '(401) 123-4567'}
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}







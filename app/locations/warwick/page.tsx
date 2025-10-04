import { Metadata } from 'next'
import { MapPin, Phone, Users, TrendingUp, Star, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Warwick RI Digital Marketing Services | Amenti AI',
  description: 'Professional digital marketing services for Warwick, RI businesses. Local SEO, web design, and marketing strategies that drive results.',
  keywords: 'Warwick RI digital marketing, Warwick SEO, Warwick web design, Rhode Island marketing agency',
  alternates: {
    canonical: 'https://amentiai.com/locations/warwick',
  },
  openGraph: {
    title: 'Warwick RI Digital Marketing Services | Amenti AI',
    description: 'Professional digital marketing services for Warwick, RI businesses. Local SEO, web design, and marketing strategies that drive results.',
    url: 'https://amentiai.com/locations/warwick',
    siteName: 'Amenti AI',
    images: [
      {
        url: 'https://amentiai.com/images/locations/warwick-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Warwick RI Digital Marketing Services',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Warwick RI Digital Marketing Services | Amenti AI',
    description: 'Professional digital marketing services for Warwick, RI businesses. Local SEO, web design, and marketing strategies that drive results.',
    images: ['https://amentiai.com/images/locations/warwick-og.jpg'],
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

export default function WarwickPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-semibold text-slate-900 mb-8">
              Digital Marketing Services in Warwick, RI
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12">
              Help your Warwick business dominate local search results and attract more customers 
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

      {/* Warwick Stats */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-slate-900 mb-8">
              Why Warwick Businesses Choose Amenti AI
            </h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">35+</div>
              <p className="text-slate-600">Warwick Businesses Served</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">280%</div>
              <p className="text-slate-600">Average Traffic Increase</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
              <p className="text-slate-600">Client Satisfaction Rate</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">4+</div>
              <p className="text-slate-600">Years Serving Warwick</p>
            </div>
          </div>
        </div>
      </section>

      {/* Warwick-Specific Services */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-slate-900 mb-8">
              Warwick-Specific Services
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We understand the Warwick market and help local businesses compete effectively online.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Local SEO for Warwick</h3>
              <p className="text-slate-600 mb-6">
                Dominate "Warwick [your service]" searches and get found by local customers.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Google Business Profile optimization</li>
                <li>• Local citation building</li>
                <li>• Warwick-specific keywords</li>
                <li>• Local link building</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Website Design</h3>
              <p className="text-slate-600 mb-6">
                Professional websites that convert Warwick visitors into customers.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Mobile-responsive design</li>
                <li>• Fast loading speeds</li>
                <li>• Warwick business info</li>
                <li>• Local contact forms</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Google Ads Management</h3>
              <p className="text-slate-600 mb-6">
                Targeted advertising campaigns for Warwick-area customers.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Location-based targeting</li>
                <li>• Warwick keywords</li>
                <li>• Landing page optimization</li>
                <li>• ROI tracking</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Warwick Success Stories */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-slate-900 mb-8">
              Warwick Success Stories
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                Warwick Restaurant
              </h3>
              <p className="text-slate-600 mb-6">
                Increased organic traffic by 520% and leads by 180% through comprehensive local SEO strategy.
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">520%</div>
                  <p className="text-sm text-slate-600">Traffic Increase</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">180%</div>
                  <p className="text-sm text-slate-600">More Leads</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">220%</div>
                  <p className="text-sm text-slate-600">Revenue Growth</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                Warwick Medical Practice
              </h3>
              <p className="text-slate-600 mb-6">
                Boosted patient acquisition by 160% with modern website design and local SEO optimization.
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">340%</div>
                  <p className="text-sm text-slate-600">Traffic Increase</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">160%</div>
                  <p className="text-sm text-slate-600">More Patients</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">140%</div>
                  <p className="text-sm text-slate-600">Revenue Growth</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-600">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-semibold text-white mb-8">
            Ready to Dominate Warwick Search Results?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
            Get a free SEO audit and discover how we can help your Warwick business attract more local customers.
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







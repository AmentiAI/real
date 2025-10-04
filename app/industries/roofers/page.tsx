import { Metadata } from 'next'
import { CheckCircle, Star, TrendingUp, MapPin, Phone, Calendar } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Roofing Company Digital Marketing Services | Amenti AI',
  description: 'Specialized digital marketing for roofing companies. Dominate local search, generate storm damage leads, and grow your roofing business with proven strategies.',
  keywords: 'roofing marketing, roofer SEO, storm damage leads, roofing company advertising, local roofing SEO',
  alternates: {
    canonical: 'https://amentiai.com/industries/roofers',
  },
  openGraph: {
    title: 'Roofing Company Digital Marketing Services | Amenti AI',
    description: 'Specialized digital marketing for roofing companies. Dominate local search, generate storm damage leads, and grow your roofing business with proven strategies.',
    url: 'https://amentiai.com/industries/roofers',
    siteName: 'Amenti AI',
    images: [
      {
        url: 'https://amentiai.com/images/industries/roofers-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Roofing Company Digital Marketing Services',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roofing Company Digital Marketing Services | Amenti AI',
    description: 'Specialized digital marketing for roofing companies. Dominate local search, generate storm damage leads, and grow your roofing business with proven strategies.',
    images: ['https://amentiai.com/images/industries/roofers-og.jpg'],
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

export default function RoofersPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-8">
                Digital Marketing for Roofing Companies
              </h1>
              <p className="text-xl text-slate-600 mb-8">
                Dominate local search results for roofing services and generate more qualified leads. 
                Our specialized strategies help roofing companies capitalize on storm damage events and seasonal demand.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors text-center">
                  Get Free Roofing SEO Audit
                </Link>
                <a href="tel:+14011234567" className="border-2 border-blue-600 text-blue-600 font-semibold px-8 py-4 rounded-lg hover:bg-blue-600 hover:text-white transition-colors text-center flex items-center justify-center">
                  <Phone className="w-5 h-5 mr-2" />
                  Call (401) 123-4567
                </a>
              </div>
            </div>
            <div className="bg-slate-200 rounded-2xl h-96 flex items-center justify-center">
              <span className="text-8xl">🏠</span>
            </div>
          </div>
        </div>
      </section>

      {/* Roofing-Specific Services */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-slate-900 mb-8">
              Roofing-Specific Marketing Services
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We understand the roofing industry's unique challenges and opportunities. 
              Our strategies are designed specifically for roofing contractors.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Storm Damage SEO</h3>
              <p className="text-slate-600 mb-6">
                Capitalize on storm damage events with rapid-response SEO strategies and emergency service optimization.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Storm damage keyword optimization</li>
                <li>• Emergency service listings</li>
                <li>• Weather-based content marketing</li>
                <li>• Rapid response campaigns</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Local Roofing SEO</h3>
              <p className="text-slate-600 mb-6">
                Dominate "roofing near me" searches and capture local customers in your service area.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Google Business Profile optimization</li>
                <li>• Local citation building</li>
                <li>• Service area optimization</li>
                <li>• Neighborhood-specific content</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Project Portfolio</h3>
              <p className="text-slate-600 mb-6">
                Showcase your best work with optimized project galleries that convert visitors into customers.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Before/after photo galleries</li>
                <li>• Project case studies</li>
                <li>• Video testimonials</li>
                <li>• Customer success stories</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Review Management</h3>
              <p className="text-slate-600 mb-6">
                Build and maintain a stellar reputation with strategic review management and reputation optimization.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Review generation strategies</li>
                <li>• Review response management</li>
                <li>• Reputation monitoring</li>
                <li>• Review site optimization</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Seasonal Marketing</h3>
              <p className="text-slate-600 mb-6">
                Maximize seasonal opportunities with targeted campaigns for spring, summer, and fall roofing seasons.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Seasonal content campaigns</li>
                <li>• Weather-based advertising</li>
                <li>• Seasonal service promotions</li>
                <li>• Maintenance reminder campaigns</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Lead Generation</h3>
              <p className="text-slate-600 mb-6">
                Generate high-quality roofing leads through targeted advertising and conversion optimization.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Google Ads for roofing keywords</li>
                <li>• Facebook advertising campaigns</li>
                <li>• Lead capture optimization</li>
                <li>• Follow-up automation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Roofing Success Story */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-semibold text-slate-900 mb-6">
                  Providence Roofing Company Success Story
                </h2>
                <p className="text-slate-600 mb-6">
                  "Amenti AI helped us dominate local roofing searches and capitalize on storm damage events. 
                  We went from struggling to get leads to having more work than we could handle."
                </p>
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">450%</div>
                    <p className="text-sm text-slate-600">Traffic Increase</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">320%</div>
                    <p className="text-sm text-slate-600">More Leads</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">280%</div>
                    <p className="text-sm text-slate-600">Revenue Growth</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-100 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Key Strategies Implemented</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Storm damage SEO optimization</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Local citation building campaign</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Project portfolio optimization</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Review management system</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Seasonal marketing campaigns</span>
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
            Ready to Dominate Roofing Search Results?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
            Get a free roofing SEO audit and discover how we can help your roofing company 
            generate more leads and grow your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors">
              Get Free Roofing SEO Audit
            </Link>
            <a href="tel:+14011234567" className="border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 transition-colors">
              Call (401) 123-4567
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}







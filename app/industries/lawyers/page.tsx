import { Metadata } from 'next'
import { CheckCircle, Star, TrendingUp, MapPin, Phone, Calendar, Gavel, Scale } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Legal Services Digital Marketing | Amenti AI',
  description: 'Specialized digital marketing for law firms and attorneys. Attract high-value clients with proven legal marketing strategies.',
  keywords: 'lawyer marketing, attorney SEO, legal services marketing, law firm advertising, legal digital marketing',
  alternates: {
    canonical: 'https://amentiai.com/industries/lawyers',
  },
  openGraph: {
    title: 'Legal Services Digital Marketing | Amenti AI',
    description: 'Specialized digital marketing for law firms and attorneys. Attract high-value clients with proven legal marketing strategies.',
    url: 'https://amentiai.com/industries/lawyers',
    siteName: 'Amenti AI',
    images: [
      {
        url: 'https://amentiai.com/images/industries/lawyers-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Legal Services Digital Marketing',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Legal Services Digital Marketing | Amenti AI',
    description: 'Specialized digital marketing for law firms and attorneys. Attract high-value clients with proven legal marketing strategies.',
    images: ['https://amentiai.com/images/industries/lawyers-og.jpg'],
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

export default function LawyersPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-8">
                Digital Marketing for Law Firms
              </h1>
              <p className="text-xl text-slate-600 mb-8">
                Attract high-value clients and establish authority in your practice area with our specialized 
                legal marketing strategies. From personal injury to corporate law, we help you compete with the best.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors text-center">
                  Get Free Legal SEO Audit
                </Link>
                <a href="tel:+14011234567" className="border-2 border-blue-600 text-blue-600 font-semibold px-8 py-4 rounded-lg hover:bg-blue-600 hover:text-white transition-colors text-center flex items-center justify-center">
                  <Phone className="w-5 h-5 mr-2" />
                  Call (401) 123-4567
                </a>
              </div>
            </div>
            <div className="bg-slate-200 rounded-2xl h-96 flex items-center justify-center">
              <span className="text-8xl">⚖️</span>
            </div>
          </div>
        </div>
      </section>

      {/* Legal-Specific Services */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-slate-900 mb-8">
              Legal Marketing Services
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We understand the unique challenges of legal marketing and compliance requirements. 
              Our strategies are designed specifically for law firms and attorneys.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Personal Injury SEO</h3>
              <p className="text-slate-600 mb-6">
                Dominate search results for personal injury cases and attract high-value clients.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Accident-related keyword optimization</li>
                <li>• Case study content marketing</li>
                <li>• Local injury law SEO</li>
                <li>• Client testimonial showcases</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Attorney Directory Optimization</h3>
              <p className="text-slate-600 mb-6">
                Optimize your presence in legal directories and professional listings.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Avvo profile optimization</li>
                <li>• Justia directory listings</li>
                <li>• Martindale-Hubbell optimization</li>
                <li>• Super Lawyers submissions</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Legal Content Marketing</h3>
              <p className="text-slate-600 mb-6">
                Establish authority with expert legal content that educates and converts.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Legal blog content</li>
                <li>• Practice area guides</li>
                <li>• FAQ content creation</li>
                <li>• Legal resource libraries</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Client Testimonial Management</h3>
              <p className="text-slate-600 mb-6">
                Build trust and credibility with strategic testimonial collection and display.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Review generation strategies</li>
                <li>• Testimonial video creation</li>
                <li>• Case outcome showcases</li>
                <li>• Success story marketing</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Practice Area Specialization</h3>
              <p className="text-slate-600 mb-6">
                Position yourself as the expert in your specific practice areas.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Practice area landing pages</li>
                <li>• Specialized content creation</li>
                <li>• Industry-specific SEO</li>
                <li>• Expert positioning strategies</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Legal Lead Generation</h3>
              <p className="text-slate-600 mb-6">
                Generate qualified legal leads through targeted advertising and optimization.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Google Ads for legal keywords</li>
                <li>• Facebook advertising campaigns</li>
                <li>• Lead capture optimization</li>
                <li>• Client intake automation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Success Story */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-semibold text-slate-900 mb-6">
                  Newport Law Firm Success Story
                </h2>
                <p className="text-slate-600 mb-6">
                  "Amenti AI helped us establish authority in personal injury law and compete with larger firms. 
                  Our online presence now generates consistent high-value leads."
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
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Key Strategies Implemented</h3>
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
            Ready to Attract More Legal Clients?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
            Get a free legal SEO audit and discover how we can help your law firm 
            generate more qualified leads and grow your practice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors">
              Get Free Legal SEO Audit
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







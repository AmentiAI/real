'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Star, ChevronDown } from 'lucide-react'
import { notFound } from 'next/navigation'

const serviceData = {
  'website-design': {
    title: 'Website Design & Development',
    icon: '🖥️',
    description: 'Professional websites that convert visitors into customers with modern design and advanced functionality.',
    longDescription: 'We create stunning, high-converting websites that not only look great but also perform exceptionally well in search engines. Our websites are built with the latest technologies and optimized for speed, mobile responsiveness, and user experience.',
    tiers: [
      {
        name: 'Starter Website',
        price: '$1,000',
        period: 'one-time',
        popular: false,
        features: [
          'Up to 5 SEO-ready pages',
          'Mobile-friendly, responsive design',
          'Basic SEO setup (titles, metadata, alt tags)',
          'Google Analytics + Search Console',
          'Contact form integration',
          'Basic hosting setup',
          'SSL certificate included',
          '1 month of support'
        ]
      },
      {
        name: 'Growth Website',
        price: '$3,500',
        period: 'one-time',
        popular: true,
        features: [
          '10–15 SEO-optimized pages',
          'Keyword-targeted copywriting',
          'Lead capture forms (CRM or email integrations)',
          'Blog system setup',
          'Core Web Vitals optimization',
          'Advanced SEO features',
          'Social media integration',
          'Analytics dashboard',
          '3 months of support',
          'Performance optimization'
        ]
      },
      {
        name: 'Dominate Website',
        price: '$7,500+',
        period: 'one-time',
        popular: false,
        features: [
          '20–30+ pages',
          'Conversion funnels (booking, e-commerce, memberships)',
          'Multi-location SEO structure',
          'Advanced schema markup (reviews, FAQs, services)',
          'Custom integrations & dashboards',
          'Advanced analytics & reporting',
          'A/B testing setup',
          'Performance optimization',
          '6 months of support',
          'Custom functionality'
        ]
      }
    ]
  },
  'seo-services': {
    title: 'SEO Services',
    icon: '🔍',
    description: 'Comprehensive SEO strategies that dominate search results and drive qualified traffic to your business.',
    longDescription: 'Our proven SEO strategies help businesses dominate search results and drive qualified traffic. We use data-driven approaches and white-hat techniques to improve your search rankings and increase organic visibility.',
    tiers: [
      {
        name: 'Starter SEO',
        price: '$1,200',
        period: 'month',
        popular: false,
        features: [
          '20 local keywords',
          'Google Business Profile optimization',
          'On-page SEO + local citations',
          'Basic backlink building',
          'Monthly SEO report',
          'Competitor analysis',
          'Local directory submissions',
          'Basic keyword research'
        ]
      },
      {
        name: 'Growth SEO',
        price: '$3,500',
        period: 'month',
        popular: true,
        features: [
          '60 regional/national keywords',
          'Full technical SEO audit & fixes',
          '4 SEO-optimized blogs/month',
          'Competitor analysis + tracking',
          'White-hat backlink campaigns',
          'Live analytics dashboard',
          'Content strategy development',
          'Local SEO optimization',
          'Advanced keyword research',
          'Monthly strategy calls'
        ]
      },
      {
        name: 'Dominate SEO',
        price: '$8,000+',
        period: 'month',
        popular: false,
        features: [
          '150+ targeted keywords (local + national)',
          'Enterprise technical SEO + site architecture',
          'Advanced backlink & PR outreach',
          'Content engine: 8+ blogs/month + automation',
          'Multi-location SEO strategies',
          'Dedicated SEO manager + quarterly workshops',
          'Advanced analytics & reporting',
          'Custom SEO tools & automation',
          'Competitor intelligence',
          'Weekly strategy calls'
        ]
      }
    ]
  },
  'branding-identity': {
    title: 'Branding & Identity',
    icon: '📝',
    description: 'Create a powerful brand identity that resonates with your audience and builds trust in your business.',
    longDescription: 'A strong brand identity is the foundation of your business success. We create comprehensive brand systems that communicate your values, differentiate you from competitors, and build lasting connections with your customers.',
    tiers: [
      {
        name: 'Starter Branding',
        price: '$750',
        period: 'one-time',
        popular: false,
        features: [
          'Logo design (3 concepts + 2 revisions)',
          'Basic color palette + fonts',
          'Simple brand guidelines',
          'Logo variations (horizontal, vertical)',
          'Basic business card design',
          'Social media profile images'
        ]
      },
      {
        name: 'Growth Branding',
        price: '$2,500',
        period: 'one-time',
        popular: true,
        features: [
          'Full brand kit (logo, fonts, colors, social templates)',
          'Style guide (PDF)',
          'Business card + marketing collateral',
          'Social media templates',
          'Letterhead & envelope design',
          'Brand application examples',
          'Brand voice guidelines',
          'Competitor analysis'
        ]
      },
      {
        name: 'Dominate Branding',
        price: '$5,000+',
        period: 'one-time',
        popular: false,
        features: [
          'Enterprise-level identity system',
          'Multi-logo variations (print, web, mobile)',
          'Full corporate collateral (pitch decks, signage, templates)',
          'Brand strategy & positioning',
          'Complete brand guidelines',
          'Trademark consultation',
          'Brand audit & recommendations',
          'Ongoing brand support'
        ]
      }
    ]
  },
  'content-marketing': {
    title: 'Content Marketing',
    icon: '✍️',
    description: 'Strategic content that ranks, engages, and converts your target audience into loyal customers.',
    longDescription: 'Content is king in today\'s digital landscape. We create strategic, SEO-optimized content that not only ranks well in search engines but also engages your audience and drives conversions.',
    tiers: [
      {
        name: 'Starter Content',
        price: '$500',
        period: 'month',
        popular: false,
        features: [
          '2 SEO-optimized blog posts',
          'Keyword + topic research',
          'Basic content calendar',
          'Social media content suggestions',
          'Content performance tracking',
          'Basic SEO optimization'
        ]
      },
      {
        name: 'Growth Content',
        price: '$1,200',
        period: 'month',
        popular: true,
        features: [
          '4–6 SEO blog posts',
          'Internal linking + content calendar',
          'SEO content clustering',
          'Social media content creation',
          'Content distribution strategy',
          'Performance analytics',
          'Content optimization',
          'Competitor content analysis'
        ]
      },
      {
        name: 'Dominate Content',
        price: '$2,500+',
        period: 'month',
        popular: false,
        features: [
          '8–12 blogs/month + PR guest posts',
          'Infographics + shareable visuals',
          'AI-assisted content scaling',
          'Video content creation',
          'Content automation',
          'Advanced content strategy',
          'Content performance optimization',
          'Content team management'
        ]
      }
    ]
  },
  'paid-ads-social': {
    title: 'Paid Ads & Social Media',
    icon: '📱',
    description: 'Targeted advertising campaigns that reach your ideal customers and drive measurable results.',
    longDescription: 'Our paid advertising and social media strategies are designed to reach your ideal customers at the right time with the right message. We focus on measurable results and ROI optimization.',
    tiers: [
      {
        name: 'Starter Ads/Social',
        price: '$750',
        period: 'month',
        popular: false,
        features: [
          'Google Ads: 1 campaign setup',
          'Social: 3 posts/week on 2 platforms',
          'Basic reporting',
          'Ad creative design',
          'Basic audience targeting',
          'Campaign optimization'
        ]
      },
      {
        name: 'Growth Ads/Social',
        price: '$1,500–2,000',
        period: 'month',
        popular: true,
        features: [
          'Google Ads: multiple campaigns + remarketing',
          'Social: 5 posts/week on 3 platforms',
          'Growth strategy + analytics',
          'Advanced targeting options',
          'A/B testing campaigns',
          'Conversion tracking',
          'Social media management',
          'Ad creative optimization'
        ]
      },
      {
        name: 'Dominate Ads/Social',
        price: '$3,000+',
        period: 'month',
        popular: false,
        features: [
          'Google Ads: advanced funnel campaigns ($10k+ spend ready)',
          'Social: daily content + short-form video',
          'Paid ads + influencer outreach',
          'Dedicated ads manager',
          'Advanced analytics & optimization',
          'Multi-platform campaigns',
          'Creative team support',
          'Advanced automation'
        ]
      }
    ]
  },
  'platforms-systems': {
    title: 'Platforms & Custom Systems',
    icon: '⚙️',
    description: 'Build comprehensive digital platforms and custom systems that scale with your business growth.',
    longDescription: 'We build custom digital platforms and systems that are tailored to your specific business needs. From simple web applications to complex enterprise systems, we create solutions that scale with your growth.',
    tiers: [
      {
        name: 'Startup MVP',
        price: '$15,000+',
        period: 'one-time',
        popular: false,
        features: [
          'Basic SaaS app or marketplace',
          'Login, admin panel, core features',
          'Supabase + Neon + Vercel stack',
          'Basic user management',
          'Payment integration (Stripe)',
          'Basic analytics',
          '3 months of support'
        ]
      },
      {
        name: 'Growth Platform',
        price: '$50,000+',
        period: 'one-time',
        popular: true,
        features: [
          'Multi-user SaaS or marketplace system',
          'Payment integration + dashboards',
          'API integrations + automation',
          'Advanced user management',
          'Custom reporting & analytics',
          'Third-party integrations',
          '6 months of support',
          'Performance optimization'
        ]
      },
      {
        name: 'Enterprise Platform',
        price: '$100,000+',
        period: 'one-time',
        popular: false,
        features: [
          'Multi-tenant enterprise platform',
          'Advanced AI features + analytics',
          'Fully custom architecture',
          'Enterprise security & compliance',
          'Advanced automation & workflows',
          'Dedicated support & maintenance',
          '12 months of support',
          'Custom integrations'
        ]
      }
    ]
  },
  'white-label-seo': {
    title: 'White Label SEO',
    icon: '🏷️',
    description: 'Agency-focused SEO services that you can resell to your clients at 2-3x markup for maximum profit.',
    longDescription: 'Our white label SEO services are designed specifically for agencies. We provide all the tools, reporting, and support you need to offer professional SEO services to your clients under your own brand.',
    tiers: [
      {
        name: 'Starter SEO',
        price: '$1,200',
        period: 'month',
        popular: false,
        features: [
          '20 keywords (local focus)',
          'Google Business optimization',
          'On-page SEO + local citations',
          'Basic backlink building',
          'Monthly report (agency-branded)',
          'White-label support',
          'Client dashboard access'
        ]
      },
      {
        name: 'Growth SEO',
        price: '$3,500',
        period: 'month',
        popular: true,
        features: [
          '60 keywords (local + regional/national)',
          'Full technical SEO audit & fixes',
          '4 SEO-optimized blogs/month',
          'Competitor analysis + tracking',
          'White-hat backlinks',
          'Live dashboard (whitelabel)',
          'Agency training materials',
          'Dedicated account manager'
        ]
      },
      {
        name: 'Dominate SEO',
        price: '$8,000',
        period: 'month',
        popular: false,
        features: [
          '150 keywords (local + national)',
          'Enterprise technical SEO + architecture',
          'Advanced backlink & PR outreach',
          '8+ blogs/month + automation',
          'Multi-location SEO',
          'Dedicated account manager (invisible to client)',
          'Custom reporting tools',
          'Priority support'
        ]
      }
    ]
  },
  'white-label-website': {
    title: 'White Label Website Design',
    icon: '🖥️',
    description: 'Professional website design services for agencies to resell at 2-3x markup with full white-label support.',
    longDescription: 'Our white label website design services allow agencies to offer professional web development under their own brand. We handle all the technical work while you maintain the client relationship.',
    tiers: [
      {
        name: 'Starter Website',
        price: '$1,000',
        period: 'one-time',
        popular: false,
        features: [
          'Up to 5 SEO-optimized pages',
          'Responsive, mobile-friendly',
          'Basic SEO setup',
          'Google Analytics + Search Console',
          'White-label delivery',
          'Agency branding options'
        ]
      },
      {
        name: 'Growth Website',
        price: '$3,500',
        period: 'one-time',
        popular: true,
        features: [
          '10–15 SEO-optimized pages',
          'Service + location landing pages',
          'Keyword-targeted copywriting',
          'Lead capture forms (CRM/email)',
          'Blog system setup',
          'White-label branding',
          'Agency dashboard access',
          'Client training materials'
        ]
      },
      {
        name: 'Dominate Website',
        price: '$7,500+',
        period: 'one-time',
        popular: false,
        features: [
          '20–30+ custom pages',
          'Conversion funnels (e-com, bookings, memberships)',
          'Multi-location SEO',
          'Advanced schema markup',
          'Custom integrations (dashboards, APIs)',
          'Full white-label support',
          'Dedicated project manager',
          'Priority development'
        ]
      }
    ]
  }
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const [selectedTier, setSelectedTier] = useState(1) // Default to middle tier
  const service = serviceData[params.slug as keyof typeof serviceData]

  if (!service) {
    notFound()
  }

  const currentTier = service.tiers[selectedTier]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-24">
      {/* Header */}
      <div className="section-padding bg-white border-b border-gray-200">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto">
            <div className="text-6xl mb-6">{service.icon}</div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 text-balance">
              {service.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8 text-balance">
              {service.longDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary text-lg px-10 py-4">
                Get Started
              </Link>
              <Link href="/pricing" className="btn-secondary text-lg px-10 py-4">
                View All Pricing
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select the pricing tier that best fits your needs and budget.
            </p>
          </div>

          {/* Pricing Dropdown */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <select
                value={selectedTier}
                onChange={(e) => setSelectedTier(Number(e.target.value))}
                className="w-full appearance-none bg-white border-2 border-gray-200 rounded-2xl px-6 py-4 text-lg font-semibold text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
              >
                {service.tiers.map((tier, index) => (
                  <option key={index} value={index}>
                    {tier.name} - {tier.price} {tier.period === 'month' ? 'per month' : 'one-time'}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
            </div>
          </div>

          {/* Selected Tier Details */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-large border border-gray-200 overflow-hidden">
              <div className="p-8 border-b border-gray-200">
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    {currentTier.name}
                  </h3>
                  <div className="text-5xl font-bold text-primary-600 mb-2">
                    {currentTier.price}
                  </div>
                  <div className="text-lg text-gray-500 mb-4">
                    {currentTier.period === 'month' ? 'per month' : 'one-time payment'}
                  </div>
                  {currentTier.popular && (
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-800 text-sm font-semibold">
                      <Star className="w-4 h-4 mr-2" />
                      Most Popular Choice
                    </div>
                  )}
                </div>
              </div>

              <div className="p-8">
                <h4 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  What's Included
                </h4>
                <div className="grid md:grid-cols-2 gap-6">
                  {currentTier.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-success-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 bg-gray-50">
                <div className="text-center">
                  <Link
                    href="/contact"
                    className={`inline-flex items-center text-lg px-10 py-4 rounded-xl font-semibold transition-all duration-200 ${
                      currentTier.popular
                        ? 'btn-primary'
                        : 'btn-secondary'
                    }`}
                  >
                    Get Started with {currentTier.name}
                    <ArrowRight className="ml-2" size={20} />
                  </Link>
                  <p className="text-sm text-gray-500 mt-4">
                    No setup fees • Cancel anytime • 30-day money-back guarantee
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="section-padding bg-gradient-to-r from-primary-600 to-accent-600">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Let's discuss your project and find the perfect solution for your business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-secondary bg-white text-primary-600 hover:bg-gray-100 text-lg px-10 py-4">
              Schedule Consultation
            </Link>
            <Link href="tel:+14041234567" className="btn-ghost border-white text-white hover:bg-white hover:text-primary-600 text-lg px-10 py-4">
              Call (401) 123-4567
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

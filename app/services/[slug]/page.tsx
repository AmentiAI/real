import { Metadata } from 'next'
import { CheckCircle, Star, Phone, ArrowRight, Clock, Users, Target, TrendingUp, Sparkles, Shield, Zap, Award, Globe, BarChart3 } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { query } from '@/lib/db'

interface Service {
  slug: string
  title: string
  description: string
  longDescription: string
  icon: string
  category: string
  keywords?: string
  features: string[]
  benefits: string[]
  process: Array<{
    step: number
    title: string
    description: string
  }>
  pricing: Array<{
    name: string
    price: string
    period: string
    popular: boolean
    features: string[]
  }>
  faqs: Array<{
    question: string
    answer: string
  }>
  featured_image?: string | null
  // SEO fields
  meta_title?: string
  meta_description?: string
  og_title?: string
  og_description?: string
  og_image?: string
  canonical_url?: string
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = await getService(params.slug)
  
  if (!service) {
    return {
      title: 'Service Not Found',
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://amentiai.com'
  const canonicalUrl = service.canonical_url || `${baseUrl}/services/${params.slug}`
  const ogImage = service.og_image || service.featured_image || `${baseUrl}/images/og-default.jpg`
  
  // Use database SEO fields when available, fallback to generated ones
  const metaTitle = service.meta_title || `${service.title} - Amenti AI Digital Marketing Services`
  const metaDescription = service.meta_description || service.longDescription || service.description
  const ogTitle = service.og_title || metaTitle
  const ogDescription = service.og_description || metaDescription

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: service.keywords || 'digital marketing, SEO, web design',
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonicalUrl,
      siteName: 'Amenti AI',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: [ogImage],
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
}

async function getService(slug: string): Promise<Service | undefined> {
  // First, try to get the service from the database
  try {
    const result = await query('SELECT * FROM pages WHERE slug = $1 AND published = true', [`services/${slug}`])
    if (result.rows.length > 0) {
      const dbService = result.rows[0]
      
      // Parse content if it's JSON
      let content: any = {}
      try {
        content = JSON.parse(dbService.content || '{}')
      } catch (e) {
        content = {}
      }

      // Fetch pricing from packages API
      let pricing: Array<{
        name: string
        price: string
        period: string
        popular: boolean
        features: string[]
      }> = []

      try {
        const packagesResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/packages`)
        const packagesData = await packagesResponse.json()
        
        if (packagesData.success) {
          // Map packages to pricing format
          pricing = packagesData.data.map((pkg: any) => ({
            name: pkg.name,
            price: new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: pkg.currency
            }).format(pkg.price),
            period: pkg.billing_period === 'one-time' ? 'one-time' : `/${pkg.billing_period}`,
            popular: pkg.is_popular,
            features: pkg.features || []
          }))
        }
      } catch (error) {
        console.error('Error fetching pricing data:', error)
      }
      
      // Return database service with parsed content
      return {
        slug: slug,
        title: dbService.title,
        description: dbService.description,
        longDescription: content.longDescription || dbService.description,
        icon: content.icon || '🎯',
        category: content.category || 'Services',
        keywords: dbService.meta_keywords,
        features: content.features || [],
        benefits: content.benefits || [],
        process: content.process || [],
        pricing: pricing.length > 0 ? pricing : content.pricing || [],
        faqs: content.faqs || [],
        featured_image: dbService.featured_image,
        // SEO fields from database
        meta_title: dbService.meta_title,
        meta_description: dbService.meta_description,
        og_title: dbService.og_title,
        og_description: dbService.og_description,
        og_image: dbService.og_image,
        canonical_url: dbService.canonical_url
      }
    }
  } catch (error) {
    console.error('Error fetching service from database:', error)
  }
  
  // Fetch pricing from packages API for fallback
  let fallbackPricing: Array<{
    name: string
    price: string
    period: string
    popular: boolean
    features: string[]
  }> = []

  try {
    const packagesResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/packages`)
    const packagesData = await packagesResponse.json()
    
    if (packagesData.success) {
      // Map packages to pricing format
      fallbackPricing = packagesData.data.map((pkg: any) => ({
        name: pkg.name,
        price: new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: pkg.currency
        }).format(pkg.price),
        period: pkg.billing_period === 'one-time' ? 'one-time' : `/${pkg.billing_period}`,
        popular: pkg.is_popular,
        features: pkg.features || []
      }))
    }
  } catch (error) {
    console.error('Error fetching pricing data for fallback:', error)
  }

  // Fall back to hardcoded data if not found in database
  const services = [
    {
      slug: 'website-design-development',
      title: 'Website Design & Development',
      description: 'Professional websites that convert visitors into customers with modern design and advanced functionality.',
      longDescription: 'Transform your online presence with our comprehensive website design and development services. We create stunning, high-converting websites that not only look exceptional but also deliver measurable business results. Our expert team combines cutting-edge design principles with advanced development technologies to build websites that are fast, secure, mobile-responsive, and optimized for search engines. From initial concept to final launch, we ensure every aspect of your website is crafted to perfection, providing your business with a powerful digital foundation that drives growth and enhances customer engagement.',
      icon: '🎨',
      category: 'Development',
      keywords: 'website design, web development, responsive design, custom websites',
      features: [
        'Custom responsive design',
        'Mobile-first approach',
        'Fast loading speeds',
        'SEO optimized',
        'Content management system',
        'E-commerce functionality',
        'Security features',
        'Analytics integration'
      ],
      benefits: [
        'Increase online visibility',
        'Improve user experience',
        'Boost conversion rates',
        'Professional brand image',
        'Mobile accessibility',
        'Search engine optimization'
      ],
      process: [
        {
          step: 1,
          title: 'Discovery & Planning',
          description: 'We analyze your business goals and create a comprehensive website strategy.'
        },
        {
          step: 2,
          title: 'Design & Prototyping',
          description: 'Our designers create wireframes and visual designs that align with your brand.'
        },
        {
          step: 3,
          title: 'Development & Testing',
          description: 'We build your website using the latest technologies and thoroughly test it.'
        },
        {
          step: 4,
          title: 'Launch & Optimization',
          description: 'We launch your website and provide ongoing optimization and support.'
        }
      ],
      pricing: fallbackPricing.length > 0 ? fallbackPricing : [
        {
          name: 'Starter Website',
          price: '$2,200',
          period: 'one-time',
          popular: false,
          features: [
            '5-page responsive website',
            'Mobile-optimized design',
            'Contact forms',
            'Basic SEO setup',
            'SSL certificate',
            '1 month free hosting'
          ]
        },
        {
          name: 'Business Website',
          price: 'Contact for pricing',
          period: 'one-time',
          popular: true,
          features: [
            '10-15 page custom website',
            'Advanced design & animations',
            'E-commerce functionality',
            'Advanced SEO optimization',
            'Performance optimization',
            '3 months free hosting'
          ]
        },
        {
          name: 'Enterprise Website',
          price: '$12,500',
          period: 'one-time',
          popular: false,
          features: [
            '20+ page enterprise site',
            'Custom functionality',
            'Advanced integrations',
            'Multi-language support',
            'Advanced analytics setup',
            '6 months free hosting'
          ]
        }
      ],
      faqs: [
        {
          question: 'How long does it take to build a website?',
          answer: 'Most websites are completed within 4-8 weeks, depending on complexity and scope.'
        },
        {
          question: 'Do you provide ongoing maintenance?',
          answer: 'Yes, we offer maintenance packages to keep your website updated and secure.'
        },
        {
          question: 'Will my website be mobile-friendly?',
          answer: 'Absolutely! All our websites are built mobile-first and fully responsive.'
        }
        ],
        featured_image: null,
        // SEO fields with defaults
        meta_title: undefined,
        meta_description: undefined,
        og_title: undefined,
        og_description: undefined,
        og_image: undefined,
        canonical_url: undefined
    },
    {
      slug: 'seo-services',
      title: 'SEO Services',
      description: 'Comprehensive SEO strategies that dominate search results and drive qualified traffic to your business.',
      longDescription: 'Dominate search results and drive qualified traffic to your business with our comprehensive SEO services. Our data-driven approach combines technical expertise with strategic content optimization to deliver sustainable, long-term growth in search engine rankings. We conduct thorough audits of your current online presence, identify opportunities for improvement, and implement proven strategies that align with Google\'s ever-evolving algorithms. From local SEO optimization to enterprise-level technical implementations, our team ensures your business appears prominently when potential customers are actively searching for your products or services.',
      icon: '🔍',
      category: 'SEO',
      keywords: 'SEO services, search engine optimization, local SEO, organic traffic',
      features: [
        'Keyword research & strategy',
        'On-page optimization',
        'Technical SEO audits',
        'Local SEO optimization',
        'Content optimization',
        'Link building',
        'Performance tracking',
        'Monthly reporting'
      ],
      benefits: [
        'Increase organic traffic',
        'Improve search rankings',
        'Generate more leads',
        'Build brand authority',
        'Long-term results',
        'Higher ROI'
      ],
      process: [
        {
          step: 1,
          title: 'SEO Audit & Analysis',
          description: 'We conduct a comprehensive analysis of your current SEO performance.'
        },
        {
          step: 2,
          title: 'Strategy Development',
          description: 'We create a customized SEO strategy based on your business goals.'
        },
        {
          step: 3,
          title: 'Implementation',
          description: 'We implement on-page and technical SEO improvements.'
        },
        {
          step: 4,
          title: 'Ongoing Optimization',
          description: 'We continuously monitor and optimize your SEO performance.'
        }
      ],
      pricing: fallbackPricing.length > 0 ? fallbackPricing : [
        {
          name: 'Local Starter',
          price: '$1,200',
          period: '/month',
          popular: false,
          features: [
            '20 local keywords optimized',
            'Google Business Profile optimization',
            'Local citation building',
            'Monthly SEO reports',
            'Basic technical SEO audit',
            'Email support'
          ]
        },
        {
          name: 'Business Growth',
          price: 'Contact for pricing',
          period: '/month',
          popular: true,
          features: [
            '50 targeted keywords',
            'Advanced technical SEO',
            'Content marketing strategy',
            'Link building campaign',
            'Monthly strategy calls',
            'Priority support'
          ]
        },
        {
          name: 'Enterprise',
          price: 'Contact for pricing',
          period: '/month',
          popular: false,
          features: [
            '100+ keywords strategy',
            'Full technical SEO overhaul',
            'Advanced content marketing',
            'White-label link building',
            'Dedicated account manager',
            '24/7 priority support'
          ]
        }
      ],
      faqs: [
        {
          question: 'How long does it take to see SEO results?',
          answer: 'SEO results typically start showing within 3-6 months, with significant improvements in 6-12 months.'
        },
        {
          question: 'Do you guarantee first page rankings?',
          answer: 'While we cannot guarantee specific rankings, we have a proven track record of improving search visibility.'
        },
        {
          question: 'What makes your SEO different?',
          answer: 'We focus on sustainable, white-hat SEO strategies that provide long-term results.'
        }
        ],
        featured_image: null,
        // SEO fields with defaults
        meta_title: undefined,
        meta_description: undefined,
        og_title: undefined,
        og_description: undefined,
        og_image: undefined,
        canonical_url: undefined
    },
    {
      slug: 'branding-identity',
      title: 'Branding & Identity Design',
      description: 'Create a memorable brand identity that resonates with your target audience and drives business growth.',
      longDescription: 'Build a powerful brand identity that resonates with your target audience and drives business success. Our comprehensive branding services go far beyond logo design, creating cohesive visual and verbal identities that communicate your unique value proposition effectively. We develop brand strategies that differentiate your business in competitive markets, establish emotional connections with customers, and build lasting brand loyalty. From initial brand discovery and positioning to complete visual identity systems and brand guidelines, we ensure every touchpoint reflects your brand\'s personality and values, creating a memorable and impactful brand experience that drives customer engagement and business growth.',
      icon: '🎨',
      category: 'Design',
      keywords: 'branding, logo design, brand identity, visual identity',
      features: [
        'Logo design & variations',
        'Brand guidelines',
        'Color palette development',
        'Typography selection',
        'Business card design',
        'Letterhead & stationery',
        'Brand voice & messaging',
        'Style guide creation'
      ],
      benefits: [
        'Professional brand image',
        'Consistent visual identity',
        'Increased brand recognition',
        'Competitive differentiation',
        'Customer trust & loyalty',
        'Marketing effectiveness'
      ],
      process: [
        {
          step: 1,
          title: 'Brand Discovery',
          description: 'We research your industry, target audience, and competitive landscape.'
        },
        {
          step: 2,
          title: 'Strategy Development',
          description: 'We create a comprehensive brand strategy and positioning.'
        },
        {
          step: 3,
          title: 'Visual Identity',
          description: 'We design logos, colors, typography, and brand guidelines.'
        },
        {
          step: 4,
          title: 'Brand Application',
          description: 'We apply your brand across various touchpoints and materials.'
        }
      ],
      pricing: fallbackPricing.length > 0 ? fallbackPricing : [
        {
          name: 'Basic Branding',
          price: 'Contact for pricing',
          period: 'one-time',
          popular: false,
          features: [
            'Logo design (3 concepts)',
            'Basic brand guidelines',
            'Color palette',
            'Typography selection',
            'Business card design',
            '1 round of revisions'
          ]
        },
        {
          name: 'Complete Branding',
          price: 'Contact for pricing',
          period: 'one-time',
          popular: true,
          features: [
            'Logo design (5 concepts)',
            'Complete brand guidelines',
            'Extended color palette',
            'Typography system',
            'Business card & stationery',
            'Brand voice guidelines',
            '3 rounds of revisions'
          ]
        },
        {
          name: 'Enterprise Branding',
          price: '$10,000',
          period: 'one-time',
          popular: false,
          features: [
            'Comprehensive brand strategy',
            'Multiple logo variations',
            'Complete brand system',
            'Brand application examples',
            'Brand training materials',
            'Unlimited revisions',
            '6 months support'
          ]
        }
      ],
      faqs: [
        {
          question: 'How long does the branding process take?',
          answer: 'The branding process typically takes 4-6 weeks from initial concept to final delivery.'
        },
        {
          question: 'Do you provide brand guidelines?',
          answer: 'Yes, all our branding packages include comprehensive brand guidelines for consistent application.'
        },
        {
          question: 'Can I see examples of your work?',
          answer: 'Absolutely! Check out our portfolio section to see examples of our branding projects.'
        }
        ],
        featured_image: null,
        // SEO fields with defaults
        meta_title: undefined,
        meta_description: undefined,
        og_title: undefined,
        og_description: undefined,
        og_image: undefined,
        canonical_url: undefined
    },
    {
      slug: 'complete-growth-packages',
      title: 'Complete Growth Packages',
      description: 'All-in-one digital marketing solutions that combine website development with ongoing SEO and marketing.',
      longDescription: 'Accelerate your business growth with our comprehensive digital marketing packages that provide everything needed to establish and dominate your market presence. Our complete growth packages combine professional website development with ongoing SEO optimization, content marketing, social media management, and paid advertising strategies. We take a holistic approach to digital marketing, ensuring all components work together seamlessly to maximize your return on investment. From initial website creation to long-term growth strategies, our dedicated team manages every aspect of your digital presence, allowing you to focus on running your business while we drive qualified leads and increase your online visibility.',
      icon: '🚀',
      category: 'Growth',
      keywords: 'complete marketing packages, all-in-one marketing, growth packages',
      features: [
        'Professional website development',
        'Comprehensive SEO strategy',
        'Content marketing',
        'Social media management',
        'Google Ads management',
        'Analytics & reporting',
        'Monthly strategy calls',
        'Dedicated account manager'
      ],
      benefits: [
        'Complete digital presence',
        'Integrated marketing strategy',
        'Faster time to market',
        'Consistent brand messaging',
        'Higher ROI',
        'Ongoing optimization'
      ],
      process: [
        {
          step: 1,
          title: 'Strategy & Planning',
          description: 'We develop a comprehensive digital marketing strategy tailored to your business.'
        },
        {
          step: 2,
          title: 'Website Development',
          description: 'We create a professional website optimized for conversions and SEO.'
        },
        {
          step: 3,
          title: 'SEO Implementation',
          description: 'We implement technical SEO and content optimization strategies.'
        },
        {
          step: 4,
          title: 'Ongoing Growth',
          description: 'We continuously optimize and scale your digital presence for growth.'
        }
      ],
      pricing: fallbackPricing.length > 0 ? fallbackPricing : [
        {
          name: 'Growth Starter',
          price: '$2,200',
          period: '+ $1,200/month',
          popular: false,
          features: [
            '5-page SEO-ready website',
            '20 local keywords optimized',
            'Google Business optimization',
            'Monthly SEO reports',
            '3 months free hosting',
            'Email support'
          ]
        },
        {
          name: 'Growth Business',
          price: 'Contact for pricing',
          period: 'Contact for pricing',
          popular: true,
          features: [
            '10-15 page premium website',
            '60 targeted keywords',
            'Technical SEO audit & fixes',
            '4 blog posts per month',
            'Social media integration',
            'Advanced analytics & tracking',
            'Monthly strategy calls',
            'Priority support'
          ]
        },
        {
          name: 'Growth Enterprise',
          price: '$12,500',
          period: '+ $8,000/month',
          popular: false,
          features: [
            '20-30+ page enterprise website',
            '150 targeted keywords',
            'Advanced backlink outreach',
            'Content marketing strategy',
            'Social media management',
            'Paid advertising setup',
            'Dedicated account manager',
            'Custom reporting dashboard',
            '24/7 priority support'
          ]
        }
      ],
      faqs: [
        {
          question: 'What\'s included in the setup fee?',
          answer: 'The setup fee covers website development, initial SEO setup, and all one-time configuration work.'
        },
        {
          question: 'Can I customize the monthly services?',
          answer: 'Yes, we can customize the monthly services based on your specific business needs and goals.'
        },
        {
          question: 'Is there a contract?',
          answer: 'We work on a month-to-month basis with no long-term contracts required.'
        }
        ],
        featured_image: null,
        // SEO fields with defaults
        meta_title: undefined,
        meta_description: undefined,
        og_title: undefined,
        og_description: undefined,
        og_image: undefined,
        canonical_url: undefined
    }
  ]
  
  return services.find(service => service.slug === slug)
}

export default async function ServicePage({ params }: { params: { slug: string } }) {
  const service = await getService(params.slug)
  
  if (!service) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Enhanced Hero Section */}
      <section className="relative pt-24 pb-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="text-center">
            {/* Service Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm font-medium mb-8">
              <Sparkles className="w-5 h-5 mr-2" />
              {service.category} Services
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              {service.title}
            </h1>

            {/* Subheadline */}
            <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-12">
              {service.longDescription}
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link
                href="/checkout"
                className="group inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transform"
              >
                Get Started Today
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <a
                href="tel:+14011234567"
                className="group inline-flex items-center justify-center px-10 py-5 bg-white/10 backdrop-blur-md text-white font-semibold rounded-2xl border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:scale-105 transform"
              >
                <Phone className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                Call (401) 123-4567
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">Free</div>
                <div className="text-blue-200 text-sm font-medium">Consultation</div>
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
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-full text-blue-700 text-sm font-medium mb-8 shadow-lg">
              <Target className="w-5 h-5 mr-2" />
              What You Get
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-8">
              Comprehensive Solutions That Deliver
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Every feature is designed to deliver measurable results and drive your business forward with professional implementation and ongoing optimization.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.features?.map((feature, index) => (
              <div key={index} className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 transform border border-white/50">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">{feature}</h3>
                </div>
                <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
                  Professional implementation with ongoing support and optimization to ensure maximum impact for your business.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Impact Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Real Business Impact
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              See the measurable results our {service.title.toLowerCase()} delivers for businesses like yours.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.benefits?.map((benefit, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{benefit}</h3>
                <p className="text-slate-600">
                  Proven strategies that drive growth and deliver measurable ROI for your business.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              How We Work
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our proven methodology ensures your project delivers exceptional results on time and on budget.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.process?.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-20 h-20 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 text-center">{step.title}</h3>
                <p className="text-slate-600 text-center leading-relaxed">{step.description}</p>
                {index < service.process.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-blue-200 to-transparent transform translate-x-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Investment Options
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Transparent pricing with flexible options designed to fit your business goals and budget.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {service.pricing?.map((plan, index) => (
              <div key={index} className={`bg-white rounded-3xl p-8 shadow-lg border-2 hover:shadow-xl transition-all duration-300 ${plan.popular ? 'border-blue-500 relative scale-105' : 'border-slate-200'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center shadow-lg">
                      <Star className="w-4 h-4 mr-2" />
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-slate-900">{plan.price}</span>
                    <span className="text-slate-600 ml-2 text-lg">{plan.period}</span>
                  </div>
                  <p className="text-slate-600">Perfect for growing businesses</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  {plan.features?.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-slate-600 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Link
                  href="/checkout"
                  className={`w-full block font-bold px-8 py-4 rounded-xl transition-all duration-200 text-center text-lg ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl'
                      : 'bg-slate-100 text-slate-900 hover:bg-slate-200 border-2 border-slate-200'
                  }`}
                >
                  Choose This Plan
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Common Questions
            </h2>
            <p className="text-xl text-slate-600">
              Get answers to the most frequently asked questions about our {service.title.toLowerCase()}.
            </p>
          </div>
          
          <div className="space-y-6">
            {service.faqs?.map((faq, index) => (
              <div key={index} className="bg-gradient-to-r from-slate-50 to-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-blue-600 font-bold text-sm">Q</span>
                  </div>
                  {faq.question}
                </h3>
                <p className="text-slate-600 leading-relaxed ml-12">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep Dive Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {service.slug === 'website-design-development' && (
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8">Why Professional Website Development Matters</h2>
                <div className="space-y-6">
                  <p className="text-lg text-slate-600 leading-relaxed">
                    In today's digital-first world, your website serves as the cornerstone of your business's online presence. 
                    A professionally designed and developed website goes beyond mere aesthetics—it's a powerful business tool 
                    that can significantly impact your bottom line.
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Our website development process begins with a comprehensive analysis of your business goals, target audience, 
                    and competitive landscape. We don't just build websites; we create digital experiences that convert visitors 
                    into customers.
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Technical excellence is at the core of our development approach. We utilize modern frameworks and coding 
                    standards to ensure your website loads quickly, functions flawlessly across all devices, and remains secure 
                    against potential threats.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Key Statistics</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                    <span className="font-semibold text-slate-900">First Impression Time</span>
                    <span className="text-2xl font-bold text-blue-600">0.05s</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                    <span className="font-semibold text-slate-900">Mobile Traffic</span>
                    <span className="text-2xl font-bold text-green-600">60%+</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
                    <span className="font-semibold text-slate-900">Conversion Impact</span>
                    <span className="text-2xl font-bold text-purple-600">3x</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {service.slug === 'seo-services' && (
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8">The Science Behind Effective SEO</h2>
                <div className="space-y-6">
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Search Engine Optimization is a complex, ever-evolving discipline that requires deep technical knowledge 
                    and strategic thinking. Our SEO services are built on a foundation of data analysis, technical expertise, 
                    and proven methodologies.
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Our comprehensive SEO audit process examines every aspect of your digital presence, from technical 
                    infrastructure to content quality and user experience. We identify opportunities that competitors 
                    might miss and develop strategies that align with your specific business objectives.
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Local SEO is particularly crucial for businesses serving specific geographic areas. We optimize your 
                    Google Business Profile, manage local citations, and implement location-based strategies.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">SEO Performance</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                    <span className="font-semibold text-slate-900">Average Traffic Increase</span>
                    <span className="text-2xl font-bold text-blue-600">200%+</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                    <span className="font-semibold text-slate-900">Time to Results</span>
                    <span className="text-2xl font-bold text-green-600">3-6mo</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
                    <span className="font-semibold text-slate-900">ROI Improvement</span>
                    <span className="text-2xl font-bold text-purple-600">400%+</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {service.slug === 'branding-identity' && (
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8">Building Brands That Last</h2>
                <div className="space-y-6">
                  <p className="text-lg text-slate-600 leading-relaxed">
                    A strong brand identity is one of the most valuable assets any business can possess. It's the visual 
                    and emotional connection that customers form with your company, influencing their purchasing decisions 
                    and building long-term loyalty.
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Our brand development process begins with extensive research into your industry, target market, and 
                    competitive landscape. We conduct interviews with key stakeholders, analyze customer preferences, 
                    and identify unique positioning opportunities.
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Visual identity development encompasses logo design, color palettes, typography systems, and graphic 
                    elements that work together to create a cohesive brand experience.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Brand Impact</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                    <span className="font-semibold text-slate-900">Brand Recognition</span>
                    <span className="text-2xl font-bold text-blue-600">85%+</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                    <span className="font-semibold text-slate-900">Customer Loyalty</span>
                    <span className="text-2xl font-bold text-green-600">3x</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
                    <span className="font-semibold text-slate-900">Market Premium</span>
                    <span className="text-2xl font-bold text-purple-600">23%</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {service.slug === 'complete-growth-packages' && (
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8">Comprehensive Digital Growth Solutions</h2>
                <div className="space-y-6">
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Building a successful online presence requires more than individual marketing tactics—it demands a 
                    coordinated, strategic approach that aligns all digital marketing efforts toward common business 
                    objectives.
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Our holistic approach begins with professional website development, creating a strong foundation 
                    that serves as the hub for all your digital marketing activities. We then layer on comprehensive 
                    SEO strategies, content marketing initiatives, and paid advertising campaigns.
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Content marketing forms a crucial part of our growth strategy, with regular blog posts, case studies, 
                    and resource creation that establish your business as an industry authority.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Growth Results</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                    <span className="font-semibold text-slate-900">Average Growth</span>
                    <span className="text-2xl font-bold text-blue-600">300%+</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                    <span className="font-semibold text-slate-900">Lead Generation</span>
                    <span className="text-2xl font-bold text-green-600">5x</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
                    <span className="font-semibold text-slate-900">Revenue Impact</span>
                    <span className="text-2xl font-bold text-purple-600">250%+</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
            Join hundreds of successful businesses that have grown with our {service.title.toLowerCase()}. 
            Let's discuss how we can help you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/checkout" className="bg-white text-blue-600 font-bold px-10 py-4 rounded-xl hover:bg-blue-50 transition-all duration-200 text-lg shadow-lg hover:shadow-xl flex items-center justify-center">
              Get Started Today
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <a href="tel:+14011234567" className="border-2 border-white text-white font-bold px-10 py-4 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-200 text-lg flex items-center justify-center">
              <Phone className="w-5 h-5 mr-2" />
              Call (401) 123-4567
            </a>
          </div>
          <div className="mt-12 flex items-center justify-center space-x-8 text-blue-100">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>Free Consultation</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>No Long-term Contracts</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>30-Day Money Back</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
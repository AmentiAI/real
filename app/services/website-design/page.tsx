'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Star, ChevronDown, Monitor, Smartphone, Globe, Zap, Shield, Search, Users, BarChart3, Settings, Database, Code, Palette, Layers, Eye, MousePointer, Smartphone2, Tablet, Laptop, Desktop, Wifi, WifiOff, Signal, SignalHigh, SignalLow, Battery, BatteryCharging, Power, PowerOff, Volume2, VolumeX, Mic, MicOff, Camera, Video, VideoOff, Image, File, Folder, FolderOpen, Archive, Inbox, Send, Mail, MailOpen, Reply, Forward, Share2, Copy2, Cut, Scissors, Paste, Clipboard, ClipboardList, ClipboardCheck, ClipboardCopy, ClipboardX, FilePlus, FileMinus, FileX, FileCheck, FileEdit, FileSearch, FileText, FileText2, FileCode, FileImage, FileVideo, FileAudio, FileZip, FilePdf, FileWord, FileExcel, FilePowerpoint, FileCsv, FileJson, FileXml, FileHtml, FileCss, FileJs, FileTs, FileJsx, FileTsx, FileVue, FileReact, FileAngular, FileSvelte, FilePhp, FilePython, FileJava, FileC, FileCpp, FileCsharp, FileGo, FileRust, FileSwift, FileKotlin, FileDart, FileR, FileRuby, FilePerl, FileLua, FileBash, FileSh, FileBat, FileCmd, FilePs1, FileYaml, FileToml, FileIni, FileEnv, FileGitignore, FileDockerfile, FileMakefile, FileReadme, FileLicense, FileChangelog, FileContributing, FileSecurity, FileCodeowners, FileEditorconfig, FilePrettier, FileEslint, FileBabel, FileWebpack, FileRollup, FileVite, FileParcel, FileGulp, FileGrunt, FileNpm, FileYarn, FilePnpm, FileBun, FileDeno, FileNode, FileExpress, FileKoa, FileHapi, FileFastify, FileNest, FileNext, FileNuxt, FileSvelteKit, FileRemix, FileGatsby, FileAstro, FileSolid, FileQwik, FileLit, FileStencil, FileAlpine, FileMithril, FileHyperapp, FileInferno, FilePreact, FileRiot, FileMarko, FileMithril2, FilePolymer, FileAurelia, FileBackbone, FileEmber, FileKnockout, FileMithril3, FileRactive, FileRivets, FileRivets2, FileRivets3, FileRivets4, FileRivets5, FileRivets6, FileRivets7, FileRivets8, FileRivets9, FileRivets10, Clock, Phone, MessageSquare, Calendar, Headphones, Target, Award, TrendingUp, DollarSign, PieChart, TrendingDown, AlertCircle, CheckCircle2, XCircle, Info, ExternalLink, Download, Play, Pause, RefreshCw, Lock, Unlock, Filter, SortAsc, SortDesc, MoreHorizontal, MoreVertical, Plus, Minus, Edit, Trash2, Save, Copy, Share, Bookmark, Heart, ThumbsUp, ThumbsDown, Flag, Report, HelpCircle, QuestionMarkCircle, Lightbulb, Bulb, Idea, Brain, Cpu, HardDrive, ShoppingCart } from 'lucide-react'

const service = {
  title: 'Website Design & Development',
  icon: '🖥️',
  description: 'Professional websites that convert visitors into customers with modern design and advanced functionality.',
  longDescription: 'We build websites that don\'t just look great—they perform. Our custom websites are designed to rank in search engines, convert visitors into customers, and grow with your business. From simple brochure sites to complex e-commerce platforms, we create digital experiences that drive results.',
  tiers: [
    {
      name: 'Starter Website',
      price: '$1,000',
      setupPrice: '$1,000',
      monthlyPrice: '$0',
      period: 'one-time',
      popular: false,
      icon: Monitor,
      bestFor: 'small businesses, startups, personal brands',
      features: [
        'Up to 5 SEO-ready pages',
        'Mobile-friendly design',
        'Basic SEO setup',
        'Google Analytics',
        'Contact forms',
        'Social media integration',
        'Basic hosting setup',
        'SSL certificate included'
      ]
    },
    {
      name: 'Growth Website',
      price: '$3,500',
      setupPrice: '$3,500',
      monthlyPrice: '$0',
      period: 'one-time',
      popular: true,
      icon: Globe,
      bestFor: 'growing businesses, service companies',
      features: [
        '10-15 SEO-optimized pages',
        'Keyword-targeted copywriting',
        'Lead capture forms',
        'Blog system setup',
        'Advanced analytics',
        'CRM integration',
        'Email marketing setup',
        'Performance optimization'
      ]
    },
    {
      name: 'Dominate Website',
      price: '$7,500+',
      setupPrice: '$7,500',
      monthlyPrice: '$0',
      period: 'one-time',
      popular: false,
      icon: Zap,
      bestFor: 'enterprises, e-commerce, franchises',
      features: [
        '20-30+ pages',
        'Conversion funnels',
        'Multi-location SEO',
        'Custom integrations',
        'Advanced e-commerce',
        'Member portals',
        'API integrations',
        'Custom dashboards'
      ]
    }
  ]
}

const technologies = [
  {
    category: 'Frontend',
    icon: Palette,
    items: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js']
  },
  {
    category: 'Backend',
    icon: Database,
    items: ['Node.js', 'Express.js', 'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL']
  },
  {
    category: 'E-commerce',
    icon: ShoppingCart,
    items: ['Shopify', 'WooCommerce', 'Stripe', 'PayPal', 'Square', 'Custom Solutions']
  },
  {
    category: 'CMS',
    icon: Settings,
    items: ['WordPress', 'Strapi', 'Sanity', 'Contentful', 'Custom Admin', 'Headless CMS']
  },
  {
    category: 'Hosting',
    icon: Globe,
    items: ['Vercel', 'Netlify', 'AWS', 'Google Cloud', 'CDN', 'SSL Security']
  },
  {
    category: 'Analytics',
    icon: BarChart3,
    items: ['Google Analytics', 'Hotjar', 'Mixpanel', 'Custom Tracking', 'A/B Testing', 'Conversion Optimization']
  }
]

const designProcess = [
  {
    step: '01',
    title: 'Discovery & Strategy',
    description: 'We analyze your business, target audience, and competitors to create a winning strategy',
    duration: '1 week',
    deliverables: ['Brand analysis', 'User personas', 'Competitor research', 'Technical requirements', 'Content strategy']
  },
  {
    step: '02',
    title: 'Design & Wireframing',
    description: 'Create stunning visual designs and user experience flows that convert',
    duration: '1-2 weeks',
    deliverables: ['Wireframes', 'Visual designs', 'Mobile mockups', 'Interactive prototypes', 'Design system']
  },
  {
    step: '03',
    title: 'Development & Coding',
    description: 'Build your website with clean, fast, and SEO-optimized code',
    duration: '2-4 weeks',
    deliverables: ['Responsive development', 'SEO implementation', 'Performance optimization', 'Cross-browser testing', 'Mobile optimization']
  },
  {
    step: '04',
    title: 'Content & Integration',
    description: 'Add your content, integrate third-party services, and set up analytics',
    duration: '1 week',
    deliverables: ['Content migration', 'Third-party integrations', 'Analytics setup', 'Form configurations', 'Payment processing']
  },
  {
    step: '05',
    title: 'Testing & Launch',
    description: 'Thoroughly test everything and launch your website to the world',
    duration: '1 week',
    deliverables: ['Quality assurance', 'Performance testing', 'Security audit', 'Launch checklist', 'Go-live support']
  }
]

const features = [
  {
    icon: Smartphone,
    title: 'Mobile-First Design',
    description: 'Every website we build is optimized for mobile devices first, ensuring perfect performance on all screen sizes.',
    benefits: ['Faster loading on mobile', 'Better user experience', 'Higher conversion rates', 'Google ranking boost']
  },
  {
    icon: Search,
    title: 'SEO Built-In',
    description: 'We don\'t just build websites—we build them to rank. Every page is optimized for search engines from day one.',
    benefits: ['Higher search rankings', 'More organic traffic', 'Better visibility', 'Competitive advantage']
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Our websites load in under 2 seconds, keeping visitors engaged and improving your search rankings.',
    benefits: ['Better user experience', 'Lower bounce rates', 'Higher conversions', 'SEO ranking boost']
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Enterprise-level security and 99.9% uptime guarantee keep your website safe and always available.',
    benefits: ['Data protection', 'Customer trust', 'Business continuity', 'Compliance ready']
  },
  {
    icon: BarChart3,
    title: 'Analytics & Tracking',
    description: 'Comprehensive analytics help you understand your visitors and optimize for better results.',
    benefits: ['Data-driven decisions', 'Performance insights', 'Conversion tracking', 'ROI measurement']
  },
  {
    icon: Settings,
    title: 'Easy Management',
    description: 'User-friendly admin panels make it easy for you to update content and manage your website.',
    benefits: ['No technical knowledge needed', 'Quick updates', 'Cost savings', 'Full control']
  }
]

const caseStudies = [
  // Case studies will be loaded from database
]

const faqs = [
  {
    question: 'How long does it take to build a website?',
    answer: 'Most websites take 4-8 weeks from start to finish. Simple sites can be completed in 2-4 weeks, while complex e-commerce or enterprise sites may take 8-12 weeks.'
  },
  {
    question: 'Do you provide ongoing maintenance?',
    answer: 'Yes! We offer maintenance packages starting at $200/month that include updates, backups, security monitoring, and content changes.'
  },
  {
    question: 'Can you work with my existing brand?',
    answer: 'Absolutely! We can work with your existing brand guidelines, or help you develop a new brand identity as part of the project.'
  },
  {
    question: 'What if I need changes after launch?',
    answer: 'We provide 30 days of free minor changes after launch. After that, we offer affordable maintenance packages or hourly rates for updates.'
  },
  {
    question: 'Do you handle hosting and domain setup?',
    answer: 'Yes! We can help you choose the best hosting provider, set up your domain, and handle all the technical aspects of getting your site live.'
  },
  {
    question: 'Will my website be mobile-friendly?',
    answer: 'Every website we build is mobile-first and fully responsive. We test on all devices to ensure perfect performance everywhere.'
  }
]

export default function WebsiteDesignPage() {
  const [selectedTier, setSelectedTier] = useState(1) // Default to Growth package

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Professional Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              {/* Main Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-slide-up">
                Websites That Convert Visitors Into Customers
              </h1>
              
              {/* Gradient Subtitle */}
              <div className="text-3xl md:text-4xl font-bold mb-8 animate-slide-up delay-200">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  — Built for Speed, SEO & Sales
                </span>
              </div>

              {/* Supporting Text */}
              <p className="text-lg md:text-xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed animate-slide-up delay-300">
                Professional websites that don't just look amazing—they perform. Our custom websites are designed to rank #1 in Google, convert visitors into customers, and grow your business. From simple brochure sites to complex e-commerce platforms, we create digital experiences that drive real results.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up delay-400">
                <Link 
                  href="/checkout?service=website-design" 
                  className="group relative px-8 py-4 bg-blue-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 hover:bg-blue-500"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Start Your Website Project
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
                  </span>
                </Link>
                <Link 
                  href="/case-studies" 
                  className="px-8 py-4 bg-white text-gray-900 font-bold text-lg rounded-2xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 flex items-center justify-center"
                >
                  <div className="w-4 h-4 mr-2 border-l-4 border-b-4 border-gray-900 transform rotate-[-45deg]"></div>
                  View Website Portfolio
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-slide-up delay-500">
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">300+</div>
                  <div className="text-blue-200 font-medium">Websites Built</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">200%</div>
                  <div className="text-blue-200 font-medium">Avg Conversion Increase</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">1.2s</div>
                  <div className="text-blue-200 font-medium">Avg Load Time</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">99.9%</div>
                  <div className="text-blue-200 font-medium">Uptime Guarantee</div>
                </div>
              </div>
            </div>

            {/* Right Content - Website Performance Dashboard */}
            <div className="hidden lg:block">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20 animate-slide-up delay-500">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Website Performance Dashboard</h3>
                  <p className="text-sm text-gray-600">Real-time analytics</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Page Speed</span>
                      <Zap className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">1.2s</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '95%'}}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">SEO Score</span>
                      <Search className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">98/100</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '98%'}}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Conversion Rate</span>
                      <Target className="w-4 h-4 text-purple-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">+200%</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Mobile Score</span>
                      <Smartphone className="w-4 h-4 text-orange-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">100/100</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{width: '100%'}}></div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Overall Performance</span>
                    <span className="text-2xl font-bold text-gray-900">A+ Grade</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full" style={{width: '98%'}}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 mt-1">
                    <span>Poor</span>
                    <span>Excellent</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-4 h-4 bg-blue-400 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute top-40 right-20 w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-2000"></div>
          <div className="absolute bottom-40 left-20 w-5 h-5 bg-cyan-400 rounded-full animate-bounce delay-3000"></div>
          <div className="absolute bottom-20 right-10 w-2 h-2 bg-yellow-400 rounded-full animate-bounce delay-4000"></div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-4 bg-blue-600">
        <div className="container-custom">
          <div className="flex items-center justify-center">
            <Star className="w-5 h-5 text-yellow-400 mr-2" />
            <span className="text-white font-medium">Trusted by 300+ Businesses for Website Design & Development</span>
          </div>
        </div>
      </section>

      {/* Why You Need Professional Website Design Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Your Business Needs Professional Website Design
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your website is often the first impression potential customers have of your business. Make it count with professional design that converts visitors into customers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Monitor className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">First Impressions Matter</h3>
              <p className="text-gray-600">
                Visitors form an opinion about your business in just 0.05 seconds. Professional design builds trust and credibility instantly.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Mobile-First Design</h3>
              <p className="text-gray-600">
                60% of web traffic comes from mobile devices. Our websites are optimized for every screen size and device.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">SEO-Ready from Day One</h3>
              <p className="text-gray-600">
                Every website we build is optimized for search engines, helping you rank higher and attract more organic traffic.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Lightning Fast Speed</h3>
              <p className="text-gray-600">
                Fast-loading websites rank higher in Google and provide better user experience, leading to more conversions.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure & Reliable</h3>
              <p className="text-gray-600">
                Built with security best practices and hosted on reliable servers to ensure your website is always available.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Conversion Optimized</h3>
              <p className="text-gray-600">
                Every element is designed to guide visitors toward taking action, whether that's calling, filling out a form, or making a purchase.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              The Cost of a Poor Website
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-red-600 mb-3">❌ Without Professional Design:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• 75% of users judge credibility based on website design</li>
                  <li>• 40% of visitors leave if a site takes more than 3 seconds to load</li>
                  <li>• 88% of users won't return after a bad experience</li>
                  <li>• Poor mobile experience loses 61% of mobile users</li>
                  <li>• Unprofessional design reduces conversion rates by 50%</li>
                  <li>• Bad user experience hurts your search engine rankings</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-green-600 mb-3">✅ With Professional Design:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Professional design increases credibility by 75%</li>
                  <li>• Fast-loading sites improve user satisfaction by 40%</li>
                  <li>• Great user experience increases return visits by 88%</li>
                  <li>• Mobile-optimized design captures 61% more mobile traffic</li>
                  <li>• Professional design increases conversions by 200%</li>
                  <li>• Great user experience improves search rankings significantly</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Amenti AI the Best Choice Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-accent-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why Amenti AI is the Best Choice for Your Website Design
            </h2>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              We're not just web designers—we're digital marketing experts who understand how to build websites that drive business growth and deliver measurable results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Custom Development</h3>
              <p className="text-primary-100">
                Every website is built from scratch using modern technologies, ensuring optimal performance and scalability.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">SEO-Built In</h3>
              <p className="text-primary-100">
                SEO is integrated into every aspect of the design process, not added as an afterthought.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">User-Focused Design</h3>
              <p className="text-primary-100">
                We design with your customers in mind, creating intuitive experiences that guide them to take action.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast Turnaround</h3>
              <p className="text-primary-100">
                Most websites are completed within 4-6 weeks, with regular updates throughout the development process.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Ongoing Support</h3>
              <p className="text-primary-100">
                We provide ongoing maintenance, updates, and support to keep your website running smoothly.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Proven Results</h3>
              <p className="text-primary-100">
                Our websites consistently increase conversion rates by 200% and improve search rankings significantly.
              </p>
            </div>
          </div>

          <div className="bg-white/10 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Our Website Design Track Record</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-3xl font-bold text-white mb-2">300+</div>
                <div className="text-primary-100">Websites Built</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">200%</div>
                <div className="text-primary-100">Avg Conversion Increase</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">1.2s</div>
                <div className="text-primary-100">Avg Load Time</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">99.9%</div>
                <div className="text-primary-100">Uptime Guarantee</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies We Use */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Technologies We Use</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We use the latest technologies and frameworks to build fast, secure, and scalable websites.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <tech.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{tech.category}</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {tech.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="text-sm text-gray-600 bg-white px-3 py-2 rounded border">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Our Websites Convert</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Every website we build is designed with conversion and performance in mind.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{feature.description}</p>
                <ul className="space-y-1">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center text-xs text-gray-500">
                      <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Development Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We follow a proven 5-step process to ensure your website exceeds expectations.
            </p>
          </div>
          
          <div className="space-y-8">
            {designProcess.map((step, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                    {step.step}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 mb-3">{step.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {step.duration}
                    </span>
                    <span className="flex items-center">
                      <FileText className="w-4 h-4 mr-1" />
                      {step.deliverables.length} deliverables
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {step.deliverables.map((deliverable, idx) => (
                      <div key={idx} className="flex items-center text-xs text-gray-600 bg-gray-50 px-3 py-2 rounded">
                        <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                        {deliverable}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Choose Your Website Package</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select the package that best fits your business needs and growth goals.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {service.tiers.map((tier, index) => (
              <div key={index} className={`relative rounded-lg border-2 p-6 ${
                tier.popular 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 bg-white'
              }`}>
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <tier.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{tier.name}</h3>
                  <div className="text-2xl font-bold text-blue-600 mb-2">{tier.price}</div>
                  <p className="text-sm text-gray-500">{tier.period}</p>
                  <p className="text-xs text-gray-600 mt-2">Best for: {tier.bestFor}</p>
                </div>
                
                <ul className="space-y-2 mb-6">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="space-y-2">
                  <Link 
                    href={`/checkout?service=website-design&tier=${index}`}
                    className={`w-full block text-center py-2 px-4 rounded font-semibold text-sm transition-colors ${
                      tier.popular
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Get Started
                  </Link>
                  <button 
                    onClick={() => setSelectedTier(index)}
                    className="w-full text-center py-1 px-4 text-xs text-gray-600 hover:text-blue-600"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Website Success Stories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See how our websites have transformed businesses and driven real results.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {caseStudies.map((study, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{study.company}</h3>
                  <p className="text-sm text-gray-500 mb-2">{study.industry}</p>
                  <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
                    {study.package}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{study.results.traffic}</div>
                    <div className="text-xs text-gray-500">Traffic Increase</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{study.results.conversions}</div>
                    <div className="text-xs text-gray-500">Conversion Boost</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">{study.results.revenue}</div>
                    <div className="text-xs text-gray-500">Revenue Growth</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600">{study.results.loadTime}</div>
                    <div className="text-xs text-gray-500">Load Time</div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">{study.description}</p>
                
                <Link href="/case-studies" className="text-blue-600 hover:text-blue-700 text-sm font-semibold">
                  View Full Case Study →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">
              Everything you need to know about our website design and development services.
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button className="w-full text-left p-4 flex items-center justify-between hover:bg-gray-50">
                  <h3 className="text-sm font-semibold text-gray-900">{faq.question}</h3>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
                <div className="px-4 pb-4">
                  <p className="text-sm text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Build Your Dream Website?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's create a website that not only looks amazing but drives real business results. 
            Get started with a free consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/checkout?service=website-design" className="bg-white text-blue-600 px-6 py-3 rounded font-semibold hover:bg-gray-100 transition-colors">
              Start Your Project
            </Link>
            <Link href="/contact" className="border-2 border-white text-white px-6 py-3 rounded font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Free Consultation
            </Link>
          </div>
          <p className="text-blue-200 text-sm mt-4">
            <Shield className="w-4 h-4 inline mr-1" />
            30-day money-back guarantee on all website projects
          </p>
        </div>
      </section>
    </div>
  )
}
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Star, ChevronDown, Search, TrendingUp, Target, BarChart3, Globe, Zap, Shield, Users, Clock, FileText, Settings, Database, Code, Palette, Layers, Eye, MousePointer, Smartphone, Tablet, Laptop, Desktop, Wifi, WifiOff, Signal, SignalHigh, SignalLow, Battery, BatteryCharging, Power, PowerOff, Volume2, VolumeX, Mic, MicOff, Camera, Video, VideoOff, Image, File, Folder, FolderOpen, Archive, Inbox, Send, Mail, MailOpen, Reply, Forward, Share2, Copy2, Cut, Scissors, Paste, Clipboard, ClipboardList, ClipboardCheck, ClipboardCopy, ClipboardX, FilePlus, FileMinus, FileX, FileCheck, FileEdit, FileSearch, FileText2, FileCode, FileImage, FileVideo, FileAudio, FileZip, FilePdf, FileWord, FileExcel, FilePowerpoint, FileCsv, FileJson, FileXml, FileHtml, FileCss, FileJs, FileTs, FileJsx, FileTsx, FileVue, FileReact, FileAngular, FileSvelte, FilePhp, FilePython, FileJava, FileC, FileCpp, FileCsharp, FileGo, FileRust, FileSwift, FileKotlin, FileDart, FileR, FileRuby, FilePerl, FileLua, FileBash, FileSh, FileBat, FileCmd, FilePs1, FileYaml, FileToml, FileIni, FileEnv, FileGitignore, FileDockerfile, FileMakefile, FileReadme, FileLicense, FileChangelog, FileContributing, FileSecurity, FileCodeowners, FileEditorconfig, FilePrettier, FileEslint, FileBabel, FileWebpack, FileRollup, FileVite, FileParcel, FileGulp, FileGrunt, FileNpm, FileYarn, FilePnpm, FileBun, FileDeno, FileNode, FileExpress, FileKoa, FileHapi, FileFastify, FileNest, FileNext, FileNuxt, FileSvelteKit, FileRemix, FileGatsby, FileAstro, FileSolid, FileQwik, FileLit, FileStencil, FileAlpine, FileMithril, FileHyperapp, FileInferno, FilePreact, FileRiot, FileMarko, FileMithril2, FilePolymer, FileAurelia, FileBackbone, FileEmber, FileKnockout, FileMithril3, FileRactive, FileRivets, FileRivets2, FileRivets3, FileRivets4, FileRivets5, FileRivets6, FileRivets7, FileRivets8, FileRivets9, FileRivets10, Phone, MessageSquare, Calendar, Headphones, Award, DollarSign, PieChart, TrendingDown, AlertCircle, CheckCircle2, XCircle, Info, ExternalLink, Download, Play, Pause, RefreshCw, Lock, Unlock, Filter, SortAsc, SortDesc, MoreHorizontal, MoreVertical, Plus, Minus, Edit, Trash2, Save, Copy, Share, Bookmark, Heart, ThumbsUp, ThumbsDown, Flag, Report, HelpCircle, QuestionMarkCircle, Lightbulb, Bulb, Idea, Brain, Cpu, HardDrive, MapPin } from 'lucide-react'

const service = {
  title: 'SEO Services',
  icon: '🔍',
  description: 'Comprehensive SEO strategies that dominate search results and drive qualified traffic to your business.',
  longDescription: 'We don\'t just do SEO—we dominate search results. Our data-driven approach combines technical expertise, content strategy, and link building to get your business ranking #1 for the keywords that matter most. From local businesses to national brands, we deliver measurable results that grow your revenue.',
  tiers: [
    {
      name: 'Starter SEO',
      price: '$1,200/mo',
      setupPrice: '$0',
      monthlyPrice: '$1,200',
      period: 'monthly',
      popular: false,
      icon: Target,
      bestFor: 'local businesses, small companies',
      features: [
        '20 local keywords',
        'Google Business optimization',
        'On-page SEO + citations',
        'Basic backlink building',
        'Monthly SEO report',
        'Competitor snapshot',
        'Local directory submissions',
        'Review management'
      ]
    },
    {
      name: 'Growth SEO',
      price: '$3,500/mo',
      setupPrice: '$0',
      monthlyPrice: '$3,500',
      period: 'monthly',
      popular: true,
      icon: TrendingUp,
      bestFor: 'regional businesses, growing companies',
      features: [
        '60 regional/national keywords',
        'Full technical SEO audit & fixes',
        '4 SEO-optimized blogs/month',
        'Competitor analysis + tracking',
        'White-hat backlink campaigns',
        'Live analytics dashboard',
        'Content strategy development',
        'Conversion rate optimization'
      ]
    },
    {
      name: 'Dominate SEO',
      price: '$8,000+/mo',
      setupPrice: '$0',
      monthlyPrice: '$8,000',
      period: 'monthly',
      popular: false,
      icon: Award,
      bestFor: 'enterprises, national brands',
      features: [
        '150+ targeted keywords',
        'Enterprise technical SEO',
        '8+ blogs/month + automation',
        'Dedicated SEO manager',
        'Advanced backlink outreach',
        'Multi-location SEO',
        'PR and media outreach',
        'Quarterly strategy workshops'
      ]
    }
  ]
}

const seoStrategies = [
  {
    category: 'Technical SEO',
    icon: Settings,
    description: 'Optimize your website\'s technical foundation for search engines',
    items: [
      'Site speed optimization',
      'Mobile-first indexing',
      'Core Web Vitals',
      'Schema markup',
      'XML sitemaps',
      'Robots.txt optimization',
      'URL structure',
      'Internal linking'
    ]
  },
  {
    category: 'Content Strategy',
    icon: FileText,
    description: 'Create content that ranks and converts',
    items: [
      'Keyword research',
      'Content planning',
      'Blog post optimization',
      'Landing page copy',
      'Meta descriptions',
      'Header optimization',
      'Image alt tags',
      'Content clustering'
    ]
  },
  {
    category: 'Link Building',
    icon: Globe,
    description: 'Build authoritative backlinks that boost rankings',
    items: [
      'Guest posting',
      'Resource page outreach',
      'Broken link building',
      'HARO campaigns',
      'Local citations',
      'Industry partnerships',
      'PR outreach',
      'Link reclamation'
    ]
  },
  {
    category: 'Local SEO',
    icon: MapPin,
    description: 'Dominate local search results',
    items: [
      'Google My Business',
      'Local citations',
      'Review management',
      'Local content',
      'Location pages',
      'NAP consistency',
      'Local link building',
      'Local schema markup'
    ]
  },
  {
    category: 'Analytics & Reporting',
    icon: BarChart3,
    description: 'Track performance and optimize for results',
    items: [
      'Google Analytics setup',
      'Search Console monitoring',
      'Rank tracking',
      'Conversion tracking',
      'Custom dashboards',
      'Monthly reports',
      'ROI measurement',
      'Performance insights'
    ]
  },
  {
    category: 'Competitive Analysis',
    icon: Eye,
    description: 'Stay ahead of your competition',
    items: [
      'Competitor keyword analysis',
      'Gap analysis',
      'Backlink analysis',
      'Content gap identification',
      'Ranking monitoring',
      'Strategy benchmarking',
      'Market positioning',
      'Opportunity identification'
    ]
  }
]

const seoProcess = [
  {
    step: '01',
    title: 'SEO Audit & Analysis',
    description: 'Comprehensive analysis of your current SEO performance and opportunities',
    duration: '1-2 weeks',
    deliverables: ['Technical audit', 'Keyword research', 'Competitor analysis', 'Content audit', 'Backlink analysis']
  },
  {
    step: '02',
    title: 'Strategy Development',
    description: 'Create a custom SEO strategy tailored to your business goals',
    duration: '1 week',
    deliverables: ['SEO strategy document', 'Keyword targeting plan', 'Content calendar', 'Link building strategy', 'Technical roadmap']
  },
  {
    step: '03',
    title: 'Technical Implementation',
    description: 'Fix technical issues and optimize your website for search engines',
    duration: '2-3 weeks',
    deliverables: ['Technical fixes', 'Site speed optimization', 'Mobile optimization', 'Schema markup', 'Internal linking']
  },
  {
    step: '04',
    title: 'Content Creation & Optimization',
    description: 'Create and optimize content that ranks for your target keywords',
    duration: 'Ongoing',
    deliverables: ['Blog posts', 'Landing pages', 'Meta optimization', 'Content updates', 'Image optimization']
  },
  {
    step: '05',
    title: 'Link Building & Promotion',
    description: 'Build high-quality backlinks and promote your content',
    duration: 'Ongoing',
    deliverables: ['Backlink acquisition', 'Guest posting', 'PR outreach', 'Content promotion', 'Citation building']
  },
  {
    step: '06',
    title: 'Monitoring & Optimization',
    description: 'Track performance and continuously optimize for better results',
    duration: 'Ongoing',
    deliverables: ['Monthly reports', 'Rank tracking', 'Analytics monitoring', 'Strategy adjustments', 'Performance optimization']
  }
]

const seoFeatures = [
  {
    icon: Search,
    title: 'Keyword Research & Targeting',
    description: 'We identify the most valuable keywords for your business and create strategies to rank for them.',
    benefits: ['Higher search visibility', 'Targeted traffic', 'Better conversion rates', 'Competitive advantage']
  },
  {
    icon: Zap,
    title: 'Technical SEO Optimization',
    description: 'We optimize your website\'s technical foundation to ensure search engines can crawl and index it properly.',
    benefits: ['Better crawlability', 'Faster loading times', 'Mobile optimization', 'Improved rankings']
  },
  {
    icon: FileText,
    title: 'Content Strategy & Creation',
    description: 'We create high-quality, SEO-optimized content that ranks and converts visitors into customers.',
    benefits: ['Higher search rankings', 'More organic traffic', 'Better user engagement', 'Increased conversions']
  },
  {
    icon: Globe,
    title: 'Link Building & Authority',
    description: 'We build high-quality backlinks from authoritative websites to boost your domain authority.',
    benefits: ['Higher domain authority', 'Better search rankings', 'Increased trust', 'More referral traffic']
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reporting',
    description: 'We track your SEO performance with detailed analytics and provide monthly reports.',
    benefits: ['Data-driven decisions', 'Performance insights', 'ROI measurement', 'Strategy optimization']
  },
  {
    icon: Target,
    title: 'Local SEO Domination',
    description: 'We help local businesses dominate their local search results and attract nearby customers.',
    benefits: ['Local visibility', 'More local customers', 'Google My Business optimization', 'Review management']
  }
]

const caseStudies = [
  // Case studies will be loaded from database
]

const faqs = [
  {
    question: 'How long does it take to see SEO results?',
    answer: 'Most clients see initial improvements in 30-60 days, with significant results by 90 days. Our average client sees 247% increase in organic leads within 12 weeks.'
  },
  {
    question: 'What makes your SEO different?',
    answer: 'We combine technical expertise with content strategy and link building. Plus, our risk-free guarantee means we work free next month if we don\'t deliver results.'
  },
  {
    question: 'Do you work with businesses outside Rhode Island?',
    answer: 'Yes! While we\'re based in Rhode Island, we work with businesses nationwide. Our SEO strategies work for local, regional, and national businesses.'
  },
  {
    question: 'What if my website isn\'t SEO-friendly?',
    answer: 'No problem! We can audit and fix your existing site, or rebuild it as part of our Complete Growth Packages. We\'ll work with what you have to maximize your ROI.'
  },
  {
    question: 'How do you measure SEO success?',
    answer: 'We track everything: keyword rankings, organic traffic, lead generation, conversion rates, and revenue. You get detailed monthly reports showing exactly what we\'re doing and the results.'
  },
  {
    question: 'Can I cancel my SEO service anytime?',
    answer: 'Yes, you can cancel with 30 days notice. However, we\'re confident you\'ll see the value and want to continue once you start seeing results.'
  }
]

export default function SeoServicesPage() {
  const [selectedTier, setSelectedTier] = useState(1) // Default to Growth package

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Professional Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-green-900 to-emerald-900">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
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
                Dominate Google Search Results
              </h1>
              
              {/* Gradient Subtitle */}
              <div className="text-3xl md:text-4xl font-bold mb-8 animate-slide-up delay-200">
                <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  — Get 3-10 New Leads Per Month
                </span>
              </div>

              {/* Supporting Text */}
              <p className="text-lg md:text-xl text-green-100 mb-12 max-w-4xl mx-auto leading-relaxed animate-slide-up delay-300">
                Stop losing customers to your competitors. Our comprehensive SEO services help you rank #1 in Google for keywords that matter to your business, driving qualified traffic and increasing your revenue month after month.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up delay-400">
                <Link 
                  href="/checkout?service=seo-services" 
                  className="group relative px-8 py-4 bg-green-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-green-500/25 transition-all duration-300 hover:scale-105 hover:bg-green-500"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Start Your SEO Campaign
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
                  </span>
                </Link>
                <Link 
                  href="/case-studies" 
                  className="px-8 py-4 bg-white text-gray-900 font-bold text-lg rounded-2xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 flex items-center justify-center"
                >
                  <div className="w-4 h-4 mr-2 border-l-4 border-b-4 border-gray-900 transform rotate-[-45deg]"></div>
                  View SEO Results
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-slide-up delay-500">
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">247%</div>
                  <div className="text-green-200 font-medium">Avg Traffic Increase</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">#1-3</div>
                  <div className="text-green-200 font-medium">Google Rankings</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">89%</div>
                  <div className="text-green-200 font-medium">Lead Increase</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">$2.4M</div>
                  <div className="text-green-200 font-medium">Revenue Generated</div>
                </div>
              </div>
            </div>

            {/* Right Content - SEO Performance Dashboard */}
            <div className="hidden lg:block">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20 animate-slide-up delay-500">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">SEO Performance Dashboard</h3>
                  <p className="text-sm text-gray-600">Real-time rankings & traffic</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Organic Traffic</span>
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">+247%</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Google Rankings</span>
                      <Award className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">#1-3</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '90%'}}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Lead Generation</span>
                      <Users className="w-4 h-4 text-purple-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">+89%</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{width: '75%'}}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Revenue Growth</span>
                      <TrendingUp className="w-4 h-4 text-orange-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">$2.4M</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{width: '80%'}}></div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Overall SEO Score</span>
                    <span className="text-2xl font-bold text-gray-900">94/100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full" style={{width: '94%'}}></div>
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
          <div className="absolute top-20 left-10 w-4 h-4 bg-green-400 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute top-40 right-20 w-3 h-3 bg-emerald-400 rounded-full animate-bounce delay-2000"></div>
          <div className="absolute bottom-40 left-20 w-5 h-5 bg-teal-400 rounded-full animate-bounce delay-3000"></div>
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
      <section className="py-4 bg-green-600">
        <div className="container-custom">
          <div className="flex items-center justify-center">
            <Star className="w-5 h-5 text-yellow-400 mr-2" />
            <span className="text-white font-medium">Trusted by 200+ Businesses for SEO Services</span>
          </div>
        </div>
      </section>

      {/* Why You Need Professional SEO Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Your Business Needs Professional SEO Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              93% of online experiences begin with a search engine. If you're not ranking on the first page of Google, you're losing customers to your competitors every single day.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">First Page Rankings</h3>
              <p className="text-gray-600">
                75% of users never scroll past the first page of search results. We get you there and keep you there.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Qualified Traffic</h3>
              <p className="text-gray-600">
                SEO brings people who are actively looking for your services, resulting in higher conversion rates and better ROI.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Cost-Effective Marketing</h3>
              <p className="text-gray-600">
                SEO costs 61% less than paid advertising while generating 3x more qualified leads on average.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Long-Term Results</h3>
              <p className="text-gray-600">
                Unlike paid ads that stop working when you stop paying, SEO builds lasting authority and continues generating leads.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Local Domination</h3>
              <p className="text-gray-600">
                Dominate local search results and capture customers in your area before they find your competitors.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Measurable ROI</h3>
              <p className="text-gray-600">
                Track every keyword, ranking, and conversion to see exactly how SEO is growing your business.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              The High Cost of Poor SEO
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-red-600 mb-3">❌ Without Professional SEO:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• 75% of clicks go to the top 3 search results</li>
                  <li>• Page 2 gets only 5% of search traffic</li>
                  <li>• 68% of online experiences start with a search engine</li>
                  <li>• 46% of all Google searches are local</li>
                  <li>• 88% of consumers trust online reviews as much as personal recommendations</li>
                  <li>• 97% of consumers search online for local businesses</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-green-600 mb-3">✅ With Professional SEO:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• First page rankings capture 75% of all search traffic</li>
                  <li>• Top 3 positions get 60% of all clicks</li>
                  <li>• 68% of your potential customers start their journey with search</li>
                  <li>• 46% of searches are local - perfect for local businesses</li>
                  <li>• 88% of consumers trust businesses with strong online presence</li>
                  <li>• 97% of local searches lead to business inquiries</li>
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
              Why Amenti AI is the Best Choice for Your SEO Success
            </h2>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              We're not just SEO experts—we're Rhode Island natives who understand local business challenges and deliver results that matter to your bottom line.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">White-Hat SEO Only</h3>
              <p className="text-primary-100">
                We use only Google-approved SEO techniques that build lasting authority and won't get you penalized.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Data-Driven Strategy</h3>
              <p className="text-primary-100">
                Every decision is backed by data and analytics, ensuring we focus on what actually moves the needle.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Local Expertise</h3>
              <p className="text-primary-100">
                We understand Rhode Island's unique market and know how to rank for local keywords that matter.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast Results</h3>
              <p className="text-primary-100">
                Most clients see initial improvements in 30-60 days, with significant results by 90 days.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Risk-Free Guarantee</h3>
              <p className="text-primary-100">
                If we don't increase your organic leads by at least 25% in 90 days, we work free the next month.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Proven Track Record</h3>
              <p className="text-primary-100">
                Our clients see an average 247% increase in organic leads within 12 weeks of implementation.
              </p>
            </div>
          </div>

          <div className="bg-white/10 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Our SEO Success Metrics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-3xl font-bold text-white mb-2">247%</div>
                <div className="text-primary-100">Avg Lead Increase</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">90%</div>
                <div className="text-primary-100">First Page Rankings</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">12</div>
                <div className="text-primary-100">Weeks to Results</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">98%</div>
                <div className="text-primary-100">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Strategies */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our SEO Strategies</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We use a comprehensive approach that covers every aspect of search engine optimization.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {seoStrategies.map((strategy, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <strategy.icon className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{strategy.category}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">{strategy.description}</p>
                <div className="grid grid-cols-2 gap-2">
                  {strategy.items.map((item, itemIndex) => (
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Our SEO Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our data-driven approach delivers measurable results that grow your business.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {seoFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-green-600" />
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our SEO Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We follow a proven 6-step process to ensure your SEO success.
            </p>
          </div>
          
          <div className="space-y-8">
            {seoProcess.map((step, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Choose Your SEO Package</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select the SEO package that best fits your business size and growth goals.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {service.tiers.map((tier, index) => (
              <div key={index} className={`relative rounded-lg border-2 p-6 ${
                tier.popular 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-200 bg-white'
              }`}>
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <tier.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{tier.name}</h3>
                  <div className="text-2xl font-bold text-green-600 mb-2">{tier.price}</div>
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
                    href={`/checkout?service=seo-services&tier=${index}`}
                    className={`w-full block text-center py-2 px-4 rounded font-semibold text-sm transition-colors ${
                      tier.popular
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Get Started
                  </Link>
                  <button 
                    onClick={() => setSelectedTier(index)}
                    className="w-full text-center py-1 px-4 text-xs text-gray-600 hover:text-green-600"
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">SEO Success Stories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See how our SEO strategies have transformed businesses and driven real results.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {caseStudies.map((study, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{study.company}</h3>
                  <p className="text-sm text-gray-500 mb-2">{study.industry}</p>
                  <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                    {study.package}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{study.results.keywords}</div>
                    <div className="text-xs text-gray-500">Keyword Growth</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{study.results.traffic}</div>
                    <div className="text-xs text-gray-500">Traffic Increase</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">{study.results.leads}</div>
                    <div className="text-xs text-gray-500">Lead Growth</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600">{study.results.revenue}</div>
                    <div className="text-xs text-gray-500">Revenue Growth</div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">{study.description}</p>
                
                <Link href="/case-studies" className="text-green-600 hover:text-green-700 text-sm font-semibold">
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
              Everything you need to know about our SEO services.
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
      <section className="py-12 bg-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Dominate Search Results?</h2>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            Let's get your business ranking #1 for the keywords that matter most. 
            Start with a free SEO audit and see what we can do for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/checkout?service=seo-services" className="bg-white text-green-600 px-6 py-3 rounded font-semibold hover:bg-gray-100 transition-colors">
              Start SEO Campaign
            </Link>
            <Link href="/contact" className="border-2 border-white text-white px-6 py-3 rounded font-semibold hover:bg-white hover:text-green-600 transition-colors">
              Free SEO Audit
            </Link>
          </div>
          <p className="text-green-200 text-sm mt-4">
            <Shield className="w-4 h-4 inline mr-1" />
            Risk-free guarantee: If we don't deliver results, we work free next month
          </p>
        </div>
      </section>
    </div>
  )
}
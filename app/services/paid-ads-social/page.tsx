'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Star, ChevronDown, Megaphone, Target, Users, Award, Clock, DollarSign, Globe, Search, Monitor, Smartphone, Database, Settings, Headphones, FileText, Calendar, MessageSquare, PieChart, TrendingDown, AlertCircle, CheckCircle2, XCircle, Info, ExternalLink, Download, Play, Pause, RefreshCw, Lock, Unlock, Eye, EyeOff, Filter, SortAsc, SortDesc, MoreHorizontal, MoreVertical, Plus, Minus, Edit, Trash2, Save, Copy, Share, Bookmark, Heart, ThumbsUp, ThumbsDown, Flag, Report, HelpCircle, QuestionMarkCircle, Lightbulb, Bulb, Idea, Brain, Cpu, HardDrive, Wifi, WifiOff, Signal, SignalHigh, SignalLow, Battery, BatteryCharging, Power, PowerOff, Volume2, VolumeX, Mic, MicOff, Camera, Video, VideoOff, Image, File, Folder, FolderOpen, Archive, Inbox, Send, Mail, MailOpen, Reply, Forward, Share2, Copy2, Cut, Scissors, Paste, Clipboard, ClipboardList, ClipboardCheck, ClipboardCopy, ClipboardX, FilePlus, FileMinus, FileX, FileCheck, FileEdit, FileSearch, FileText2, FileCode, FileImage, FileVideo, FileAudio, FileZip, FilePdf, FileWord, FileExcel, FilePowerpoint, FileCsv, FileJson, FileXml, FileHtml, FileCss, FileJs, FileTs, FileJsx, FileTsx, FileVue, FileReact, FileAngular, FileSvelte, FilePhp, FilePython, FileJava, FileC, FileCpp, FileCsharp, FileGo, FileRust, FileSwift, FileKotlin, FileDart, FileR, FileRuby, FilePerl, FileLua, FileBash, FileSh, FileBat, FileCmd, FilePs1, FileYaml, FileToml, FileIni, FileEnv, FileGitignore, FileDockerfile, FileMakefile, FileReadme, FileLicense, FileChangelog, FileContributing, FileSecurity, FileCodeowners, FileEditorconfig, FilePrettier, FileEslint, FileBabel, FileWebpack, FileRollup, FileVite, FileParcel, FileGulp, FileGrunt, FileNpm, FileYarn, FilePnpm, FileBun, FileDeno, FileNode, FileExpress, FileKoa, FileHapi, FileFastify, FileNest, FileNext, FileNuxt, FileSvelteKit, FileRemix, FileGatsby, FileAstro, FileSolid, FileQwik, FileLit, FileStencil, FileAlpine, FileMithril, FileHyperapp, FileInferno, FilePreact, FileRiot, FileMarko, FileMithril2, FilePolymer, FileAurelia, FileBackbone, FileEmber, FileKnockout, FileMithril3, FileRactive, FileRivets, FileRivets2, FileRivets3, FileRivets4, FileRivets5, FileRivets6, FileRivets7, FileRivets8, FileRivets9, FileRivets10 } from 'lucide-react'

const service = {
  title: 'Paid Ads & Social Media Marketing',
  icon: '📢',
  description: 'Strategic paid advertising and social media campaigns that drive immediate results and grow your business.',
  longDescription: 'Get your business in front of the right people at the right time with our strategic paid advertising and social media marketing services. We create and manage campaigns that deliver measurable results and drive qualified leads to your business.',
  tiers: [
    {
      name: 'Starter Ads Package',
      price: '$2,000/mo',
      setupPrice: '$0',
      monthlyPrice: '$2,000',
      period: 'monthly',
      popular: false,
      icon: Megaphone,
      bestFor: 'small businesses, local services, startups',
      features: [
        'Google Ads management',
        'Facebook & Instagram ads',
        'Ad spend: $1,000/month',
        '2 ad campaigns',
        'Basic targeting setup',
        'Monthly performance reports',
        'A/B testing',
        'Landing page optimization'
      ]
    },
    {
      name: 'Growth Ads Package',
      price: '$5,000/mo',
      setupPrice: '$0',
      monthlyPrice: '$5,000',
      period: 'monthly',
      popular: true,
      icon: Target,
      bestFor: 'growing businesses, e-commerce, agencies',
      features: [
        'Google Ads management',
        'Facebook & Instagram ads',
        'LinkedIn advertising',
        'Ad spend: $3,000/month',
        '5 ad campaigns',
        'Advanced targeting & retargeting',
        'Detailed performance reports',
        'A/B testing & optimization',
        'Landing page optimization',
        'Conversion tracking setup',
        'Social media management',
        'Content creation'
      ]
    },
    {
      name: 'Dominate Ads Package',
      price: '$12,000/mo',
      setupPrice: '$0',
      monthlyPrice: '$12,000',
      period: 'monthly',
      popular: false,
      icon: Award,
      bestFor: 'enterprises, large companies, franchises',
      features: [
        'Multi-platform ad management',
        'Google Ads, Facebook, Instagram, LinkedIn',
        'TikTok & YouTube advertising',
        'Ad spend: $8,000/month',
        'Unlimited ad campaigns',
        'Advanced targeting & lookalike audiences',
        'Real-time performance monitoring',
        'Advanced A/B testing',
        'Landing page optimization',
        'Conversion tracking & attribution',
        'Full social media management',
        'Content creation & video ads',
        'Dedicated account manager'
      ]
    }
  ]
}

const adPlatforms = [
  {
    category: 'Google Ads',
    icon: Search,
    items: ['Search campaigns', 'Display campaigns', 'Shopping ads', 'YouTube ads', 'App campaigns', 'Local campaigns']
  },
  {
    category: 'Facebook & Instagram',
    icon: Share2,
    items: ['Feed ads', 'Story ads', 'Reels ads', 'Carousel ads', 'Video ads', 'Collection ads']
  },
  {
    category: 'LinkedIn Advertising',
    icon: Users,
    items: ['Sponsored content', 'Message ads', 'Dynamic ads', 'Text ads', 'Video ads', 'Lead gen forms']
  },
  {
    category: 'TikTok Advertising',
    icon: Video,
    items: ['In-feed ads', 'Brand takeovers', 'Hashtag challenges', 'Branded effects', 'Spark ads', 'Collection ads']
  },
  {
    category: 'YouTube Advertising',
    icon: Play,
    items: ['TrueView ads', 'Bumper ads', 'Overlay ads', 'Sponsored cards', 'Masthead ads', 'Display ads']
  },
  {
    category: 'Social Media Management',
    icon: Calendar,
    items: ['Content planning', 'Post scheduling', 'Community management', 'Engagement monitoring', 'Analytics reporting', 'Crisis management']
  }
]

const adProcess = [
  {
    step: '01',
    title: 'Strategy & Planning',
    description: 'Develop a comprehensive advertising strategy based on your business goals, target audience, and competitive landscape',
    duration: '1 week',
    deliverables: ['Audience research', 'Competitor analysis', 'Campaign strategy', 'Budget allocation', 'Platform selection', 'Creative brief']
  },
  {
    step: '02',
    title: 'Campaign Setup & Launch',
    description: 'Create and launch optimized ad campaigns across all selected platforms with advanced targeting',
    duration: '1 week',
    deliverables: ['Account setup', 'Campaign creation', 'Ad creative development', 'Landing page optimization', 'Tracking setup', 'Campaign launch']
  },
  {
    step: '03',
    title: 'Optimization & Testing',
    description: 'Continuously optimize campaigns through A/B testing, audience refinement, and performance analysis',
    duration: 'Ongoing',
    deliverables: ['A/B testing', 'Audience optimization', 'Bid optimization', 'Creative testing', 'Performance monitoring', 'Budget adjustments']
  },
  {
    step: '04',
    title: 'Performance Monitoring',
    description: 'Monitor campaign performance in real-time and make data-driven optimizations for better results',
    duration: 'Ongoing',
    deliverables: ['Real-time monitoring', 'Performance reports', 'ROI analysis', 'Conversion tracking', 'Attribution analysis', 'Optimization recommendations']
  },
  {
    step: '05',
    title: 'Reporting & Analysis',
    description: 'Provide detailed performance reports and strategic recommendations for continuous improvement',
    duration: 'Monthly',
    deliverables: ['Performance reports', 'ROI analysis', 'Strategic recommendations', 'Budget optimization', 'Growth opportunities', 'Next month planning']
  }
]

const features = [
  {
    icon: Target,
    title: 'Precision Targeting',
    description: 'Advanced targeting options to reach your ideal customers across all platforms and devices.',
    benefits: ['Higher conversion rates', 'Lower cost per lead', 'Better audience quality', 'Improved ROI']
  },
  {
    icon: BarChart3,
    title: 'Data-Driven Optimization',
    description: 'Continuous optimization based on real-time data and performance metrics to maximize results.',
    benefits: ['Better performance', 'Lower costs', 'Higher conversions', 'Improved efficiency']
  },
  {
    icon: DollarSign,
    title: 'ROI-Focused Campaigns',
    description: 'Every campaign is designed to deliver measurable ROI and drive business growth.',
    benefits: ['Measurable results', 'Better profitability', 'Clear ROI tracking', 'Business growth']
  },
  {
    icon: Users,
    title: 'Multi-Platform Reach',
    description: 'Comprehensive presence across all major advertising platforms to maximize your reach.',
    benefits: ['Wider reach', 'Better visibility', 'Platform diversification', 'Increased opportunities']
  },
  {
    icon: Clock,
    title: 'Real-Time Monitoring',
    description: '24/7 campaign monitoring and optimization to ensure peak performance at all times.',
    benefits: ['Better performance', 'Faster optimization', 'Reduced waste', 'Improved results']
  },
  {
    icon: Award,
    title: 'Proven Results',
    description: 'Track record of delivering exceptional results for businesses across all industries.',
    benefits: ['Proven expertise', 'Reliable results', 'Industry experience', 'Success stories']
  }
]

const faqs = [
  {
    question: 'How long does it take to see results from paid advertising?',
    answer: 'Most paid advertising campaigns start showing results within 1-2 weeks, with significant improvements typically seen within 4-6 weeks as we optimize targeting, creative, and bidding strategies.'
  },
  {
    question: 'Which advertising platforms do you manage?',
    answer: 'We manage campaigns across all major platforms including Google Ads, Facebook, Instagram, LinkedIn, TikTok, YouTube, and more. We select the best platforms based on your target audience and business goals.'
  },
  {
    question: 'What\'s included in the ad spend budget?',
    answer: 'The ad spend budget is the amount we spend on actual advertising across all platforms. This is separate from our management fee and goes directly to the advertising platforms to reach your target audience.'
  },
  {
    question: 'Do you provide creative assets for ads?',
    answer: 'Yes! We create all ad creative including images, videos, copy, and landing pages. We also work with your existing creative assets and can coordinate with your design team if needed.'
  },
  {
    question: 'How do you measure campaign success?',
    answer: 'We track multiple metrics including click-through rates, conversion rates, cost per lead, return on ad spend (ROAS), and overall ROI. We provide detailed monthly reports with actionable insights.'
  },
  {
    question: 'Can you work with our existing advertising accounts?',
    answer: 'Absolutely! We can take over management of your existing advertising accounts and optimize them for better performance. We\'ll audit your current setup and make improvements where needed.'
  }
]

export default function PaidAdsSocialPage() {
  const [selectedTier, setSelectedTier] = useState(1) // Default to Growth package

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Professional Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-red-900 to-orange-900">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-red-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
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
                Paid Ads That Drive Results
              </h1>
              
              {/* Gradient Subtitle */}
              <div className="text-3xl md:text-4xl font-bold mb-8 animate-slide-up delay-200">
                <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                  — Get Immediate Traffic & Leads
                </span>
              </div>

              {/* Supporting Text */}
              <p className="text-lg md:text-xl text-red-100 mb-12 max-w-4xl mx-auto leading-relaxed animate-slide-up delay-300">
                Get your business in front of the right people at the right time with our strategic paid advertising and social media marketing services. We create and manage campaigns that deliver measurable results and drive qualified leads to your business.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up delay-400">
                <Link 
                  href="/checkout?service=paid-ads-social" 
                  className="group relative px-8 py-4 bg-red-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-red-500/25 transition-all duration-300 hover:scale-105 hover:bg-red-500"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Start Your Ad Campaign
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
                  </span>
                </Link>
                <Link 
                  href="/case-studies" 
                  className="px-8 py-4 bg-white text-gray-900 font-bold text-lg rounded-2xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 flex items-center justify-center"
                >
                  <div className="w-4 h-4 mr-2 border-l-4 border-b-4 border-gray-900 transform rotate-[-45deg]"></div>
                  View Ad Results
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-slide-up delay-500">
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">500%</div>
                  <div className="text-red-200 font-medium">Avg ROI</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">$2M+</div>
                  <div className="text-red-200 font-medium">Ad Spend Managed</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">50%</div>
                  <div className="text-red-200 font-medium">Lower Cost Per Lead</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">24/7</div>
                  <div className="text-red-200 font-medium">Campaign Monitoring</div>
                </div>
              </div>
            </div>

            {/* Right Content - Ad Performance Dashboard */}
            <div className="hidden lg:block">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20 animate-slide-up delay-500">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Ad Performance Dashboard</h3>
                  <p className="text-sm text-gray-600">Real-time campaign metrics</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Click-Through Rate</span>
                      <Eye className="w-4 h-4 text-red-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">4.2%</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Conversion Rate</span>
                      <Target className="w-4 h-4 text-orange-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">12.5%</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{width: '90%'}}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Cost Per Lead</span>
                      <DollarSign className="w-4 h-4 text-yellow-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">$25</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{width: '75%'}}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">ROI</span>
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">500%</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '100%'}}></div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Overall Ad Performance</span>
                    <span className="text-2xl font-bold text-gray-900">A+ Grade</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full" style={{width: '98%'}}></div>
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
          <div className="absolute top-20 left-10 w-4 h-4 bg-red-400 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute top-40 right-20 w-3 h-3 bg-orange-400 rounded-full animate-bounce delay-2000"></div>
          <div className="absolute bottom-40 left-20 w-5 h-5 bg-yellow-400 rounded-full animate-bounce delay-3000"></div>
          <div className="absolute bottom-20 right-10 w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-4000"></div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-4 bg-red-600">
        <div className="container-custom">
          <div className="flex items-center justify-center">
            <Star className="w-5 h-5 text-yellow-400 mr-2" />
            <span className="text-white font-medium">Trusted by 100+ Businesses for Paid Advertising</span>
          </div>
        </div>
      </section>

      {/* Why You Need Paid Advertising Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Your Business Needs Paid Advertising
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Paid advertising is the fastest way to get your business in front of your ideal customers and drive immediate results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Immediate Results</h3>
              <p className="text-gray-600">
                Unlike SEO, paid advertising delivers immediate traffic and leads from day one of your campaign launch.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Precise Targeting</h3>
              <p className="text-gray-600">
                Reach your exact target audience with advanced targeting options across all major advertising platforms.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Measurable ROI</h3>
              <p className="text-gray-600">
                Track every dollar spent and measure the exact return on investment for all your advertising campaigns.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Scalable Growth</h3>
              <p className="text-gray-600">
                Scale your advertising spend up or down based on performance and business needs for optimal growth.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">24/7 Visibility</h3>
              <p className="text-gray-600">
                Your ads run 24/7, ensuring your business is always visible to potential customers when they're searching.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Competitive Advantage</h3>
              <p className="text-gray-600">
                Stay ahead of competitors by appearing in prime advertising positions and reaching customers first.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Platforms We Manage */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Advertising Platforms We Manage</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We create and manage campaigns across all major advertising platforms to maximize your reach and results.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adPlatforms.map((platform, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                    <platform.icon className="w-5 h-5 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{platform.category}</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {platform.items.map((item, itemIndex) => (
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

      {/* Our Ad Process */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Advertising Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We follow a proven 5-step process to create and manage advertising campaigns that deliver exceptional results.
            </p>
          </div>
          
          <div className="space-y-8">
            {adProcess.map((step, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-red-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
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

      {/* Key Features */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Our Advertising Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Every advertising campaign we create is designed to maximize ROI and drive measurable business results.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-sm">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-red-600" />
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

      {/* Pricing Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Choose Your Advertising Package</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select the package that best fits your advertising needs and budget.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {service.tiers.map((tier, index) => (
              <div key={index} className={`relative rounded-lg border-2 p-6 ${
                tier.popular 
                  ? 'border-red-500 bg-red-50' 
                  : 'border-gray-200 bg-white'
              }`}>
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <tier.icon className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{tier.name}</h3>
                  <div className="text-2xl font-bold text-red-600 mb-2">{tier.price}</div>
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
                    href={`/checkout?service=paid-ads-social&tier=${index}`}
                    className={`w-full block text-center py-2 px-4 rounded font-semibold text-sm transition-colors ${
                      tier.popular
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Get Started
                  </Link>
                  <button 
                    onClick={() => setSelectedTier(index)}
                    className="w-full text-center py-1 px-4 text-xs text-gray-600 hover:text-red-600"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">
              Everything you need to know about our paid advertising and social media marketing services.
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
      <section className="py-12 bg-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Start Your Ad Campaign?</h2>
          <p className="text-red-100 mb-8 max-w-2xl mx-auto">
            Let's create advertising campaigns that drive immediate traffic, generate qualified leads, and grow your business. 
            Get started with a free advertising consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/checkout?service=paid-ads-social" className="bg-white text-red-600 px-6 py-3 rounded font-semibold hover:bg-gray-100 transition-colors">
              Start Your Ad Campaign
            </Link>
            <Link href="/contact" className="border-2 border-white text-white px-6 py-3 rounded font-semibold hover:bg-white hover:text-red-600 transition-colors">
              Free Ad Consultation
            </Link>
          </div>
          <p className="text-red-200 text-sm mt-4">
            <Award className="w-4 h-4 inline mr-1" />
            30-day money-back guarantee on all advertising campaigns
          </p>
        </div>
      </section>
    </div>
  )
}

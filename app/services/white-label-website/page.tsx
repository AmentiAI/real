'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Star, ChevronDown, Monitor, Target, Users, Award, Clock, DollarSign, Globe, Search, Smartphone, Database, Settings, Headphones, FileText, Calendar, MessageSquare, PieChart, TrendingDown, AlertCircle, CheckCircle2, XCircle, Info, ExternalLink, Download, Play, Pause, RefreshCw, Lock, Unlock, Eye, EyeOff, Filter, SortAsc, SortDesc, MoreHorizontal, MoreVertical, Plus, Minus, Edit, Trash2, Save, Copy, Share, Bookmark, Heart, ThumbsUp, ThumbsDown, Flag, Report, HelpCircle, QuestionMarkCircle, Lightbulb, Bulb, Idea, Brain, Cpu, HardDrive, Wifi, WifiOff, Signal, SignalHigh, SignalLow, Battery, BatteryCharging, Power, PowerOff, Volume2, VolumeX, Mic, MicOff, Camera, Video, VideoOff, Image, File, Folder, FolderOpen, Archive, Inbox, Send, Mail, MailOpen, Reply, Forward, Share2, Copy2, Cut, Scissors, Paste, Clipboard, ClipboardList, ClipboardCheck, ClipboardCopy, ClipboardX, FilePlus, FileMinus, FileX, FileCheck, FileEdit, FileSearch, FileText2, FileCode, FileImage, FileVideo, FileAudio, FileZip, FilePdf, FileWord, FileExcel, FilePowerpoint, FileCsv, FileJson, FileXml, FileHtml, FileCss, FileJs, FileTs, FileJsx, FileTsx, FileVue, FileReact, FileAngular, FileSvelte, FilePhp, FilePython, FileJava, FileC, FileCpp, FileCsharp, FileGo, FileRust, FileSwift, FileKotlin, FileDart, FileR, FileRuby, FilePerl, FileLua, FileBash, FileSh, FileBat, FileCmd, FilePs1, FileYaml, FileToml, FileIni, FileEnv, FileGitignore, FileDockerfile, FileMakefile, FileReadme, FileLicense, FileChangelog, FileContributing, FileSecurity, FileCodeowners, FileEditorconfig, FilePrettier, FileEslint, FileBabel, FileWebpack, FileRollup, FileVite, FileParcel, FileGulp, FileGrunt, FileNpm, FileYarn, FilePnpm, FileBun, FileDeno, FileNode, FileExpress, FileKoa, FileHapi, FileFastify, FileNest, FileNext, FileNuxt, FileSvelteKit, FileRemix, FileGatsby, FileAstro, FileSolid, FileQwik, FileLit, FileStencil, FileAlpine, FileMithril, FileHyperapp, FileInferno, FilePreact, FileRiot, FileMarko, FileMithril2, FilePolymer, FileAurelia, FileBackbone, FileEmber, FileKnockout, FileMithril3, FileRactive, FileRivets, FileRivets2, FileRivets3, FileRivets4, FileRivets5, FileRivets6, FileRivets7, FileRivets8, FileRivets9, FileRivets10, ShoppingCart, Link as LinkIcon, Zap, Shield, TrendingUp } from 'lucide-react'

const service = {
  title: 'White Label Website Design',
  icon: '🏢',
  description: 'Professional website design services that you can resell to your clients under your own brand.',
  longDescription: 'Offer professional website design services to your clients without the overhead of an in-house team. Our white label website design services let you deliver high-quality websites while maintaining 2-3x profit margins.',
  tiers: [
    {
      name: 'Starter White Label',
      price: '$800',
      setupPrice: '$800',
      monthlyPrice: '$0',
      period: 'per project',
      popular: false,
      icon: Monitor,
      bestFor: 'small agencies, freelancers, local services',
      features: [
        '5-page responsive website',
        'Mobile-optimized design',
        'Basic SEO setup',
        'Contact form integration',
        'White-label delivery',
        'Client communication tools',
        '2 rounds of revisions',
        '30 days support'
      ]
    },
    {
      name: 'Professional White Label',
      price: '$2,500',
      setupPrice: '$2,500',
      monthlyPrice: '$0',
      period: 'per project',
      popular: true,
      icon: Target,
      bestFor: 'growing agencies, marketing firms, consultants',
      features: [
        '10-15 page responsive website',
        'Custom design & branding',
        'Advanced SEO optimization',
        'E-commerce functionality',
        'CMS integration',
        'White-label project management',
        'Client portal access',
        'Unlimited revisions',
        '90 days support',
        'Agency training materials'
      ]
    },
    {
      name: 'Enterprise White Label',
      price: '$8,000+',
      setupPrice: '$8,000',
      monthlyPrice: '$0',
      period: 'per project',
      popular: false,
      icon: Award,
      bestFor: 'large agencies, enterprises, franchises',
      features: [
        '20+ page enterprise website',
        'Custom functionality & features',
        'Advanced e-commerce platform',
        'Multi-language support',
        'API integrations',
        'Dedicated project manager',
        'White-label reporting tools',
        'Priority support',
        '6 months support',
        'Agency certification program',
        'Custom training materials',
        'Ongoing partnership'
      ]
    }
  ]
}

const websiteTypes = [
  {
    category: 'Business Websites',
    icon: Monitor,
    items: ['Corporate websites', 'Service pages', 'About & contact pages', 'Team pages', 'Portfolio sections', 'Blog integration']
  },
  {
    category: 'E-commerce Platforms',
    icon: ShoppingCart,
    items: ['Online stores', 'Product catalogs', 'Shopping carts', 'Payment processing', 'Inventory management', 'Order tracking']
  },
  {
    category: 'Lead Generation',
    icon: Target,
    items: ['Landing pages', 'Lead capture forms', 'Lead magnets', 'Email opt-ins', 'Contact forms', 'Quote request forms']
  },
  {
    category: 'Portfolio Sites',
    icon: Image,
    items: ['Creative portfolios', 'Photography galleries', 'Video showcases', 'Project case studies', 'Client testimonials', 'Award displays']
  },
  {
    category: 'Membership Sites',
    icon: Users,
    items: ['User registration', 'Login systems', 'Content protection', 'Subscription management', 'Member dashboards', 'Payment gateways']
  },
  {
    category: 'Custom Applications',
    icon: Settings,
    items: ['Web applications', 'Custom dashboards', 'CRM integration', 'Booking systems', 'Event management', 'Community platforms']
  }
]

const whiteLabelProcess = [
  {
    step: '01',
    title: 'Project Handoff',
    description: 'We receive your client project details and requirements through our white-label portal',
    duration: '1 day',
    deliverables: ['Project brief review', 'Requirements clarification', 'Timeline confirmation', 'Resource allocation', 'Communication setup', 'Project kickoff']
  },
  {
    step: '02',
    title: 'Design & Development',
    description: 'Create the website according to your client\'s specifications and brand guidelines',
    duration: '2-4 weeks',
    deliverables: ['Custom design mockups', 'Client feedback integration', 'Responsive development', 'Content integration', 'Functionality testing', 'Quality assurance']
  },
  {
    step: '03',
    title: 'Client Review & Revisions',
    description: 'Present the website to your client and incorporate their feedback and revisions',
    duration: '1-2 weeks',
    deliverables: ['Client presentation', 'Feedback collection', 'Revision implementation', 'Final approval', 'Content updates', 'Design refinements']
  },
  {
    step: '04',
    title: 'Launch & Delivery',
    description: 'Deploy the website and provide all necessary files and documentation',
    duration: '3-5 days',
    deliverables: ['Website deployment', 'Domain setup', 'SSL configuration', 'File delivery', 'Documentation', 'Training materials']
  },
  {
    step: '05',
    title: 'Ongoing Support',
    description: 'Provide ongoing support and maintenance as part of your white-label package',
    duration: 'Ongoing',
    deliverables: ['Technical support', 'Bug fixes', 'Content updates', 'Performance monitoring', 'Security updates', 'Feature enhancements']
  }
]

const features = [
  {
    icon: Monitor,
    title: 'Professional Design',
    description: 'High-quality, modern website designs that impress clients and drive conversions.',
    benefits: ['Client satisfaction', 'Professional credibility', 'Higher conversion rates', 'Competitive advantage']
  },
  {
    icon: Smartphone,
    title: 'Mobile Responsive',
    description: 'All websites are fully responsive and optimized for all devices and screen sizes.',
    benefits: ['Better user experience', 'Higher search rankings', 'Increased engagement', 'Future-proof design']
  },
  {
    icon: Search,
    title: 'SEO Optimized',
    description: 'Built with SEO best practices to help your clients rank higher in search results.',
    benefits: ['Better search visibility', 'More organic traffic', 'Higher lead generation', 'Long-term value']
  },
  {
    icon: Zap,
    title: 'Fast Performance',
    description: 'Optimized for speed and performance to provide the best user experience.',
    benefits: ['Better user experience', 'Higher conversion rates', 'Better search rankings', 'Reduced bounce rates']
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security and reliability to protect your clients\' websites.',
    benefits: ['Data protection', 'Client trust', 'Reduced security risks', 'Professional reputation']
  },
  {
    icon: Headphones,
    title: 'White-Label Support',
    description: 'Complete white-label experience with your branding and client communication tools.',
    benefits: ['Brand consistency', 'Client retention', 'Professional image', 'Seamless experience']
  }
]

const faqs = [
  {
    question: 'How does white-label website design work?',
    answer: 'We handle all the design and development work behind the scenes while you maintain the client relationship. You present the work as your own, and we provide all the support and resources you need.'
  },
  {
    question: 'Can I customize the websites for my clients?',
    answer: 'Absolutely! We work with your client\'s specific requirements, brand guidelines, and preferences to create custom websites that meet their exact needs.'
  },
  {
    question: 'What\'s included in the white-label delivery?',
    answer: 'We provide the completed website, all source files, documentation, training materials, and ongoing support. Everything is delivered under your brand with no mention of our company.'
  },
  {
    question: 'How do I communicate with clients during the project?',
    answer: 'We provide you with client communication tools and regular updates so you can keep your clients informed throughout the development process. You maintain full control of the client relationship.'
  },
  {
    question: 'What if my client needs changes after launch?',
    answer: 'We provide ongoing support and maintenance as part of our white-label packages. You can request changes and updates, and we\'ll handle them under your brand.'
  },
  {
    question: 'Do you provide training for my team?',
    answer: 'Yes! We provide comprehensive training materials and can conduct training sessions for your team to help you better serve your clients and manage projects.'
  }
]

export default function WhiteLabelWebsitePage() {
  const [selectedTier, setSelectedTier] = useState(1) // Default to Professional package

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Professional Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-slate-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
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
                White Label Website Design
              </h1>
              
              {/* Gradient Subtitle */}
              <div className="text-3xl md:text-4xl font-bold mb-8 animate-slide-up delay-200">
                <span className="bg-gradient-to-r from-slate-400 via-gray-400 to-blue-400 bg-clip-text text-transparent">
                  — Scale Your Agency with 2-3x Profits
                </span>
              </div>

              {/* Supporting Text */}
              <p className="text-lg md:text-xl text-slate-100 mb-12 max-w-4xl mx-auto leading-relaxed animate-slide-up delay-300">
                Offer professional website design services to your clients without the overhead of an in-house team. Our white label website design services let you deliver high-quality websites while maintaining 2-3x profit margins.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up delay-400">
                <Link 
                  href="/checkout?service=white-label-website" 
                  className="group relative px-8 py-4 bg-slate-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-slate-500/25 transition-all duration-300 hover:scale-105 hover:bg-slate-500"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Start Your White Label Program
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
                  </span>
                </Link>
                <Link 
                  href="/contact" 
                  className="px-8 py-4 bg-white text-gray-900 font-bold text-lg rounded-2xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 flex items-center justify-center"
                >
                  <div className="w-4 h-4 mr-2 border-l-4 border-b-4 border-gray-900 transform rotate-[-45deg]"></div>
                  Schedule Demo
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-slide-up delay-500">
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">2-3x</div>
                  <div className="text-slate-200 font-medium">Profit Margins</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">150+</div>
                  <div className="text-slate-200 font-medium">Agency Partners</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">500+</div>
                  <div className="text-slate-200 font-medium">Websites Delivered</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">24/7</div>
                  <div className="text-slate-200 font-medium">Support Available</div>
                </div>
              </div>
            </div>

            {/* Right Content - White Label Performance Dashboard */}
            <div className="hidden lg:block">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20 animate-slide-up delay-500">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">White Label Performance Dashboard</h3>
                  <p className="text-sm text-gray-600">Real-time agency metrics</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Profit Margin</span>
                      <DollarSign className="w-4 h-4 text-slate-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">300%</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-slate-500 h-2 rounded-full" style={{width: '100%'}}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Client Satisfaction</span>
                      <Users className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">4.9/5</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '98%'}}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Delivery Time</span>
                      <Clock className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">14 days</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '90%'}}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Agency Growth</span>
                      <TrendingUp className="w-4 h-4 text-purple-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">+200%</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-slate-100 to-gray-100 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Overall White Label Score</span>
                    <span className="text-2xl font-bold text-gray-900">A+ Grade</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-slate-500 to-gray-500 h-3 rounded-full" style={{width: '98%'}}></div>
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
          <div className="absolute top-20 left-10 w-4 h-4 bg-slate-400 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute top-40 right-20 w-3 h-3 bg-gray-400 rounded-full animate-bounce delay-2000"></div>
          <div className="absolute bottom-40 left-20 w-5 h-5 bg-blue-400 rounded-full animate-bounce delay-3000"></div>
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
      <section className="py-4 bg-slate-600">
        <div className="container-custom">
          <div className="flex items-center justify-center">
            <Star className="w-5 h-5 text-yellow-400 mr-2" />
            <span className="text-white font-medium">Trusted by 150+ Agencies for White Label Website Design</span>
          </div>
        </div>
      </section>

      {/* Why You Need White Label Website Design Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Your Agency Needs White Label Website Design
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Scale your agency without the overhead of hiring designers and developers. Focus on client relationships while we handle the technical work.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-slate-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Higher Profit Margins</h3>
              <p className="text-gray-600">
                Maintain 2-3x profit margins by offering website design services without the overhead of an in-house team.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-slate-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Focus on Client Relationships</h3>
              <p className="text-gray-600">
                Spend more time building relationships and growing your agency while we handle the technical work.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Monitor className="w-8 h-8 text-slate-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Professional Quality</h3>
              <p className="text-gray-600">
                Deliver high-quality websites that impress clients and build your agency's reputation.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-slate-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Faster Delivery</h3>
              <p className="text-gray-600">
                Get websites delivered faster with our experienced team and streamlined processes.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-slate-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Complete White Label</h3>
              <p className="text-gray-600">
                Everything is delivered under your brand with no mention of our company anywhere.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8 text-slate-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Ongoing Support</h3>
              <p className="text-gray-600">
                Get ongoing support and maintenance for all websites you deliver to clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Website Types We Build */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Website Types We Build</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We create all types of websites to help you serve any client need and grow your agency.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {websiteTypes.map((type, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mr-3">
                    <type.icon className="w-5 h-5 text-slate-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{type.category}</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {type.items.map((item, itemIndex) => (
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

      {/* Our White Label Process */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our White Label Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We handle everything behind the scenes while you maintain the client relationship and brand.
            </p>
          </div>
          
          <div className="space-y-8">
            {whiteLabelProcess.map((step, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-slate-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Our White Label Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Every white label project is designed to help you succeed and grow your agency.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-sm">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-slate-600" />
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Choose Your White Label Package</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select the package that best fits your agency's needs and client base.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {service.tiers.map((tier, index) => (
              <div key={index} className={`relative rounded-lg border-2 p-6 ${
                tier.popular 
                  ? 'border-slate-500 bg-slate-50' 
                  : 'border-gray-200 bg-white'
              }`}>
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-slate-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <tier.icon className="w-6 h-6 text-slate-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{tier.name}</h3>
                  <div className="text-2xl font-bold text-slate-600 mb-2">{tier.price}</div>
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
                    href={`/checkout?service=white-label-website&tier=${index}`}
                    className={`w-full block text-center py-2 px-4 rounded font-semibold text-sm transition-colors ${
                      tier.popular
                        ? 'bg-slate-600 text-white hover:bg-slate-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Get Started
                  </Link>
                  <button 
                    onClick={() => setSelectedTier(index)}
                    className="w-full text-center py-1 px-4 text-xs text-gray-600 hover:text-slate-600"
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
              Everything you need to know about our white label website design services.
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
      <section className="py-12 bg-slate-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Scale Your Agency?</h2>
          <p className="text-slate-100 mb-8 max-w-2xl mx-auto">
            Let's help you offer professional website design services to your clients while maintaining 2-3x profit margins. 
            Get started with a free white label consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/checkout?service=white-label-website" className="bg-white text-slate-600 px-6 py-3 rounded font-semibold hover:bg-gray-100 transition-colors">
              Start Your White Label Program
            </Link>
            <Link href="/contact" className="border-2 border-white text-white px-6 py-3 rounded font-semibold hover:bg-white hover:text-slate-600 transition-colors">
              Free White Label Demo
            </Link>
          </div>
          <p className="text-slate-200 text-sm mt-4">
            <Award className="w-4 h-4 inline mr-1" />
            30-day money-back guarantee on all white label projects
          </p>
        </div>
      </section>
    </div>
  )
}

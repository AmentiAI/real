'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Star, ChevronDown, Rocket, TrendingUp, Award, Clock, Users, Target, BarChart3, Zap, Shield, Phone, DollarSign, Globe, Search, Monitor, Smartphone, Database, Settings, Headphones, FileText, Calendar, MessageSquare, PieChart, TrendingDown, AlertCircle, CheckCircle2, XCircle, Info, ExternalLink, Download, Play, Pause, RefreshCw, Lock, Unlock, Eye, EyeOff, Filter, SortAsc, SortDesc, MoreHorizontal, MoreVertical, Plus, Minus, Edit, Trash2, Save, Copy, Share, Bookmark, Heart, ThumbsUp, ThumbsDown, Flag, Report, HelpCircle, QuestionMarkCircle, Lightbulb, Bulb, Idea, Brain, Cpu, HardDrive, Wifi, WifiOff, Signal, SignalHigh, SignalLow, Battery, BatteryCharging, Power, PowerOff, Volume2, VolumeX, Mic, MicOff, Camera, Video, VideoOff, Image, File, Folder, FolderOpen, Archive, Inbox, Send, Mail, MailOpen, Reply, Forward, Share2, Copy2, Cut, Scissors, Paste, Clipboard, ClipboardList, ClipboardCheck, ClipboardCopy, ClipboardX, FilePlus, FileMinus, FileX, FileCheck, FileEdit, FileSearch, FileText2, FileCode, FileImage, FileVideo, FileAudio, FileZip, FilePdf, FileWord, FileExcel, FilePowerpoint, FileCsv, FileJson, FileXml, FileHtml, FileCss, FileJs, FileTs, FileJsx, FileTsx, FileVue, FileReact, FileAngular, FileSvelte, FilePhp, FilePython, FileJava, FileC, FileCpp, FileCsharp, FileGo, FileRust, FileSwift, FileKotlin, FileDart, FileR, FileRuby, FilePerl, FileLua, FileBash, FileSh, FileBat, FileCmd, FilePs1, FileYaml, FileToml, FileIni, FileEnv, FileGitignore, FileDockerfile, FileMakefile, FileReadme, FileLicense, FileChangelog, FileContributing, FileSecurity, FileCodeowners, FileEditorconfig, FilePrettier, FileEslint, FileBabel, FileWebpack, FileRollup, FileVite, FileParcel, FileGulp, FileGrunt, FileNpm, FileYarn, FilePnpm, FileBun, FileDeno, FileNode, FileExpress, FileKoa, FileHapi, FileFastify, FileNest, FileNext, FileNuxt, FileSvelteKit, FileRemix, FileGatsby, FileAstro, FileSolid, FileQwik, FileLit, FileStencil, FileAlpine, FileMithril, FileHyperapp, FileInferno, FilePreact, FileRiot, FileMarko, FileMithril2, FilePolymer, FileAurelia, FileBackbone, FileEmber, FileKnockout, FileMithril3, FileRactive, FileRivets, FileRivets2, FileRivets3, FileRivets4, FileRivets5, FileRivets6, FileRivets7, FileRivets8, FileRivets9, FileRivets10 } from 'lucide-react'

const service = {
  title: 'Complete Growth Packages',
  icon: '🚀',
  description: 'All-in-one solutions combining website development with ongoing SEO for maximum business growth.',
  longDescription: 'Our Complete Growth Packages are designed to give you everything you need to dominate your market. We combine professional website development with comprehensive SEO services to deliver measurable results that grow your business.',
  tiers: [
    {
      name: 'Starter Growth Package',
      price: '$2,200 + $1,200/mo',
      setupPrice: '$2,200',
      monthlyPrice: '$1,200',
      period: 'setup + monthly',
      popular: false,
      icon: Rocket,
      bestFor: 'local shops, contractors, salons, restaurants',
      features: [
        'Up to 5-page SEO-ready site (responsive, mobile-first)',
        'Basic on-page SEO setup (titles, metadata, headers, alt tags)',
        'Blog section included for future growth',
        'Google Analytics + Search Console',
        '20 local keywords targeted',
        'Google Business Profile optimization',
        'Local directory submissions (Yelp, BBB, Maps, etc.)',
        'Basic backlinks (citations & local links)',
        'Monthly SEO performance report'
      ]
    },
    {
      name: 'Business Growth Package',
      price: '$5,000 + $3,500/mo',
      setupPrice: '$5,000',
      monthlyPrice: '$3,500',
      period: 'setup + monthly',
      popular: true,
      icon: TrendingUp,
      bestFor: 'law firms, e-commerce shops, agencies, clinics',
      features: [
        '10–15 page custom website',
        'Keyword-targeted service & location pages',
        'Blog system with categories/tags',
        'Lead capture forms (CRM/email integrations)',
        'Advanced speed + Core Web Vitals optimization',
        '60 targeted keywords (local + regional/national mix)',
        'Full technical SEO audit & fixes',
        'Keyword clustering + content gap strategy',
        '4 SEO-optimized blog posts/month',
        'Competitor tracking + rank monitoring',
        'White-hat backlink campaigns',
        'Live whitelabel analytics dashboard'
      ]
    },
    {
      name: 'Enterprise Domination Package',
      price: '$12,500 + $8,000/mo',
      setupPrice: '$12,500',
      monthlyPrice: '$8,000',
      period: 'setup + monthly',
      popular: false,
      icon: Award,
      bestFor: 'franchises, SaaS companies, large e-commerce',
      features: [
        '20–30+ page premium website (franchise, SaaS, or large e-com)',
        'Conversion funnels (booking, memberships, checkout/e-commerce)',
        'Multi-location SEO architecture',
        'Advanced schema markup (services, products, reviews, FAQs)',
        'Custom integrations (dashboards, APIs, automation)',
        '150 targeted keywords (local + national)',
        'Enterprise technical SEO (site architecture, schema layers, Core Web Vitals)',
        'Advanced backlink outreach (PR features, high DA guest posts)',
        'Content engine: 8+ SEO blogs/month + AI-powered automation',
        'Multi-location SEO strategy for franchises',
        'Conversion optimization (A/B testing, funnel tracking, heatmaps)',
        'Dedicated account manager + quarterly workshops'
      ]
    }
  ]
}

const benefits = [
  {
    icon: Target,
    title: 'Proven Results',
    description: 'Our packages have generated over $50M in additional revenue for clients',
    details: 'We track every metric and optimize continuously. Our average client sees 247% increase in organic leads within 90 days.'
  },
  {
    icon: Zap,
    title: 'Lightning Fast Setup',
    description: 'Get your complete solution live in 30-60 days',
    details: 'Our streamlined process and experienced team ensure rapid deployment without compromising quality.'
  },
  {
    icon: Shield,
    title: 'Risk-Free Guarantee',
    description: 'If we don\'t deliver results, we work free next month',
    details: 'We\'re so confident in our approach that we put our money where our mouth is. Your success is our success.'
  },
  {
    icon: BarChart3,
    title: 'Transparent Reporting',
    description: 'Real-time dashboards show exactly what we\'re doing',
    details: 'No black box. You get full visibility into every aspect of your campaign with detailed monthly reports.'
  }
]

const processSteps = [
  {
    step: '01',
    title: 'Discovery & Strategy',
    description: 'We analyze your business, competitors, and market to create a custom growth strategy',
    duration: '1-2 weeks',
    deliverables: ['Business analysis report', 'Competitor research', 'Keyword strategy', 'Technical audit']
  },
  {
    step: '02',
    title: 'Website Development',
    description: 'Build your high-converting website with SEO built-in from day one',
    duration: '2-4 weeks',
    deliverables: ['Custom website design', 'Mobile optimization', 'Speed optimization', 'SEO implementation']
  },
  {
    step: '03',
    title: 'SEO Implementation',
    description: 'Launch comprehensive SEO campaigns targeting your most valuable keywords',
    duration: '1-2 weeks',
    deliverables: ['On-page optimization', 'Technical SEO fixes', 'Content strategy', 'Link building launch']
  },
  {
    step: '04',
    title: 'Content & Growth',
    description: 'Create and publish high-quality content that ranks and converts',
    duration: 'Ongoing',
    deliverables: ['Monthly content calendar', 'SEO-optimized blog posts', 'Content promotion', 'Performance tracking']
  },
  {
    step: '05',
    title: 'Optimization & Scale',
    description: 'Continuously optimize and scale your campaigns for maximum ROI',
    duration: 'Ongoing',
    deliverables: ['Monthly reporting', 'A/B testing', 'Conversion optimization', 'Strategy refinement']
  }
]

const caseStudies = [
  // Case studies will be loaded from database
]

const faqs = [
  {
    question: 'How quickly will I see results?',
    answer: 'Most clients see initial improvements in 30-60 days, with significant results by 90 days. Our Starter package clients average 247% increase in organic leads within 12 weeks.'
  },
  {
    question: 'What makes your packages different?',
    answer: 'We combine website development with SEO from day one, ensuring your site is built to rank. Plus, our risk-free guarantee means we work free next month if we don\'t deliver results.'
  },
  {
    question: 'Can I upgrade or downgrade my package?',
    answer: 'Absolutely! We understand business needs change. You can upgrade or downgrade your package with 30 days notice. We\'ll help you transition smoothly.'
  },
  {
    question: 'Do you work with businesses outside Rhode Island?',
    answer: 'Yes! While we\'re based in Rhode Island, we work with businesses nationwide. Our SEO strategies work for local, regional, and national businesses.'
  },
  {
    question: 'What if I already have a website?',
    answer: 'No problem! We can audit your existing site and either optimize it or rebuild it as part of your package. We\'ll work with what you have to maximize your ROI.'
  },
  {
    question: 'How do you measure success?',
    answer: 'We track everything: organic traffic, keyword rankings, lead generation, conversion rates, and revenue. You get detailed monthly reports showing exactly what we\'re doing and the results.'
  }
]

export default function CompleteGrowthPackagesPage() {
  const [selectedTier, setSelectedTier] = useState(1) // Default to Business package

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Professional Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
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
                Complete Growth Packages
              </h1>
              
              {/* Gradient Subtitle */}
              <div className="text-3xl md:text-4xl font-bold mb-8 animate-slide-up delay-200">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
                  — Website + SEO = Maximum Growth
                </span>
              </div>

              {/* Supporting Text */}
              <p className="text-lg md:text-xl text-purple-100 mb-12 max-w-4xl mx-auto leading-relaxed animate-slide-up delay-300">
                Get everything you need to dominate your market with our all-in-one Complete Growth Packages. We combine professional website development with comprehensive SEO services to deliver measurable results that grow your business and increase your revenue.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up delay-400">
                <Link 
                  href="/checkout?service=complete-growth-packages" 
                  className="group relative px-8 py-4 bg-purple-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 hover:bg-purple-500"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Start Your Growth Package
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
                  </span>
                </Link>
                <Link 
                  href="/case-studies" 
                  className="px-8 py-4 bg-white text-gray-900 font-bold text-lg rounded-2xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 flex items-center justify-center"
                >
                  <div className="w-4 h-4 mr-2 border-l-4 border-b-4 border-gray-900 transform rotate-[-45deg]"></div>
                  View Growth Results
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-slide-up delay-500">
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">500+</div>
                  <div className="text-purple-200 font-medium">Growth Packages</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">300%</div>
                  <div className="text-purple-200 font-medium">Avg Revenue Growth</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">90 Days</div>
                  <div className="text-purple-200 font-medium">To See Results</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">$5M+</div>
                  <div className="text-purple-200 font-medium">Revenue Generated</div>
                </div>
              </div>
            </div>

            {/* Right Content - Growth Performance Dashboard */}
            <div className="hidden lg:block">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20 animate-slide-up delay-500">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Growth Performance Dashboard</h3>
                  <p className="text-sm text-gray-600">Real-time growth metrics</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Website Traffic</span>
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">+300%</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '90%'}}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Lead Generation</span>
                      <Users className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">+250%</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Revenue Growth</span>
                      <DollarSign className="w-4 h-4 text-purple-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">+300%</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{width: '95%'}}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">ROI</span>
                      <Award className="w-4 h-4 text-orange-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">500%</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{width: '100%'}}></div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Overall Growth Score</span>
                    <span className="text-2xl font-bold text-gray-900">A+ Grade</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full" style={{width: '98%'}}></div>
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
          <div className="absolute top-20 left-10 w-4 h-4 bg-purple-400 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute top-40 right-20 w-3 h-3 bg-pink-400 rounded-full animate-bounce delay-2000"></div>
          <div className="absolute bottom-40 left-20 w-5 h-5 bg-indigo-400 rounded-full animate-bounce delay-3000"></div>
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
      <section className="py-4 bg-purple-600">
        <div className="container-custom">
          <div className="flex items-center justify-center">
            <Star className="w-5 h-5 text-yellow-400 mr-2" />
            <span className="text-white font-medium">Trusted by 500+ Businesses for Complete Growth Packages</span>
          </div>
        </div>
      </section>

      {/* Why You Need Complete Growth Packages Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Your Business Needs Complete Growth Packages
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Most businesses struggle with fragmented digital marketing efforts. Our Complete Growth Packages solve this by providing everything you need in one comprehensive solution.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Integrated Strategy</h3>
              <p className="text-gray-600">
                Your website and SEO work together seamlessly from day one, ensuring maximum impact and faster results.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Proven Results</h3>
              <p className="text-gray-600">
                Our clients see an average 247% increase in organic leads within 12 weeks of implementation.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Risk-Free Guarantee</h3>
              <p className="text-gray-600">
                If we don't increase your organic leads by at least 25% in 90 days, we work free the next month.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              The Problem Most Businesses Face
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-red-600 mb-3">❌ Without Complete Growth Packages:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Website and SEO work separately, reducing effectiveness</li>
                  <li>• Multiple vendors create communication gaps and delays</li>
                  <li>• Higher costs due to separate service providers</li>
                  <li>• Inconsistent branding and messaging across channels</li>
                  <li>• Slower time to market and results</li>
                  <li>• No single point of accountability for results</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-green-600 mb-3">✅ With Complete Growth Packages:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Integrated strategy maximizes every marketing dollar</li>
                  <li>• Single team ensures seamless communication and execution</li>
                  <li>• Cost savings through bundled services</li>
                  <li>• Consistent branding and messaging across all touchpoints</li>
                  <li>• Faster implementation and quicker results</li>
                  <li>• One team accountable for your entire digital presence</li>
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
              Why Amenti AI is the Best Choice for Your Complete Growth Package
            </h2>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              We're not just another digital marketing agency. We're Rhode Island natives who understand local business challenges and deliver results that matter.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Local Expertise</h3>
              <p className="text-primary-100">
                We're Rhode Island natives who understand the unique challenges of doing business in New England.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Data-Driven Results</h3>
              <p className="text-primary-100">
                We focus on metrics that matter to your business: leads, calls, and revenue, not just vanity metrics.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Dedicated Team</h3>
              <p className="text-primary-100">
                You get a dedicated team of experts who know your business and are committed to your success.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast Implementation</h3>
              <p className="text-primary-100">
                Most websites are live within 4-6 weeks, with SEO results visible within 30-60 days.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Transparent Reporting</h3>
              <p className="text-primary-100">
                Monthly reports show exactly what we're doing and how it's impacting your business.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">24/7 Support</h3>
              <p className="text-primary-100">
                We're always available when you need us, with direct access to your project team.
              </p>
            </div>
          </div>

          <div className="bg-white/10 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Our Track Record Speaks for Itself</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-3xl font-bold text-white mb-2">500+</div>
                <div className="text-primary-100">Projects Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">247%</div>
                <div className="text-primary-100">Avg Lead Increase</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">98%</div>
                <div className="text-primary-100">Client Satisfaction</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">$50M+</div>
                <div className="text-primary-100">Revenue Generated</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Complete Growth Packages */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Complete Growth Packages Work</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our integrated approach combines the best of website development and SEO to deliver unmatched results.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{benefit.description}</p>
                <p className="text-xs text-gray-500">{benefit.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Deliver Results */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Deliver Results</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our proven 5-step process ensures your success from day one.
            </p>
          </div>
          
          <div className="space-y-8">
            {processSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                    {step.step}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 mb-3">{step.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {step.duration}
                    </span>
                    <span className="flex items-center">
                      <FileText className="w-4 h-4 mr-1" />
                      {step.deliverables.length} deliverables
                    </span>
                  </div>
                  <div className="mt-3">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Deliverables:</h4>
                    <ul className="grid grid-cols-2 gap-1 text-xs text-gray-600">
                      {step.deliverables.map((deliverable, idx) => (
                        <li key={idx} className="flex items-center">
                          <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                          {deliverable}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Choose Your Growth Package</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select the package that best fits your business size and growth goals.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {service.tiers.map((tier, index) => (
              <div key={index} className={`relative rounded-lg border-2 p-6 ${
                tier.popular 
                  ? 'border-primary-500 bg-primary-50' 
                  : 'border-gray-200 bg-white'
              }`}>
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <tier.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{tier.name}</h3>
                  <div className="text-2xl font-bold text-primary-600 mb-2">{tier.price}</div>
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
                    href={`/checkout?service=complete-growth-packages&tier=${index}`}
                    className={`w-full block text-center py-2 px-4 rounded font-semibold text-sm transition-colors ${
                      tier.popular
                        ? 'bg-primary-600 text-white hover:bg-primary-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Get Started
                  </Link>
                  <button 
                    onClick={() => setSelectedTier(index)}
                    className="w-full text-center py-1 px-4 text-xs text-gray-600 hover:text-primary-600"
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
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Real Results from Real Clients</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See how our Complete Growth Packages have transformed businesses across Rhode Island and beyond.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {caseStudies.map((study, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{study.company}</h3>
                  <p className="text-sm text-gray-500 mb-2">{study.industry}</p>
                  <span className="inline-block bg-primary-100 text-primary-800 px-2 py-1 rounded text-xs font-semibold">
                    {study.package}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{study.results.leads}</div>
                    <div className="text-xs text-gray-500">Lead Increase</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{study.results.revenue}</div>
                    <div className="text-xs text-gray-500">Revenue Growth</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">{study.results.rankings}</div>
                    <div className="text-xs text-gray-500">Top Rankings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600">{study.results.timeframe}</div>
                    <div className="text-xs text-gray-500">Timeframe</div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">{study.description}</p>
                
                <Link href="/case-studies" className="text-primary-600 hover:text-primary-700 text-sm font-semibold">
                  Read Full Case Study →
                </Link>
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
              Everything you need to know about our Complete Growth Packages.
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
      <section className="py-12 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Dominate Your Market?</h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Join 150+ businesses that have transformed their growth with our Complete Growth Packages. 
            Get started today with our risk-free guarantee.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/checkout?service=complete-growth-packages" className="bg-white text-primary-600 px-6 py-3 rounded font-semibold hover:bg-gray-100 transition-colors">
              Get Started Today
            </Link>
            <Link href="/contact" className="border-2 border-white text-white px-6 py-3 rounded font-semibold hover:bg-white hover:text-primary-600 transition-colors">
              Schedule Free Consultation
            </Link>
          </div>
          <p className="text-primary-200 text-sm mt-4">
            <Shield className="w-4 h-4 inline mr-1" />
            Risk-free guarantee: If we don't deliver results, we work free next month
          </p>
        </div>
      </section>
    </div>
  )
}
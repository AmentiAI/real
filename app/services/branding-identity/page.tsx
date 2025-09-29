'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Star, ChevronDown, Palette, Target, Users, Award, Clock, DollarSign, Globe, Search, Monitor, Smartphone, Database, Settings, Headphones, FileText, Calendar, MessageSquare, PieChart, TrendingDown, AlertCircle, CheckCircle2, XCircle, Info, ExternalLink, Download, Play, Pause, RefreshCw, Lock, Unlock, Eye, EyeOff, Filter, SortAsc, SortDesc, MoreHorizontal, MoreVertical, Plus, Minus, Edit, Trash2, Save, Copy, Share, Bookmark, Heart, ThumbsUp, ThumbsDown, Flag, Report, HelpCircle, QuestionMarkCircle, Lightbulb, Bulb, Idea, Brain, Cpu, HardDrive, Wifi, WifiOff, Signal, SignalHigh, SignalLow, Battery, BatteryCharging, Power, PowerOff, Volume2, VolumeX, Mic, MicOff, Camera, Video, VideoOff, Image, File, Folder, FolderOpen, Archive, Inbox, Send, Mail, MailOpen, Reply, Forward, Share2, Copy2, Cut, Scissors, Paste, Clipboard, ClipboardList, ClipboardCheck, ClipboardCopy, ClipboardX, FilePlus, FileMinus, FileX, FileCheck, FileEdit, FileSearch, FileText2, FileCode, FileImage, FileVideo, FileAudio, FileZip, FilePdf, FileWord, FileExcel, FilePowerpoint, FileCsv, FileJson, FileXml, FileHtml, FileCss, FileJs, FileTs, FileJsx, FileTsx, FileVue, FileReact, FileAngular, FileSvelte, FilePhp, FilePython, FileJava, FileC, FileCpp, FileCsharp, FileGo, FileRust, FileSwift, FileKotlin, FileDart, FileR, FileRuby, FilePerl, FileLua, FileBash, FileSh, FileBat, FileCmd, FilePs1, FileYaml, FileToml, FileIni, FileEnv, FileGitignore, FileDockerfile, FileMakefile, FileReadme, FileLicense, FileChangelog, FileContributing, FileSecurity, FileCodeowners, FileEditorconfig, FilePrettier, FileEslint, FileBabel, FileWebpack, FileRollup, FileVite, FileParcel, FileGulp, FileGrunt, FileNpm, FileYarn, FilePnpm, FileBun, FileDeno, FileNode, FileExpress, FileKoa, FileHapi, FileFastify, FileNest, FileNext, FileNuxt, FileSvelteKit, FileRemix, FileGatsby, FileAstro, FileSolid, FileQwik, FileLit, FileStencil, FileAlpine, FileMithril, FileHyperapp, FileInferno, FilePreact, FileRiot, FileMarko, FileMithril2, FilePolymer, FileAurelia, FileBackbone, FileEmber, FileKnockout, FileMithril3, FileRactive, FileRivets, FileRivets2, FileRivets3, FileRivets4, FileRivets5, FileRivets6, FileRivets7, FileRivets8, FileRivets9, FileRivets10, TrendingUp } from 'lucide-react'

const service = {
  title: 'Branding & Identity Design',
  icon: '🎨',
  description: 'Professional brand identity that makes your business memorable and builds trust with customers.',
  longDescription: 'Your brand is more than just a logo—it\'s the complete visual and emotional experience customers have with your business. We create comprehensive brand identities that differentiate you from competitors, build trust, and drive customer loyalty.',
  tiers: [
    {
      name: 'Starter Brand Package',
      price: '$2,500',
      setupPrice: '$2,500',
      monthlyPrice: '$0',
      period: 'one-time',
      popular: false,
      icon: Palette,
      bestFor: 'startups, small businesses, freelancers',
      features: [
        'Logo design (3 concepts)',
        'Brand colors & typography',
        'Business card design',
        'Letterhead & envelope design',
        'Brand guidelines document',
        'Social media profile graphics',
        '2 rounds of revisions',
        'Final files in all formats'
      ]
    },
    {
      name: 'Complete Brand Package',
      price: '$5,000',
      setupPrice: '$5,000',
      monthlyPrice: '$0',
      period: 'one-time',
      popular: true,
      icon: Target,
      bestFor: 'growing businesses, agencies, consultants',
      features: [
        'Comprehensive brand strategy',
        'Logo design (5 concepts)',
        'Complete brand identity system',
        'Business card & stationery suite',
        'Marketing materials design',
        'Social media kit (20+ graphics)',
        'Brand guidelines (comprehensive)',
        '3 rounds of revisions',
        'Brand application examples',
        'Final files in all formats'
      ]
    },
    {
      name: 'Enterprise Brand Package',
      price: '$12,000+',
      setupPrice: '$12,000',
      monthlyPrice: '$0',
      period: 'one-time',
      popular: false,
      icon: Award,
      bestFor: 'enterprises, franchises, large companies',
      features: [
        'Full brand audit & strategy',
        'Logo design (unlimited concepts)',
        'Complete brand identity system',
        'Comprehensive brand guidelines',
        'Marketing materials suite',
        'Digital brand assets',
        'Brand training for team',
        'Unlimited revisions',
        'Ongoing brand consultation',
        'Brand implementation support'
      ]
    }
  ]
}

const designProcess = [
  {
    step: '01',
    title: 'Brand Discovery',
    description: 'We dive deep into your business, target audience, and competitive landscape to understand your unique positioning',
    duration: '1 week',
    deliverables: ['Brand audit', 'Competitor analysis', 'Target audience research', 'Brand positioning strategy', 'Brand personality definition']
  },
  {
    step: '02',
    title: 'Concept Development',
    description: 'Create multiple brand concepts that capture your unique essence and resonate with your target audience',
    duration: '1-2 weeks',
    deliverables: ['Logo concepts', 'Color palette options', 'Typography selections', 'Brand mood boards', 'Initial brand applications']
  },
  {
    step: '03',
    title: 'Design Refinement',
    description: 'Refine the chosen concept based on feedback and develop the complete brand identity system',
    duration: '1-2 weeks',
    deliverables: ['Final logo design', 'Complete color system', 'Typography guidelines', 'Brand applications', 'Style variations']
  },
  {
    step: '04',
    title: 'Brand Guidelines',
    description: 'Create comprehensive brand guidelines that ensure consistent application across all touchpoints',
    duration: '1 week',
    deliverables: ['Brand guidelines document', 'Usage examples', 'Do\'s and don\'ts', 'File specifications', 'Implementation guide']
  },
  {
    step: '05',
    title: 'Final Delivery',
    description: 'Deliver all brand assets in the formats you need for immediate implementation',
    duration: '3 days',
    deliverables: ['Final brand files', 'All format variations', 'Brand guidelines PDF', 'Implementation support', 'Brand handoff meeting']
  }
]

const features = [
  {
    icon: Palette,
    title: 'Strategic Brand Design',
    description: 'Every design decision is backed by strategy, ensuring your brand resonates with your target audience and drives business results.',
    benefits: ['Higher brand recognition', 'Increased customer trust', 'Better market positioning', 'Stronger brand loyalty']
  },
  {
    icon: Target,
    title: 'Memorable Visual Identity',
    description: 'Create a distinctive visual identity that stands out from competitors and leaves a lasting impression on customers.',
    benefits: ['Unique brand presence', 'Competitive differentiation', 'Memorable customer experience', 'Professional credibility']
  },
  {
    icon: Users,
    title: 'Customer-Focused Design',
    description: 'Design with your customers in mind, creating brand experiences that connect emotionally and drive engagement.',
    benefits: ['Better customer connection', 'Increased engagement', 'Higher conversion rates', 'Stronger brand affinity']
  },
  {
    icon: Award,
    title: 'Award-Winning Quality',
    description: 'Our designs have won industry awards and helped businesses achieve remarkable growth through better branding.',
    benefits: ['Professional excellence', 'Industry recognition', 'Proven results', 'Premium brand perception']
  },
  {
    icon: Clock,
    title: 'Fast Turnaround',
    description: 'Get your complete brand identity in 4-6 weeks with regular updates and clear communication throughout the process.',
    benefits: ['Quick time to market', 'Regular progress updates', 'Clear communication', 'On-time delivery']
  },
  {
    icon: Settings,
    title: 'Complete Brand System',
    description: 'Everything you need to implement your brand consistently across all touchpoints, from business cards to digital platforms.',
    benefits: ['Consistent brand application', 'Complete brand toolkit', 'Easy implementation', 'Professional results']
  }
]

const faqs = [
  {
    question: 'How long does the branding process take?',
    answer: 'Most brand identity projects take 4-6 weeks from start to finish. This includes discovery, concept development, refinement, and final delivery. Complex projects may take longer.'
  },
  {
    question: 'What\'s included in the brand guidelines?',
    answer: 'Our brand guidelines include logo usage rules, color specifications, typography guidelines, spacing requirements, do\'s and don\'ts, and examples of proper brand application across different media.'
  },
  {
    question: 'Do you provide ongoing brand support?',
    answer: 'Yes! We offer ongoing brand consultation and support packages to help you maintain brand consistency and evolve your brand as your business grows.'
  },
  {
    question: 'Can you work with our existing brand elements?',
    answer: 'Absolutely! We can refresh existing brand elements, create new variations, or build upon your current brand foundation to create a more cohesive and effective identity.'
  },
  {
    question: 'What file formats do you provide?',
    answer: 'We provide all final brand files in multiple formats including vector files (AI, EPS, SVG), raster files (PNG, JPG), and print-ready files (PDF) in various sizes and color variations.'
  },
  {
    question: 'Do you offer brand strategy consultation?',
    answer: 'Yes! Our branding packages include strategic consultation to ensure your brand identity aligns with your business goals and resonates with your target audience.'
  }
]

export default function BrandingIdentityPage() {
  const [selectedTier, setSelectedTier] = useState(1) // Default to Complete package

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Professional Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-pink-900 to-purple-900">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-rose-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
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
                Brand Identity That Builds Trust
              </h1>
              
              {/* Gradient Subtitle */}
              <div className="text-3xl md:text-4xl font-bold mb-8 animate-slide-up delay-200">
                <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-rose-400 bg-clip-text text-transparent">
                  — Make Your Business Memorable
                </span>
              </div>

              {/* Supporting Text */}
              <p className="text-lg md:text-xl text-pink-100 mb-12 max-w-4xl mx-auto leading-relaxed animate-slide-up delay-300">
                Your brand is more than just a logo—it's the complete visual and emotional experience customers have with your business. We create comprehensive brand identities that differentiate you from competitors, build trust, and drive customer loyalty.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up delay-400">
                <Link 
                  href="/checkout?service=branding-identity" 
                  className="group relative px-8 py-4 bg-pink-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 hover:scale-105 hover:bg-pink-500"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Start Your Brand Project
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
                  </span>
                </Link>
                <Link 
                  href="/case-studies" 
                  className="px-8 py-4 bg-white text-gray-900 font-bold text-lg rounded-2xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 flex items-center justify-center"
                >
                  <div className="w-4 h-4 mr-2 border-l-4 border-b-4 border-gray-900 transform rotate-[-45deg]"></div>
                  View Brand Portfolio
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-slide-up delay-500">
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">200+</div>
                  <div className="text-pink-200 font-medium">Brands Created</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">95%</div>
                  <div className="text-pink-200 font-medium">Client Satisfaction</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">4-6</div>
                  <div className="text-pink-200 font-medium">Weeks Delivery</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">Award</div>
                  <div className="text-pink-200 font-medium">Winning Design</div>
                </div>
              </div>
            </div>

            {/* Right Content - Brand Performance Dashboard */}
            <div className="hidden lg:block">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20 animate-slide-up delay-500">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Brand Performance Dashboard</h3>
                  <p className="text-sm text-gray-600">Brand impact metrics</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Brand Recognition</span>
                      <Eye className="w-4 h-4 text-pink-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">+150%</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-pink-500 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Customer Trust</span>
                      <Award className="w-4 h-4 text-purple-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">+200%</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{width: '90%'}}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Brand Consistency</span>
                      <Target className="w-4 h-4 text-rose-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">98%</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-rose-500 h-2 rounded-full" style={{width: '98%'}}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Market Position</span>
                      <TrendingUp className="w-4 h-4 text-orange-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">#1</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{width: '100%'}}></div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Overall Brand Score</span>
                    <span className="text-2xl font-bold text-gray-900">A+ Grade</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-pink-500 to-purple-500 h-3 rounded-full" style={{width: '98%'}}></div>
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
          <div className="absolute top-20 left-10 w-4 h-4 bg-pink-400 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute top-40 right-20 w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-2000"></div>
          <div className="absolute bottom-40 left-20 w-5 h-5 bg-rose-400 rounded-full animate-bounce delay-3000"></div>
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
      <section className="py-4 bg-pink-600">
        <div className="container-custom">
          <div className="flex items-center justify-center">
            <Star className="w-5 h-5 text-yellow-400 mr-2" />
            <span className="text-white font-medium">Trusted by 200+ Businesses for Brand Identity Design</span>
          </div>
        </div>
      </section>

      {/* Why You Need Professional Branding Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Your Business Needs Professional Branding
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your brand is often the first impression potential customers have of your business. Make it count with professional branding that builds trust and drives customer loyalty.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">First Impressions Matter</h3>
              <p className="text-gray-600">
                Customers form an opinion about your business in just 0.05 seconds. Professional branding builds trust and credibility instantly.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Stand Out from Competitors</h3>
              <p className="text-gray-600">
                A distinctive brand identity helps you stand out in crowded markets and creates memorable customer experiences.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Build Customer Loyalty</h3>
              <p className="text-gray-600">
                Consistent, professional branding creates emotional connections that turn customers into brand advocates.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Increase Perceived Value</h3>
              <p className="text-gray-600">
                Professional branding increases the perceived value of your products and services, allowing you to charge premium prices.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Scale Your Business</h3>
              <p className="text-gray-600">
                A strong brand identity makes it easier to expand into new markets and attract top talent to your team.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Settings className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Consistent Experience</h3>
              <p className="text-gray-600">
                Brand guidelines ensure consistent application across all touchpoints, creating a cohesive customer experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Design Process */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Brand Design Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We follow a proven 5-step process to create brand identities that resonate with your audience and drive business results.
            </p>
          </div>
          
          <div className="space-y-8">
            {designProcess.map((step, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-pink-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
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
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Our Branding Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Every brand identity we create is designed to build trust, drive engagement, and grow your business.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-pink-600" />
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
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Choose Your Brand Package</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select the package that best fits your business needs and growth goals.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {service.tiers.map((tier, index) => (
              <div key={index} className={`relative rounded-lg border-2 p-6 ${
                tier.popular 
                  ? 'border-pink-500 bg-pink-50' 
                  : 'border-gray-200 bg-white'
              }`}>
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-pink-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <tier.icon className="w-6 h-6 text-pink-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{tier.name}</h3>
                  <div className="text-2xl font-bold text-pink-600 mb-2">{tier.price}</div>
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
                    href={`/checkout?service=branding-identity&tier=${index}`}
                    className={`w-full block text-center py-2 px-4 rounded font-semibold text-sm transition-colors ${
                      tier.popular
                        ? 'bg-pink-600 text-white hover:bg-pink-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Get Started
                  </Link>
                  <button 
                    onClick={() => setSelectedTier(index)}
                    className="w-full text-center py-1 px-4 text-xs text-gray-600 hover:text-pink-600"
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
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">
              Everything you need to know about our branding and identity design services.
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
      <section className="py-12 bg-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Build Your Brand?</h2>
          <p className="text-pink-100 mb-8 max-w-2xl mx-auto">
            Let's create a brand identity that makes your business memorable and builds trust with customers. 
            Get started with a free brand consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/checkout?service=branding-identity" className="bg-white text-pink-600 px-6 py-3 rounded font-semibold hover:bg-gray-100 transition-colors">
              Start Your Brand Project
            </Link>
            <Link href="/contact" className="border-2 border-white text-white px-6 py-3 rounded font-semibold hover:bg-white hover:text-pink-600 transition-colors">
              Free Brand Consultation
            </Link>
          </div>
          <p className="text-pink-200 text-sm mt-4">
            <Award className="w-4 h-4 inline mr-1" />
            30-day money-back guarantee on all brand projects
          </p>
        </div>
      </section>
    </div>
  )
}

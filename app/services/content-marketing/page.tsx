'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Star, ChevronDown, PenTool, Target, Users, Award, Clock, DollarSign, Globe, Search, Monitor, Smartphone, Database, Settings, Headphones, FileText, Calendar, MessageSquare, PieChart, TrendingDown, AlertCircle, CheckCircle2, XCircle, Info, ExternalLink, Download, Play, Pause, RefreshCw, Lock, Unlock, Eye, EyeOff, Filter, SortAsc, SortDesc, MoreHorizontal, MoreVertical, Plus, Minus, Edit, Trash2, Save, Copy, Share, Bookmark, Heart, ThumbsUp, ThumbsDown, Flag, Report, HelpCircle, QuestionMarkCircle, Lightbulb, Bulb, Idea, Brain, Cpu, HardDrive, Wifi, WifiOff, Signal, SignalHigh, SignalLow, Battery, BatteryCharging, Power, PowerOff, Volume2, VolumeX, Mic, MicOff, Camera, Video, VideoOff, Image, File, Folder, FolderOpen, Archive, Inbox, Send, Mail, MailOpen, Reply, Forward, Share2, Copy2, Cut, Scissors, Paste, Clipboard, ClipboardList, ClipboardCheck, ClipboardCopy, ClipboardX, FilePlus, FileMinus, FileX, FileCheck, FileEdit, FileSearch, FileText2, FileCode, FileImage, FileVideo, FileAudio, FileZip, FilePdf, FileWord, FileExcel, FilePowerpoint, FileCsv, FileJson, FileXml, FileHtml, FileCss, FileJs, FileTs, FileJsx, FileTsx, FileVue, FileReact, FileAngular, FileSvelte, FilePhp, FilePython, FileJava, FileC, FileCpp, FileCsharp, FileGo, FileRust, FileSwift, FileKotlin, FileDart, FileR, FileRuby, FilePerl, FileLua, FileBash, FileSh, FileBat, FileCmd, FilePs1, FileYaml, FileToml, FileIni, FileEnv, FileGitignore, FileDockerfile, FileMakefile, FileReadme, FileLicense, FileChangelog, FileContributing, FileSecurity, FileCodeowners, FileEditorconfig, FilePrettier, FileEslint, FileBabel, FileWebpack, FileRollup, FileVite, FileParcel, FileGulp, FileGrunt, FileNpm, FileYarn, FilePnpm, FileBun, FileDeno, FileNode, FileExpress, FileKoa, FileHapi, FileFastify, FileNest, FileNext, FileNuxt, FileSvelteKit, FileRemix, FileGatsby, FileAstro, FileSolid, FileQwik, FileLit, FileStencil, FileAlpine, FileMithril, FileHyperapp, FileInferno, FilePreact, FileRiot, FileMarko, FileMithril2, FilePolymer, FileAurelia, FileBackbone, FileEmber, FileKnockout, FileMithril3, FileRactive, FileRivets, FileRivets2, FileRivets3, FileRivets4, FileRivets5, FileRivets6, FileRivets7, FileRivets8, FileRivets9, FileRivets10 } from 'lucide-react'

const service = {
  title: 'Content Marketing Services',
  icon: '📝',
  description: 'Strategic content that attracts, engages, and converts your target audience into loyal customers.',
  longDescription: 'Content marketing is the backbone of modern digital marketing. We create strategic, high-quality content that positions you as an industry expert, builds trust with your audience, and drives qualified leads to your business.',
  tiers: [
    {
      name: 'Content Starter',
      price: '$1,500/mo',
      setupPrice: '$0',
      monthlyPrice: '$1,500',
      period: 'monthly',
      popular: false,
      icon: PenTool,
      bestFor: 'small businesses, startups, local services',
      features: [
        '4 blog posts per month',
        'Social media content (20 posts)',
        'Basic content strategy',
        'Keyword research & optimization',
        'Content calendar management',
        'Basic analytics reporting',
        '1 round of revisions',
        'Content distribution'
      ]
    },
    {
      name: 'Content Growth',
      price: '$3,500/mo',
      setupPrice: '$0',
      monthlyPrice: '$3,500',
      period: 'monthly',
      popular: true,
      icon: Target,
      bestFor: 'growing businesses, agencies, consultants',
      features: [
        '8 blog posts per month',
        'Social media content (40 posts)',
        'Comprehensive content strategy',
        'Advanced keyword research',
        'Content calendar & workflow',
        'Detailed analytics & reporting',
        '2 rounds of revisions',
        'Multi-platform distribution',
        'Content promotion',
        'Lead magnet creation'
      ]
    },
    {
      name: 'Content Dominate',
      price: '$7,500/mo',
      setupPrice: '$0',
      monthlyPrice: '$7,500',
      period: 'monthly',
      popular: false,
      icon: Award,
      bestFor: 'enterprises, large companies, franchises',
      features: [
        '16 blog posts per month',
        'Social media content (80 posts)',
        'Advanced content strategy',
        'Comprehensive keyword research',
        'Content team management',
        'Advanced analytics & insights',
        'Unlimited revisions',
        'Multi-channel distribution',
        'Content promotion & outreach',
        'Lead magnet suite',
        'Video content creation',
        'Content performance optimization'
      ]
    }
  ]
}

const contentTypes = [
  {
    category: 'Blog Content',
    icon: FileText,
    items: ['SEO-optimized articles', 'How-to guides', 'Industry insights', 'Case studies', 'Product reviews', 'News & updates']
  },
  {
    category: 'Social Media',
    icon: Share2,
    items: ['Facebook posts', 'Instagram content', 'LinkedIn articles', 'Twitter updates', 'Visual graphics', 'Video content']
  },
  {
    category: 'Email Marketing',
    icon: Mail,
    items: ['Newsletter content', 'Email sequences', 'Product announcements', 'Educational series', 'Promotional campaigns', 'Welcome series']
  },
  {
    category: 'Video Content',
    icon: Video,
    items: ['Explainer videos', 'Tutorial content', 'Behind-the-scenes', 'Customer testimonials', 'Live streaming', 'Video series']
  },
  {
    category: 'Lead Magnets',
    icon: Download,
    items: ['E-books & guides', 'Checklists & templates', 'Webinars & courses', 'Free tools', 'Resource libraries', 'Exclusive content']
  },
  {
    category: 'SEO Content',
    icon: Search,
    items: ['Keyword-optimized pages', 'Landing page copy', 'Meta descriptions', 'Alt text & captions', 'Schema markup', 'Content optimization']
  }
]

const contentProcess = [
  {
    step: '01',
    title: 'Content Strategy & Planning',
    description: 'Develop a comprehensive content strategy based on your business goals, target audience, and competitive landscape',
    duration: '1 week',
    deliverables: ['Content audit', 'Target audience analysis', 'Content calendar', 'Keyword research', 'Competitor analysis', 'Content pillars']
  },
  {
    step: '02',
    title: 'Content Creation & Writing',
    description: 'Create high-quality, engaging content that resonates with your audience and drives business results',
    duration: 'Ongoing',
    deliverables: ['Blog posts', 'Social media content', 'Email campaigns', 'Video scripts', 'Lead magnets', 'Landing page copy']
  },
  {
    step: '03',
    title: 'Content Optimization',
    description: 'Optimize all content for search engines, social media algorithms, and user engagement',
    duration: 'Ongoing',
    deliverables: ['SEO optimization', 'Social media optimization', 'A/B testing', 'Performance tracking', 'Content updates', 'Technical optimization']
  },
  {
    step: '04',
    title: 'Content Distribution',
    description: 'Distribute content across all relevant channels to maximize reach and engagement',
    duration: 'Ongoing',
    deliverables: ['Multi-channel publishing', 'Social media scheduling', 'Email campaigns', 'Content promotion', 'Influencer outreach', 'Paid promotion']
  },
  {
    step: '05',
    title: 'Performance Analysis',
    description: 'Track, measure, and analyze content performance to continuously improve results',
    duration: 'Monthly',
    deliverables: ['Performance reports', 'Analytics insights', 'ROI analysis', 'Content recommendations', 'Strategy adjustments', 'Growth opportunities']
  }
]

const features = [
  {
    icon: PenTool,
    title: 'Strategic Content Planning',
    description: 'Every piece of content is strategically planned to align with your business goals and resonate with your target audience.',
    benefits: ['Higher engagement rates', 'Better lead quality', 'Improved brand authority', 'Increased conversions']
  },
  {
    icon: Target,
    title: 'Audience-Focused Content',
    description: 'Content that speaks directly to your ideal customers, addressing their pain points and providing valuable solutions.',
    benefits: ['Better audience connection', 'Higher engagement', 'Increased trust', 'More qualified leads']
  },
  {
    icon: Search,
    title: 'SEO-Optimized Content',
    description: 'All content is optimized for search engines to improve your visibility and attract organic traffic.',
    benefits: ['Higher search rankings', 'More organic traffic', 'Better visibility', 'Long-term growth']
  },
  {
    icon: Share2,
    title: 'Multi-Channel Distribution',
    description: 'Content distributed across all relevant channels to maximize reach and engagement with your audience.',
    benefits: ['Wider reach', 'Better engagement', 'Consistent presence', 'Increased brand awareness']
  },
  {
    icon: BarChart3,
    title: 'Performance Tracking',
    description: 'Comprehensive analytics and reporting to track content performance and optimize for better results.',
    benefits: ['Data-driven decisions', 'Better ROI', 'Continuous improvement', 'Measurable results']
  },
  {
    icon: Clock,
    title: 'Consistent Publishing',
    description: 'Regular, consistent content publishing schedule that keeps your audience engaged and coming back for more.',
    benefits: ['Better audience retention', 'Improved SEO', 'Increased authority', 'Steady growth']
  }
]

const faqs = [
  {
    question: 'How long does it take to see results from content marketing?',
    answer: 'Content marketing is a long-term strategy. You can expect to see initial engagement within 1-2 months, but significant SEO and lead generation results typically take 3-6 months of consistent, high-quality content.'
  },
  {
    question: 'What types of content do you create?',
    answer: 'We create a wide variety of content including blog posts, social media content, email campaigns, videos, infographics, e-books, case studies, and more. The specific mix depends on your industry and audience preferences.'
  },
  {
    question: 'Do you provide content for all social media platforms?',
    answer: 'Yes! We create content for all major social media platforms including Facebook, Instagram, LinkedIn, Twitter, TikTok, and YouTube. We tailor content to each platform\'s unique characteristics and audience.'
  },
  {
    question: 'How do you measure content marketing success?',
    answer: 'We track multiple metrics including website traffic, engagement rates, lead generation, conversion rates, social media growth, search rankings, and ROI. We provide detailed monthly reports with actionable insights.'
  },
  {
    question: 'Can you work with our existing content?',
    answer: 'Absolutely! We can audit your existing content, identify gaps and opportunities, and help optimize what you already have while creating new content to fill the gaps.'
  },
  {
    question: 'Do you provide content in different languages?',
    answer: 'Yes, we can create content in multiple languages. Please let us know your language requirements during the consultation, and we\'ll ensure all content is properly localized for your target markets.'
  }
]

export default function ContentMarketingPage() {
  const [selectedTier, setSelectedTier] = useState(1) // Default to Growth package

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Professional Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-teal-900 to-cyan-900">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
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
                Content That Converts
              </h1>
              
              {/* Gradient Subtitle */}
              <div className="text-3xl md:text-4xl font-bold mb-8 animate-slide-up delay-200">
                <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  — Attract, Engage & Convert
                </span>
              </div>

              {/* Supporting Text */}
              <p className="text-lg md:text-xl text-teal-100 mb-12 max-w-4xl mx-auto leading-relaxed animate-slide-up delay-300">
                Content marketing is the backbone of modern digital marketing. We create strategic, high-quality content that positions you as an industry expert, builds trust with your audience, and drives qualified leads to your business.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up delay-400">
                <Link 
                  href="/checkout?service=content-marketing" 
                  className="group relative px-8 py-4 bg-teal-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-teal-500/25 transition-all duration-300 hover:scale-105 hover:bg-teal-500"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Start Your Content Strategy
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
                  </span>
                </Link>
                <Link 
                  href="/case-studies" 
                  className="px-8 py-4 bg-white text-gray-900 font-bold text-lg rounded-2xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 flex items-center justify-center"
                >
                  <div className="w-4 h-4 mr-2 border-l-4 border-b-4 border-gray-900 transform rotate-[-45deg]"></div>
                  View Content Results
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-slide-up delay-500">
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">500+</div>
                  <div className="text-teal-200 font-medium">Articles Published</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">300%</div>
                  <div className="text-teal-200 font-medium">Avg Traffic Increase</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">150+</div>
                  <div className="text-teal-200 font-medium">Leads Generated</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">95%</div>
                  <div className="text-teal-200 font-medium">Client Retention</div>
                </div>
              </div>
            </div>

            {/* Right Content - Content Performance Dashboard */}
            <div className="hidden lg:block">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20 animate-slide-up delay-500">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Content Performance Dashboard</h3>
                  <p className="text-sm text-gray-600">Real-time content metrics</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Content Traffic</span>
                      <TrendingUp className="w-4 h-4 text-teal-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">+300%</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-teal-500 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Engagement Rate</span>
                      <Heart className="w-4 h-4 text-cyan-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">8.5%</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-cyan-500 h-2 rounded-full" style={{width: '90%'}}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Lead Generation</span>
                      <Users className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">+150%</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-emerald-500 h-2 rounded-full" style={{width: '75%'}}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Content ROI</span>
                      <DollarSign className="w-4 h-4 text-orange-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">400%</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{width: '95%'}}></div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-teal-100 to-cyan-100 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Overall Content Score</span>
                    <span className="text-2xl font-bold text-gray-900">A+ Grade</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-teal-500 to-cyan-500 h-3 rounded-full" style={{width: '96%'}}></div>
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
          <div className="absolute top-20 left-10 w-4 h-4 bg-teal-400 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute top-40 right-20 w-3 h-3 bg-cyan-400 rounded-full animate-bounce delay-2000"></div>
          <div className="absolute bottom-40 left-20 w-5 h-5 bg-emerald-400 rounded-full animate-bounce delay-3000"></div>
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
      <section className="py-4 bg-teal-600">
        <div className="container-custom">
          <div className="flex items-center justify-center">
            <Star className="w-5 h-5 text-yellow-400 mr-2" />
            <span className="text-white font-medium">Trusted by 150+ Businesses for Content Marketing</span>
          </div>
        </div>
      </section>

      {/* Why You Need Content Marketing Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Your Business Needs Content Marketing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Content marketing is the most cost-effective way to attract, engage, and convert your target audience into loyal customers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <PenTool className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Build Brand Authority</h3>
              <p className="text-gray-600">
                High-quality content positions you as an industry expert and builds trust with your audience.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Improve SEO Rankings</h3>
              <p className="text-gray-600">
                Regular, optimized content helps you rank higher in search results and attract organic traffic.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Generate Qualified Leads</h3>
              <p className="text-gray-600">
                Strategic content attracts your ideal customers and nurtures them through the sales funnel.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Cost-Effective Marketing</h3>
              <p className="text-gray-600">
                Content marketing costs 62% less than traditional marketing while generating 3x more leads.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Share2 className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Increase Engagement</h3>
              <p className="text-gray-600">
                Valuable content keeps your audience engaged and coming back for more, building long-term relationships.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Measurable Results</h3>
              <p className="text-gray-600">
                Track and measure every aspect of your content marketing to optimize for better results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Types We Create */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Content Types We Create</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We create a wide variety of content to engage your audience across all channels and touchpoints.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contentTypes.map((type, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mr-3">
                    <type.icon className="w-5 h-5 text-teal-600" />
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

      {/* Our Content Process */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Content Marketing Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We follow a proven 5-step process to create content that drives real business results.
            </p>
          </div>
          
          <div className="space-y-8">
            {contentProcess.map((step, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-teal-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Our Content Marketing Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Every piece of content we create is strategically designed to drive engagement, build trust, and generate leads.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-sm">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-teal-600" />
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Choose Your Content Package</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select the package that best fits your content marketing needs and growth goals.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {service.tiers.map((tier, index) => (
              <div key={index} className={`relative rounded-lg border-2 p-6 ${
                tier.popular 
                  ? 'border-teal-500 bg-teal-50' 
                  : 'border-gray-200 bg-white'
              }`}>
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <tier.icon className="w-6 h-6 text-teal-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{tier.name}</h3>
                  <div className="text-2xl font-bold text-teal-600 mb-2">{tier.price}</div>
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
                    href={`/checkout?service=content-marketing&tier=${index}`}
                    className={`w-full block text-center py-2 px-4 rounded font-semibold text-sm transition-colors ${
                      tier.popular
                        ? 'bg-teal-600 text-white hover:bg-teal-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Get Started
                  </Link>
                  <button 
                    onClick={() => setSelectedTier(index)}
                    className="w-full text-center py-1 px-4 text-xs text-gray-600 hover:text-teal-600"
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
              Everything you need to know about our content marketing services.
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
      <section className="py-12 bg-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Start Your Content Marketing?</h2>
          <p className="text-teal-100 mb-8 max-w-2xl mx-auto">
            Let's create content that attracts, engages, and converts your target audience into loyal customers. 
            Get started with a free content strategy consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/checkout?service=content-marketing" className="bg-white text-teal-600 px-6 py-3 rounded font-semibold hover:bg-gray-100 transition-colors">
              Start Your Content Strategy
            </Link>
            <Link href="/contact" className="border-2 border-white text-white px-6 py-3 rounded font-semibold hover:bg-white hover:text-teal-600 transition-colors">
              Free Content Consultation
            </Link>
          </div>
          <p className="text-teal-200 text-sm mt-4">
            <Award className="w-4 h-4 inline mr-1" />
            30-day money-back guarantee on all content marketing projects
          </p>
        </div>
      </section>
    </div>
  )
}

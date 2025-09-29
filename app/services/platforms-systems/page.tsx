'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Star, ChevronDown, Settings, Target, Users, Award, Clock, DollarSign, Globe, Search, Monitor, Smartphone, Database, Headphones, FileText, Calendar, MessageSquare, PieChart, TrendingDown, AlertCircle, CheckCircle2, XCircle, Info, ExternalLink, Download, Play, Pause, RefreshCw, Lock, Unlock, Eye, EyeOff, Filter, SortAsc, SortDesc, MoreHorizontal, MoreVertical, Plus, Minus, Edit, Trash2, Save, Copy, Share, Bookmark, Heart, ThumbsUp, ThumbsDown, Flag, Report, HelpCircle, QuestionMarkCircle, Lightbulb, Bulb, Idea, Brain, Cpu, HardDrive, Wifi, WifiOff, Signal, SignalHigh, SignalLow, Battery, BatteryCharging, Power, PowerOff, Volume2, VolumeX, Mic, MicOff, Camera, Video, VideoOff, Image, File, Folder, FolderOpen, Archive, Inbox, Send, Mail, MailOpen, Reply, Forward, Share2, Copy2, Cut, Scissors, Paste, Clipboard, ClipboardList, ClipboardCheck, ClipboardCopy, ClipboardX, FilePlus, FileMinus, FileX, FileCheck, FileEdit, FileSearch, FileText2, FileCode, FileImage, FileVideo, FileAudio, FileZip, FilePdf, FileWord, FileExcel, FilePowerpoint, FileCsv, FileJson, FileXml, FileHtml, FileCss, FileJs, FileTs, FileJsx, FileTsx, FileVue, FileReact, FileAngular, FileSvelte, FilePhp, FilePython, FileJava, FileC, FileCpp, FileCsharp, FileGo, FileRust, FileSwift, FileKotlin, FileDart, FileR, FileRuby, FilePerl, FileLua, FileBash, FileSh, FileBat, FileCmd, FilePs1, FileYaml, FileToml, FileIni, FileEnv, FileGitignore, FileDockerfile, FileMakefile, FileReadme, FileLicense, FileChangelog, FileContributing, FileSecurity, FileCodeowners, FileEditorconfig, FilePrettier, FileEslint, FileBabel, FileWebpack, FileRollup, FileVite, FileParcel, FileGulp, FileGrunt, FileNpm, FileYarn, FilePnpm, FileBun, FileDeno, FileNode, FileExpress, FileKoa, FileHapi, FileFastify, FileNest, FileNext, FileNuxt, FileSvelteKit, FileRemix, FileGatsby, FileAstro, FileSolid, FileQwik, FileLit, FileStencil, FileAlpine, FileMithril, FileHyperapp, FileInferno, FilePreact, FileRiot, FileMarko, FileMithril2, FilePolymer, FileAurelia, FileBackbone, FileEmber, FileKnockout, FileMithril3, FileRactive, FileRivets, FileRivets2, FileRivets3, FileRivets4, FileRivets5, FileRivets6, FileRivets7, FileRivets8, FileRivets9, FileRivets10 } from 'lucide-react'

const service = {
  title: 'Platforms & Custom Systems',
  icon: '⚙️',
  description: 'Custom web platforms and business systems that streamline operations and drive growth.',
  longDescription: 'Transform your business with custom web platforms and systems designed specifically for your needs. We build scalable, secure, and user-friendly solutions that automate processes, improve efficiency, and drive business growth.',
  tiers: [
    {
      name: 'Starter Platform',
      price: '$5,000',
      setupPrice: '$5,000',
      monthlyPrice: '$0',
      period: 'one-time',
      popular: false,
      icon: Settings,
      bestFor: 'small businesses, startups, simple needs',
      features: [
        'Custom web application',
        'User authentication system',
        'Basic admin dashboard',
        'Database design & setup',
        'Responsive design',
        'Basic security features',
        '3 months support',
        'Documentation'
      ]
    },
    {
      name: 'Business Platform',
      price: '$15,000',
      setupPrice: '$15,000',
      monthlyPrice: '$0',
      period: 'one-time',
      popular: true,
      icon: Target,
      bestFor: 'growing businesses, agencies, complex needs',
      features: [
        'Advanced web application',
        'Multi-user system',
        'Comprehensive admin panel',
        'API development',
        'Third-party integrations',
        'Advanced security features',
        'Performance optimization',
        '6 months support',
        'User training',
        'Comprehensive documentation'
      ]
    },
    {
      name: 'Enterprise Platform',
      price: '$50,000+',
      setupPrice: '$50,000',
      monthlyPrice: '$0',
      period: 'one-time',
      popular: false,
      icon: Award,
      bestFor: 'enterprises, large companies, complex systems',
      features: [
        'Enterprise-grade application',
        'Multi-tenant architecture',
        'Advanced admin & analytics',
        'Custom API development',
        'Multiple integrations',
        'Enterprise security',
        'Scalability & performance',
        '12 months support',
        'Team training',
        'Ongoing maintenance',
        'Custom features',
        'Dedicated support'
      ]
    }
  ]
}

const platformTypes = [
  {
    category: 'Business Management',
    icon: Settings,
    items: ['CRM systems', 'Project management', 'Inventory management', 'Customer portals', 'Employee dashboards', 'Reporting systems']
  },
  {
    category: 'E-commerce Platforms',
    icon: ShoppingCart,
    items: ['Online stores', 'Marketplace platforms', 'Subscription systems', 'Payment processing', 'Order management', 'Inventory tracking']
  },
  {
    category: 'Content Management',
    icon: FileText,
    items: ['CMS platforms', 'Document management', 'Knowledge bases', 'Blog systems', 'Media libraries', 'Content workflows']
  },
  {
    category: 'Data & Analytics',
    icon: BarChart3,
    items: ['Analytics dashboards', 'Data visualization', 'Reporting tools', 'KPI tracking', 'Business intelligence', 'Custom metrics']
  },
  {
    category: 'Communication Tools',
    icon: MessageSquare,
    items: ['Internal messaging', 'Customer support', 'Live chat systems', 'Notification systems', 'Email automation', 'Social features']
  },
  {
    category: 'Integration Platforms',
    icon: Link,
    items: ['API development', 'Third-party integrations', 'Webhook systems', 'Data synchronization', 'Workflow automation', 'System connectors']
  }
]

const developmentProcess = [
  {
    step: '01',
    title: 'Discovery & Planning',
    description: 'Deep dive into your business requirements, processes, and goals to design the perfect solution',
    duration: '2 weeks',
    deliverables: ['Requirements analysis', 'Technical specification', 'System architecture', 'Database design', 'UI/UX wireframes', 'Project timeline']
  },
  {
    step: '02',
    title: 'Design & Prototyping',
    description: 'Create detailed designs and interactive prototypes to visualize the final product',
    duration: '2-3 weeks',
    deliverables: ['UI/UX design', 'Interactive prototypes', 'Design system', 'User flow diagrams', 'Responsive layouts', 'Design approval']
  },
  {
    step: '03',
    title: 'Development & Testing',
    description: 'Build the platform with clean, scalable code and comprehensive testing',
    duration: '6-12 weeks',
    deliverables: ['Frontend development', 'Backend development', 'Database implementation', 'API development', 'Testing & QA', 'Security implementation']
  },
  {
    step: '04',
    title: 'Integration & Deployment',
    description: 'Integrate with existing systems and deploy to production with monitoring',
    duration: '1-2 weeks',
    deliverables: ['System integration', 'Data migration', 'Production deployment', 'Performance monitoring', 'Security audit', 'Go-live support']
  },
  {
    step: '05',
    title: 'Training & Support',
    description: 'Train your team and provide ongoing support to ensure successful adoption',
    duration: 'Ongoing',
    deliverables: ['User training', 'Documentation', 'Support system', 'Maintenance plan', 'Feature updates', 'Ongoing optimization']
  }
]

const features = [
  {
    icon: Settings,
    title: 'Custom Development',
    description: 'Every platform is built from scratch to meet your specific business requirements and processes.',
    benefits: ['Perfect fit for your needs', 'Scalable architecture', 'Future-proof design', 'Competitive advantage']
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Built with security-first principles to protect your data and ensure compliance with industry standards.',
    benefits: ['Data protection', 'Compliance ready', 'Secure authentication', 'Regular security updates']
  },
  {
    icon: Zap,
    title: 'High Performance',
    description: 'Optimized for speed and scalability to handle growing user loads and data volumes.',
    benefits: ['Fast loading times', 'Scalable infrastructure', 'Reliable performance', 'Better user experience']
  },
  {
    icon: Smartphone,
    title: 'Mobile Responsive',
    description: 'Fully responsive design that works perfectly on all devices and screen sizes.',
    benefits: ['Mobile accessibility', 'Cross-device compatibility', 'Better user engagement', 'Modern user experience']
  },
  {
    icon: Link,
    title: 'Easy Integrations',
    description: 'Seamless integration with your existing tools and systems for a unified workflow.',
    benefits: ['Streamlined workflows', 'Data synchronization', 'Reduced manual work', 'Better efficiency']
  },
  {
    icon: Headphones,
    title: 'Ongoing Support',
    description: 'Comprehensive support and maintenance to keep your platform running smoothly.',
    benefits: ['Reliable operation', 'Quick issue resolution', 'Regular updates', 'Peace of mind']
  }
]

const faqs = [
  {
    question: 'How long does it take to build a custom platform?',
    answer: 'Development time varies based on complexity. Simple platforms take 8-12 weeks, while complex enterprise systems can take 6-12 months. We provide detailed timelines during the planning phase.'
  },
  {
    question: 'What technologies do you use for development?',
    answer: 'We use modern, proven technologies including React, Node.js, Python, PHP, and various databases. The specific tech stack is chosen based on your requirements and scalability needs.'
  },
  {
    question: 'Can you integrate with our existing systems?',
    answer: 'Yes! We specialize in integrating custom platforms with existing systems including CRMs, ERPs, payment processors, and other business tools through APIs and custom connectors.'
  },
  {
    question: 'Do you provide ongoing maintenance and support?',
    answer: 'Absolutely! All our platforms come with comprehensive support packages including bug fixes, security updates, performance monitoring, and feature enhancements.'
  },
  {
    question: 'Is my data secure on your platforms?',
    answer: 'Security is our top priority. We implement enterprise-grade security measures including encryption, secure authentication, regular security audits, and compliance with industry standards.'
  },
  {
    question: 'Can the platform be scaled as my business grows?',
    answer: 'Yes! All our platforms are built with scalability in mind. We design architectures that can handle increased users, data, and functionality as your business grows.'
  }
]

export default function PlatformsSystemsPage() {
  const [selectedTier, setSelectedTier] = useState(1) // Default to Business package

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Professional Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
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
                Custom Platforms That Scale
              </h1>
              
              {/* Gradient Subtitle */}
              <div className="text-3xl md:text-4xl font-bold mb-8 animate-slide-up delay-200">
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  — Built for Your Business
                </span>
              </div>

              {/* Supporting Text */}
              <p className="text-lg md:text-xl text-indigo-100 mb-12 max-w-4xl mx-auto leading-relaxed animate-slide-up delay-300">
                Transform your business with custom web platforms and systems designed specifically for your needs. We build scalable, secure, and user-friendly solutions that automate processes, improve efficiency, and drive business growth.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up delay-400">
                <Link 
                  href="/checkout?service=platforms-systems" 
                  className="group relative px-8 py-4 bg-indigo-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 hover:scale-105 hover:bg-indigo-500"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Start Your Platform Project
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
                  </span>
                </Link>
                <Link 
                  href="/case-studies" 
                  className="px-8 py-4 bg-white text-gray-900 font-bold text-lg rounded-2xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 flex items-center justify-center"
                >
                  <div className="w-4 h-4 mr-2 border-l-4 border-b-4 border-gray-900 transform rotate-[-45deg]"></div>
                  View Platform Portfolio
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-slide-up delay-500">
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">100+</div>
                  <div className="text-indigo-200 font-medium">Platforms Built</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">99.9%</div>
                  <div className="text-indigo-200 font-medium">Uptime Guarantee</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">50%</div>
                  <div className="text-indigo-200 font-medium">Efficiency Increase</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">24/7</div>
                  <div className="text-indigo-200 font-medium">Support Available</div>
                </div>
              </div>
            </div>

            {/* Right Content - Platform Performance Dashboard */}
            <div className="hidden lg:block">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20 animate-slide-up delay-500">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Platform Performance Dashboard</h3>
                  <p className="text-sm text-gray-600">Real-time system metrics</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">System Uptime</span>
                      <Zap className="w-4 h-4 text-indigo-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">99.9%</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-500 h-2 rounded-full" style={{width: '99%'}}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Response Time</span>
                      <Clock className="w-4 h-4 text-purple-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">120ms</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{width: '95%'}}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">User Satisfaction</span>
                      <Users className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">4.9/5</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '98%'}}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Efficiency Gain</span>
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">+50%</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Overall Platform Score</span>
                    <span className="text-2xl font-bold text-gray-900">A+ Grade</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full" style={{width: '98%'}}></div>
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
          <div className="absolute top-20 left-10 w-4 h-4 bg-indigo-400 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute top-40 right-20 w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-2000"></div>
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
      <section className="py-4 bg-indigo-600">
        <div className="container-custom">
          <div className="flex items-center justify-center">
            <Star className="w-5 h-5 text-yellow-400 mr-2" />
            <span className="text-white font-medium">Trusted by 100+ Businesses for Custom Platform Development</span>
          </div>
        </div>
      </section>

      {/* Why You Need Custom Platforms Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Your Business Needs Custom Platforms
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Off-the-shelf solutions often don't fit your unique business processes. Custom platforms are built specifically for your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Settings className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Perfect Fit for Your Business</h3>
              <p className="text-gray-600">
                Custom platforms are designed around your specific processes, workflows, and business requirements.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Improved Efficiency</h3>
              <p className="text-gray-600">
                Automate manual processes and streamline workflows to save time and reduce errors.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Enhanced Security</h3>
              <p className="text-gray-600">
                Built with security-first principles to protect your data and ensure compliance.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Scalable Growth</h3>
              <p className="text-gray-600">
                Designed to grow with your business, handling increased users and data seamlessly.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Link className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Easy Integrations</h3>
              <p className="text-gray-600">
                Seamlessly integrate with your existing tools and systems for a unified workflow.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Competitive Advantage</h3>
              <p className="text-gray-600">
                Unique solutions that give you an edge over competitors using generic software.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Types We Build */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Platform Types We Build</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We create custom platforms for every aspect of your business operations and growth.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platformTypes.map((type, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                    <type.icon className="w-5 h-5 text-indigo-600" />
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

      {/* Our Development Process */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Development Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We follow a proven 5-step process to deliver custom platforms that exceed your expectations.
            </p>
          </div>
          
          <div className="space-y-8">
            {developmentProcess.map((step, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Our Platforms Excel</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Every platform we build is designed for performance, security, and scalability.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-sm">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-indigo-600" />
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Choose Your Platform Package</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select the package that best fits your platform needs and business requirements.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {service.tiers.map((tier, index) => (
              <div key={index} className={`relative rounded-lg border-2 p-6 ${
                tier.popular 
                  ? 'border-indigo-500 bg-indigo-50' 
                  : 'border-gray-200 bg-white'
              }`}>
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <tier.icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{tier.name}</h3>
                  <div className="text-2xl font-bold text-indigo-600 mb-2">{tier.price}</div>
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
                    href={`/checkout?service=platforms-systems&tier=${index}`}
                    className={`w-full block text-center py-2 px-4 rounded font-semibold text-sm transition-colors ${
                      tier.popular
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Get Started
                  </Link>
                  <button 
                    onClick={() => setSelectedTier(index)}
                    className="w-full text-center py-1 px-4 text-xs text-gray-600 hover:text-indigo-600"
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
              Everything you need to know about our custom platform development services.
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
      <section className="py-12 bg-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Build Your Custom Platform?</h2>
          <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
            Let's create a custom platform that transforms your business operations and drives growth. 
            Get started with a free platform consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/checkout?service=platforms-systems" className="bg-white text-indigo-600 px-6 py-3 rounded font-semibold hover:bg-gray-100 transition-colors">
              Start Your Platform Project
            </Link>
            <Link href="/contact" className="border-2 border-white text-white px-6 py-3 rounded font-semibold hover:bg-white hover:text-indigo-600 transition-colors">
              Free Platform Consultation
            </Link>
          </div>
          <p className="text-indigo-200 text-sm mt-4">
            <Award className="w-4 h-4 inline mr-1" />
            30-day money-back guarantee on all platform projects
          </p>
        </div>
      </section>
    </div>
  )
}

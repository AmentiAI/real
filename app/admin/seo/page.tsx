'use client'

import { useState, useEffect } from 'react'
import { Search, BarChart3, Target, Globe, AlertTriangle, CheckCircle, Eye, Edit, ExternalLink } from 'lucide-react'

interface SEOPage {
  id: string
  title: string
  slug: string
  meta_title?: string
  meta_description?: string
  focus_keyword?: string
  og_title?: string
  og_description?: string
  og_image?: string
  canonical_url?: string
  robots_index?: boolean
  robots_follow?: boolean
  schema_type?: string
  seo_score?: number
  published: boolean
  word_count?: number
  heading_structure?: {
    h1_count: number
    h2_count: number
    h3_count: number
    h4_count: number
    has_h1: boolean
  }
  internal_links?: number
  external_links?: number
  image_count?: number
  images_with_alt?: number
  readability_score?: number
  keyword_density?: number
  content_freshness?: string
  page_speed_score?: number
}

interface SEOContent {
  id: string
  section: string
  title: string
  focus_keyword?: string
  meta_title?: string
  meta_description?: string
  image?: string
  alt_text?: string
  active: boolean
}

export default function SEODashboard() {
  const [seoPages, setSeoPages] = useState<SEOPage[]>([])
  const [seoContent, setSeoContent] = useState<SEOContent[]>([])
  const [loading, setLoading] = useState(true)
  const [analyzing, setAnalyzing] = useState(false)
  const [lastAnalyzed, setLastAnalyzed] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Fetch real SEO data from API
  const fetchSEOData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      console.log('Fetching SEO data from API...')
      
      // First get basic page data
      const response = await fetch('/api/admin/seo/analyze')
      console.log('Response status:', response.status)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        throw new Error(errorData.error || `HTTP ${response.status}: Failed to fetch SEO data`)
      }
      
      const data = await response.json()
      console.log('Received data:', data)
      
      setSeoPages(data.data || [])
      
      // Set sample content for now (can be expanded later)
  const sampleSEOContent: SEOContent[] = [
    {
      id: '1',
      section: 'hero',
      title: 'Dominate Your Market with Proven Digital Marketing',
      focus_keyword: 'digital marketing',
      meta_title: 'Digital Marketing Services Rhode Island',
      meta_description: 'Proven digital marketing strategies that help businesses grow.',
      active: true
    },
    {
      id: '2',
      section: 'services',
          title: 'Comprehensive Digital Marketing Solutions',
          focus_keyword: 'marketing solutions',
          meta_title: 'Digital Marketing Solutions',
      meta_description: 'Comprehensive digital marketing solutions for your business.',
      active: true
        }
      ]
      setSeoContent(sampleSEOContent)
      
    } catch (error) {
      console.error('Error fetching SEO data:', error)
      setError(error instanceof Error ? error.message : 'Failed to fetch SEO data')
    } finally {
      setLoading(false)
    }
  }

  // Perform real-time SEO analysis
  const analyzeSEO = async () => {
    try {
      setAnalyzing(true)
      setError(null)
      
      const response = await fetch('/api/admin/seo/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (!response.ok) {
        throw new Error('Failed to analyze SEO data')
      }
      
      const data = await response.json()
      setSeoPages(data.data || [])
      setLastAnalyzed(data.analyzed_at || new Date().toISOString())
      
    } catch (error) {
      console.error('Error analyzing SEO:', error)
      setError(error instanceof Error ? error.message : 'Failed to analyze SEO data')
    } finally {
      setAnalyzing(false)
    }
  }

  // Navigate to edit page
  const handleEditPage = (page: SEOPage) => {
    window.location.href = `/admin/seo/${page.id}/edit`
  }

  useEffect(() => {
    fetchSEOData()
  }, [])

  const getSEOGrade = (score: number) => {
    if (score >= 90) return { grade: 'A', color: 'text-green-600 bg-green-100' }
    if (score >= 80) return { grade: 'B', color: 'text-blue-600 bg-blue-100' }
    if (score >= 70) return { grade: 'C', color: 'text-yellow-600 bg-yellow-100' }
    if (score >= 60) return { grade: 'D', color: 'text-orange-600 bg-orange-100' }
    return { grade: 'F', color: 'text-red-600 bg-red-100' }
  }

  const getSEOIssues = (page: SEOPage) => {
    const issues = []
    if (!page.meta_title) issues.push('Missing meta title')
    if (!page.meta_description) issues.push('Missing meta description')
    if (!page.focus_keyword) issues.push('Missing focus keyword')
    if (!page.og_title) issues.push('Missing Open Graph title')
    if (!page.og_description) issues.push('Missing Open Graph description')
    if (!page.canonical_url) issues.push('Missing canonical URL')
    if (page.meta_title && page.meta_title.length > 60) issues.push('Meta title too long')
    if (page.meta_description && page.meta_description.length > 160) issues.push('Meta description too long')
    return issues
  }

  const averageSEOScore = seoPages.reduce((acc, page) => acc + (page.seo_score || 0), 0) / seoPages.length

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading SEO dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
          <h1 className="text-3xl font-bold text-gray-900">SEO Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitor and manage SEO performance across your website</p>
              {lastAnalyzed && (
                <p className="text-sm text-gray-500 mt-1">
                  Last analyzed: {new Date(lastAnalyzed).toLocaleString()}
                </p>
              )}
            </div>
            <div className="flex space-x-3">
              <button
                onClick={fetchSEOData}
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Refresh Data'}
              </button>
              <button
                onClick={analyzeSEO}
                disabled={analyzing || loading}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center"
              >
                {analyzing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Analyze SEO
                  </>
                )}
              </button>
            </div>
          </div>
          
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex">
                <svg className="w-5 h-5 text-red-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SEO Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average SEO Score</p>
                <p className="text-2xl font-bold text-gray-900">{Math.round(averageSEOScore)}/100</p>
              </div>
              <div className={`p-3 rounded-full ${getSEOGrade(Math.round(averageSEOScore)).color}`}>
                <BarChart3 className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Pages</p>
                <p className="text-2xl font-bold text-gray-900">{seoPages.length}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <Globe className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Published Pages</p>
                <p className="text-2xl font-bold text-gray-900">{seoPages.filter(p => p.published).length}</p>
              </div>
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <CheckCircle className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Content Items</p>
                <p className="text-2xl font-bold text-gray-900">{seoContent.length}</p>
              </div>
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <Target className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* 10 Onsite SEO Metrics */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Onsite SEO Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* 1. Content Quality */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-700">Content Quality</h3>
                <Target className="w-4 h-4 text-blue-500" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Avg Word Count</span>
                  <span className="font-medium">{seoPages.length > 0 ? Math.round(seoPages.reduce((sum, page) => sum + (page.word_count || 0), 0) / seoPages.length).toLocaleString() : 0}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Readability</span>
                  <span className="font-medium">{seoPages.length > 0 ? Math.round(seoPages.reduce((sum, page) => sum + (page.readability_score || 0), 0) / seoPages.length) : 0}/100</span>
                </div>
              </div>
            </div>

            {/* 2. Keyword Optimization */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-700">Keyword Optimization</h3>
                <Search className="w-4 h-4 text-green-500" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Avg Density</span>
                  <span className="font-medium">{seoPages.length > 0 ? Math.round((seoPages.reduce((sum, page) => sum + (page.keyword_density || 0), 0) / seoPages.length) * 10) / 10 : 0}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Pages w/ Focus KW</span>
                  <span className="font-medium">{seoPages.filter(page => page.focus_keyword).length}/{seoPages.length}</span>
                </div>
              </div>
            </div>

            {/* 3. Technical SEO */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-700">Technical SEO</h3>
                <BarChart3 className="w-4 h-4 text-purple-500" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Avg Speed Score</span>
                  <span className="font-medium">{seoPages.length > 0 ? Math.round(seoPages.reduce((sum, page) => sum + (page.page_speed_score || 0), 0) / seoPages.length) : 0}/100</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Indexed Pages</span>
                  <span className="font-medium">{seoPages.filter(page => page.robots_index).length}/{seoPages.length}</span>
                </div>
              </div>
            </div>

            {/* 4. Content Structure */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-700">Content Structure</h3>
                <Eye className="w-4 h-4 text-orange-500" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Pages w/ H1</span>
                  <span className="font-medium">{seoPages.filter(page => page.heading_structure?.has_h1).length}/{seoPages.length}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Avg H2 Count</span>
                  <span className="font-medium">{seoPages.length > 0 ? Math.round(seoPages.reduce((sum, page) => sum + (page.heading_structure?.h2_count || 0), 0) / seoPages.length) : 0}</span>
                </div>
              </div>
            </div>

            {/* 5. Link Structure */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-700">Link Structure</h3>
                <ExternalLink className="w-4 h-4 text-indigo-500" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Avg Internal Links</span>
                  <span className="font-medium">{seoPages.length > 0 ? Math.round(seoPages.reduce((sum, page) => sum + (page.internal_links || 0), 0) / seoPages.length) : 0}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Avg External Links</span>
                  <span className="font-medium">{seoPages.length > 0 ? Math.round(seoPages.reduce((sum, page) => sum + (page.external_links || 0), 0) / seoPages.length) : 0}</span>
                </div>
              </div>
            </div>

            {/* 6. Image Optimization */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-700">Image Optimization</h3>
                <div className="w-4 h-4 bg-indigo-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs">📷</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Images w/ Alt Text</span>
                  <span className="font-medium">{(() => {
                    const totalImages = seoPages.reduce((sum, page) => sum + (page.image_count || 0), 0)
                    const imagesWithAlt = seoPages.reduce((sum, page) => sum + (page.images_with_alt || 0), 0)
                    return totalImages > 0 ? Math.round((imagesWithAlt / totalImages) * 100) : 0
                  })()}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Avg Images/Page</span>
                  <span className="font-medium">{seoPages.length > 0 ? Math.round(seoPages.reduce((sum, page) => sum + (page.image_count || 0), 0) / seoPages.length) : 0}</span>
                </div>
              </div>
            </div>

            {/* 7. Content Freshness */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-700">Content Freshness</h3>
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Recently Updated</span>
                  <span className="font-medium">{seoPages.filter(page => {
                    const date = new Date(page.content_freshness || '2024-01-01')
                    const now = new Date()
                    const diffTime = Math.abs(now.getTime() - date.getTime())
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
                    return diffDays <= 30
                  }).length}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Stale Content</span>
                  <span className="font-medium">{seoPages.filter(page => {
                    const date = new Date(page.content_freshness || '2024-01-01')
                    const now = new Date()
                    const diffTime = Math.abs(now.getTime() - date.getTime())
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
                    return diffDays > 90
                  }).length}</span>
                </div>
              </div>
            </div>

            {/* 8. Meta Tags */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-700">Meta Tags</h3>
                <Edit className="w-4 h-4 text-teal-500" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Meta Titles</span>
                  <span className="font-medium">{seoPages.filter(page => page.meta_title).length}/{seoPages.length}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Meta Descriptions</span>
                  <span className="font-medium">{seoPages.filter(page => page.meta_description).length}/{seoPages.length}</span>
                </div>
              </div>
            </div>

            {/* 9. Schema Markup */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-700">Schema Markup</h3>
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Pages w/ Schema</span>
                  <span className="font-medium">{seoPages.filter(page => page.schema_type).length}/{seoPages.length}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Schema Types</span>
                  <span className="font-medium">{new Set(seoPages.map(page => page.schema_type).filter(Boolean)).size}</span>
                </div>
              </div>
            </div>

            {/* 10. Overall Performance */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-700">Overall Performance</h3>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Excellent (90+)</span>
                  <span className="font-medium text-green-600">{seoPages.filter(page => (page.seo_score || 0) >= 90).length}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Good (70-89)</span>
                  <span className="font-medium text-blue-600">{seoPages.filter(page => (page.seo_score || 0) >= 70 && (page.seo_score || 0) < 90).length}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Needs Work (&lt;70)</span>
                  <span className="font-medium text-red-600">{seoPages.filter(page => (page.seo_score || 0) < 70).length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pages SEO Analysis */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Pages SEO Analysis</h2>
            <p className="text-gray-600 mt-1">Detailed SEO analysis for each page</p>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {seoPages.map((page) => {
                const grade = getSEOGrade(page.seo_score || 0)
                const issues = getSEOIssues(page)
                
                return (
                  <div key={page.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-medium text-gray-900">{page.title}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          page.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {page.published ? 'Published' : 'Draft'}
                        </span>
                        <span className="text-sm text-gray-500">/{page.slug}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${grade.color}`}>
                          {grade.grade} ({page.seo_score || 0}/100)
                        </div>
                        <button 
                          onClick={() => handleEditPage(page)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded"
                          title="Edit SEO settings"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        {page.published && (
                          <a
                            href={`/${page.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Word Count</p>
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium text-gray-900">
                            {page.word_count ? page.word_count.toLocaleString() : <span className="text-gray-400">Not analyzed</span>}
                          </p>
                          {page.word_count && (
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              page.word_count >= 300 
                                ? 'bg-green-100 text-green-800' 
                                : page.word_count >= 150 
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {page.word_count >= 300 ? 'Good' : page.word_count >= 150 ? 'Fair' : 'Low'}
                            </span>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Focus Keyword</p>
                        <p className="text-sm font-medium text-gray-900">
                          {page.focus_keyword || <span className="text-red-500">Not set</span>}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Schema Type</p>
                        <p className="text-sm font-medium text-gray-900">
                          {page.schema_type || 'Not set'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Indexing</p>
                        <div className="flex space-x-4">
                          <span className={`text-sm ${page.robots_index ? 'text-green-600' : 'text-red-600'}`}>
                            {page.robots_index ? '✓ Index' : '✗ No Index'}
                          </span>
                          <span className={`text-sm ${page.robots_follow ? 'text-green-600' : 'text-red-600'}`}>
                            {page.robots_follow ? '✓ Follow' : '✗ No Follow'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {issues.length > 0 && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-2">
                          <AlertTriangle className="w-4 h-4 text-red-600" />
                          <h4 className="text-sm font-medium text-red-800">SEO Issues Found</h4>
                        </div>
                        <ul className="text-sm text-red-700 space-y-1">
                          {issues.map((issue, index) => (
                            <li key={index}>• {issue}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Content SEO Analysis */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Content SEO Analysis</h2>
            <p className="text-gray-600 mt-1">SEO analysis for website content sections</p>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {seoContent.map((content) => (
                <div key={content.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-medium text-gray-900">{content.title}</h3>
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                        {content.section}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        content.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {content.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <button 
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded"
                      title="Edit content (coming soon)"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Focus Keyword</p>
                      <p className="text-sm font-medium text-gray-900">
                        {content.focus_keyword || <span className="text-red-500">Not set</span>}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Meta Title</p>
                      <p className="text-sm font-medium text-gray-900">
                        {content.meta_title ? (
                          <span className={content.meta_title.length > 60 ? 'text-red-500' : 'text-green-600'}>
                            {content.meta_title} ({content.meta_title.length}/60)
                          </span>
                        ) : (
                          <span className="text-red-500">Not set</span>
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Meta Description</p>
                      <p className="text-sm font-medium text-gray-900">
                        {content.meta_description ? (
                          <span className={content.meta_description.length > 160 ? 'text-red-500' : 'text-green-600'}>
                            {content.meta_description.substring(0, 50)}... ({content.meta_description.length}/160)
                          </span>
                        ) : (
                          <span className="text-red-500">Not set</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SEO Recommendations */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">SEO Recommendations</h3>
          <ul className="space-y-2 text-blue-800">
            <li>• Add focus keywords to all pages and content items</li>
            <li>• Optimize meta titles to be between 30-60 characters</li>
            <li>• Write compelling meta descriptions under 160 characters</li>
            <li>• Add Open Graph images for better social media sharing</li>
            <li>• Set up canonical URLs to avoid duplicate content issues</li>
            <li>• Add structured data (Schema.org) for rich snippets</li>
            <li>• Ensure all images have descriptive alt text</li>
          </ul>
        </div>
      </div>

    </div>
  )
}
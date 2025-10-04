'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
// Using simple icons instead of lucide-react to avoid build issues

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

export default function EditSEOPage() {
  const router = useRouter()
  const params = useParams()
  const pageId = params.id as string

  const [page, setPage] = useState<SEOPage | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Fetch page data
  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(`/api/admin/seo/analyze`)
        if (!response.ok) {
          throw new Error('Failed to fetch SEO data')
        }
        
        const data = await response.json()
        const foundPage = data.data.find((p: SEOPage) => p.id === pageId)
        
        if (!foundPage) {
          throw new Error('Page not found')
        }
        
        setPage(foundPage)
      } catch (error) {
        console.error('Error fetching page:', error)
        setError(error instanceof Error ? error.message : 'Failed to fetch page')
      } finally {
        setLoading(false)
      }
    }

    if (pageId) {
      fetchPage()
    }
  }, [pageId])

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!page) return

    try {
      setSaving(true)
      setError(null)
      setSuccess(false)

      const formData = new FormData(e.target as HTMLFormElement)
      
      const updatedPage = {
        ...page,
        meta_title: formData.get('meta_title') as string,
        meta_description: formData.get('meta_description') as string,
        focus_keyword: formData.get('focus_keyword') as string,
        canonical_url: formData.get('canonical_url') as string,
        og_title: formData.get('og_title') as string,
        og_description: formData.get('og_description') as string,
        og_image: formData.get('og_image') as string,
        schema_type: formData.get('schema_type') as string,
        robots_index: formData.get('robots_index') === 'on',
        robots_follow: formData.get('robots_follow') === 'on',
      }

      const response = await fetch(`/api/admin/pages/${pageId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          meta_title: updatedPage.meta_title,
          meta_description: updatedPage.meta_description,
          meta_keywords: updatedPage.focus_keyword,
          canonical_url: updatedPage.canonical_url,
          og_title: updatedPage.og_title,
          og_description: updatedPage.og_description,
          og_image: updatedPage.og_image,
          schema_type: updatedPage.schema_type,
          robots_index: updatedPage.robots_index,
          robots_follow: updatedPage.robots_follow,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        console.error('API Error:', errorData)
        throw new Error(errorData.details || errorData.error || `HTTP ${response.status}: Failed to save page`)
      }

      setPage(updatedPage)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      console.error('Error saving page:', error)
      setError(error instanceof Error ? error.message : 'Failed to save page')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading page data...</p>
        </div>
      </div>
    )
  }

  if (error && !page) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl text-red-500 mx-auto mb-4">⚠</div>
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Error</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.push('/admin/seo')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to SEO Dashboard
          </button>
        </div>
      </div>
    )
  }

  if (!page) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Page not found</h1>
          <p className="text-gray-600 mb-4">The requested page could not be found.</p>
          <button
            onClick={() => router.push('/admin/seo')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to SEO Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <button
              onClick={() => router.push('/admin/seo')}
              className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg"
            >
              ←
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit SEO Settings</h1>
              <p className="text-gray-600 mt-1">{page.title}</p>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-sm text-gray-500">
                  Word Count: {page.word_count ? page.word_count.toLocaleString() : 'Not analyzed'}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  page.word_count && page.word_count >= 300 
                    ? 'bg-green-100 text-green-800' 
                    : page.word_count && page.word_count >= 150 
                    ? 'bg-yellow-100 text-yellow-800'
                    : page.word_count
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {page.word_count ? (
                    page.word_count >= 300 ? 'Good' : page.word_count >= 150 ? 'Fair' : 'Low'
                  ) : 'Unknown'}
                </span>
              </div>
            </div>
          </div>

          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                <span className="text-green-800">SEO settings saved successfully!</span>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <span className="text-red-400 mr-2">⚠</span>
                <span className="text-red-800">{error}</span>
              </div>
            </div>
          )}
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic SEO */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic SEO</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    name="meta_title"
                    defaultValue={page.meta_title || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter meta title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Canonical URL
                  </label>
                  <input
                    type="url"
                    name="canonical_url"
                    defaultValue={page.canonical_url || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/page"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Description
                </label>
                <textarea
                  name="meta_description"
                  defaultValue={page.meta_description || ''}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter meta description"
                />
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Focus Keywords
                </label>
                <input
                  type="text"
                  name="focus_keyword"
                  defaultValue={page.focus_keyword || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter focus keywords (comma separated)"
                />
              </div>
            </div>

            {/* Open Graph */}
            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Open Graph (Social Media)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    OG Title
                  </label>
                  <input
                    type="text"
                    name="og_title"
                    defaultValue={page.og_title || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Social media title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    OG Image URL
                  </label>
                  <input
                    type="url"
                    name="og_image"
                    defaultValue={page.og_image || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  OG Description
                </label>
                <textarea
                  name="og_description"
                  defaultValue={page.og_description || ''}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Social media description"
                />
              </div>
            </div>

            {/* Technical SEO */}
            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Technical SEO</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Schema Type
                  </label>
                  <select
                    name="schema_type"
                    defaultValue={page.schema_type || 'WebPage'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="WebPage">WebPage</option>
                    <option value="Article">Article</option>
                    <option value="BlogPosting">BlogPosting</option>
                    <option value="Organization">Organization</option>
                    <option value="Service">Service</option>
                    <option value="LocalBusiness">LocalBusiness</option>
                    <option value="ContactPage">ContactPage</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="robots_index"
                      defaultChecked={page.robots_index}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Allow Indexing</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="robots_follow"
                      defaultChecked={page.robots_follow}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Allow Following</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="border-t pt-6 flex justify-between">
              <button
                type="button"
                onClick={() => router.push('/admin/seo')}
                className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    💾 Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

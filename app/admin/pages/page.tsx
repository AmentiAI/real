'use client'

import { useState, useEffect } from 'react'
import { Save, Eye, Plus, Trash2, Edit, ExternalLink, FileText, Settings, Search, Globe, Twitter, Facebook, Code, Target, BarChart3, Upload, X } from 'lucide-react'
import ImageUpload from '@/components/ImageUpload'
import RichTextEditorWrapper from '@/components/RichTextEditorWrapper'

interface Page {
  id: string
  title: string
  slug: string
  description: string
  content: string
  featured_image?: string
  text_overlay?: 'light' | 'dark'
  meta_title?: string
  meta_description?: string
  meta_keywords?: string
  nav_location?: string
  published: boolean
  created_at: string
  updated_at: string
}

export default function PageManager() {
  const [pages, setPages] = useState<Page[]>([])
  const [editingPage, setEditingPage] = useState<Page | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showImportModal, setShowImportModal] = useState(false)
  const [importHtml, setImportHtml] = useState('')


  useEffect(() => {
    // Load pages from database
    loadPages()
  }, [])

  const loadPages = async () => {
    try {
      const response = await fetch('/api/admin/pages')
      if (response.ok) {
        const data = await response.json()
        setPages(data)
      } else {
        console.error('Failed to load pages from database:', response.statusText)
        setPages([])
      }
    } catch (error) {
      console.error('Error loading pages from database:', error)
      setPages([])
    } finally {
      setLoading(false)
    }
  }

  const savePage = async (pageData: Page) => {
    try {
      const method = pageData.id ? 'PUT' : 'POST'
      const url = pageData.id ? `/api/admin/pages/${pageData.id}` : '/api/admin/pages'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pageData),
      })
      
      if (response.ok) {
        // Reload pages from database
        await loadPages()
        setIsEditing(false)
        setEditingPage(null)
        alert('Page saved successfully!')
      } else {
        const errorText = await response.text()
        throw new Error(`Failed to save page: ${errorText}`)
      }
    } catch (error) {
      console.error('Error saving page:', error)
      alert(`Error saving page: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const deletePage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this page?')) return
    
    try {
      const response = await fetch(`/api/admin/pages/${id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        // Reload pages from database
        await loadPages()
        alert('Page deleted successfully!')
      } else {
        const errorText = await response.text()
        throw new Error(`Failed to delete page: ${errorText}`)
      }
    } catch (error) {
      console.error('Error deleting page:', error)
      alert(`Error deleting page: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const togglePublished = async (id: string, published: boolean) => {
    try {
      const response = await fetch(`/api/admin/pages/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ published }),
      })
      
      if (response.ok) {
        // Reload pages from database
        await loadPages()
      } else {
        const errorText = await response.text()
        throw new Error(`Failed to update page: ${errorText}`)
      }
    } catch (error) {
      console.error('Error updating page:', error)
      alert(`Error updating page: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const startEditing = (page?: Page) => {
    if (page) {
      setEditingPage({ ...page })
    } else {
      setEditingPage({
        id: '',
        title: '',
        slug: '',
        description: '',
        content: '',
        featured_image: '',
        text_overlay: 'dark',
        meta_title: '',
        meta_description: '',
        meta_keywords: '',
        nav_location: 'none',
        published: false,
        created_at: '',
        updated_at: ''
      })
    }
    setIsEditing(true)
  }

  const handleSave = () => {
    if (editingPage) {
      savePage(editingPage)
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const cleanHtmlContent = (html: string) => {
    // Create a temporary DOM element to parse and clean the HTML
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    
    // Allowed tags
    const allowedTags = ['h1', 'h2', 'h3', 'p', 'ul', 'li']
    
    // Function to recursively clean elements
    const cleanElement = (node: Node): string => {
      let result = ''
      
      // If this is a text node, return it (preserves text from removed tags)
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent || ''
      }
      
      // If this is not an element, return empty
      if (node.nodeType !== Node.ELEMENT_NODE) {
        return ''
      }
      
      const element = node as Element
      const tagName = element.tagName.toLowerCase()
      
      // If this is an allowed tag, keep it
      if (allowedTags.includes(tagName)) {
        result += `<${tagName}`
        
        // Remove all styling attributes to let site CSS take over
        // Only keep essential structural attributes if needed
        const allowedAttributes = ['id'] // Only keep id, remove class and style
        for (const attr of allowedAttributes) {
          const value = element.getAttribute(attr)
          if (value) {
            result += ` ${attr}="${value}"`
          }
        }
        
        result += '>'
        
        // Process all children (including text nodes)
        for (const child of Array.from(element.childNodes)) {
          result += cleanElement(child)
        }
        
        result += `</${tagName}>`
      } else {
        // If this is not an allowed tag, process its children but don't include the tag itself
        // This preserves text content from removed tags like <a>, <span>, <div>, etc.
        for (const child of Array.from(element.childNodes)) {
          result += cleanElement(child)
        }
      }
      
      return result
    }
    
    // Clean the body content
    const body = doc.body
    if (!body) return ''
    
    let cleanedContent = ''
    for (const child of Array.from(body.childNodes)) {
      cleanedContent += cleanElement(child)
    }
    
    // Clean up extra whitespace and empty tags
    return cleanedContent
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/>\s+</g, '><') // Remove spaces between tags
      .replace(/<(\w+)([^>]*)>\s*<\/\1>/g, '') // Remove empty tags
      .trim()
  }

  const parseHtml = (html: string) => {
    // Create a temporary DOM element to parse the HTML
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    
    // Extract title from first h1 or title tag
    const firstH1 = doc.querySelector('h1')
    const title = firstH1?.textContent?.trim() || 
                 doc.querySelector('title')?.textContent?.trim() || 
                 'Untitled Page'
    
    // Extract meta tags
    const metaTitle = doc.querySelector('meta[name="title"]')?.getAttribute('content') || 
                     doc.querySelector('meta[property="og:title"]')?.getAttribute('content') || 
                     title
    const metaDescription = doc.querySelector('meta[name="description"]')?.getAttribute('content') || 
                           doc.querySelector('meta[property="og:description"]')?.getAttribute('content') || ''
    const metaKeywords = doc.querySelector('meta[name="keywords"]')?.getAttribute('content') || ''
    
    // Extract Open Graph tags
    const ogTitle = doc.querySelector('meta[property="og:title"]')?.getAttribute('content') || ''
    const ogDescription = doc.querySelector('meta[property="og:description"]')?.getAttribute('content') || ''
    const ogImage = doc.querySelector('meta[property="og:image"]')?.getAttribute('content') || ''
    const ogType = doc.querySelector('meta[property="og:type"]')?.getAttribute('content') || 'website'
    
    // Extract Twitter Card tags
    const twitterCard = doc.querySelector('meta[name="twitter:card"]')?.getAttribute('content') || 'summary_large_image'
    const twitterTitle = doc.querySelector('meta[name="twitter:title"]')?.getAttribute('content') || ''
    const twitterDescription = doc.querySelector('meta[name="twitter:description"]')?.getAttribute('content') || ''
    const twitterImage = doc.querySelector('meta[name="twitter:image"]')?.getAttribute('content') || ''
    
    // Extract canonical URL
    const canonicalUrl = doc.querySelector('link[rel="canonical"]')?.getAttribute('href') || ''
    
    // Extract robots meta
    const robotsMeta = doc.querySelector('meta[name="robots"]')?.getAttribute('content') || ''
    const robotsIndex = !robotsMeta.includes('noindex')
    const robotsFollow = !robotsMeta.includes('nofollow')
    
    // Use the firstH1 we already found for content extraction
    
    // Extract main content starting from the first h1
    let mainContent = ''
    
    if (firstH1) {
      // Find the parent container of the h1
      let contentContainer = firstH1.parentElement
      
      // Look for common content containers that contain the h1
      const contentSelectors = [
        'main',
        'article',
        '.content',
        '.post-content',
        '.entry-content',
        '#content',
        '.main-content'
      ]
      
      for (const selector of contentSelectors) {
        const container = doc.querySelector(selector)
        if (container && container.contains(firstH1) && container instanceof HTMLElement) {
          contentContainer = container
          break
        }
      }
      
      if (contentContainer) {
        // Get all content from the h1 onwards
        const h1Index = Array.from(contentContainer.children).indexOf(firstH1)
        if (h1Index !== -1) {
          const relevantElements = Array.from(contentContainer.children).slice(h1Index)
          mainContent = relevantElements.map(el => el.outerHTML).join('')
        } else {
          // Fallback: get content from h1 onwards
          mainContent = firstH1.outerHTML
          let nextElement = firstH1.nextElementSibling
          while (nextElement) {
            mainContent += nextElement.outerHTML
            nextElement = nextElement.nextElementSibling
          }
        }
      }
    }
    
    // If no h1 found, fallback to original method
    if (!mainContent) {
      mainContent = doc.querySelector('main')?.innerHTML || 
                   doc.querySelector('article')?.innerHTML || 
                   doc.querySelector('.content')?.innerHTML || 
                   doc.querySelector('#content')?.innerHTML || 
                   doc.querySelector('body')?.innerHTML || ''
    }
    
    // Clean content to only keep specific HTML tags
    mainContent = cleanHtmlContent(mainContent)
    
    // Extract description from first paragraph or meta description
    const description = metaDescription || 
                       doc.querySelector('p')?.textContent?.substring(0, 160) || 
                       ''
    
    // Extract featured image
    const featuredImage = ogImage || 
                         doc.querySelector('img')?.getAttribute('src') || 
                         ''
    
    return {
      title: title || 'Imported Page',
      slug: generateSlug(title || 'imported-page'),
      description: description.substring(0, 500),
      content: mainContent,
      featured_image: featuredImage,
      meta_title: metaTitle.substring(0, 60),
      meta_description: metaDescription.substring(0, 160),
      meta_keywords: metaKeywords,
      nav_location: 'none',
      published: false
    }
  }

  const handleImportHtml = () => {
    if (!importHtml.trim()) {
      alert('Please paste some HTML content to import')
      return
    }

    try {
      const parsedData = parseHtml(importHtml)
      setEditingPage({
        ...parsedData,
        id: '',
        created_at: '',
        updated_at: ''
      })
      setShowImportModal(false)
      setImportHtml('')
      setIsEditing(true)
      alert('HTML imported successfully! Please review and save the page.')
    } catch (error) {
      console.error('Error parsing HTML:', error)
      alert('Error parsing HTML. Please check the format and try again.')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading pages...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Page Manager</h1>
          <p className="text-gray-600 mt-2">Create and manage website pages</p>
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800 text-sm">
            <strong>🗄️ Database Mode:</strong> All changes are saved directly to the database. 
            No localStorage is used - all data persists in the database.
          </p>
        </div>
        <div className="mt-2 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 text-sm">
            <strong>📥 Import HTML:</strong> Have an existing HTML page? Use the "Import HTML" button to automatically extract title, meta tags, and clean content from any HTML source code. Everything before the first H1 tag is ignored, and content loads into the rich text editor.
            </p>
          </div>
        </div>

        {isEditing ? (
          /* Edit Form */
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingPage?.id ? 'Edit Page' : 'Create New Page'}
              </h2>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowImportModal(true)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>Import HTML</span>
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false)
                    setEditingPage(null)
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Page</span>
                </button>
              </div>
            </div>

            {editingPage && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Page Title
                    </label>
                    <input
                      type="text"
                      value={editingPage.title}
                      onChange={(e) => {
                        const title = e.target.value
                        setEditingPage({
                          ...editingPage,
                          title,
                          slug: generateSlug(title)
                        })
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL Slug
                    </label>
                    <input
                      type="text"
                      value={editingPage.slug}
                      onChange={(e) => setEditingPage({
                        ...editingPage,
                        slug: e.target.value
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Navigation Location
                  </label>
                  <select
                    value={editingPage.nav_location || 'none'}
                    onChange={(e) => setEditingPage({
                      ...editingPage,
                      nav_location: e.target.value
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="none">Not in Navigation</option>
                    <option value="header">Header Navigation</option>
                    <option value="footer">Footer Navigation</option>
                    <option value="widget">Widget/Sidebar</option>
                    <option value="mobile">Mobile Menu Only</option>
                    <option value="both">Header & Footer</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Choose where this page will appear in the website navigation
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={editingPage.description}
                    onChange={(e) => setEditingPage({
                      ...editingPage,
                      description: e.target.value
                    })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <ImageUpload
                  onImageUploaded={(url) => setEditingPage({
                    ...editingPage,
                    featured_image: url
                  })}
                  currentImage={editingPage.featured_image}
                  folder="pages"
                />

                {editingPage.featured_image && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                      Text Overlay Color
                  </label>
                    <select
                      value={editingPage.text_overlay || 'dark'}
                    onChange={(e) => setEditingPage({
                      ...editingPage,
                        text_overlay: e.target.value as 'light' | 'dark'
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="dark">Dark Text (for light images)</option>
                      <option value="light">Light Text (for dark images)</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      Choose the text color that will be overlaid on your featured image for better readability.
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Page Content
                  </label>
                  <RichTextEditorWrapper
                    content={editingPage.content || ''}
                    onChange={(content) => setEditingPage({
                      ...editingPage,
                      content: content
                    })}
                    placeholder="Start writing your page content..."
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Use the toolbar above to format your content. The editor automatically generates clean HTML.
                  </p>
                </div>

                {/* Basic SEO Settings */}
                <div className="border-t pt-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <Search className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-medium text-gray-900">SEO Settings</h3>
                  </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Meta Title <span className="text-gray-400">({(editingPage.meta_title || '').length}/60)</span>
                        </label>
                        <input
                          type="text"
                          value={editingPage.meta_title || ''}
                          onChange={(e) => setEditingPage({
                            ...editingPage,
                            meta_title: e.target.value
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          maxLength={60}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Meta Description <span className="text-gray-400">({(editingPage.meta_description || '').length}/160)</span>
                        </label>
                        <textarea
                          value={editingPage.meta_description || ''}
                          onChange={(e) => setEditingPage({
                            ...editingPage,
                            meta_description: e.target.value
                          })}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          maxLength={160}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Meta Keywords
                        </label>
                        <input
                          type="text"
                          value={editingPage.meta_keywords || ''}
                          onChange={(e) => setEditingPage({
                            ...editingPage,
                            meta_keywords: e.target.value
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="keyword1, keyword2, keyword3"
                        />
                      </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="published"
                    checked={editingPage.published}
                    onChange={(e) => setEditingPage({
                      ...editingPage,
                      published: e.target.checked
                    })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
                    Publish this page (make it visible on the website)
                  </label>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Pages List */
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Website Pages</h2>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setShowImportModal(true)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Import HTML</span>
                  </button>
                <button
                  onClick={() => startEditing()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Page</span>
                </button>
                </div>
              </div>
            </div>

            <div className="p-6">
              {pages.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">No pages found</p>
                  <div className="flex items-center justify-center space-x-3">
                    <button
                      onClick={() => setShowImportModal(true)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Import HTML</span>
                    </button>
                  <button
                    onClick={() => startEditing()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Create First Page
                  </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {pages.map((page) => (
                    <div key={page.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-medium text-gray-900">{page.title}</h3>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              page.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {page.published ? 'Published' : 'Draft'}
                            </span>
                            {page.nav_location && page.nav_location !== 'none' && (
                              <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                                {page.nav_location === 'header' && 'Header Nav'}
                                {page.nav_location === 'footer' && 'Footer Nav'}
                                {page.nav_location === 'widget' && 'Widget'}
                                {page.nav_location === 'mobile' && 'Mobile Only'}
                                {page.nav_location === 'both' && 'Header & Footer'}
                              </span>
                            )}
                            {page.featured_image && (
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                page.text_overlay === 'light' 
                                  ? 'bg-gray-800 text-white' 
                                  : 'bg-gray-200 text-gray-800'
                              }`}>
                                {page.text_overlay === 'light' ? 'Light Text' : 'Dark Text'}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">/{page.slug}</p>
                          <p className="text-sm text-gray-500 line-clamp-2">
                            {page.description}
                          </p>
                          {page.featured_image && (
                            <img
                              src={page.featured_image}
                              alt={page.title}
                              className="w-16 h-16 object-cover rounded mt-2"
                            />
                          )}
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          {page.published && (
                            <a
                              href={`/${page.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 text-blue-600 hover:bg-blue-100 rounded"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                          <button
                            onClick={() => togglePublished(page.id, !page.published)}
                            className={`p-2 rounded ${
                              page.published ? 'text-green-600 hover:bg-green-100' : 'text-gray-400 hover:bg-gray-100'
                            }`}
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => startEditing(page)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deletePage(page.id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Import HTML Modal */}
        {showImportModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Import HTML Page</h3>
                  <button
                    onClick={() => {
                      setShowImportModal(false)
                      setImportHtml('')
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Paste the complete HTML source code of a page and we'll automatically extract the title, meta tags, and clean content. Everything before the first H1 tag will be ignored, and the content will be loaded into the rich text editor.
                </p>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      HTML Source Code
                    </label>
                    <textarea
                      value={importHtml}
                      onChange={(e) => setImportHtml(e.target.value)}
                      rows={15}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                      placeholder="Paste your complete HTML source code here..."
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Include the complete HTML including &lt;head&gt; section with meta tags, title, and body content.
                    </p>
                  </div>
                  
                </div>
              </div>
              
              <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowImportModal(false)
                    setImportHtml('')
                  }}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleImportHtml}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>Import & Edit Page</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
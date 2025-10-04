'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import SimpleTextEditor from './SimpleTextEditor'

// Try using absolute import path instead of relative
const RichTextEditor = dynamic(() => import('@/components/RichTextEditor'), {
  ssr: false,
  loading: () => (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="border-b border-gray-300 bg-gray-50 p-2">
        <div className="text-sm text-gray-500">Loading editor...</div>
      </div>
      <div className="bg-white min-h-[300px] p-4 flex items-center justify-center">
        <div className="text-gray-500">Loading rich text editor...</div>
      </div>
    </div>
  )
})

interface RichTextEditorWrapperProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

export default function RichTextEditorWrapper(props: RichTextEditorWrapperProps) {
  const [useFallback, setUseFallback] = useState(false)

  useEffect(() => {
    // Check if we're in a browser environment and if there are any chunk loading issues
    const handleChunkError = (event: ErrorEvent) => {
      if (event.message && event.message.includes('Loading chunk')) {
        console.warn('Chunk loading error detected, falling back to simple editor')
        setUseFallback(true)
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('error', handleChunkError)
      return () => window.removeEventListener('error', handleChunkError)
    }
  }, [])

  // Use simple fallback editor if chunk loading fails
  if (useFallback) {
    return <SimpleTextEditor {...props} />
  }

  try {
    return <RichTextEditor {...props} />
  } catch (error) {
    console.error('RichTextEditor failed to load:', error)
    return <SimpleTextEditor {...props} />
  }
}




'use client'

import { useState } from 'react'

interface SimpleTextEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

export default function SimpleTextEditor({ content, onChange, placeholder = "Start writing..." }: SimpleTextEditorProps) {
  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="border-b border-gray-300 bg-gray-50 p-2">
        <div className="text-sm text-gray-600 font-medium">Text Editor</div>
      </div>
      <div className="bg-white min-h-[300px] p-4">
        <textarea
          value={content}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-full min-h-[250px] p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
        <div className="mt-2 text-xs text-gray-500">
          Basic text editor. For rich text formatting, use HTML tags.
        </div>
      </div>
    </div>
  )
}





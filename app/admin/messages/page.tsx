'use client'

import { useState, useEffect } from 'react'
import { 
  MessageSquare, 
  Send, 
  User, 
  Clock, 
  AlertCircle, 
  CheckCircle,
  Reply,
  Filter,
  Search,
  Plus,
  Users
} from 'lucide-react'

interface Message {
  id: number
  client_id: number
  sender_type: 'client' | 'admin'
  subject: string
  message: string
  is_read: boolean
  priority: 'low' | 'normal' | 'high' | 'urgent'
  created_at: string
  client_name: string
  client_email: string
  client_company?: string
}

interface Client {
  id: number
  name: string
  email: string
  company: string
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [replyText, setReplyText] = useState('')
  const [sending, setSending] = useState(false)
  const [filter, setFilter] = useState<'all' | 'unread' | 'client' | 'admin'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showNewMessage, setShowNewMessage] = useState(false)
  const [newMessage, setNewMessage] = useState<{
    clientId: string
    subject: string
    message: string
    priority: 'low' | 'normal' | 'high' | 'urgent'
  }>({
    clientId: '',
    subject: '',
    message: '',
    priority: 'normal'
  })
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  useEffect(() => {
    fetchMessages()
    fetchClients()
    
    // Set up polling for real-time updates
    const interval = setInterval(() => {
      fetchMessages()
    }, 5000) // Poll every 5 seconds
    
    return () => clearInterval(interval)
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/admin/messages')
      if (response.ok) {
        const data = await response.json()
        setMessages(data)
        setLastUpdated(new Date())
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchClients = async () => {
    try {
      const response = await fetch('/api/admin/clients')
      if (response.ok) {
        const data = await response.json()
        setClients(data)
      }
    } catch (error) {
      console.error('Error fetching clients:', error)
    }
  }

  const sendReply = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedMessage || !replyText.trim()) return

    setSending(true)
    try {
      const response = await fetch('/api/admin/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          clientId: selectedMessage.client_id,
          subject: `Re: ${selectedMessage.subject}`,
          message: replyText,
          priority: 'normal'
        })
      })

      if (response.ok) {
        setReplyText('')
        fetchMessages() // Refresh messages
        setSelectedMessage(null)
      }
    } catch (error) {
      console.error('Error sending reply:', error)
    } finally {
      setSending(false)
    }
  }

  const sendNewMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.clientId || !newMessage.subject.trim() || !newMessage.message.trim()) return

    setSending(true)
    try {
      const response = await fetch('/api/admin/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          clientId: parseInt(newMessage.clientId),
          subject: newMessage.subject,
          message: newMessage.message,
          priority: newMessage.priority
        })
      })

      if (response.ok) {
        setNewMessage({ clientId: '', subject: '', message: '', priority: 'normal' })
        setShowNewMessage(false)
        fetchMessages() // Refresh messages
      }
    } catch (error) {
      console.error('Error sending new message:', error)
    } finally {
      setSending(false)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-50 border-red-200'
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'normal': return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'low': return 'text-gray-600 bg-gray-50 border-gray-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const filteredMessages = messages.filter(message => {
    const matchesFilter = 
      filter === 'all' ||
      (filter === 'unread' && !message.is_read) ||
      (filter === 'client' && message.sender_type === 'client') ||
      (filter === 'admin' && message.sender_type === 'admin')
    
    const matchesSearch = 
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.client_name.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesFilter && matchesSearch
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading messages...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Client Messages</h1>
                <p className="text-gray-600">Manage client communications</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white rounded-full px-4 py-2 shadow-sm border border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">
                    Live • {messages.filter(m => !m.is_read).length} unread
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowNewMessage(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>New Message</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

          <div className="flex">
            {/* Messages List */}
            <div className="flex-1 border-r border-gray-200">
              {/* Filters and Search */}
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search messages..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <select
                      value={filter}
                      onChange={(e) => setFilter(e.target.value as any)}
                      className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                    >
                      <option value="all">All Messages</option>
                      <option value="unread">Unread</option>
                      <option value="client">From Clients</option>
                      <option value="admin">From Admin</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="max-h-96 overflow-y-auto">
                {filteredMessages.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No messages found</p>
                  </div>
                ) : (
                  filteredMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-6 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-all duration-200 ${
                        !message.is_read ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                      }`}
                      onClick={() => setSelectedMessage(message)}
                    >
                      <div className="flex items-start space-x-4">
                        {/* Avatar */}
                        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                          message.sender_type === 'client' 
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                            : 'bg-gradient-to-r from-blue-500 to-indigo-500'
                        }`}>
                          <span className="text-white font-semibold">
                            {message.sender_type === 'client' ? 'C' : 'A'}
                          </span>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <h3 className="text-lg font-semibold text-gray-900 truncate">
                                {message.subject}
                              </h3>
                              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getPriorityColor(message.priority)}`}>
                                {message.priority.toUpperCase()}
                              </span>
                              {!message.is_read && (
                                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                              )}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="w-4 h-4 mr-1" />
                              {formatDate(message.created_at)}
                            </div>
                          </div>
                          
                          <p className="text-gray-700 leading-relaxed mb-3 line-clamp-2">
                            {message.message}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <User className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600 font-medium">
                                {message.client_name}
                              </span>
                              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                              <span className="text-sm text-gray-500">
                                {message.client_email}
                              </span>
                              {message.client_company && (
                                <>
                                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                                  <span className="text-sm text-gray-500">
                                    {message.client_company}
                                  </span>
                                </>
                              )}
                            </div>
                            <span className="text-xs text-gray-500">
                              {message.sender_type === 'client' ? 'From Client' : 'Admin Reply'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Message Detail and Reply */}
            <div className="w-96 bg-gradient-to-b from-gray-50 to-white">
              {selectedMessage ? (
                <div className="p-6">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold text-gray-900">
                        {selectedMessage.subject}
                      </h2>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getPriorityColor(selectedMessage.priority)}`}>
                        {selectedMessage.priority.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          selectedMessage.sender_type === 'client' 
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                            : 'bg-gradient-to-r from-blue-500 to-indigo-500'
                        }`}>
                          <span className="text-white font-semibold text-sm">
                            {selectedMessage.sender_type === 'client' ? 'C' : 'A'}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{selectedMessage.client_name}</p>
                          <p className="text-sm text-gray-500">{selectedMessage.client_email}</p>
                        </div>
                      </div>
                      <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{selectedMessage.message}</p>
                    </div>
                  </div>

                  <form onSubmit={sendReply} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Reply Message
                      </label>
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm resize-none"
                        placeholder="Type your reply here..."
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={sending || !replyText.trim()}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      {sending ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending Reply...
                        </>
                      ) : (
                        <>
                          <Reply className="w-4 h-4 mr-2" />
                          Send Reply
                        </>
                      )}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="p-12 text-center text-gray-500">
                  <div className="w-20 h-20 bg-gradient-to-r from-gray-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MessageSquare className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Message</h3>
                  <p>Choose a message from the list to view details and reply</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* New Message Modal */}
        {showNewMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900">Send New Message</h3>
                  <button
                    onClick={() => setShowNewMessage(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <form onSubmit={sendNewMessage} className="p-6 space-y-6">
                <div>
                  <label htmlFor="clientId" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Client
                  </label>
                  <select
                    id="clientId"
                    value={newMessage.clientId}
                    onChange={(e) => setNewMessage({ ...newMessage, clientId: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    required
                  >
                    <option value="">Choose a client...</option>
                    {clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name} ({client.company}) - {client.email}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={newMessage.subject}
                    onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    placeholder="Enter message subject..."
                    required
                  />
                </div>

                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    id="priority"
                    value={newMessage.priority}
                    onChange={(e) => setNewMessage({ ...newMessage, priority: e.target.value as 'low' | 'normal' | 'high' | 'urgent' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  >
                    <option value="low">🟢 Low Priority</option>
                    <option value="normal">🟡 Normal Priority</option>
                    <option value="high">🟠 High Priority</option>
                    <option value="urgent">🔴 Urgent</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    value={newMessage.message}
                    onChange={(e) => setNewMessage({ ...newMessage, message: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 resize-y"
                    placeholder="Type your message here..."
                    required
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowNewMessage(false)}
                    className="px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors duration-200 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={sending || !newMessage.clientId || !newMessage.subject.trim() || !newMessage.message.trim()}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    {sending ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { Save, User, Mail, Lock, Globe, Bell, Shield } from 'lucide-react'

interface Settings {
  general: {
    siteName: string
    siteDescription: string
    siteUrl: string
    adminEmail: string
  }
  notifications: {
    emailNotifications: boolean
    newClientAlerts: boolean
    newInquiryAlerts: boolean
    systemAlerts: boolean
  }
  security: {
    twoFactorAuth: boolean
    sessionTimeout: number
    passwordExpiry: number
  }
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    general: {
      siteName: branding?.company_name || 'Amenti AI',
      siteDescription: 'Professional internet marketing and SEO services',
      siteUrl: 'https://amentiai.com',
      adminEmail: 'admin@amentiai.com'
    },
    notifications: {
      emailNotifications: true,
      newClientAlerts: true,
      newInquiryAlerts: true,
      systemAlerts: false
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordExpiry: 90
    }
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/admin/settings')
      
      if (!response.ok) {
        throw new Error(`Failed to fetch settings: ${response.statusText}`)
      }
      
      const data = await response.json()
      setSettings(data)
    } catch (error) {
      console.error('Error fetching settings:', error)
      setError(error instanceof Error ? error.message : 'Failed to fetch settings')
    } finally {
      setLoading(false)
    }
  }

  const saveSettings = async () => {
    try {
      setSaving(true)
      setError(null)
      setSuccess(null)
      
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      })
      
      if (!response.ok) {
        throw new Error(`Failed to save settings: ${response.statusText}`)
      }
      
      setSuccess('Settings saved successfully!')
    } catch (error) {
      console.error('Error saving settings:', error)
      setError(error instanceof Error ? error.message : 'Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  const handleGeneralChange = (field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      general: {
        ...prev.general,
        [field]: value
      }
    }))
  }

  const handleNotificationChange = (field: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: value
      }
    }))
  }

  const handleSecurityChange = (field: string, value: boolean | number) => {
    setSettings(prev => ({
      ...prev,
      security: {
        ...prev.security,
        [field]: value
      }
    }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading settings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your application settings and preferences.
          </p>
        </div>
        <button
          onClick={saveSettings}
          disabled={saving}
          className="btn-primary inline-flex items-center"
        >
          <Save className="mr-2" size={16} />
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {success}
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* General Settings */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center mb-4">
            <Globe className="w-5 h-5 text-gray-400 mr-2" />
            <h3 className="text-lg leading-6 font-medium text-gray-900">General Settings</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label">Site Name</label>
              <input
                type="text"
                value={settings.general.siteName}
                onChange={(e) => handleGeneralChange('siteName', e.target.value)}
                className="input"
              />
            </div>
            <div>
              <label className="label">Admin Email</label>
              <input
                type="email"
                value={settings.general.adminEmail}
                onChange={(e) => handleGeneralChange('adminEmail', e.target.value)}
                className="input"
              />
            </div>
            <div className="md:col-span-2">
              <label className="label">Site Description</label>
              <textarea
                value={settings.general.siteDescription}
                onChange={(e) => handleGeneralChange('siteDescription', e.target.value)}
                className="textarea"
                rows={3}
              />
            </div>
            <div className="md:col-span-2">
              <label className="label">Site URL</label>
              <input
                type="url"
                value={settings.general.siteUrl}
                onChange={(e) => handleGeneralChange('siteUrl', e.target.value)}
                className="input"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center mb-4">
            <Bell className="w-5 h-5 text-gray-400 mr-2" />
            <h3 className="text-lg leading-6 font-medium text-gray-900">Notification Settings</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Email Notifications</label>
                <p className="text-sm text-gray-500">Receive email notifications for important events</p>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications.emailNotifications}
                onChange={(e) => handleNotificationChange('emailNotifications', e.target.checked)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">New Client Alerts</label>
                <p className="text-sm text-gray-500">Get notified when new clients are added</p>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications.newClientAlerts}
                onChange={(e) => handleNotificationChange('newClientAlerts', e.target.checked)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">New Inquiry Alerts</label>
                <p className="text-sm text-gray-500">Get notified when new inquiries are received</p>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications.newInquiryAlerts}
                onChange={(e) => handleNotificationChange('newInquiryAlerts', e.target.checked)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">System Alerts</label>
                <p className="text-sm text-gray-500">Receive system maintenance and update notifications</p>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications.systemAlerts}
                onChange={(e) => handleNotificationChange('systemAlerts', e.target.checked)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center mb-4">
            <Shield className="w-5 h-5 text-gray-400 mr-2" />
            <h3 className="text-lg leading-6 font-medium text-gray-900">Security Settings</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Two-Factor Authentication</label>
                <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
              </div>
              <input
                type="checkbox"
                checked={settings.security.twoFactorAuth}
                onChange={(e) => handleSecurityChange('twoFactorAuth', e.target.checked)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Session Timeout (minutes)</label>
              <p className="text-sm text-gray-500">How long before users are automatically logged out</p>
              <input
                type="number"
                value={settings.security.sessionTimeout}
                onChange={(e) => handleSecurityChange('sessionTimeout', parseInt(e.target.value))}
                className="input w-32 mt-1"
                min="5"
                max="480"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Password Expiry (days)</label>
              <p className="text-sm text-gray-500">How often users must change their passwords</p>
              <input
                type="number"
                value={settings.security.passwordExpiry}
                onChange={(e) => handleSecurityChange('passwordExpiry', parseInt(e.target.value))}
                className="input w-32 mt-1"
                min="30"
                max="365"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


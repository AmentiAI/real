'use client'

import { useState, useEffect } from 'react'

interface PayPalSettings {
  id?: number
  environment: string
  client_id: string
  client_secret: string
  webhook_id: string
  webhook_url: string
  return_url: string
  cancel_url: string
  currency: string
  tax_rate: number
  processing_fee_rate: number
  processing_fee_fixed: number
  auto_capture: boolean
  enable_recurring: boolean
  trial_period_days: number
  grace_period_days: number
  email_notifications: boolean
  admin_email: string
  customer_email_template: string
  admin_email_template: string
  is_active: boolean
  env_vars_available?: boolean
}

export default function PayPalConfigPage() {
  const [settings, setSettings] = useState<PayPalSettings>({
    environment: 'sandbox',
    client_id: '',
    client_secret: '',
    webhook_id: '',
    webhook_url: '',
    return_url: '',
    cancel_url: '',
    currency: 'USD',
    tax_rate: 0,
    processing_fee_rate: 0.029,
    processing_fee_fixed: 0.30,
    auto_capture: true,
    enable_recurring: true,
    trial_period_days: 0,
    grace_period_days: 3,
    email_notifications: true,
    admin_email: '',
    customer_email_template: 'Thank you for your purchase! Your package has been activated.',
    admin_email_template: 'New payment received for package: {package_name}',
    is_active: false
  })
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [testing, setTesting] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('')

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/paypal-settings')
      const data = await response.json()
      
      if (data.success && data.data) {
        // Check if environment variables are available
        const response2 = await fetch('/api/admin/paypal-settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'check_env_vars' })
        })
        const envData = await response2.json()
        
        // Merge environment variables with database settings
        const mergedSettings = {
          ...data.data,
          // If env vars are available, use them as preset values
          client_id: envData.data?.has_env_client_id ? '[Environment Variable Set]' : data.data.client_id,
          client_secret: envData.data?.has_env_client_secret ? '[Environment Variable Set]' : data.data.client_secret,
          env_vars_available: envData.data?.has_env_client_id && envData.data?.has_env_client_secret
        }
        
        setSettings(mergedSettings)
      }
    } catch (err) {
      showMessage('Failed to load PayPal settings', 'error')
    } finally {
      setLoading(false)
    }
  }

  const showMessage = (msg: string, type: 'success' | 'error') => {
    setMessage(msg)
    setMessageType(type)
    setTimeout(() => {
      setMessage('')
      setMessageType('')
    }, 5000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setSaving(true)
      const response = await fetch('/api/admin/paypal-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      })
      
      const data = await response.json()
      
      if (data.success) {
        showMessage('PayPal settings saved successfully!', 'success')
        setSettings(data.data)
      } else {
        showMessage(data.error || 'Failed to save settings', 'error')
      }
    } catch (err) {
      showMessage('Failed to save PayPal settings', 'error')
    } finally {
      setSaving(false)
    }
  }

  const testConnection = async () => {
    try {
      setTesting(true)
      console.log('Testing PayPal connection with current settings...')
      
      const response = await fetch('/api/admin/paypal-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'test_connection',
          settings: settings
        })
      })
      
      console.log('Response status:', response.status)
      const data = await response.json()
      console.log('Response data:', data)
      
      if (data.success) {
        showMessage(`PayPal connection successful! (${data.data.environment} mode)`, 'success')
      } else {
        showMessage(data.error || 'Connection test failed', 'error')
      }
    } catch (err) {
      console.error('Test connection error:', err)
      showMessage('Failed to test PayPal connection', 'error')
    } finally {
      setTesting(false)
    }
  }

  const handleChange = (field: keyof PayPalSettings, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading PayPal settings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">PayPal Configuration</h1>
          <p className="mt-2 text-gray-600">Configure your PayPal payment system for package sales</p>
        </div>

        {/* Status Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            messageType === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-700' 
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Configuration */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Configuration</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Environment
                </label>
                <select
                  value={settings.environment}
                  onChange={(e) => handleChange('environment', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="sandbox">Sandbox (Testing)</option>
                  <option value="live">Live (Production)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  {settings.environment === 'sandbox' 
                    ? 'Use sandbox for testing payments' 
                    : 'Use live for real payments'
                  }
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Currency
                </label>
                <select
                  value={settings.currency}
                  onChange={(e) => handleChange('currency', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.is_active}
                  onChange={(e) => handleChange('is_active', e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">
                  Enable PayPal payments
                </span>
              </label>
            </div>
          </div>

          {/* API Credentials */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">API Credentials</h2>
            <p className="text-sm text-gray-600 mb-4">
              Get these from your PayPal Developer Dashboard. You can also set them as environment variables <code className="bg-gray-100 px-1 rounded">PPCLIENT</code> and <code className="bg-gray-100 px-1 rounded">PPSECRET</code>.
            </p>
            
            {/* Environment Variables Info */}
            <div className={`mb-4 p-3 border rounded-md ${
              settings.env_vars_available 
                ? 'bg-green-50 border-green-200' 
                : 'bg-blue-50 border-blue-200'
            }`}>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {settings.env_vars_available ? (
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="ml-3">
                  <h3 className={`text-sm font-medium ${
                    settings.env_vars_available ? 'text-green-800' : 'text-blue-800'
                  }`}>
                    Environment Variables {settings.env_vars_available ? '(Active)' : '(Not Set)'}
                  </h3>
                  <div className={`mt-1 text-sm ${
                    settings.env_vars_available ? 'text-green-700' : 'text-blue-700'
                  }`}>
                    {settings.env_vars_available ? (
                      <div>
                        <p className="font-medium">✅ Environment variables are configured and active!</p>
                        <ul className="mt-1 list-disc list-inside space-y-1">
                          <li><code className="bg-green-100 px-1 rounded">PPCLIENT</code> - Set ✓</li>
                          <li><code className="bg-green-100 px-1 rounded">PPSECRET</code> - Set ✓</li>
                        </ul>
                        <p className="mt-2">Your PayPal credentials are securely stored in environment variables.</p>
                      </div>
                    ) : (
                      <div>
                        <p>Set these environment variables for better security:</p>
                        <ul className="mt-1 list-disc list-inside space-y-1">
                          <li><code className="bg-blue-100 px-1 rounded">PPCLIENT</code> - Your PayPal Client ID</li>
                          <li><code className="bg-blue-100 px-1 rounded">PPSECRET</code> - Your PayPal Client Secret</li>
                        </ul>
                        <p className="mt-2">If environment variables are set, they will be used instead of the form fields below.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Client ID {settings.env_vars_available && <span className="text-green-600">(Using Environment Variable)</span>}
                </label>
                <input
                  type="text"
                  value={settings.client_id}
                  onChange={(e) => handleChange('client_id', e.target.value)}
                  placeholder={settings.env_vars_available ? "Environment variable PPCLIENT is set" : "Enter your PayPal Client ID (or set PPCLIENT env var)"}
                  disabled={settings.env_vars_available}
                  className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
                    settings.env_vars_available 
                      ? 'border-green-300 bg-green-50 text-green-700 focus:ring-green-500' 
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                />
                {settings.env_vars_available && (
                  <p className="text-xs text-green-600 mt-1">✓ Using PPCLIENT environment variable</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Client Secret {settings.env_vars_available && <span className="text-green-600">(Using Environment Variable)</span>}
                </label>
                <input
                  type="password"
                  value={settings.client_secret}
                  onChange={(e) => handleChange('client_secret', e.target.value)}
                  placeholder={settings.env_vars_available ? "Environment variable PPSECRET is set" : "Enter your PayPal Client Secret (or set PPSECRET env var)"}
                  disabled={settings.env_vars_available}
                  className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
                    settings.env_vars_available 
                      ? 'border-green-300 bg-green-50 text-green-700 focus:ring-green-500' 
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                />
                {settings.env_vars_available && (
                  <p className="text-xs text-green-600 mt-1">✓ Using PPSECRET environment variable</p>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={testConnection}
                  disabled={testing}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {testing ? 'Testing...' : 'Test Connection'}
                </button>
              </div>
            </div>
          </div>

          {/* Webhook Configuration */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Webhook Configuration</h2>
            <p className="text-sm text-gray-600 mb-4">
              Configure webhooks to receive payment notifications
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Webhook URL
                </label>
                <input
                  type="url"
                  value={settings.webhook_url}
                  onChange={(e) => handleChange('webhook_url', e.target.value)}
                  placeholder="https://yourdomain.com/api/webhooks/paypal"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Webhook ID
                </label>
                <input
                  type="text"
                  value={settings.webhook_id}
                  onChange={(e) => handleChange('webhook_id', e.target.value)}
                  placeholder="Enter webhook ID from PayPal dashboard"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Redirect URLs */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Redirect URLs</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Return URL (Success)
                </label>
                <input
                  type="url"
                  value={settings.return_url}
                  onChange={(e) => handleChange('return_url', e.target.value)}
                  placeholder="https://yourdomain.com/payment/success"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cancel URL (Cancelled)
                </label>
                <input
                  type="url"
                  value={settings.cancel_url}
                  onChange={(e) => handleChange('cancel_url', e.target.value)}
                  placeholder="https://yourdomain.com/payment/cancel"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Payment Settings */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Settings</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tax Rate (%)
                </label>
                <input
                  type="number"
                  step="0.0001"
                  min="0"
                  max="100"
                  value={settings.tax_rate * 100}
                  onChange={(e) => handleChange('tax_rate', parseFloat(e.target.value) / 100)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Processing Fee Rate (%)
                </label>
                <input
                  type="number"
                  step="0.0001"
                  min="0"
                  max="100"
                  value={settings.processing_fee_rate * 100}
                  onChange={(e) => handleChange('processing_fee_rate', parseFloat(e.target.value) / 100)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fixed Processing Fee
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={settings.processing_fee_fixed}
                  onChange={(e) => handleChange('processing_fee_fixed', parseFloat(e.target.value))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Grace Period (Days)
                </label>
                <input
                  type="number"
                  min="0"
                  value={settings.grace_period_days}
                  onChange={(e) => handleChange('grace_period_days', parseInt(e.target.value))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.auto_capture}
                  onChange={(e) => handleChange('auto_capture', e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">
                  Auto-capture payments immediately
                </span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.enable_recurring}
                  onChange={(e) => handleChange('enable_recurring', e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">
                  Enable recurring payments
                </span>
              </label>
            </div>
          </div>

          {/* Email Notifications */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Email Notifications</h2>
            
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.email_notifications}
                  onChange={(e) => handleChange('email_notifications', e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">
                  Enable email notifications
                </span>
              </label>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Admin Email
                </label>
                <input
                  type="email"
                  value={settings.admin_email}
                  onChange={(e) => handleChange('admin_email', e.target.value)}
                  placeholder="admin@yourdomain.com"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Customer Email Template
                </label>
                <textarea
                  value={settings.customer_email_template}
                  onChange={(e) => handleChange('customer_email_template', e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Admin Email Template
                </label>
                <textarea
                  value={settings.admin_email_template}
                  onChange={(e) => handleChange('admin_email_template', e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Use {'{package_name}'} for dynamic content
                </p>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save PayPal Settings'}
            </button>
          </div>
        </form>

        {/* Help Section */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Setup Instructions</h3>
          <div className="text-sm text-blue-800 space-y-2">
            <p><strong>1. Create PayPal App:</strong> Go to PayPal Developer Dashboard and create a new app</p>
            <p><strong>2. Get Credentials:</strong> Copy your Client ID and Client Secret</p>
            <p><strong>3. Set Environment Variables (Recommended):</strong></p>
            <div className="ml-4 bg-blue-100 p-3 rounded">
              <p>Add to your <code>.env.local</code> file:</p>
              <pre className="mt-1 text-xs bg-blue-200 p-2 rounded overflow-x-auto">
{`PPCLIENT=your_paypal_client_id_here
PPSECRET=your_paypal_client_secret_here`}
              </pre>
            </div>
            <p><strong>4. Configure Settings:</strong> Set webhook URL, redirect URLs, and other preferences</p>
            <p><strong>5. Test Connection:</strong> Use the "Test Connection" button to verify your setup</p>
            <p><strong>6. Go Live:</strong> Switch to "Live" environment when ready for production</p>
          </div>
        </div>
      </div>
    </div>
  )
}

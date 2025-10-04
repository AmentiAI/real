# Google Analytics Setup Guide

This guide will help you set up Google Analytics for your admin dashboard.

## 1. Get Your Google Analytics Measurement ID

1. Go to [Google Analytics](https://analytics.google.com)
2. Create a new property or select an existing one
3. Go to **Admin** → **Data Streams** → **Web**
4. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

## 2. Add Environment Variables

Add these variables to your `.env.local` file:

```env
# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
GA_MEASUREMENT_ID=G-XXXXXXXXXX

# For API access (optional - for real-time data)
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Private-Key-Here\n-----END PRIVATE KEY-----"
```

## 3. Google Service Account Setup (Optional)

For real-time analytics data in the admin dashboard:

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable the **Google Analytics Reporting API**
4. Create a **Service Account**:
   - Go to **IAM & Admin** → **Service Accounts**
   - Click **Create Service Account**
   - Name it "Analytics API"
   - Create and download the JSON key file
5. Add the service account email to your Google Analytics property:
   - Go to **Admin** → **Property Access Management**
   - Add the service account email with **Viewer** permissions
6. Extract the email and private key from the JSON file and add to `.env.local`

## 4. Current Features

### ✅ Working Now:
- **Google Analytics Tracking**: Automatically tracks page views and events
- **Demo Analytics Dashboard**: Shows sample data for preview
- **Real-time Integration**: Ready for live data when credentials are added

### 📊 Dashboard Metrics:
- Total Visitors
- Page Views
- Average Session Duration
- Bounce Rate
- Traffic Sources
- Device Types
- Top Countries
- Daily Traffic Chart
- Top Pages

## 5. Testing

1. Visit your website to generate analytics data
2. Check the admin analytics page at `/admin/analytics`
3. Verify data appears in Google Analytics dashboard

## 6. Troubleshooting

- **No data showing**: Check that `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set correctly
- **API errors**: Verify service account credentials are correct
- **Permission errors**: Ensure service account has access to your GA property

## 7. Next Steps

Once set up, you'll see:
- Real-time visitor data
- Page performance metrics
- Traffic source analysis
- Conversion tracking
- Custom event tracking




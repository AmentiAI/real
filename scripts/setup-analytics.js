const fs = require('fs')
const path = require('path')

console.log('🔧 Google Analytics Setup Helper\n')

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local')
const envExists = fs.existsSync(envPath)

if (!envExists) {
  console.log('📝 Creating .env.local file...')
  
  const envContent = `# Database
DATABASE_URL=your_database_url_here

# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN=your_blob_token_here

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Analytics API (for admin dashboard real-time data)
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\nYour-Private-Key-Here\\n-----END PRIVATE KEY-----"

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
`
  
  fs.writeFileSync(envPath, envContent)
  console.log('✅ Created .env.local file')
} else {
  console.log('✅ .env.local file already exists')
}

console.log('\n📋 Next Steps:')
console.log('1. Replace G-XXXXXXXXXX with your actual Google Analytics Measurement ID')
console.log('2. (Optional) Set up Google Service Account for real-time data:')
console.log('   - Go to Google Cloud Console')
console.log('   - Create a service account')
console.log('   - Download the JSON key file')
console.log('   - Add the email and private key to .env.local')
console.log('3. Restart your development server: npm run dev')
console.log('\n🎯 Your analytics dashboard will be available at /admin/analytics')




# Quick Database Setup Guide

## 🚀 Fastest Options to Get Database Running

### Option 1: Install PostgreSQL Locally (Recommended)

#### Windows:
1. **Download PostgreSQL:**
   - Go to: https://www.postgresql.org/download/windows/
   - Download PostgreSQL 15 or 16 installer
   - Run the installer with default settings
   - **Remember the password you set for 'postgres' user**

2. **Verify Installation:**
   ```bash
   # Open Command Prompt or PowerShell
   psql --version
   ```

3. **Start PostgreSQL Service:**
   - Press `Win + R`, type `services.msc`
   - Find "postgresql-x64-15" service
   - Right-click → Start (if not running)

#### macOS:
```bash
# Install via Homebrew
brew install postgresql@15
brew services start postgresql@15

# Or download from: https://postgresapp.com/
```

#### Linux (Ubuntu/Debian):
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### Option 2: Use Docker (Easiest)

If you have Docker installed:

```bash
# Run PostgreSQL in Docker
docker run --name amenti-postgres -e POSTGRES_PASSWORD=admin123 -e POSTGRES_DB=amenti_ai -p 5432:5432 -d postgres:15

# Verify it's running
docker ps
```

### Option 3: Use Cloud Database (No Local Install)

#### Vercel Postgres (Recommended for deployment):
1. Go to https://vercel.com/dashboard
2. Create new project or select existing
3. Go to Storage → Create Database → Postgres
4. Copy connection string

#### Supabase (Free tier available):
1. Go to https://supabase.com
2. Create new project
3. Go to Settings → Database
4. Copy connection string

## 🔧 Database Setup Commands

Once PostgreSQL is running:

### 1. Create Database
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE amenti_ai;

# Exit
\q
```

### 2. Update Environment Variables
Create `.env.local`:
```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/amenti_ai
NEXTAUTH_SECRET=your-secret-key-here-make-it-long-and-random
NEXTAUTH_URL=http://localhost:3000
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token
```

### 3. Initialize Database
```bash
npm run db:init
npm run import:all-pages
npm run setup:admin
```

### 4. Start Development Server
```bash
npm run dev
```

## 🎯 What You'll Get

✅ **Full Database Integration:**
- All 19 pages stored in database
- Complete SEO data for each page
- Admin user authentication
- Content management system
- Image uploads with Vercel Blob
- Real API endpoints

✅ **Admin Panel Features:**
- Create/edit/delete pages
- Manage SEO settings
- Upload and manage images
- Edit website content
- Track analytics
- Manage client projects

## 🚨 Troubleshooting

### Connection Refused:
- Make sure PostgreSQL service is running
- Check if port 5432 is available
- Verify password in DATABASE_URL

### Database Not Found:
- Create database manually: `CREATE DATABASE amenti_ai;`
- Check database name in connection string

### Permission Denied:
- Make sure user has proper permissions
- Check firewall settings

## 📞 Need Help?

Let me know which option you prefer and I'll guide you through the setup step by step!










# Database Setup Guide

## 🚨 Current Issue
Your admin panel is currently using local storage (demo mode) and will reset when you refresh the page. To persist changes, you need to set up a database connection.

## 🎯 Quick Solutions

### Option 1: Use PostgreSQL (Recommended)

#### Step 1: Install PostgreSQL
**Windows:**
1. Download PostgreSQL from: https://www.postgresql.org/download/windows/
2. Install with default settings
3. Remember the password you set for the `postgres` user

**macOS:**
```bash
brew install postgresql
brew services start postgresql
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

#### Step 2: Create Database
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE amenti_ai;

# Create user (optional)
CREATE USER amenti_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE amenti_ai TO amenti_user;

# Exit
\q
```

#### Step 3: Update Environment Variables
Create or update your `.env.local` file:
```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/amenti_ai
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token
```

#### Step 4: Initialize Database
```bash
npm run db:init
npm run import:all-pages
npm run setup:admin
```

### Option 2: Use SQLite (Easier Setup)

#### Step 1: Install SQLite
SQLite is usually pre-installed on most systems.

#### Step 2: Update Database Configuration
Update `lib/db.ts` to use SQLite instead of PostgreSQL:

```typescript
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

const dbPath = './database.sqlite'

export async function openDatabase() {
  return open({
    filename: dbPath,
    driver: sqlite3.Database
  })
}
```

#### Step 3: Update Environment Variables
```env
DATABASE_URL=file:./database.sqlite
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token
```

### Option 3: Use Vercel Postgres (Cloud Database)

#### Step 1: Install Vercel Postgres
```bash
npm install @vercel/postgres
```

#### Step 2: Create Database in Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Create a new project or select existing
3. Go to Storage tab
4. Create a new Postgres database
5. Copy the connection string

#### Step 3: Update Environment Variables
```env
POSTGRES_URL=your-vercel-postgres-url
POSTGRES_PRISMA_URL=your-vercel-postgres-prisma-url
POSTGRES_URL_NON_POOLING=your-vercel-postgres-non-pooling-url
POSTGRES_USER=your-username
POSTGRES_HOST=your-host
POSTGRES_PASSWORD=your-password
POSTGRES_DATABASE=your-database
```

## 🔧 Alternative: Keep Demo Mode (No Database)

If you prefer to keep the demo mode for now, I can modify the admin panel to use browser localStorage instead of session storage, so changes persist between browser sessions.

### Update Admin Panel for Persistent Demo Mode

Would you like me to:
1. **Set up PostgreSQL** (full production setup)
2. **Set up SQLite** (easier local setup)
3. **Set up Vercel Postgres** (cloud database)
4. **Modify demo mode** to use localStorage (persists between sessions)

## 📊 Database Schema

Your database will include these tables:
- `users` - Admin users
- `pages` - Website pages with SEO data
- `website_content` - Content sections
- `branding_settings` - Brand settings
- `services` - Service offerings
- `projects` - Client projects
- `inquiries` - Contact form submissions
- `blog_posts` - Blog articles
- `seo_data` - SEO metadata

## 🚀 Quick Start Commands

Once database is set up:
```bash
# Initialize database schema
npm run db:init

# Import all existing pages
npm run import:all-pages

# Set up admin user
npm run setup:admin

# Start development server
npm run dev
```

## 🔍 Troubleshooting

### Connection Refused Error
- Make sure PostgreSQL is running
- Check if port 5432 is available
- Verify database credentials

### Permission Denied
- Make sure database user has proper permissions
- Check firewall settings

### Database Not Found
- Create the database manually
- Check database name in connection string

## 📞 Need Help?

Let me know which option you'd prefer and I'll help you set it up step by step!










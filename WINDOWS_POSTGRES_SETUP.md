# Windows PostgreSQL Setup - Fastest Method

## 🚀 Quick Setup (5 minutes)

### Option 1: Download and Install PostgreSQL (Recommended)

1. **Download PostgreSQL:**
   - Go to: https://www.postgresql.org/download/windows/
   - Click "Download the installer"
   - Download PostgreSQL 15 or 16 (latest stable)

2. **Install PostgreSQL:**
   - Run the downloaded `.exe` file
   - **IMPORTANT:** During installation, you'll be asked to set a password for the `postgres` user
   - **Remember this password!** You'll need it for your DATABASE_URL
   - Use default settings for everything else
   - Make sure "Add PostgreSQL to PATH" is checked

3. **Verify Installation:**
   - Open Command Prompt or PowerShell
   - Run: `psql --version`
   - You should see something like: `psql (PostgreSQL) 15.4`

4. **Start PostgreSQL Service:**
   - Press `Win + R`, type `services.msc`, press Enter
   - Find "postgresql-x64-15" (or similar)
   - Right-click → Start (if not already running)

### Option 2: Use Chocolatey (If you have it)

```powershell
# Install PostgreSQL via Chocolatey
choco install postgresql

# Start the service
net start postgresql-x64-15
```

### Option 3: Use Scoop (If you have it)

```powershell
# Install PostgreSQL via Scoop
scoop install postgresql

# Start the service
net start postgresql
```

## 🔧 Database Configuration

### 1. Create Database
Open Command Prompt or PowerShell and run:

```bash
# Connect to PostgreSQL
psql -U postgres

# Create your database
CREATE DATABASE amenti_ai;

# Exit PostgreSQL
\q
```

### 2. Update Environment Variables
Create `.env.local` in your project root:

```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/amenti_ai
NEXTAUTH_SECRET=your-super-secret-key-here-make-it-long-and-random
NEXTAUTH_URL=http://localhost:3000
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token
```

**Replace `YOUR_PASSWORD` with the password you set during PostgreSQL installation.**

### 3. Test Database Connection
```bash
npm run db:init
```

If successful, you'll see: `✅ Database initialized successfully!`

## 🎯 Complete Setup Commands

Once PostgreSQL is running:

```bash
# 1. Initialize database schema
npm run db:init

# 2. Import all your pages
npm run import:all-pages

# 3. Set up admin user
npm run setup:admin

# 4. Start development server
npm run dev
```

## 🚨 Troubleshooting

### "psql is not recognized"
- PostgreSQL wasn't added to PATH
- Restart your command prompt
- Or use full path: `C:\Program Files\PostgreSQL\15\bin\psql.exe`

### "Connection refused"
- PostgreSQL service isn't running
- Go to Services (`services.msc`) and start postgresql service
- Or run: `net start postgresql-x64-15`

### "Authentication failed"
- Wrong password in DATABASE_URL
- Check the password you set during installation

### "Database does not exist"
- Run: `psql -U postgres -c "CREATE DATABASE amenti_ai;"`

## 🎉 What You'll Get

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

## 📞 Need Help?

If you run into any issues, let me know and I'll help you troubleshoot step by step!










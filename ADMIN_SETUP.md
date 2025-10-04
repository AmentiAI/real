# 🎛️ Complete Admin Panel Setup Guide

Your website now has a **comprehensive admin panel** that allows you to manage everything! Here's what you can do:

## 🚀 **What's New - Complete Website Management System**

### ✅ **Image Management with Vercel Blob**
- Upload and manage all website images
- Automatic storage in Vercel Blob (cloud storage)
- Optimized image handling with previews
- Organized by folders (content, pages, branding, etc.)

### ✅ **Content Manager**
- Edit all website sections (Hero, Services, Portfolio, etc.)
- Add/remove/edit content blocks
- Upload images for each section
- Toggle content visibility on/off
- Drag-and-drop ordering

### ✅ **Page Manager**
- Create unlimited new pages
- Edit existing pages with HTML content
- SEO optimization (meta titles, descriptions, keywords)
- Featured images for pages
- Publish/unpublish pages
- Custom URL slugs

### ✅ **Branding Manager**
- Upload your logo (light/dark versions)
- Set your brand colors (primary, secondary, accent)
- Choose fonts
- Update company information
- Manage social media links
- Set contact details

### ✅ **Complete CRUD Operations**
- **Create** - Add new content, pages, images
- **Read** - View all content and settings
- **Update** - Edit everything
- **Delete** - Remove content safely

## 📋 **Setup Instructions**

### 1. **Environment Variables**
Add to your `.env.local`:

```env
# Database
DATABASE_URL="your_postgresql_connection_string"

# Vercel Blob (for image storage)
BLOB_READ_WRITE_TOKEN="your_vercel_blob_token"

# NextAuth (for admin login)
NEXTAUTH_SECRET="your_secret_key"
NEXTAUTH_URL="http://localhost:3000"
```

### 2. **Get Vercel Blob Token**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to your project
3. Go to Settings → Environment Variables
4. Add `BLOB_READ_WRITE_TOKEN` with your blob token

### 3. **Database Setup**
```bash
# Complete admin setup (creates tables, imports existing pages and content)
npm run setup:complete-admin

# Create admin user
npm run create:admin
```

**OR run individually:**
```bash
# Initialize database
npm run db:init

# Update database with new tables
npm run db:update

# Import existing pages
npm run import:pages

# Import existing content
npm run import:content

# Create admin user
npm run create:admin
```

### 4. **Start Development Server**
```bash
npm run dev
```

## 🎯 **How to Access Admin Panel**

1. **Go to:** `http://localhost:3000/admin/login`
2. **Login with:**
   - Email: `admin@amentiai.com`
   - Password: `admin123`

## 🎛️ **Admin Panel Features**

### **Dashboard** (`/admin`)
- Overview of all website activity
- Quick stats and metrics
- Recent content updates

### **Content Manager** (`/admin/content`)
- **Hero Section** - Edit main banner, headline, CTA buttons
- **Services** - Manage service descriptions and images
- **Portfolio** - Update case studies and project showcases
- **Testimonials** - Add/edit customer reviews
- **About** - Company information and team details
- **Contact** - Contact form and business information
- **Footer** - Footer links and information

### **Page Manager** (`/admin/pages`)
- Create unlimited new pages
- Edit existing pages with HTML editor
- Set SEO meta tags
- Upload featured images
- Publish/unpublish pages
- Custom URL slugs

### **Branding Manager** (`/admin/branding`)
- Upload logos (light/dark versions)
- Set brand colors with color picker
- Choose typography
- Update company details
- Manage social media links
- Set contact information

### **Projects** (`/admin/projects`)
- Manage client projects
- Track project progress
- Upload project images

### **Clients** (`/admin/clients`)
- Manage client information
- Track client communications
- Store client documents

### **Inquiries** (`/admin/inquiries`)
- View contact form submissions
- Manage lead inquiries
- Track inquiry status

### **Analytics** (`/admin/analytics`)
- Website performance metrics
- Traffic statistics
- Conversion tracking

### **Settings** (`/admin/settings`)
- Website configuration
- Email settings
- API keys management

## 🖼️ **Image Upload Features**

### **Supported Formats:**
- PNG, JPG, GIF
- Up to 5MB per image
- Automatic optimization

### **Storage Organization:**
- `/branding/` - Logos, favicons
- `/content/hero/` - Hero section images
- `/content/services/` - Service images
- `/content/portfolio/` - Portfolio images
- `/pages/` - Page featured images
- `/projects/` - Project images

### **Image Management:**
- Drag-and-drop upload
- Preview before saving
- Replace existing images
- Delete unused images
- Automatic resizing

## 🎨 **Branding Customization**

### **Logo Management:**
- Upload light version (for dark backgrounds)
- Upload dark version (for light backgrounds)
- Favicon for browser tabs
- Automatic optimization

### **Color Scheme:**
- Primary color picker
- Secondary color picker
- Accent color picker
- Live preview of changes
- Hex color code support

### **Typography:**
- Choose from popular fonts
- Live preview of font changes
- Consistent across all pages

### **Company Information:**
- Company name and tagline
- Contact email and phone
- Business address
- Social media links

## 📄 **Page Creation Features**

### **HTML Editor:**
- Full HTML content editor
- Syntax highlighting
- Auto-save functionality
- Preview mode

### **SEO Optimization:**
- Meta title optimization
- Meta description writing
- Keywords management
- URL slug customization

### **Page Management:**
- Draft/published status
- Featured image upload
- Page description
- Creation/modification dates

## 🔧 **Technical Features**

### **Database Integration:**
- PostgreSQL database
- Automatic schema updates
- Data backup and restore
- Query optimization

### **Image Storage:**
- Vercel Blob integration
- CDN delivery
- Automatic optimization
- Secure uploads

### **Authentication:**
- Secure admin login
- Session management
- Role-based access
- Password protection

### **API Endpoints:**
- RESTful API design
- CRUD operations
- Error handling
- Data validation

## 🚀 **Ready to Use!**

Your admin panel is now **fully functional** with:

✅ **Complete website management**  
✅ **Image upload and storage**  
✅ **Content editing system**  
✅ **Page creation tools**  
✅ **Branding customization**  
✅ **SEO management**  
✅ **User authentication**  
✅ **Database integration**  

**You can now:**
- Upload your logo and brand assets
- Edit all website content
- Create new pages
- Manage images and media
- Customize colors and fonts
- Update company information
- Track inquiries and leads

## 🎯 **Next Steps**

1. **Upload your branding** - Add your logo, set brand colors
2. **Customize content** - Edit hero section, services, about page
3. **Create pages** - Add any additional pages you need
4. **Upload images** - Add photos to showcase your work
5. **Test everything** - Make sure all features work as expected

**Your website is now a complete, professional digital marketing agency with full admin control!** 🚀

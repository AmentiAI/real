# Amenti AI - Professional Internet Marketing & SEO Website

A modern, database-driven website for Amenti AI Internet Marketing/SEO Company built with Next.js 14, TypeScript, and PostgreSQL.

## Features

- **Professional Homepage**: Modern, responsive design with hero section, services, portfolio, and contact form
- **Admin Dashboard**: Complete client and inquiry management system
- **Database-Driven**: All content stored in PostgreSQL database (no hardcoded content)
- **SEO Optimized**: Built with SEO best practices and dynamic meta tags
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Contact Management**: Lead capture and inquiry tracking system
- **Client Management**: Full CRUD operations for business clients
- **Portfolio System**: Dynamic project showcase with results tracking

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Database**: PostgreSQL (Neon)
- **Authentication**: NextAuth.js (ready for implementation)
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Notifications**: React Hot Toast

## Database Schema

The application uses a comprehensive PostgreSQL schema with the following main tables:

- **users**: Admin user management
- **clients**: Business client information
- **services**: Service offerings and pricing
- **projects**: Portfolio projects and case studies
- **inquiries**: Contact form submissions
- **content**: Dynamic page content management
- **blog_posts**: Blog content management
- **seo_data**: SEO metadata for pages

## Setup Instructions

### Prerequisites

- Node.js 18+ 
- PostgreSQL database (Neon account recommended)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd amenti-ai-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   DATABASE_URL=postgresql://neondb_owner:npg_jzymWCDE7IF4@ep-calm-field-adqp91o1-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
   NEXTAUTH_SECRET=your-secret-key-here
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Initialize Database**
   ```bash
   node scripts/init-db.js
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

6. **Access the Application**
   - Website: http://localhost:3000
   - Admin Dashboard: http://localhost:3000/admin

## Project Structure

```
├── app/                    # Next.js 14 app directory
│   ├── admin/             # Admin dashboard pages
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── Navigation.tsx     # Main navigation
│   ├── Hero.tsx          # Hero section
│   ├── Services.tsx      # Services section
│   ├── Portfolio.tsx     # Portfolio section
│   └── ContactForm.tsx   # Contact form
├── lib/                  # Utility libraries
│   └── db.ts             # Database connection
├── scripts/              # Database scripts
│   └── init-db.js        # Database initialization
└── public/               # Static assets
```

## Admin Dashboard Features

### Dashboard Overview
- Real-time statistics and metrics
- Recent activity feed
- Quick action buttons
- Revenue and performance charts

### Client Management
- Add, edit, and delete clients
- Search and filter functionality
- Client status tracking
- Contact information management

### Inquiry Management
- View all contact form submissions
- Status tracking (new, contacted, qualified, closed)
- Detailed inquiry information
- Response and follow-up tools

### Content Management
- Dynamic page content editing
- SEO metadata management
- Service offerings management
- Portfolio project management

## API Endpoints

### Public APIs
- `POST /api/contact` - Submit contact form
- `GET /api/services` - Get services list
- `GET /api/projects` - Get portfolio projects
- `GET /api/content` - Get page content

### Admin APIs
- `GET /api/admin/dashboard-stats` - Dashboard statistics
- `GET /api/admin/clients` - Get clients list
- `POST /api/admin/clients` - Create new client
- `GET /api/admin/inquiries` - Get inquiries list
- `PUT /api/admin/inquiries` - Update inquiry status

## Customization

### Adding New Services
1. Access the admin dashboard
2. Navigate to Services section
3. Add new service with title, description, price, and features

### Managing Portfolio
1. Go to Projects section in admin
2. Add new projects with client information
3. Include results and metrics
4. Set featured status for homepage display

### Content Management
1. Use the Content section in admin
2. Edit page sections dynamically
3. Update SEO metadata
4. Manage service descriptions

## SEO Features

- Dynamic meta tags for all pages
- Open Graph and Twitter Card support
- Structured data markup
- Sitemap generation
- Robot.txt configuration
- Fast loading and Core Web Vitals optimization

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
The application can be deployed to any platform supporting Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Support

For technical support or customization requests, contact:
- Email: support@amentiai.com
- Phone: (401) 555-0123

## License

This project is proprietary software developed for Amenti AI Internet Marketing Company.

---

**Built with ❤️ by Amenti AI Development Team**


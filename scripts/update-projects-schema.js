const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_jzymWCDE7IF4@ep-calm-field-adqp91o1-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: {
    rejectUnauthorized: false
  }
});

async function updateProjectsSchema() {
  const client = await pool.connect();
  
  try {
    console.log('Updating projects table schema...');

    // Add new columns to projects table
    await client.query(`
      ALTER TABLE projects 
      ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'active',
      ADD COLUMN IF NOT EXISTS budget DECIMAL(12,2) DEFAULT 0,
      ADD COLUMN IF NOT EXISTS start_date DATE,
      ADD COLUMN IF NOT EXISTS end_date DATE,
      ADD COLUMN IF NOT EXISTS progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
      ADD COLUMN IF NOT EXISTS priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent'))
    `);

    // Create project_team table for team assignments
    await client.query(`
      CREATE TABLE IF NOT EXISTS project_team (
        id SERIAL PRIMARY KEY,
        project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        role VARCHAR(100) NOT NULL,
        assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(project_id, user_id)
      )
    `);

    // Create project_documents table
    await client.query(`
      CREATE TABLE IF NOT EXISTS project_documents (
        id SERIAL PRIMARY KEY,
        project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        file_path VARCHAR(500) NOT NULL,
        file_type VARCHAR(50),
        file_size BIGINT,
        category VARCHAR(100) DEFAULT 'general',
        description TEXT,
        uploaded_by INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create project_communications table
    await client.query(`
      CREATE TABLE IF NOT EXISTS project_communications (
        id SERIAL PRIMARY KEY,
        project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
        type VARCHAR(50) NOT NULL CHECK (type IN ('email', 'call', 'meeting', 'note', 'update')),
        subject VARCHAR(255),
        content TEXT NOT NULL,
        created_by INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create project_milestones table
    await client.query(`
      CREATE TABLE IF NOT EXISTS project_milestones (
        id SERIAL PRIMARY KEY,
        project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        due_date DATE,
        completed_at TIMESTAMP,
        status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create project_templates table
    await client.query(`
      CREATE TABLE IF NOT EXISTS project_templates (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        services_used JSONB DEFAULT '[]',
        default_budget DECIMAL(12,2) DEFAULT 0,
        default_duration_days INTEGER DEFAULT 30,
        milestones JSONB DEFAULT '[]',
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert some default project templates
    await client.query(`
      INSERT INTO project_templates (name, description, services_used, default_budget, default_duration_days, milestones) VALUES
      ('Website Design & Development', 'Complete website design and development project', '["website-design", "seo-services"]', 5000, 30, '[
        {"title": "Discovery & Planning", "description": "Client consultation and project planning", "due_days": 5},
        {"title": "Design Phase", "description": "Create wireframes and design mockups", "due_days": 10},
        {"title": "Development", "description": "Build and develop the website", "due_days": 20},
        {"title": "Testing & Launch", "description": "Final testing and website launch", "due_days": 30}
      ]'),
      ('SEO Campaign', 'Comprehensive SEO optimization campaign', '["seo-services", "content-marketing"]', 3000, 90, '[
        {"title": "SEO Audit", "description": "Complete website SEO analysis", "due_days": 7},
        {"title": "Keyword Research", "description": "Research and target keyword strategy", "due_days": 14},
        {"title": "Content Optimization", "description": "Optimize existing content and create new content", "due_days": 45},
        {"title": "Link Building", "description": "Build quality backlinks and improve domain authority", "due_days": 75},
        {"title": "Monitoring & Reporting", "description": "Track progress and provide monthly reports", "due_days": 90}
      ]'),
      ('Complete Growth Package', 'Full-service digital marketing package', '["complete-growth-packages", "seo-services", "paid-ads-social", "content-marketing"]', 10000, 120, '[
        {"title": "Strategy Development", "description": "Develop comprehensive marketing strategy", "due_days": 14},
        {"title": "Website Optimization", "description": "Optimize website for conversions and SEO", "due_days": 30},
        {"title": "Content Creation", "description": "Create engaging content and blog posts", "due_days": 60},
        {"title": "Paid Advertising", "description": "Launch and optimize paid ad campaigns", "due_days": 90},
        {"title": "Growth Analysis", "description": "Analyze results and optimize for growth", "due_days": 120}
      ]')
      ON CONFLICT DO NOTHING
    `);

    console.log('Projects schema updated successfully!');
  } catch (error) {
    console.error('Error updating projects schema:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

updateProjectsSchema();

const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_jzymWCDE7IF4@ep-calm-field-adqp91o1-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: {
    rejectUnauthorized: false
  }
});

async function createAdminUser() {
  const client = await pool.connect();
  
  try {
    console.log('Creating admin user...');
    
    // Get admin credentials from command line or use defaults
    const email = process.argv[2] || 'admin@amentiai.com';
    const password = process.argv[3] || 'admin123';
    const name = process.argv[4] || 'Admin User';
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Insert admin user
    await client.query(
      'INSERT INTO users (email, password, name, role) VALUES ($1, $2, $3, $4) ON CONFLICT (email) DO UPDATE SET password = $2, name = $3',
      [email, hashedPassword, name, 'admin']
    );
    
    console.log(`✅ Admin user created successfully!`);
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log(`Name: ${name}`);
    console.log(`\n🔐 You can now login to /admin with these credentials`);
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

createAdminUser();










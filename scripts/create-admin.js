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

    // Check if admin user already exists
    const existingUser = await client.query('SELECT * FROM users WHERE email = $1', ['admin@amentiai.com']);
    
    if (existingUser.rows.length > 0) {
      console.log('Admin user already exists!');
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('admin123', 12);

    // Create admin user
    const result = await client.query(
      `INSERT INTO users (email, password, name, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      ['admin@amentiai.com', hashedPassword, 'Admin User', 'admin']
    );

    const userId = result.rows[0].id;

    console.log('Admin user created successfully!');
    console.log('Email: admin@amentiai.com');
    console.log('Password: admin123');
    console.log('User ID:', userId);
    
  } catch (error) {
    console.error('Error creating admin user:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Run the script
createAdminUser()
  .then(() => {
    console.log('Admin user setup complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Admin user setup failed:', error);
    process.exit(1);
  });


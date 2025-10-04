const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_jzymWCDE7IF4@ep-calm-field-adqp91o1-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: {
    rejectUnauthorized: false
  }
});

async function checkAndCreateAdminUser() {
  const client = await pool.connect();
  
  try {
    console.log('Checking for admin user...');

    // Check if any users exist
    const userCountResult = await client.query('SELECT COUNT(*) as count FROM users');
    const userCount = parseInt(userCountResult.rows[0].count);

    console.log(`Found ${userCount} users in database`);

    if (userCount === 0) {
      console.log('No users found. Creating default admin user...');
      
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      await client.query(`
        INSERT INTO users (name, email, password, role) 
        VALUES ($1, $2, $3, $4)
      `, ['Admin User', 'admin@amentiai.com', hashedPassword, 'admin']);

      console.log('✅ Default admin user created!');
      console.log('Email: admin@amentiai.com');
      console.log('Password: admin123');
    } else {
      // List existing users
      const usersResult = await client.query('SELECT id, name, email, role FROM users');
      console.log('Existing users:');
      usersResult.rows.forEach(user => {
        console.log(`- ${user.name} (${user.email}) - ${user.role}`);
      });
    }
  } catch (error) {
    console.error('Error checking admin user:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

checkAndCreateAdminUser();

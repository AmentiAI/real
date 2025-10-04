const fetch = require('node-fetch');

async function testPackagesAPI() {
  try {
    console.log('Testing packages API...\n');
    
    const response = await fetch('http://localhost:3002/api/packages');
    const data = await response.json();
    
    console.log('API Response:', JSON.stringify(data, null, 2));
    
    if (data.success && data.data) {
      console.log(`\nFound ${data.data.length} packages:`);
      data.data.forEach((pkg, index) => {
        console.log(`${index + 1}. ${pkg.name} - $${pkg.price}/${pkg.billing_period} (Popular: ${pkg.is_popular})`);
      });
    } else {
      console.log('No packages found or API error');
    }
    
  } catch (error) {
    console.error('Error testing API:', error.message);
  }
}

testPackagesAPI();



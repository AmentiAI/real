const fetch = require('node-fetch').default;

async function testClientLogin() {
  try {
    console.log('Testing client login...');
    
    // Test login with test client
    const response = await fetch('http://localhost:3001/api/clients/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'john@example.com',
        password: 'password123'
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Login successful!');
      console.log('Client ID:', data.client.id);
      console.log('Client Name:', data.client.name);
      console.log('Token (first 20 chars):', data.token.substring(0, 20) + '...');
      
      // Now test fetching messages
      console.log('\nTesting message fetch...');
      const messagesResponse = await fetch('http://localhost:3001/api/clients/messages', {
        headers: {
          'Authorization': `Bearer ${data.token}`
        }
      });
      
      if (messagesResponse.ok) {
        const messages = await messagesResponse.json();
        console.log('✅ Messages fetched successfully!');
        console.log('Number of messages:', messages.length);
        messages.forEach((msg, index) => {
          console.log(`Message ${index + 1}: ${msg.subject} (${msg.sender_type})`);
        });
      } else {
        const errorData = await messagesResponse.json();
        console.log('❌ Message fetch failed:', errorData);
      }
      
    } else {
      console.log('❌ Login failed:', data.error);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testClientLogin();

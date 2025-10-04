const jwt = require('jsonwebtoken');

// Generate a test JWT token for client ID 2
const token = jwt.sign(
  { 
    clientId: 2, 
    email: 'test@example.com',
    type: 'client'
  },
  process.env.JWT_SECRET || 'fallback-secret',
  { expiresIn: '7d' }
);

console.log('Generated JWT token for client ID 2:');
console.log(token);
console.log('\nYou can use this token to test the client messages API.');
console.log('Test with: curl -H "Authorization: Bearer ' + token + '" http://localhost:3001/api/clients/messages');



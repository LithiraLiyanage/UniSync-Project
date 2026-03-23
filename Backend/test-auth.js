async function testAuth() {
  const SERVER_URL = 'http://localhost:5000/api/auth';
  
  console.log('--- Testing Registration ---');
  let registerRes = await fetch(`${SERVER_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Test Student',
      email: `test_${Date.now()}@example.com`,
      password: 'password123',
      role: 'student'
    })
  });
  let registerData = await registerRes.json();
  console.log('Register Response:', registerData);
  
  if (!registerData.success) {
    console.error('Registration failed.');
    return;
  }
  
  const token = registerData.token;
  console.log('--- Testing Profile ---');
  let profileRes = await fetch(`${SERVER_URL}/profile`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  let profileData = await profileRes.json();
  console.log('Profile Response:', profileData);
  
  console.log('--- Testing Login ---');
  let loginRes = await fetch(`${SERVER_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: registerData.user.email,
      password: 'password123',
      role: 'student'
    })
  });
  let loginData = await loginRes.json();
  console.log('Login Response:', loginData);
}

testAuth().catch(console.error);

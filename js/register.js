document.getElementById('registerForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const confirmPassword = document.getElementById('confirmPassword').value.trim();
  const role = document.getElementById('role').value.trim();
  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  const newUser = {
    id: Date.now(),
    name: username,
    email: email,
    password: password,
    role: role,
    status: 'pending',
  };

  fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser),
  })
    .then(response => response.json())
    .then(() => {
      alert('Registration successful!');
      window.location.href = '../html/login.html';
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Registration failed! Please try again.');
    });
});

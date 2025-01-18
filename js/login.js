document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault();

  // Fix the ID used to fetch the email input field
  const email = document.getElementById('email').value.trim(); 
  const password = document.getElementById('password').value.trim();
  // const role = document.getElementById('role').value.trim();
  fetch('http://localhost:3000/users') // Adjust the URL if needed
    .then(response => response.json())
    .then(users => {
      // Find the user by email and password
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        alert('Login successful!');
        
        // Save user data to sessionStorage and localStorage
        sessionStorage.setItem('userId', user.id);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', user.name);
        localStorage.setItem('userRole', user.role);
        localStorage.setItem('userStatus', user.status);

        // Redirect based on role
        if (user.role === 'admin') {
          window.location.href = '../html/admin.html';
        } else if (user.role === 'customer') {
          window.location.href = './index.html';
        } else if (user.role === 'seller') {
          window.location.href = '../html/seller.html';
        } else {
          alert('Role not recognized!');
        }
      } else {
        alert('Invalid email or password.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Login failed! Please try again.');
    });
});

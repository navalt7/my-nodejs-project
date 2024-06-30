if (document.getElementById('loginForm')) {
  document.getElementById('loginForm').addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const instagramAccount = document.getElementById('instagramAccount').value;
      const password = document.getElementById('password').value;
  
      try {
          const response = await fetch('/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ instagramAccount, password }),
          });
  
          if (response.ok) {
              const data = await response.json();
              if (data.success) {
                  localStorage.setItem('username', instagramAccount);
                  document.cookie = 'session=authenticated'; // Set cookie to indicate authentication
                  window.location.href = "links.html";
              } else {
                  alert(data.message);
              }
          } else {
              throw new Error('Login failed');
          }
      } catch (error) {
          console.error('Error:', error);
          alert('Login failed. Please try again.');
      }
  });
} else {
  console.warn('loginForm element not found yet. Waiting for it to load...');
}

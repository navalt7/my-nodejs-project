document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault();

    console.log('Form submitted'); // Log when form is submitted

    const submitButton = event.target.querySelector('button[type="submit"]');
    submitButton.disabled = true; // Disable the button to prevent multiple submissions

    const instagramAccount = document.getElementById('instagramAccount').value;
    const password = document.getElementById('password').value;

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ instagramAccount, password }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Server response:', data); // Debugging
        alert(data.message);
        if (data.success) {
            window.location.href = data.redirectTo || "login.html"; // Redirect on success
        }
        submitButton.disabled = false; // Re-enable the button
    })
    .catch(error => {
        console.error('Error:', error);
        submitButton.disabled = false; // Re-enable the button in case of error
    });
});

require('dotenv').config();

const express = require('express');
const userRoutes = require('./routes/users');
const app = express();

app.use('/users', userRoutes);


// Add this inside the DOMContentLoaded event listener where the loginForm is defined
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        
        fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                alert('Login successful!');
                // Redirect to the homepage or dashboard
            } else {
                alert('Login failed: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
}

// Add this inside the DOMContentLoaded event listener where the registerForm is defined
if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;

        fetch('http://localhost:3000/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.username) {
                alert('Registration successful!');
                // You may want to automatically log the user in or redirect them to the login page
            } else {
                alert('Registration failed: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
}

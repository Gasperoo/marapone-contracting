// Login/Sign Up page functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize account dropdown if on login page
    if (typeof initAccountDropdown === 'function') {
        initAccountDropdown();
        updateAccountDropdown();
    }
    
    // Initialize cart dropdown if on login page
    if (typeof initCartDropdown === 'function') {
        initCartDropdown();
    }
    
    // Initialize login and signup forms
    initLoginForm();
    initSignupForm();
});

// Initialize login form
function initLoginForm() {
    const loginForm = document.getElementById('login-form');
    const loginEmail = document.getElementById('login-email');
    const loginPassword = document.getElementById('login-password');
    
    if (!loginForm) return;
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = loginEmail?.value.trim();
        const password = loginPassword?.value;
        
        // Basic validation
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Please enter a valid email address.');
            loginEmail?.focus();
            return;
        }
        
        if (!password || password.length < 6) {
            alert('Please enter a valid password (at least 6 characters).');
            loginPassword?.focus();
            return;
        }
        
        // Process login
        processLogin(email, password);
    });
}

// Initialize signup form
function initSignupForm() {
    const signupForm = document.getElementById('signup-form');
    const signupName = document.getElementById('signup-name');
    const signupUsername = document.getElementById('signup-username');
    const signupEmail = document.getElementById('signup-email');
    const signupPassword = document.getElementById('signup-password');
    
    if (!signupForm) return;
    
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = signupName?.value.trim();
        const username = signupUsername?.value.trim();
        const email = signupEmail?.value.trim();
        const password = signupPassword?.value;
        
        // Basic validation
        if (!name || name.length < 2) {
            alert('Please enter your full name.');
            signupName?.focus();
            return;
        }
        
        if (!username || username.length < 3) {
            alert('Please enter a username (at least 3 characters).');
            signupUsername?.focus();
            return;
        }
        
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Please enter a valid email address.');
            signupEmail?.focus();
            return;
        }
        
        if (!password || password.length < 6) {
            alert('Please enter a password (at least 6 characters).');
            signupPassword?.focus();
            return;
        }
        
        // Process signup
        processSignup(name, username, email, password);
    });
}

// Process login
function processLogin(email, password) {
    const loginButton = document.querySelector('.login-button');
    
    if (loginButton) {
        loginButton.disabled = true;
        loginButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
    }
    
    // Simulate login processing
    // In production, this would make an API call to your backend
    setTimeout(() => {
        // Store login state
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        
        // Update global login state if available
        if (typeof window !== 'undefined' && window.isLoggedIn !== undefined) {
            window.isLoggedIn = true;
        }
        
        alert('Login successful! Welcome back.');
        
        // Redirect to home page
        window.location.href = 'index.html';
    }, 1500);
}

// Process signup
function processSignup(name, username, email, password) {
    const signupButton = document.querySelector('.signup-button');
    
    if (signupButton) {
        signupButton.disabled = true;
        signupButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';
    }
    
    // Simulate signup processing
    // In production, this would make an API call to your backend
    setTimeout(() => {
        // Store user data
        const userData = {
            name: name,
            username: username,
            email: email,
            createdAt: new Date().toISOString()
        };
        
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        
        // Update global login state if available
        if (typeof window !== 'undefined' && window.isLoggedIn !== undefined) {
            window.isLoggedIn = true;
        }
        
        alert('Account created successfully! Welcome, ' + name + '!');
        
        // Redirect to home page
        window.location.href = 'index.html';
    }, 1500);
}


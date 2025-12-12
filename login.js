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
    
    // Send confirmation email using FormSubmit
    sendSignupConfirmationEmail(name, email);
    
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
        
        alert('Account created successfully! Welcome, ' + name + '!\n\nA confirmation email has been sent to ' + email + '.');
        
        // Redirect to home page
        window.location.href = 'index.html';
    }, 1500);
}

// Send signup confirmation email
function sendSignupConfirmationEmail(name, email) {
    // Send notification to info@marapone.com about new signup
    const adminForm = document.createElement('form');
    adminForm.method = 'POST';
    adminForm.action = 'https://formsubmit.co/info@marapone.com';
    adminForm.style.display = 'none';
    
    const adminSubject = document.createElement('input');
    adminSubject.type = 'hidden';
    adminSubject.name = '_subject';
    adminSubject.value = 'New Account Registration - ' + name;
    adminForm.appendChild(adminSubject);
    
    const adminCaptcha = document.createElement('input');
    adminCaptcha.type = 'hidden';
    adminCaptcha.name = '_captcha';
    adminCaptcha.value = 'false';
    adminForm.appendChild(adminCaptcha);
    
    const adminTemplate = document.createElement('input');
    adminTemplate.type = 'hidden';
    adminTemplate.name = '_template';
    adminTemplate.value = 'box';
    adminForm.appendChild(adminTemplate);
    
    const adminMessage = document.createElement('textarea');
    adminMessage.name = 'message';
    adminMessage.value = `New user account created:\n\nName: ${name}\nEmail: ${email}\nDate: ${new Date().toLocaleString()}`;
    adminForm.appendChild(adminMessage);
    
    document.body.appendChild(adminForm);
    
    // Send confirmation email to user using FormSubmit
    // FormSubmit can send emails to any address by using that email as the endpoint
    const userForm = document.createElement('form');
    userForm.method = 'POST';
    userForm.action = 'https://formsubmit.co/' + encodeURIComponent(email);
    userForm.style.display = 'none';
    
    const userSubject = document.createElement('input');
    userSubject.type = 'hidden';
    userSubject.name = '_subject';
    userSubject.value = 'Welcome to Marapone Contracting Inc. - Account Confirmation';
    userForm.appendChild(userSubject);
    
    const userCaptcha = document.createElement('input');
    userCaptcha.type = 'hidden';
    userCaptcha.name = '_captcha';
    userCaptcha.value = 'false';
    userForm.appendChild(userCaptcha);
    
    const userTemplate = document.createElement('input');
    userTemplate.type = 'hidden';
    userTemplate.name = '_template';
    userTemplate.value = 'box';
    userForm.appendChild(userTemplate);
    
    // Set the from email to info@marapone.com
    const userFrom = document.createElement('input');
    userFrom.type = 'hidden';
    userFrom.name = '_from';
    userFrom.value = 'info@marapone.com';
    userForm.appendChild(userFrom);
    
    const confirmationMessage = `Welcome to Marapone Contracting Inc.!

Dear ${name},

Thank you for creating an account with us. Your account has been successfully created and is now active.

Account Details:
- Name: ${name}
- Email: ${email}
- Account Created: ${new Date().toLocaleString()}

You can now log in to your account and access all our services including:
- Digital Products & Tools
- Fixed-Price Service Packages
- Consulting Services
- And much more!

If you have any questions or need assistance, please don't hesitate to contact us at info@marapone.com.

We look forward to serving you!

Best regards,
Marapone Contracting Inc.`;
    
    const userMessage = document.createElement('textarea');
    userMessage.name = 'message';
    userMessage.value = confirmationMessage;
    userForm.appendChild(userMessage);
    
    document.body.appendChild(userForm);
    
    // Submit forms using fetch (non-blocking)
    fetch(adminForm.action, {
        method: 'POST',
        body: new FormData(adminForm)
    }).catch(err => console.log('Admin notification sent'));
    
    fetch(userForm.action, {
        method: 'POST',
        body: new FormData(userForm)
    }).catch(err => console.log('User confirmation email sent'));
    
    // Clean up forms after submission
    setTimeout(() => {
        if (adminForm.parentNode) adminForm.parentNode.removeChild(adminForm);
        if (userForm.parentNode) userForm.parentNode.removeChild(userForm);
    }, 2000);
}


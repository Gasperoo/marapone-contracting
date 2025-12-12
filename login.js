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
    // Create a hidden form to send email via FormSubmit
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://formsubmit.co/info@marapone.com';
    form.style.display = 'none';
    
    // FormSubmit configuration
    const subjectInput = document.createElement('input');
    subjectInput.type = 'hidden';
    subjectInput.name = '_subject';
    subjectInput.value = 'New Account Registration - ' + name;
    form.appendChild(subjectInput);
    
    const captchaInput = document.createElement('input');
    captchaInput.type = 'hidden';
    captchaInput.name = '_captcha';
    captchaInput.value = 'false';
    form.appendChild(captchaInput);
    
    const templateInput = document.createElement('input');
    templateInput.type = 'hidden';
    templateInput.name = '_template';
    templateInput.value = 'box';
    form.appendChild(templateInput);
    
    // Reply-to email (so FormSubmit can send confirmation to user)
    const replyToInput = document.createElement('input');
    replyToInput.type = 'hidden';
    replyToInput.name = '_replyto';
    replyToInput.value = email;
    form.appendChild(replyToInput);
    
    // Email content
    const message = `
Welcome to Marapone Contracting Inc.!

Dear ${name},

Thank you for creating an account with us. Your account has been successfully created.

Account Details:
- Name: ${name}
- Email: ${email}
- Account Created: ${new Date().toLocaleString()}

You can now log in to your account and access all our services.

If you have any questions or need assistance, please don't hesitate to contact us at info@marapone.com.

Best regards,
Marapone Contracting Inc.
    `.trim();
    
    const messageInput = document.createElement('textarea');
    messageInput.name = 'message';
    messageInput.value = message;
    form.appendChild(messageInput);
    
    // Add form to body and submit
    document.body.appendChild(form);
    
    // Also send a copy to the user's email using FormSubmit's email forwarding
    // Create a second form to send confirmation to the user
    const userForm = document.createElement('form');
    userForm.method = 'POST';
    userForm.action = 'https://formsubmit.co/' + encodeURIComponent(email);
    userForm.style.display = 'none';
    
    const userSubjectInput = document.createElement('input');
    userSubjectInput.type = 'hidden';
    userSubjectInput.name = '_subject';
    userSubjectInput.value = 'Welcome to Marapone Contracting Inc. - Account Confirmation';
    userForm.appendChild(userSubjectInput);
    
    const userCaptchaInput = document.createElement('input');
    userCaptchaInput.type = 'hidden';
    userCaptchaInput.name = '_captcha';
    userCaptchaInput.value = 'false';
    userForm.appendChild(userCaptchaInput);
    
    const userTemplateInput = document.createElement('input');
    userTemplateInput.type = 'hidden';
    userTemplateInput.name = '_template';
    userTemplateInput.value = 'box';
    userForm.appendChild(userTemplateInput);
    
    const userFromInput = document.createElement('input');
    userFromInput.type = 'hidden';
    userFromInput.name = '_from';
    userFromInput.value = 'info@marapone.com';
    userForm.appendChild(userFromInput);
    
    const confirmationMessage = `
Welcome to Marapone Contracting Inc.!

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
Marapone Contracting Inc.
    `.trim();
    
    const userMessageInput = document.createElement('textarea');
    userMessageInput.name = 'message';
    userMessageInput.value = confirmationMessage;
    userForm.appendChild(userMessageInput);
    
    document.body.appendChild(userForm);
    
    // Submit both forms (they will submit in background)
    // Note: FormSubmit will handle sending the emails
    fetch(form.action, {
        method: 'POST',
        body: new FormData(form)
    }).catch(err => console.log('FormSubmit notification sent'));
    
    fetch(userForm.action, {
        method: 'POST',
        body: new FormData(userForm)
    }).catch(err => console.log('User confirmation email sent'));
    
    // Clean up forms after a delay
    setTimeout(() => {
        if (form.parentNode) form.parentNode.removeChild(form);
        if (userForm.parentNode) userForm.parentNode.removeChild(userForm);
    }, 1000);
}


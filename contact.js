// Contact form functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize account dropdown if on contact page
    if (typeof initAccountDropdown === 'function') {
        initAccountDropdown();
        updateAccountDropdown();
    }
    
    // Initialize cart dropdown if on contact page
    if (typeof initCartDropdown === 'function') {
        initCartDropdown();
    }
    
    // Initialize contact form
    initContactForm();
});

// Initialize contact form
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const submitButton = contactForm?.querySelector('button[type="submit"]');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        // Get form values for validation
        const name = document.getElementById('contact-name').value.trim();
        const email = document.getElementById('contact-email').value.trim();
        const message = document.getElementById('contact-message').value.trim();
        
        // Validate form
        if (!name || name.length < 2) {
            e.preventDefault();
            alert('Please enter your full name (at least 2 characters).');
            document.getElementById('contact-name').focus();
            return false;
        }
        
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            e.preventDefault();
            alert('Please enter a valid email address.');
            document.getElementById('contact-email').focus();
            return false;
        }
        
        if (!message || message.length < 10) {
            e.preventDefault();
            alert('Please enter a message (at least 10 characters).');
            document.getElementById('contact-message').focus();
            return false;
        }
        
        // Disable submit button
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        }
        
        // Set the redirect URL to show success message
        const nextInput = contactForm.querySelector('input[name="_next"]');
        if (nextInput) {
            const currentUrl = window.location.href.split('?')[0];
            nextInput.value = currentUrl + '?success=true';
        }
        
        // Allow form to submit - FormSubmit will handle sending to general@marapone.com
        return true;
    });
    
    // Check for success parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        alert('Thank you for contacting us!\n\nWe have received your message and will get back to you as soon as possible.');
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
        // Reset form
        contactForm.reset();
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        }
    }
}


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
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('contact-name').value.trim();
        const email = document.getElementById('contact-email').value.trim();
        const message = document.getElementById('contact-message').value.trim();
        
        // Validate form
        if (!name || name.length < 2) {
            alert('Please enter your full name (at least 2 characters).');
            document.getElementById('contact-name').focus();
            return;
        }
        
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Please enter a valid email address.');
            document.getElementById('contact-email').focus();
            return;
        }
        
        if (!message || message.length < 10) {
            alert('Please enter a message (at least 10 characters).');
            document.getElementById('contact-message').focus();
            return;
        }
        
        // Disable submit button
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        }
        
        // Simulate form submission
        setTimeout(() => {
            // In production, this would send the data to a server
            alert(`Thank you for contacting us, ${name}!\n\nWe have received your message and will get back to you at ${email} as soon as possible.`);
            
            // Reset form
            contactForm.reset();
            
            // Re-enable submit button
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            }
        }, 1500);
    });
}


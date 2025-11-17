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
    
    // Initialize EmailJS if available
    if (typeof emailjs !== 'undefined') {
        // Initialize with public key (replace with your actual public key)
        emailjs.init('YOUR_PUBLIC_KEY');
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
        
        // Send email using EmailJS
        // Initialize EmailJS (will be initialized on page load)
        if (typeof emailjs !== 'undefined') {
            // EmailJS configuration
            const serviceID = 'service_marapone'; // You'll need to create this in EmailJS
            const templateID = 'template_marapone_contact'; // You'll need to create this in EmailJS
            const publicKey = 'YOUR_PUBLIC_KEY'; // Replace with your EmailJS public key
            
            // Initialize EmailJS if not already initialized
            if (!emailjs.init) {
                emailjs.init(publicKey);
            }
            
            // Prepare email parameters
            const templateParams = {
                from_name: name,
                from_email: email,
                message: message,
                to_email: 'general@marapone.com',
                reply_to: email
            };
            
            // Send email
            emailjs.send(serviceID, templateID, templateParams)
                .then(function(response) {
                    // Success
                    alert(`Thank you for contacting us, ${name}!\n\nWe have received your message and will get back to you at ${email} as soon as possible.`);
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Re-enable submit button
                    if (submitButton) {
                        submitButton.disabled = false;
                        submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                    }
                }, function(error) {
                    // Error - fallback to mailto
                    console.error('EmailJS error:', error);
                    sendViaMailto(name, email, message);
                    
                    // Re-enable submit button
                    if (submitButton) {
                        submitButton.disabled = false;
                        submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                    }
                });
        } else {
            // Fallback to mailto if EmailJS is not loaded
            sendViaMailto(name, email, message);
            
            // Re-enable submit button
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            }
        }
    });
}

// Fallback function to send via mailto
function sendViaMailto(name, email, message) {
    const subject = encodeURIComponent('Contact Form Submission from ' + name);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const mailtoLink = `mailto:general@marapone.com?subject=${subject}&body=${body}`;
    
    // Try to open mailto, but also show success message
    window.location.href = mailtoLink;
    
    // Show success message after a delay
    setTimeout(() => {
        alert(`Thank you for contacting us, ${name}!\n\nYour email client should open. If it doesn't, please email us directly at general@marapone.com`);
    }, 500);
}


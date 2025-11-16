// Social media link configuration
// Update these URLs with your actual social media links

const socialLinks = {
    x: '#',         // Replace with your X (Twitter) URL
    instagram: '#', // Replace with your Instagram URL
    facebook: '#',  // Replace with your Facebook URL
    telegram: '#', // Replace with your Telegram URL
    whatsapp: '#', // Replace with your WhatsApp URL (format: https://wa.me/1234567890)
    youtube: '#',  // Replace with your YouTube URL
    discord: '#'   // Replace with your Discord server invite URL
};

// Initialize social media links
document.addEventListener('DOMContentLoaded', function() {
    // Set up social media links
    Object.keys(socialLinks).forEach(platform => {
        const link = document.getElementById(platform);
        if (link) {
            link.href = socialLinks[platform];
            
            // Add click handler to show message if link is not set
            link.addEventListener('click', function(e) {
                if (this.href === '#' || this.href.endsWith('#')) {
                    e.preventDefault();
                    alert(`Please update the ${platform} link in script.js`);
                }
            });
        }
    });
    
    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.content-section, .social-section');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});


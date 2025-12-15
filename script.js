// Login state management
let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' || false;


// Cart management
const TAX_RATE = 0.13; // 13% HST for Ontario
// Use window.cart to make it globally accessible to other scripts
if (typeof window.cart === 'undefined') {
    window.cart = []; // Cart items array
}
// Create local reference for convenience (use let so it can be reassigned)
let cart = window.cart;
// Example cart structure: [{ id: 1, name: 'Item Name', price: 99.99, quantity: 2 }, ...]
// You can load cart from localStorage: cart = JSON.parse(localStorage.getItem('cart')) || [];

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
    // Check login state from localStorage
    isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    // Initialize account dropdown
    initAccountDropdown();
    
    // Update dropdown based on login state
    updateAccountDropdown();
    
    // Initialize cart dropdown
    initCartDropdown();
    
    // Initialize products dropdown
    initProductsDropdown();
    
    // Load cart from localStorage if available
    window.cart = JSON.parse(localStorage.getItem('cart')) || window.cart || [];
    // Update local reference to point to window.cart
    cart = window.cart;
    
    // For testing: Add sample items to cart (remove this in production)
    // Uncomment the lines below to test with sample data
    // cart = [
    //     { id: 1, name: 'Consulting Service', price: 299.99, quantity: 1 },
    //     { id: 2, name: 'Project Management', price: 499.99, quantity: 2 }
    // ];
    // localStorage.setItem('cart', JSON.stringify(cart));
    // updateCartDisplay();
    
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
            const href = this.getAttribute('href');
            // Only handle if href is not just "#" (which is invalid selector)
            if (href && href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
            // If href is just "#", let the default behavior happen (or do nothing)
        });
    });
});

// Account dropdown functionality - use a flag to prevent duplicate initialization
let accountDropdownInitialized = false;

function initAccountDropdown() {
    const accountIcon = document.getElementById('account-icon');
    const accountDropdown = document.getElementById('account-dropdown');
    const loginItem = document.getElementById('login-item');
    const logoutItem = document.getElementById('logout-item');
    const manageAccountItem = document.getElementById('manage-account-item');
    
    if (!accountIcon || !accountDropdown) return;
    
    // Prevent duplicate initialization
    if (accountDropdownInitialized && accountIcon.dataset.initialized === 'true') {
        return;
    }
    
    // Mark as initialized
    accountIcon.dataset.initialized = 'true';
    accountDropdownInitialized = true;
    
    // Ensure button is clickable and has proper attributes
    accountIcon.style.cursor = 'pointer';
    accountIcon.style.pointerEvents = 'auto';
    accountIcon.setAttribute('type', 'button');
    accountIcon.setAttribute('tabindex', '0');
    
    // Toggle dropdown on account icon click
    accountIcon.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        accountDropdown.classList.toggle('show');
    });
    
    // Also support keyboard (Enter/Space)
    accountIcon.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            accountDropdown.classList.toggle('show');
        }
    });
    
    // Close dropdown when clicking outside
    const closeDropdownHandler = function(e) {
        if (!accountIcon.contains(e.target) && !accountDropdown.contains(e.target)) {
            accountDropdown.classList.remove('show');
        }
    };
    document.addEventListener('click', closeDropdownHandler);
    
    // Handle login item click
    if (loginItem) {
        loginItem.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            // Navigate to login page
            window.location.href = 'login.html';
            accountDropdown.classList.remove('show');
        });
    }
    
    // Handle logout item click
    if (logoutItem) {
        logoutItem.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            // Clear login state
            isLoggedIn = false;
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userData');
            updateAccountDropdown();
            alert('You have been logged out successfully.');
            accountDropdown.classList.remove('show');
        });
    }
    
    // Handle manage account item click
    if (manageAccountItem) {
        manageAccountItem.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            // Navigate to manage account page
            window.location.href = 'manage-account.html';
            accountDropdown.classList.remove('show');
        });
    }
}

// Update dropdown based on login state
function updateAccountDropdown() {
    const loginItem = document.getElementById('login-item');
    const logoutItem = document.getElementById('logout-item');
    const manageAccountItem = document.getElementById('manage-account-item');
    
    if (isLoggedIn) {
        if (loginItem) loginItem.style.display = 'none';
        if (logoutItem) logoutItem.style.display = 'block';
        if (manageAccountItem) manageAccountItem.style.display = 'block';
    } else {
        if (loginItem) loginItem.style.display = 'block';
        if (logoutItem) logoutItem.style.display = 'none';
        if (manageAccountItem) manageAccountItem.style.display = 'none';
    }
}

// Cart dropdown functionality
function initCartDropdown() {
    const cartIcon = document.getElementById('cart-icon');
    const cartDropdown = document.getElementById('cart-dropdown');
    const cartDetails = document.getElementById('cart-details');
    const closeCartDetails = document.getElementById('close-cart-details');
    const checkoutNowBtn = document.getElementById('checkout-now-btn');
    
    if (!cartIcon) return;
    
    // Show cart details directly on cart icon click (no dropdown menu)
    cartIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        // Close account dropdown if open
        const accountDropdown = document.getElementById('account-dropdown');
        if (accountDropdown) accountDropdown.classList.remove('show');
        
        // Hide dropdown menu if it exists
        if (cartDropdown) cartDropdown.classList.remove('show');
        
        // Show cart details directly
        if (cartDetails) {
            updateCartDisplay();
            cartDetails.classList.add('show');
        }
    });
    
    // Close cart details when clicking outside
    document.addEventListener('click', function(e) {
        if (!cartIcon.contains(e.target) && 
            (!cartDetails || !cartDetails.contains(e.target))) {
            if (cartDetails) cartDetails.classList.remove('show');
            if (cartDropdown) cartDropdown.classList.remove('show');
        }
    });
    
    // Handle "Checkout now" button in cart details
    if (checkoutNowBtn) {
        checkoutNowBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Save cart to localStorage before navigating
            localStorage.setItem('cart', JSON.stringify(cart));
            // Navigate to checkout page
            window.location.href = 'checkout.html';
        });
    }
    
    // Handle close cart details
    if (closeCartDetails) {
        closeCartDetails.addEventListener('click', function(e) {
            e.preventDefault();
            if (cartDetails) cartDetails.classList.remove('show');
        });
    }
}

// Show cart details view
function showCartDetails() {
    const cartDetails = document.getElementById('cart-details');
    if (!cartDetails) return;
    
    updateCartDisplay();
    cartDetails.classList.add('show');
}

// Update cart display with items and calculations
function updateCartDisplay() {
    const cartItemsList = document.getElementById('cart-items-list');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartTax = document.getElementById('cart-tax');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartItemsList) return;
    
    // Clear existing items
    cartItemsList.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsList.innerHTML = '<div class="empty-cart-message">Your cart is empty</div>';
        if (cartSubtotal) cartSubtotal.textContent = '$0.00';
        if (cartTax) cartTax.textContent = '$0.00';
        if (cartTotal) cartTotal.textContent = '$0.00';
        return;
    }
    
    // Calculate subtotal
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    
    // Calculate tax (13% HST)
    const tax = subtotal * TAX_RATE;
    
    // Calculate total
    const total = subtotal + tax;
    
    // Display cart items
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        // Check if this is a booking item
        if (item.type === 'booking' && item.bookingDetails) {
            const bookingDetails = item.bookingDetails;
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-booking-details">
                        <div class="booking-date">${bookingDetails.dateDisplay}</div>
                        <div class="booking-time">${bookingDetails.time} (${bookingDetails.duration} min)</div>
                    </div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                </div>
                <div class="cart-item-total">$${itemTotal.toFixed(2)}</div>
            `;
        } else {
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)} each</div>
                    <div class="cart-item-quantity">Qty: ${item.quantity}</div>
                </div>
                <div class="cart-item-total">$${itemTotal.toFixed(2)}</div>
            `;
        }
        cartItemsList.appendChild(cartItem);
    });
    
    // Update summary
    if (cartSubtotal) cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    if (cartTax) cartTax.textContent = `$${tax.toFixed(2)}`;
    if (cartTotal) cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Helper function to add item to cart (for testing or future use)
function addToCart(item) {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
        existingItem.quantity += item.quantity || 1;
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity || 1
        });
    }
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Mailing list form functionality
function initMailingListForm() {
    const mailingListForm = document.getElementById('mailing-list-form');
    const submitButton = mailingListForm?.querySelector('button[type="submit"]');
    const emailInput = document.getElementById('mailing-list-email');
    
    if (!mailingListForm) return;
    
    mailingListForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        
        const email = emailInput?.value.trim();
        
        // Validate email
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Please enter a valid email address.');
            if (emailInput) emailInput.focus();
            return false;
        }
        
        // Disable submit button
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
        }
        
        // Send notification to info@marapone.com (non-blocking, fire and forget)
        sendMailingListNotification(email);
        
        // Send confirmation email to subscriber (non-blocking, fire and forget)
        sendMailingListConfirmationEmail(email);
        
        // Show success message immediately (don't wait for email sends)
        alert('Thank you for subscribing to our mailing list!\n\nA confirmation email has been sent to ' + email + '.');
        
        // Reset form
        mailingListForm.reset();
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Subscribe';
        }
        
        return false;
    });
    
    // Check for success parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('subscribed') === 'true') {
        alert('Thank you for subscribing to our mailing list!\n\nYou will receive updates and special offers at ' + (emailInput?.value || 'your email address') + '.');
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
        // Reset form
        mailingListForm.reset();
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Subscribe';
        }
    }
}

// Send mailing list notification to info@marapone.com
function sendMailingListNotification(email) {
    // Create a form to notify info@marapone.com about new subscription
    const adminForm = document.createElement('form');
    adminForm.method = 'POST';
    adminForm.action = 'https://formsubmit.co/info@marapone.com';
    adminForm.style.display = 'none';
    
    const adminSubject = document.createElement('input');
    adminSubject.type = 'hidden';
    adminSubject.name = '_subject';
    adminSubject.value = 'New Mailing List Subscription';
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
    
    // Prevent redirect
    const adminNext = document.createElement('input');
    adminNext.type = 'hidden';
    adminNext.name = '_next';
    adminNext.value = window.location.href;
    adminForm.appendChild(adminNext);
    
    const adminMessage = document.createElement('textarea');
    adminMessage.name = 'message';
    adminMessage.value = `New mailing list subscription:\n\nEmail: ${email}\nDate: ${new Date().toLocaleString()}`;
    adminForm.appendChild(adminMessage);
    
    document.body.appendChild(adminForm);
    
    // Submit form using fetch (non-blocking, fire and forget)
    fetch(adminForm.action, {
        method: 'POST',
        body: new FormData(adminForm)
    }).then(response => {
        console.log('Admin notification sent successfully');
    }).catch(err => {
        console.error('Error sending admin notification:', err);
        // Fallback: try submitting the form directly
        try {
            adminForm.submit();
        } catch (e) {
            console.error('Form submission also failed:', e);
        }
    });
    
    // Clean up form after submission
    setTimeout(() => {
        if (adminForm.parentNode) adminForm.parentNode.removeChild(adminForm);
    }, 2000);
}

// Send mailing list confirmation email
function sendMailingListConfirmationEmail(email) {
    // Create a form to send confirmation email to subscriber using FormSubmit
    const userForm = document.createElement('form');
    userForm.method = 'POST';
    userForm.action = 'https://formsubmit.co/' + encodeURIComponent(email);
    userForm.style.display = 'none';
    
    const userSubject = document.createElement('input');
    userSubject.type = 'hidden';
    userSubject.name = '_subject';
    userSubject.value = 'Welcome to Marapone Contracting Inc. Mailing List';
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
    
    // Prevent redirect
    const userNext = document.createElement('input');
    userNext.type = 'hidden';
    userNext.name = '_next';
    userNext.value = window.location.href;
    userForm.appendChild(userNext);
    
    // Set the from email to info@marapone.com
    const userFrom = document.createElement('input');
    userFrom.type = 'hidden';
    userFrom.name = '_from';
    userFrom.value = 'info@marapone.com';
    userForm.appendChild(userFrom);
    
    const confirmationMessage = `Thank you for subscribing to our mailing list!

Dear Subscriber,

We're excited to have you join the Marapone Contracting Inc. community! You've successfully subscribed to our mailing list and will now receive:

• Latest news and updates about our services
• Exclusive offers and special promotions
• Industry insights and helpful tips
• New product announcements
• And much more!

We promise to keep you informed with valuable content and will never spam your inbox. You can unsubscribe at any time if you no longer wish to receive our updates.

If you have any questions or need assistance, please don't hesitate to contact us at info@marapone.com.

Thank you for your interest in Marapone Contracting Inc.!

Best regards,
The Marapone Contracting Inc. Team`;
    
    const userMessage = document.createElement('textarea');
    userMessage.name = 'message';
    userMessage.value = confirmationMessage;
    userForm.appendChild(userMessage);
    
    document.body.appendChild(userForm);
    
    // Submit form using fetch (non-blocking, fire and forget)
    fetch(userForm.action, {
        method: 'POST',
        body: new FormData(userForm)
    }).then(response => {
        console.log('User confirmation email sent successfully');
    }).catch(err => {
        console.error('Error sending user confirmation email:', err);
        // Fallback: try submitting the form directly
        try {
            userForm.submit();
        } catch (e) {
            console.error('Form submission also failed:', e);
        }
    });
    
    // Clean up form after submission
    setTimeout(() => {
        if (userForm.parentNode) userForm.parentNode.removeChild(userForm);
    }, 1000);
}

// Products dropdown functionality
let productsDropdownInitialized = false;

function initProductsDropdown() {
    const productsIcon = document.getElementById('products-icon');
    const productsDropdown = document.getElementById('products-dropdown');
    
    if (!productsIcon || !productsDropdown) return;
    
    // Prevent duplicate initialization
    if (productsDropdownInitialized && productsIcon.dataset.initialized === 'true') {
        return;
    }
    
    // Ensure dropdown starts hidden
    productsDropdown.classList.remove('show');
    productsDropdown.style.display = 'none';
    
    productsDropdownInitialized = true;
    productsIcon.dataset.initialized = 'true';
    
    // Set up icon properties
    productsIcon.style.cursor = 'pointer';
    productsIcon.style.pointerEvents = 'auto';
    productsIcon.setAttribute('type', 'button');
    productsIcon.setAttribute('tabindex', '0');
    
    // Toggle dropdown on products icon click
    productsIcon.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Close account dropdown if open
        const accountDropdown = document.getElementById('account-dropdown');
        if (accountDropdown) accountDropdown.classList.remove('show');
        
        // Close cart details if open
        const cartDetails = document.getElementById('cart-details');
        if (cartDetails) cartDetails.classList.remove('show');
        
        // Toggle dropdown visibility
        if (productsDropdown.classList.contains('show')) {
            productsDropdown.classList.remove('show');
            productsDropdown.style.display = 'none';
        } else {
            productsDropdown.classList.add('show');
            productsDropdown.style.display = 'block';
        }
    });
    
    // Also support keyboard (Enter/Space)
    productsIcon.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            productsIcon.click();
        }
    });
    
    // Close dropdown when clicking outside
    const closeDropdownHandler = function(e) {
        if (!productsIcon.contains(e.target) && !productsDropdown.contains(e.target)) {
            productsDropdown.classList.remove('show');
            productsDropdown.style.display = 'none';
        }
    };
    document.addEventListener('click', closeDropdownHandler);
    
    // Close dropdown on mobile when tapping outside (touch events)
    document.addEventListener('touchstart', function(e) {
        if (!productsIcon.contains(e.target) && !productsDropdown.contains(e.target)) {
            productsDropdown.classList.remove('show');
            productsDropdown.style.display = 'none';
        }
    });
    
    // Ensure dropdown items are clickable on mobile
    const dropdownItems = productsDropdown.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function() {
            // Small delay to ensure navigation happens
            setTimeout(() => {
                productsDropdown.classList.remove('show');
                productsDropdown.style.display = 'none';
            }, 100);
        });
    });
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.content-section');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Initialize mailing list form
    initMailingListForm();
});


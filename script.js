// Login state management
let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' || false;


// Cart management
const TAX_RATE = 0.13; // 13% HST for Ontario
// Use window.cart to make it globally accessible to other scripts
if (typeof window.cart === 'undefined') {
    window.cart = []; // Cart items array
}
// Create local reference for convenience
const cart = window.cart;
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
    
    // Load cart from localStorage if available
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    
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

// Account dropdown functionality
function initAccountDropdown() {
    const accountIcon = document.getElementById('account-icon');
    const accountDropdown = document.getElementById('account-dropdown');
    const loginItem = document.getElementById('login-item');
    const logoutItem = document.getElementById('logout-item');
    const manageAccountItem = document.getElementById('manage-account-item');
    
    if (!accountIcon || !accountDropdown) return;
    
    // Toggle dropdown on account icon click
    accountIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        accountDropdown.classList.toggle('show');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!accountIcon.contains(e.target) && !accountDropdown.contains(e.target)) {
            accountDropdown.classList.remove('show');
        }
    });
    
    // Handle login item click
    if (loginItem) {
        loginItem.addEventListener('click', function(e) {
            e.preventDefault();
            // Navigate to login page
            window.location.href = 'login.html';
            accountDropdown.classList.remove('show');
        });
    }
    
    // Handle logout item click
    if (logoutItem) {
        logoutItem.addEventListener('click', function(e) {
            e.preventDefault();
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
            // Add your manage account logic here
            console.log('Manage account clicked');
            // Example: window.location.href = '/account';
            accountDropdown.classList.remove('show');
        });
    }
}

// Update dropdown based on login state
function updateAccountDropdown() {
    const loginItem = document.getElementById('login-item');
    const logoutItem = document.getElementById('logout-item');
    
    if (isLoggedIn) {
        if (loginItem) loginItem.style.display = 'none';
        if (logoutItem) logoutItem.style.display = 'block';
    } else {
        if (loginItem) loginItem.style.display = 'block';
        if (logoutItem) logoutItem.style.display = 'none';
    }
}

// Cart dropdown functionality
function initCartDropdown() {
    const cartIcon = document.getElementById('cart-icon');
    const cartDropdown = document.getElementById('cart-dropdown');
    const cartDetails = document.getElementById('cart-details');
    const viewCartItem = document.getElementById('view-cart-item');
    const checkoutItem = document.getElementById('checkout-item');
    const closeCartDetails = document.getElementById('close-cart-details');
    
    if (!cartIcon || !cartDropdown) return;
    
    // Toggle cart dropdown on cart icon click
    cartIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        // Close account dropdown if open
        const accountDropdown = document.getElementById('account-dropdown');
        if (accountDropdown) accountDropdown.classList.remove('show');
        
        // Close cart details if open
        if (cartDetails) cartDetails.classList.remove('show');
        
        // Toggle cart dropdown
        cartDropdown.classList.toggle('show');
    });
    
    // Close dropdown and cart details when clicking outside
    document.addEventListener('click', function(e) {
        if (!cartIcon.contains(e.target) && !cartDropdown.contains(e.target) && 
            (!cartDetails || !cartDetails.contains(e.target))) {
            cartDropdown.classList.remove('show');
            if (cartDetails) cartDetails.classList.remove('show');
        }
    });
    
    // Handle "View cart" click
    if (viewCartItem) {
        viewCartItem.addEventListener('click', function(e) {
            e.preventDefault();
            cartDropdown.classList.remove('show');
            showCartDetails();
        });
    }
    
    // Handle "Checkout now" click
    if (checkoutItem) {
        checkoutItem.addEventListener('click', function(e) {
            e.preventDefault();
            cartDropdown.classList.remove('show');
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
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)} each</div>
                <div class="cart-item-quantity">Qty: ${item.quantity}</div>
            </div>
            <div class="cart-item-total">$${itemTotal.toFixed(2)}</div>
        `;
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
});


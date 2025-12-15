// Packages data - Fixed-Price Service Packages
const packagesData = {
    'service-packages': {
        title: 'Fixed-Price Service Packages',
        icon: 'fa-handshake',
        products: [
            {
                id: 'sp-000',
                name: 'Full Supplier Database with MOQs, Pricing History, and Direct Contacts',
                description: 'Upgrade to the full supplier database with MOQs, pricing history, and direct contacts.',
                price: 197,
                icon: 'fa-database'
            },
            {
                id: 'sp-001',
                name: '60-Minute Export Readiness Audit',
                description: 'We review your product, pricing, and target markets live on Zoom and give you a step-by-step export plan + instant savings opportunities.',
                price: 295,
                icon: 'fa-search-dollar'
            },
            {
                id: 'sp-002',
                name: 'Freight Rate Audit – Guaranteed Savings',
                description: 'Send us your last 10 invoices. We\'ll find 10–30% savings or the audit is free.',
                price: 450,
                icon: 'fa-file-invoice-dollar'
            },
            {
                id: 'sp-003',
                name: 'China Virtual Sourcing Trip',
                description: '5 days. 10 vetted factories. Video calls. Samples shipped to you. Price negotiations handled. Zero travel required.',
                price: 1950,
                icon: 'fa-globe-asia'
            },
            {
                id: 'sp-004',
                name: 'AI Quick-Win Automation',
                description: 'Pick one: lead qualification bot, dynamic pricing engine, inventory forecasting, customer support chatbot, or custom idea. Built and handed over in 10 days.',
                price: 3500,
                icon: 'fa-magic'
            },
            {
                id: 'sp-005',
                name: 'Google + Meta Ads Launch Package',
                description: 'Full campaign setup and 7 days of management included. We get you profitable fast or we keep optimizing for free until you are.',
                price: 1500,
                note: '+ your ad spend',
                icon: 'fa-bullhorn'
            },
            {
                id: 'sp-006',
                name: 'Amazon FBA Full Launch',
                description: 'Product validation → China sourcing → freight → listings → PPC → review strategy. We take you from zero to first sale.',
                price: 9500,
                note: 'From',
                icon: 'fa-rocket'
            },
            {
                id: 'sp-007',
                name: 'Custom Shopify or WooCommerce Store - Starter',
                description: 'Built in 14–21 days. Mobile-perfect, conversion-optimized, ready to scale. Starter package.',
                price: 3500,
                icon: 'fa-store'
            },
            {
                id: 'sp-008',
                name: 'Custom Shopify or WooCommerce Store - Pro',
                description: 'Built in 14–21 days. Mobile-perfect, conversion-optimized, ready to scale. Pro package.',
                price: 8500,
                icon: 'fa-store'
            },
            {
                id: 'sp-009',
                name: 'Custom Shopify or WooCommerce Store - Enterprise',
                description: 'Built in 14–21 days. Mobile-perfect, conversion-optimized, ready to scale. Enterprise package.',
                price: 15000,
                note: '+',
                icon: 'fa-store'
            },
            {
                id: 'sp-010',
                name: 'White-Label Logistics Dashboard',
                description: 'Give your clients a beautiful, branded portal to track every shipment in real time. Makes you look like a big player overnight. Monthly subscription.',
                price: 499,
                recurring: 'monthly',
                icon: 'fa-tachometer-alt'
            },
            {
                id: 'sp-011',
                name: 'Lead Machine – Booked Sales Calls',
                description: 'We fill your calendar with 10–20 pre-qualified calls every month using LinkedIn + cold email + paid ads.',
                price: 5000,
                note: '+ 20% of revenue',
                icon: 'fa-phone-volume'
            }
        ]
    }
};

// Initialize packages page
document.addEventListener('DOMContentLoaded', function() {
    // Initialize account dropdown
    if (typeof initAccountDropdown === 'function') {
        initAccountDropdown();
        updateAccountDropdown();
    }
    
    // Initialize products dropdown
    if (typeof initProductsDropdown === 'function') {
        initProductsDropdown();
    }
    
    // Initialize cart dropdown
    if (typeof initCartDropdown === 'function') {
        initCartDropdown();
    }
    
    // Load cart from localStorage
    if (typeof window.cart === 'undefined') {
        window.cart = [];
    }
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        window.cart = JSON.parse(savedCart);
    }
    
    // Initialize welcome popup
    initWelcomePopup();
    
    // Render packages
    renderPackages();
});

// Initialize welcome popup
function initWelcomePopup() {
    const welcomePopup = document.getElementById('products-welcome-popup');
    const closePopupBtn = document.getElementById('close-products-popup');
    
    if (!welcomePopup || !closePopupBtn) return;
    
    // Check if user has seen the popup before
    const hasSeenPopup = sessionStorage.getItem('packages-welcome-seen');
    
    if (!hasSeenPopup) {
        // Show popup after a short delay
        setTimeout(function() {
            welcomePopup.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }, 500);
    }
    
    // Close button
    closePopupBtn.addEventListener('click', function() {
        welcomePopup.style.display = 'none';
        document.body.style.overflow = '';
        sessionStorage.setItem('packages-welcome-seen', 'true');
    });
    
    // Close when clicking outside
    welcomePopup.addEventListener('click', function(e) {
        if (e.target === welcomePopup) {
            welcomePopup.style.display = 'none';
            document.body.style.overflow = '';
            sessionStorage.setItem('packages-welcome-seen', 'true');
        }
    });
}

// Render all packages
function renderPackages() {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    // Iterate through each category
    Object.keys(packagesData).forEach(categoryKey => {
        const category = packagesData[categoryKey];
        
        // Create category section
        const categorySection = document.createElement('div');
        categorySection.className = 'product-category-section';
        
        const categoryHeader = document.createElement('div');
        categoryHeader.className = 'product-category-header';
        categoryHeader.innerHTML = `
            <div class="product-category-icon">
                <i class="fas ${category.icon}"></i>
            </div>
            <h2 class="product-category-title">${category.title}</h2>
        `;
        
        const categoryGrid = document.createElement('div');
        categoryGrid.className = 'product-category-grid';
        
        // Add products to category
        category.products.forEach(product => {
            const productCard = createProductCard(product);
            categoryGrid.appendChild(productCard);
        });
        
        categorySection.appendChild(categoryHeader);
        categorySection.appendChild(categoryGrid);
        productsGrid.appendChild(categorySection);
    });
}

// Create product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const priceDisplay = product.price === 0 ? 'FREE' : 
                        (product.note ? `${product.note} $${product.price.toFixed(2)}` : 
                        `$${product.price.toFixed(2)}${product.recurring ? '/' + product.recurring : ''}`);
    
    const productIcon = product.icon || 'fa-box';
    
    card.innerHTML = `
        <div class="product-card-content">
            <div class="product-icon">
                <i class="fas ${productIcon}"></i>
            </div>
            <h3 class="product-card-title">${product.name}</h3>
            <p class="product-card-description">${product.description}</p>
            <div class="product-card-footer">
                <div class="product-card-price">${priceDisplay}</div>
                ${product.price === 0 ? '' : `
                    <button class="product-add-to-cart-btn" data-product-id="${product.id}">
                        <i class="fas fa-cart-plus"></i>
                        Add to Cart
                    </button>
                `}
            </div>
        </div>
    `;
    
    // Add click handler for add to cart button
    if (product.price > 0) {
        const addToCartBtn = card.querySelector('.product-add-to-cart-btn');
        addToCartBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            addProductToCart(product);
        });
    } else {
        // For free products, make the entire card clickable to add to cart
        card.style.cursor = 'pointer';
        card.addEventListener('click', function(e) {
            e.preventDefault();
            addProductToCart(product);
        });
    }
    
    return card;
}

// Add product to cart
function addProductToCart(product) {
    // Ensure cart exists
    if (typeof window.cart === 'undefined') {
        window.cart = [];
    }
    
    // Load from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        window.cart = JSON.parse(savedCart);
    }
    
    // Use addToCart function if available, otherwise add directly
    if (typeof addToCart === 'function') {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    } else {
        // Check if product already in cart
        const existingItem = window.cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            window.cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1
            });
        }
        
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(window.cart));
        
        // Update cart display
        if (typeof updateCartDisplay === 'function') {
            updateCartDisplay();
        }
    }
    
    // Show success message
    const priceDisplay = product.price === 0 ? 'FREE' : 
                        (product.note ? `${product.note} $${product.price.toFixed(2)}` : 
                        `$${product.price.toFixed(2)}${product.recurring ? '/' + product.recurring : ''}`);
    
    alert(`${product.name} added to cart!\n\nPrice: ${priceDisplay}`);
}

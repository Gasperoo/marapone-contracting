// Products data organized by category
const productsData = {
    'digital-products': {
        title: 'Digital Products & Tools',
        icon: 'fa-download',
        products: [
            {
                id: 'dp-001',
                name: 'Import/Export Starter Kit',
                description: 'Everything you need to start importing or exporting profitably in 2025. Includes: 150-page country-specific guide (choose your market at checkout), HS code lookup tool + tariff calculator, 50+ editable customs documents & contracts, verified supplier shortlist (updated monthly). Instant download after payment. Price: $297',
                price: 297
            },
            {
                id: 'dp-002',
                name: 'Landed Cost Calculator Pro',
                description: 'Never overpay on freight or duties again. Excel + Google Sheets tool that instantly calculates your true landed cost for any shipping route. Works with sea, air, rail, and express. One-time purchase. Price: $99',
                price: 99
            },
            {
                id: 'dp-003',
                name: 'AI Product Description Writer',
                description: 'Generate 100% original, SEO-optimized listings in seconds. Works for Amazon, Shopify, Etsy, Walmart, eBay. Cancel anytime. Monthly subscription. Price: $79/month',
                price: 79,
                recurring: 'monthly'
            },
            {
                id: 'dp-004',
                name: 'Done-For-You Amazon / Etsy Listing Pack',
                description: '7–15 fully optimized listings delivered in 5 business days. Includes keyword research, competitor-proof titles, bullet points, A+ Content (Amazon), and backend search terms. Price: From $449',
                price: 449,
                note: 'From'
            },
            {
                id: 'dp-005',
                name: 'E-commerce Launch Checklist & Templates',
                description: 'The exact 90-day roadmap we use with 7-figure stores + plug-and-play Shopify theme + email sequence templates. Price: $97',
                price: 97
            }
        ]
    },
    'service-packages': {
        title: 'Fixed-Price Service Packages',
        icon: 'fa-handshake',
        products: [
            {
                id: 'sp-001',
                name: '60-Minute Export Readiness Audit',
                description: 'We review your product, pricing, and target markets live on Zoom and give you a step-by-step export plan + instant savings opportunities. Price: $295',
                price: 295
            },
            {
                id: 'sp-002',
                name: 'Freight Rate Audit – Guaranteed Savings',
                description: 'Send us your last 10 invoices. We\'ll find 10–30% savings or the audit is free. Price: $450',
                price: 450
            },
            {
                id: 'sp-003',
                name: 'China Virtual Sourcing Trip',
                description: '5 days. 10 vetted factories. Video calls. Samples shipped to you. Price negotiations handled. Zero travel required. Price: $1,950',
                price: 1950
            },
            {
                id: 'sp-004',
                name: 'AI Quick-Win Automation',
                description: 'Pick one: lead qualification bot, dynamic pricing engine, inventory forecasting, customer support chatbot, or custom idea. Built and handed over in 10 days. Price: $3,500',
                price: 3500
            },
            {
                id: 'sp-005',
                name: 'Google + Meta Ads Launch Package',
                description: 'Full campaign setup and 7 days of management included. We get you profitable fast or we keep optimizing for free until you are. Price: $1,500 + your ad spend',
                price: 1500,
                note: '+ your ad spend'
            },
            {
                id: 'sp-006',
                name: 'Amazon FBA Full Launch',
                description: 'Product validation → China sourcing → freight → listings → PPC → review strategy. We take you from zero to first sale. Price: From $9,500',
                price: 9500,
                note: 'From'
            },
            {
                id: 'sp-007',
                name: 'Custom Shopify or WooCommerce Store - Starter',
                description: 'Built in 14–21 days. Mobile-perfect, conversion-optimized, ready to scale. Starter package. Price: $3,500',
                price: 3500
            },
            {
                id: 'sp-008',
                name: 'Custom Shopify or WooCommerce Store - Pro',
                description: 'Built in 14–21 days. Mobile-perfect, conversion-optimized, ready to scale. Pro package. Price: $8,500',
                price: 8500
            },
            {
                id: 'sp-009',
                name: 'Custom Shopify or WooCommerce Store - Enterprise',
                description: 'Built in 14–21 days. Mobile-perfect, conversion-optimized, ready to scale. Enterprise package. Price: $15,000+',
                price: 15000,
                note: '+'
            },
            {
                id: 'sp-010',
                name: 'White-Label Logistics Dashboard',
                description: 'Give your clients a beautiful, branded portal to track every shipment in real time. Makes you look like a big player overnight. Monthly subscription. Price: $499/month',
                price: 499,
                recurring: 'monthly'
            },
            {
                id: 'sp-011',
                name: 'Lead Machine – Booked Sales Calls',
                description: 'We fill your calendar with 10–20 pre-qualified calls every month using LinkedIn + cold email + paid ads. Price: $5,000 setup + 20% of revenue',
                price: 5000,
                note: '+ 20% of revenue'
            }
        ]
    },
    'free-downloads': {
        title: 'Free Downloads (Lead Magnets)',
        icon: 'fa-gift',
        products: [
            {
                id: 'fd-001',
                name: '2025 Global Tariffs & Duties Cheat Sheet',
                description: 'Free PDF download with essential tariff and duty information for international trade. Price: FREE',
                price: 0
            },
            {
                id: 'fd-002',
                name: 'Top 20 Reliable Chinese Factories That Accept Small Orders',
                description: 'Free verified list of Chinese factories that work with small order quantities. Price: FREE',
                price: 0
            },
            {
                id: 'fd-003',
                name: '100 Proven E-commerce Product Ideas for 2025',
                description: 'Free curated list of proven e-commerce product ideas for 2025. Price: FREE',
                price: 0
            },
            {
                id: 'fd-004',
                name: 'Full Supplier Database with MOQs, Pricing History, and Direct Contacts',
                description: 'Upgrade to the full supplier database with MOQs, pricing history, and direct contacts. Price: $197',
                price: 197
            }
        ]
    }
};

// Initialize products page
document.addEventListener('DOMContentLoaded', function() {
    // Initialize account dropdown
    if (typeof initAccountDropdown === 'function') {
        initAccountDropdown();
        updateAccountDropdown();
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
    
    // Render products
    renderProducts();
});

// Render all products by category
function renderProducts() {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    // Iterate through each category
    Object.keys(productsData).forEach(categoryKey => {
        const category = productsData[categoryKey];
        
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
    
    card.innerHTML = `
        <div class="product-card-content">
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

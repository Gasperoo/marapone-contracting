// Products data organized by service category
const productsData = {
    'import-export': {
        title: 'Import/Export Products',
        icon: 'fa-exchange-alt',
        products: [
            {
                id: 'ie-001',
                name: 'Import/Export Starter Kit',
                description: 'Country-specific import/export guide (tariffs, HS codes, incoterms), supplier vetting checklist + verified supplier shortlist, customs clearance document templates. Price: $149–$297',
                price: 149,
                priceRange: '$149–$297'
            },
            {
                id: 'ie-002',
                name: '2025 Tariffs & Duties Cheat Sheet',
                description: 'Free PDF guide with essential tariff and duty information for international trade. Price: FREE',
                price: 0
            },
            {
                id: 'ie-003',
                name: 'Top 20 Chinese Suppliers That Ship to Small Buyers',
                description: 'Free verified list of Chinese suppliers that work with small order quantities. Price: FREE',
                price: 0
            },
            {
                id: 'ie-004',
                name: 'Full Supplier Database with MOQs & Pricing',
                description: 'Complete supplier database with minimum order quantities and pricing information. Price: $197',
                price: 197
            }
        ]
    },
    'logistics': {
        title: 'Logistics Products',
        icon: 'fa-truck',
        products: [
            {
                id: 'log-001',
                name: 'Logistics Cost Calculator Tool',
                description: 'Excel/Google Sheets tool that calculates landed cost (freight, duties, taxes, insurance) for any route. One-time purchase. Price: $99',
                price: 99
            },
            {
                id: 'log-002',
                name: 'Freight Rate Audit',
                description: 'We analyze your last 10 shipments and find 10–30% savings. Flat rate service. Price: $450',
                price: 450
            },
            {
                id: 'log-003',
                name: 'White-Label Logistics Dashboard',
                description: 'Give your clients a branded portal to track all their shipments in real time. Monthly subscription. Price: $499/month',
                price: 499,
                recurring: 'monthly'
            }
        ]
    },
    'ecommerce': {
        title: 'E-commerce Products',
        icon: 'fa-shopping-cart',
        products: [
            {
                id: 'ec-001',
                name: 'AI-Powered Product Description Generator',
                description: 'Plug-in or web app that writes SEO-optimized e-commerce listings in seconds. Monthly subscription. Price: $79/month',
                price: 79,
                recurring: 'monthly'
            },
            {
                id: 'ec-002',
                name: 'Done-For-You Amazon/Etsy Listing Pack',
                description: '7–15 fully optimized listings (title, bullets, keywords, A+ content). Price: $349–$799',
                price: 349,
                priceRange: '$349–$799'
            },
            {
                id: 'ec-003',
                name: 'E-commerce Launch Checklist & Templates',
                description: '90-day launch plan + Shopify/WordPress store templates. Price: $97',
                price: 97
            },
            {
                id: 'ec-004',
                name: 'Done-For-You Google Ads / Meta Ads Launch',
                description: 'Full campaign setup in 7 days (works great for e-commerce clients). Price: $1,500 + ad spend',
                price: 1500,
                note: '+ ad spend'
            },
            {
                id: 'ec-005',
                name: 'End-to-End Amazon FBA Launch Package',
                description: 'Product validation → sourcing → listing → PPC launch → reviews. Price: $7,500–$15,000',
                price: 7500,
                priceRange: '$7,500–$15,000'
            },
            {
                id: 'ec-006',
                name: 'Custom E-commerce Store Build - Starter',
                description: 'Custom Shopify or WooCommerce store build. Starter package. Price: $3,500',
                price: 3500
            },
            {
                id: 'ec-007',
                name: 'Custom E-commerce Store Build - Pro',
                description: 'Custom Shopify or WooCommerce store build. Pro package. Price: $8,500',
                price: 8500
            },
            {
                id: 'ec-008',
                name: 'Custom E-commerce Store Build - Enterprise',
                description: 'Custom Shopify or WooCommerce store build. Enterprise package. Price: $15,000+',
                price: 15000,
                note: '+'
            }
        ]
    },
    'consulting': {
        title: 'Consulting Services',
        icon: 'fa-user-tie',
        products: [
            {
                id: 'con-001',
                name: '60-Minute "Export Readiness" Consultation',
                description: 'Review your product + target markets + pricing strategy. Price: $295',
                price: 295
            },
            {
                id: 'con-002',
                name: 'China Sourcing Trip-in-a-Box',
                description: '5-day virtual sourcing trip: 10 vetted suppliers, video calls, samples shipped, negotiation done for you. Price: $1,950',
                price: 1950
            },
            {
                id: 'con-003',
                name: 'AI Automation Quick Win',
                description: 'We build one high-ROI automation in 10 days (e.g., lead qualification bot, pricing engine, inventory forecasting). Price: $2,500–$4,500',
                price: 2500,
                priceRange: '$2,500–$4,500'
            },
            {
                id: 'con-004',
                name: 'Business Development "Lead Machine"',
                description: 'We book 10–20 qualified sales calls per month for you or your clients. Price: $5,000 one-time + commission',
                price: 5000,
                note: '+ commission'
            }
        ]
    },
    'marketing': {
        title: 'Marketing Services',
        icon: 'fa-bullhorn',
        products: [
            {
                id: 'mkt-001',
                name: 'Monthly Marketing Retainer - Bronze',
                description: 'Growth-as-a-Service monthly retainer. Bronze tier. Price: $1,500/month',
                price: 1500,
                recurring: 'monthly'
            },
            {
                id: 'mkt-002',
                name: 'Monthly Marketing Retainer - Silver',
                description: 'Growth-as-a-Service monthly retainer. Silver tier. Price: $3,500/month',
                price: 3500,
                recurring: 'monthly'
            },
            {
                id: 'mkt-003',
                name: 'Monthly Marketing Retainer - Gold',
                description: 'Growth-as-a-Service monthly retainer. Gold tier. Price: $7,000/month',
                price: 7000,
                recurring: 'monthly'
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
                        (product.priceRange ? product.priceRange : 
                        `$${product.price.toFixed(2)}${product.recurring ? '/' + product.recurring : ''}${product.note ? ' ' + product.note : ''}`);
    
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
                        (product.priceRange ? product.priceRange : 
                        `$${product.price.toFixed(2)}${product.recurring ? '/' + product.recurring : ''}${product.note ? ' ' + product.note : ''}`);
    
    alert(`${product.name} added to cart!\n\nPrice: ${priceDisplay}`);
}


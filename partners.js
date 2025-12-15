// Partners data
const partnersData = [
    {
        name: 'SeaRates',
        url: 'https://www.searates.com',
        logoUrl: 'https://img.logo.dev/searates.com?size=256',
        description: 'Global shipping rates and freight quotes'
    },
    {
        name: 'AirRates',
        url: 'https://www.airrates.com',
        logoUrl: 'https://img.logo.dev/airrates.com?size=256',
        description: 'Air freight rates and logistics solutions'
    },
    {
        name: 'Freightos',
        url: 'https://www.freightos.com',
        logoUrl: 'https://img.logo.dev/freightos.com?size=256',
        description: 'Digital freight marketplace and booking platform'
    },
    {
        name: 'Container xChange',
        url: 'https://www.container-xchange.com',
        logoUrl: 'https://img.logo.dev/container-xchange.com?size=256',
        description: 'Container trading and leasing platform'
    }
];

// Initialize partners page
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
    
    // Initialize contact dropdown
    if (typeof initContactDropdown === 'function') {
        initContactDropdown();
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
    
    // Render partners
    renderPartners();
});

// Render all partners
function renderPartners() {
    const partnersGrid = document.getElementById('partners-grid');
    if (!partnersGrid) return;
    
    partnersGrid.innerHTML = '';
    
    partnersData.forEach(partner => {
        const partnerCard = createPartnerCard(partner);
        partnersGrid.appendChild(partnerCard);
    });
}

// Create partner card element
function createPartnerCard(partner) {
    const card = document.createElement('div');
    card.className = 'partner-card';
    
    // Use Clearbit logo API - logos are typically dark, so we'll invert them
    // Container xChange might need special handling if logo is white
    const needsInversion = !partner.logoUrl.includes('xchange') || partner.logoUrl.includes('white');
    
    card.innerHTML = `
        <div class="partner-card-content">
            <a href="${partner.url}" target="_blank" rel="noopener noreferrer" class="partner-link">
                <div class="partner-logo-container">
                    <img src="${partner.logoUrl}" alt="${partner.name} Logo" class="partner-logo" data-invert="true" onerror="this.onerror=null; this.src=''; this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div class="partner-icon-fallback" style="display: none;">
                        <i class="fas fa-handshake"></i>
                    </div>
                </div>
                <h3 class="partner-card-title">${partner.name}</h3>
                <p class="partner-card-description">${partner.description}</p>
                <div class="partner-visit-link">
                    <span>Visit Website</span>
                    <i class="fas fa-external-link-alt"></i>
                </div>
            </a>
        </div>
    `;
    
    return card;
}

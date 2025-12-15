// Partners data
const partnersData = [
    {
        name: 'SeaRates',
        url: 'https://www.searates.com',
        icon: 'fa-ship',
        description: 'Global shipping rates and freight quotes'
    },
    {
        name: 'AirRates',
        url: 'https://www.airrates.com',
        icon: 'fa-plane',
        description: 'Air freight rates and logistics solutions'
    },
    {
        name: 'Freightos',
        url: 'https://www.freightos.com',
        icon: 'fa-boxes',
        description: 'Digital freight marketplace and booking platform'
    },
    {
        name: 'Container xChange',
        url: 'https://www.container-xchange.com',
        icon: 'fa-shipping-fast',
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
    
    card.innerHTML = `
        <div class="partner-card-content">
            <a href="${partner.url}" target="_blank" rel="noopener noreferrer" class="partner-link">
                <div class="partner-icon">
                    <i class="fas ${partner.icon}"></i>
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

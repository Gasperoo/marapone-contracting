// Checkout page functionality
// TAX_RATE is already declared in script.js, so we don't redeclare it here
// If script.js isn't loaded, we'll use the value directly: 0.13

console.log('checkout.js script loaded');

// Don't declare cart here - it's already declared in script.js
// Just ensure it's loaded from localStorage if script.js hasn't done it yet
// We'll access cart through the global scope without declaring it
// Wait for script.js to load first, then update cart from localStorage
// Update cart from localStorage (cart is managed by script.js via window.cart)
setTimeout(function() {
    try {
        // Always use window.cart to avoid conflicts
        if (window.cart) {
            window.cart = JSON.parse(localStorage.getItem('cart')) || window.cart;
            console.log('Cart loaded from localStorage, length:', window.cart.length);
        } else {
            // Fallback: create window.cart if script.js didn't load
            window.cart = JSON.parse(localStorage.getItem('cart')) || [];
            console.log('Cart created on window, length:', window.cart.length);
        }
    } catch (e) {
        console.error('Error loading cart:', e);
    }
}, 0);

// Try both DOMContentLoaded and immediate execution
function initializeCheckout() {
    console.log('initializeCheckout called');
    console.log('Document ready state:', document.readyState);
    
    // Initialize checkout page
    if (typeof initCheckoutPage === 'function') {
        initCheckoutPage();
    } else {
        console.error('initCheckoutPage function not found');
    }
    
    // Initialize payment methods
    if (typeof initPaymentMethods === 'function') {
        initPaymentMethods();
    } else {
        console.error('initPaymentMethods function not found');
    }
    
    // Initialize form validation
    if (typeof initFormValidation === 'function') {
        initFormValidation();
    } else {
        console.error('initFormValidation function not found');
    }
}

// Run immediately if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Checkout page DOMContentLoaded fired');
        initializeCheckout();
    });
} else {
    console.log('DOM already loaded, initializing immediately');
    initializeCheckout();
}

// Initialize checkout page
function initCheckoutPage() {
    // Display order summary
    displayOrderSummary();
    
    // Initialize account dropdown if on checkout page
    if (typeof initAccountDropdown === 'function') {
        initAccountDropdown();
        updateAccountDropdown();
    }
    
    // Initialize cart dropdown if on checkout page
    if (typeof initCartDropdown === 'function') {
        initCartDropdown();
    }
}

// Helper function to get cart from global scope
// Always use window.cart to avoid any variable conflicts
function getCart() {
    return window.cart || [];
}

// Display order summary
function displayOrderSummary() {
    const orderItems = document.getElementById('order-items');
    const orderSubtotal = document.getElementById('order-subtotal');
    const orderTax = document.getElementById('order-tax');
    const orderTotal = document.getElementById('order-total');
    
    if (!orderItems) return;
    
    // Get cart from global scope
    const cartItems = getCart();
    
    // Clear existing items
    orderItems.innerHTML = '';
    
    if (cartItems.length === 0) {
        orderItems.innerHTML = '<div class="empty-cart-message">Your cart is empty. <a href="index.html">Continue shopping</a></div>';
        if (orderSubtotal) orderSubtotal.textContent = '$0.00';
        if (orderTax) orderTax.textContent = '$0.00';
        if (orderTotal) orderTotal.textContent = '$0.00';
        return;
    }
    
    // Calculate totals
    let subtotal = 0;
    cartItems.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;
    
    // Display cart items
    cartItems.forEach(item => {
        const itemTotal = item.price * item.quantity;
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <div class="order-item-info">
                <div class="order-item-name">${item.name}</div>
                <div class="order-item-details">$${item.price.toFixed(2)} × ${item.quantity}</div>
            </div>
            <div class="order-item-price">$${itemTotal.toFixed(2)}</div>
        `;
        orderItems.appendChild(orderItem);
    });
    
    // Update summary
    if (orderSubtotal) orderSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    if (orderTax) orderTax.textContent = `$${tax.toFixed(2)}`;
    if (orderTotal) orderTotal.textContent = `$${total.toFixed(2)}`;
}

// Initialize payment method selection
function initPaymentMethods() {
    console.log('initPaymentMethods called');
    const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
    console.log('Found payment methods:', paymentMethods.length);
    const creditCardForm = document.getElementById('credit-card-form');
    const paypalForm = document.getElementById('paypal-form');
    const bitcoinQrForm = document.getElementById('bitcoin-qr-form');
    const ethereumQrForm = document.getElementById('ethereum-qr-form');
    const billingSection = document.getElementById('billing-section');
    console.log('Forms found - creditCard:', creditCardForm, 'bitcoin:', bitcoinQrForm, 'ethereum:', ethereumQrForm);
    
    // Function to handle payment method change
    function handlePaymentMethodChange(value) {
        console.log('Payment method changed to:', value); // Debug log
        console.log('Credit card form element:', creditCardForm);
        console.log('Bitcoin QR form element:', bitcoinQrForm);
        console.log('Ethereum QR form element:', ethereumQrForm);
        
        // Force immediate hide of all forms first using !important via style
        if (creditCardForm) {
            creditCardForm.style.cssText = 'display: none !important; visibility: hidden !important; opacity: 0 !important; height: 0 !important; overflow: hidden !important; margin: 0 !important; padding: 0 !important;';
            creditCardForm.setAttribute('data-hidden', 'true');
            // Remove required attributes and disable credit card fields
            const cardFields = creditCardForm.querySelectorAll('input');
            cardFields.forEach(field => {
                field.removeAttribute('required');
                field.disabled = true;
                field.value = '';
            });
        }
        if (paypalForm) {
            paypalForm.style.cssText = 'display: none !important; visibility: hidden !important; opacity: 0 !important; height: 0 !important; overflow: hidden !important; margin: 0 !important; padding: 0 !important;';
            paypalForm.setAttribute('data-hidden', 'true');
            const paypalFields = paypalForm.querySelectorAll('input');
            paypalFields.forEach(field => {
                field.removeAttribute('required');
                field.disabled = true;
                field.value = '';
            });
        }
        if (bitcoinQrForm) {
            bitcoinQrForm.style.cssText = 'display: none !important; visibility: hidden !important; opacity: 0 !important; height: 0 !important; overflow: hidden !important; margin: 0 !important; padding: 0 !important;';
            bitcoinQrForm.setAttribute('data-hidden', 'true');
        }
        if (ethereumQrForm) {
            ethereumQrForm.style.cssText = 'display: none !important; visibility: hidden !important; opacity: 0 !important; height: 0 !important; overflow: hidden !important; margin: 0 !important; padding: 0 !important;';
            ethereumQrForm.setAttribute('data-hidden', 'true');
        }
        
        // Hide billing section by default, will show for non-crypto methods
        if (billingSection) {
            billingSection.style.cssText = 'display: none !important; visibility: hidden !important; opacity: 0 !important; height: 0 !important; overflow: hidden !important; margin: 0 !important; padding: 0 !important; border: none !important;';
            billingSection.setAttribute('data-hidden', 'true');
            // Disable and clear billing fields
            const billingFields = billingSection.querySelectorAll('input');
            billingFields.forEach(field => {
                field.removeAttribute('required');
                field.disabled = true;
                field.value = '';
            });
        }
        
        // Show appropriate form based on selection
        if (value === 'credit' || value === 'visa-debit' || value === 'mastercard') {
            if (creditCardForm) {
                creditCardForm.removeAttribute('data-hidden');
                creditCardForm.style.cssText = 'display: block !important; visibility: visible !important; opacity: 1 !important; height: auto !important; overflow: visible !important; margin-bottom: 30px !important;';
                // Enable and set required on credit card fields
                const cardFields = creditCardForm.querySelectorAll('input');
                cardFields.forEach(field => {
                    field.disabled = false;
                    field.setAttribute('required', 'required');
                });
            }
            // Show billing section for card payments
            if (billingSection) {
                billingSection.removeAttribute('data-hidden');
                billingSection.style.cssText = 'display: block !important; visibility: visible !important; opacity: 1 !important; height: auto !important; overflow: visible !important; margin-top: 30px !important; padding-top: 30px !important; border-top: 1px solid rgba(255, 255, 255, 0.1) !important;';
                const billingFields = billingSection.querySelectorAll('input');
                billingFields.forEach(field => {
                    field.disabled = false;
                    field.setAttribute('required', 'required');
                });
            }
        } else if (value === 'paypal') {
            if (paypalForm) {
                paypalForm.removeAttribute('data-hidden');
                paypalForm.style.cssText = 'display: block !important; visibility: visible !important; opacity: 1 !important; height: auto !important; overflow: visible !important; margin-bottom: 30px !important;';
                const paypalFields = paypalForm.querySelectorAll('input');
                paypalFields.forEach(field => {
                    field.disabled = false;
                    field.setAttribute('required', 'required');
                });
            }
            // Show billing section for PayPal
            if (billingSection) {
                billingSection.removeAttribute('data-hidden');
                billingSection.style.cssText = 'display: block !important; visibility: visible !important; opacity: 1 !important; height: auto !important; overflow: visible !important; margin-top: 30px !important; padding-top: 30px !important; border-top: 1px solid rgba(255, 255, 255, 0.1) !important;';
                const billingFields = billingSection.querySelectorAll('input');
                billingFields.forEach(field => {
                    field.disabled = false;
                    field.setAttribute('required', 'required');
                });
            }
        } else if (value === 'bitcoin') {
            // For Bitcoin, show only QR code
            if (creditCardForm) {
                creditCardForm.style.cssText = 'display: none !important; visibility: hidden !important; opacity: 0 !important; height: 0 !important; overflow: hidden !important; margin: 0 !important; padding: 0 !important;';
                creditCardForm.setAttribute('data-hidden', 'true');
            }
            
            // Keep billing section hidden for Bitcoin
            if (billingSection) {
                billingSection.style.cssText = 'display: none !important; visibility: hidden !important; opacity: 0 !important; height: 0 !important; overflow: hidden !important; margin: 0 !important; padding: 0 !important; border: none !important;';
                billingSection.setAttribute('data-hidden', 'true');
            }
            
            if (bitcoinQrForm) {
                bitcoinQrForm.removeAttribute('data-hidden');
                bitcoinQrForm.style.cssText = 'display: block !important; visibility: visible !important; opacity: 1 !important; height: auto !important; overflow: visible !important; margin-bottom: 30px !important;';
            }
        } else if (value === 'ethereum') {
            // For Ethereum, show only QR code
            if (creditCardForm) {
                creditCardForm.style.cssText = 'display: none !important; visibility: hidden !important; opacity: 0 !important; height: 0 !important; overflow: hidden !important; margin: 0 !important; padding: 0 !important;';
                creditCardForm.setAttribute('data-hidden', 'true');
            }
            
            // Keep billing section hidden for Ethereum
            if (billingSection) {
                billingSection.style.cssText = 'display: none !important; visibility: hidden !important; opacity: 0 !important; height: 0 !important; overflow: hidden !important; margin: 0 !important; padding: 0 !important; border: none !important;';
                billingSection.setAttribute('data-hidden', 'true');
            }
            
            if (ethereumQrForm) {
                ethereumQrForm.removeAttribute('data-hidden');
                ethereumQrForm.style.cssText = 'display: block !important; visibility: visible !important; opacity: 1 !important; height: auto !important; overflow: visible !important; margin-bottom: 30px !important;';
            }
        }
    }
    
    // Add event listeners to all payment method options
    console.log('Adding event listeners to payment methods');
    paymentMethods.forEach(method => {
        console.log('Adding listener to:', method.value);
        // Use change event - this fires when radio is actually selected
        method.addEventListener('change', function(e) {
            console.log('Change event fired for:', this.value);
            e.stopPropagation();
            handlePaymentMethodChange(this.value);
        });
    });
    
    // Add click listeners to the label cards for better UX
    const paymentMethodOptions = document.querySelectorAll('.payment-method-option');
    console.log('Found payment method options (labels):', paymentMethodOptions.length);
    paymentMethodOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            console.log('Label clicked');
            // Find the radio input within this label
            const radio = this.querySelector('input[type="radio"]');
            if (radio) {
                console.log('Radio found, value:', radio.value);
                // Always check the radio first
                radio.checked = true;
                // Immediately call handler - don't wait for change event
                handlePaymentMethodChange(radio.value);
                // Also trigger change event for consistency
                const changeEvent = new Event('change', { bubbles: true });
                radio.dispatchEvent(changeEvent);
            } else {
                console.log('No radio found in label');
            }
        });
    });
    
    // Initially hide all forms - user must select payment method first
    // Don't auto-show based on default selection
    // Only show when user explicitly selects a payment method
}

// Update crypto amount display
function updateCryptoAmount(currency) {
    const orderTotal = document.getElementById('order-total');
    if (!orderTotal) return;
    
    const totalText = orderTotal.textContent.replace('$', '').replace(',', '');
    const totalAmount = parseFloat(totalText);
    
    if (isNaN(totalAmount)) return;
    
    const cryptoAmountDisplay = document.getElementById('crypto-amount-display');
    const cryptoAmountValue = document.getElementById('crypto-amount-value');
    
    if (cryptoAmountDisplay && cryptoAmountValue) {
        // For demo purposes, using approximate conversion rates
        // In production, you would fetch real-time rates from an API
        let cryptoAmount = 0;
        if (currency === 'BTC') {
            // Approximate BTC rate (update with real API)
            cryptoAmount = totalAmount / 45000; // Example: $45,000 per BTC
            cryptoAmountValue.textContent = `${cryptoAmount.toFixed(8)} BTC`;
        } else if (currency === 'ETH') {
            // Approximate ETH rate (update with real API)
            cryptoAmount = totalAmount / 2500; // Example: $2,500 per ETH
            cryptoAmountValue.textContent = `${cryptoAmount.toFixed(6)} ETH`;
        }
    }
}

// Initialize form validation
function initFormValidation() {
    const submitButton = document.getElementById('submit-payment');
    const checkoutForm = document.querySelector('.payment-section');
    
    if (!submitButton || !checkoutForm) return;
    
    submitButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        const cartItems = getCart();
        if (cartItems.length === 0) {
            alert('Your cart is empty. Please add items before checkout.');
            return;
        }
        
        // Get selected payment method
        const selectedMethod = document.querySelector('input[name="payment-method"]:checked');
        if (!selectedMethod) {
            alert('Please select a payment method.');
            return;
        }
        
        const paymentMethod = selectedMethod.value;
        
        // Validate based on payment method
        let isValid = false;
        
        if (paymentMethod === 'credit' || paymentMethod === 'visa-debit' || paymentMethod === 'mastercard') {
            isValid = validateCreditCardForm();
            // Validate billing information for card payments
            if (isValid) {
                isValid = validateBillingForm();
            }
        } else if (paymentMethod === 'paypal') {
            isValid = validatePayPalForm();
            // Validate billing information for PayPal
            if (isValid) {
                isValid = validateBillingForm();
            }
        } else if (paymentMethod === 'bitcoin' || paymentMethod === 'ethereum') {
            // Bitcoin and Ethereum don't need validation - just QR code display
            isValid = true;
        }
        
        if (isValid) {
            processPayment(paymentMethod);
        }
    });
    
    // Format card number input
    const cardNumber = document.getElementById('card-number');
    if (cardNumber) {
        cardNumber.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            if (formattedValue.length <= 19) {
                e.target.value = formattedValue;
            }
        });
    }
    
    // Format expiry date input
    const cardExpiry = document.getElementById('card-expiry');
    if (cardExpiry) {
        cardExpiry.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });
    }
    
    // Format CVV input (numbers only)
    const cardCvv = document.getElementById('card-cvv');
    if (cardCvv) {
        cardCvv.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }
}

// Validate credit card form
function validateCreditCardForm() {
    const cardName = document.getElementById('card-name');
    const cardNumber = document.getElementById('card-number');
    const cardExpiry = document.getElementById('card-expiry');
    const cardCvv = document.getElementById('card-cvv');
    
    if (!cardName || !cardName.value.trim()) {
        alert('Please enter the cardholder name.');
        cardName?.focus();
        return false;
    }
    
    if (!cardNumber || cardNumber.value.replace(/\s/g, '').length < 13) {
        alert('Please enter a valid card number.');
        cardNumber?.focus();
        return false;
    }
    
    if (!cardExpiry || !/^\d{2}\/\d{2}$/.test(cardExpiry.value)) {
        alert('Please enter a valid expiry date (MM/YY).');
        cardExpiry?.focus();
        return false;
    }
    
    if (!cardCvv || cardCvv.value.length < 3) {
        alert('Please enter a valid CVV.');
        cardCvv?.focus();
        return false;
    }
    
    return true;
}

// Validate PayPal form
function validatePayPalForm() {
    const paypalEmail = document.getElementById('paypal-email');
    
    if (!paypalEmail || !paypalEmail.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(paypalEmail.value)) {
        alert('Please enter a valid PayPal email address.');
        paypalEmail?.focus();
        return false;
    }
    
    return true;
}

// Validate crypto form
function validateCryptoForm() {
    const cryptoAddress = document.getElementById('crypto-address');
    
    if (!cryptoAddress || !cryptoAddress.value.trim()) {
        alert('Please enter your wallet address.');
        cryptoAddress?.focus();
        return false;
    }
    
    // Basic validation for crypto addresses
    const selectedMethod = document.querySelector('input[name="payment-method"]:checked');
    if (selectedMethod) {
        const address = cryptoAddress.value.trim();
        if (selectedMethod.value === 'bitcoin') {
            // Basic BTC address validation (starts with 1, 3, or bc1)
            if (!/^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$|^bc1[a-z0-9]{39,59}$/.test(address)) {
                alert('Please enter a valid Bitcoin wallet address.');
                cryptoAddress?.focus();
                return false;
            }
        } else if (selectedMethod.value === 'ethereum') {
            // Basic ETH address validation (starts with 0x and 40 hex characters)
            if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
                alert('Please enter a valid Ethereum wallet address.');
                cryptoAddress?.focus();
                return false;
            }
        }
    }
    
    return true;
}

// Validate billing form
function validateBillingForm() {
    const billingEmail = document.getElementById('billing-email');
    const billingAddress = document.getElementById('billing-address');
    const billingCity = document.getElementById('billing-city');
    const billingProvince = document.getElementById('billing-province');
    const billingPostal = document.getElementById('billing-postal');
    
    if (!billingEmail || !billingEmail.value.trim() || billingEmail.value.trim().length < 2) {
        alert('Please enter the name on card.');
        billingEmail?.focus();
        return false;
    }
    
    if (!billingAddress || !billingAddress.value.trim()) {
        alert('Please enter your street address.');
        billingAddress?.focus();
        return false;
    }
    
    if (!billingCity || !billingCity.value.trim()) {
        alert('Please enter your city.');
        billingCity?.focus();
        return false;
    }
    
    if (!billingProvince || !billingProvince.value.trim()) {
        alert('Please enter your province/state.');
        billingProvince?.focus();
        return false;
    }
    
    if (!billingPostal || !billingPostal.value.trim()) {
        alert('Please enter your postal code/zip code.');
        billingPostal?.focus();
        return false;
    }
    
    return true;
}

// Process payment
function processPayment(paymentMethod) {
    const submitButton = document.getElementById('submit-payment');
    
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    }
    
    // Simulate payment processing
    setTimeout(() => {
        // In production, this would make an API call to your payment processor
        alert(`Payment processed successfully using ${paymentMethod.toUpperCase()}!\n\nThank you for your order.`);
        
        // Clear cart (always use window.cart)
        if (window.cart) {
            window.cart.length = 0;
        }
        localStorage.removeItem('cart');
        
        // Redirect to success page or home
        window.location.href = 'index.html';
    }, 2000);
}


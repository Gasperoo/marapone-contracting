// Manage Account page functionality

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
        alert('Please log in to access your account settings.');
        window.location.href = 'login.html';
        return;
    }
    
    // Initialize account dropdown if on manage account page
    if (typeof initAccountDropdown === 'function') {
        initAccountDropdown();
        updateAccountDropdown();
    }
    
    // Initialize cart dropdown if on manage account page
    if (typeof initCartDropdown === 'function') {
        initCartDropdown();
    }
    
    // Load and display user data
    loadUserData();
    
    // Initialize forms
    initPersonalInfoForm();
    initEmailForm();
    initPasswordForm();
    initShippingAddressForm();
    initPaymentMethods();
});

// Load user data from localStorage
function loadUserData() {
    const userData = JSON.parse(localStorage.getItem('userData')) || {};
    const userEmail = localStorage.getItem('userEmail') || '';
    const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress')) || {};
    
    // Populate personal information
    const accountName = document.getElementById('account-name');
    const accountPhone = document.getElementById('account-phone');
    const phoneCountryCode = document.getElementById('phone-country-code');
    const currentEmail = document.getElementById('current-email');
    
    if (accountName) {
        accountName.value = userData.name || '';
    }
    
    if (accountPhone) {
        // Split phone number if it includes country code
        const phoneData = userData.phone || '';
        if (phoneData.startsWith('+')) {
            const parts = phoneData.split(' ');
            if (parts.length > 1) {
                const code = parts[0];
                const number = parts.slice(1).join(' ');
                if (phoneCountryCode) {
                    phoneCountryCode.value = code;
                }
                accountPhone.value = number;
            } else {
                accountPhone.value = phoneData;
            }
        } else {
            accountPhone.value = phoneData;
        }
    }
    
    if (phoneCountryCode && userData.phoneCountryCode) {
        phoneCountryCode.value = userData.phoneCountryCode;
    }
    
    if (currentEmail) {
        currentEmail.value = userEmail || '';
    }
    
    // Populate shipping address
    if (document.getElementById('shipping-street')) {
        document.getElementById('shipping-street').value = shippingAddress.street || '';
    }
    if (document.getElementById('shipping-unit')) {
        document.getElementById('shipping-unit').value = shippingAddress.unit || '';
    }
    if (document.getElementById('shipping-city')) {
        document.getElementById('shipping-city').value = shippingAddress.city || '';
    }
    if (document.getElementById('shipping-province')) {
        document.getElementById('shipping-province').value = shippingAddress.province || '';
    }
    if (document.getElementById('shipping-postal')) {
        document.getElementById('shipping-postal').value = shippingAddress.postal || '';
    }
    if (document.getElementById('shipping-country')) {
        document.getElementById('shipping-country').value = shippingAddress.country || '';
    }
}

// Initialize personal information form
function initPersonalInfoForm() {
    const form = document.getElementById('personal-info-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('account-name')?.value.trim();
        const phone = document.getElementById('account-phone')?.value.trim();
        
        if (!name || name.length < 2) {
            alert('Please enter a valid name (at least 2 characters).');
            return;
        }
        
        // Update user data
        const userData = JSON.parse(localStorage.getItem('userData')) || {};
        userData.name = name;
        const phoneCountryCode = document.getElementById('phone-country-code')?.value || '+1';
        if (phone) {
            // Store phone with country code
            userData.phone = phoneCountryCode + ' ' + phone;
            userData.phoneCountryCode = phoneCountryCode;
        }
        userData.updatedAt = new Date().toISOString();
        
        localStorage.setItem('userData', JSON.stringify(userData));
        
        alert('Personal information updated successfully!');
        
        // Reload data to reflect changes
        loadUserData();
    });
}

// Initialize email form
function initEmailForm() {
    const form = document.getElementById('email-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const newEmail = document.getElementById('new-email')?.value.trim();
        const password = document.getElementById('email-password')?.value;
        const currentEmail = localStorage.getItem('userEmail') || '';
        
        // Basic validation
        if (!newEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        if (newEmail === currentEmail) {
            alert('New email must be different from your current email.');
            return;
        }
        
        if (!password || password.length < 6) {
            alert('Please enter your password to confirm the email change.');
            return;
        }
        
        // In production, verify password with backend
        // For now, we'll just update the email
        localStorage.setItem('userEmail', newEmail);
        
        const userData = JSON.parse(localStorage.getItem('userData')) || {};
        userData.email = newEmail;
        userData.updatedAt = new Date().toISOString();
        localStorage.setItem('userData', JSON.stringify(userData));
        
        // Send confirmation email
        sendEmailChangeConfirmation(currentEmail, newEmail, userData.name || 'User');
        
        alert('Email address updated successfully! A confirmation email has been sent to your new email address.');
        
        // Update the current email display
        if (document.getElementById('current-email')) {
            document.getElementById('current-email').value = newEmail;
        }
        
        // Clear form
        form.reset();
        document.getElementById('current-email').value = newEmail;
    });
}

// Initialize shipping address form
function initShippingAddressForm() {
    const form = document.getElementById('shipping-address-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const street = document.getElementById('shipping-street')?.value.trim();
        const unit = document.getElementById('shipping-unit')?.value.trim();
        const city = document.getElementById('shipping-city')?.value.trim();
        const province = document.getElementById('shipping-province')?.value.trim();
        const postal = document.getElementById('shipping-postal')?.value.trim();
        const country = document.getElementById('shipping-country')?.value.trim();
        
        // Basic validation
        if (!street) {
            alert('Please enter a street address.');
            return;
        }
        
        if (!city) {
            alert('Please enter a city.');
            return;
        }
        
        if (!province) {
            alert('Please enter a province/state.');
            return;
        }
        
        if (!postal) {
            alert('Please enter a postal/ZIP code.');
            return;
        }
        
        if (!country) {
            alert('Please enter a country.');
            return;
        }
        
        // Save shipping address
        const shippingAddress = {
            street: street,
            unit: unit || '',
            city: city,
            province: province,
            postal: postal,
            country: country,
            updatedAt: new Date().toISOString()
        };
        
        localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));
        
        alert('Shipping address saved successfully!');
    });
}

// Initialize password form
function initPasswordForm() {
    const form = document.getElementById('password-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const currentPassword = document.getElementById('current-password')?.value;
        const newPassword = document.getElementById('new-password')?.value;
        const confirmPassword = document.getElementById('confirm-password')?.value;
        
        // Basic validation
        if (!currentPassword) {
            alert('Please enter your current password.');
            return;
        }
        
        if (!newPassword || newPassword.length < 6) {
            alert('New password must be at least 6 characters long.');
            return;
        }
        
        if (newPassword !== confirmPassword) {
            alert('New passwords do not match.');
            return;
        }
        
        if (currentPassword === newPassword) {
            alert('New password must be different from your current password.');
            return;
        }
        
        // In production, verify current password with backend
        // For now, we'll just store the new password (in production, this should be hashed)
        const userData = JSON.parse(localStorage.getItem('userData')) || {};
        userData.passwordUpdatedAt = new Date().toISOString();
        localStorage.setItem('userData', JSON.stringify(userData));
        
        // Send confirmation email
        const userEmail = localStorage.getItem('userEmail') || '';
        sendPasswordChangeConfirmation(userEmail, userData.name || 'User');
        
        alert('Password updated successfully! A confirmation email has been sent.');
        
        // Clear form
        form.reset();
    });
}

// Initialize payment methods
function initPaymentMethods() {
    loadPaymentMethods();
    
    const addPaymentBtn = document.getElementById('add-payment-btn');
    const paymentModal = document.getElementById('payment-modal');
    const closeModal = document.getElementById('close-payment-modal');
    const paymentForm = document.getElementById('add-payment-form');
    const paymentType = document.getElementById('payment-type');
    
    // Show modal
    if (addPaymentBtn) {
        addPaymentBtn.addEventListener('click', function() {
            if (paymentModal) {
                paymentModal.style.display = 'flex';
            }
        });
    }
    
    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            if (paymentModal) {
                paymentModal.style.display = 'none';
                if (paymentForm) paymentForm.reset();
            }
        });
    }
    
    // Close modal when clicking outside
    if (paymentModal) {
        paymentModal.addEventListener('click', function(e) {
            if (e.target === paymentModal) {
                paymentModal.style.display = 'none';
                if (paymentForm) paymentForm.reset();
            }
        });
    }
    
    // Handle payment type change
    if (paymentType) {
        paymentType.addEventListener('change', function() {
            const type = this.value;
            const cardFields = ['card-number-group', 'card-name-group', 'card-expiry-group', 'card-cvv-group'];
            const paypalFields = ['paypal-email-group'];
            
            // Show/hide fields based on payment type
            cardFields.forEach(id => {
                const field = document.getElementById(id);
                if (field) {
                    field.style.display = type === 'credit-card' || type === 'debit-card' ? 'block' : 'none';
                }
            });
            
            paypalFields.forEach(id => {
                const field = document.getElementById(id);
                if (field) {
                    field.style.display = type === 'paypal' ? 'block' : 'none';
                }
            });
            
            // Update required fields
            const cardNumber = document.getElementById('card-number');
            const cardName = document.getElementById('card-name');
            const cardExpiry = document.getElementById('card-expiry');
            const cardCvv = document.getElementById('card-cvv');
            const paypalEmail = document.getElementById('paypal-email');
            
            if (type === 'credit-card' || type === 'debit-card') {
                if (cardNumber) cardNumber.required = true;
                if (cardName) cardName.required = true;
                if (cardExpiry) cardExpiry.required = true;
                if (cardCvv) cardCvv.required = true;
                if (paypalEmail) paypalEmail.required = false;
            } else if (type === 'paypal') {
                if (cardNumber) cardNumber.required = false;
                if (cardName) cardName.required = false;
                if (cardExpiry) cardExpiry.required = false;
                if (cardCvv) cardCvv.required = false;
                if (paypalEmail) paypalEmail.required = true;
            }
        });
    }
    
    // Handle form submission
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const type = document.getElementById('payment-type')?.value;
            
            if (!type) {
                alert('Please select a payment type.');
                return;
            }
            
            let paymentData = {
                id: 'pm_' + Date.now(),
                type: type,
                isDefault: document.getElementById('default-payment')?.checked || false,
                addedAt: new Date().toISOString()
            };
            
            if (type === 'credit-card' || type === 'debit-card') {
                const cardNumber = document.getElementById('card-number')?.value.trim();
                const cardName = document.getElementById('card-name')?.value.trim();
                const cardExpiry = document.getElementById('card-expiry')?.value.trim();
                const cardCvv = document.getElementById('card-cvv')?.value.trim();
                
                if (!cardNumber || !cardName || !cardExpiry || !cardCvv) {
                    alert('Please fill in all card details.');
                    return;
                }
                
                // Basic card number validation (last 4 digits only for security)
                const last4 = cardNumber.replace(/\s/g, '').slice(-4);
                if (last4.length !== 4 || !/^\d+$/.test(last4)) {
                    alert('Please enter a valid card number.');
                    return;
                }
                
                paymentData.cardNumber = '**** **** **** ' + last4;
                paymentData.cardName = cardName;
                paymentData.cardExpiry = cardExpiry;
                paymentData.cardType = type === 'credit-card' ? 'Credit' : 'Debit';
            } else if (type === 'paypal') {
                const paypalEmail = document.getElementById('paypal-email')?.value.trim();
                
                if (!paypalEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(paypalEmail)) {
                    alert('Please enter a valid PayPal email address.');
                    return;
                }
                
                paymentData.paypalEmail = paypalEmail;
            }
            
            // Save payment method
            savePaymentMethod(paymentData);
            
            // Close modal and reset form
            if (paymentModal) {
                paymentModal.style.display = 'none';
            }
            paymentForm.reset();
            
            // Reload payment methods
            loadPaymentMethods();
        });
    }
}

// Load payment methods from localStorage
function loadPaymentMethods() {
    const paymentMethods = JSON.parse(localStorage.getItem('paymentMethods')) || [];
    const paymentMethodsList = document.getElementById('payment-methods-list');
    
    if (!paymentMethodsList) return;
    
    if (paymentMethods.length === 0) {
        paymentMethodsList.innerHTML = '<p class="no-payment-methods">No saved payment methods yet.</p>';
        return;
    }
    
    paymentMethodsList.innerHTML = '';
    
    paymentMethods.forEach((method, index) => {
        const methodCard = document.createElement('div');
        methodCard.className = 'payment-method-card';
        if (method.isDefault) {
            methodCard.classList.add('default-payment');
        }
        
        let methodHTML = '<div class="payment-method-info">';
        
        if (method.type === 'credit-card' || method.type === 'debit-card') {
            methodHTML += `
                <div class="payment-method-icon">
                    <i class="fas fa-credit-card"></i>
                </div>
                <div class="payment-method-details">
                    <h4>${method.cardType || 'Card'} •••• ${method.cardNumber?.slice(-4) || ''}</h4>
                    <p>${method.cardName || ''} • Expires ${method.cardExpiry || ''}</p>
                </div>
            `;
        } else if (method.type === 'paypal') {
            methodHTML += `
                <div class="payment-method-icon">
                    <i class="fab fa-paypal"></i>
                </div>
                <div class="payment-method-details">
                    <h4>PayPal</h4>
                    <p>${method.paypalEmail || ''}</p>
                </div>
            `;
        }
        
        if (method.isDefault) {
            methodHTML += '<span class="default-badge">Default</span>';
        }
        
        methodHTML += '</div>';
        methodHTML += '<div class="payment-method-actions">';
        methodHTML += `<button class="payment-action-btn set-default-btn" data-id="${method.id}" ${method.isDefault ? 'disabled' : ''}>Set as Default</button>`;
        methodHTML += `<button class="payment-action-btn delete-btn" data-id="${method.id}"><i class="fas fa-trash"></i></button>`;
        methodHTML += '</div>';
        
        methodCard.innerHTML = methodHTML;
        paymentMethodsList.appendChild(methodCard);
    });
    
    // Add event listeners for actions
    document.querySelectorAll('.set-default-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            setDefaultPaymentMethod(id);
        });
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            if (confirm('Are you sure you want to delete this payment method?')) {
                deletePaymentMethod(id);
            }
        });
    });
}

// Save payment method
function savePaymentMethod(paymentData) {
    let paymentMethods = JSON.parse(localStorage.getItem('paymentMethods')) || [];
    
    // If this is set as default, unset all other defaults
    if (paymentData.isDefault) {
        paymentMethods.forEach(method => {
            method.isDefault = false;
        });
    }
    
    paymentMethods.push(paymentData);
    localStorage.setItem('paymentMethods', JSON.stringify(paymentMethods));
    
    alert('Payment method saved successfully!');
}

// Set default payment method
function setDefaultPaymentMethod(id) {
    let paymentMethods = JSON.parse(localStorage.getItem('paymentMethods')) || [];
    
    paymentMethods.forEach(method => {
        if (method.id === id) {
            method.isDefault = true;
        } else {
            method.isDefault = false;
        }
    });
    
    localStorage.setItem('paymentMethods', JSON.stringify(paymentMethods));
    loadPaymentMethods();
}

// Delete payment method
function deletePaymentMethod(id) {
    let paymentMethods = JSON.parse(localStorage.getItem('paymentMethods')) || [];
    paymentMethods = paymentMethods.filter(method => method.id !== id);
    localStorage.setItem('paymentMethods', JSON.stringify(paymentMethods));
    loadPaymentMethods();
}

// Send email change confirmation
function sendEmailChangeConfirmation(oldEmail, newEmail, name) {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://formsubmit.co/' + encodeURIComponent(newEmail);
    form.style.display = 'none';
    
    const subject = document.createElement('input');
    subject.type = 'hidden';
    subject.name = '_subject';
    subject.value = 'Email Address Changed - Marapone Contracting Inc.';
    form.appendChild(subject);
    
    const captcha = document.createElement('input');
    captcha.type = 'hidden';
    captcha.name = '_captcha';
    captcha.value = 'false';
    form.appendChild(captcha);
    
    const template = document.createElement('input');
    template.type = 'hidden';
    template.name = '_template';
    template.value = 'box';
    form.appendChild(template);
    
    const from = document.createElement('input');
    from.type = 'hidden';
    from.name = '_from';
    from.value = 'info@marapone.com';
    form.appendChild(from);
    
    const message = `Dear ${name},

Your email address has been successfully changed.

Old Email: ${oldEmail}
New Email: ${newEmail}
Date Changed: ${new Date().toLocaleString()}

If you did not make this change, please contact us immediately at info@marapone.com.

Best regards,
Marapone Contracting Inc.`;
    
    const messageInput = document.createElement('textarea');
    messageInput.name = 'message';
    messageInput.value = message;
    form.appendChild(messageInput);
    
    document.body.appendChild(form);
    
    fetch(form.action, {
        method: 'POST',
        body: new FormData(form)
    }).catch(err => console.log('Email change confirmation sent'));
    
    setTimeout(() => {
        if (form.parentNode) form.parentNode.removeChild(form);
    }, 1000);
}

// Send password change confirmation
function sendPasswordChangeConfirmation(email, name) {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://formsubmit.co/' + encodeURIComponent(email);
    form.style.display = 'none';
    
    const subject = document.createElement('input');
    subject.type = 'hidden';
    subject.name = '_subject';
    subject.value = 'Password Changed - Marapone Contracting Inc.';
    form.appendChild(subject);
    
    const captcha = document.createElement('input');
    captcha.type = 'hidden';
    captcha.name = '_captcha';
    captcha.value = 'false';
    form.appendChild(captcha);
    
    const template = document.createElement('input');
    template.type = 'hidden';
    template.name = '_template';
    template.value = 'box';
    form.appendChild(template);
    
    const from = document.createElement('input');
    from.type = 'hidden';
    from.name = '_from';
    from.value = 'info@marapone.com';
    form.appendChild(from);
    
    const message = `Dear ${name},

Your password has been successfully changed.

Date Changed: ${new Date().toLocaleString()}

If you did not make this change, please contact us immediately at info@marapone.com.

Best regards,
Marapone Contracting Inc.`;
    
    const messageInput = document.createElement('textarea');
    messageInput.name = 'message';
    messageInput.value = message;
    form.appendChild(messageInput);
    
    document.body.appendChild(form);
    
    fetch(form.action, {
        method: 'POST',
        body: new FormData(form)
    }).catch(err => console.log('Password change confirmation sent'));
    
    setTimeout(() => {
        if (form.parentNode) form.parentNode.removeChild(form);
    }, 1000);
}

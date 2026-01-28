import React, { useState, useEffect } from 'react';
import LiquidEther from '../components/LiquidEther';
import { getOptimizedSettings } from '../utils/detectWindows';
import { useCurrency } from '../context/CurrencyContext';
import '../styles/page.css';
import '../styles/cart.css';

export default function CartPage() {
  const isMobile = typeof window !== 'undefined' && (
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
    window.innerWidth <= 768
  );

  const settings = getOptimizedSettings(isMobile);
  const { formatPrice, convertPrice, currency } = useCurrency();

  // Load cart items from localStorage
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const loadCartItems = () => {
      const savedCart = localStorage.getItem('cartItems');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    };
    
    loadCartItems();
    
    // Listen for storage changes (when items are added from other pages)
    window.addEventListener('storage', loadCartItems);
    
    return () => window.removeEventListener('storage', loadCartItems);
  }, []);

  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);

  // Payment form states
  const [cardForm, setCardForm] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    postalCode: ''
  });

  const [paypalForm, setPaypalForm] = useState({
    email: ''
  });

  const [cryptoForm, setCryptoForm] = useState({
    walletAddress: '',
    network: 'ethereum'
  });

  const paymentMethods = [
    { 
      id: 'credit', 
      name: 'Credit Card', 
      iconSvg: (
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', justifyContent: 'center' }}>
          {/* Visa Logo */}
          <svg viewBox="0 0 60 20" xmlns="http://www.w3.org/2000/svg" style={{ width: '38px', height: '13px' }}>
            <text x="30" y="15" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle" fontStyle="italic">VISA</text>
          </svg>
          {/* Mastercard Logo */}
          <svg viewBox="0 0 32 20" xmlns="http://www.w3.org/2000/svg" style={{ width: '28px', height: '18px' }}>
            <circle cx="10" cy="10" r="8" fill="white" opacity="0.85"/>
            <circle cx="22" cy="10" r="8" fill="white" opacity="0.85"/>
            <path d="M16 4.5 A8 8 0 0 1 16 15.5 A8 8 0 0 0 16 4.5" fill="white"/>
          </svg>
          {/* American Express Logo */}
          <svg viewBox="0 0 40 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '32px', height: '19px' }}>
            <rect x="1" y="2" width="38" height="20" rx="2" fill="none" stroke="white" strokeWidth="1.5"/>
            <text x="20" y="15" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">AMEX</text>
          </svg>
        </div>
      )
    },
    { 
      id: 'debit', 
      name: 'Debit', 
      iconSvg: (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {/* Visa Logo */}
          <svg viewBox="0 0 60 20" xmlns="http://www.w3.org/2000/svg" style={{ width: '42px', height: '14px' }}>
            <text x="30" y="15" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle" fontStyle="italic">VISA</text>
          </svg>
          {/* Mastercard Logo */}
          <svg viewBox="0 0 32 20" xmlns="http://www.w3.org/2000/svg" style={{ width: '32px', height: '20px' }}>
            <circle cx="10" cy="10" r="8" fill="white" opacity="0.85"/>
            <circle cx="22" cy="10" r="8" fill="white" opacity="0.85"/>
            <path d="M16 4.5 A8 8 0 0 1 16 15.5 A8 8 0 0 0 16 4.5" fill="white"/>
          </svg>
        </div>
      )
    },
    { 
      id: 'apple', 
      name: 'Apple Pay', 
      iconSvg: (
        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" style={{ width: '40px', height: '40px' }}>
          <path d="M31.5 11.5c-1.3 1.4-3.4 2.5-5.4 2.3-.3-2.1.7-4.2 1.9-5.5 1.3-1.4 3.5-2.4 5.2-2.5.2 2.2-.6 4.3-1.7 5.7zm1.7 2.7c-2.9-.2-5.4 1.6-6.8 1.6-1.4 0-3.5-1.5-5.8-1.5-3 .1-5.8 1.8-7.3 4.5-3.1 5.4-.8 13.4 2.2 17.8 1.5 2.2 3.3 4.6 5.6 4.5 2.2-.1 3.1-1.4 5.8-1.4 2.6 0 3.5 1.4 5.8 1.4 2.4-.1 4-2.1 5.5-4.3 1.7-2.5 2.4-4.9 2.5-5-.1 0-4.7-1.8-4.8-7.1-.1-4.4 3.6-6.5 3.8-6.7-2.1-3-5.3-3.4-6.5-3.8z" fill="white"/>
        </svg>
      )
    },
    { 
      id: 'google', 
      name: 'Google Pay', 
      iconSvg: (
        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" style={{ width: '40px', height: '40px' }}>
          <path d="M24.5 20.5v7.2h10c-.4 2.5-2.9 7.3-10 7.3-6 0-11-5-11-11s5-11 11-11c3.4 0 5.7 1.5 7 2.7l5.7-5.5C34 6.3 29.6 4 24.5 4c-11 0-20 9-20 20s9 20 20 20c11.5 0 19.2-8.1 19.2-19.5 0-1.3-.1-2.3-.3-3.3H24.5z" fill="white"/>
        </svg>
      )
    },
    { 
      id: 'paypal', 
      name: 'PayPal', 
      iconSvg: (
        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" style={{ width: '40px', height: '40px' }}>
          <path d="M29.5 10h-10c-.7 0-1.3.5-1.4 1.2l-4 25c-.1.5.3 1 .8 1h4.5c.7 0 1.3-.5 1.4-1.2l1.1-6.8c.1-.7.7-1.2 1.4-1.2h3.2c6.6 0 10.4-3.2 11.4-9.5.4-2.7 0-4.9-1.4-6.4-1.5-1.5-4.1-2.1-7-2.1zm.9 9.4c-.5 3.5-3.2 3.5-5.8 3.5h-1.5l1-6.5c.1-.4.4-.7.8-.7h.7c1.9 0 3.6 0 4.5.9.5.5.7 1.3.3 2.8z" fill="white"/>
          <path d="M16.5 10h-10c-.7 0-1.3.5-1.4 1.2l-4 25c-.1.5.3 1 .8 1h4.8c.5 0 .9-.3 1-.8l1.1-7c.1-.7.7-1.2 1.4-1.2h3.2c6.6 0 10.4-3.2 11.4-9.5.4-2.7 0-4.9-1.4-6.4-1.5-1.5-4.1-2.1-7-2.1zm.9 9.4c-.5 3.5-3.2 3.5-5.8 3.5h-1.5l1-6.5c.1-.4.4-.7.8-.7h.7c1.9 0 3.6 0 4.5.9.5.5.7 1.3.3 2.8z" fill="white" opacity="0.7"/>
        </svg>
      )
    },
    { 
      id: 'bitcoin', 
      name: 'Bitcoin', 
      iconSvg: (
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ width: '40px', height: '40px' }}>
          <circle cx="16" cy="16" r="15" fill="none" stroke="white" strokeWidth="1.5"/>
          <path d="M23.189 14.02c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84-1.728-.43-.69 2.765c-.454-.114-.92-.22-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.746-.17-1.104-.26l.002-.009-2.384-.595-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.183-.045-1.13 4.532c-.086.212-.303.531-.793.41.018.025-1.256-.313-1.256-.313l-.858 1.978 2.25.561c.418.105.828.215 1.231.318l-.715 2.872 1.727.43.708-2.84c.472.127.93.245 1.378.357l-.706 2.828 1.728.43.715-2.866c2.948.558 5.164.333 6.097-2.333.752-2.146-.037-3.385-1.588-4.192 1.13-.26 1.98-1.003 2.207-2.538zm-3.95 5.538c-.533 2.147-4.148.986-5.32.695l.95-3.805c1.172.293 4.929.872 4.37 3.11zm.535-5.569c-.487 1.953-3.495.96-4.47.717l.86-3.45c.975.243 4.118.696 3.61 2.733z" fill="white"/>
        </svg>
      )
    },
    { 
      id: 'ethereum', 
      name: 'Ethereum', 
      iconSvg: (
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ width: '40px', height: '40px' }}>
          <circle cx="16" cy="16" r="15" fill="none" stroke="white" strokeWidth="1.5"/>
          <path d="M16 4L15.7 5.1v13.5l.3.3 6.5-3.8L16 4z" fill="white" opacity="0.6"/>
          <path d="M16 4l-6.5 11.1L16 18.9V4z" fill="white"/>
          <path d="M16 20.5l-.2.2v5l.2.6 6.5-9.2-6.5 3.4z" fill="white" opacity="0.6"/>
          <path d="M16 26.3v-5.8l-6.5-3.4L16 26.3z" fill="white"/>
          <path d="M16 18.9l6.5-3.8L16 11.3v7.6z" fill="white" opacity="0.2"/>
          <path d="M9.5 15.1l6.5 3.8v-7.6l-6.5 3.8z" fill="white" opacity="0.6"/>
        </svg>
      )
    },
    { 
      id: 'usdt', 
      name: 'Tether (USDT)', 
      iconSvg: (
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ width: '40px', height: '40px' }}>
          <circle cx="16" cy="16" r="15" fill="none" stroke="white" strokeWidth="1.5"/>
          <path d="M18.5 11.5V9h-5v2.5H8v3h2.3c.1 1.7 1.9 3 4.2 3.2v6.8h2.5v-6.8c2.3-.2 4.1-1.5 4.2-3.2H23v-3h-4.5zm-1.25 4.7c-2.4 0-4.4-.7-4.4-1.5s2-.8 4.4-.8 4.4.7 4.4 1.5-2 .8-4.4.8z" fill="white"/>
        </svg>
      )
    },
    { 
      id: 'usdc', 
      name: 'USD Coin (USDC)', 
      iconSvg: (
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ width: '40px', height: '40px' }}>
          <circle cx="16" cy="16" r="15" fill="none" stroke="white" strokeWidth="1.5"/>
          <path d="M20 12.5c0-1.4-1.1-2.5-2.5-2.5h-3C13.1 10 12 11.1 12 12.5v1.2c0 1 .6 1.8 1.5 2.2l4 1.6c.3.1.5.4.5.7v1.3c0 .4-.3.7-.7.7h-3.6c-.4 0-.7-.3-.7-.7V19h-2v.5c0 1.4 1.1 2.5 2.5 2.5h3c1.4 0 2.5-1.1 2.5-2.5v-1.2c0-1-.6-1.8-1.5-2.2l-4-1.6c-.3-.1-.5-.4-.5-.7v-1.3c0-.4.3-.7.7-.7h3.6c.4 0 .7.3.7.7V13h2v-.5z" fill="white"/>
        </svg>
      )
    }
  ];

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  const updateQuantity = (name, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = cartItems.map(item => 
      item.name === name ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeItem = (name) => {
    const updatedCart = cartItems.filter(item => item.name !== name);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handlePaymentSelect = (paymentId) => {
    setSelectedPayment(paymentId);
  };

  const handleSubmitPayment = (e) => {
    e.preventDefault();
    alert(`Processing payment via ${selectedPayment}...`);
    // Here you would integrate with actual payment processors
  };

  const getPaymentButtonText = () => {
    switch (selectedPayment) {
      case 'credit':
      case 'debit':
        return `Pay ${formatPrice(total)}`;
      case 'apple':
        return 'Continue with Apple Pay';
      case 'google':
        return 'Continue with Google Pay';
      case 'paypal':
        return 'Continue to PayPal';
      case 'bitcoin':
      case 'ethereum':
      case 'usdt':
      case 'usdc':
        return 'Confirm Payment';
      default:
        return 'Complete Payment';
    }
  };

  const renderPaymentForm = () => {
    switch (selectedPayment) {
      case 'credit':
      case 'debit':
        return (
          <form className="payment-form" onSubmit={handleSubmitPayment}>
            <h3>Card Information</h3>
            <div className="form-group">
              <label>Card Number</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardForm.cardNumber}
                onChange={(e) => setCardForm({...cardForm, cardNumber: e.target.value})}
                maxLength="19"
                required
              />
            </div>
            <div className="form-group">
              <label>Cardholder Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={cardForm.cardName}
                onChange={(e) => setCardForm({...cardForm, cardName: e.target.value})}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={cardForm.expiryDate}
                  onChange={(e) => setCardForm({...cardForm, expiryDate: e.target.value})}
                  maxLength="5"
                  required
                />
              </div>
              <div className="form-group">
                <label>CVV</label>
                <input
                  type="text"
                  placeholder="123"
                  value={cardForm.cvv}
                  onChange={(e) => setCardForm({...cardForm, cvv: e.target.value})}
                  maxLength="4"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Postal Code / Zip Code</label>
              <input
                type="text"
                placeholder="12345 or A1B 2C3"
                value={cardForm.postalCode}
                onChange={(e) => setCardForm({...cardForm, postalCode: e.target.value})}
                maxLength="10"
                required
              />
            </div>
          </form>
        );

      case 'apple':
      case 'google':
        return (
          <div className="payment-form">
            <h3>{selectedPayment === 'apple' ? 'Apple Pay' : 'Google Pay'}</h3>
            <p className="payment-info">
              You will be redirected to {selectedPayment === 'apple' ? 'Apple Pay' : 'Google Pay'} to complete your purchase.
            </p>
          </div>
        );

      case 'paypal':
        return (
          <form className="payment-form" onSubmit={handleSubmitPayment}>
            <h3>PayPal Payment</h3>
            <div className="form-group">
              <label>PayPal Email</label>
              <input
                type="email"
                placeholder="your.email@example.com"
                value={paypalForm.email}
                onChange={(e) => setPaypalForm({...paypalForm, email: e.target.value})}
                required
              />
            </div>
            <p className="payment-info">
              You will be redirected to PayPal to complete your purchase.
            </p>
          </form>
        );

      case 'bitcoin':
      case 'ethereum':
      case 'usdt':
      case 'usdc':
        return (
          <form className="payment-form" onSubmit={handleSubmitPayment}>
            <h3>
              {selectedPayment === 'bitcoin' ? 'Bitcoin' : 
               selectedPayment === 'ethereum' ? 'Ethereum' : 
               selectedPayment === 'usdt' ? 'Tether (USDT)' : 'USD Coin (USDC)'} Payment
            </h3>
            <div className="form-group">
              <label>Your Wallet Address</label>
              <input
                type="text"
                placeholder={selectedPayment === 'bitcoin' ? 'bc1q...' : '0x...'}
                value={cryptoForm.walletAddress}
                onChange={(e) => setCryptoForm({...cryptoForm, walletAddress: e.target.value})}
                required
              />
            </div>
            <div className="crypto-info">
              <p><strong>Amount to Send:</strong></p>
              <p className="crypto-amount">
                {selectedPayment === 'bitcoin' 
                  ? `${(total / 45000).toFixed(8)} BTC` 
                  : selectedPayment === 'ethereum'
                  ? `${(total / 2500).toFixed(6)} ETH`
                  : `${convertPrice(total)} ${selectedPayment === 'usdt' ? 'USDT' : 'USDC'}`}
              </p>
              <p className="crypto-note">
                Send exact amount to: <br/>
                <code>
                  {selectedPayment === 'bitcoin' 
                    ? 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh' 
                    : selectedPayment === 'ethereum'
                    ? '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
                    : '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'}
                </code>
              </p>
              {(selectedPayment === 'usdt' || selectedPayment === 'usdc') && (
                <p className="crypto-note" style={{ marginTop: '1rem' }}>
                  <strong>Network:</strong> ERC-20 (Ethereum){selectedPayment === 'usdt' ? ' or TRC-20 (Tron)' : ''}
                </p>
              )}
            </div>
          </form>
        );

      default:
        return null;
    }
  };

  return (
    <div className="page-container">
      <LiquidEther
        colors={['#5227FF', '#FF9FFC', '#B19EEF']}
        mouseForce={isMobile ? 18 : 24}
        cursorSize={isMobile ? 80 : 100}
        isViscous
        viscous={30}
        iterationsViscous={settings.iterationsViscous}
        iterationsPoisson={settings.iterationsPoisson}
        resolution={settings.resolution}
        isBounce={false}
        autoDemo
        autoSpeed={settings.autoSpeed}
        autoIntensity={2.2}
        takeoverDuration={0.25}
        autoResumeDelay={3000}
        autoRampDuration={0.6}
      />
      
      <div className="page-content cart-content">
        <h1 className="page-title">Shopping Cart</h1>
        
        {!showCheckout ? (
          <div className="cart-container">
            <div className="cart-items">
              {cartItems.length === 0 ? (
                <p className="empty-cart">Your cart is empty</p>
              ) : (
                cartItems.map(item => (
                  <div key={item.name} className="cart-item">
                    <div className="item-info">
                      <h3>{item.name}</h3>
                      {item.category && <p>{item.category}</p>}
                    </div>
                    <div className="item-controls">
                      <div className="quantity-control">
                        <button onClick={() => updateQuantity(item.name, item.quantity - 1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.name, item.quantity + 1)}>+</button>
                      </div>
                      <div className="item-price">{formatPrice(item.price * item.quantity)}</div>
                      <button className="remove-btn" onClick={() => removeItem(item.name)}>×</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="cart-summary">
                <h2>Order Summary</h2>
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="summary-row">
                  <span>Tax (10%):</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <button className="checkout-btn" onClick={handleCheckout}>
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="checkout-container">
            <button className="back-to-cart" onClick={() => setShowCheckout(false)}>
              ← Back to Cart
            </button>
            
            <div className="checkout-content">
              <div className="payment-methods">
                <h2>Select Payment Method</h2>
                <div className="payment-grid">
                  {paymentMethods.map(method => (
                    <button
                      key={method.id}
                      className={`payment-method-btn ${selectedPayment === method.id ? 'selected' : ''}`}
                      onClick={() => handlePaymentSelect(method.id)}
                    >
                      <span className="payment-icon">
                        {method.iconSvg ? method.iconSvg : method.icon}
                      </span>
                      <span className="payment-name">{method.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {selectedPayment && (
                <div className="payment-form-container">
                  {renderPaymentForm()}
                </div>
              )}

              <div className="checkout-summary">
                <h3>Order Summary</h3>
                
                <div className="checkout-items-list">
                  {cartItems.map(item => (
                    <div key={item.name} className="checkout-item">
                      <div className="checkout-item-info">
                        <div className="checkout-item-name">{item.name}</div>
                        <div className="checkout-item-details">
                          {item.category && <span className="checkout-item-category">{item.category}</span>}
                          <span className="checkout-item-qty">Qty: {item.quantity}</span>
                        </div>
                      </div>
                      <div className="checkout-item-actions">
                        <span className="checkout-item-price">{formatPrice(item.price * item.quantity)}</span>
                        <button 
                          className="checkout-remove-btn" 
                          onClick={() => removeItem(item.name)}
                          aria-label="Remove item"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="checkout-totals">
                  <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Tax (10%):</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total:</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                {selectedPayment && (
                  <button 
                    onClick={handleSubmitPayment} 
                    className="submit-payment-btn"
                  >
                    {getPaymentButtonText()}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

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
    { id: 'credit', name: 'Credit Card', icon: '💳' },
    { id: 'debit', name: 'Debit Card (Visa)', icon: '💳' },
    { id: 'apple', name: 'Apple Pay', icon: '🍎' },
    { id: 'google', name: 'Google Pay', icon: 'G' },
    { id: 'paypal', name: 'PayPal', icon: '🅿️' },
    { id: 'bitcoin', name: 'Bitcoin', icon: '₿' },
    { id: 'ethereum', name: 'Ethereum', icon: '⟠' },
    { id: 'usdt', name: 'Tether (USDT)', icon: '₮' },
    { id: 'usdc', name: 'USD Coin (USDC)', icon: '⊙' }
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
            <button type="submit" className="submit-payment-btn">
              Pay {formatPrice(total)}
            </button>
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
            <button onClick={handleSubmitPayment} className="submit-payment-btn">
              Continue with {selectedPayment === 'apple' ? 'Apple Pay' : 'Google Pay'}
            </button>
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
            <button type="submit" className="submit-payment-btn">
              Continue to PayPal
            </button>
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
            <button type="submit" className="submit-payment-btn">
              Confirm Payment
            </button>
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
                      <span className="payment-icon">{method.icon}</span>
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
                <h3>Order Total</h3>
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="summary-row">
                  <span>Tax:</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

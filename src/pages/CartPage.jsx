import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import '../components/LandingPage/LandingPage.css';
import { useCurrency } from '../context/CurrencyContext';
import { useAuth } from '../context/AuthContext';
import { stripeApi } from '../api/account';
import '../styles/page.css';
import '../styles/cart.css';

export default function CartPage() {
  const isMobile = typeof window !== 'undefined' && (
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
    window.innerWidth <= 768
  );

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
    postalCode: '',
    email: ''
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
            <circle cx="10" cy="10" r="8" fill="white" opacity="0.85" />
            <circle cx="22" cy="10" r="8" fill="white" opacity="0.85" />
            <path d="M16 4.5 A8 8 0 0 1 16 15.5 A8 8 0 0 0 16 4.5" fill="white" />
          </svg>
          {/* American Express Logo */}
          <svg viewBox="0 0 40 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '32px', height: '19px' }}>
            <rect x="1" y="2" width="38" height="20" rx="2" fill="none" stroke="white" strokeWidth="1.5" />
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
            <circle cx="10" cy="10" r="8" fill="white" opacity="0.85" />
            <circle cx="22" cy="10" r="8" fill="white" opacity="0.85" />
            <path d="M16 4.5 A8 8 0 0 1 16 15.5 A8 8 0 0 0 16 4.5" fill="white" />
          </svg>
        </div>
      )
    },
    {
      id: 'apple',
      name: 'Apple Pay',
      iconSvg: (
        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" style={{ width: '40px', height: '40px' }}>
          <path d="M31.5 11.5c-1.3 1.4-3.4 2.5-5.4 2.3-.3-2.1.7-4.2 1.9-5.5 1.3-1.4 3.5-2.4 5.2-2.5.2 2.2-.6 4.3-1.7 5.7zm1.7 2.7c-2.9-.2-5.4 1.6-6.8 1.6-1.4 0-3.5-1.5-5.8-1.5-3 .1-5.8 1.8-7.3 4.5-3.1 5.4-.8 13.4 2.2 17.8 1.5 2.2 3.3 4.6 5.6 4.5 2.2-.1 3.1-1.4 5.8-1.4 2.6 0 3.5 1.4 5.8 1.4 2.4-.1 4-2.1 5.5-4.3 1.7-2.5 2.4-4.9 2.5-5-.1 0-4.7-1.8-4.8-7.1-.1-4.4 3.6-6.5 3.8-6.7-2.1-3-5.3-3.4-6.5-3.8z" fill="white" />
        </svg>
      )
    },
    {
      id: 'google',
      name: 'Google Pay',
      iconSvg: (
        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" style={{ width: '40px', height: '40px' }}>
          <path d="M24.5 20.5v7.2h10c-.4 2.5-2.9 7.3-10 7.3-6 0-11-5-11-11s5-11 11-11c3.4 0 5.7 1.5 7 2.7l5.7-5.5C34 6.3 29.6 4 24.5 4c-11 0-20 9-20 20s9 20 20 20c11.5 0 19.2-8.1 19.2-19.5 0-1.3-.1-2.3-.3-3.3H24.5z" fill="white" />
        </svg>
      )
    },
    {
      id: 'paypal',
      name: 'PayPal',
      iconSvg: (
        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" style={{ width: '40px', height: '40px' }}>
          <path d="M29.5 10h-10c-.7 0-1.3.5-1.4 1.2l-4 25c-.1.5.3 1 .8 1h4.5c.7 0 1.3-.5 1.4-1.2l1.1-6.8c.1-.7.7-1.2 1.4-1.2h3.2c6.6 0 10.4-3.2 11.4-9.5.4-2.7 0-4.9-1.4-6.4-1.5-1.5-4.1-2.1-7-2.1zm.9 9.4c-.5 3.5-3.2 3.5-5.8 3.5h-1.5l1-6.5c.1-.4.4-.7.8-.7h.7c1.9 0 3.6 0 4.5.9.5.5.7 1.3.3 2.8z" fill="white" />
          <path d="M16.5 10h-10c-.7 0-1.3.5-1.4 1.2l-4 25c-.1.5.3 1 .8 1h4.8c.5 0 .9-.3 1-.8l1.1-7c.1-.7.7-1.2 1.4-1.2h3.2c6.6 0 10.4-3.2 11.4-9.5.4-2.7 0-4.9-1.4-6.4-1.5-1.5-4.1-2.1-7-2.1zm.9 9.4c-.5 3.5-3.2 3.5-5.8 3.5h-1.5l1-6.5c.1-.4.4-.7.8-.7h.7c1.9 0 3.6 0 4.5.9.5.5.7 1.3.3 2.8z" fill="white" opacity="0.7" />
        </svg>
      )
    },
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      iconSvg: (
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ width: '40px', height: '40px' }}>
          <circle cx="16" cy="16" r="15" fill="none" stroke="white" strokeWidth="1.5" />
          <path d="M23.189 14.02c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84-1.728-.43-.69 2.765c-.454-.114-.92-.22-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.746-.17-1.104-.26l.002-.009-2.384-.595-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.183-.045-1.13 4.532c-.086.212-.303.531-.793.41.018.025-1.256-.313-1.256-.313l-.858 1.978 2.25.561c.418.105.828.215 1.231.318l-.715 2.872 1.727.43.708-2.84c.472.127.93.245 1.378.357l-.706 2.828 1.728.43.715-2.866c2.948.558 5.164.333 6.097-2.333.752-2.146-.037-3.385-1.588-4.192 1.13-.26 1.98-1.003 2.207-2.538zm-3.95 5.538c-.533 2.147-4.148.986-5.32.695l.95-3.805c1.172.293 4.929.872 4.37 3.11zm.535-5.569c-.487 1.953-3.495.96-4.47.717l.86-3.45c.975.243 4.118.696 3.61 2.733z" fill="white" />
        </svg>
      )
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      iconSvg: (
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ width: '40px', height: '40px' }}>
          <circle cx="16" cy="16" r="15" fill="none" stroke="white" strokeWidth="1.5" />
          <path d="M16 4L15.7 5.1v13.5l.3.3 6.5-3.8L16 4z" fill="white" opacity="0.6" />
          <path d="M16 4l-6.5 11.1L16 18.9V4z" fill="white" />
          <path d="M16 20.5l-.2.2v5l.2.6 6.5-9.2-6.5 3.4z" fill="white" opacity="0.6" />
          <path d="M16 26.3v-5.8l-6.5-3.4L16 26.3z" fill="white" />
          <path d="M16 18.9l6.5-3.8L16 11.3v7.6z" fill="white" opacity="0.2" />
          <path d="M9.5 15.1l6.5 3.8v-7.6l-6.5 3.8z" fill="white" opacity="0.6" />
        </svg>
      )
    },
    {
      id: 'usdt',
      name: 'Tether (USDT)',
      iconSvg: (
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ width: '40px', height: '40px' }}>
          <circle cx="16" cy="16" r="14.5" fill="none" stroke="white" strokeWidth="1.5" />
          <path d="M17.2 13.5h-2.4v-2.4h6.9V9.3H10.3v1.8h6.9v2.4h-2.4c-3.5 0-6.3.5-6.3 1.2 0 .5 1.7.9 4.1 1.1v5.9h2.8v-5.9c2.4-.2 4.1-.6 4.1-1.1 0-.7-2.8-1.2-6.3-1.2zm0 1.9c-2.9 0-5.2-.4-5.2-.9s2.3-.9 5.2-.9 5.2.4 5.2.9-2.3.9-5.2.9z" fill="white" />
        </svg>
      )
    },
    {
      id: 'usdc',
      name: 'USD Coin (USDC)',
      iconSvg: (
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ width: '40px', height: '40px' }}>
          <circle cx="16" cy="16" r="14.5" fill="none" stroke="white" strokeWidth="1.5" />
          <path d="M13.5 19.5c0 .8.7 1.5 1.5 1.5h2c.8 0 1.5-.7 1.5-1.5v-.3c0-.6-.3-1.1-.8-1.3l-3.4-1.4c-.5-.2-.8-.7-.8-1.3v-.3c0-.8.7-1.5 1.5-1.5h2c.8 0 1.5.7 1.5 1.5v.2h1.5v-.2c0-1.5-1.2-2.7-2.7-2.9V11h-1.6v1.1c-1.5.2-2.7 1.4-2.7 2.9v.3c0 1.1.6 2 1.5 2.4l3.4 1.4c.2.1.3.3.3.5v.3c0 .3-.2.5-.5.5h-2c-.3 0-.5-.2-.5-.5v-.4h-1.5v.4zm4.8 4.8c-.2.1-.5.1-.7.2-.2 0-.5.1-.7.1-.2 0-.5 0-.7-.1-.2 0-.5-.1-.7-.2" stroke="white" strokeWidth="0.8" fill="none" strokeLinecap="round" />
          <path d="M18.3 24.3c2.7-.8 4.7-3.3 4.7-6.3" stroke="white" strokeWidth="0.8" fill="none" strokeLinecap="round" />
          <path d="M13.7 7.7c-2.7.8-4.7 3.3-4.7 6.3" stroke="white" strokeWidth="0.8" fill="none" strokeLinecap="round" />
          <circle cx="20" cy="12" r="1" fill="white" />
          <circle cx="12" cy="20" r="1" fill="white" />
        </svg>
      )
    }
  ];

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Calculate tax only on taxable items (exclude consultations/meetings)
  const taxableSubtotal = cartItems.reduce((sum, item) => {
    // Consultation meetings are tax-exempt
    if (item.category === 'Consultation') {
      return sum;
    }
    return sum + (item.price * item.quantity);
  }, 0);

  const tax = taxableSubtotal * 0.1; // 10% tax on taxable items only
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

  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const handleCheckout = async () => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      // Redirect to login with return path
      navigate('/login', { state: { from: { pathname: '/cart' } } });
      return;
    }

    setCheckoutLoading(true);

    try {
      // Determine if this is a subscription or one-time payment
      const hasSubscription = cartItems.some(item =>
        item.duration === 'Monthly' || item.duration === '3 Months' || item.duration === '1 Year'
      );

      const mode = hasSubscription ? 'subscription' : 'payment';

      // Create Stripe checkout session
      const { sessionId, url } = await stripeApi.createCheckoutSession({
        cartItems,
        userId: user.id,
        userEmail: user.email,
        mode
      });

      // Redirect to Stripe Checkout
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to create checkout session. Please try again.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handlePaymentSelect = (paymentId) => {
    setSelectedPayment(paymentId);
  };

  const handleSubmitPayment = (e) => {
    e.preventDefault();

    // Save consultation bookings to prevent double-booking
    const consultationItems = cartItems.filter(item => item.category === 'Consultation');
    if (consultationItems.length > 0) {
      const existingBookings = JSON.parse(localStorage.getItem('bookedSlots') || '[]');

      consultationItems.forEach(item => {
        if (item.details) {
          // Parse the date string to get ISO format
          const dateObj = new Date(item.details.date);
          const dateStr = dateObj.toISOString().split('T')[0];

          // Parse time to 24-hour format
          const time12 = item.details.time;
          const [time, period] = time12.split(' ');
          const [hours, minutes] = time.split(':').map(Number);
          let hours24 = hours;
          if (period === 'PM' && hours !== 12) hours24 += 12;
          if (period === 'AM' && hours === 12) hours24 = 0;
          const time24 = `${hours24.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

          // Add booking
          existingBookings.push({
            date: dateStr,
            time24: time24,
            time12: time12,
            duration: parseInt(item.details.duration),
            bookedAt: new Date().toISOString()
          });
        }
      });

      localStorage.setItem('bookedSlots', JSON.stringify(existingBookings));
    }

    // Get email for receipt
    const receiptEmail = selectedPayment === 'paypal' ? paypalForm.email : cardForm.email;

    // Clear cart after successful payment
    setCartItems([]);
    localStorage.setItem('cartItems', JSON.stringify([]));
    window.dispatchEvent(new Event('cartUpdated'));

    alert(`Payment successful! Your order has been confirmed.\n\nA receipt has been sent to ${receiptEmail}`);
    setShowCheckout(false);

    // Reset forms
    setCardForm({
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: '',
      postalCode: '',
      email: ''
    });
    setPaypalForm({ email: '' });
    setCryptoForm({ walletAddress: '' });

    // Here you would integrate with actual payment processors and email service
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
                onChange={(e) => setCardForm({ ...cardForm, cardNumber: e.target.value })}
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
                onChange={(e) => setCardForm({ ...cardForm, cardName: e.target.value })}
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
                  onChange={(e) => setCardForm({ ...cardForm, expiryDate: e.target.value })}
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
                  onChange={(e) => setCardForm({ ...cardForm, cvv: e.target.value })}
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
                onChange={(e) => setCardForm({ ...cardForm, postalCode: e.target.value })}
                maxLength="10"
                required
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="your.email@example.com"
                value={cardForm.email}
                onChange={(e) => setCardForm({ ...cardForm, email: e.target.value })}
                required
              />
            </div>
          </form>
        );

      case 'apple':
      case 'google':
        return (
          <form className="payment-form" onSubmit={handleSubmitPayment}>
            <h3>{selectedPayment === 'apple' ? 'Apple Pay' : 'Google Pay'}</h3>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="your.email@example.com"
                value={cardForm.email}
                onChange={(e) => setCardForm({ ...cardForm, email: e.target.value })}
                required
              />
            </div>
            <p className="payment-info">
              You will be redirected to {selectedPayment === 'apple' ? 'Apple Pay' : 'Google Pay'} to complete your purchase.
            </p>
          </form>
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
                onChange={(e) => setPaypalForm({ ...paypalForm, email: e.target.value })}
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
              <label>Email Address</label>
              <input
                type="email"
                placeholder="your.email@example.com"
                value={cardForm.email}
                onChange={(e) => setCardForm({ ...cardForm, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Your Wallet Address</label>
              <input
                type="text"
                placeholder={selectedPayment === 'bitcoin' ? 'bc1q...' : '0x...'}
                value={cryptoForm.walletAddress}
                onChange={(e) => setCryptoForm({ ...cryptoForm, walletAddress: e.target.value })}
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
                Send exact amount to: <br />
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
    <div className="landing-container pt-24 pb-20 min-h-screen relative overflow-hidden">

      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[40%] h-[40%] bg-[#5227FF]/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[10%] w-[40%] h-[40%] bg-[#22d3ee]/20 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      <div className="page-content cart-content relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-white mb-8">Shopping Cart</h1>

          {!showCheckout ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="cart-container bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl"
            >
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-slate-400 text-lg">Your cart is empty</p>
                  <button onClick={() => navigate('/pricing')} className="mt-4 px-6 py-2 bg-[#5227FF] text-white rounded-lg hover:bg-[#4319cc] transition-colors">
                    Browse Plans
                  </button>
                </div>
              ) : (
                <>
                  <div className="cart-items space-y-4 mb-8">
                    {cartItems.map(item => (
                      <div key={item.name} className="cart-item bg-black/20 border border-white/5 rounded-xl p-4 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="item-info flex-1">
                          <h3 className="text-xl font-semibold text-white">{item.name}</h3>
                          {item.category && <p className="text-slate-400 text-sm">{item.category}</p>}
                          {item.duration && <p className="item-duration text-cyan-400 text-sm mt-1"><strong>Duration:</strong> {item.duration}</p>}
                        </div>
                        <div className="item-controls flex items-center gap-6">
                          <div className="quantity-control flex items-center bg-black/40 rounded-lg p-1 border border-white/10">
                            <button onClick={() => updateQuantity(item.name, item.quantity - 1)} className="px-3 py-1 text-slate-300 hover:text-white">-</button>
                            <span className="px-2 text-white font-mono">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.name, item.quantity + 1)} className="px-3 py-1 text-slate-300 hover:text-white">+</button>
                          </div>
                          <div className="item-price text-xl font-bold text-white min-w-[100px] text-right">{formatPrice(item.price * item.quantity)}</div>
                          <button className="remove-btn text-slate-500 hover:text-red-400 transition-colors" onClick={() => removeItem(item.name)}>×</button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="cart-summary border-t border-white/10 pt-6">
                    <div className="flex justify-between items-center mb-2 text-slate-300">
                      <span>Subtotal:</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-4 text-slate-300">
                      <span>Tax (10%):</span>
                      <span>{formatPrice(tax)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-8 text-2xl font-bold text-white">
                      <span>Total:</span>
                      <span className="text-cyan-400">{formatPrice(total)}</span>
                    </div>
                    <button
                      className="checkout-btn w-full bg-gradient-to-r from-[#5227FF] to-[#c084fc] hover:from-[#4319cc] hover:to-[#a960e6] text-white font-bold py-4 rounded-xl text-lg shadow-lg shadow-[#5227FF]/20 transition-all transform hover:scale-[1.01] active:scale-[0.99]"
                      onClick={handleCheckout}
                      disabled={checkoutLoading}
                    >
                      {checkoutLoading ? 'Redirecting to Checkout...' : 'Proceed to Checkout'}
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="checkout-container bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl"
            >
              <button className="back-to-cart text-slate-400 hover:text-white mb-6 flex items-center gap-2 transition-colors" onClick={() => setShowCheckout(false)}>
                ← Back to Cart
              </button>

              <div className="checkout-content">
                <div className="payment-methods mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Select Payment Method</h2>
                  <div className="payment-grid grid grid-cols-2 md:grid-cols-3 gap-3">
                    {paymentMethods.map(method => (
                      <button
                        key={method.id}
                        className={`payment-method-btn p-4 rounded-xl border transition-all flex flex-col items-center justify-center gap-2 h-24 ${selectedPayment === method.id ? 'bg-[#5227FF]/20 border-[#5227FF] shadow-[0_0_15px_rgba(82,39,255,0.3)]' : 'bg-black/20 border-white/10 hover:bg-white/5 hover:border-white/20'}`}
                        onClick={() => handlePaymentSelect(method.id)}
                      >
                        <span className="payment-icon scale-90">
                          {method.iconSvg ? method.iconSvg : method.icon}
                        </span>
                        <span className="payment-name text-xs md:text-sm text-slate-300 font-medium">{method.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {selectedPayment && (
                  <div className="payment-form-container bg-black/20 border border-white/5 rounded-xl p-6 mb-8">
                    {renderPaymentForm()}
                  </div>
                )}

                <div className="checkout-summary border-t border-white/10 pt-6">
                  <h3 className="text-xl font-bold text-white mb-4">Order Summary</h3>

                  {/* ... existing summary items logic ... */}

                  <div className="checkout-totals space-y-2 mb-6">
                    {/* ... totals ... */}
                    <div className="flex justify-between items-center text-xl font-bold text-white pt-4 border-t border-white/10">
                      <span>Total:</span>
                      <span className="text-cyan-400">{formatPrice(total)}</span>
                    </div>
                  </div>

                  {selectedPayment && (
                    <button
                      onClick={handleSubmitPayment}
                      className="submit-payment-btn w-full bg-gradient-to-r from-[#22d3ee] to-[#5227FF] hover:from-[#1cb5d0] hover:to-[#4319cc] text-white font-bold py-4 rounded-xl text-lg shadow-lg shadow-cyan-500/20 transition-all transform hover:scale-[1.01]"
                    >
                      {getPaymentButtonText()}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );

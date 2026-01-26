import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { isLoggedIn, logout } = useAuth();
  const { cart, getCartSubtotal, getCartTax, getCartTotalWithTax, getCartItemCount, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  
  const [showContactDropdown, setShowContactDropdown] = useState(false);
  const [showProductsDropdown, setShowProductsDropdown] = useState(false);
  const [showCartDetails, setShowCartDetails] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);

  const contactRef = useRef(null);
  const productsRef = useRef(null);
  const cartRef = useRef(null);
  const accountRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contactRef.current && !contactRef.current.contains(event.target)) {
        setShowContactDropdown(false);
      }
      if (productsRef.current && !productsRef.current.contains(event.target)) {
        setShowProductsDropdown(false);
      }
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setShowCartDetails(false);
      }
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setShowAccountDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const cartSubtotal = getCartSubtotal();
  const cartTax = getCartTax();
  const cartTotal = getCartTotalWithTax();
  const cartItemCount = getCartItemCount();

  const handleLogout = () => {
    logout();
    setShowAccountDropdown(false);
    navigate('/');
  };

  const handleCheckout = () => {
    setShowCartDetails(false);
    navigate('/checkout');
  };

  return (
    <header className="top-header">
      <div className="header-left">
        <Link to="/" className="icon-button home-logo-button" aria-label="Home">
          <img src="/logo.png" alt="Marapone Contracting Inc." className="home-logo-icon" />
        </Link>
      </div>
      <div className="header-icons">
        {/* Contact Dropdown */}
        <div className="contact-dropdown-container" ref={contactRef}>
          <button
            className="icon-button"
            id="contact-icon"
            aria-label="Contact Us"
            type="button"
            onClick={() => {
              setShowContactDropdown(!showContactDropdown);
              setShowProductsDropdown(false);
              setShowAccountDropdown(false);
            }}
          >
            <i className="fas fa-envelope"></i>
          </button>
          {showContactDropdown && (
            <div className="contact-dropdown" id="contact-dropdown">
              <Link to="/contact" className="dropdown-item" onClick={() => setShowContactDropdown(false)}>
                <i className="fas fa-envelope"></i> Contact Us
              </Link>
              <Link to="/partners" className="dropdown-item" onClick={() => setShowContactDropdown(false)}>
                <i className="fas fa-handshake"></i> Partners
              </Link>
            </div>
          )}
        </div>

        {/* Products Dropdown */}
        <div className="products-dropdown-container" ref={productsRef}>
          <button
            className="icon-button"
            id="products-icon"
            aria-label="Products"
            type="button"
            onClick={() => {
              setShowProductsDropdown(!showProductsDropdown);
              setShowContactDropdown(false);
              setShowAccountDropdown(false);
            }}
          >
            <i className="fas fa-box"></i>
          </button>
          {showProductsDropdown && (
            <div className="products-dropdown" id="products-dropdown">
              <Link to="/products" className="dropdown-item" onClick={() => setShowProductsDropdown(false)}>
                <i className="fas fa-box"></i> Products
              </Link>
              <Link to="/packages" className="dropdown-item" onClick={() => setShowProductsDropdown(false)}>
                <i className="fas fa-handshake"></i> Packages
              </Link>
            </div>
          )}
        </div>

        {/* Cart */}
        <div className="cart-dropdown-container" ref={cartRef}>
          <button
            className="icon-button"
            id="cart-icon"
            aria-label="Shopping Cart"
            onClick={() => {
              setShowCartDetails(!showCartDetails);
              setShowContactDropdown(false);
              setShowProductsDropdown(false);
              setShowAccountDropdown(false);
            }}
          >
            <i className="fas fa-shopping-cart"></i>
            {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
          </button>
          {showCartDetails && (
            <div className="cart-details" id="cart-details">
              <div className="cart-details-header">
                <h3>Your Cart</h3>
                <button
                  className="close-cart-details"
                  id="close-cart-details"
                  aria-label="Close cart"
                  onClick={() => setShowCartDetails(false)}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="cart-items-list" id="cart-items-list">
                {cart.length === 0 ? (
                  <p className="empty-cart">Your cart is empty</p>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item-info">
                        <h4>{item.name}</h4>
                        <p>${item.price.toFixed(2)} × {item.quantity}</p>
                      </div>
                      <div className="cart-item-actions">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="quantity-btn"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="quantity-btn"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="remove-btn"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {cart.length > 0 && (
                <>
                  <div className="cart-summary">
                    <div className="cart-summary-row">
                      <span>Subtotal:</span>
                      <span id="cart-subtotal">${cartSubtotal.toFixed(2)}</span>
                    </div>
                    <div className="cart-summary-row">
                      <span>Tax (HST 13%):</span>
                      <span id="cart-tax">${cartTax.toFixed(2)}</span>
                    </div>
                    <div className="cart-summary-row cart-total">
                      <span>Total:</span>
                      <span id="cart-total">${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>
                  <button className="cart-checkout-btn" id="checkout-now-btn" onClick={handleCheckout}>
                    <i className="fas fa-shopping-cart"></i>
                    Checkout Now
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Account Dropdown */}
        <div className="account-dropdown-container" ref={accountRef}>
          <button
            className="icon-button"
            id="account-icon"
            aria-label="Account"
            onClick={() => {
              setShowAccountDropdown(!showAccountDropdown);
              setShowContactDropdown(false);
              setShowProductsDropdown(false);
            }}
          >
            <i className="fas fa-user"></i>
          </button>
          {showAccountDropdown && (
            <div className="account-dropdown" id="account-dropdown">
              {!isLoggedIn ? (
                <Link to="/login" className="dropdown-item" onClick={() => setShowAccountDropdown(false)}>
                  Log in
                </Link>
              ) : (
                <button className="dropdown-item" onClick={handleLogout}>
                  Log out
                </button>
              )}
              <Link
                to="/manage-account"
                className="dropdown-item"
                onClick={() => setShowAccountDropdown(false)}
              >
                Manage account
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

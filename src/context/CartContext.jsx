import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

const TAX_RATE = 0.13; // 13% HST for Ontario

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Load cart from localStorage on mount
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error('Error loading cart from localStorage:', e);
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart to localStorage:', e);
    }
  }, [cart]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + (item.quantity || 1) }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: item.quantity || 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartSubtotal = () => {
    return getCartTotal();
  };

  const getCartTax = () => {
    return getCartSubtotal() * TAX_RATE;
  };

  const getCartTotalWithTax = () => {
    return getCartSubtotal() + getCartTax();
  };

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartSubtotal,
    getCartTax,
    getCartTotalWithTax,
    getCartItemCount,
    TAX_RATE,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

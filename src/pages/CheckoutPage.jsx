import React from 'react';
import { useCart } from '../context/CartContext';

export default function CheckoutPage() {
  const { cart, getCartSubtotal, getCartTax, getCartTotalWithTax } = useCart();

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      {/* Checkout form and cart summary will go here */}
      <div className="checkout-summary">
        <p>Subtotal: ${getCartSubtotal().toFixed(2)}</p>
        <p>Tax: ${getCartTax().toFixed(2)}</p>
        <p>Total: ${getCartTotalWithTax().toFixed(2)}</p>
      </div>
    </div>
  );
}

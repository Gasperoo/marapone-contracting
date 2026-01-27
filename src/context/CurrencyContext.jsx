import React, { createContext, useState, useContext, useEffect } from 'react';

const CurrencyContext = createContext();

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(() => {
    // Load saved currency from localStorage
    return localStorage.getItem('selectedCurrency') || 'USD';
  });

  // Exchange rates (relative to USD)
  const exchangeRates = {
    USD: 1,
    CAD: 1.35,
    EUR: 0.92
  };

  // Currency symbols
  const currencySymbols = {
    USD: '$',
    CAD: 'C$',
    EUR: '€'
  };

  useEffect(() => {
    // Save currency preference to localStorage
    localStorage.setItem('selectedCurrency', currency);
  }, [currency]);

  const convertPrice = (usdPrice) => {
    return (usdPrice * exchangeRates[currency]).toFixed(2);
  };

  const formatPrice = (usdPrice) => {
    const convertedPrice = convertPrice(usdPrice);
    const symbol = currencySymbols[currency];
    
    // Format with proper spacing based on currency
    if (currency === 'EUR') {
      return `${convertedPrice}${symbol}`;
    }
    return `${symbol}${convertedPrice}`;
  };

  const changeCurrency = (newCurrency) => {
    if (exchangeRates[newCurrency]) {
      setCurrency(newCurrency);
    }
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        changeCurrency,
        convertPrice,
        formatPrice,
        currencySymbol: currencySymbols[currency],
        exchangeRates
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

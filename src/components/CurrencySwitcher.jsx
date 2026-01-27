import React, { useState } from 'react';
import { useCurrency } from '../context/CurrencyContext';
import './CurrencySwitcher.css';

export default function CurrencySwitcher() {
  const { currency, changeCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);

  const currencies = [
    { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
    { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦' },
    { code: 'EUR', name: 'Euro', flag: '🇪🇺' }
  ];

  const currentCurrency = currencies.find(c => c.code === currency);

  const handleSelect = (code) => {
    changeCurrency(code);
    setIsOpen(false);
  };

  return (
    <div className="currency-switcher">
      <button
        className="currency-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change currency"
      >
        <span className="currency-flag">{currentCurrency.flag}</span>
        <span className="currency-code">{currency}</span>
        <span className="currency-arrow">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <>
          <div className="currency-backdrop" onClick={() => setIsOpen(false)} />
          <div className="currency-dropdown">
            {currencies.map((curr) => (
              <button
                key={curr.code}
                className={`currency-option ${currency === curr.code ? 'selected' : ''}`}
                onClick={() => handleSelect(curr.code)}
              >
                <span className="currency-flag">{curr.flag}</span>
                <div className="currency-info">
                  <span className="currency-code">{curr.code}</span>
                  <span className="currency-name">{curr.name}</span>
                </div>
                {currency === curr.code && <span className="currency-check">✓</span>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CurrencyProvider } from './context/CurrencyContext';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import GasperPage from './pages/GasperPage';
import PackagesPage from './pages/PackagesPage';
import CartPage from './pages/CartPage';
import ContactPage from './pages/ContactPage';
import AccountPage from './pages/AccountPage';
import LoginPage from './pages/LoginPage';
import SettingsPage from './pages/SettingsPage';
import CheckoutSuccessPage from './pages/CheckoutSuccessPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <AuthProvider>
          <CurrencyProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/gasper" element={<GasperPage />} />
                <Route path="/packages" element={<PackagesPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <SettingsPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Layout>
          </CurrencyProvider>
        </AuthProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CurrencyProvider } from './context/CurrencyContext';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import ComingSoonGuard from './components/ComingSoonGuard';
import LandingPage from './components/LandingPage/LandingPage';
import AboutPage from './pages/AboutPage';
import GasperPage from './pages/GasperPage';
import PricingPage from './pages/PricingPage';
import FeaturesPage from './pages/FeaturesPage';
import HowItWorksPage from './pages/HowItWorksPage';
import IndustriesPage from './pages/IndustriesPage';
import CartPage from './pages/CartPage';
import ContactPage from './pages/ContactPage';
import AccountPage from './pages/AccountPage';
import LoginPage from './pages/LoginPage';
import SettingsPage from './pages/SettingsPage';
import CheckoutSuccessPage from './pages/CheckoutSuccessPage';
import NotFoundPage from './pages/NotFoundPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import CookiePolicyPage from './pages/CookiePolicyPage';

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <AuthProvider>
          <CurrencyProvider>
            <ComingSoonGuard>
              <Layout>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/features" element={<FeaturesPage />} />
                  <Route path="/how-it-works" element={<HowItWorksPage />} />
                  <Route path="/industries" element={<IndustriesPage />} />
                  <Route path="/gasper" element={<GasperPage />} />
                  <Route path="/pricing" element={<PricingPage />} />
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
                  <Route path="/terms-of-service" element={<TermsOfServicePage />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                  <Route path="/cookie-policy" element={<CookiePolicyPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Layout>
            </ComingSoonGuard>
          </CurrencyProvider>
        </AuthProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;

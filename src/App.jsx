import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CurrencyProvider } from './context/CurrencyContext';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';
import ComingSoonGuard from './components/ComingSoonGuard';
import LandingPage from './components/LandingPage/LandingPage';
import AboutPage from './pages/AboutPage';
import CustomLLMPage from './pages/CustomLLMPage';
import PricingPage from './pages/PricingPage';
import FeaturesPage from './pages/FeaturesPage';
import HowItWorksPage from './pages/HowItWorksPage';
import IndustriesPage from './pages/IndustriesPage';
import ConstructionPage from './pages/ConstructionPage';
import LogisticsPage from './pages/LogisticsPage';
import MarketingPage from './pages/MarketingPage';
import EcommercePage from './pages/EcommercePage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import CookiePolicyPage from './pages/CookiePolicyPage';

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ErrorBoundary>
        <AuthProvider>
          <CurrencyProvider>
            <ComingSoonGuard>
              <Routes>
                {/* Legal pages - no Layout wrapper (no navbar) */}
                <Route path="/terms" element={<TermsOfServicePage />} />
                <Route path="/privacy" element={<PrivacyPolicyPage />} />
                <Route path="/cookies" element={<CookiePolicyPage />} />
                <Route path="/terms-of-service" element={<TermsOfServicePage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/cookie-policy" element={<CookiePolicyPage />} />

                {/* All other pages - with Layout wrapper (includes navbar) */}
                <Route path="*" element={
                  <Layout>
                    <Routes>
                      <Route path="/" element={<LandingPage />} />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/features" element={<FeaturesPage />} />
                      <Route path="/how-it-works" element={<HowItWorksPage />} />
                      <Route path="/industries" element={<IndustriesPage />} />
                      <Route path="/industries/construction" element={<ConstructionPage />} />
                      <Route path="/industries/logistics" element={<LogisticsPage />} />
                      <Route path="/industries/marketing" element={<MarketingPage />} />
                      <Route path="/industries/ecommerce" element={<EcommercePage />} />
                      <Route path="/custom-llm" element={<CustomLLMPage />} />
                      <Route path="/pricing" element={<PricingPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                  </Layout>
                } />
              </Routes>
            </ComingSoonGuard>
          </CurrencyProvider>
        </AuthProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;

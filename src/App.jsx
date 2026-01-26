import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CheckoutPage from './pages/CheckoutPage';
import ContactPage from './pages/ContactPage';
import ProductsPage from './pages/ProductsPage';
import PartnersPage from './pages/PartnersPage';
import PackagesPage from './pages/PackagesPage';
import ManageAccountPage from './pages/ManageAccountPage';
import NotFoundPage from './pages/NotFoundPage';

// Lazy load service pages for better performance
const ServiceAISolutionsPage = lazy(() => import('./pages/ServiceAISolutionsPage'));
const ServiceBusinessDevelopmentPage = lazy(() => import('./pages/ServiceBusinessDevelopmentPage'));
const ServiceConsultingPage = lazy(() => import('./pages/ServiceConsultingPage'));
const ServiceEcommercePage = lazy(() => import('./pages/ServiceEcommercePage'));
const ServiceImportExportPage = lazy(() => import('./pages/ServiceImportExportPage'));
const ServiceLogisticsPage = lazy(() => import('./pages/ServiceLogisticsPage'));
const ServiceMarketingPage = lazy(() => import('./pages/ServiceMarketingPage'));
const ServiceProjectDevelopmentPage = lazy(() => import('./pages/ServiceProjectDevelopmentPage'));
const ServiceProjectManagementPage = lazy(() => import('./pages/ServiceProjectManagementPage'));

// Loading component for lazy-loaded pages
const LoadingSpinner = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '50vh',
    color: '#e0e0e0'
  }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{
        border: '4px solid #333',
        borderTop: '4px solid #4da6ff',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 1rem'
      }}></div>
      <p>Loading...</p>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Layout>
            <ErrorBoundary>
              <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/partners" element={<PartnersPage />} />
                  <Route path="/packages" element={<PackagesPage />} />
                  <Route path="/manage-account" element={<ManageAccountPage />} />
                  <Route 
                    path="/service/ai-solutions" 
                    element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <ServiceAISolutionsPage />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/service/business-development" 
                    element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <ServiceBusinessDevelopmentPage />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/service/consulting" 
                    element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <ServiceConsultingPage />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/service/ecommerce" 
                    element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <ServiceEcommercePage />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/service/import-export" 
                    element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <ServiceImportExportPage />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/service/logistics" 
                    element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <ServiceLogisticsPage />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/service/marketing" 
                    element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <ServiceMarketingPage />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/service/project-development" 
                    element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <ServiceProjectDevelopmentPage />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/service/project-management" 
                    element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <ServiceProjectManagementPage />
                      </Suspense>
                    } 
                  />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </ErrorBoundary>
          </Layout>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

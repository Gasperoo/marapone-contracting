import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        // Show loading state while checking authentication
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                color: 'white',
                fontSize: '1.2rem'
            }}>
                Loading...
            </div>
        );
    }

    if (!isAuthenticated) {
        // Redirect to login page, preserving the intended destination
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

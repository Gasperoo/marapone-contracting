import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage';

const ComingSoonGuard = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAccess = () => {
            // Check for secret query param
            const searchParams = new URLSearchParams(location.search);
            const previewKey = searchParams.get('preview');

            // Check local storage
            const storedKey = localStorage.getItem('gasper_preview');

            if (previewKey === 'true') {
                localStorage.setItem('gasper_preview', 'true');
                setIsUnlocked(true);
                // Remove the query param from URL for cleaner look (optional but nice)
                if (window.history.replaceState) {
                    const newUrl = window.location.pathname;
                    window.history.replaceState({}, '', newUrl);
                }
            } else if (storedKey === 'true') {
                setIsUnlocked(true);
            } else {
                setIsUnlocked(false);
            }
            setIsLoading(false);
        };

        checkAccess();
    }, [location]);

    if (isLoading) {
        return null; // Or a simple spinner
    }

    // If unlocked, render children (the actual app)
    if (isUnlocked) {
        return <>{children}</>;
    }

    // If locked, show Landing Page with Coming Soon mode
    return <LandingPage comingSoonMode={true} />;
};

export default ComingSoonGuard;

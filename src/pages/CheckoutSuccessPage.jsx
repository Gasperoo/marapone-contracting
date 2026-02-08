import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../components/LandingPage/LandingPage.css';
import '../styles/page.css';

export default function CheckoutSuccessPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');

    const isMobile = typeof window !== 'undefined' && (
        /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
        window.innerWidth <= 768
    );

    useEffect(() => {
        // Clear cart after successful payment
        localStorage.setItem('cartItems', JSON.stringify([]));
        window.dispatchEvent(new Event('cartUpdated'));
    }, []);

    return (
        <div className="landing-container pt-24 pb-20">

            <div className="page-content" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
                <div style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '20px',
                    padding: '3rem 2rem',
                    marginTop: '2rem'
                }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✓</div>
                    <h1 className="page-title" style={{ marginBottom: '1rem' }}>Payment Successful!</h1>
                    <p style={{ fontSize: '1.1rem', marginBottom: '2rem', opacity: 0.9 }}>
                        Thank you for your purchase. Your order has been confirmed and you'll receive a confirmation email shortly.
                    </p>

                    {sessionId && (
                        <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '2rem' }}>
                            Session ID: {sessionId.substring(0, 20)}...
                        </p>
                    )}

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button
                            onClick={() => navigate('/settings')}
                            style={{
                                padding: '0.75rem 2rem',
                                background: 'linear-gradient(135deg, #5227FF, #B19EEF)',
                                border: 'none',
                                borderRadius: '10px',
                                color: 'white',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'transform 0.2s',
                            }}
                            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                        >
                            View My Account
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            style={{
                                padding: '0.75rem 2rem',
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                borderRadius: '10px',
                                color: 'white',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'transform 0.2s',
                            }}
                            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

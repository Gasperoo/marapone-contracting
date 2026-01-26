import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="not-found-page" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>404</h1>
      <h2 style={{ marginBottom: '1rem' }}>Page Not Found</h2>
      <p style={{ marginBottom: '2rem', color: '#e0e0e0' }}>
        The page you're looking for doesn't exist.
      </p>
      <Link to="/" style={{ 
        display: 'inline-block',
        padding: '0.75rem 2rem',
        backgroundColor: '#4da6ff',
        color: '#fff',
        textDecoration: 'none',
        borderRadius: '4px',
        transition: 'background-color 0.3s'
      }}>
        Go Home
      </Link>
    </div>
  );
}

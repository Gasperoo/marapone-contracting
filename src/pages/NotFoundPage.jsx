import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '2rem',
      backgroundColor: '#0a0e1a',
      color: '#ffffff',
    }}>
      <h1 style={{ fontSize: '6rem', marginBottom: '1rem', fontWeight: 'bold' }}>
        404
      </h1>
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
        Page Not Found
      </h2>
      <p style={{ marginBottom: '2rem', color: '#e0e0e0', fontSize: '1.1rem' }}>
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        style={{
          display: 'inline-block',
          padding: '0.75rem 2rem',
          backgroundColor: '#4da6ff',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '4px',
          transition: 'background-color 0.3s',
          fontSize: '1rem',
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#3d8fdd'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#4da6ff'}
      >
        Go Home
      </Link>
    </div>
  );
}

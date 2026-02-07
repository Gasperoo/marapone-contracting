import React from 'react';


import { getOptimizedSettings } from '../utils/detectWindows';
export default function ProductsPage() {
  const isMobile = typeof window !== 'undefined' && (
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
    window.innerWidth <= 768
  );

  const settings = getOptimizedSettings(isMobile);

  return (
    <div className="page-container" style={{ width: '100vw', height: '100vh', overflow: 'hidden', background: '#000' }}>
      <iframe
        src="https://impex-tool-software.vercel.app/"
        title="Impex Tool"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block'
        }}
      />
    </div>
  );
}

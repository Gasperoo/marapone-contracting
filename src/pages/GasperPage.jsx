import React from 'react';
import GasperTool from '../components/GasperTool/GasperTool';
import { getOptimizedSettings } from '../utils/detectWindows';

export default function GasperPage() {
  return (
    <div className="page-container" style={{ width: '100vw', minHeight: '100vh', background: '#000' }}>
      <GasperTool />
    </div>
  );
}

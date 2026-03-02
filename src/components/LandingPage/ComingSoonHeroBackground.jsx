import React from 'react';

/**
 * Hero Background for Coming Soon page — off-white with subtle warm accent glows
 */
export default function ComingSoonHeroBackground() {
    return (
        <div className="absolute inset-0 z-0" style={{ pointerEvents: 'none' }}>
            {/* Base: off-white */}
            <div className="absolute inset-0" style={{ background: '#F5F5F5' }} />

            {/* Subtle warm glow — top right */}
            <div
                className="absolute rounded-full"
                style={{
                    width: '900px',
                    height: '900px',
                    top: '-25%',
                    right: '-15%',
                    background: 'radial-gradient(circle, rgba(255,107,0,0.06) 0%, rgba(255,107,0,0.02) 40%, transparent 70%)',
                    filter: 'blur(100px)',
                }}
            />
            {/* Bottom left accent */}
            <div
                className="absolute rounded-full"
                style={{
                    width: '600px',
                    height: '600px',
                    bottom: '-10%',
                    left: '-8%',
                    background: 'radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 60%)',
                    filter: 'blur(100px)',
                }}
            />
        </div>
    );
}

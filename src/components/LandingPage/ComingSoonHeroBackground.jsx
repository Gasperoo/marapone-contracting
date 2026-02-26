import React from 'react';

/**
 * Nebula Command Center Hero Background
 * Layered CSS-only background: perspective grid + aurora blobs + star-field
 */
export default function ComingSoonHeroBackground() {
    // Generate a static star-field of tiny dots
    const stars = Array.from({ length: 80 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.6 + 0.1,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2,
    }));

    return (
        <div className="absolute inset-0 z-0" style={{ pointerEvents: 'none' }}>
            {/* Layer 1: Deep void gradient */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(ellipse 120% 80% at 50% 30%, #0a0020 0%, #020008 50%, #000000 100%)',
                }}
            />

            {/* Layer 2: Perspective Grid */}
            <div className="perspective-grid" />

            {/* Layer 3: Aurora Mesh Gradients */}
            <div className="aurora-mesh">
                <div className="aurora-blob aurora-blob--1" />
                <div className="aurora-blob aurora-blob--2" />
                <div className="aurora-blob aurora-blob--3" />
            </div>

            {/* Layer 4: Star-field */}
            <div className="absolute inset-0">
                {stars.map((star) => (
                    <div
                        key={star.id}
                        className="absolute rounded-full"
                        style={{
                            width: star.size,
                            height: star.size,
                            left: `${star.x}%`,
                            top: `${star.y}%`,
                            backgroundColor: 'white',
                            opacity: star.opacity,
                            animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite alternate`,
                        }}
                    />
                ))}
            </div>

            {/* Layer 5: Radial vignette for text readability */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(ellipse 70% 50% at 50% 45%, transparent 0%, rgba(2,0,8,0.6) 60%, rgba(2,0,8,0.95) 100%)',
                }}
            />

            {/* Inline keyframes for twinkle */}
            <style>{`
                @keyframes twinkle {
                    0% { opacity: 0.1; transform: scale(0.8); }
                    100% { opacity: 0.8; transform: scale(1.2); }
                }
            `}</style>
        </div>
    );
}

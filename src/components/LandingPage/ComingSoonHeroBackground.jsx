import React from 'react';

/**
 * Executive Hero Background — professional, brighter dark theme
 * Warm slate-navy gradients with subtle blue ambient glow
 */
export default function ComingSoonHeroBackground() {
    const stars = Array.from({ length: 25 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.4 + 0.5,
        opacity: Math.random() * 0.35 + 0.05,
        delay: Math.random() * 6,
        duration: Math.random() * 5 + 4,
    }));

    return (
        <div className="absolute inset-0 z-0" style={{ pointerEvents: 'none' }}>
            {/* Layer 1: Brighter slate-navy base */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(ellipse 140% 90% at 50% 20%, #0F172A 0%, #0B1120 40%, #060A14 100%)',
                }}
            />

            {/* Layer 2: Soft ambient glows */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Top-right sky-blue glow */}
                <div
                    className="absolute rounded-full"
                    style={{
                        width: '900px',
                        height: '900px',
                        top: '-15%',
                        right: '-10%',
                        background: 'radial-gradient(circle, rgba(14,165,233,0.10) 0%, rgba(14,165,233,0.04) 40%, transparent 70%)',
                        filter: 'blur(80px)',
                    }}
                />
                {/* Bottom-left teal glow */}
                <div
                    className="absolute rounded-full"
                    style={{
                        width: '700px',
                        height: '700px',
                        bottom: '-10%',
                        left: '-5%',
                        background: 'radial-gradient(circle, rgba(20,184,166,0.06) 0%, rgba(20,184,166,0.02) 40%, transparent 70%)',
                        filter: 'blur(80px)',
                    }}
                />
                {/* Center subtle warm accent */}
                <div
                    className="absolute rounded-full"
                    style={{
                        width: '500px',
                        height: '500px',
                        top: '35%',
                        left: '45%',
                        background: 'radial-gradient(circle, rgba(56,189,248,0.03) 0%, transparent 60%)',
                        filter: 'blur(100px)',
                    }}
                />
            </div>

            {/* Layer 3: Aurora Mesh */}
            <div className="aurora-mesh">
                <div className="aurora-blob aurora-blob--1" />
                <div className="aurora-blob aurora-blob--2" />
                <div className="aurora-blob aurora-blob--3" />
            </div>

            {/* Layer 4: Star-field (slightly brighter) */}
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
                            backgroundColor: 'rgba(255,255,255,0.9)',
                            opacity: star.opacity,
                            animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite alternate`,
                        }}
                    />
                ))}
            </div>

            {/* Layer 5: Softer vignette */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(ellipse 65% 50% at 50% 45%, transparent 0%, rgba(6,10,20,0.4) 55%, rgba(6,10,20,0.85) 100%)',
                }}
            />

            <style>{`
                @keyframes twinkle {
                    0% { opacity: 0.05; }
                    100% { opacity: 0.55; }
                }
            `}</style>
        </div>
    );
}

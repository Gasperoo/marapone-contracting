import React from 'react';

/**
 * Executive Hero Background — OpenSpace-inspired organic gradients
 * Flowing blurred blobs over deep void, no perspective grid, minimal stars
 */
export default function ComingSoonHeroBackground() {
    // Very sparse star-field — minimal ambient twinkle
    const stars = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.2 + 0.4,
        opacity: Math.random() * 0.3 + 0.03,
        delay: Math.random() * 6,
        duration: Math.random() * 5 + 4,
    }));

    return (
        <div className="absolute inset-0 z-0" style={{ pointerEvents: 'none' }}>
            {/* Layer 1: Deep void with warm violet gradient */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(ellipse 140% 90% at 50% 20%, #0d0025 0%, #040010 40%, #000000 100%)',
                }}
            />

            {/* Layer 2: Large organic flowing gradients (OpenSpace-style) */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Top-right warm violet blob */}
                <div
                    className="absolute rounded-full"
                    style={{
                        width: '900px',
                        height: '900px',
                        top: '-15%',
                        right: '-10%',
                        background: 'radial-gradient(circle, rgba(14,165,233,0.12) 0%, rgba(14,165,233,0.06) 40%, transparent 70%)',
                        filter: 'blur(80px)',
                    }}
                />
                {/* Bottom-left cyan glow */}
                <div
                    className="absolute rounded-full"
                    style={{
                        width: '700px',
                        height: '700px',
                        bottom: '-10%',
                        left: '-5%',
                        background: 'radial-gradient(circle, rgba(34,211,238,0.06) 0%, rgba(34,211,238,0.02) 40%, transparent 70%)',
                        filter: 'blur(80px)',
                    }}
                />
                {/* Center deep violet accent */}
                <div
                    className="absolute rounded-full"
                    style={{
                        width: '600px',
                        height: '600px',
                        top: '30%',
                        left: '40%',
                        background: 'radial-gradient(circle, rgba(14,165,233,0.04) 0%, transparent 60%)',
                        filter: 'blur(100px)',
                    }}
                />
            </div>

            {/* Layer 3: Aurora Mesh (CSS-animated, subtle) */}
            <div className="aurora-mesh">
                <div className="aurora-blob aurora-blob--1" />
                <div className="aurora-blob aurora-blob--2" />
                <div className="aurora-blob aurora-blob--3" />
            </div>

            {/* Layer 4: Sparse star-field */}
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

            {/* Layer 5: Radial vignette */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(ellipse 60% 45% at 50% 45%, transparent 0%, rgba(2,0,8,0.5) 55%, rgba(2,0,8,0.9) 100%)',
                }}
            />

            {/* Twinkle keyframe */}
            <style>{`
                @keyframes twinkle {
                    0% { opacity: 0.03; }
                    100% { opacity: 0.5; }
                }
            `}</style>
        </div>
    );
}

import React, { useEffect, useRef } from 'react';

export default function ComingSoonHeroBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let width, height;
        let particles = [];
        let connections = [];

        const init = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            createParticles();
        };

        const createParticles = () => {
            particles = [];
            const particleCount = Math.min(Math.floor(width * 0.08), 100); // Responsive count

            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.35, // Slow, ambient movement
                    vy: (Math.random() - 0.5) * 0.35,
                    size: Math.random() * 2 + 1,
                    alpha: Math.random() * 0.5 + 0.1
                });
            }
        };

        const drawParticles = () => {
            ctx.clearRect(0, 0, width, height);

            // Draw background gradient
            const gradient = ctx.createLinearGradient(0, 0, 0, height);
            gradient.addColorStop(0, '#020617'); // slate-950
            gradient.addColorStop(1, '#0f172a'); // slate-900
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            // Update and draw particles
            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;

                // Bounce off edges
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(82, 39, 255, ${p.alpha})`; // #5227FF base
                ctx.fill();

                // Draw connections
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(82, 39, 255, ${0.15 * (1 - distance / 150)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            });

            // Draw subtle overlay vignetting for text readability
            const radialGrad = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width);
            radialGrad.addColorStop(0, 'rgba(2, 6, 23, 0.4)');
            radialGrad.addColorStop(0.8, 'rgba(2, 6, 23, 0.8)');
            radialGrad.addColorStop(1, 'rgba(2, 6, 23, 1)');
            ctx.fillStyle = radialGrad;
            ctx.fillRect(0, 0, width, height);

            animationFrameId = requestAnimationFrame(drawParticles);
        };

        init();
        drawParticles();

        const handleResize = () => {
            init();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full z-0"
            style={{ pointerEvents: 'none' }} // Ensure it doesn't block interactions
        />
    );
}

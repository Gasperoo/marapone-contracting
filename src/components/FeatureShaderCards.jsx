import React from 'react';
import { Warp } from '@paper-design/shaders-react';
import { useNavigate } from 'react-router-dom';
import './FeatureShaderCards.css';

const features = [
    {
        title: 'Consulting',
        description: 'Strategic consulting services to optimize your business operations and drive sustainable growth.',
        icon: (
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
            </svg>
        ),
    },
    {
        title: 'AI Solutions',
        description: 'Cutting-edge AI-powered solutions to automate processes and unlock new opportunities.',
        icon: (
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 9V7c0-1.1-.9-2-2-2h-3c0-1.66-1.34-3-3-3S9 3.34 9 5H6c-1.1 0-2 .9-2 2v2c-1.66 0-3 1.34-3 3s1.34 3 3 3v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4c1.66 0 3-1.34 3-3s-1.34-3-3-3zM7.5 11.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5S9.83 13 9 13s-1.5-.67-1.5-1.5zM16 17H8v-2h8v2zm-1-4c-.83 0-1.5-.67-1.5-1.5S14.17 10 15 10s1.5.67 1.5 1.5S15.83 13 15 13z" />
            </svg>
        ),
    },
    {
        title: 'Import/Export & Logistics',
        description: 'Comprehensive international trade and logistics optimization for seamless global operations.',
        icon: (
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
        ),
    },
    {
        title: 'Marketing Solutions',
        description: 'Data-driven marketing strategies to amplify your brand and reach your target audience.',
        icon: (
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14zm-1-6h-3V8h-2v5H8l4 4 4-4z" />
            </svg>
        ),
    },
    {
        title: 'Project Development/Management',
        description: 'End-to-end project management ensuring on-time delivery and exceptional results.',
        icon: (
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
            </svg>
        ),
    },
    {
        title: 'Contact Us',
        description: 'Get in touch with our team to discuss your project and discover how we can help.',
        icon: (
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.89 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
        ),
        isClickable: true,
        href: '/contact',
    },
];

export default function FeatureShaderCards() {
    const navigate = useNavigate();

    const getShaderConfig = (index) => {
        const configs = [
            {
                proportion: 0.3,
                softness: 0.8,
                distortion: 0.15,
                swirl: 0.6,
                swirlIterations: 8,
                shape: 'checks',
                shapeScale: 0.08,
                colors: ['hsl(280, 100%, 30%)', 'hsl(320, 100%, 60%)', 'hsl(340, 90%, 40%)', 'hsl(300, 100%, 70%)'],
            },
            {
                proportion: 0.4,
                softness: 1.2,
                distortion: 0.2,
                swirl: 0.9,
                swirlIterations: 12,
                shape: 'dots',
                shapeScale: 0.12,
                colors: ['hsl(200, 100%, 25%)', 'hsl(180, 100%, 65%)', 'hsl(160, 90%, 35%)', 'hsl(190, 100%, 75%)'],
            },
            {
                proportion: 0.35,
                softness: 0.9,
                distortion: 0.18,
                swirl: 0.7,
                swirlIterations: 10,
                shape: 'checks',
                shapeScale: 0.1,
                colors: ['hsl(120, 100%, 25%)', 'hsl(140, 100%, 60%)', 'hsl(100, 90%, 30%)', 'hsl(130, 100%, 70%)'],
            },
            {
                proportion: 0.45,
                softness: 1.1,
                distortion: 0.22,
                swirl: 0.8,
                swirlIterations: 15,
                shape: 'dots',
                shapeScale: 0.09,
                colors: ['hsl(30, 100%, 35%)', 'hsl(50, 100%, 65%)', 'hsl(40, 90%, 40%)', 'hsl(45, 100%, 75%)'],
            },
            {
                proportion: 0.38,
                softness: 0.95,
                distortion: 0.16,
                swirl: 0.85,
                swirlIterations: 11,
                shape: 'checks',
                shapeScale: 0.11,
                colors: ['hsl(250, 100%, 30%)', 'hsl(270, 100%, 65%)', 'hsl(260, 90%, 35%)', 'hsl(265, 100%, 70%)'],
            },
            {
                proportion: 0.42,
                softness: 1.0,
                distortion: 0.19,
                swirl: 0.75,
                swirlIterations: 9,
                shape: 'dots',
                shapeScale: 0.13,
                colors: ['hsl(330, 100%, 30%)', 'hsl(350, 100%, 60%)', 'hsl(340, 90%, 35%)', 'hsl(345, 100%, 75%)'],
            },
            {
                proportion: 0.36,
                softness: 0.85,
                distortion: 0.17,
                swirl: 0.65,
                swirlIterations: 10,
                shape: 'checks',
                shapeScale: 0.1,
                colors: ['hsl(0, 100%, 30%)', 'hsl(20, 100%, 60%)', 'hsl(10, 90%, 40%)', 'hsl(15, 100%, 70%)'],
            },
        ];
        return configs[index % configs.length];
    };

    const handleCardClick = (feature) => {
        if (feature.isClickable && feature.href) {
            navigate(feature.href);
        }
    };

    return (
        <section className="feature-shader-cards-section">
            <div className="feature-shader-cards-container">
                <div className="feature-shader-cards-grid">
                    {features.map((feature, index) => {
                        const shaderConfig = getShaderConfig(index);
                        return (
                            <div
                                key={index}
                                className={`feature-shader-card ${feature.isClickable ? 'clickable' : ''}`}
                                onClick={() => handleCardClick(feature)}
                            >
                                <div className="feature-shader-card-background">
                                    <Warp
                                        style={{ height: '100%', width: '100%' }}
                                        proportion={shaderConfig.proportion}
                                        softness={shaderConfig.softness}
                                        distortion={shaderConfig.distortion}
                                        swirl={shaderConfig.swirl}
                                        swirlIterations={shaderConfig.swirlIterations}
                                        shape={shaderConfig.shape}
                                        shapeScale={shaderConfig.shapeScale}
                                        scale={1}
                                        rotation={0}
                                        speed={0.8}
                                        colors={shaderConfig.colors}
                                    />
                                </div>

                                <div className="feature-shader-card-content">
                                    <div className="feature-shader-card-icon">{feature.icon}</div>
                                    <h3 className="feature-shader-card-title">{feature.title}</h3>
                                    <p className="feature-shader-card-description">{feature.description}</p>

                                    {feature.isClickable && (
                                        <div className="feature-shader-card-cta">
                                            <span className="feature-shader-card-cta-text">Learn more</span>
                                            <svg className="feature-shader-card-cta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

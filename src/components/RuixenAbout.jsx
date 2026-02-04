import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import '../styles/ruixen-about.css';

export default function RuixenAbout({
    achievements = [
        { label: 'Companies Supported', value: '300+' },
        { label: 'Projects Finalized', value: '800+' },
        { label: 'Happy Customers', value: '99%' },
        { label: 'Recognized Awards', value: '10+' },
    ],
}) {
    return (
        <div className="ruixen-about-container">
            {/* HERO SECTION */}
            <section className="ruixen-hero-section">
                <div className="ruixen-hero-content">
                    <img
                        className="ruixen-hero-image"
                        src="https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen_hero_gradient.jpg"
                        alt="Hero section"
                        width={1200}
                        height={600}
                    />

                    <div className="ruixen-hero-grid">
                        <h1 className="ruixen-hero-title">
                            The Marapone <span className="ruixen-hero-accent">ecosystem</span>{' '}
                            <span className="ruixen-hero-subtitle-inline">
                                brings together AI solutions, consulting, and global logistics.
                            </span>
                        </h1>
                        <div className="ruixen-hero-description">
                            <p>
                                Marapone is evolving to be more than just services. We support an entire ecosystem —
                                from AI-powered automation to international trade platforms helping businesses innovate and grow globally.
                            </p>
                            <Link to="/services" className="ruixen-hero-button">
                                <span>Learn More</span>
                                <svg className="ruixen-chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ABOUT SECTION */}
            <section className="ruixen-about-section">
                <div className="ruixen-about-content">
                    {/* Header */}
                    <div className="ruixen-about-header">
                        <h1 className="ruixen-about-title">About Us</h1>
                        <p className="ruixen-about-intro">
                            Marapone is a passionate team dedicated to creating innovative solutions
                            that empower businesses to thrive in the digital age through AI, consulting, and global logistics.
                        </p>
                    </div>

                    {/* THREE CARDS LAYOUT */}
                    <div className="ruixen-cards-layout">
                        {/* LEFT BIG IMAGE */}
                        <div className="ruixen-card-left">
                            <img
                                src="https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen_chat_gradient.png"
                                alt="AI Solutions"
                                className="ruixen-card-left-image"
                                width={800}
                                height={550}
                            />
                        </div>

                        {/* RIGHT TWO CARDS */}
                        <div className="ruixen-cards-right">
                            {/* FIRST CARD */}
                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                                className="ruixen-card-dark"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.4 }}
                                    className="ruixen-card-image-wrapper"
                                >
                                    <img
                                        src="https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen_moon.png"
                                        alt="Innovation"
                                        className="ruixen-card-image"
                                        width={600}
                                        height={400}
                                    />
                                    <div className="ruixen-card-gradient-overlay" />
                                </motion.div>
                                <div className="ruixen-card-body">
                                    <h3 className="ruixen-card-heading">Accelerate Growth</h3>
                                    <p className="ruixen-card-text">
                                        Our solutions drive innovation, efficiency, and measurable impact for businesses across multiple continents.
                                    </p>
                                    <Link to="/services" className="ruixen-card-button">
                                        Learn More
                                    </Link>
                                </div>
                            </motion.div>

                            {/* SECOND CARD */}
                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                                className="ruixen-card-muted"
                            >
                                <img
                                    src="https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen_hero_gradient.jpg"
                                    alt="Future Ready"
                                    className="ruixen-card-muted-image"
                                    width={600}
                                    height={400}
                                />
                                <div className="ruixen-card-muted-overlay">
                                    <h3 className="ruixen-card-heading">Future-Ready Design</h3>
                                    <p className="ruixen-card-text-light">
                                        Intuitive, scalable solutions for modern businesses combining aesthetics, functionality, and real-world results.
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

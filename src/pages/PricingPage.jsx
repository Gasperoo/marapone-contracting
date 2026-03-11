import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ArrowRight, Shield, Database, Cpu, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../components/LandingPage/LandingPage.css';

export default function PricingPage() {
    const [activeArchitecture, setActiveArchitecture] = useState('cloud'); // 'cloud' | 'on-premise'
    const [hoveredCard, setHoveredCard] = useState(null);

    const cloudTiers = [
        {
            name: 'VPC Sandbox',
            id: 'tier-sandbox',
            price: "Let's Talk",
            period: '',
            description: 'For pilot teams evaluating custom LLMs on a partitioned cloud instance.',
            features: [
                'Dedicated Partitioned Inference',
                'Up to 500k Tokens / Day',
                'Standard Data Ingestion (PDF, CSV)',
                '1 Custom RAG Pipeline',
                'Email Support (Next Business Day)',
            ],
            cta: 'Contact Us',
            ctaLink: '/contact?type=sandbox',
            highlight: false,
            color: '#8B5CF6',
        },
        {
            name: 'Dedicated Cloud Core',
            id: 'tier-cloud-core',
            price: 'Contact Us',
            period: '',
            description: 'Full production deployment within a secure, single-tenant AWS/Azure VPC.',
            features: [
                'Single-Tenant GPU Cluster',
                'Unlimited Inference Tokens',
                'Advanced ERP/CRM Connectors',
                '3 Custom RAG Pipelines',
                'SOC2 Compliant Architecture',
                'Dedicated Solution Architect'
            ],
            cta: 'Contact Us',
            ctaLink: '/contact?type=cloud-core',
            highlight: true,
            color: '#F59E0B',
        },
        {
            name: 'Global Cloud Enterprise',
            id: 'tier-cloud-enterprise',
            price: 'Contact Us',
            period: '',
            description: 'Multi-region deployment for global supply chains and massive data lakes.',
            features: [
                'Multi-Region 99.99% SLA',
                'Custom Foundation Model Fine-Tuning',
                'Unlimited RAG Pipelines',
                'Bring Your Own Cloud (BYOC)',
                'White-glove 24/7 SLA Support',
                'On-site Engineering Rotation'
            ],
            cta: 'Contact Us',
            ctaLink: '/contact?type=enterprise',
            highlight: false,
            color: '#10B981',
        }
    ];

    const onPremiseTiers = [
        {
            name: 'Air-Gapped Node',
            id: 'tier-air-gapped',
            price: 'Contact Us',
            period: '',
            description: 'A fully isolated deployment on your hardware. We provide everything from Mac-mini local LLMs for small businesses all the way to enterprise-level servers.',
            features: [
                'Full Local Model Weights Access',
                'Nvidia GPU-Powered Windows & Linux Builds',
                'Zero-Trust Architecture Ready',
                'Local Vector Database Auto-sync',
                'Secure Offline Updates via USB'
            ],
            cta: 'Contact Us',
            ctaLink: '/contact?type=air-gapped',
            highlight: false,
            color: '#EF4444',
        },
        {
            name: 'Sovereign Cluster Deploy',
            id: 'tier-sovereign',
            price: 'Contact Us',
            period: '',
            description: 'Defense-grade multi-node deployment for highly classified data environments.',
            features: [
                'Multi-Node Local Kubernetes Deploy',
                'Nvidia GPU-Powered Windows & Linux Builds',
                'Continuous Offline Fine-Tuning',
                'ITAR / HIPAA / GDPR Compliant',
                'Source Code Escrow Option',
                'Dedicated Cleared Engineering Support'
            ],
            cta: 'Contact Us',
            ctaLink: '/contact?type=sovereign',
            highlight: true,
            color: '#FF6B00',
        }
    ];

    const currentTiers = activeArchitecture === 'cloud' ? cloudTiers : onPremiseTiers;

    return (
        <div className="min-h-screen pt-32 pb-40 relative overflow-hidden text-white bg-[#0a0a0a]">

            {/* Dark Ambient Gradients */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#8B5CF6]/10 to-transparent rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#FF6B00]/10 to-transparent rounded-full -translate-x-1/3 translate-y-1/3 blur-3xl pointer-events-none" />

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">

                {/* Header Sequence */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
                    >
                        <Shield size={16} className="text-[#8B5CF6]" />
                        <span className="text-sm font-bold tracking-widest text-white/80 uppercase">Deployment Architecture</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-[1.1]"
                    >
                        Transparent <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#FF6B00] to-[#F59E0B]">Enterprise Scaling</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto mb-12 font-medium"
                    >
                        We do not charge per token. Secure a flat-rate sovereign infrastructure license based on your computational footprint and security posture.
                    </motion.p>

                    {/* Architecture Toggle */}
                    <div className="flex justify-center items-center gap-2 mb-8 p-1.5 bg-white/5 backdrop-blur-md rounded-full border border-white/10 w-fit mx-auto relative shadow-2xl">

                        <motion.div
                            className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-full z-0 pointer-events-none"
                            animate={{
                                left: activeArchitecture === 'cloud' ? '6px' : 'calc(50% + 0px)',
                                backgroundColor: 'rgba(255,255,255,0.1)'
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        />

                        <button
                            onClick={() => setActiveArchitecture('cloud')}
                            className={`relative z-10 flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold transition-colors ${activeArchitecture === 'cloud' ? 'text-white' : 'text-gray-500 hover:text-white'}`}
                        >
                            <Database size={18} className={activeArchitecture === 'cloud' ? 'text-[#8B5CF6]' : ''} />
                            Dedicated Cloud (VPC)
                        </button>
                        <button
                            onClick={() => setActiveArchitecture('on-premise')}
                            className={`relative z-10 flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold transition-colors ${activeArchitecture === 'on-premise' ? 'text-white' : 'text-gray-500 hover:text-white'}`}
                        >
                            <Cpu size={18} className={activeArchitecture === 'on-premise' ? 'text-[#FF6B00]' : ''} />
                            Air-Gapped On-Premise
                        </button>
                    </div>
                </div>

                {/* Pricing Grid */}
                <div className={`grid gap-6 items-stretch max-w-6xl mx-auto w-full ${currentTiers.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 max-w-4xl'}`}>
                    <AnimatePresence mode="popLayout">
                        {currentTiers.map((tier, idx) => (
                            <motion.div
                                key={`${activeArchitecture}-${tier.id}`}
                                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                                transition={{ duration: 0.4, delay: idx * 0.1 }}
                                onHoverStart={() => setHoveredCard(tier.id)}
                                onHoverEnd={() => setHoveredCard(null)}
                                className="relative flex flex-col h-full group"
                            >
                                <div
                                    className={`relative z-10 flex flex-col h-full bg-black/40 backdrop-blur-xl rounded-[2.5rem] p-10 border transition-all duration-300 ease-out flex-grow
                                        ${tier.highlight
                                            ? 'border-white/20 -translate-y-2 bg-gradient-to-b from-white/5 to-transparent'
                                            : hoveredCard === tier.id ? 'border-white/10 -translate-y-2' : 'border-white/5'}
                                    `}
                                    style={{
                                        boxShadow: tier.highlight ? `0 20px 50px ${tier.color}15` : (hoveredCard === tier.id ? `0 20px 40px ${tier.color}10` : 'none'),
                                    }}
                                >

                                    {/* Ambient Glow behind card */}
                                    <div
                                        className="absolute inset-0 rounded-[2.5rem] opacity-0 transition-opacity duration-500 pointer-events-none"
                                        style={{
                                            background: `radial-gradient(circle at 50% 0%, ${tier.color}10 0%, transparent 70%)`,
                                            opacity: (tier.highlight || hoveredCard === tier.id) ? 1 : 0
                                        }}
                                    />

                                    {tier.highlight && (
                                        <div
                                            className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-[0_0_20px_rgba(255,107,0,0.5)] border border-white/20"
                                            style={{ backgroundColor: tier.color }}
                                        >
                                            Most Requested
                                        </div>
                                    )}

                                    <div className="mb-8 relative z-10 flex-shrink-0">
                                        <h3 className="text-2xl font-bold mb-3 text-white">
                                            {tier.name}
                                        </h3>
                                        <p className="text-gray-400 text-sm leading-relaxed min-h-[40px] font-medium">{tier.description}</p>
                                    </div>

                                    <div className="mb-8 pb-8 border-b border-white/10 relative z-10 flex-shrink-0">
                                        <div className="flex items-end gap-1">
                                            <span className="text-5xl font-black text-white tracking-tight">
                                                {tier.price}
                                            </span>
                                            <span className="text-gray-500 font-bold tracking-wide uppercase text-sm mb-2 ml-1">{tier.period}</span>
                                        </div>
                                    </div>

                                    {/* Features List (Flex Grow Region) */}
                                    <div className="space-y-4 mb-10 flex-grow relative z-10">
                                        {tier.features.map((feature, fIdx) => (
                                            <div key={fIdx} className="flex items-start gap-4 text-sm text-gray-300 font-medium">
                                                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: `${tier.color}20` }}>
                                                    <Check className="w-3 h-3" style={{ color: tier.color }} strokeWidth={4} />
                                                </div>
                                                <span className="leading-relaxed">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* CTA Button */}
                                    <Link
                                        to={tier.ctaLink}
                                        className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-bold transition-all relative z-10 flex-shrink-0
                                            ${tier.highlight ? 'text-white' : 'bg-white/5 text-white hover:bg-white/10'}
                                        `}
                                        style={tier.highlight ? { backgroundColor: tier.color, boxShadow: `0 10px 30px ${tier.color}40` } : {}}
                                    >
                                        <span>{tier.cta}</span>
                                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                                    </Link>

                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Final Security Trust Marker */}
                <div className="mt-24 text-center">
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <Lock size={16} className="text-gray-400" />
                        <span className="text-sm font-medium text-gray-400">All pricing tiers require execution of a rigid Mutual Non-Disclosure Agreement (MNDA) prior to technical deep dives.</span>
                    </div>
                </div>

            </div>
        </div>
    );
}

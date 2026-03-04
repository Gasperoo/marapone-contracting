import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, ArrowRight, Ship, HardHat, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../components/LandingPage/LandingPage.css';
import Particles from '../components/Particles/Particles';

export default function PricingPage() {
    const [isAnnual, setIsAnnual] = useState(true);
    const [activeProduct, setActiveProduct] = useState('logistics'); // 'logistics' | 'construction'
    const [hoveredCard, setHoveredCard] = useState(null);

    const logisticsTiers = [
        {
            name: 'Scout',
            id: 'tier-scout',
            priceMonthly: 29,
            priceAnnual: 290,
            description: 'Ideal for individual traders starting their journey.',
            features: [
                'Basic HS Code Search',
                '5 Risk Assessments / mo',
                'Standard Rate Data',
                'Email Support',
            ],
            notIncluded: [
                'API Access',
                'Digital Twin Simulation',
                'Dedicated Account Manager'
            ],
            cta: 'Start 14-Day Free Trial',
            ctaLink: '/register?plan=scout',
            highlight: false,
            color: '#4b5563', // gray-600
        },
        {
            name: 'Navigator',
            id: 'tier-navigator',
            priceMonthly: 99,
            priceAnnual: 990,
            description: 'For professional traders needing deeper insights.',
            features: [
                'Advanced HS Code Classifier',
                '50 Risk Assessments / mo',
                'Real-time Market News',
                'Priority Email Support',
                'Route Optimization Tools'
            ],
            notIncluded: [
                'Digital Twin Simulation',
                'Dedicated Account Manager'
            ],
            cta: 'Get Started',
            ctaLink: '/register?plan=navigator',
            highlight: true,
            color: '#FF6B00', // Gasper Orange
        },
        {
            name: 'Captain',
            id: 'tier-captain',
            priceMonthly: 299,
            priceAnnual: 2990,
            description: 'For growing teams and SMEs scaling operations.',
            features: [
                'Unlimited HS Code Search',
                '500 Risk Assessments / mo',
                'Full Spot Rate History',
                'Digital Twin (Basic)',
                'API Access (10k calls/mo)',
                'Live Chat Support'
            ],
            notIncluded: [
                'Custom Integrations',
                'White-labeling'
            ],
            cta: 'Upgrade to Captain',
            ctaLink: '/register?plan=captain',
            highlight: false,
            color: '#ea580c', // orange-600
        },
        {
            name: 'Admiral',
            id: 'tier-admiral',
            price: 'Custom',
            description: 'Enterprise-grade power for global logistics leaders.',
            features: [
                'Unlimited Everything',
                'Full Digital Twin Suite',
                'Custom ERP Integrations',
                'Dedicated Account Manager',
                'On-premise Deployment Option',
                'SLA 99.99% Uptime'
            ],
            notIncluded: [],
            cta: 'Contact Sales',
            ctaLink: '/contact',
            highlight: false,
            color: '#c2410c', // orange-700
            isCustom: true
        }
    ];

    const constructionTiers = [
        {
            name: 'Scout',
            id: 'tier-scout-c',
            priceMonthly: 25,
            priceAnnual: 250,
            description: 'Ideal for individual contractors starting with AI tools.',
            features: [
                'Basic Blueprint Analysis',
                '5 Takeoff Reports / mo',
                'Standard AI Planner',
                'Email Support',
            ],
            notIncluded: [
                'Generative Design',
                'Predictive Maintenance',
                'Dedicated Account Manager'
            ],
            cta: 'Start 14-Day Free Trial',
            ctaLink: '/register?plan=scout-construction',
            highlight: false,
            color: '#4b5563', // gray-600
        },
        {
            name: 'Navigator',
            id: 'tier-navigator-c',
            priceMonthly: 84,
            priceAnnual: 840,
            description: 'For professional builders needing deeper intelligence.',
            features: [
                'Advanced Blueprint AI',
                '50 Takeoff Reports / mo',
                'AI Planner with Critical Path',
                'Priority Email Support',
                'Code Compliance Checker'
            ],
            notIncluded: [
                'Predictive Maintenance',
                'Dedicated Account Manager'
            ],
            cta: 'Get Started',
            ctaLink: '/register?plan=navigator-construction',
            highlight: true,
            color: '#F59E0B', // Amber
        },
        {
            name: 'Captain',
            id: 'tier-captain-c',
            priceMonthly: 254,
            priceAnnual: 2540,
            description: 'For growing firms and GCs scaling operations.',
            features: [
                'Unlimited Blueprint Analysis',
                'Unlimited Takeoffs',
                'Full AI Planner Suite',
                'Generative Design (Basic)',
                'Predictive Maintenance',
                'Live Chat Support'
            ],
            notIncluded: [
                'Custom Integrations',
                'White-labeling'
            ],
            cta: 'Upgrade to Captain',
            ctaLink: '/register?plan=captain-construction',
            highlight: false,
            color: '#d97706', // amber-600
        },
        {
            name: 'Admiral',
            id: 'tier-admiral-c',
            price: 'Custom',
            description: 'Enterprise-grade power for major construction leaders.',
            features: [
                'Unlimited Everything',
                'Full Generative Design Suite',
                'Custom BIM Integrations',
                'Dedicated Account Manager',
                'On-premise Deployment Option',
                'SLA 99.99% Uptime'
            ],
            notIncluded: [],
            cta: 'Contact Sales',
            ctaLink: '/contact',
            highlight: false,
            color: '#b45309', // amber-700
            isCustom: true
        }
    ];

    const tiers = activeProduct === 'logistics' ? logisticsTiers : constructionTiers;
    const themeColor = activeProduct === 'logistics' ? '#0EA5E9' : '#FF6B00';
    const themeSecondary = activeProduct === 'logistics' ? '#38BDF8' : '#F59E0B';

    const bgColors = {
        logistics: ['#0EA5E9', '#38BDF8', '#0284C7'],
        construction: ['#FF6B00', '#F59E0B', '#ea580c']
    };

    return (
        <div className="min-h-screen pt-32 pb-40 relative overflow-hidden transition-colors duration-1000 text-[#1a1a1a]" style={{ backgroundColor: '#F5F5F5' }}>
            {/* Dynamic Particle Background */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
                <Particles
                    key={activeProduct} // Force re-render on theme change
                    particleColors={bgColors[activeProduct]}
                    particleCount={200}
                    speed={0.1}
                    sizeRandomness={1.5}
                />
            </div>

            {/* Ambient gradients */}
            <div
                className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-[150px] opacity-[0.05] pointer-events-none transition-all duration-1000 ease-in-out"
                style={{ background: `radial-gradient(circle, ${themeColor} 0%, transparent 70%)` }}
            />

            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">

                {/* Header Sequence */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center justify-center p-4 rounded-full bg-white/60 border border-black/5 mb-8 w-20 h-20 shadow-md relative"
                    >
                        <Zap size={32} style={{ color: themeSecondary }} className="relative z-10" />
                        <div className="absolute inset-0 blur-xl opacity-20" style={{ backgroundColor: themeSecondary }} />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight text-[#1a1a1a] mb-8"
                    >
                        Transparent <span className="text-transparent bg-clip-text transition-all duration-1000" style={{ backgroundImage: `linear-gradient(to right, ${themeColor}, ${themeSecondary})` }}>Scaling</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-[#4b5563] leading-relaxed max-w-2xl mx-auto mb-12"
                    >
                        Enterprise-grade AI, priced for teams of all sizes. Choose the perfect plan for your {activeProduct === 'logistics' ? 'supply chain' : 'built environment'}.
                    </motion.p>

                    {/* Dual Engine Product Toggle */}
                    <div className="flex justify-center items-center gap-2 mb-12 p-1.5 bg-white/60 backdrop-blur-md rounded-full border border-black/5 w-fit mx-auto relative shadow-sm overflow-hidden">
                        {/* Animated sliding background indicator */}
                        <motion.div
                            className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-full z-0 pointer-events-none"
                            animate={{
                                left: activeProduct === 'logistics' ? '6px' : 'calc(50% + 0px)',
                                backgroundColor: activeProduct === 'logistics' ? '#0EA5E9' : '#FF6B00'
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        />

                        <button
                            onClick={() => setActiveProduct('logistics')}
                            className={`relative z-10 flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold transition-all ${activeProduct === 'logistics' ? 'text-white' : 'text-[#4b5563] hover:text-[#1a1a1a]'}`}
                        >
                            <Ship size={18} />
                            Logistics OS
                        </button>
                        <button
                            onClick={() => setActiveProduct('construction')}
                            className={`relative z-10 flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold transition-all ${activeProduct === 'construction' ? 'text-white' : 'text-[#4b5563] hover:text-[#1a1a1a]'}`}
                        >
                            <HardHat size={18} />
                            Construction AI
                        </button>
                    </div>

                    {/* Billing Term Toggle */}
                    <div className="flex justify-center items-center gap-4 mb-4">
                        <span className={`text-sm font-medium transition-colors ${!isAnnual ? 'text-[#1a1a1a]' : 'text-[#9ca3af]'}`}>Monthly</span>
                        <button
                            onClick={() => setIsAnnual(!isAnnual)}
                            className="relative w-14 h-8 bg-black/5 rounded-full p-1 transition-colors border border-black/10 focus:outline-none overflow-hidden"
                            style={{ boxShadow: `inset 0 2px 5px rgba(0,0,0,0.1)` }}
                        >
                            <div
                                className="absolute w-6 h-6 rounded-full transform transition-all duration-300 shadow-[0_2px_5px_rgba(0,0,0,0.2)] pointer-events-none"
                                style={{
                                    background: isAnnual ? themeSecondary : '#d1d5db',
                                    left: isAnnual ? 'calc(100% - 28px)' : '4px',
                                    top: '3px'
                                }}
                            />
                        </button>
                        <span className={`text-sm font-medium transition-colors ${isAnnual ? 'text-[#1a1a1a]' : 'text-[#9ca3af]'}`}>
                            Yearly <span style={{ color: themeSecondary }} className="text-xs font-bold ml-1 px-2 py-0.5 rounded-full bg-white border border-black/5">Save 20%</span>
                        </span>
                    </div>
                </div>

                {/* Framer Motion Layout for Pricing Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch max-w-7xl mx-auto w-full">
                    <AnimatePresence mode="popLayout">
                        {tiers.map((tier, idx) => (
                            <motion.div
                                key={`${activeProduct}-${tier.id}`}
                                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                                transition={{ duration: 0.4, delay: idx * 0.1 }}
                                onHoverStart={() => setHoveredCard(tier.id)}
                                onHoverEnd={() => setHoveredCard(null)}
                                className="relative flex flex-col h-full"
                            >
                                <div
                                    className={`uiverse-depth-card relative z-10 flex flex-col h-full bg-white backdrop-blur-xl rounded-3xl p-8 border transition-all duration-300 ease-out flex-grow
                                        ${tier.highlight
                                            ? 'shadow-[0_10px_30px_rgba(255,107,0,0.15)] -translate-y-2'
                                            : hoveredCard === tier.id ? '-translate-y-2' : ''}
                                    `}
                                    style={{
                                        borderColor: tier.highlight ? tier.color : (hoveredCard === tier.id ? `${tier.color}40` : 'rgba(0,0,0,0.05)'),
                                        boxShadow: tier.highlight ? `0 20px 50px ${tier.color}15` : (hoveredCard === tier.id ? `0 20px 40px ${tier.color}10` : '0 5px 20px rgba(0,0,0,0.02)'),
                                    }}
                                >

                                    {/* Ambient Glow behind card */}
                                    <div
                                        className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 pointer-events-none"
                                        style={{
                                            background: `radial-gradient(circle at 50% 0%, ${tier.color}10 0%, transparent 70%)`,
                                            opacity: (tier.highlight || hoveredCard === tier.id) ? 1 : 0
                                        }}
                                    />

                                    {tier.highlight && (
                                        <div
                                            className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md"
                                            style={{ background: `linear-gradient(90deg, ${themeColor}, ${themeSecondary})` }}
                                        >
                                            Most Popular
                                        </div>
                                    )}

                                    <div className="mb-8 relative z-10 flex-shrink-0">
                                        <h3 className="text-2xl font-bold mb-3 transition-colors text-[#1a1a1a]" style={{ color: (tier.highlight || hoveredCard === tier.id) ? tier.color : '#1a1a1a' }}>
                                            {tier.name}
                                        </h3>
                                        <p className="text-[#4b5563] text-sm leading-relaxed min-h-[40px]">{tier.description}</p>
                                    </div>

                                    <div className="mb-8 pb-8 border-b border-black/5 relative z-10 flex-shrink-0">
                                        {tier.isCustom ? (
                                            <div className="text-4xl font-bold text-[#1a1a1a] tracking-tight">Enterprise</div>
                                        ) : (
                                            <div className="flex items-end gap-1">
                                                <span className="text-5xl font-bold text-[#1a1a1a] tracking-tight">
                                                    ${isAnnual ? Math.round(tier.priceAnnual / 12) : tier.priceMonthly}
                                                </span>
                                                <span className="text-[#6b7280] font-medium mb-1">/mo</span>
                                            </div>
                                        )}
                                        {!tier.isCustom && isAnnual && (
                                            <div className="text-sm font-medium mt-2" style={{ color: themeSecondary }}>
                                                Billed ${tier.priceAnnual} yearly
                                            </div>
                                        )}
                                        {!tier.isCustom && !isAnnual && (
                                            <div className="text-sm text-transparent mt-2 pointer-events-none select-none">
                                                Placeholder
                                            </div>
                                        )}
                                    </div>

                                    {/* Features List (Flex Grow Region) */}
                                    <div className="space-y-4 mb-8 flex-grow relative z-10">
                                        {tier.features.map((feature, fIdx) => (
                                            <div key={fIdx} className="flex items-start gap-3 text-sm text-[#1a1a1a]">
                                                <Check className="w-5 h-5 mt-0 flex-shrink-0" style={{ color: tier.color }} strokeWidth={3} />
                                                <span className="leading-tight pt-0.5">{feature}</span>
                                            </div>
                                        ))}
                                        {tier.notIncluded.map((feature, fIdx) => (
                                            <div key={fIdx} className="flex items-start gap-3 text-sm text-[#9ca3af]">
                                                <X className="w-5 h-5 mt-0 flex-shrink-0 opacity-50" strokeWidth={2} />
                                                <span className="leading-tight pt-0.5">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* CTA Button (Forced to Bottom) */}
                                    <Link
                                        to={tier.ctaLink}
                                        className={`w-full block text-center py-4 rounded-xl text-[15px] font-bold transition-all relative z-10 flex-shrink-0 overflow-hidden group`}
                                        style={tier.highlight
                                            ? { background: tier.color, color: '#ffffff' }
                                            : { background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.1)', color: '#1a1a1a' }
                                        }
                                    >
                                        <span className="relative z-10">{tier.cta}</span>
                                        {/* Hover glare effect */}
                                        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent z-0" />
                                    </Link>

                                    {/* Animated border bottom line */}
                                    <motion.div
                                        className="absolute inset-x-0 bottom-0 h-1.5 rounded-b-3xl opacity-0"
                                        animate={{ opacity: (tier.highlight || hoveredCard === tier.id) ? 1 : 0 }}
                                        style={{ backgroundColor: tier.color, boxShadow: `0 -5px 15px ${tier.color}40` }}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Enterprise / Need Help */}
                <div className="mt-32 text-center max-w-4xl mx-auto px-6">
                    <div className="p-12 rounded-3xl border border-black/5 bg-white shadow-xl">
                        <h3 className="text-3xl font-bold text-[#1a1a1a] mb-6">Need a Custom Engine?</h3>
                        <p className="text-xl text-[#4b5563] max-w-2xl mx-auto mb-8">
                            Our architecture team can build bespoke LLM models and workflows tailored specifically to your private {activeProduct === 'logistics' ? 'supply chain' : 'construction'} data silos.
                        </p>
                        <Link to="/contact" className="inline-flex items-center px-8 py-4 rounded-full font-bold text-white transition-all hover:scale-105" style={{ background: themeSecondary, boxShadow: `0 5px 20px ${themeSecondary}40` }}>
                            Contact Deep Tech Sales <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </div>
                </div>

            </div>

            <style>{`
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </div>
    );
}

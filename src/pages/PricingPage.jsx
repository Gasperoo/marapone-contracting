import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, X, HelpCircle, ArrowRight, Ship, HardHat } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../components/LandingPage/LandingPage.css'; // Reuse container styles

export default function PricingPage() {
    const [isAnnual, setIsAnnual] = useState(true);
    const [activeProduct, setActiveProduct] = useState('logistics');

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
            color: 'text-blue-400',
            borderColor: 'border-blue-500/30'
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
            color: 'text-[#5227FF]',
            borderColor: 'border-[#5227FF]'
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
            color: 'text-purple-400',
            borderColor: 'border-purple-500/30'
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
            color: 'text-amber-400',
            borderColor: 'border-amber-500/30',
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
            color: 'text-blue-400',
            borderColor: 'border-blue-500/30'
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
            color: 'text-[#FF6B00]',
            borderColor: 'border-[#FF6B00]'
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
            color: 'text-purple-400',
            borderColor: 'border-purple-500/30'
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
            color: 'text-amber-400',
            borderColor: 'border-amber-500/30',
            isCustom: true
        }
    ];

    const tiers = activeProduct === 'logistics' ? logisticsTiers : constructionTiers;
    const accentColor = activeProduct === 'logistics' ? '#5227FF' : '#FF6B00';

    return (
        <div className="landing-container pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="hero-title mb-6 mx-auto"
                    >
                        Transparent <span style={{ color: accentColor }}>Pricing</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="hero-subtitle mb-8"
                    >
                        Choose the perfect plan for your {activeProduct === 'logistics' ? 'logistics' : 'construction'} needs. No hidden fees.
                    </motion.p>

                    {/* Product Toggle */}
                    <div className="flex justify-center items-center gap-2 mb-6">
                        <button
                            onClick={() => setActiveProduct('logistics')}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${activeProduct === 'logistics' ? 'bg-[#5227FF] text-white shadow-lg shadow-[#5227FF]/30' : 'bg-white/5 text-white/60 hover:text-white border border-white/10'}`}
                        >
                            <Ship size={16} />
                            Logistics
                        </button>
                        <button
                            onClick={() => setActiveProduct('construction')}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${activeProduct === 'construction' ? 'bg-[#FF6B00] text-white shadow-lg shadow-[#FF6B00]/30' : 'bg-white/5 text-white/60 hover:text-white border border-white/10'}`}
                        >
                            <HardHat size={16} />
                            Construction
                        </button>
                    </div>

                    {/* Billing Toggle */}
                    <div className="flex justify-center items-center gap-4 mb-8">
                        <span className={`text-sm font-medium ${!isAnnual ? 'text-white' : 'text-slate-400'}`}>Monthly</span>
                        <button
                            onClick={() => setIsAnnual(!isAnnual)}
                            className="relative w-14 h-8 bg-slate-800 rounded-full p-1 transition-colors hover:bg-slate-700 focus:outline-none border border-white/10"
                        >
                            <div
                                className={`w-6 h-6 rounded-full shadow-lg transform transition-transform ${isAnnual ? 'translate-x-6' : 'translate-x-0'}`}
                                style={{ background: accentColor }}
                            />
                        </button>
                        <span className={`text-sm font-medium ${isAnnual ? 'text-white' : 'text-slate-400'}`}>
                            Yearly <span style={{ color: accentColor }} className="text-xs font-bold ml-1">(Save 20%)</span>
                        </span>
                    </div>
                </div>

                {/* Pricing Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
                    {tiers.map((tier, idx) => (
                        <motion.div
                            key={tier.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`relative bg-white/5 rounded-2xl p-6 border transition-all duration-300 hover:transform hover:-translate-y-1 ${tier.highlight ? `border-[${accentColor}] shadow-[0_0_30px_${accentColor}26] bg-white/[0.07]` : 'border-white/10 hover:border-white/20'}`}
                            style={tier.highlight ? { borderColor: accentColor, boxShadow: `0 0 30px ${accentColor}26` } : {}}
                        >
                            {tier.highlight && (
                                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider" style={{ background: accentColor }}>
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-6">
                                <h3 className={`text-lg font-bold mb-2 ${tier.color}`}>{tier.name}</h3>
                                <p className="text-slate-400 text-sm h-10">{tier.description}</p>
                            </div>

                            <div className="mb-6">
                                {tier.isCustom ? (
                                    <div className="text-3xl font-bold text-white">Contact Us</div>
                                ) : (
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-bold text-white">
                                            ${isAnnual ? Math.round(tier.priceAnnual / 12) : tier.priceMonthly}
                                        </span>
                                        <span className="text-slate-500 text-sm">/mo</span>
                                    </div>
                                )}
                                {!tier.isCustom && isAnnual && (
                                    <div className="text-xs text-slate-500 mt-1">
                                        Billed ${tier.priceAnnual} yearly
                                    </div>
                                )}
                            </div>

                            <Link
                                to={tier.ctaLink}
                                className={`w-full block text-center py-2.5 rounded-lg text-sm font-semibold transition-all mb-8 ${tier.highlight
                                    ? 'text-white shadow-lg'
                                    : 'bg-white/10 hover:bg-white/20 text-white'
                                    }`}
                                style={tier.highlight ? { background: accentColor, boxShadow: `0 10px 25px ${accentColor}40` } : {}}
                            >
                                {tier.cta}
                            </Link>

                            <div className="space-y-3">
                                {tier.features.map((feature, fIdx) => (
                                    <div key={fIdx} className="flex items-start gap-3 text-sm text-slate-300">
                                        <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${tier.color}`} />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                                {tier.notIncluded.map((feature, fIdx) => (
                                    <div key={fIdx} className="flex items-start gap-3 text-sm text-slate-500 opacity-60">
                                        <X className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>

                        </motion.div>
                    ))}
                </div>

                {/* Enterprise / Need Help */}
                <div className="mt-20 text-center border-t border-white/10 pt-12">
                    <h3 className="text-xl font-semibold text-white mb-4">Need a Custom Solution?</h3>
                    <p className="text-slate-400 max-w-2xl mx-auto mb-8">
                        Our team can build bespoke AI models and workflows tailored specifically to your {activeProduct === 'logistics' ? 'supply chain' : 'construction'} data.
                    </p>
                    <Link to="/contact" className="font-medium inline-flex items-center transition-colors hover:text-white" style={{ color: accentColor }}>
                        Contact our Sales Team <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                </div>

            </div>
        </div>
    );
}

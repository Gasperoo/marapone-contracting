import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, X, HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../components/LandingPage/LandingPage.css'; // Reuse container styles

export default function PricingPage() {
    const [isAnnual, setIsAnnual] = useState(true);

    const tiers = [
        {
            name: 'Scout',
            id: 'tier-scout',
            priceMonthly: 29,
            priceAnnual: 290, // 2 months free
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

    return (
        <div className="landing-container pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="hero-title mb-6"
                    >
                        Transparent <span className="text-[#5227FF]">Pricing</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="hero-subtitle mb-8"
                    >
                        Choose the perfect plan for your logistics needs. No hidden fees.
                    </motion.p>

                    {/* Toggle */}
                    <div className="flex justify-center items-center gap-4 mb-8">
                        <span className={`text-sm font-medium ${!isAnnual ? 'text-white' : 'text-slate-400'}`}>Monthly</span>
                        <button
                            onClick={() => setIsAnnual(!isAnnual)}
                            className="relative w-14 h-8 bg-slate-800 rounded-full p-1 transition-colors hover:bg-slate-700 focus:outline-none border border-white/10"
                        >
                            <div
                                className={`w-6 h-6 rounded-full bg-[#5227FF] shadow-lg transform transition-transform ${isAnnual ? 'translate-x-6' : 'translate-x-0'}`}
                            />
                        </button>
                        <span className={`text-sm font-medium ${isAnnual ? 'text-white' : 'text-slate-400'}`}>
                            Yearly <span className="text-[#5227FF] text-xs font-bold ml-1">(Save 20%)</span>
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
                            className={`relative bg-white/5 rounded-2xl p-6 border transition-all duration-300 hover:transform hover:-translate-y-1 ${tier.highlight ? 'border-[#5227FF] shadow-[0_0_30px_rgba(82,39,255,0.15)] bg-white/[0.07]' : 'border-white/10 hover:border-white/20'}`}
                        >
                            {tier.highlight && (
                                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#5227FF] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
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
                                        ? 'bg-[#5227FF] hover:bg-[#4015ff] text-white shadow-lg shadow-[#5227FF]/25'
                                        : 'bg-white/10 hover:bg-white/20 text-white'
                                    }`}
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
                        Our team can build bespoke AI models and logic flows tailored specifically to your supply chain data.
                    </p>
                    <Link to="/contact" className="text-[#5227FF] hover:text-white font-medium inline-flex items-center transition-colors">
                        Contact our Sales Team <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                </div>

            </div>
        </div>
    );
}

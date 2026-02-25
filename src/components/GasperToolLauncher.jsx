import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
    Ship, Anchor, Globe, Truck, ArrowRight,
    HardHat, Ruler, BrainCircuit, Boxes, Wrench,
    Home as HomeIcon, Zap
} from 'lucide-react';
import './LandingPage/LandingPage.css';

const tools = [
    {
        id: 'logistics',
        title: 'Import/Export & Logistics',
        subtitle: 'Supply Chain Intelligence OS',
        description: 'AI-powered tracking, compliance, rate comparison, digital twin simulation, and market intelligence for global trade operations.',
        route: '/gasper/logistics',
        accentColor: '#22d3ee',
        gradientFrom: '#5227FF',
        gradientTo: '#22d3ee',
        icon: Ship,
        features: [
            { icon: Globe, label: 'Real-Time Tracking' },
            { icon: Anchor, label: 'Digital Twin' },
            { icon: Truck, label: 'Rate Optimization' },
        ],
        stats: { label: 'Connected Carriers', value: '500+' }
    },
    {
        id: 'construction',
        title: 'Construction & Project Mgmt',
        subtitle: 'Construction Intelligence OS',
        description: 'Advanced blueprint analysis, AI-powered planning, generative 3D design, predictive maintenance, and intelligent takeoff tools.',
        route: '/gasper/construction',
        accentColor: '#FF6B00',
        gradientFrom: '#FF6B00',
        gradientTo: '#FFB800',
        icon: HardHat,
        features: [
            { icon: Ruler, label: 'Blueprint AI' },
            { icon: BrainCircuit, label: 'AI Planner' },
            { icon: Wrench, label: 'Predictive Maint.' },
        ],
        stats: { label: 'Prediction Accuracy', value: '97.8%' }
    }
];

export default function GasperToolLauncher() {
    const navigate = useNavigate();

    return (
        <div className="landing-container min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-12">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#5227FF]/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#FF6B00]/8 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1.5s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#22d3ee]/5 rounded-full blur-[150px]" />
            </div>

            {/* Header */}
            <motion.div
                className="relative z-10 text-center mb-12"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm font-medium mb-6">
                    <Zap size={14} className="text-[#5227FF]" />
                    Gasper Tool Suite
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                    Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5227FF] to-[#22d3ee]">Command Center</span>
                </h1>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                    Two industry-defining AI platforms. One ecosystem. Select your domain to begin.
                </p>
            </motion.div>

            {/* Tool Cards */}
            <div className="relative z-10 grid md:grid-cols-2 gap-8 max-w-5xl w-full">
                {tools.map((tool, idx) => (
                    <motion.div
                        key={tool.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + idx * 0.15, duration: 0.6 }}
                        onClick={() => navigate(tool.route)}
                        className="group relative cursor-pointer"
                    >
                        {/* Card Glow */}
                        <div
                            className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                            style={{ background: `linear-gradient(135deg, ${tool.gradientFrom}30, ${tool.gradientTo}30)` }}
                        />

                        {/* Card */}
                        <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/[0.06] group-hover:-translate-y-2 overflow-hidden h-full">
                            {/* Top accent line */}
                            <div
                                className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{ background: `linear-gradient(90deg, transparent, ${tool.accentColor}, transparent)` }}
                            />

                            {/* Background gradient */}
                            <div
                                className="absolute top-0 right-0 w-64 h-64 opacity-5 group-hover:opacity-10 transition-opacity duration-500 rounded-full blur-3xl"
                                style={{ background: tool.accentColor }}
                            />

                            {/* Icon */}
                            <div className="relative mb-6">
                                <div
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                                    style={{ background: `${tool.accentColor}15`, border: `1px solid ${tool.accentColor}30` }}
                                >
                                    <tool.icon size={32} style={{ color: tool.accentColor }} />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="relative">
                                <div
                                    className="text-xs font-bold uppercase tracking-widest mb-2"
                                    style={{ color: tool.accentColor }}
                                >
                                    {tool.subtitle}
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">{tool.title}</h2>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6">{tool.description}</p>

                                {/* Feature Pills */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {tool.features.map((feat, fIdx) => (
                                        <div
                                            key={fIdx}
                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/70"
                                        >
                                            <feat.icon size={12} style={{ color: tool.accentColor }} />
                                            {feat.label}
                                        </div>
                                    ))}
                                </div>

                                {/* Stats */}
                                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                    <div>
                                        <div className="text-xs text-slate-500 uppercase tracking-wider">{tool.stats.label}</div>
                                        <div className="text-xl font-bold text-white">{tool.stats.value}</div>
                                    </div>
                                    <div
                                        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 group-hover:gap-3"
                                        style={{
                                            background: `linear-gradient(135deg, ${tool.gradientFrom}, ${tool.gradientTo})`,
                                            color: 'white',
                                            boxShadow: `0 4px 15px ${tool.gradientFrom}40`
                                        }}
                                    >
                                        Launch <ArrowRight size={16} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Back to site */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                onClick={() => navigate('/')}
                className="relative z-10 mt-10 flex items-center gap-2 text-white/40 hover:text-white/70 text-sm transition-colors"
            >
                <HomeIcon size={14} />
                Back to Marapone.com
            </motion.button>
        </div>
    );
}

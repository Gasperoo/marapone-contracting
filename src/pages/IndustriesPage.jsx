import React from 'react';
import { motion } from 'motion/react';
import {
    Anchor, ShieldCheck, Zap, ArrowRight,
    HardHat, Globe, Cpu, BarChart3,
    AlertTriangle, Layers
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Particles from '../components/Particles/Particles';

// Reusable Industry Section
const IndustrySection = ({ industry, index }) => {
    const isEven = index % 2 === 0;

    return (
        <div className={`py-16 md:py-32 relative ${isEven ? 'bg-white/40 border-y border-black/5' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
                    
                    {/* Left/Header block */}
                    <div className="lg:w-1/3">
                        <div className="lg:sticky lg:top-32">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-[2rem] flex items-center justify-center mb-6 md:mb-8 shadow-sm border border-black/5"
                                style={{ backgroundColor: `${industry.color}15`, color: industry.color }}
                            >
                                {industry.icon}
                            </motion.div>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                className="text-3xl md:text-5xl font-black text-[#1a1a1a] mb-4 md:mb-6 tracking-tight leading-[1.1]"
                            >
                                {industry.title}
                            </motion.h2>
                            {/* Decorative Line */}
                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                className="h-1.5 w-16 md:w-24 rounded-full mb-8 origin-left"
                                style={{ backgroundColor: industry.color }}
                            />
                        </div>
                    </div>

                    {/* Right/Content block */}
                    <div className="lg:w-2/3 flex flex-col gap-6 md:gap-8">
                        {/* The Challenge */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                        >
                            <div className="flex items-center gap-3 mb-4 md:mb-5">
                                <AlertTriangle size={24} className="text-[#EF4444]" />
                                <h3 className="text-xl font-bold text-[#1a1a1a]">The Challenge</h3>
                            </div>
                            <p className="text-base md:text-lg text-gray-600 leading-relaxed font-medium">
                                {industry.challenge}
                            </p>
                        </motion.div>

                        {/* The Marapone Solution */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ delay: 0.1 }}
                            className="bg-[#1a1a1a] rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-[0_20px_40px_rgb(0,0,0,0.15)] relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-white/5 rounded-bl-full pointer-events-none" />
                            <div className="flex items-center gap-3 mb-4 md:mb-5 relative z-10">
                                <Layers size={24} className="text-white" />
                                <h3 className="text-xl font-bold text-white">The Marapone Solution</h3>
                            </div>
                            <p className="text-base md:text-lg text-gray-300 leading-relaxed font-medium relative z-10">
                                {industry.solution}
                            </p>
                        </motion.div>

                        {/* GasperAI Use Case */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 border shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative overflow-hidden group"
                            style={{ borderColor: `${industry.color}20` }}
                        >
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                                style={{ background: `radial-gradient(circle at top right, ${industry.color}10, transparent 60%)` }} />
                            
                            <div className="flex items-center justify-between mb-6 md:mb-8 relative z-10">
                                <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-full border text-[10px] md:text-xs font-bold uppercase tracking-widest bg-white shadow-sm"
                                    style={{ borderColor: `${industry.color}30`, color: industry.color }}>
                                    <Cpu size={14} /> GasperAI Use Case
                                </div>
                            </div>
                            <h3 className="text-xl md:text-2xl font-black text-[#1a1a1a] mb-4 md:mb-5 relative z-10">
                                {industry.useCaseTitle}
                            </h3>
                            <p className="text-base md:text-lg text-gray-600 leading-relaxed font-medium relative z-10">
                                {industry.useCaseDesc}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function IndustriesPage() {
    const verticals = [
        {
            id: 'construction',
            title: 'Heavy Construction',
            icon: <HardHat size={40} />,
            color: '#FF6B00',
            challenge: 'Mega-projects suffer from disjointed communication between architects, site managers, and subcontractors. Critical insights—such as daily drone scans, unstructured RFI logs, and BIM models—are trapped in proprietary silos, making it impossible to accurately forecast cash flow or schedule slips.',
            solution: 'Marapone creates a centralized intelligence layer for the entire project portfolio. Our AI visually analyzes terabytes of daily site scans, compares them against original 3D BIM models, and correlates structural construction deviations with financial burn rates from the accounting software.',
            useCaseTitle: '4D Site Simulation & Cash Flow Guard',
            useCaseDesc: 'The system autonomously identifies structural deviations from blueprints by analyzing regular drone footage. When a discrepancy is detected, it calculates the associated schedule delay, updates financial cash flow forecasts, and automatically drafts Request For Information (RFI) alerts to the architects before costly rework is required.'
        },
        {
            id: 'maritime',
            title: 'Maritime Logistics',
            icon: <Anchor size={40} />,
            color: '#0EA5E9',
            challenge: 'Global shipping relies on millions of unstructured, multi-language documents—Bills of Lading, Customs Declarations, and Manifests—coupled with volatile satellite routing telemetry. This fragmentation leads to severe supply chain blind spots, unpredicted demurrage fees, and inefficient exception management.',
            solution: 'We deploy specialized multimodal agents that ingest raw, unstructured shipping manifests alongside live Global Information System (GIS) data. The AI normalizes these disparate inputs into a unified intelligence graph, bringing dark data into the light and predicting logistical crises before they manifest.',
            useCaseTitle: 'Global Digital Twin & Customs AI',
            useCaseDesc: 'By analyzing incoming maritime manifests against real-time satellite ship tracking, the Gasper engine predicts port dock delays days in advance. It autonomously routes exception alerts to operators and pre-generates the required customs clearance documentation to aggressively cut dwell times.'
        },
        {
            id: 'finance',
            title: 'Finance & Procurement',
            icon: <BarChart3 size={40} />,
            color: '#8B5CF6',
            challenge: 'Enterprise procurement divisions manually reconcile massive volumes of complex vendor contracts against shifting Service Level Agreements (SLAs) and volatile raw material pricing. Human analysts cannot monitor every invoice for subtle compliance deviations, leading to millions in uncaptured revenue leakage.',
            solution: 'Our neural networks natively integrate with major ERP systems (SAP, Oracle) via secure connectors. The bespoke LLM acts as an autonomous auditor, constantly reading vendor performance reports, macro-economic indicators, and the exact legal text of thousands of active contracts.',
            useCaseTitle: 'Autonomous Contract Reconciliation',
            useCaseDesc: 'Ingesting 10,000+ vendor invoices monthly, the AI cross-references every line item against the specific contractual SLAs and current market index pricing. It automatically flags non-compliant charges, routes them for procurement review, and drafts negotiation emails to the offending vendors.'
        },
        {
            id: 'grid',
            title: 'Grid Infrastructure',
            icon: <Zap size={40} />,
            color: '#F59E0B',
            challenge: 'Modernizing legacy power grids requires analyzing decades of handwritten maintenance logs, localized micro-weather patterns, and real-time IoT load data across entirely disconnected utility systems. The volume of data overwhelms human operators, shifting maintenance from predictive to purely reactive.',
            solution: 'The Gasper framework bridges the analog and digital divide. It synthesizes historical field maintenance records with live, high-frequency sensor telemetry to create predictive health models. We integrate these models directly into enterprise asset management (EAM) systems.',
            useCaseTitle: 'Predictive Load & Maintenance Orchestration',
            useCaseDesc: 'The AI continuously synthesizes unstructured field technician reports with IoT transformer temperatures. It identifies microscopic anomalies and predicts localized grid failures 48 hours in advance, automatically drafting work orders and dispatching field teams before an emergency repair is necessary.'
        },
        {
            id: 'defense',
            title: 'Defense & Aerospace',
            icon: <ShieldCheck size={40} />,
            color: '#10B981',
            challenge: 'Handling highly sensitive, compartmentalized technical data (CUI/ITAR) across air-gapped networks. Legacy parsers cannot ingest complex engineering blueprints or defense procurement schematics without severe security exposure. Data silos lead to critical bottlenecks in manufacturing and supply chain coordination.',
            solution: 'Marapone engineers completely isolated, on-premise LLM environments. Our zero-trust ingestion pipeline securely processes hundreds of gigabytes of raw military schematics, technical manuals, and procurement histories offline, allowing defense contractors to maintain absolute data sovereignty while modernizing their intelligence capabilities.',
            useCaseTitle: 'ITAR-Compliant Schematic Inference',
            useCaseDesc: 'The system automatically cross-references incoming multi-page Request For Proposals (RFPs) against historical engineering parameters and authorized, cleared vendor lists. The autonomous agent flags supply chain vulnerabilities and generates initial compliance reports without the source data ever leaving the secure facility.'
        }
    ];

    return (
        <div className="min-h-screen pt-32 pb-0 relative overflow-hidden bg-[#F5F5F5] text-[#1a1a1a]">
            {/* Ambient Background */}
            <div className="fixed inset-0 z-0 pointer-events-none" style={{ willChange: 'transform' }}>
                <Particles
                    particleColors={['#8B5CF6', '#1a1a1a', '#FF6B00', '#0EA5E9']}
                    particleCount={120}
                    speed={0.05}
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header Section */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[var(--color-primary)]/10 bg-[var(--color-primary)]/5 text-[var(--color-primary)] shadow-sm mb-8"
                    >
                        <Globe size={16} className="text-[#8B5CF6]" />
                        <span className="text-sm font-bold tracking-[0.15em] uppercase">Enterprise Verticals</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black tracking-tight text-[#1a1a1a] mb-8 leading-[1.05]"
                    >
                        Intelligence For <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#1a1a1a] to-[#FF6B00]">Physical Operations</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-500 leading-[1.7] font-medium mx-auto max-w-3xl"
                    >
                        Discover how the world's most complex industries are deploying fully sovereign Marapone large language models to turn operational chaos into structural clarity.
                    </motion.p>
                </div>
            </div>

            {/* Verticals List */}
            <div className="relative z-10 mt-12">
                {verticals.map((industry, index) => (
                    <IndustrySection key={industry.id} industry={industry} index={index} />
                ))}
            </div>

            {/* Bottom Global CTA */}
            <div className="relative z-10 bg-white py-32 border-t border-black/5">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center px-6"
                >
                    <h2 className="text-4xl md:text-5xl font-black text-[#1a1a1a] mb-6 tracking-tight">Don't see your specific sector?</h2>
                    <p className="text-xl text-gray-500 mb-12 font-medium leading-[1.7]">
                        Our foundational models are domain-agnostic before they are trained on your unique data. We can architect a specialized intelligence solution for any complex enterprise operation.
                    </p>
                    <div className="flex justify-center">
                        <Link to="/contact" className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white bg-[#1a1a1a] rounded-xl hover:bg-black transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 group">
                            Speak with Engineering <ArrowRight size={20} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}


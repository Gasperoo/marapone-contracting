import React, { useState, forwardRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    Anchor, Truck, Factory, Fuel, ArrowRight,
    HardHat, Stethoscope, Building2, Server, Globe,
    ShieldCheck, Cpu
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Particles from '../components/Particles/Particles';

// Reusable animated Industry Node component
const IndustryNode = forwardRef(({ icon, title, description, color, useCase, category, isHovered, onHover, onClick, isSelected }, ref) => {
    return (
        <motion.div
            ref={ref}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onMouseEnter={onHover}
            onMouseLeave={() => onHover(null)}
            onClick={onClick}
            className={`relative p-8 rounded-[1.5rem] cursor-pointer transition-all duration-500 border backdrop-blur-xl overflow-hidden group
                ${isSelected || isHovered
                    ? 'bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] scale-[1.02] border-transparent'
                    : 'bg-white/60 border-black/5 hover:bg-white/90 shadow-sm'}
            `}
            style={{
                boxShadow: (isSelected || isHovered) ? `0 20px 40px ${color}15, inset 0 0 0 1px ${color}40` : 'none',
            }}
        >
            {/* Hover Gradient Background */}
            <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`}
                style={{ background: `radial-gradient(circle at top right, ${color}, transparent 70%)` }}
            />

            <div className={`w-14 h-14 rounded-2xl mb-8 flex items-center justify-center transition-all duration-300 relative z-10 ${isHovered || isSelected ? 'scale-110' : ''}`}
                style={{ backgroundColor: `${color}15`, color: color, boxShadow: (isHovered || isSelected) ? `0 0 25px ${color}30` : 'none' }}>
                {icon}
            </div>

            <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4 relative z-10">{title}</h3>
            <p className="text-[#6b7280] text-base leading-relaxed mb-6 line-clamp-3 relative z-10">{description}</p>

            <div className={`pt-6 border-t border-black/5 flex items-center justify-between text-xs font-bold uppercase tracking-widest transition-colors duration-300 relative z-10 ${isHovered || isSelected ? '' : 'text-[#9ca3af]'}`}
                style={{ color: (isHovered || isSelected) ? color : undefined }}>
                <span>{category}</span>
                <ArrowRight size={18} className={`transform transition-transform ${isHovered || isSelected ? 'translate-x-1' : ''}`} />
            </div>
        </motion.div>
    );
});

export default function IndustriesPage() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [hoveredIndustry, setHoveredIndustry] = useState(null);
    const [selectedIndustry, setSelectedIndustry] = useState(null);

    const industries = [
        // Supply Chain Phase
        { id: 'maritime', category: 'Supply Chain', icon: <Anchor size={28} />, title: 'Global Maritime', description: 'Deploy a sovereign LLM to predict port congestion, automatically classify HS codes, and flag geopolitical risks across all shipping lanes.', color: '#0EA5E9', useCase: 'Voyage Risk Predictor' },
        { id: 'logistics', category: 'Supply Chain', icon: <Truck size={28} />, title: 'Freight & Logistics', description: 'Instantly parse thousands of Bills of Lading and Commercial Invoices. The AI routes exceptions directly to human operators for approval.', color: '#38BDF8', useCase: 'Document Ingestion Engine' },
        { id: 'manufacturing', category: 'Manufacturing', icon: <Factory size={28} />, title: 'Heavy Manufacturing', description: 'Connect IoT sensor data with supply chain telemetry. The LLM predicts material shortages weeks before they impact the production line.', color: '#8B5CF6', useCase: 'Supply Line Forecaster' },

        // Built Environment Phase
        { id: 'general-contracting', category: 'Built Environment', icon: <Building2 size={28} />, title: 'General Contracting', description: 'Generative AI parses unstructured RFPs, local building codes, and massive 2D blueprint sets into structured, actionable intelligence instantly.', color: '#FF6B00', useCase: 'Automated Takeoff & Compliance' },
        { id: 'heavy-civil', category: 'Built Environment', icon: <HardHat size={28} />, title: 'Heavy Civil', description: 'Unify disparate job site data. The AI correlates daily drone scans with safety logs and financial burn rates to predict schedule slips.', color: '#F59E0B', useCase: '4D Site Simulation' },

        // Regulated Sectors
        { id: 'pharma', category: 'Regulated Sectors', icon: <Stethoscope size={28} />, title: 'Pharma & Life Sciences', description: 'Train a sovereign model entirely on your proprietary clinical trial data and cold-chain compliance logs to ensure zero-defect distribution.', color: '#10B981', useCase: 'Cold-Chain Validation AI' },
        { id: 'energy', category: 'Regulated Sectors', icon: <Fuel size={28} />, title: 'Energy & Resources', description: 'Manage massive infrastructure projects. The AI monitors global equipment sourcing and cross-references it against strict regulatory frameworks.', color: '#14B8A6', useCase: 'Regulatory Sync Engine' }
    ];

    const filteredIndustries = activeFilter === 'all'
        ? industries
        : industries.filter(ind => ind.category.toLowerCase() === activeFilter.toLowerCase().replace('-', ' '));

    return (
        <div className="min-h-screen pt-32 pb-24 relative overflow-hidden text-[#1a1a1a]" style={{ backgroundColor: '#F5F5F5' }}>
            {/* Ambient Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Particles
                    key={activeFilter}
                    particleColors={['#8B5CF6', '#1a1a1a', '#FF6B00', '#0EA5E9']}
                    particleCount={150}
                    particleSpread={15}
                    speed={0.06}
                    sizeRandomness={1.5}
                    alphaParticles={true}
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Header Section */}
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-black/5 bg-white/60 backdrop-blur-md mb-8 shadow-sm"
                    >
                        <Globe size={16} className="text-[#8B5CF6]" />
                        <span className="text-sm font-bold tracking-widest text-[#1a1a1a] uppercase">Enterprise Use Cases</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black tracking-tight text-[#1a1a1a] mb-8 leading-[1.1]"
                    >
                        Intelligence For <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#1a1a1a] to-[#FF6B00]">Physical Operations</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-[#4b5563] leading-relaxed font-medium"
                    >
                        Discover how the world's most complex industries are deploying fully sovereign Marapone large language models to turn chaos into clarity.
                    </motion.p>
                </div>

                {/* Interactive Filter Pills */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {['all', 'Supply Chain', 'Built Environment', 'Manufacturing', 'Regulated Sectors'].map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter === 'all' ? 'all' : filter)}
                            className={`px-8 py-3.5 rounded-full font-bold text-sm tracking-wider transition-all duration-300 border backdrop-blur-md
                                ${activeFilter.toLowerCase() === filter.toLowerCase()
                                    ? 'bg-[#1a1a1a] border-[#1a1a1a] text-white shadow-lg shadow-black/10 scale-105'
                                    : 'bg-white/80 border-black/10 text-[#4b5563] hover:text-[#1a1a1a] hover:bg-white shadow-sm'
                                }`}
                        >
                            {filter === 'all' ? 'All Sectors' : filter}
                        </button>
                    ))}
                </div>

                {/* Industry Grid Area & Reveal Panel */}
                <div className="flex flex-col xl:flex-row gap-12">

                    {/* Interactive Grid */}
                    <div className="flex-1 grid md:grid-cols-2 gap-6">
                        <AnimatePresence mode="popLayout">
                            {filteredIndustries.map((ind) => (
                                <IndustryNode
                                    key={ind.id}
                                    {...ind}
                                    isHovered={hoveredIndustry?.id === ind.id}
                                    isSelected={selectedIndustry?.id === ind.id}
                                    onHover={() => setHoveredIndustry(ind)}
                                    onClick={() => setSelectedIndustry(selectedIndustry?.id === ind.id ? null : ind)}
                                />
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Sticky Hover Reveal Panel */}
                    <div className="xl:w-[450px] hidden xl:block">
                        <div className="sticky top-32">
                            <AnimatePresence mode="wait">
                                {(selectedIndustry || hoveredIndustry) ? (
                                    <motion.div
                                        key={(selectedIndustry || hoveredIndustry).id}
                                        initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                                        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                        exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        className="h-[700px] rounded-[2.5rem] border backdrop-blur-2xl p-12 flex flex-col justify-between overflow-hidden relative shadow-[0_20px_60px_rgb(0,0,0,0.08)] bg-white/95"
                                        style={{
                                            borderColor: `${(selectedIndustry || hoveredIndustry).color}30`,
                                        }}
                                    >
                                        {/* Background Ambient Glow */}
                                        <div
                                            className="absolute -top-32 -right-32 w-96 h-96 blur-[120px] opacity-20 pointer-events-none rounded-full transition-colors duration-500"
                                            style={{ backgroundColor: (selectedIndustry || hoveredIndustry).color }}
                                        />

                                        <div className="relative z-10">
                                            <div className="inline-flex items-center px-4 py-1.5 rounded-full border text-xs font-bold tracking-widest uppercase mb-10 transition-colors duration-500"
                                                style={{
                                                    backgroundColor: `${(selectedIndustry || hoveredIndustry).color}10`,
                                                    borderColor: `${(selectedIndustry || hoveredIndustry).color}30`,
                                                    color: (selectedIndustry || hoveredIndustry).color
                                                }}>
                                                <ShieldCheck size={14} className="mr-2" /> Sovereign AI Role
                                            </div>

                                            <div className="w-16 h-16 rounded-2xl mb-8 flex items-center justify-center border shadow-sm transition-colors duration-500"
                                                style={{ backgroundColor: 'white', borderColor: `${(selectedIndustry || hoveredIndustry).color}20`, color: (selectedIndustry || hoveredIndustry).color }}>
                                                {(selectedIndustry || hoveredIndustry).icon}
                                            </div>

                                            <h3 className="text-4xl font-extrabold text-[#1a1a1a] mb-6 leading-[1.15] tracking-tight transition-colors duration-500">
                                                {(selectedIndustry || hoveredIndustry).title}
                                            </h3>

                                            <p className="text-lg text-[#4b5563] leading-relaxed mb-8 font-medium">
                                                {(selectedIndustry || hoveredIndustry).description}
                                            </p>
                                        </div>

                                        <div className="relative z-10 border-t border-black/5 pt-8">
                                            <div className="mb-8">
                                                <h4 className="text-xs font-bold text-[#9ca3af] uppercase tracking-widest mb-3">Deployed Cognitive Engine</h4>
                                                <div className="flex items-center gap-3">
                                                    <Cpu size={20} className="text-[#1a1a1a]" />
                                                    <span className="text-lg font-bold text-[#1a1a1a]">{(selectedIndustry || hoveredIndustry).useCase}</span>
                                                </div>
                                            </div>

                                            <Link
                                                to="/contact"
                                                className="w-full py-5 rounded-2xl font-bold text-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2 group relative overflow-hidden"
                                                style={{ backgroundColor: '#1a1a1a' }}
                                            >
                                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                                    style={{ background: `linear-gradient(to right, transparent, ${(selectedIndustry || hoveredIndustry).color}40, transparent)` }} />
                                                <span className="relative z-10 flex items-center gap-2">
                                                    Request Architecture Demo <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                                </span>
                                            </Link>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="empty"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="h-[700px] rounded-[2.5rem] border border-black/5 bg-white/40 backdrop-blur-md p-12 flex flex-col items-center justify-center text-center border-dashed"
                                    >
                                        <div className="w-24 h-24 rounded-full bg-black/5 flex items-center justify-center mb-8 text-[#9ca3af]">
                                            <Server size={40} />
                                        </div>
                                        <h3 className="text-3xl font-bold text-[#1a1a1a] mb-4">Select an Environment</h3>
                                        <p className="text-[#6b7280] text-lg max-w-sm">Hover over any sector card to explore how Marapone deploys sovereign intelligence into that domain.</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Bottom Global CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-40 border-t border-black/5 pt-20 max-w-4xl mx-auto text-center"
                >
                    <h2 className="text-4xl font-bold text-[#1a1a1a] mb-6 tracking-tight">Don't see your specific sector?</h2>
                    <p className="text-xl text-[#4b5563] mb-10 font-medium leading-relaxed">Our foundational models are domain-agnostic before they are trained on your unique data. We can architect a solution for any complex physical operation.</p>
                    <Link to="/contact" className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white bg-[#FF6B00] rounded-xl hover:bg-[#ea580c] transition-colors shadow-[0_10px_30px_rgba(255,107,0,0.3)] hover:-translate-y-1 group">
                        Speak with Engineering <ArrowRight size={20} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

            </div>
        </div>
    );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Anchor, Truck, ShoppingBag, Factory, Wheat, Fuel, ArrowRight, HardHat, Stethoscope, Plane, Hammer, Wrench, Building2, Trees } from 'lucide-react';
import { Link } from 'react-router-dom';
import Particles from '../components/Particles/Particles';

// Reusable animated Industry Node component
const IndustryNode = ({ icon, title, description, color, useCase, category, isHovered, onHover, onClick, isSelected }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onMouseEnter={onHover}
            onMouseLeave={() => onHover(null)}
            className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-300 border backdrop-blur-sm
                ${isSelected || isHovered
                    ? 'bg-white/10 border-white/20 shadow-2xl scale-[1.02]'
                    : 'bg-white/5 border-white/5 hover:border-white/10'}
            `}
            style={{
                boxShadow: (isSelected || isHovered) ? `0 0 30px ${color}20` : 'none',
                borderColor: (isSelected || isHovered) ? color : 'rgba(255,255,255,0.05)'
            }}
        >
            <div className={`w-14 h-14 rounded-xl mb-6 flex items-center justify-center transition-all ${isHovered || isSelected ? 'scale-110' : ''}`}
                style={{ backgroundColor: `${color}15`, color: color, boxShadow: (isHovered || isSelected) ? `0 0 20px ${color}40` : 'none' }}>
                {icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">{description}</p>

            <div className={`pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold uppercase tracking-wider ${isHovered || isSelected ? 'text-white' : 'text-slate-500'}`}>
                <span>{category}</span>
                <ArrowRight size={16} />
            </div>

            {/* Glowing active indicator */}
            <motion.div
                className="absolute inset-x-0 bottom-0 h-1 rounded-b-2xl opacity-0"
                animate={{ opacity: (isSelected || isHovered) ? 1 : 0 }}
                style={{ backgroundColor: color, boxShadow: `0 -5px 15px ${color}` }}
            />
        </motion.div>
    );
};

export default function IndustriesPage() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [hoveredIndustry, setHoveredIndustry] = useState(null);

    const industries = [
        { id: 'maritime', category: 'Logistics', icon: <Anchor size={28} />, title: 'Maritime Supply', description: 'Optimize port calls, track container vessels globally, and predict congestion at major hubs to reduce demurrage.', color: '#22d3ee', useCase: 'Voyage Optimization AI' },
        { id: 'freight', category: 'Logistics', icon: <Truck size={28} />, title: 'Freight Forwarding', description: 'Manage multi-modal shipments seamlessly. Automate HS code classification and provide clients with white-labeled predictive tracking.', color: '#5227FF', useCase: 'Automated Customs Brokerage' },
        { id: 'retail', category: 'Logistics', icon: <ShoppingBag size={28} />, title: 'Retail & E-commerce', description: 'Ensure stock availability by tracking inventory from overseas factories to regional warehouses. Predict transit delays instantly.', color: '#8b5cf6', useCase: 'Predictive Inventory Engine' },
        { id: 'manufacturing', category: 'Logistics', icon: <Factory size={28} />, title: 'Manufacturing', description: 'Secure supply lines against disruptions. Monitor raw material shipments and identify alternative suppliers when geopolitics shift.', color: '#ea580c', useCase: 'Supplier Risk Radar' },
        { id: 'pharma', category: 'Logistics', icon: <Stethoscope size={28} />, title: 'Healthcare & Pharma', description: 'Maintain strict cold-chain integrity for sensitive pharmaceuticals with real-time IoT temperature monitoring and deviation alerts.', color: '#06b6d4', useCase: 'Cold Chain Guardian AI' },

        { id: 'general-contracting', category: 'Construction', icon: <Building2 size={28} />, title: 'General Contracting', description: 'Unify your job site. Automate schedule updates based on actual progress tracking and material delivery predictions.', color: '#FF6B00', useCase: '4D Schedule Simulation' },
        { id: 'heavy-civil', category: 'Construction', icon: <HardHat size={28} />, title: 'Heavy Civil', description: 'Coordinate massive fleet movements. Use drone topology processing to calculate cut/fill volumes with extreme millimeter precision.', color: '#F59E0B', useCase: 'Automated Topology AI' },
        { id: 'specialty-trades', category: 'Construction', icon: <Wrench size={28} />, title: 'Specialty Trades', description: 'Ensure your teams never wait on materials. Just-in-time delivery scheduling synchronized completely with the master build plan.', color: '#fb923c', useCase: 'JIT Material Sequencing' },
        { id: 'engineering', category: 'Construction', icon: <Hammer size={28} />, title: 'Engineering & Design', description: 'Push Generative AI clashes back to the design phase. Run thousands of structural scenarios before groundbreaking ever occurs.', color: '#d97706', useCase: 'Generative BIM Clash Detection' },
        { id: 'energy-infrastructure', category: 'Construction', icon: <Fuel size={28} />, title: 'Energy Infrastructure', description: 'Manage the extreme complexity of power plant and grid construction with AI-driven compliance and safety monitoring.', color: '#ef4444', useCase: 'Predictive Site Safety AI' }
    ];

    const filteredIndustries = activeFilter === 'all'
        ? industries
        : industries.filter(ind => ind.category.toLowerCase() === activeFilter);

    // Dynamic background based on filter
    const bgColors = {
        all: ['#5227FF', '#FF6B00', '#ffffff'],
        logistics: ['#5227FF', '#22d3ee', '#8b5cf6'],
        construction: ['#FF6B00', '#F59E0B', '#fb923c']
    };

    return (
        <div className="min-h-screen bg-[#050505] pt-32 pb-24 relative overflow-hidden">
            {/* Dynamic Particles Background */}
            <div className="absolute inset-0 z-0">
                <Particles
                    key={activeFilter}
                    particleColors={bgColors[activeFilter]}
                    particleCount={300}
                    particleSpread={15}
                    speed={0.1}
                    particleBaseSize={80}
                    moveParticlesOnHover={true}
                    alphaParticles={true}
                    sizeRandomness={1.5}
                    cameraDistance={25}
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Header Section */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
                    >
                        <span className="text-sm font-bold tracking-widest text-white uppercase flex flex-col sm:flex-row gap-2">
                            <span className="text-[#22d3ee]">Supply Chain</span>
                            <span className="hidden sm:inline text-white/30 truncate">///</span>
                            <span className="text-[#FF6B00]">Built Environment</span>
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-8"
                    >
                        Powering <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5227FF] via-[#22d3ee] to-[#FF6B00]">Every Sector</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-400 leading-relaxed"
                    >
                        From raw material extraction to final-mile delivery, and from groundbreaking to final inspection. Gasper provides the specialized AI intelligence your industry demands.
                    </motion.p>
                </div>

                {/* Interactive Filter Pills */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {['all', 'logistics', 'construction'].map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-8 py-3 rounded-xl font-bold text-sm tracking-wider transition-all duration-300 border backdrop-blur-md
                                ${activeFilter === filter
                                    ? filter === 'logistics'
                                        ? 'bg-[#5227FF]/20 border-[#5227FF] text-white shadow-[0_0_20px_rgba(82,39,255,0.3)]'
                                        : filter === 'construction'
                                            ? 'bg-[#FF6B00]/20 border-[#FF6B00] text-white shadow-[0_0_20px_rgba(255,107,0,0.3)]'
                                            : 'bg-white/10 border-white text-white shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                                    : 'bg-black/50 border-white/10 text-slate-400 hover:text-white hover:border-white/30'
                                }`}
                        >
                            {filter === 'all' ? 'All Sectors' : filter.charAt(0).toUpperCase() + filter.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Industry Grid Area & Hero Reveal */}
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Interactive Grid */}
                    <div className="flex-1 grid md:grid-cols-2 gap-6">
                        <AnimatePresence mode="popLayout">
                            {filteredIndustries.map((ind) => (
                                <IndustryNode
                                    key={ind.id}
                                    {...ind}
                                    isHovered={hoveredIndustry?.id === ind.id}
                                    isSelected={hoveredIndustry?.id === ind.id}
                                    onHover={() => setHoveredIndustry(ind)}
                                />
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Sticky Hover Reveal Panel */}
                    <div className="lg:w-[400px] xl:w-[500px] hidden lg:block">
                        <div className="sticky top-32">
                            <AnimatePresence mode="wait">
                                {hoveredIndustry ? (
                                    <motion.div
                                        key={hoveredIndustry.id}
                                        initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                                        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                        exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                                        transition={{ duration: 0.3 }}
                                        className="h-[600px] rounded-3xl border backdrop-blur-xl p-10 flex flex-col justify-between overflow-hidden relative"
                                        style={{
                                            backgroundColor: 'rgba(10,10,10,0.8)',
                                            borderColor: `${hoveredIndustry.color}30`,
                                            boxShadow: `inset 0 0 100px ${hoveredIndustry.color}10, 0 20px 40px rgba(0,0,0,0.5)`
                                        }}
                                    >
                                        {/* Background Glow */}
                                        <div className="absolute top-0 right-0 w-64 h-64 blur-[100px] opacity-20" style={{ backgroundColor: hoveredIndustry.color }} />

                                        <div>
                                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-wider text-slate-300 mb-8 uppercase">
                                                Active Intelligence
                                            </div>
                                            <h3 className="text-4xl font-bold text-white mb-6 leading-tight">
                                                {hoveredIndustry.title} <span style={{ color: hoveredIndustry.color }}>OS</span>
                                            </h3>
                                            <p className="text-xl text-slate-300 leading-relaxed mb-8">
                                                {hoveredIndustry.description}
                                            </p>
                                        </div>

                                        <div>
                                            <div className="p-6 rounded-2xl bg-black/50 border border-white/5">
                                                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Primary AI Agent</h4>
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-full flex items-center justify-center border" style={{ backgroundColor: `${hoveredIndustry.color}20`, borderColor: hoveredIndustry.color, color: hoveredIndustry.color }}>
                                                        {hoveredIndustry.icon}
                                                    </div>
                                                    <span className="text-lg font-bold text-white">{hoveredIndustry.useCase}</span>
                                                </div>
                                            </div>

                                            <button className="w-full mt-6 py-4 rounded-xl font-bold text-white transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group border border-white/10"
                                                style={{ backgroundImage: `linear-gradient(to right, ${hoveredIndustry.color}dd, ${hoveredIndustry.color}88)` }}>
                                                Explore {hoveredIndustry.category} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="empty"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="h-[600px] rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-sm p-10 flex flex-col items-center justify-center text-center border-dashed"
                                    >
                                        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 text-slate-600">
                                            <Wrench size={32} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-4">Select an Industry</h3>
                                        <p className="text-slate-400 text-lg">Hover over any sector card to reveal the specialized Gasper AI agents operating in that domain.</p>
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
                    className="mt-32 max-w-4xl mx-auto text-center"
                >
                    <h2 className="text-4xl font-bold text-white mb-6">Didn't find your specific niche?</h2>
                    <p className="text-xl text-slate-400 mb-10">Our foundational AI models are highly adaptable. Contact our engineering team for a custom deployment evaluation.</p>
                    <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-black bg-white rounded-xl hover:bg-slate-200 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                        Speak with Engineering <ArrowRight size={20} className="ml-2" />
                    </Link>
                </motion.div>

            </div>
        </div>
    );
}

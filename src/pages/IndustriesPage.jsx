import React from 'react';
import { motion } from 'motion/react';
import {
    HardHat, Truck, ArrowRight, Globe, Layers, 
    AlertTriangle, Cpu, CheckCircle2, ShieldAlert
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Particles from '../components/Particles/Particles';

// Reusable Industry Section
const IndustrySection = ({ industry, index }) => {
    const isEven = index % 2 === 0;

    return (
        <div className={`py-16 md:py-32 relative ${isEven ? 'bg-white/5 border-y border-white/10' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
                    
                    {/* Header block */}
                    <div className="lg:w-1/3">
                        <div className="lg:sticky lg:top-32">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8 border border-white/10 bg-white/5"
                                style={{ color: industry.color }}
                            >
                                {industry.icon}
                            </motion.div>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight"
                            >
                                {industry.title}
                            </motion.h2>
                            <div className="h-1.5 w-24 rounded-full mb-8" style={{ backgroundColor: industry.color }} />
                        </div>
                    </div>

                    {/* Content block */}
                    <div className="lg:w-2/3 space-y-8">
                        {/* The Challenge */}
                        <div className="bg-white/5 rounded-3xl p-8 md:p-10 border border-white/10">
                            <div className="flex items-center gap-3 mb-6">
                                <ShieldAlert size={24} className="text-red-500" />
                                <h3 className="text-xl font-bold text-white uppercase tracking-wider">The Operational Gap</h3>
                            </div>
                            <p className="text-lg text-gray-400 leading-relaxed font-medium">
                                {industry.challenge}
                            </p>
                        </div>

                        {/* The Solution */}
                        <div className="bg-white/10 rounded-3xl p-8 md:p-10 border border-white/10 shadow-xl">
                            <div className="flex items-center gap-3 mb-6">
                                <Cpu size={24} className="text-[#FF6B00]" />
                                <h3 className="text-xl font-bold text-white uppercase tracking-wider">The Practical AI Solution</h3>
                            </div>
                            <p className="text-lg text-gray-200 leading-relaxed font-medium">
                                {industry.solution}
                            </p>
                        </div>

                        {/* Key Results */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {industry.results.map((res, i) => (
                                <div key={i} className="flex gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl">
                                    <CheckCircle2 size={24} className="text-[#FF6B00] flex-shrink-0" />
                                    <p className="text-sm font-bold text-gray-300">{res}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function IndustriesPage() {
    const sectors = [
        {
            id: 'construction',
            title: 'Heavy Construction',
            icon: <HardHat size={40} />,
            color: '#FF6B00',
            challenge: 'Subcontractors, site logs, and blueprints are often disconnected. Manual oversight leads to rework, schedule slippage, and cost overruns that aren\'t detected until the budget is already burned.',
            solution: 'I build localized AI engines that ingest daily site logs and RFI data to identify structural deviations against your BIM or original blueprints. The system predicts cash flow risk and flags coordination issues before they become expensive mistakes.',
            results: [
                "Reduction in structural rework costs",
                "Automated Daily Log synthesis for PMs",
                "Blueprint-to-VPC automated auditing",
                "Real-time cost-to-complete forecasting"
            ]
        },
        {
            id: 'logistics',
            title: 'Logistics & Distribution',
            icon: <Truck size={40} />,
            color: '#0EA5E9',
            challenge: 'Fragmented data from ocean, air, and land coupled with messy customs documentation. Reliance on manual tracking leads to unpredicted demurrage fees and terminal bottlenecks.',
            solution: 'I deploy multimodal agents that process unstructured shipping documentation (BoL, Customs declarations) and correlate it with real-time AIS/Tracking data. This allows for automated delay prediction and pre-clearance orchestration.',
            results: [
                "Automated customs doc processing",
                "Vessel-to-Port bottleneck prediction",
                "Significant reduction in dwell times",
                "Dynamic inventory allocation engine"
            ]
        }
    ];

    return (
        <div className="min-h-screen pt-32 pb-0 bg-[#0a0e1a] text-white overflow-hidden">
            <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
                <Particles
                    particleColors={['#FF6B00', '#0EA5E9', '#1a1a1a']}
                    particleCount={100}
                    speed={0.06}
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 text-center mb-24">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-8"
                >
                    <Globe size={16} className="text-[#FF6B00]" />
                    <span className="text-xs font-black tracking-widest uppercase">Targeted Industrial Intelligence</span>
                </motion.div>

                <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tight">
                    Sectors I <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#0EA5E9]">
                        Specialize In.
                    </span>
                </h1>
                
                <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                    I don't build generic automation. I build high-precision AI for the physical industries that demand certainty.
                </p>
            </div>

            <div className="relative z-10 border-t border-white/5">
                {sectors.map((sector, index) => (
                    <IndustrySection key={sector.id} industry={sector} index={index} />
                ))}
            </div>

            {/* Bottom Global CTA */}
            <div className="relative z-10 bg-white/5 py-32 border-t border-white/10 text-center">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-4xl font-black mb-6">Own Your Intelligence.</h2>
                    <p className="text-xl text-gray-400 mb-12">
                        Whether you're managing a port or a skyscraper, my one-time build model ensures your AI tools are permanent, private assets.
                    </p>
                    <Link to="/contact" className="inline-flex items-center gap-2 px-10 py-5 bg-[#FF6B00] hover:bg-[#ea580c] text-white rounded-xl font-bold text-xl shadow-lg transition-all hover:-translate-y-1 group">
                        Book a Discovery Call <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

import React from 'react';
import { motion } from 'motion/react';
import {
    Anchor, ShieldCheck, Zap, ArrowRight,
    HardHat, Globe, Cpu, BarChart3,
    AlertTriangle, Layers, Briefcase, Megaphone, ShoppingCart, Plane
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
                    
                    {/* Left/Header block */}
                    <div className="lg:w-1/3">
                        <div className="lg:sticky lg:top-32">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-[2rem] flex items-center justify-center mb-6 md:mb-8 shadow-sm border border-white/10 bg-white/5"
                                style={{ color: industry.color }}
                            >
                                {industry.icon}
                            </motion.div>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                className="text-3xl md:text-5xl font-black text-white mb-4 md:mb-6 tracking-tight leading-[1.1]"
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
                            className="bg-white/5 rounded-2xl md:rounded-3xl p-6 md:p-10 border border-white/10 shadow-sm"
                        >
                            <div className="flex items-center gap-3 mb-4 md:mb-5">
                                <AlertTriangle size={24} className="text-[#EF4444]" />
                                <h3 className="text-xl font-bold text-white">The Challenge</h3>
                            </div>
                            <p className="text-base md:text-lg text-gray-400 leading-relaxed font-medium">
                                {industry.challenge}
                            </p>
                        </motion.div>

                        {/* The Solution */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ delay: 0.1 }}
                            className="bg-white/10 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden border border-white/10"
                        >
                            <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-white/5 rounded-bl-full pointer-events-none" />
                            <div className="flex items-center gap-3 mb-4 md:mb-5 relative z-10">
                                <Layers size={24} className="text-[#FF6B00]" />
                                <h3 className="text-xl font-bold text-white">The Practical AI Solution</h3>
                            </div>
                            <p className="text-base md:text-lg text-gray-200 leading-relaxed font-medium relative z-10">
                                {industry.solution}
                            </p>
                        </motion.div>

                        {/* Use Case */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ delay: 0.2 }}
                            className="bg-gradient-to-br from-[#FF6B00]/10 to-[#8B5CF6]/10 rounded-2xl md:rounded-3xl p-6 md:p-10 border border-white/20 shadow-sm relative overflow-hidden group"
                        >
                            <div className="flex items-center justify-between mb-6 md:mb-8 relative z-10">
                                <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-full border text-[10px] md:text-xs font-bold uppercase tracking-widest bg-white/5 border-white/20 text-[#FF6B00]">
                                    <Cpu size={14} /> Proven Results
                                </div>
                            </div>
                            <h3 className="text-xl md:text-2xl font-black text-white mb-4 md:mb-5 relative z-10">
                                {industry.useCaseTitle}
                            </h3>
                            <p className="text-base md:text-lg text-gray-300 leading-relaxed font-medium relative z-10">
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
            id: 'logistics',
            title: 'Import/Export & Logistics',
            icon: <Plane size={40} />,
            color: '#0EA5E9',
            challenge: 'Global trade relies on millions of unstructured, multi-language documents—Bills of Lading, Customs Declarations, Air Waybills, and Commercial Invoices—coupled with volatile routing across ocean, air, and land. This fragmentation leads to severe supply chain blind spots, unpredicted demurrage fees, and costly delays at ports and borders.',
            solution: 'We deploy specialized multimodal agents that ingest raw, unstructured shipping documentation alongside live tracking data across all transport modes. The AI normalizes these disparate inputs into a unified intelligence graph, predicting logistical crises before they manifest across any freight corridor.',
            useCaseTitle: 'Multi-Modal Freight Intelligence & Customs AI',
            useCaseDesc: 'By analyzing incoming freight documentation against real-time vessel, aircraft, and truck tracking data, the Marapone engine predicts port, airport, and border delays days in advance. It autonomously routes exception alerts to operators and pre-generates the required customs clearance documentation to aggressively cut dwell times and avoid costly penalties.'
        },
        {
            id: 'general-contracting',
            title: 'General Contracting',
            icon: <Briefcase size={40} />,
            color: '#8B5CF6',
            challenge: 'General contractors juggle dozens of active projects, subcontractor schedules, change orders, and compliance requirements simultaneously. Bid management is manual, progress tracking is fragmented across spreadsheets and phone calls, and margin erosion from scope creep often goes undetected until it\'s too late.',
            solution: 'Marapone deploys an AI-powered project command center that unifies bid management, subcontractor coordination, and real-time progress tracking into a single intelligent platform. Our models learn from your historical project data to improve cost estimations and identify risk patterns unique to your operations.',
            useCaseTitle: 'Intelligent Bid Analysis & Margin Protection',
            useCaseDesc: 'The AI analyzes incoming RFPs against your historical win rates, subcontractor performance data, and current resource capacity. It generates competitive bid recommendations, flags projects with high margin-erosion risk, and continuously monitors active contracts for scope creep—automatically alerting project managers and drafting change order documentation before profits are lost.'
        },
        {
            id: 'marketing',
            title: 'Marketing & Brand Strategy',
            icon: <Megaphone size={40} />,
            color: '#F59E0B',
            challenge: 'Marketing teams waste significant budgets on broad, untargeted campaigns while struggling to measure true ROI. Creative production is slow, audience segmentation is surface-level, and the gap between marketing spend and actual revenue attribution remains a black box for most organizations.',
            solution: 'Our AI models integrate directly with your CRM, ad platforms, and analytics tools to build a complete picture of your customer journey. We deploy generative AI agents that create hyper-targeted campaigns while our attribution models trace every dollar of spend to measurable business outcomes.',
            useCaseTitle: 'AI-Driven Campaign Generation & ROI Attribution',
            useCaseDesc: 'The system autonomously segments your audience based on behavioral patterns and purchase history, generates personalized creative variations for each micro-segment, and deploys them across channels. Real-time attribution modeling tracks conversion paths from first touch to closed deal, automatically reallocating budget to highest-performing channels.'
        },
        {
            id: 'ecommerce',
            title: 'E-Commerce & Digital Operations',
            icon: <ShoppingCart size={40} />,
            color: '#10B981',
            challenge: 'E-commerce operators face razor-thin margins while managing complex pricing across multiple marketplaces, unpredictable demand patterns that lead to stockouts or excess inventory, and customer expectations for instant, personalized experiences—all while competitors can undercut prices within hours.',
            solution: 'Marapone builds autonomous pricing and inventory intelligence agents that operate 24/7 across all your sales channels. Our AI monitors competitor activity, demand signals, and supply chain conditions in real-time to optimize every aspect of your digital operations.',
            useCaseTitle: 'Autonomous Dynamic Pricing & Inventory Optimization',
            useCaseDesc: 'The AI continuously monitors competitor pricing across all marketplaces, correlates it with your inventory levels, supplier lead times, and historical demand curves. It autonomously adjusts pricing to maximize margin while maintaining competitiveness, predicts stockout risks weeks in advance, and auto-generates purchase orders to maintain optimal inventory levels.'
        }
    ];

    // Filter to only include the industries the user specified
    const targetIndustries = verticals.filter(v => 
        ['construction', 'logistics'].includes(v.id)
    );

    return (
        <div className="min-h-screen pt-32 pb-0 relative overflow-hidden bg-[#0a0e1a] text-[#ffffff]">
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
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 text-white shadow-sm mb-8"
                    >
                        <Globe size={16} className="text-[#8B5CF6]" />
                        <span className="text-sm font-bold tracking-[0.15em] uppercase">Enterprise Verticals</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black tracking-tight text-white mb-8 leading-[1.05]"
                    >
                        Intelligence For <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#1a1a1a] to-[#FF6B00]">Physical Operations</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-400 leading-[1.7] font-medium mx-auto max-w-3xl"
                    >
                        Industrial results, not AI hype. I build custom, private tools that bridge the gap between complex data and the builders who keep the country moving.
                    </motion.p>
                </div>
            </div>

            {/* Verticals List */}
            <div className="relative z-10 mt-12">
                {targetIndustries.map((industry, index) => (
                    <IndustrySection key={industry.id} industry={industry} index={index} />
                ))}
            </div>

            {/* Bottom Global CTA */}
            <div className="relative z-10 bg-[#0a0e1a] py-32 border-t border-white/5">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center px-6"
                >
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">Don't see your specific sector?</h2>
                    <p className="text-xl text-gray-400 mb-12 font-medium leading-[1.7]">
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


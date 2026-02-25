import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Database, Cpu, CloudRain, Globe2, Activity, Map, ArrowDown, HardHat, Building2, Wrench, Truck, Anchor, Box, GitBranch } from 'lucide-react';
import { Link } from 'react-router-dom';
import Particles from '../components/Particles/Particles';

// Reusable animated node for the pipeline
const PipelineNode = ({ icon, title, description, color, delay = 0, align = 'center' }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay }}
            className={`relative p-8 rounded-3xl border backdrop-blur-md flex flex-col ${align === 'center' ? 'items-center text-center' : 'items-start text-left'}`}
            style={{
                backgroundColor: `${color}08`,
                borderColor: `${color}20`,
                boxShadow: `inset 0 0 50px ${color}05, 0 10px 30px rgba(0,0,0,0.5)`
            }}
        >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 relative z-10`} style={{ backgroundColor: `${color}15`, color: color, border: `1px solid ${color}30` }}>
                {icon}
                {/* Pulsing ring */}
                <motion.div
                    className="absolute inset-x-0 inset-y-0 rounded-2xl"
                    animate={{ boxShadow: [`0 0 0 0 ${color}40`, `0 0 0 20px ${color}00`] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
            <p className="text-slate-400 leading-relaxed text-sm">{description}</p>
        </motion.div>
    );
};

export default function HowItWorksPage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Animate the main central trunk line
    const trunkHeight = useTransform(scrollYProgress, [0.1, 0.4], ["0%", "100%"]);

    // Animate the split branches
    const branchWidth = useTransform(scrollYProgress, [0.4, 0.6], ["0%", "100%"]);

    // Animate the vertical drops into the specific engines
    const dropHeight = useTransform(scrollYProgress, [0.6, 0.9], ["0%", "100%"]);

    return (
        <div className="min-h-screen bg-[#050505] pt-32 pb-40 relative overflow-hidden text-white" ref={containerRef}>
            {/* Ambient Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Particles
                    particleColors={["#ffffff", "#5227FF", "#FF6B00"]}
                    particleCount={250}
                    speed={0.15}
                    sizeRandomness={2}
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Header Section */}
                <div className="text-center max-w-4xl mx-auto mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center justify-center p-4 rounded-full bg-white/5 border border-white/10 mb-8 w-20 h-20"
                    >
                        <Database size={32} className="text-white" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
                    >
                        The Data to <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">Intelligence</span> Pipeline
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto"
                    >
                        Gasper ingests massive volumes of structured and unstructured data, cleaning and routing it into specialized AI engines for the physical world.
                    </motion.p>
                </div>

                {/* THE PIPELINE VISUALIZATION */}
                <div className="relative py-20">

                    {/* 1. TOP: Unified Data Ingestion */}
                    <div className="max-w-3xl mx-auto mb-32 relative z-20">
                        <div className="text-center mb-12">
                            <h2 className="text-xl font-bold tracking-widest text-slate-500 uppercase">Stage 1: Unified Ingestion</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            <PipelineNode
                                icon={<CloudRain size={28} />}
                                title="Global Sensors"
                                description="Live feeds from AIS (vessels), ADS-B (aircraft), and heavy machinery IoT arrays."
                                color="#ffffff"
                                delay={0.1}
                            />
                            <PipelineNode
                                icon={<Globe2 size={28} />}
                                title="External APIs"
                                description="Ingesting port congestion telemetry, hyper-local weather forecasting, and market conditions."
                                color="#ffffff"
                                delay={0.2}
                            />
                            <PipelineNode
                                icon={<Activity size={28} />}
                                title="Enterprise Data"
                                description="Direct integrations with existing ERPs, traditional EDI feeds, and project management tools."
                                color="#ffffff"
                                delay={0.3}
                            />
                        </div>
                    </div>

                    {/* SVG ANIMATED PIPELINE SYSTEM */}
                    <div className="absolute top-0 bottom-0 left-0 right-0 pointer-events-none z-10 hidden md:block">
                        {/* Central Trunk down from Ingestion */}
                        <motion.div
                            className="absolute left-1/2 top-[20%] w-[2px] bg-gradient-to-b from-white/40 to-white/10"
                            style={{ height: trunkHeight, translateX: '-50%' }}
                        >
                            {/* Fast traveling particle */}
                            <motion.div
                                className="w-2 h-8 bg-white absolute left-1/2 -translate-x-1/2 blur-[2px]"
                                animate={{ top: ["0%", "100%"], opacity: [0, 1, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            />
                        </motion.div>

                        {/* The Split Junction point */}
                        <motion.div
                            className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/20 bg-[#0a0a0a] flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true, margin: "-10%" }}
                        >
                            <GitBranch size={20} className="text-white/50" />
                        </motion.div>

                        {/* Left Branch (Logistics) */}
                        <motion.div
                            className="absolute right-1/2 top-[48%] h-[2px] bg-gradient-to-l from-white/10 to-[#5227FF]/50"
                            style={{ width: branchWidth, transformOrigin: "right center" }}
                        >
                            <motion.div className="h-full w-20 bg-gradient-to-l from-transparent to-[#5227FF] absolute left-0 blur-[4px]" animate={{ left: ["100%", "0%"], opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
                        </motion.div>

                        {/* Right Branch (Construction) */}
                        <motion.div
                            className="absolute left-1/2 top-[48%] h-[2px] bg-gradient-to-r from-white/10 to-[#FF6B00]/50"
                            style={{ width: branchWidth, transformOrigin: "left center" }}
                        >
                            <motion.div className="h-full w-20 bg-gradient-to-r from-transparent to-[#FF6B00] absolute right-0 blur-[4px]" animate={{ right: ["100%", "0%"], opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }} />
                        </motion.div>

                        {/* Left Drop (Logistics) */}
                        <motion.div
                            className="absolute right-[calc(50%+20%)] top-[48%] w-[2px] bg-gradient-to-b from-[#5227FF]/50 to-[#22d3ee]/20"
                            style={{ height: dropHeight }}
                        />

                        {/* Right Drop (Construction) */}
                        <motion.div
                            className="absolute left-[calc(50%+20%)] top-[48%] w-[2px] bg-gradient-to-b from-[#FF6B00]/50 to-[#F59E0B]/20"
                            style={{ height: dropHeight }}
                        />
                    </div>

                    {/* 2. BOTTOM: Dual Engine Processing */}
                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-24 mt-40 relative z-20">

                        {/* Logistics Column */}
                        <div className="space-y-12">
                            <div className="text-center mb-8">
                                <motion.div
                                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                                    className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#5227FF]/30 bg-[#5227FF]/10 text-[#22d3ee] text-xs font-bold tracking-widest uppercase mb-4 shadow-[0_0_20px_rgba(82,39,255,0.2)]"
                                >
                                    Logistics OS Route
                                </motion.div>
                                <h2 className="text-3xl font-bold text-white">Supply Chain AI</h2>
                            </div>

                            <PipelineNode
                                icon={<Map size={28} />}
                                title="Digital Twin Simulation"
                                description="The raw data is assembled into a live, interactive 3D map. We simulate millions of shipment routes, evaluating transit times, port congestion, and fuel costs simultaneously."
                                color="#5227FF"
                                align="left"
                            />
                            <PipelineNode
                                icon={<Anchor size={28} />}
                                title="Risk & Delay Prediction"
                                description="Our proprietary ML models analyze weather patterns and geopolitical news to forecast delays up to 14 days before standard carriers report them."
                                color="#22d3ee"
                                align="left"
                            />
                            <PipelineNode
                                icon={<Box size={28} />}
                                title="Automated Interventions"
                                description="When a delay is predicted, Gasper automatically surfaces alternative routing options or triggers automated communications to end-customers."
                                color="#8b5cf6"
                                align="left"
                            />
                        </div>

                        {/* Construction Column */}
                        <div className="space-y-12 mt-20 md:mt-0">
                            <div className="text-center mb-8">
                                <motion.div
                                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                                    className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#FF6B00]/30 bg-[#FF6B00]/10 text-[#FF6B00] text-xs font-bold tracking-widest uppercase mb-4 shadow-[0_0_20px_rgba(255,107,0,0.2)]"
                                >
                                    Construction OS Route
                                </motion.div>
                                <h2 className="text-3xl font-bold text-white">Built Environment AI</h2>
                            </div>

                            <PipelineNode
                                icon={<Building2 size={28} />}
                                title="Generative Blueprint Analysis"
                                description="CAD files and PDFs are ingested by vision-language models. The AI automatically extracts exact material quantities, spatial dimensions, and structural requirements."
                                color="#FF6B00"
                                align="left"
                            />
                            <PipelineNode
                                icon={<Cpu size={28} />}
                                title="4D Schedule Sequencing"
                                description="The extracted data is cross-referenced with supply chain realities. The engine generates optimized critical-path schedules that account for actual material delivery lead times."
                                color="#F59E0B"
                                align="left"
                            />
                            <PipelineNode
                                icon={<HardHat size={28} />}
                                title="Dynamic Site Management"
                                description="As the project progresses, Gasper continuously reconciles drone topology scans against the schedule to predict budget overruns before they materialize."
                                color="#fb923c"
                                align="left"
                            />
                        </div>

                    </div>
                </div>

                {/* Final Output CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-32 max-w-4xl mx-auto text-center"
                >
                    <div className="p-12 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl relative overflow-hidden">
                        {/* Glow effect */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-[#5227FF]/10 via-transparent to-[#FF6B00]/10 blur-[50px] pointer-events-none" />

                        <h2 className="text-4xl font-bold text-white mb-6 relative z-10">Experience the Engine</h2>
                        <p className="text-xl text-slate-400 mb-10 relative z-10 max-w-2xl mx-auto">Stop working with fragmented data. Connect your systems to the Gasper engine and unlock true operational intelligence.</p>
                        <Link to="/contact" className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-black bg-white rounded-xl hover:bg-slate-200 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.2)] relative z-10">
                            Book Architecture Demo
                        </Link>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
    Database, Network, CloudRain, Globe2, Activity,
    Brain, Fingerprint, Lock, ShieldCheck, Zap,
    Terminal, SearchCode, Workflow, ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Particles from '../components/Particles/Particles';

// Reusable animated node for the pipeline
const PipelineNode = ({ icon, title, description, color, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay }}
            className="p-8 rounded-3xl border border-black/5 backdrop-blur-xl bg-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-lg transition-shadow"
        >
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 relative z-10" style={{ backgroundColor: `${color}15`, color: color, border: `1px solid ${color}30` }}>
                {icon}
            </div>
            <h3 className="text-xl font-bold text-[#1a1a1a] mb-3">{title}</h3>
            <p className="text-[#4b5563] leading-relaxed text-sm font-medium">{description}</p>
        </motion.div>
    );
};

export default function HowItWorksPage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Animations for the central pipeline
    const stage1Progress = useTransform(scrollYProgress, [0.1, 0.4], ["0%", "100%"]);
    const stage2Progress = useTransform(scrollYProgress, [0.4, 0.7], ["0%", "100%"]);

    return (
        <div className="min-h-screen pt-32 pb-40 relative overflow-hidden text-[#1a1a1a]" style={{ backgroundColor: '#F5F5F5' }} ref={containerRef}>
            {/* Ambient Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Particles
                    particleColors={["#8B5CF6", "#FF6B00", "#1a1a1a"]}
                    particleCount={200}
                    speed={0.1}
                    sizeRandomness={1.5}
                    alphaParticles={true}
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Header Section */}
                <div className="text-center max-w-4xl mx-auto mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-black/5 bg-white/60 backdrop-blur-md mb-8 shadow-sm"
                    >
                        <Network size={16} className="text-[#8B5CF6]" />
                        <span className="text-sm font-bold tracking-widest text-[#1a1a1a] uppercase">How Marapone Works</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-[1.1]"
                    >
                        Turning Complex Data into <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#FF6B00]">Simple Answers</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-[#4b5563] leading-relaxed max-w-2xl mx-auto font-medium"
                    >
                        See exactly how Marapone securely transforms your chaotic project data and construction documents into an intelligent, predictive assistant.
                    </motion.p>
                </div>

                {/* THE PIPELINE VISUALIZATION */}
                <div className="relative py-20 max-w-5xl mx-auto">

                    {/* Stage 1: Ingestion */}
                    <div className="relative z-20 mb-32">
                        <div className="text-center mb-12">
                            <span className="px-4 py-1.5 rounded-full bg-[#1a1a1a] text-white text-xs font-bold tracking-widest uppercase mb-4 inline-block shadow-lg">Phase 1</span>
                            <h2 className="text-3xl font-bold text-[#1a1a1a]">Secure Data Ingestion</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            <PipelineNode
                                icon={<Database size={24} />}
                                title="Enterprise & Project Systems"
                                description="Secure connectors extract clean historical data from ERPs (SAP, Oracle) and construction management software (Procore, Primavera)."
                                color="#8B5CF6"
                                delay={0.1}
                            />
                            <PipelineNode
                                icon={<CloudRain size={24} />}
                                title="Unstructured Assets"
                                description="Vision models and OCR scan massive heavy construction blueprint sets, 200-page RFPs, and thousands of scattered site photos/emails."
                                color="#a855f7"
                                delay={0.2}
                            />
                            <PipelineNode
                                icon={<Activity size={24} />}
                                title="Live Telemetry & Logs"
                                description="Real-time ingestion of daily site logs, IoT sensor feeds, equipment tracking, and external market material costs."
                                color="#c084fc"
                                delay={0.3}
                            />
                        </div>
                    </div>

                    {/* SVG ANIMATED PIPELINE SYSTEM - Trunk 1 */}
                    <div className="absolute top-0 bottom-0 left-0 right-0 pointer-events-none z-10 hidden md:block">
                        <motion.div
                            className="absolute left-1/2 top-[30%] w-1 bg-gradient-to-b from-[#8B5CF6]/40 to-[#FF6B00]/40 rounded-full"
                            style={{ height: stage1Progress, translateX: '-50%' }}
                        >
                            <motion.div
                                className="w-3 h-12 bg-white rounded-full absolute left-1/2 -translate-x-1/2 shadow-[0_0_20px_#8B5CF6]"
                                animate={{ top: ["0%", "100%"] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            />
                        </motion.div>
                    </div>

                    {/* Stage 2: Synthesis & Sovereignty */}
                    <div className="relative z-20 mb-32">
                        <div className="text-center mb-12">
                            <span className="px-4 py-1.5 rounded-full bg-[#FF6B00] text-white text-xs font-bold tracking-widest uppercase mb-4 inline-block shadow-lg shadow-[#FF6B00]/20">Phase 2</span>
                            <h2 className="text-3xl font-bold text-[#1a1a1a]">Building Your Custom AI Brain</h2>
                        </div>

                        <div className="bg-[#1a1a1a] rounded-[2rem] p-10 md:p-14 border border-black/10 shadow-2xl relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-[#8B5CF6]/10 via-[#FF6B00]/10 to-[#8B5CF6]/10 blur-3xl pointer-events-none animate-[spin_10s_linear_infinite]" />

                            <div className="relative z-10 flex flex-col items-center text-center">
                                <motion.div
                                    className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#FF6B00] flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(139,92,246,0.3)] border border-white/20"
                                    animate={{ rotate: [0, 5, -5, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <Brain size={48} className="text-white" />
                                </motion.div>
                                <h3 className="text-2xl font-bold text-white mb-4">The Sovereign Brain</h3>
                                <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10 text-lg">
                                    All your chaotic project data is mapped together so the AI understands that a delayed material shipment in an email affects a concrete pour schedule in Primavera. This custom brain is entirely disconnected from the public internet.
                                </p>

                                <div className="grid sm:grid-cols-2 gap-4 w-full">
                                    <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center gap-4 text-left backdrop-blur-sm">
                                        <Lock className="text-[#8B5CF6] shrink-0" />
                                        <div>
                                            <div className="text-white font-bold text-sm">Tenant Isolation</div>
                                            <div className="text-gray-500 text-xs text-nowrap">Your data never trains public models</div>
                                        </div>
                                    </div>
                                    <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center gap-4 text-left backdrop-blur-sm">
                                        <ShieldCheck className="text-[#FF6B00] shrink-0" />
                                        <div>
                                            <div className="text-white font-bold text-sm">SOC2 Type II Ready</div>
                                            <div className="text-gray-500 text-xs">Bank-grade encryption protocols</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SVG ANIMATED PIPELINE SYSTEM - Trunk 2 */}
                    <div className="absolute top-0 bottom-0 left-0 right-0 pointer-events-none z-10 hidden md:block">
                        <motion.div
                            className="absolute left-1/2 top-[65%] w-1 bg-gradient-to-b from-[#FF6B00]/40 to-[#1a1a1a]/20 rounded-full"
                            style={{ height: stage2Progress, translateX: '-50%' }}
                        >
                            <motion.div
                                className="w-3 h-12 bg-white rounded-full absolute left-1/2 -translate-x-1/2 shadow-[0_0_20px_#FF6B00]"
                                animate={{ top: ["0%", "100%"] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            />
                        </motion.div>
                    </div>

                    {/* Stage 3: Operational Output */}
                    <div className="relative z-20">
                        <div className="text-center mb-12">
                            <span className="px-4 py-1.5 rounded-full bg-white border border-black/10 text-[#1a1a1a] text-xs font-bold tracking-widest uppercase mb-4 inline-block shadow-sm">Phase 3</span>
                            <h2 className="text-3xl font-bold text-[#1a1a1a]">Intelligent Action Layer</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            <PipelineNode
                                icon={<SearchCode size={24} />}
                                title="Instant Answers"
                                description="Project managers simply chat with the system. 'Why was the Phase 3 concrete pour delayed, and what is the cost impact?'"
                                color="#f97316"
                                delay={0.1}
                            />
                            <PipelineNode
                                icon={<Zap size={24} />}
                                title="Predictive Risk Alerts"
                                description="The engine automatically flags issues—predicting supply chain material shortages or budget overruns before they stall the site."
                                color="#ea580c"
                                delay={0.2}
                            />
                            <PipelineNode
                                icon={<Workflow size={24} />}
                                title="Automated Agents"
                                description="AI agents draft daily construction logs, issue RFI responses, and trigger procurement orders autonomously."
                                color="#c2410c"
                                delay={0.3}
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
                    <div className="p-16 rounded-[3rem] border border-black/5 bg-white shadow-2xl relative overflow-hidden group">
                        {/* Glow effect */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gradient-to-r from-[#8B5CF6]/5 via-transparent to-[#FF6B00]/5 blur-[80px] group-hover:opacity-100 opacity-50 transition-opacity duration-700 pointer-events-none" />

                        <div className="flex justify-center items-center gap-8 mb-8 opacity-60 mix-blend-multiply">
                            <img src="/logo.png" alt="Marapone" className="h-[40px] w-auto" />
                            <div className="w-1.5 h-1.5 rounded-full bg-black/20" />
                            <img src="/gasper-logo.png" alt="Gasper Engine" className="h-[30px] w-auto" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-[#1a1a1a] mb-6 relative z-10 tracking-tight">Ready To Build The Future?</h2>
                        <p className="text-xl text-[#4b5563] mb-12 relative z-10 max-w-2xl mx-auto font-medium">Stop relying on fragmented dashboards and generic models. Secure a custom AI assistant tailored precisely to your project's operational realities.</p>
                        <Link to="/contact" className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white bg-[#1a1a1a] hover:bg-black rounded-xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 relative z-10 group/btn">
                            Get In Touch <ArrowRight size={20} className="ml-2 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}

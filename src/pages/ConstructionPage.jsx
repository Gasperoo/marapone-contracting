import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HardHat, Ruler, TrendingUp, Eye, ArrowRight, CheckCircle2, Activity, ArrowUpRight, Clock, ShieldCheck, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const SimulatorToggle = ({ active, onClick, label, metric, color }) => (
    <div 
        onClick={onClick}
        className={`cursor-pointer border p-4 rounded-xl transition-all duration-300 flex items-center justify-between ${active ? 'bg-white/10 border-white/20 shadow-md' : 'bg-transparent border-white/5 hover:bg-white/5'}`}
    >
        <div className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${active ? `bg-[${color}] border-[${color}]` : 'border-gray-600'}`}>
                {active && <CheckCircle2 size={12} className="text-white" />}
            </div>
            <div>
                <div className={`font-bold text-sm ${active ? 'text-white' : 'text-gray-400'}`}>{label}</div>
                <div className="text-[10px] text-gray-500">{metric}</div>
            </div>
        </div>
        <div className={`w-2 h-2 rounded-full ${active ? `bg-[${color}] shadow-[0_0_8px_${color}] animate-pulse` : 'bg-gray-600'}`} />
    </div>
);

const ConstructionPage = () => {
    // Simulator State
    const [projectConfig, setProjectConfig] = useState({ class: 'Commercial', sqft: 150000, leed: false });
    const [estimatedCosts, setEstimatedCosts] = useState({ base: 0, mep: 0, total: 0 });

    useEffect(() => {
        // Base costs per sqft
        const baseRates = {
            'Commercial': 180,
            'Residential': 150,
            'Industrial': 120,
            'Healthcare': 350
        };

        const mepRates = {
            'Commercial': 45,
            'Residential': 25,
            'Industrial': 40,
            'Healthcare': 120
        };

        let baseSqftCost = baseRates[projectConfig.class];
        let mepSqftCost = mepRates[projectConfig.class];

        if (projectConfig.leed) {
            baseSqftCost *= 1.15;
            mepSqftCost *= 1.25;
        }

        const baseTotal = baseSqftCost * projectConfig.sqft;
        const mepTotal = mepSqftCost * projectConfig.sqft;
        const sum = baseTotal + mepTotal;

        setEstimatedCosts({
            base: baseTotal,
            mep: mepTotal,
            total: sum
        });

    }, [projectConfig]);

    return (
        <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-24 text-[#1a1a1a]">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-16">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#FF6B00]/10 bg-[#FF6B00]/5 text-[#FF6B00] text-xs font-semibold tracking-[0.15em] mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-pulse mr-2" />
                    CONSTRUCTION INTELLIGENCE
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-[1.05]">
                    From Groundbreak to Handover
                </h1>
                <p className="text-xl text-gray-500 font-medium max-w-3xl leading-relaxed">
                    Automate blueprint takeoffs, monitor site security via computer vision, and forecast cash flow with pinpoint accuracy using custom-trained models that understand your specific building codes and historical project data.
                </p>
            </div>

            {/* Use Cases Section */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
                
                {/* Use Case 1: Automated Takeoffs */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-[2rem] border border-black/5 p-6 md:p-8 lg:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
                    <div className="w-full lg:w-1/2">
                        <div className="w-14 h-14 rounded-2xl bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center mb-6">
                            <Ruler size={28} />
                        </div>
                        <h2 className="text-3xl font-extrabold tracking-tight mb-4">Automated Architectural Takeoffs</h2>
                        <p className="text-[15px] text-gray-500 leading-[1.7] mb-6 font-medium">
                            GasperAI ingests complex architectural PDFs and CAD files, instantly identifying materials, calculating areas, and generating comprehensive bills of quantities. Reduce a 2-week estimation cycle down to minutes.
                        </p>
                        <ul className="space-y-3">
                            {['Identify structural anomalies instantly', 'Auto-classify HVAC, electrical, and plumbing runs', 'Export directly to your ERP/estimation software'].map((item, i) => (
                                <li key={i} className="flex flex-start gap-3 text-[14px] font-bold text-gray-700">
                                    <CheckCircle2 size={18} className="text-[#10B981] flex-shrink-0 mt-0.5" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="w-full lg:w-1/2 aspect-[4/3] bg-gray-50 rounded-2xl border border-black/5 relative overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundSize: '20px 20px', backgroundImage: 'linear-gradient(to right, #FF6B00 1px, transparent 1px), linear-gradient(to bottom, #FF6B00 1px, transparent 1px)' }} />
                         {/* Mock UI */}
                         <div className="relative z-10 w-[80%] bg-white shadow-xl rounded-xl border border-black/5 p-5">
                            <div className="flex items-center justify-between mb-4 border-b border-black/5 pb-2">
                                <span className="text-xs font-bold text-gray-500">Scan Complete: Tower A</span>
                                <span className="text-xs font-bold text-[#10B981]">100% Accuracy Confidence</span>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-sm"><span className="font-semibold">Steel Tonnage</span><span className="font-bold text-[#1a1a1a]">4,250 Tons</span></div>
                                <div className="flex justify-between items-center text-sm"><span className="font-semibold">Concrete Vol</span><span className="font-bold text-[#1a1a1a]">12,000 YD³</span></div>
                                <div className="flex justify-between items-center text-sm"><span className="font-semibold">HVAC Ducting</span><span className="font-bold text-[#1a1a1a]">15,400 LFT</span></div>
                            </div>
                         </div>
                    </div>
                </motion.div>

                {/* Use Case 2: Cash Flow */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-[2rem] border border-black/5 p-6 md:p-8 lg:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex flex-col lg:flex-row-reverse gap-8 lg:gap-12 items-center">
                    <div className="w-full lg:w-1/2">
                        <div className="w-14 h-14 rounded-2xl bg-[#3B82F6]/10 text-[#3B82F6] flex items-center justify-center mb-6">
                            <TrendingUp size={28} />
                        </div>
                        <h2 className="text-3xl font-extrabold tracking-tight mb-4">Predictive Cash Flow & Progress</h2>
                        <p className="text-[15px] text-gray-500 leading-[1.7] mb-6 font-medium">
                            By linking daily field reports, drone surveys, and schedule data, our models predict cash flow requirements and identify schedule deviations weeks before they impact the bottom line.
                        </p>
                        <ul className="space-y-3">
                            {['Early warning for critical path delays', 'Automated subcontractor payment validation', 'Real-time budget-to-actual variance analysis'].map((item, i) => (
                                <li key={i} className="flex flex-start gap-3 text-[14px] font-bold text-gray-700">
                                    <CheckCircle2 size={18} className="text-[#3B82F6] flex-shrink-0 mt-0.5" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="w-full lg:w-1/2 aspect-[4/3] bg-gray-50 rounded-2xl border border-black/5 relative overflow-hidden flex items-center justify-center">
                        {/* Mock UI */}
                        <div className="relative z-10 w-[80%] h-[70%] bg-white shadow-xl rounded-xl border border-black/5 p-5 flex flex-col justify-end gap-2">
                             <div className="absolute top-4 left-4 text-xs font-bold text-gray-500 uppercase">Q3 Cash Flow Variance</div>
                             <div className="flex items-end justify-between h-32 w-full gap-2">
                                {[40, 60, 45, 80, 55, 90, 75].map((h, i) => (
                                    <div key={i} className="w-full bg-[#3B82F6] rounded-t-sm" style={{ height: `${h}%` }} />
                                ))}
                             </div>
                        </div>
                    </div>
                </motion.div>

                {/* Use Case 3: Site Safety */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-[2rem] border border-black/5 p-6 md:p-8 lg:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
                    <div className="w-full lg:w-1/2">
                        <div className="w-14 h-14 rounded-2xl bg-[#10B981]/10 text-[#10B981] flex items-center justify-center mb-6">
                            <Eye size={28} />
                        </div>
                        <h2 className="text-3xl font-extrabold tracking-tight mb-4">Autonomous Site Compliance & Safety</h2>
                        <p className="text-[15px] text-gray-500 leading-[1.7] mb-6 font-medium">
                            Plug GasperAI into your existing site cameras. It runs continuous, privacy-first computer vision models to detect PPE violations, unauthorized perimeter access, and unsafe material staging in real-time.
                        </p>
                        <ul className="space-y-3">
                            {['Zero-latency hardhat and vest detection', 'Automated generation of OSHA logs', 'Predictive risk scoring for high-hazard zones'].map((item, i) => (
                                <li key={i} className="flex flex-start gap-3 text-[14px] font-bold text-gray-700">
                                    <CheckCircle2 size={18} className="text-[#10B981] flex-shrink-0 mt-0.5" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="w-full lg:w-1/2 aspect-[4/3] bg-gray-50 rounded-2xl border border-black/5 relative overflow-hidden flex items-center justify-center">
                        {/* Mock UI */}
                        <div className="relative z-10 w-[80%] bg-white shadow-xl rounded-xl border border-black/5 p-5">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                                <span className="text-xs font-bold text-gray-500">Live Camera Feed (Zone C)</span>
                            </div>
                            <div className="w-full h-32 bg-gray-100 rounded-lg relative overflow-hidden border border-black/5">
                                 {/* Bounding box mock */}
                                 <div className="absolute top-[20%] left-[30%] w-12 h-16 border-2 border-[#10B981] rounded-sm bg-[#10B981]/10">
                                    <div className="absolute -top-5 left-[-2px] bg-[#10B981] text-white text-[8px] font-bold px-1 py-0.5">PPE: VALID</div>
                                 </div>
                                 <div className="absolute top-[40%] right-[20%] w-10 h-14 border-2 border-red-500 rounded-sm bg-red-500/10">
                                    <div className="absolute -top-5 left-[-2px] bg-red-500 text-white text-[8px] font-bold px-1 py-0.5">PPE: MISSING VEST</div>
                                 </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* BIM & TAKEOFF SIMULATOR SECTION */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 mt-24">
                <div className="text-center mb-12">
                     <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Interactive Blueprint & BIM Engine</h2>
                     <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto">
                         Experience how GasperAI dynamically processes architectural variables. Adjust the building class and materials to see instantly generated cost projections and procurement leads.
                     </p>
                </div>
                
                <div className="bg-[#1a1a1a] rounded-[2rem] p-6 lg:p-10 shadow-2xl border border-white/10 flex flex-col lg:flex-row gap-8 items-stretch overflow-hidden relative">
                    
                    {/* Simulator Controls */}
                    <div className="w-full lg:w-1/3 flex flex-col gap-6 relative z-10">
                        <div className="text-white">
                            <h3 className="text-xl font-bold mb-1">Project Parameters</h3>
                            <p className="text-xs text-gray-400">Modify inputs to recalculate takeoff.</p>
                        </div>
                        
                        <div className="space-y-4">
                            {/* Building Class */}
                            <div>
                                <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2 block">Building Configuration</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {['Commercial', 'Residential', 'Industrial', 'Healthcare'].map(type => (
                                        <button 
                                            key={type}
                                            onClick={() => setProjectConfig(s => ({...s, class: type}))}
                                            className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all ${projectConfig.class === type ? 'bg-[#FF6B00] text-white shadow-[0_0_15px_rgba(255,107,0,0.5)]' : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'}`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Scale Slider */}
                            <div>
                                <div className="flex justify-between items-end mb-2">
                                    <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block">Gross Floor Area (SqFt)</label>
                                    <span className="text-sm font-bold text-white font-mono">{projectConfig.sqft.toLocaleString()}</span>
                                </div>
                                <input 
                                    type="range" 
                                    min="50000" 
                                    max="500000" 
                                    step="10000"
                                    value={projectConfig.sqft}
                                    onChange={(e) => setProjectConfig(s => ({...s, sqft: parseInt(e.target.value)}))}
                                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#FF6B00]"
                                />
                            </div>

                             {/* Sustainability Requirement */}
                             <SimulatorToggle 
                                active={projectConfig.leed} 
                                onClick={() => setProjectConfig(s => ({...s, leed: !s.leed}))} 
                                label="LEED Platinum Cert. Target" 
                                metric="Alters localized material sourcing" 
                                color="#10B981" 
                            />
                        </div>

                        {/* Real Time Output */}
                        <div className="mt-auto bg-white/5 border border-white/10 rounded-xl p-5">
                            <div className="flex items-center gap-2 mb-3">
                                <Activity size={14} className="text-[#FF6B00] animate-spin-slow" />
                                <div className="text-[10px] text-gray-400 uppercase tracking-widest">AI Takeoff Output</div>
                            </div>
                            
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-300">Base Materials:</span>
                                    <span className="text-sm font-mono text-white">${(estimatedCosts.base / 1000000).toFixed(2)}M</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-300">Mechanical/Plumbing:</span>
                                    <span className="text-sm font-mono text-white">${(estimatedCosts.mep / 1000000).toFixed(2)}M</span>
                                </div>
                                <div className="flex justify-between border-t border-white/10 pt-2 mt-2">
                                    <span className="text-sm font-bold text-white">Projected Budget:</span>
                                    <span className="text-base font-mono font-bold text-[#FF6B00] flex items-center gap-1">
                                        <ArrowUpRight size={14} />
                                        ${(estimatedCosts.total / 1000000).toFixed(2)}M
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Interactive Visualization / Schematic */}
                    <div className="w-full lg:w-2/3 bg-[#0a0a0a] rounded-xl border border-white/10 relative flex items-center justify-center min-h-[400px] overflow-hidden">
                        {/* Blueprint Grid */}
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255, 107, 0, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 107, 0, 0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                        
                        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-8">
                             <AnimatePresence mode="popLayout">
                                 <motion.div 
                                    key={`${projectConfig.class}-${projectConfig.leed}-${projectConfig.sqft}`}
                                    initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                    transition={{ duration: 0.5, ease: 'easeOut' }}
                                    className="w-full max-w-sm"
                                 >
                                    {/* Schematic Wireframe representation */}
                                    <div className="relative w-full aspect-square border-2 border-[#FF6B00]/40 rounded-sm bg-[#FF6B00]/5 flex items-center justify-center group overflow-hidden shadow-[0_0_30px_rgba(255,107,0,0.1)]">
                                        
                                        {/* Dynamic Height bars representing SqFt */}
                                        <div className="absolute bottom-0 w-full flex items-end justify-center gap-2 px-10 opacity-70">
                                            {[...Array(5)].map((_, i) => (
                                                <motion.div 
                                                    key={i}
                                                    initial={{ height: 0 }}
                                                    animate={{ height: `${(projectConfig.sqft / 500000) * (40 + (i * 10))}px` }}
                                                    transition={{ duration: 0.8, delay: i * 0.1 }}
                                                    className={`w-full ${projectConfig.leed ? 'bg-[#10B981]/40 border-[#10B981]/60' : 'bg-[#FF6B00]/40 border-[#FF6B00]/60'} border-t-2 border-l-2`}
                                                />
                                            ))}
                                        </div>

                                        {/* Center Label */}
                                        <div className="bg-[#1a1a1a] border border-[#FF6B00]/30 px-6 py-4 rounded shadow-2xl z-20 backdrop-blur-md text-center">
                                            <div className="text-[#FF6B00] font-mono text-sm tracking-widest uppercase mb-1">{projectConfig.class} Sector</div>
                                            <div className="text-white font-bold text-2xl">{projectConfig.sqft.toLocaleString()} <span className="text-sm font-normal text-gray-500">SQFT</span></div>
                                            {projectConfig.leed && (
                                                <div className="mt-2 text-[10px] font-bold text-[#10B981] uppercase tracking-widest border border-[#10B981]/30 bg-[#10B981]/10 py-1 px-2 inline-block rounded">
                                                    LEED Certification Applied
                                                </div>
                                            )}
                                        </div>
                                        {/* Scanner Line Animation */}
                                        <motion.div 
                                            animate={{ y: ['0%', '100%', '0%'] }}
                                            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                                            className="absolute top-0 left-0 w-full h-1 bg-[#FF6B00]/80 shadow-[0_0_15px_#FF6B00] z-30"
                                        />
                                    </div>
                                 </motion.div>
                             </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Why GasperAI Metrics */}
            <div className="bg-white border-y border-black/5 mt-24 py-24">
                <div className="max-w-7xl mx-auto px-6 sm:px-8">
                    <div className="text-center mb-16">
                        <span className="text-sm font-bold tracking-widest text-[#FF6B00] uppercase mb-4 block">Proven Impact</span>
                        <h2 className="text-3xl md:text-5xl font-black text-[#1a1a1a] mb-6">Built For The Bottom Line</h2>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: <Clock size={32} />, stat: "85%", label: "Faster Takeoff Cycles", desc: "Reduce estimation time from weeks to hours with intelligent PDF parsing." },
                            { icon: <ShieldCheck size={32} />, stat: "99.9%", label: "Compliance Accuracy", desc: "Automate OSHA logging and safety monitoring with zero-latency computer vision." },
                            { icon: <DollarSign size={32} />, stat: "2.4x", label: "Margin Protection", desc: "Identify budget variances and schedule deviations before they compound." }
                        ].map((metric, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-8 rounded-3xl bg-[#F8FAFC] border border-black/5 text-center hover:shadow-lg transition-all duration-300">
                                <div className="w-16 h-16 mx-auto bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#FF6B00] mb-6 border border-black/5">
                                    {metric.icon}
                                </div>
                                <div className="text-5xl font-black text-[#1a1a1a] mb-2">{metric.stat}</div>
                                <div className="text-lg font-bold text-[#1a1a1a] mb-3">{metric.label}</div>
                                <p className="text-gray-500 font-medium leading-relaxed">{metric.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Case Study Section */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 mt-24">
                <div className="bg-[#1a1a1a] rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#FF6B00]/20 to-transparent rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl pointer-events-none" />
                    
                    <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="inline-block px-3 py-1 rounded-full bg-[#FF6B00]/20 border border-[#FF6B00]/30 text-[#FF6B00] text-xs font-bold tracking-widest uppercase mb-6">Enterprise Deployment</span>
                            <h2 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">"GasperAI recovered $1.2M in disputed change orders on a single mega-project."</h2>
                            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                A Top 50 ENR General Contractor deployed Marapone's sovereign LLM into their private cloud. By vectorizing 10 years of historical contracts, RFIs, and daily logs, the AI autonomously cross-referenced subcontractor claims against original scope boundaries in seconds.
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white font-bold">VP</div>
                                <div>
                                    <div className="text-white font-bold">VP of Preconstruction</div>
                                    <div className="text-gray-500 text-sm">Tier 1 Commercial Builder</div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-black/50 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                            <div className="text-white font-mono text-sm mb-4 border-b border-white/10 pb-4">
                                &gt; query_sovereign_db("analyze subcontractor scope creep vs initial bid package 4A")
                            </div>
                            <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/20">
                                    <div className="flex items-center gap-2 mb-2 text-[#FF6B00] font-bold text-sm">
                                        <CheckCircle2 size={16} /> Discrepancy Found
                                    </div>
                                    <div className="text-gray-300 text-sm leading-relaxed">
                                        Subcontractor electrical run routing deviates from architectural plans (Sheet E-201). Scope addition requested was included in base contractual language (Clause 4.1.2).
                                    </div>
                                </div>
                                <div className="text-[#10B981] font-mono text-xs">Successfully generated formal RFI response based on contract precedent.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* How It Works Steps */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 mt-32 mb-16">
                 <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-[#1a1a1a] mb-6">Deployment Pipeline</h2>
                    <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">From signed NDA to fully operational sovereign intelligence in weeks.</p>
                </div>
                
                <div className="grid md:grid-cols-4 gap-8 relative">
                    {/* Progression Line */}
                    <div className="hidden md:block absolute top-8 left-12 right-12 h-0.5 bg-black/5 z-0" />
                    
                    {[
                        { step: "01", title: "Infrastructure Audit", desc: "We evaluate your current data silos, camera networks, and ERP systems to map the intelligence architecture." },
                        { step: "02", title: "Secure Deployment", desc: "GasperAI is deployed directly into your isolated VPC or on-premise hardware. No public APIs." },
                        { step: "03", title: "Corpus Training", desc: "The model is fine-tuned locally on your historical blueprints, contracts, and scheduling data." },
                        { step: "04", title: "Field Operations", desc: "Rollout copilots to PMs, estimators, and superintendents for immediate ROI generation." }
                    ].map((phase, i) => (
                        <div key={i} className="relative z-10 bg-white md:bg-transparent p-6 md:p-0 rounded-2xl md:rounded-none border border-black/5 md:border-none shadow-sm md:shadow-none">
                            <div className="w-16 h-16 rounded-2xl bg-white border border-[#FF6B00]/20 shadow-md flex items-center justify-center text-[#FF6B00] font-black text-xl mb-6 mx-auto md:mx-0 relative">
                                {phase.step}
                            </div>
                            <h3 className="font-bold text-[#1a1a1a] text-xl mb-3 text-center md:text-left">{phase.title}</h3>
                            <p className="text-gray-500 leading-relaxed font-medium text-center md:text-left">{phase.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="max-w-7xl mx-auto px-6 mt-32 mb-16 text-center">
                <div className="inline-block p-1 rounded-2xl bg-gradient-to-b from-black/5 to-transparent">
                    <Link to="/contact" className="inline-flex items-center gap-2 px-10 py-5 bg-[#1a1a1a] text-white font-bold rounded-xl hover:bg-black hover:shadow-xl transition-all">
                        Request Technical Briefing <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ConstructionPage;

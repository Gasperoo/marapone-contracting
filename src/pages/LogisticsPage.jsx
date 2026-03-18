import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Truck, MapPin, Activity, ShieldCheck, ArrowRight, CheckCircle2, Bot, Globe, Clock, DollarSign, Target, Package, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const SimulatorToggle = ({ active, onClick, label, metric, color }) => (
    <div 
        onClick={onClick}
        className={`cursor-pointer border p-4 rounded-xl transition-all duration-300 flex items-center justify-between ${active ? 'bg-white/10 border-white/20 shadow-md' : 'bg-transparent border-white/5 hover:bg-white/5'}`}
    >
        <div className="flex items-center gap-3">
            <div 
                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${active ? '' : 'border-gray-600'}`}
                style={active ? { backgroundColor: color, borderColor: color } : {}}
            >
                {active && <CheckCircle2 size={12} className="text-white" />}
            </div>
            <div>
                <div className={`font-bold text-sm ${active ? 'text-white' : 'text-gray-400'}`}>{label}</div>
                <div className="text-[10px] text-gray-500">{metric}</div>
            </div>
        </div>
        <div 
            className={`w-2 h-2 rounded-full ${active ? 'animate-pulse' : 'bg-gray-600'}`} 
            style={active ? { backgroundColor: color, boxShadow: `0 0 8px ${color}` } : {}}
        />
    </div>
);

const LogisticsPage = () => {
    // Twin Simulator State
    const [simState, setSimState] = useState({ storm: false, strike: false, canal: false });
    const [activePath, setActivePath] = useState("M 100 200 Q 300 250, 700 150");
    const [marginImpact, setMarginImpact] = useState(0);
    const [actionText, setActionText] = useState("Monitoring Global Flow");

    useEffect(() => {
        let path = "M 100 200 Q 300 250, 700 150"; // Base path
        let margin = 0;
        let action = "Monitoring Global Flow";

        if (simState.storm && !simState.strike && !simState.canal) {
            path = "M 100 200 Q 300 100, 700 150"; // Reroute north of storm
            margin = -0.05;
            action = "Rerouting M/V Zenith (North Pacific)";
        } else if (simState.strike && !simState.storm && !simState.canal) {
            path = "M 100 200 Q 400 350, 700 150"; // Reroute via Panama
            margin = -0.12;
            action = "Diverting to Port of Houston";
        } else if (simState.canal && !simState.storm && !simState.strike) {
             path = "M 100 200 Q 400 350, 700 150"; // Reroute around Cape
             margin = -0.18;
             action = "Bypassing Suez (Cape Route)";
        } else if (simState.storm && simState.strike) {
             path = "M 100 200 Q 500 50, 700 150"; // Extreme north route
             margin = -0.25;
             action = "Air Freight Optimization Activated";
        } else if (Object.values(simState).filter(Boolean).length >= 2) {
             path = "M 100 200 Q 400 50, 700 150"; // Wildcard route for multiple events
             margin = -0.45;
             action = "Multi-Modal Intercept Protocol";
        }

        setActivePath(path);
        setMarginImpact(margin);
        setActionText(action);
    }, [simState]);

    return (
        <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-24 text-[#1a1a1a]">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-16">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#0EA5E9]/10 bg-[#0EA5E9]/5 text-[#0EA5E9] text-xs font-semibold tracking-[0.15em] mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9] animate-pulse mr-2" />
                    GLOBAL SUPPLY CHAIN TWIN
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-[1.05]">
                    Predictive Routing Automation
                </h1>
                <p className="text-xl text-gray-500 font-medium max-w-3xl leading-relaxed">
                    Transform your logistics network into a real-time digital twin to predict transit delays and automate customs compliance, saving millions in demurrage and routing inefficiencies.
                </p>
            </div>

            {/* Use Cases Section */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
                
                {/* Use Case 1: Predictive Routing */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-[2rem] border border-black/5 p-6 md:p-8 lg:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
                    <div className="w-full lg:w-1/2">
                        <div className="w-14 h-14 rounded-2xl bg-[#0EA5E9]/10 text-[#0EA5E9] flex items-center justify-center mb-6">
                            <MapPin size={28} />
                        </div>
                        <h2 className="text-3xl font-extrabold tracking-tight mb-4">Dynamic Weather & Port Rerouting</h2>
                        <p className="text-[15px] text-gray-500 leading-[1.7] mb-6 font-medium">
                            GasperAI ingests global weather intelligence, port congestion APIs, and geopolitical news feeds to dynamically reroute ocean and overland freight shipments before choke points occur.
                        </p>
                        <ul className="space-y-3">
                            {['Bypass port congestion days in advance', 'Minimize detention & demurrage fees', 'Automated carrier renegotiation alerts'].map((item, i) => (
                                <li key={i} className="flex flex-start gap-3 text-[14px] font-bold text-gray-700">
                                    <CheckCircle2 size={18} className="text-[#0EA5E9] flex-shrink-0 mt-0.5" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="w-full lg:w-1/2 aspect-[4/3] bg-gray-50 rounded-2xl border border-black/5 relative overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#0EA5E9 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }} />
                         {/* Mock UI */}
                         <div className="relative z-10 w-[80%] bg-white shadow-xl rounded-xl border border-[#0EA5E9]/20 p-5">
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 border-b border-black/5 pb-2">Reroute Suggestion: Vessel M/V Zenith</div>
                            <div className="flex gap-4">
                                <div className="flex flex-col items-center gap-1">
                                    <div className="w-4 h-4 rounded-full bg-red-100 border border-red-500 flex items-center justify-center"><span className="w-2 h-2 rounded-full bg-red-500" /></div>
                                    <div className="w-0.5 h-12 bg-gray-200" />
                                    <div className="w-4 h-4 rounded-full bg-green-100 border border-green-500 flex items-center justify-center"><span className="w-2 h-2 rounded-full bg-green-500" /></div>
                                </div>
                                <div className="flex flex-col justify-between py-1">
                                    <div>
                                        <div className="text-sm font-bold line-through text-gray-400">Orig ETA: Port of Long Beach (Oct 12)</div>
                                        <div className="text-xs text-red-500 font-semibold mb-2">⚠ Congestion Alert: +4 Days Wait</div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-[#1a1a1a]">New ETA: Port of Oakland (Oct 10)</div>
                                        <div className="text-xs font-bold text-[#0EA5E9] bg-[#0EA5E9]/10 px-2 py-0.5 rounded inline-block mt-1">Saved: $45,000 in Demurrage</div>
                                    </div>
                                </div>
                            </div>
                         </div>
                    </div>
                </motion.div>

                {/* Use Case 2: Customs Automation */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-[2rem] border border-black/5 p-6 md:p-8 lg:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex flex-col lg:flex-row-reverse gap-8 lg:gap-12 items-center">
                    <div className="w-full lg:w-1/2">
                        <div className="w-14 h-14 rounded-2xl bg-[#8B5CF6]/10 text-[#8B5CF6] flex items-center justify-center mb-6">
                            <ShieldCheck size={28} />
                        </div>
                        <h2 className="text-3xl font-extrabold tracking-tight mb-4">Autonomous Customs Compliance</h2>
                        <p className="text-[15px] text-gray-500 leading-[1.7] mb-6 font-medium">
                            Say goodbye to manual data entry for international shipping. GasperAI reads commercial invoices, packing lists, and bills of lading in any language to automatically assign HS codes and file customs entries.
                        </p>
                        <ul className="space-y-3">
                            {['Auto-classify SKUs to HS codes with 99.8% precision', 'Identify compliance gaps before goods ship', 'Extract data from unstructured vendor PDFs'].map((item, i) => (
                                <li key={i} className="flex flex-start gap-3 text-[14px] font-bold text-gray-700">
                                    <CheckCircle2 size={18} className="text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="w-full lg:w-1/2 aspect-[4/3] bg-gray-50 rounded-2xl border border-black/5 relative overflow-hidden flex items-center justify-center">
                        {/* Mock UI */}
                        <div className="relative z-10 w-[80%] bg-white shadow-xl rounded-xl border border-black/5 p-5">
                             <div className="flex items-center justify-between mb-4 pb-2 border-b border-black/5">
                                 <div className="text-xs font-bold text-gray-500">Document Parser: PackingList_CN_2026.pdf</div>
                                 <div className="text-xs font-bold text-[#8B5CF6]">HS Code Mapped</div>
                             </div>
                             <div className="bg-gray-50 rounded pt-3 pb-3 px-4 border border-black/5 mb-3">
                                 <div className="text-xs text-gray-400 mb-1">Extracted Line Item:</div>
                                 <div className="text-sm font-semibold max-w-[200px] truncate text-gray-800">"Industrial HVAC Compressor Unit - Mod 3"</div>
                             </div>
                             <div className="flex items-center gap-3 bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 p-3 rounded">
                                 <CheckCircle2 size={16} className="text-[#8B5CF6]" />
                                 <div>
                                     <div className="text-xs text-black/60 font-medium">System Classification:</div>
                                     <div className="text-sm font-bold text-[#8B5CF6] font-mono tracking-widest">HS: 8414.80.2000</div>
                                 </div>
                             </div>
                        </div>
                    </div>
                </motion.div>

                {/* Use Case 3: Inventory AI */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-[2rem] border border-black/5 p-6 md:p-8 lg:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
                    <div className="w-full lg:w-1/2">
                        <div className="w-14 h-14 rounded-2xl bg-[#10B981]/10 text-[#10B981] flex items-center justify-center mb-6">
                            <Activity size={28} />
                        </div>
                        <h2 className="text-3xl font-extrabold tracking-tight mb-4">Forecasting & Inventory Depletion</h2>
                        <p className="text-[15px] text-gray-500 leading-[1.7] mb-6 font-medium">
                            Machine learning models predict exact inventory depletion rates for every SKU across your entire warehousing network, factoring in seasonality, marketing spend, and macroeconomic trends.
                        </p>
                        <ul className="space-y-3">
                            {['Prevent costly stockouts during peak seasons', 'Reduce carrying costs by optimizing warehouse placement', 'Automated PO generation for low-stock items'].map((item, i) => (
                                <li key={i} className="flex flex-start gap-3 text-[14px] font-bold text-gray-700">
                                    <CheckCircle2 size={18} className="text-[#10B981] flex-shrink-0 mt-0.5" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="w-full lg:w-1/2 aspect-[4/3] bg-gray-50 rounded-2xl border border-black/5 relative overflow-hidden flex items-center justify-center">
                        {/* Mock UI */}
                        <div className="relative z-10 w-[80%] h-[70%] bg-white shadow-xl rounded-xl border border-black/5 p-5 flex flex-col justify-end gap-2 px-6">
                            <div className="w-full flex justify-between absolute top-4 left-6 right-6">
                                <div className="text-xs font-bold text-gray-500 uppercase">SKU-A92 Volume Depletion</div>
                                <div className="text-xs font-bold text-[#10B981] uppercase tracking-widest bg-[#10B981]/10 px-2 py-0.5 rounded">Predictive Trend</div>
                            </div>
                            {/* Curved Area graph simulation */}
                            <svg className="w-full h-32 overflow-visible" viewBox="0 0 100 50" preserveAspectRatio="none">
                                <path d="M 0 50 L 0 40 Q 25 35, 50 20 T 100 5 L 100 50 Z" fill="#10B981" fillOpacity="0.1" />
                                <path d="M 0 40 Q 25 35, 50 20 T 100 5" fill="none" stroke="#10B981" strokeWidth="2" strokeDasharray="4 2" />
                            </svg>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* TWIN SIMULATOR SECTION */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 mt-24">
                <div className="text-center mb-12">
                     <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Interactive Twin Simulator</h2>
                     <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
                         Test Marapone's routing engine in real-time. Inject chaos into the supply chain grid and watch how the autonomous agents instantly recalculate paths and margins.
                     </p>
                </div>
                
                <div className="bg-[#1a1a1a] rounded-[2rem] p-6 lg:p-10 shadow-2xl border border-white/10 flex flex-col lg:flex-row gap-8 items-stretch overflow-hidden relative">
                    {/* Simulator Controls */}
                    <div className="w-full lg:w-1/3 flex flex-col gap-6 relative z-10">
                        <div className="text-white">
                            <h3 className="text-xl font-bold mb-1">Grid Variables</h3>
                            <p className="text-xs text-gray-400">Toggle events to see real-time impact.</p>
                        </div>
                        
                        <div className="space-y-4">
                            <SimulatorToggle 
                                active={simState.storm} 
                                onClick={() => setSimState(s => ({...s, storm: !s.storm}))} 
                                label="Typhoon in South China Sea" 
                                metric="Impacts maritime lanes" 
                                color="#0EA5E9" 
                            />
                            <SimulatorToggle 
                                active={simState.strike} 
                                onClick={() => setSimState(s => ({...s, strike: !s.strike}))} 
                                label="Port of LA Labor Strike" 
                                metric="Reduces offload capacity 80%" 
                                color="#F59E0B" 
                            />
                            <SimulatorToggle 
                                active={simState.canal} 
                                onClick={() => setSimState(s => ({...s, canal: !s.canal}))} 
                                label="Suez Canal Blockage" 
                                metric="Severs Asia-Europe route" 
                                color="#EF4444" 
                            />
                        </div>

                        <div className="mt-auto bg-white/5 border border-white/10 rounded-xl p-5">
                            <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-3">Live Recalculation Output</div>
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-sm text-gray-300 font-medium">Original ETA Margin:</span>
                                <span className="text-lg font-mono text-white">$1.24M</span>
                            </div>
                            <div className="flex justify-between items-end">
                                <span className="text-sm text-gray-300 font-medium">Agent Preserved Margin:</span>
                                <span className={`text-xl font-mono font-bold ${marginImpact < 0 ? 'text-red-400' : 'text-green-400'}`}>
                                    ${(1.24 + marginImpact).toFixed(2)}M
                                </span>
                            </div>
                            <div className="text-[10px] text-gray-500 mt-3 pt-3 border-t border-white/10">Engine evaluating 4.2M routing combinations per second.</div>
                        </div>
                    </div>

                    {/* Visual Map */}
                    <div className="w-full lg:w-2/3 bg-black rounded-xl border border-white/10 relative overflow-hidden flex items-center justify-center min-h-[400px]">
                        {/* Grid Background */}
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#0EA5E9 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                        
                        <svg className="w-full h-full absolute inset-0 text-white" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
                             
                             {/* Base inactive routes */}
                             <path d="M 100 200 Q 300 250, 700 150" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="5 5" />
                             <path d="M 100 200 Q 300 100, 700 150" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="5 5" />
                             <path d="M 100 200 Q 400 350, 700 150" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="5 5" />

                             {/* Active Route rendered dynamically based on state */}
                             <motion.path 
                                d={activePath} 
                                fill="none" 
                                stroke="#10B981" 
                                strokeWidth="4" 
                                strokeLinecap="round"
                                className="drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                                key={activePath} // force re-render animation when path changes
                             />

                             <circle cx="100" cy="200" r="6" fill="#0EA5E9" className="drop-shadow-[0_0_10px_#0EA5E9]" />
                             <text x="100" y="225" fill="#888" fontSize="12" textAnchor="middle" fontWeight="bold">SHANGHAI</text>
                             
                             <circle cx="700" cy="150" r="6" fill="#8B5CF6" className="drop-shadow-[0_0_10px_#8B5CF6]" />
                             <text x="700" y="175" fill="#888" fontSize="12" textAnchor="middle" fontWeight="bold">ROTTERDAM</text>

                             {/* Chaos Nodes */}
                             <AnimatePresence>
                                {simState.storm && (
                                    <motion.g initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}>
                                        <circle cx="300" cy="250" r="25" fill="rgba(14, 165, 233, 0.2)" stroke="#0EA5E9" strokeDasharray="4 4" />
                                        <text x="300" y="254" fill="#0EA5E9" fontSize="20" textAnchor="middle" style={{fontFamily: 'system-ui'}}>☁</text>
                                    </motion.g>
                                )}
                                {simState.strike && (
                                    <motion.g initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}>
                                        <circle cx="700" cy="150" r="30" fill="rgba(245, 158, 11, 0.2)" stroke="#F59E0B" strokeDasharray="4 4" />
                                        <text x="700" y="156" fill="#F59E0B" fontSize="20" textAnchor="middle" style={{fontFamily: 'system-ui'}}>⚠</text>
                                    </motion.g>
                                )}
                                {simState.canal && (
                                    <motion.g initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}>
                                        <circle cx="300" cy="100" r="25" fill="rgba(239, 68, 68, 0.2)" stroke="#EF4444" strokeDasharray="4 4" />
                                        <text x="300" y="105" fill="#EF4444" fontSize="20" textAnchor="middle" style={{fontFamily: 'system-ui'}}>✖</text>
                                    </motion.g>
                                )}
                             </AnimatePresence>
                        </svg>

                        {/* Floating Action Tag */}
                        <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-lg flex items-center gap-3">
                            <Bot size={18} className="text-[#10B981]" />
                            <div>
                                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mb-1">Agent Status</div>
                                <div className="text-sm font-semibold text-white leading-none">{actionText}</div>
                            </div>
                        </div>

                    </div>
                    </div>
            </div>

            {/* Why GasperAI Metrics */}
            <div className="bg-white border-y border-black/5 mt-24 py-24">
                <div className="max-w-7xl mx-auto px-6 sm:px-8">
                    <div className="text-center mb-16">
                        <span className="text-sm font-bold tracking-widest text-[#0EA5E9] uppercase mb-4 block">Proven Impact</span>
                        <h2 className="text-3xl md:text-5xl font-black text-[#1a1a1a] mb-6">Built For Radical Efficiency</h2>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: <Globe size={32} />, stat: "100%", label: "End-to-End Visibility", desc: "Unify fragmented ERP, telematics, and forwarder data into a single pane of glass." },
                            { icon: <Clock size={32} />, stat: "3x", label: "Faster Customs Clearance", desc: "Automated HS classification and documentation extraction eliminates days of delay." },
                            { icon: <DollarSign size={32} />, stat: "-40%", label: "Demurrage Reduction", desc: "Predict congestion and autonomously reroute shipments before penalties trigger." }
                        ].map((metric, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-8 rounded-3xl bg-[#F8FAFC] border border-black/5 text-center hover:shadow-lg transition-all duration-300">
                                <div className="w-16 h-16 mx-auto bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#0EA5E9] mb-6 border border-black/5">
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

            {/* Deliverables / What You Get */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 mt-24">
                <div className="bg-[#1a1a1a] rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#0EA5E9]/20 to-transparent rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#FF6B00]/10 to-transparent rounded-full -translate-x-1/3 translate-y-1/3 blur-3xl pointer-events-none" />
                    
                    <div className="relative z-10">
                        <div className="text-center mb-16">
                            <span className="inline-block px-3 py-1 rounded-full bg-[#0EA5E9]/20 border border-[#0EA5E9]/30 text-[#0EA5E9] text-xs font-bold tracking-widest uppercase mb-6">Core Deliverables</span>
                            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">The Enterprise AI Command Center</h2>
                            <p className="text-gray-400 text-lg max-w-2xl mx-auto">We don't deliver a scattered toolkit. GasperAI provides a unified, sovereign platform deployed into your VPC.</p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { icon: <Target className="text-[#0EA5E9]" />, title: "Predictive Control Tower", desc: "Real-time geographical mapping of all assets with AI-driven weather and congestion rerouting." },
                                { icon: <Package className="text-[#10B981]" />, title: "Inventory Engine", desc: "Local LLM connected directly to WMS systems to forecast depletion and trigger POs autonomously." },
                                { icon: <ShieldCheck className="text-[#8B5CF6]" />, title: "Compliance Copilot", desc: "Document parser that reads BoLs in 40+ languages to generate pre-filled customs declarations." },
                                { icon: <Zap className="text-[#FF6B00]" />, title: "Carrier API Gateway", desc: "Unified interface that normalizes tracking data from ocean carriers, air freight, and 3PLs instantly." }
                            ].map((item, i) => (
                                <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md hover:bg-white/10 transition-colors">
                                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-white font-bold text-lg mb-3">{item.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
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
                        { step: "01", title: "Data Harmonization", desc: "We ingest and normalize fragmented historical EDI feeds, emails, and PDFs." },
                        { step: "02", title: "Secure Deployment", desc: "GasperAI is deployed directly into your isolated VPC. No public APIs." },
                        { step: "03", title: "Model Alignment", desc: "The logistics agent is fine-tuned locally to understand your specific vendor nuances and SLA penalties." },
                        { step: "04", title: "Control Tower Live", desc: "Rollout copilots to supply chain planners and procurement officers for immediate ROI." }
                    ].map((phase, i) => (
                        <div key={i} className="relative z-10 bg-white md:bg-transparent p-6 md:p-0 rounded-2xl md:rounded-none border border-black/5 md:border-none shadow-sm md:shadow-none">
                            <div className="w-16 h-16 rounded-2xl bg-white border border-[#0EA5E9]/20 shadow-md flex items-center justify-center text-[#0EA5E9] font-black text-xl mb-6 mx-auto md:mx-0 relative">
                                {phase.step}
                            </div>
                            <h3 className="font-bold text-[#1a1a1a] text-xl mb-3 text-center md:text-left">{phase.title}</h3>
                            <p className="text-gray-500 leading-relaxed font-medium text-center md:text-left">{phase.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="max-w-7xl mx-auto px-6 mt-16 text-center">
                <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-[#1a1a1a] text-white font-bold rounded-xl hover:-translate-y-1 transition-transform shadow-[0_10px_20px_rgba(0,0,0,0.1)]">
                    Evaluate GasperAI for Logistics <ArrowRight size={18} />
                </Link>
            </div>
        </div>
    );
};

export default LogisticsPage;

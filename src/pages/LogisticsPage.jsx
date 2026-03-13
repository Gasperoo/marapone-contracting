import React from 'react';
import { motion } from 'motion/react';
import { Truck, MapPin, Activity, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const LogisticsPage = () => {
    return (
        <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-24 text-[#1a1a1a]">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-16">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#0EA5E9]/10 bg-[#0EA5E9]/5 text-[#0EA5E9] text-xs font-semibold tracking-[0.15em] mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9] animate-pulse mr-2" />
                    GLOBAL SUPPLY CHAIN TWIN
                </div>
                <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 leading-[1.05]">
                    Predictive Routing Automation
                </h1>
                <p className="text-xl text-gray-500 font-medium max-w-3xl leading-relaxed">
                    Transform your logistics network into a real-time digital twin to predict transit delays and automate customs compliance, saving millions in demurrage and routing inefficiencies.
                </p>
            </div>

            {/* Use Cases Section */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
                
                {/* Use Case 1: Predictive Routing */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-[2rem] border border-black/5 p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex flex-col md:flex-row gap-12 items-center">
                    <div className="md:w-1/2">
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
                    <div className="md:w-1/2 w-full aspect-[4/3] bg-gray-50 rounded-2xl border border-black/5 relative overflow-hidden flex items-center justify-center">
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
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-[2rem] border border-black/5 p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex flex-col md:flex-row-reverse gap-12 items-center">
                    <div className="md:w-1/2">
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
                    <div className="md:w-1/2 w-full aspect-[4/3] bg-gray-50 rounded-2xl border border-black/5 relative overflow-hidden flex items-center justify-center">
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
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-[2rem] border border-black/5 p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex flex-col md:flex-row gap-12 items-center">
                    <div className="md:w-1/2">
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
                    <div className="md:w-1/2 w-full aspect-[4/3] bg-gray-50 rounded-2xl border border-black/5 relative overflow-hidden flex items-center justify-center">
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
            
            <div className="max-w-7xl mx-auto px-6 mt-16 text-center">
                <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-[#1a1a1a] text-white font-bold rounded-xl hover:-translate-y-1 transition-transform shadow-[0_10px_20px_rgba(0,0,0,0.1)]">
                    Evaluate GasperAI for Logistics <ArrowRight size={18} />
                </Link>
            </div>
        </div>
    );
};

export default LogisticsPage;

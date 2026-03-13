import React from 'react';
import { motion } from 'motion/react';
import { HardHat, Ruler, TrendingUp, Eye, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const ConstructionPage = () => {
    return (
        <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-24 text-[#1a1a1a]">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-16">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#FF6B00]/10 bg-[#FF6B00]/5 text-[#FF6B00] text-xs font-semibold tracking-[0.15em] mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-pulse mr-2" />
                    CONSTRUCTION INTELLIGENCE
                </div>
                <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 leading-[1.05]">
                    From Groundbreak to Handover
                </h1>
                <p className="text-xl text-gray-500 font-medium max-w-3xl leading-relaxed">
                    Automate blueprint takeoffs, monitor site security via computer vision, and forecast cash flow with pinpoint accuracy using custom-trained models that understand your specific building codes and historical project data.
                </p>
            </div>

            {/* Use Cases Section */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
                
                {/* Use Case 1: Automated Takeoffs */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-[2rem] border border-black/5 p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex flex-col md:flex-row gap-12 items-center">
                    <div className="md:w-1/2">
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
                    <div className="md:w-1/2 w-full aspect-[4/3] bg-gray-50 rounded-2xl border border-black/5 relative overflow-hidden flex items-center justify-center">
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
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-[2rem] border border-black/5 p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex flex-col md:flex-row-reverse gap-12 items-center">
                    <div className="md:w-1/2">
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
                    <div className="md:w-1/2 w-full aspect-[4/3] bg-gray-50 rounded-2xl border border-black/5 relative overflow-hidden flex items-center justify-center">
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
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-[2rem] border border-black/5 p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex flex-col md:flex-row gap-12 items-center">
                    <div className="md:w-1/2">
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
                    <div className="md:w-1/2 w-full aspect-[4/3] bg-gray-50 rounded-2xl border border-black/5 relative overflow-hidden flex items-center justify-center">
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
            
            <div className="max-w-7xl mx-auto px-6 mt-16 text-center">
                <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-[#1a1a1a] text-white font-bold rounded-xl hover:-translate-y-1 transition-transform shadow-[0_10px_20px_rgba(0,0,0,0.1)]">
                    Evaluate GasperAI for Construction <ArrowRight size={18} />
                </Link>
            </div>
        </div>
    );
};

export default ConstructionPage;

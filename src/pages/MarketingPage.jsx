import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Target, MessageSquare, Briefcase, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const MarketingPage = () => {
    return (
        <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-24 text-[#1a1a1a]">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-16">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#F59E0B]/10 bg-[#F59E0B]/5 text-[#F59E0B] text-xs font-semibold tracking-[0.15em] mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse mr-2" />
                    GROWTH ENGINE AI
                </div>
                <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 leading-[1.05]">
                    Predictive Lead Generation
                </h1>
                <p className="text-xl text-gray-500 font-medium max-w-3xl leading-relaxed">
                    Deploy generative campaigns that automatically optimize based on proprietary predictive lead scoring. Identify high-value enterprise accounts proactively before competitors do.
                </p>
            </div>

            {/* Use Cases Section */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
                
                {/* Use Case 1: Predictive Scoring */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-[2rem] border border-black/5 p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex flex-col md:flex-row gap-12 items-center">
                    <div className="md:w-1/2">
                        <div className="w-14 h-14 rounded-2xl bg-[#F59E0B]/10 text-[#F59E0B] flex items-center justify-center mb-6">
                            <Target size={28} />
                        </div>
                        <h2 className="text-3xl font-extrabold tracking-tight mb-4">Enterprise Lead Propensity</h2>
                        <p className="text-[15px] text-gray-500 leading-[1.7] mb-6 font-medium">
                            Stop wasting budget on broad audiences. Our engine ingests your CRM data (Salesforce, HubSpot) to identify exactly which enterprise accounts have a high propensity to buy right now.
                        </p>
                        <ul className="space-y-3">
                            {['Identify intent signals before leads even engage', 'Score existing pipelines with deep ML models', 'Automatically sync target lists to ad platforms'].map((item, i) => (
                                <li key={i} className="flex flex-start gap-3 text-[14px] font-bold text-gray-700">
                                    <CheckCircle2 size={18} className="text-[#F59E0B] flex-shrink-0 mt-0.5" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="md:w-1/2 w-full aspect-[4/3] bg-gray-50 rounded-2xl border border-black/5 relative overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(to right, #F59E0B 1px, transparent 1px), linear-gradient(to bottom, #F59E0B 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                         {/* Mock UI */}
                         <div className="relative z-10 w-[80%] bg-white shadow-xl rounded-xl border border-[#F59E0B]/20 p-5">
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 border-b border-black/5 pb-2">Propensity Model Output</div>
                            <div className="space-y-3">
                                {[
                                    { acct: 'Acme Corp', score: 98, status: 'URGENT OUTREACH' },
                                    { acct: 'TechFlow', score: 85, status: 'HIGH INTENT' },
                                    { acct: 'Global Systems', score: 42, status: 'NURTURE' }
                                ].map((row, i) => (
                                    <div key={i} className="flex justify-between items-center bg-gray-50 p-3 rounded border border-black/5">
                                        <div className="font-bold text-sm text-gray-800">{row.acct}</div>
                                        <div className="flex items-center gap-3">
                                            <div className="text-[10px] uppercase font-bold text-[#F59E0B] tracking-wider">{row.status}</div>
                                            <div className="w-8 h-8 rounded-full border-2 border-[#F59E0B] flex items-center justify-center font-black text-xs text-[#1a1a1a]">{row.score}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                         </div>
                    </div>
                </motion.div>

                {/* Use Case 2: Generative Campaigns */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-[2rem] border border-black/5 p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex flex-col md:flex-row-reverse gap-12 items-center">
                    <div className="md:w-1/2">
                        <div className="w-14 h-14 rounded-2xl bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center mb-6">
                            <MessageSquare size={28} />
                        </div>
                        <h2 className="text-3xl font-extrabold tracking-tight mb-4">Hyper-Personalized Generative Ads</h2>
                        <p className="text-[15px] text-gray-500 leading-[1.7] mb-6 font-medium">
                            Create thousands of ad variations, emails, and landing pages tailored specifically to the unique pain points of each account identified in the propensity modeling stage.
                        </p>
                        <ul className="space-y-3">
                            {['Auto-generate ad collateral matching your brand guidelines', 'A/B/n test copy autonomously and scale winners', 'End-to-end integration with Google, Meta, and LinkedIn'].map((item, i) => (
                                <li key={i} className="flex flex-start gap-3 text-[14px] font-bold text-gray-700">
                                    <CheckCircle2 size={18} className="text-[#FF6B00] flex-shrink-0 mt-0.5" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="md:w-1/2 w-full aspect-[4/3] bg-gray-50 rounded-2xl border border-black/5 relative overflow-hidden flex items-center justify-center">
                        {/* Mock UI */}
                        <div className="relative z-10 w-[80%] bg-white shadow-xl rounded-xl border border-black/5 p-5">
                             <div className="flex items-center justify-between mb-4 pb-2 border-b border-black/5">
                                 <div className="text-xs font-bold text-gray-500">Generative Pipeline</div>
                                 <div className="text-xs font-bold text-[#FF6B00] animate-pulse">Running M-V Tests</div>
                             </div>
                             <div className="grid grid-cols-2 gap-3">
                                 <div className="bg-gray-100 h-24 rounded flex items-center justify-center p-2 text-center text-xs font-semibold text-gray-500 border border-black/5">
                                    Headline Var A:<br/>"Cut Shipping Costs 20%"
                                 </div>
                                 <div className="bg-[#FF6B00]/10 h-24 rounded flex items-center justify-center p-2 text-center text-xs font-semibold text-[#FF6B00] border border-[#FF6B00]/20 relative">
                                    <div className="absolute -top-2 -right-2 bg-[#FF6B00] text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow">WINNER</div>
                                    Headline Var B:<br/>"Stop Demurrage Fees"
                                 </div>
                             </div>
                        </div>
                    </div>
                </motion.div>

                {/* Use Case 3: Competitor Sentiment Analysis */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-[2rem] border border-black/5 p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex flex-col md:flex-row gap-12 items-center">
                    <div className="md:w-1/2">
                        <div className="w-14 h-14 rounded-2xl bg-[#8B5CF6]/10 text-[#8B5CF6] flex items-center justify-center mb-6">
                            <Briefcase size={28} />
                        </div>
                        <h2 className="text-3xl font-extrabold tracking-tight mb-4">Competitor & Market Pulse</h2>
                        <p className="text-[15px] text-gray-500 leading-[1.7] mb-6 font-medium">
                            GasperAI monitors mentions, reviews, and sentiment across public forums, news outlets, and social channels regarding your competitors, allowing you to strike exactly when they stumble.
                        </p>
                        <ul className="space-y-3">
                            {['Identify competitor service outages instantly', 'Monitor shifts in sentiment to target dissatisfied users', 'Automate counter-positioning campaigns on the fly'].map((item, i) => (
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
                            <div className="text-xs font-bold text-gray-500 uppercase mb-3">Sentiment Alert</div>
                            <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-4">
                                <div className="text-sm font-bold text-red-600 mb-1">Competitor X: Server Outage Detected</div>
                                <div className="text-xs text-red-500 font-medium">Negative sentiment spiked 450% in last 2 hours. Mention volume up 12k.</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                                    <div className="bg-[#8B5CF6] h-full w-[80%]" />
                                </div>
                                <div className="text-[10px] font-bold uppercase text-[#8B5CF6]">Deploying Intercept Campaign</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
            
            <div className="max-w-7xl mx-auto px-6 mt-16 text-center">
                <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-[#1a1a1a] text-white font-bold rounded-xl hover:-translate-y-1 transition-transform shadow-[0_10px_20px_rgba(0,0,0,0.1)]">
                    Evaluate Growth Engine AI <ArrowRight size={18} />
                </Link>
            </div>
        </div>
    );
};

export default MarketingPage;

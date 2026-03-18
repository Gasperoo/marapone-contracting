import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Target, MessageSquare, Briefcase, ArrowRight, CheckCircle2, DollarSign, Activity, Users, Box, Zap } from 'lucide-react';
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

             {/* Why GasperAI Metrics */}
             <div className="bg-white border-y border-black/5 mt-24 py-24">
                <div className="max-w-7xl mx-auto px-6 sm:px-8">
                    <div className="text-center mb-16">
                        <span className="text-sm font-bold tracking-widest text-[#F59E0B] uppercase mb-4 block">Proven Marketing ROI</span>
                        <h2 className="text-3xl md:text-5xl font-black text-[#1a1a1a] mb-6">Built For Revenue Velocity</h2>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: <TrendingUp size={32} />, stat: "3.2x", label: "Pipeline Velocity", desc: "Shorten sales cycles by targeting accounts when their buy-intent peaks." },
                            { icon: <DollarSign size={32} />, stat: "-45%", label: "Lower CAC", desc: "Eliminate ad waste by deploying generative creative only to high-propensity targets." },
                            { icon: <Users size={32} />, stat: "10k+", label: "Personalized Variants", desc: "Autonomous A/B testing across landing pages and ad copy at unprecedented scale." }
                        ].map((metric, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-8 rounded-3xl bg-[#F8FAFC] border border-black/5 text-center hover:shadow-lg transition-all duration-300">
                                <div className="w-16 h-16 mx-auto bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#F59E0B] mb-6 border border-black/5">
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

            {/* Integrations Ecosystem */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 mt-24">
                <div className="bg-[#1a1a1a] rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#F59E0B]/20 to-transparent rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl pointer-events-none" />
                    
                    <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="inline-block px-3 py-1 rounded-full bg-[#F59E0B]/20 border border-[#F59E0B]/30 text-[#F59E0B] text-xs font-bold tracking-widest uppercase mb-6">Seamless Ecosystem</span>
                            <h2 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">Plugs natively into your existing martech stack.</h2>
                            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                GasperAI doesn't replace your tools; it acts as the intelligent orchestration layer above them. Bidirectional syncing ensures your CRM and ad platforms are always aligned.
                            </p>
                            
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { name: "Salesforce CRM", type: "Bidirectional Sync" },
                                    { name: "HubSpot", type: "Lead Scoring" },
                                    { name: "LinkedIn Ads", type: "Dynamic Audiences" },
                                    { name: "Google Ads", type: "Algorithmic Bidding" }
                                ].map((int, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-xl">
                                        <div className="w-8 h-8 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center text-[#F59E0B]">
                                            <Zap size={14} />
                                        </div>
                                        <div>
                                            <div className="text-white text-sm font-bold">{int.name}</div>
                                            <div className="text-gray-500 text-xs">{int.type}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-black/50 border border-white/10 rounded-2xl p-6 backdrop-blur-md relative">
                            {/* Visual Representation of Flow */}
                            <div className="flex flex-col items-center justify-center h-full gap-4">
                                <div className="p-4 bg-white/5 border border-white/10 xl flex items-center gap-3 rounded-lg w-full">
                                    <Activity size={20} className="text-[#F59E0B]" />
                                    <span className="text-gray-300 font-mono text-sm">GasperAI Intent Engine</span>
                                </div>
                                <div className="h-8 border-l-2 border-dashed border-white/20" />
                                <div className="flex gap-4 w-full">
                                    <div className="flex-1 p-3 bg-[#00A4EF]/10 border border-[#00A4EF]/30 rounded text-center text-xs text-[#00A4EF] font-bold">Push to CRM</div>
                                    <div className="flex-1 p-3 bg-[#0A66C2]/10 border border-[#0A66C2]/30 rounded text-center text-xs text-[#0A66C2] font-bold">Push to Ad Platform</div>
                                </div>
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
                        { step: "01", title: "Data Integration", desc: "We connect GasperAI to your CRM, analytics tools, and historical ad accounts." },
                        { step: "02", title: "Model Training", desc: "The AI learns your brand voice, ideal customer profile (ICP), and past successful conversion paths." },
                        { step: "03", title: "Generative Spin-Up", desc: "The engine produces thousands of compliant ad creatives and personalized landing pages." },
                        { step: "04", title: "Autonomous Campaign Live", desc: "The system begins orchestrating multi-channel outreach, optimizing bids and copy in real-time." }
                    ].map((phase, i) => (
                        <div key={i} className="relative z-10 bg-white md:bg-transparent p-6 md:p-0 rounded-2xl md:rounded-none border border-black/5 md:border-none shadow-sm md:shadow-none">
                            <div className="w-16 h-16 rounded-2xl bg-white border border-[#F59E0B]/20 shadow-md flex items-center justify-center text-[#F59E0B] font-black text-xl mb-6 mx-auto md:mx-0 relative">
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
                    Evaluate Growth Engine AI <ArrowRight size={18} />
                </Link>
            </div>
        </div>
    );
};

export default MarketingPage;

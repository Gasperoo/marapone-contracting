import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Brain, Database, ShieldCheck, Zap, Lock, Layers, ArrowRight, Server, Search, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import Particles from '../components/Particles/Particles';
import '../components/LandingPage/LandingPage.css';

export default function CustomLLMPage() {
    return (
        <div className="min-h-screen pt-32 pb-24 relative overflow-hidden text-[#1a1a1a]" style={{ backgroundColor: '#F5F5F5' }}>
            {/* Dynamic Particles Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Particles
                    particleColors={['#8B5CF6', '#C084FC', '#1a1a1a']}
                    particleCount={250}
                    particleSpread={15}
                    speed={0.1}
                    particleBaseSize={60}
                    moveParticlesOnHover={false}
                    alphaParticles={true}
                    sizeRandomness={1.5}
                    cameraDistance={25}
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Hero Section */}
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#8B5CF6]/20 bg-[#8B5CF6]/5 backdrop-blur-md mb-8 text-sm font-bold tracking-widest text-[#8B5CF6] uppercase shadow-sm"
                    >
                        <Brain size={16} /> Meet Your New Digital Expert
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#1a1a1a] mb-8 leading-[1.05]"
                    >
                        AI That Actually <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#C084FC]">Understands You.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-[#4b5563] leading-relaxed max-w-3xl mx-auto font-medium"
                    >
                        Forget confusing tech jargon. We build a personalized, private AI assistant that acts like a senior team member who has memorized every single document, blueprint, and email your company has ever produced. It answers your questions instantly—and safely.
                    </motion.p>
                </div>

                {/* Powered By Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center justify-center mb-24 border-y border-black/5 py-8"
                >
                    <span className="text-xs font-bold tracking-widest text-[#6b7280] uppercase mb-4">Built on world-class technology</span>
                    <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60">
                        <div className="text-xl font-black text-[#1a1a1a] tracking-tight">Claude <span className="text-xs font-normal align-top bg-black/5 px-1.5 py-0.5 rounded ml-1">by Anthropic</span></div>
                        <div className="text-xl font-black text-[#1a1a1a] tracking-tight">Super Grok <span className="text-xs font-normal align-top bg-black/5 px-1.5 py-0.5 rounded ml-1">by xAI</span></div>
                        <div className="text-xl font-black text-[#1a1a1a] tracking-tight">Gemini <span className="text-xs font-normal align-top bg-black/5 px-1.5 py-0.5 rounded ml-1">by Google</span></div>
                    </div>
                </motion.div>

                {/* Core Value Proposition Grid - SIMPLIFIED */}
                <div className="grid md:grid-cols-3 gap-6 mb-32">
                    {[
                        { icon: <Lock size={28} />, title: "100% Private & Safe", desc: "Your company's files never go to the public internet. No one else can see your data, and we don't use your secrets to train public tools like ChatGPT." },
                        { icon: <Database size={28} />, title: "Knows Your Business", desc: "We feed the AI your historical contracts, daily reports, and rulebooks. It doesn't give generic advice—it gives answers specific to how your company works." },
                        { icon: <Zap size={28} />, title: "Ready to Work", desc: "No complicated setups for your team. You just chat with it the same way you would message a coworker on Slack, Teams, or your company portal." }
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white rounded-3xl p-8 border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-transform relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#8B5CF6]/5 rounded-bl-full -z-0 transition-transform group-hover:scale-110" />
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[#8B5CF6]/10 text-[#8B5CF6] mb-6 relative z-10 shadow-inner">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-[#1a1a1a] mb-3 relative z-10">{feature.title}</h3>
                            <p className="text-[#6b7280] leading-relaxed relative z-10">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* NEW SECTION: How it works simply */}
                <div className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-[#1a1a1a] mb-6">How It Actually Works</h2>
                        <p className="text-lg text-[#6b7280] max-w-2xl mx-auto">No computer science degree required. Here is exactly what we do for you.</p>
                    </div>

                    <div className="grid gap-6 max-w-4xl mx-auto">
                        {[
                            { step: "1", title: "We Gather Your Messy Files", desc: "You have PDFs, spreadsheets, Word docs, and emails scattered everywhere. We collect them all safely into one secure digital vault." },
                            { step: "2", title: "The AI Reads Everything", desc: "Our system reads through decades of your files in a few hours. It understands how everything connects—like tying a material receipt to a specific project blueprint." },
                            { step: "3", title: "You Ask Questions", desc: "You type a question in plain English, like 'Why did the Smith project run over budget in 2022?'" },
                            { step: "4", title: "It Gives You the Answer", desc: "The AI instantly reads through all those old files, writes a clear summary of what went wrong, and shows you the exact documents it used to find the answer." }
                        ].map((item, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                                className="flex gap-6 items-start p-6 bg-white rounded-2xl border border-black/5 shadow-sm"
                            >
                                <div className="w-12 h-12 flex-shrink-0 bg-[#8B5CF6] text-white rounded-full flex items-center justify-center font-black text-xl shadow-lg shadow-[#8B5CF6]/30">
                                    {item.step}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">{item.title}</h3>
                                    <p className="text-[#6b7280] leading-relaxed">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Abstract Data Visualization */}
                <div className="bg-white border border-black/5 rounded-[3rem] p-8 md:p-16 mb-32 shadow-[0_20px_60px_rgba(0,0,0,0.04)] relative overflow-hidden">
                    {/* Background elements */}
                    <div className="absolute inset-0 bg-[#8B5CF6]/[0.02]" />
                    <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#8B5CF6]/10 rounded-full blur-[100px]" />
                    <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-[#C084FC]/10 rounded-full blur-[100px]" />

                    <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-black text-[#1a1a1a] mb-6 tracking-tight leading-tight">
                                From Chaos to <br /><span className="text-[#8B5CF6]">Clarity.</span>
                            </h2>
                            <p className="text-lg text-[#4b5563] mb-8 leading-relaxed">
                                Imagine having an assistant who never sleeps, never forgets, and works a million times faster than a human. That's Gasper AI. It turns your overwhelming mountains of paperwork into clear, actionable answers.
                            </p>

                            <ul className="space-y-4 mb-10">
                                {["Connects to tools you already use", "Reads old scanned PDFs and blueprints", "Never hallucinates or makes up facts", "Shows you the 'receipts' for every answer"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center text-[#8B5CF6]">
                                            <ShieldCheck size={14} />
                                        </div>
                                        <span className="font-semibold text-[#1a1a1a]">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-[#1a1a1a] text-white rounded-xl font-bold hover:bg-black transition-colors shadow-lg hover:-translate-y-0.5">
                                Talk to a Human <ArrowRight size={18} />
                            </Link>
                        </div>

                        {/* Interactive Server Visual - Simplifed text inside */}
                        <div className="relative h-[450px] w-full bg-[#1a1a1a] rounded-3xl border border-gray-800 shadow-2xl p-6 flex flex-col overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />

                            {/* Server Header */}
                            <div className="flex justify-between items-center pb-4 border-b border-white/10 relative z-10">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                </div>
                                <div className="text-[10px] uppercase tracking-widest font-mono text-gray-500">Secure Private Chat</div>
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                                </div>
                            </div>

                            {/* Terminal Input */}
                            <div className="mt-6 flex flex-col gap-4 relative z-10 flex-1">

                                <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-3">
                                    <Terminal size={16} className="text-[#8B5CF6] mt-0.5" />
                                    <div>
                                        <div className="text-xs text-gray-400 font-bold mb-1">YOU:</div>
                                        <div className="text-sm font-semibold text-white">"Why did our concrete costs jump so high on the Berlin Project compared to normal?"</div>
                                    </div>
                                </motion.div>

                                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.8 }} className="flex flex-col gap-2 pl-8">
                                    <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono">
                                        <Search size={12} className="text-blue-400" />
                                        Reading thousand-page Berlin_Budget.pdf...
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono">
                                        <Server size={12} className="text-purple-400" />
                                        Comparing with current supplier pricing...
                                    </div>
                                </motion.div>

                                <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 1.5 }} className="bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 rounded-xl p-4 flex gap-3 shadow-[0_0_30px_rgba(139,92,246,0.1)] relative overflow-hidden mt-auto">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-[#8B5CF6]" />
                                    <Brain size={16} className="text-[#8B5CF6] mt-0.5" />
                                    <div>
                                        <div className="text-xs text-[#8B5CF6] font-bold mb-1">GASPER AI:</div>
                                        <div className="text-sm text-gray-200 leading-relaxed font-medium">
                                            The costs jumped 24% because your supplier, Apex Materials, added a hidden "winter delivery surcharge" on page 42 of their contract renewal that year.
                                            <br /><br />
                                            I checked our current contracts. Apex is attempting to add the same surcharge next month. Would you like me to draft an email to procurement to renegotiate this?
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto"
                >
                    <h2 className="text-4xl font-bold text-[#1a1a1a] mb-6 tracking-tight">Stop renting generic software.</h2>
                    <p className="text-xl text-[#4b5563] mb-10 leading-relaxed">
                        It's time to build a permanent digital expert that grows smarter with every project you complete. No subscription fees. No per-user licenses. Once it's built, you own it forever.
                    </p>
                    <Link to="/contact" className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white bg-gradient-to-r from-[#8B5CF6] to-[#C084FC] rounded-xl hover:shadow-[0_15px_40px_rgba(139,92,246,0.3)] hover:-translate-y-1 transition-all">
                        Get Started Today <ArrowRight size={20} className="ml-2" />
                    </Link>
                </motion.div>

            </div>
        </div>
    );
}

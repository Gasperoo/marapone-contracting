import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Zap, Users, Award } from 'lucide-react';
import '../components/LandingPage/LandingPage.css'; // Ensure we have access to common styles

export default function RuixenAbout() {
    return (
        <div className="landing-container w-full">
            <div className="max-w-7xl mx-auto px-6">

                {/* Ecosystem Hero */}
                <section className="mb-24">
                    <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 p-8 md:p-12 lg:p-16">
                        {/* Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#5227FF]/10 to-transparent pointer-events-none" />

                        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                                    The Marapone <span className="text-[#5227FF]">Ecosystem</span>
                                </h2>
                                <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                                    Marapone is evolving beyond services. We are building a connected ecosystem bridging AI innovation, strategic consulting, and global logistics execution.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center gap-2 text-white bg-white/10 px-4 py-2 rounded-full border border-white/10">
                                        <Globe size={18} className="text-[#22d3ee]" />
                                        <span>Global Reach</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-white bg-white/10 px-4 py-2 rounded-full border border-white/10">
                                        <Zap size={18} className="text-[#5227FF]" />
                                        <span>AI Driven</span>
                                    </div>
                                </div>
                            </div>

                            {/* Visual Stats Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <StatCard value="300+" label="Partners" icon={<Users className="text-[#5227FF]" />} />
                                <StatCard value="10+" label="Awards" icon={<Award className="text-amber-400" />} />
                                <StatCard value="99%" label="Satisfaction" icon={<Zap className="text-[#22d3ee]" />} />
                                <StatCard value="Global" label="Coverage" icon={<Globe className="text-emerald-400" />} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Cards Section */}
                <section className="grid md:grid-cols-2 gap-8 mb-20">
                    {/* Innovation Card */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="group relative rounded-3xl overflow-hidden border border-white/10 bg-slate-900/50 p-8 min-h-[400px] flex flex-col justify-end"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />
                        {/* Abstract background */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#5227FF]/20 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-20">
                            <div className="w-12 h-12 rounded-xl bg-[#5227FF] flex items-center justify-center text-white mb-6 shadow-lg shadow-[#5227FF]/30">
                                <Zap size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">Accelerate Growth</h3>
                            <p className="text-slate-300 mb-6">
                                Our solutions drive innovation, efficiency, and measurable impact for businesses across multiple continents.
                            </p>
                            <Link to="/contact" className="inline-flex items-center text-white font-medium hover:text-[#5227FF] transition-colors">
                                Partner with us <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>

                    {/* Future Ready Card */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="group relative rounded-3xl overflow-hidden border border-white/10 bg-slate-900/50 p-8 min-h-[400px] flex flex-col justify-end"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-[#22d3ee]/20 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-20">
                            <div className="w-12 h-12 rounded-xl bg-[#22d3ee] flex items-center justify-center text-slate-900 mb-6 shadow-lg shadow-[#22d3ee]/30">
                                <Globe size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">Future-Ready Design</h3>
                            <p className="text-slate-300 mb-6">
                                Intuitive, scalable solutions for modern businesses combining aesthetics, functionality, and real-world results.
                            </p>
                            <Link to="/features" className="inline-flex items-center text-white font-medium hover:text-[#22d3ee] transition-colors">
                                See our tech <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>
                </section>

            </div>
        </div>
    );
}

function StatCard({ value, label, icon }) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors">
            <div className="flex justify-center mb-2">{icon}</div>
            <div className="text-2xl font-bold text-white mb-1">{value}</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider">{label}</div>
        </div>
    );
}

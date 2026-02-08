import React from 'react';
import { motion } from 'motion/react';
import { Database, Cpu, BarChart3, ArrowRight, Server, Globe2, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../components/LandingPage/LandingPage.css';

export default function HowItWorksPage() {
    return (
        <div className="landing-container pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-6">

                {/* Hero Text Only */}
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="hero-title mb-6"
                    >
                        The Engine of <span className="text-[#5227FF]">Global Trade</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="hero-subtitle mb-8"
                    >
                        How Gasper ingests millions of data points, processes them with advanced AI, and delivers actionable insights in milliseconds.
                    </motion.p>
                </div>

                {/* Process Steps */}
                <div className="relative mb-24">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#5227FF] via-[#22d3ee] to-[#5227FF] opacity-30 transform -translate-x-1/2" />

                    <ProcessStep
                        number="01"
                        title="Data Ingestion"
                        description="We aggregate structured and unstructured data from over 500 sources, including carrier APIs, satellite feeds, port authorities, and news outlets."
                        icon={<Database size={32} />}
                        align="left"
                    />
                    <ProcessStep
                        number="02"
                        title="AI Processing"
                        description="Our proprietary ML models clean, normalize, and analyze the data. Natural Language Processing (NLP) extracts risks from news, while Predictive Models forecast delays."
                        icon={<Cpu size={32} />}
                        align="right"
                    />
                    <ProcessStep
                        number="03"
                        title="Digital Twin Modeling"
                        description="The refined data feeds into a live simulation of your supply chain. This 'Digital Twin' allows us to run thousands of scenarios to find the optimal path."
                        icon={<Server size={32} />}
                        align="left"
                    />
                    <ProcessStep
                        number="04"
                        title="Actionable Insights"
                        description="Finally, insights are delivered via our dashboard or API. You get alerts, updated ETAs, and cost-saving recommendations instantly."
                        icon={<BarChart3 size={32} />}
                        align="right"
                    />
                </div>

                {/* Tech Stack / Architecture */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 text-center mb-20">
                    <h2 className="text-3xl font-bold text-white mb-8">Built on Modern Infrastructure</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <StackItem label="Real-Time WebSockets" icon={<Globe2 />} />
                        <StackItem label="Distributed Cloud" icon={<Share2 />} />
                        <StackItem label="End-to-End Encryption" icon={<Server />} />
                        <StackItem label="99.99% Uptime SLA" icon={<ActivityIcon />} />
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Link to="/contact" className="btn-secondary inline-flex items-center">
                        Request Technical Whitepaper <ArrowRight size={18} className="ml-2" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

function ProcessStep({ number, title, description, icon, align }) {
    const isLeft = align === 'left';
    return (
        <motion.div
            initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`flex flex-col md:flex-row items-center gap-8 mb-16 md:mb-0 ${isLeft ? 'md:flex-row-reverse' : ''}`}
        >
            <div className={`md:w-1/2 flex ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}>
                <div className={`
                    relative p-8 rounded-2xl bg-slate-900/50 border border-white/10 max-w-lg
                    ${isLeft ? 'md:mr-12 md:text-right' : 'md:ml-12 md:text-left'}
                 `}>
                    <div className="text-[#5227FF] text-sm font-bold tracking-widest mb-2">STEP {number}</div>
                    <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
                    <p className="text-slate-400">{description}</p>
                </div>
            </div>

            {/* Center Icon */}
            <div className="relative z-10 w-16 h-16 rounded-full bg-[#0f172a] border-2 border-[#5227FF] flex items-center justify-center text-white shadow-[0_0_20px_rgba(82,39,255,0.4)]">
                {icon}
            </div>

            <div className="md:w-1/2" /> {/* Spacer */}
        </motion.div>
    );
}

function StackItem({ label, icon }) {
    return (
        <div className="flex flex-col items-center gap-3 text-slate-300">
            <div className="p-4 rounded-full bg-white/5 text-[#22d3ee] mb-2">{icon}</div>
            <span className="font-semibold">{label}</span>
        </div>
    );
}

function ActivityIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
    )
}

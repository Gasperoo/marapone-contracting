import React from 'react';
import { motion } from 'motion/react';
import { Activity, TrendingUp, ShieldCheck, Grid, Zap, Globe, Layers, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../components/LandingPage/LandingPage.css';

export default function FeaturesPage() {
    return (
        <div className="landing-container pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-6">

                {/* Hero */}
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="hero-title mb-6 mx-auto"
                    >
                        Intelligence <span className="text-[#5227FF]">Beyond Boundaries</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="hero-subtitle"
                    >
                        A comprehensive suite of AI-powered tools designed to give you total visibility and control over your supply chain.
                    </motion.p>
                </div>

                {/* Feature Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-20">
                    <FeatureCard
                        icon={<Activity size={40} />}
                        title="Real-Time Tracking"
                        description="Monitor vessels, flights, and rail freight in real-time. Our global tracking network integrates data from thousands of carriers, providing you with up-to-the-minute status updates on every shipment."
                        details={['Vessel AIS Data', 'Live Flight Paths', 'Rail Freight Corridors', 'Delay Predictions']}
                    />
                    <FeatureCard
                        icon={<TrendingUp size={40} />}
                        title="Digital Twin Simulation"
                        description="Create a virtual replica of your supply chain. Test 'what-if' scenarios to understand the impact of port strikes, natural disasters, or tariff changes before they happen."
                        details={['Scenario Modeling', 'Cost Impact Analysis', 'Route Alternates', 'Inventory Optimization']}
                    />
                    <FeatureCard
                        icon={<ShieldCheck size={40} />}
                        title="Compliance & Risk AI"
                        description="Automate your compliance workflows. Our AI classifies HS codes with 99% accuracy and screens all partners against global sanctions lists instantly."
                        details={['Automated HS Classification', 'Sanctions Screening', 'Document Generation', 'Regulatory Alerts']}
                    />
                    <FeatureCard
                        icon={<Grid size={40} />}
                        title="Market Intelligence"
                        description="Stay ahead of market shifts. Access live commodity prices, currency exchange rates, and spot rates for major shipping routes in a single dashboard."
                        details={['Live User Indices', 'Currency Exchange', 'Commodity Tickers', 'Global Holidays']}
                    />
                </div>

                {/* Secondary Features */}
                <div className="grid md:grid-cols-3 gap-6 mb-20">
                    <SmallFeatureCard
                        icon={<Zap size={24} />}
                        title="Instant API Access"
                        desc="Connect Gasper directly to your ERP or TMS with our robust REST API."
                    />
                    <SmallFeatureCard
                        icon={<Globe size={24} />}
                        title="Global Coverage"
                        desc="Data from 200+ countries and territories, localizing insights for your specific lanes."
                    />
                    <SmallFeatureCard
                        icon={<Lock size={24} />}
                        title="Enterprise Security"
                        desc="SOC 2 Type II compliant with end-to-end encryption for all sensitive data."
                    />
                </div>

                {/* CTA */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">Ready to see it in action?</h2>
                    <Link to="/gasper" className="btn-primary inline-flex items-center">
                        Launch Console
                    </Link>
                </div>

            </div>
        </div>
    );
}

function FeatureCard({ icon, title, description, details }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#5227FF]/50 transition-colors group"
        >
            <div className="w-16 h-16 rounded-xl bg-[#5227FF]/10 flex items-center justify-center text-[#5227FF] mb-6 group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
            <p className="text-slate-400 mb-6 leading-relaxed">{description}</p>
            <ul className="grid grid-cols-2 gap-2">
                {details.map((item, i) => (
                    <li key={i} className="flex items-center text-sm text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#5227FF] mr-2" />
                        {item}
                    </li>
                ))}
            </ul>
        </motion.div>
    );
}

function SmallFeatureCard({ icon, title, desc }) {
    return (
        <div className="p-6 rounded-xl bg-white/5 border border-white/5">
            <div className="text-[#5227FF] mb-3">{icon}</div>
            <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
            <p className="text-sm text-slate-400">{desc}</p>
        </div>
    );
}

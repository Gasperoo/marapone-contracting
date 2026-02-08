import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    Activity, TrendingUp, ShieldCheck, Grid, Zap, Globe, Lock,
    Database, Cpu, Server, BarChart3,
    Anchor, Truck, ShoppingBag, Factory, Wheat, Fuel, HardHat, Stethoscope, Plane
} from 'lucide-react';
import TiltCard from '../TiltCard'; // Assuming this is available as it was imported in FeaturesPage

// --- Sub-components copied/adapted for self-containment ---

function FeatureCard({ icon, title, description, details }) {
    return (
        <TiltCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#5227FF]/50 transition-colors group h-full"
        >
            <div className="w-16 h-16 rounded-xl bg-[#5227FF]/10 flex items-center justify-center text-[#5227FF] mb-6 group-hover:scale-110 transition-transform"
                style={{ transform: "translateZ(20px)" }}
            >
                {icon}
            </div>
            <h3 className="text-2xl font-bold text-white mb-4" style={{ transform: "translateZ(30px)" }}>{title}</h3>
            <p className="text-slate-400 mb-6 leading-relaxed" style={{ transform: "translateZ(20px)" }}>{description}</p>
            <ul className="grid grid-cols-2 gap-2" style={{ transform: "translateZ(10px)" }}>
                {details.map((item, i) => (
                    <li key={i} className="flex items-center text-sm text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#5227FF] mr-2" />
                        {item}
                    </li>
                ))}
            </ul>
        </TiltCard>
    );
}

function ProcessStep({ number, title, description, icon, align, details }) {
    const isLeft = align === 'left';
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`flex flex-col md:flex-row items-center gap-8 mb-16 md:mb-0 relative z-10 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
            {/* Content Side */}
            <motion.div
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`md:w-1/2 flex ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}
            >
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    className={`
                        relative p-8 rounded-2xl bg-slate-900/80 border border-white/10 max-w-lg cursor-pointer hover:border-[#5227FF]/50 transition-all duration-300
                        ${isLeft ? 'md:mr-12 text-left' : 'md:ml-12 text-left'}
                        ${isOpen ? 'border-[#5227FF] bg-slate-800/80' : ''}
                    `}
                >
                    <div className="text-[#5227FF] text-sm font-bold tracking-widest mb-2 flex items-center justify-between">
                        <span>STEP {number}</span>
                        <motion.span
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            className="text-white/50"
                        >
                            ▼
                        </motion.span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
                    <p className="text-slate-400 mb-4">{description}</p>

                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="pt-4 mt-4 border-t border-white/10">
                                    <h4 className="text-sm font-semibold text-white mb-3">Technical Specs:</h4>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {details && details.map((detail, idx) => (
                                            <li key={idx} className="text-xs text-slate-300 flex items-center">
                                                <div className="w-1 h-1 bg-[#22d3ee] rounded-full mr-2" />
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Center Icon */}
            <div className={`relative z-10 w-16 h-16 rounded-full bg-[#0f172a] border-2 flex items-center justify-center text-white shadow-[0_0_20px_rgba(82,39,255,0.4)] transition-colors duration-300 ${isOpen ? 'border-[#22d3ee] text-[#22d3ee]' : 'border-[#5227FF]'}`}>
                {icon}
            </div>

            <div className="md:w-1/2" /> {/* Spacer */}
        </div>
    );
}


function IndustryCard({ icon, title, description, color, useCase }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.08] hover:border-[#5227FF]/50 transition-all cursor-default overflow-hidden"
        >
            <div className="relative z-10">
                <div className={`mb-6 ${color} transition-transform group-hover:scale-110 duration-300`}>
                    {icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-[#5227FF]/90 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out flex items-center justify-center p-6 text-center z-20">
                <div>
                    <div className="text-white/80 text-xs font-bold uppercase tracking-wider mb-2">Primary Use Case</div>
                    <div className="text-white font-bold text-lg">{useCase}</div>
                </div>
            </div>
        </motion.div>
    );
}

// --- Main Content Component ---

export default function ComingSoonContent() {
    return (
        <div className="mt-32 space-y-32">

            {/* --- FEATURES SECTION --- */}
            <section className="px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-white mb-4">Intelligence Beyond Boundaries</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">A comprehensive suite of AI-powered tools designed to give you total visibility and control.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    <FeatureCard
                        icon={<Activity size={40} />}
                        title="Real-Time Tracking"
                        description="Monitor vessels, flights, and rail freight in real-time. Our global tracking network integrates data from thousands of carriers."
                        details={['Vessel AIS Data', 'Live Flight Paths', 'Rail Freight Corridors', 'Delay Predictions']}
                    />
                    <FeatureCard
                        icon={<TrendingUp size={40} />}
                        title="Digital Twin Simulation"
                        description="Create a virtual replica of your supply chain. Test 'what-if' scenarios to understand the impact of port strikes or disasters."
                        details={['Scenario Modeling', 'Cost Impact Analysis', 'Route Alternates', 'Inventory Optimization']}
                    />
                    <FeatureCard
                        icon={<ShieldCheck size={40} />}
                        title="Compliance & Risk AI"
                        description="Automate your compliance workflows. Our AI classifies HS codes with 99% accuracy and screens all partners."
                        details={['Automated HS Classification', 'Sanctions Screening', 'Document Generation', 'Regulatory Alerts']}
                    />
                    <FeatureCard
                        icon={<Grid size={40} />}
                        title="Market Intelligence"
                        description="Stay ahead of market shifts. Access live commodity prices, currency exchange rates, and spot rates."
                        details={['Live User Indices', 'Currency Exchange', 'Commodity Tickers', 'Global Holidays']}
                    />
                </div>
            </section>

            {/* --- HOW IT WORKS SECTION --- */}
            <section className="px-6 max-w-7xl mx-auto relative">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-white mb-4">How Gasper Works</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">From data ingestion to actionable intelligence.</p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-800 transform -translate-x-1/2">
                        <div className="absolute top-0 bottom-0 w-full bg-gradient-to-b from-[#5227FF] via-[#22d3ee] to-[#5227FF] opacity-20" />
                    </div>

                    <ProcessStep
                        number="01"
                        title="Data Ingestion"
                        description="We aggregate structured and unstructured data from over 500 sources, including AIS feeds, port APIs, and weather stations."
                        icon={<Database size={32} />}
                        align="left"
                        details={[
                            "REST API & Webhooks",
                            "EDI (X12, EDIFACT) Parsers",
                            "IoT Sensor Stream Integration"
                        ]}
                    />
                    <ProcessStep
                        number="02"
                        title="AI Processing"
                        description="Our proprietary ML models clean, normalize, and analyze the data to extract risks and forecast delays."
                        icon={<Cpu size={32} />}
                        align="right"
                        details={[
                            "Entity Recognition (NER)",
                            "Time-Series Forecasting",
                            "Anomaly Detection Models"
                        ]}
                    />
                    <ProcessStep
                        number="03"
                        title="Actionable Insights"
                        description="Insights are delivered via dashboard or API. You get alerts, updated ETAs, and cost-saving recommendations instantly."
                        icon={<BarChart3 size={32} />}
                        align="left"
                        details={[
                            "Real-time Push Notifications",
                            "Customizable Dashboards",
                            "Automated Reporting"
                        ]}
                    />
                </div>
            </section>

            {/* --- INDUSTRIES SECTION --- */}
            <section className="px-6 max-w-7xl mx-auto pb-20">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-white mb-4">Engineered for Every Sector</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <IndustryCard
                        icon={<Anchor size={32} />}
                        title="Maritime Logistics"
                        description="Optimize port calls, track container vessels in real-time, and predict congestion at major hubs."
                        color="text-blue-400"
                        useCase="Vessel Tracking & Fuel Optimization"
                    />
                    <IndustryCard
                        icon={<Truck size={32} />}
                        title="Freight Forwarding"
                        description="Manage multi-modal shipments with ease. Automate documentation and tracking."
                        color="text-green-400"
                        useCase="Automated Documentation & Client Portal"
                    />
                    <IndustryCard
                        icon={<ShoppingBag size={32} />}
                        title="Retail & E-commerce"
                        description="Ensure stock availability by tracking inventory from factory to warehouse."
                        color="text-purple-400"
                        useCase="Inventory Visibility & Demand Sensing"
                    />
                    <IndustryCard
                        icon={<Factory size={32} />}
                        title="Manufacturing"
                        description="Secure your supply chain against disruptions and monitor raw material shipments."
                        color="text-orange-400"
                        useCase="Supplier Risk Monitoring"
                    />
                    <IndustryCard
                        icon={<Fuel size={32} />}
                        title="Energy & Commodities"
                        description="Monitor oil and gas shipments and react instantly to geopolitical events."
                        color="text-red-400"
                        useCase="Geopolitical Route Optimization"
                    />
                    <IndustryCard
                        icon={<Plane size={32} />}
                        title="Aerospace"
                        description="Track critical AOG parts globally to minimize downtime."
                        color="text-sky-400"
                        useCase="AOG Parts Tracking"
                    />
                </div>
            </section>

        </div>
    );
}

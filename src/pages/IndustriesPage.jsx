import React from 'react';
import { motion } from 'motion/react';
import { Anchor, Truck, ShoppingBag, Factory, Wheat, Fuel, ArrowRight, HardHat, Stethoscope, Plane } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../components/LandingPage/LandingPage.css';
import IndustryCard from '../components/IndustryCard';
import Particles from '../components/Particles/Particles';

export default function IndustriesPage() {
    return (
        <div className="landing-container pt-24 pb-20 relative">
            {/* Particles Background */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <Particles
                    particleColors={["#5227FF", "#22d3ee", "#8b5cf6"]}
                    particleCount={400}
                    particleSpread={15}
                    speed={0.08}
                    particleBaseSize={80}
                    moveParticlesOnHover={false}
                    alphaParticles={true}
                    disableRotation={false}
                    sizeRandomness={1.5}
                    cameraDistance={25}
                    pixelRatio={Math.min(window.devicePixelRatio, 2)}
                />
            </div>

            <div className="max-w-7xl mx-auto px-6">

                {/* Hero Text Only */}
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="hero-title mb-6 mx-auto"
                    >
                        Powering <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5227FF] to-[#22d3ee]">Every Sector</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="hero-subtitle mb-8"
                    >
                        From raw materials to retail shelves, Gasper provides the specialized insights your industry needs.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 relative z-10">
                    <IndustryCard
                        icon={<Anchor size={32} />}
                        title="Maritime Logistics"
                        description="Optimize port calls, track container vessels in real-time, and predict congestion at major hubs. Reduce demurrage and detention costs."
                        color="text-blue-400"
                        useCase="Vessel Tracking & Fuel Optimization"
                    />
                    <IndustryCard
                        icon={<Truck size={32} />}
                        title="Freight Forwarding"
                        description="Manage multi-modal shipments with ease. Automate documentation (HS Codes) and provide your clients with a white-labeled tracking portal."
                        color="text-green-400"
                        useCase="Automated Documentation & Client Portal"
                    />
                    <IndustryCard
                        icon={<ShoppingBag size={32} />}
                        title="Retail & E-commerce"
                        description="Ensure stock availability by tracking inventory from factory to warehouse. Predict delays to manage customer expectations proactively."
                        color="text-purple-400"
                        useCase="Inventory Visibility & Demand Sensing"
                    />
                    <IndustryCard
                        icon={<Factory size={32} />}
                        title="Manufacturing"
                        description="Secure your supply chain against disruptions. Monitor raw material shipments and identify alternative suppliers instantly."
                        color="text-orange-400"
                        useCase="Supplier Risk Monitoring"
                    />
                    <IndustryCard
                        icon={<Wheat size={32} />}
                        title="Agriculture"
                        description="Track perishable goods with weather overlay integration. Ensure optimal routes to reduce spoilage and maintain freshness."
                        color="text-yellow-400"
                        useCase="Cold Chain Integrity"
                    />
                    <IndustryCard
                        icon={<Fuel size={32} />}
                        title="Energy & Commodities"
                        description="Monitor oil and gas shipments. React instantly to geopolitical events that affect energy trade routes."
                        color="text-red-400"
                        useCase="Geopolitical Route Optimization"
                    />
                    <IndustryCard
                        icon={<HardHat size={32} />}
                        title="Construction"
                        description="Coordinate just-in-time delivery of heavy machinery and materials to keeping large-scale projects on schedule."
                        color="text-slate-400"
                        useCase="Project Logistics"
                    />
                    <IndustryCard
                        icon={<Stethoscope size={32} />}
                        title="Healthcare & Pharma"
                        description="Maintain cold-chain integrity for sensitive pharmaceuticals with real-time temperature monitoring and deviation alerts."
                        color="text-teal-400"
                        useCase="Temperature Excursion Alerts"
                    />
                    <IndustryCard
                        icon={<Plane size={32} />}
                        title="Aerospace"
                        description="Track critical AOG (Aircraft on Ground) parts globally to minimize downtime and get fleets back in the air faster."
                        color="text-sky-400"
                        useCase="AOG Parts Tracking"
                    />
                </div>

                {/* Universal Benefits Section */}
                <div className="mb-24">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">Universal Benefits</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <BenefitCard
                            title="Total Visibility"
                            description="See every moving part of your supply chain in a single, unified dashboard."
                        />
                        <BenefitCard
                            title="Cost Reduction"
                            description="Identify inefficiencies and reduce detention & demurrage fees by up to 30%."
                        />
                        <BenefitCard
                            title="Risk Mitigation"
                            description="Predict disruptions before they happen with AI-driven weather and geopolitical analysis."
                        />
                    </div>
                </div>

                {/* Case Study / Testimonial Placeholder */}
                <div className="bg-[#5227FF]/10 border border-[#5227FF]/30 rounded-2xl p-8 text-center max-w-3xl mx-auto">
                    <h3 className="text-xl font-bold text-white mb-4">"Gasper has transformed how we manage our perishable shipments."</h3>
                    <p className="text-slate-400">- Director of Logistics, Global Retail Corp (Placeholder)</p>
                </div>

                {/* CTA */}
                <div className="text-center mt-20">
                    <h2 className="text-3xl font-bold text-white mb-6">Find your industry solution.</h2>
                    <Link to="/contact" className="btn-primary inline-flex items-center">
                        Talk to an Expert <ArrowRight size={18} className="ml-2" />
                    </Link>
                </div>

            </div>
        </div>
    );
}

function BenefitCard({ title, description }) {
    return (
        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center hover:bg-white/[0.08] transition-colors">
            <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
            <p className="text-slate-400 leading-relaxed">{description}</p>
        </div>
    );
}

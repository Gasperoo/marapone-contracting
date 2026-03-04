import React, { useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ArrowRight, Globe, Layers, Zap, Cpu, Ship, HardHat, Shield, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import RuixenAbout from '../components/RuixenAbout';
import NetworkMesh from '../components/AboutPage/NetworkMesh';
import '../components/LandingPage/LandingPage.css';

export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax and Opacity transforms for the Hero section
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // Progress bar for the "Mission Control" narrative
  const timelineScale = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <div className="min-h-screen relative overflow-hidden" ref={containerRef}>

      {/* Hero Section (Sticky & Parallax) */}
      <div className="h-screen sticky top-0 flex items-center justify-center p-6 z-10 pointer-events-none">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="text-center max-w-4xl pt-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="inline-flex items-center justify-center p-4 rounded-full bg-black/5 border border-black/10 mb-8 w-24 h-24 shadow-xl relative backdrop-blur-md"
          >
            <Globe size={40} className="text-[#FF6B00] relative z-10" />
            <div className="absolute inset-0 blur-2xl opacity-40 bg-[#FF6B00]" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-8xl font-bold tracking-tight text-[#1a1a1a] mb-8 leading-tight"
          >
            Building the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#F59E0B]">Digital Nervous System</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-[#4b5563] font-light leading-relaxed max-w-3xl mx-auto"
          >
            We are the AI bridge connecting complex physical operations—from global supply chains to heavy construction—into a unified, intelligent ecosystem.
          </motion.p>
        </motion.div>
      </div>

      {/* Main Content Area (Scrolls over the sticky hero) */}
      <div className="relative z-20 bg-white/90 backdrop-blur-2xl border-t border-black/5">

        {/* By the Numbers — Bridge Section */}
        <div className="border-b border-black/5 bg-gradient-to-b from-black/[0.02] to-transparent">
          <div className="max-w-7xl mx-auto px-6 py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-xs font-mono text-[#FF6B00] tracking-[0.3em] uppercase font-bold">By the Numbers</span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mt-3">Powering operations at scale</h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: '10.5M+', label: 'Daily tracking events processed', delay: 0 },
                { value: '50+', label: 'Global ports & hubs integrated', delay: 0.1 },
                { value: '99.9%', label: 'Neural engine classification accuracy', delay: 0.2 },
                { value: '2.4x', label: 'Avg. ROI within first quarter', delay: 0.3 },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: stat.delay }}
                  viewport={{ once: true }}
                  className="text-center p-6 rounded-2xl border border-black/5 bg-white/60 backdrop-blur-sm hover:border-[#FF6B00]/20 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="text-4xl md:text-5xl font-black text-[#1a1a1a] mb-2">{stat.value}</div>
                  <div className="text-sm text-[#4b5563] leading-snug">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Progress Line */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-black/10 hidden lg:block">
          <motion.div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#FF6B00] to-[#F59E0B] shadow-[0_0_15px_rgba(255,107,0,0.5)]"
            style={{ height: "100%", scaleY: timelineScale, transformOrigin: 'top' }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:pl-24 py-32 space-y-40">

          {/* Mission Section */}
          <section>
            <SectionHeader title="01. The Mission" glowColor="#FF6B00" />
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-6 leading-tight">
                  Decoding the Physical World.
                </h2>
                <p className="text-lg text-[#4b5563] leading-relaxed mb-6">
                  Our mission is to democratize access to enterprise-grade operational intelligence. We believe that every shipping lane, warehouse, and construction site generates a story written in data.
                </p>
                <p className="text-lg text-[#4b5563] leading-relaxed">
                  By applying advanced predictive AI and generative models to this raw data, we transform chaotic, analog environments into orchestrated, predictive ecosystems. We build software that understands concrete and steel, ships and cargo.
                </p>
              </div>
              <div className="relative h-[400px] rounded-3xl border border-black/5 bg-black/5 overflow-hidden flex items-center justify-center p-8 group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B00]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="grid grid-cols-2 gap-4 w-full h-full relative z-10">
                  <div className="rounded-xl border border-black/5 bg-white/60 backdrop-blur-sm p-6 flex flex-col justify-end">
                    <Activity className="text-[#FF6B00] mb-4 w-8 h-8" />
                    <div className="text-[#1a1a1a] font-bold mb-1">Peta-Scale Data</div>
                    <div className="text-xs text-slate-500">Processing real-time telemetry</div>
                  </div>
                  <div className="rounded-xl border border-black/5 bg-white/60 backdrop-blur-sm p-6 flex flex-col justify-start">
                    <Cpu className="text-[#F59E0B] mb-4 w-8 h-8" />
                    <div className="text-[#1a1a1a] font-bold mb-1">Deep Learning</div>
                    <div className="text-xs text-slate-500">Neural network pattern recognition</div>
                  </div>
                  <div className="rounded-xl border border-black/5 bg-white/60 backdrop-blur-sm p-6 flex flex-col justify-end translate-y-4">
                    <Layers className="text-[#FF6B00] mb-4 w-8 h-8" />
                    <div className="text-[#1a1a1a] font-bold mb-1">Digital Twins</div>
                    <div className="text-xs text-slate-500">1:1 Virtual system simulation</div>
                  </div>
                  <div className="rounded-xl border border-black/5 bg-white/60 backdrop-blur-sm p-6 flex flex-col justify-start">
                    <Shield className="text-[#F59E0B] mb-4 w-8 h-8" />
                    <div className="text-[#1a1a1a] font-bold mb-1">Zero-Trust Security</div>
                    <div className="text-xs text-slate-500">Enterprise data isolation</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Dual Ecosystem Section */}
          <section>
            <SectionHeader title="02. The Ecosystem" glowColor="#F59E0B" />
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-16 max-w-3xl">
              One underlying architecture.<br />Two specialized engines.
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Logistics Domain */}
              <div className="p-10 rounded-3xl bg-gradient-to-b from-[#FF6B00]/5 to-transparent border border-[#FF6B00]/20 relative overflow-hidden group hover:border-[#FF6B00]/40 transition-colors duration-500">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF6B00] to-[#F59E0B] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />

                <div className="p-4 rounded-xl bg-white border border-black/5 shadow-sm inline-block mb-8">
                  <Ship className="text-[#FF6B00] w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold text-[#1a1a1a] mb-4">Gasper Logistics OS</h3>
                <p className="text-[#4b5563] text-lg mb-8 leading-relaxed">
                  The global shipping network is a complex web of variable risks. Our Logistics OS utilizes LLMs and geospatial routing algorithms to predict delays, optimize voyages, and automate HS code compliance in milliseconds.
                </p>
                <ul className="space-y-4 mb-10">
                  {['Global Carrier Integrations', 'Predictive Voyage Risk Analysis', 'Automated Trade Compliance'].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-sm font-medium text-[#4b5563]">
                      <div className="w-8 h-px bg-[#FF6B00]/50" /> {item}
                    </li>
                  ))}
                </ul>
                <Link to="/features" className="text-[#FF6B00] font-bold inline-flex items-center group-hover:text-[#F59E0B] transition-colors">
                  Explore Logistics OS <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Construction Domain */}
              <div className="p-10 rounded-3xl bg-gradient-to-b from-[#F59E0B]/5 to-transparent border border-[#F59E0B]/20 relative overflow-hidden group hover:border-[#F59E0B]/40 transition-colors duration-500">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF6B00] to-[#F59E0B] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />

                <div className="p-4 rounded-xl bg-white border border-black/5 shadow-sm inline-block mb-8">
                  <HardHat className="text-[#F59E0B] w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold text-[#1a1a1a] mb-4">Gasper Construction AI</h3>
                <p className="text-[#4b5563] text-lg mb-8 leading-relaxed">
                  The built environment suffers from siloed data and reactive planning. Our Construction AI ingests CAD/BIM blueprints, applies generative sequencing, and monitors site safety in real-time to ensure projects stay on the critical path.
                </p>
                <ul className="space-y-4 mb-10">
                  {['Generative Design & BIM Parsing', 'Critical Path Simulation', 'Automated Material Takeoffs'].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-sm font-medium text-[#4b5563]">
                      <div className="w-8 h-px bg-[#FF6B00]/50" /> {item}
                    </li>
                  ))}
                </ul>
                <Link to="/features" className="text-[#F59E0B] font-bold inline-flex items-center group-hover:text-[#FF6B00] transition-colors">
                  Explore Construction AI <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </section>

          {/* Core Values */}
          <section className="pb-32">
            <SectionHeader title="03. Core Values" glowColor="#FF6B00" />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ValueCard
                title="Deterministic AI"
                description="We reject the 'black box'. Our models provide transparent confidence scores and explainable logic chains for every operational decision."
                glowColor="#FF6B00"
              />
              <ValueCard
                title="Absolute Security"
                description="SOC2 Type II architecture. Deep tenant isolation ensures that your proprietary operational data never pollutes a public model."
                glowColor="#F59E0B"
              />
              <ValueCard
                title="Relentless Uptime"
                description="Global trade and tier-1 construction never sleep. We architect our distributed systems for 99.999% availability."
                glowColor="#FF6B00"
              />
              <ValueCard
                title="Impact Over Hype"
                description="We focus on tangible ROI: saving days on ocean transit, minimizing concrete waste, and accelerating cash flow."
                glowColor="#F59E0B"
              />
            </div>
          </section>

        </div>

        {/* Ecosystem Section */}
        <div className="border-t border-black/5 bg-[#F5F5F5] py-20 relative z-30">
          <RuixenAbout />
        </div>

      </div>
    </div>
  );
}

// Helper Components

// Helper Components

function SectionHeader({ title, glowColor }) {
  return (
    <div className="flex items-center gap-6 mb-12">
      <h3 className="text-xl font-mono text-[#1a1a1a] tracking-widest uppercase">{title}</h3>
      <div className="h-px flex-grow bg-black/10 relative">
        <div className="absolute top-0 left-0 h-full w-1/4" style={{ background: `linear-gradient(to right, ${glowColor}, transparent)` }} />
      </div>
    </div>
  );
}

function ValueCard({ title, description, glowColor }) {
  return (
    <div className="p-8 rounded-3xl bg-white border border-black/5 shadow-sm relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
        style={{ background: `radial-gradient(circle at top right, ${glowColor}, transparent)` }}
      />
      <h4 className="text-xl font-bold text-[#1a1a1a] mb-4 relative z-10">{title}</h4>
      <p className="text-[#4b5563] text-sm leading-relaxed relative z-10">{description}</p>
    </div>
  );
}

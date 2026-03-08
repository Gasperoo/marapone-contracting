import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Globe, Shield, Cpu, Lock, Network, SearchCode, Fingerprint, Banknote } from 'lucide-react';
import RuixenAbout from '../components/RuixenAbout';
import '../components/LandingPage/LandingPage.css';

export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax and Opacity transforms
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const timelineScale = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <div className="min-h-screen relative overflow-hidden text-[#1a1a1a]" style={{ backgroundColor: '#F5F5F5' }} ref={containerRef}>

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
            <Shield size={40} className="text-[#1a1a1a] relative z-10" />
            <div className="absolute inset-0 blur-2xl opacity-20 bg-[#1a1a1a]" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-8xl font-black tracking-tight text-[#1a1a1a] mb-8 leading-[1.05]"
          >
            Architects of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#1a1a1a]">Sovereign AI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-[#4b5563] font-medium leading-relaxed max-w-3xl mx-auto"
          >
            We deploy private, air-gapped language models for the world's most complex industrial operations. Your data. Your weights. Your intelligence.
          </motion.p>
        </motion.div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 bg-[#F5F5F5] border-t border-black/5">

        {/* By the Numbers */}
        <div className="border-b border-black/5 bg-white/50 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-xs font-bold tracking-widest text-[#8B5CF6] uppercase">Enterprise Scale</span>
              <h2 className="text-3xl font-bold text-[#1a1a1a] mt-3">Uncompromising Performance</h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: '100%', label: 'Data Sovereignty Guarantee', delay: 0 },
                { value: '0', label: 'Public Network Leaks', delay: 0.1 },
                { value: '< 200ms', label: 'Avg. Inference Latency', delay: 0.2 },
                { value: 'SOC2', label: 'Type II Architecture', delay: 0.3 },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: stat.delay }}
                  viewport={{ once: true }}
                  className="text-center p-8 rounded-3xl border border-black/5 bg-white shadow-sm hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="text-4xl md:text-5xl font-black text-[#1a1a1a] mb-2 group-hover:text-[#8B5CF6] transition-colors">{stat.value}</div>
                  <div className="text-sm font-bold text-[#6b7280] tracking-wide uppercase">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-32 space-y-40">

          {/* Mission Section */}
          <section>
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <span className="px-4 py-1.5 rounded-full bg-black/5 border border-black/10 text-xs font-bold tracking-widest uppercase mb-6 inline-block text-[#1a1a1a]">01 // The Paradigm Shift</span>
                <h2 className="text-4xl md:text-5xl font-black text-[#1a1a1a] mb-8 leading-tight">
                  Stop Leasing. Start Owning.
                </h2>
                <p className="text-lg text-[#4b5563] leading-relaxed mb-6 font-medium">
                  The SaaS era taught enterprises to rent their tools and outsource their data. In the age of AI, this model is fundamentally broken. Sending your proprietary supply chain data, financial burns, and strategic communications to public API endpoints is a critical security failure.
                </p>
                <p className="text-lg text-[#4b5563] leading-relaxed font-medium">
                  At Marapone, we believe that an enterprise's most valuable asset is its corporate memory. We build sovereign intelligence: deploying bespoke foundation models entirely within your isolated cloud environments.
                </p>
              </div>

              <div className="relative h-[450px] rounded-[2.5rem] bg-[#1a1a1a] p-1 overflow-hidden shadow-2xl">
                {/* Security Visual */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                <div className="w-full h-full rounded-[2.3rem] overflow-hidden relative flex flex-col justify-center items-center">

                  {/* Glowing Core */}
                  <div className="w-32 h-32 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#8B5CF6] rounded-full blur-[80px] opacity-40 animate-pulse" />

                  <div className="relative z-10 w-full px-12">
                    <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                      <span className="text-white/50 font-mono text-sm tracking-widest">TENANT_ISOLATION_STATUS</span>
                      <span className="text-[#10B981] font-mono text-sm tracking-widest animate-pulse">SECURE</span>
                    </div>

                    <div className="space-y-4 font-mono text-xs sm:text-sm">
                      <div className="flex items-center text-white/70">
                        <Lock size={16} className="text-[#8B5CF6] mr-3" />
                        <span>Public Weights</span>
                        <span className="mx-auto border-b border-white/20 border-dashed flex-grow relative top-[-4px] ml-4 mr-4" />
                        <span className="text-red-400">DENIED</span>
                      </div>
                      <div className="flex items-center text-white/70">
                        <Network size={16} className="text-[#10B981] mr-3" />
                        <span className="text-white">Private VPC Router</span>
                        <span className="mx-auto border-b border-white/20 border-dashed flex-grow relative top-[-4px] ml-4 mr-4" />
                        <span className="text-[#10B981]">ACTIVE</span>
                      </div>
                      <div className="flex items-center text-white/70">
                        <Cpu size={16} className="text-[#FF6B00] mr-3" />
                        <span className="text-white">Local Inference Engine</span>
                        <span className="mx-auto border-b border-white/20 border-dashed flex-grow relative top-[-4px] ml-4 mr-4" />
                        <span className="text-[#10B981]">DEDICATED</span>
                      </div>
                    </div>

                    <div className="mt-12 bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-sm">
                      <div className="text-white/50 text-xs tracking-widest uppercase mb-1">Corporate Memory Integrity</div>
                      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mt-2">
                        <div className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#FF6B00] w-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Value Proposition Grid */}
          <section>
            <div className="text-center mb-16">
              <span className="px-4 py-1.5 rounded-full bg-black/5 border border-black/10 text-xs font-bold tracking-widest uppercase mb-6 inline-block text-[#1a1a1a]">02 // Core Architecture</span>
              <h2 className="text-4xl font-black text-[#1a1a1a]">Built for the Enterprise</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-10 rounded-[2rem] border border-black/5 shadow-sm hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition-all">
                <div className="w-14 h-14 bg-[#1a1a1a] rounded-2xl flex items-center justify-center text-white mb-6">
                  <Fingerprint size={28} />
                </div>
                <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4">Identity-Aware Retrieval</h3>
                <p className="text-[#6b7280] font-medium leading-relaxed">
                  Our LLMs natively respect your existing Role-Based Access Control (RBAC). The AI will only synthesize answers using documents and data the querying user actually has permission to see.
                </p>
              </div>

              <div className="bg-white p-10 rounded-[2rem] border border-black/5 shadow-sm hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition-all">
                <div className="w-14 h-14 bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 rounded-2xl flex items-center justify-center text-[#8B5CF6] mb-6">
                  <SearchCode size={28} />
                </div>
                <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4">Deterministic Output</h3>
                <p className="text-[#6b7280] font-medium leading-relaxed">
                  We eliminate hallucinations in critical environments. Every generated insight, summary, or predictive alert comes with explicit citations linking back to the exact source document in your database.
                </p>
              </div>

              <div className="bg-white p-10 rounded-[2rem] border border-black/5 shadow-sm hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition-all">
                <div className="w-14 h-14 bg-[#FF6B00]/10 border border-[#FF6B00]/20 rounded-2xl flex items-center justify-center text-[#FF6B00] mb-6">
                  <Globe size={28} />
                </div>
                <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4">Any Cloud, Any Metal</h3>
                <p className="text-[#6b7280] font-medium leading-relaxed">
                  Deploy where you live. Our architecture runs seamlessly inside your existing AWS VPC, Azure tenant, or on bare-metal servers for environments requiring hyper-secure, air-gapped isolation.
                </p>
              </div>

              <div className="bg-white p-10 rounded-[2rem] border border-black/5 shadow-sm hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition-all">
                <div className="w-14 h-14 bg-[#10B981]/10 border border-[#10B981]/20 rounded-2xl flex items-center justify-center text-[#10B981] mb-6">
                  <Banknote size={28} />
                </div>
                <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4">Deflationary Scaling</h3>
                <p className="text-[#6b7280] font-medium leading-relaxed">
                  Paying per-token to external API providers creates an artificial tax on enterprise scaling. By owning the model, your inference cost drops deterministically, allowing unbounded queries without budget fears.
                </p>
              </div>
            </div>
          </section>

          {/* Global Footprint Section */}
          <section className="bg-[#1a1a1a] rounded-[2.5rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl">
            {/* Background Map Graphic (Conceptual) */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#8B5CF6]/10 to-transparent rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl" />

            <div className="grid md:grid-cols-2 gap-16 relative z-10 items-center">
              <div>
                <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold tracking-widest text-[#8B5CF6] uppercase mb-6 inline-block">03 // Global Footprint</span>
                <h2 className="text-4xl font-black mb-8 leading-tight">Operating Where <br /><span className="text-[#FF6B00]">Complexity Lives</span></h2>
                <p className="text-gray-400 text-lg leading-relaxed font-medium mb-10">
                  We don't build software for startups. Marapone models are deployed in the supply chain nerve centers, port compliance desks, and heavy construction war rooms of the Global 2000.
                </p>
                <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                  <div>
                    <div className="text-3xl font-black text-white mb-1">11+</div>
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-wide">Data Centers Secured</div>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-white mb-1">2.4B</div>
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-wide">Parameters Fine-Tuned</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
                  <div className="w-10 h-10 rounded-full bg-[#10B981]/20 flex items-center justify-center text-[#10B981] mb-4">
                    <Shield size={20} />
                  </div>
                  <h4 className="font-bold text-white mb-2">Defense/Aero</h4>
                  <p className="text-sm text-gray-400">Air-gapped models for ITAR-compliant schematics generation.</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm mt-0 sm:mt-8">
                  <div className="w-10 h-10 rounded-full bg-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6] mb-4">
                    <Globe size={20} />
                  </div>
                  <h4 className="font-bold text-white mb-2">Maritime Logistics</h4>
                  <p className="text-sm text-gray-400">Edge inference on cargo vessels lacking satellite uplink.</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
                  <div className="w-10 h-10 rounded-full bg-[#FF6B00]/20 flex items-center justify-center text-[#FF6B00] mb-4">
                    <Network size={20} />
                  </div>
                  <h4 className="font-bold text-white mb-2">Grid Infrastructure</h4>
                  <p className="text-sm text-gray-400">Sub-second anomalous readings routing via private networks.</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm mt-0 sm:mt-8">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white mb-4">
                    <Lock size={20} />
                  </div>
                  <h4 className="font-bold text-white mb-2">Finance</h4>
                  <p className="text-sm text-gray-400">On-premise contract vectorization for merger negotiations.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Philosophy Section */}
          <section className="text-center max-w-4xl mx-auto">
            <span className="px-4 py-1.5 rounded-full bg-black/5 border border-black/10 text-xs font-bold tracking-widest uppercase mb-6 inline-block text-[#1a1a1a]">04 // Engineering Ethos</span>
            <h2 className="text-4xl font-black text-[#1a1a1a] mb-8">Move Methodically. <br />Break Nothing.</h2>
            <p className="text-xl text-[#4b5563] leading-relaxed font-medium mb-12">
              The mantra of "move fast and break things" has no place in enterprise architecture. Our deployment cycles are rigorous, math-driven, and hyper-cautious. We do not gamble with corporate intelligence.
            </p>
            <div className="inline-flex items-center gap-6 px-8 py-4 bg-white border border-black/5 rounded-2xl shadow-sm">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#1a1a1a] border-2 border-white" />
                <div className="w-10 h-10 rounded-full bg-[#8B5CF6] border-2 border-white" />
                <div className="w-10 h-10 rounded-full bg-[#FF6B00] border-2 border-white" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-[#1a1a1a]">Architected by experts</div>
                <div className="text-xs text-[#6b7280]">from Deepmind, Palantir, and AWS</div>
              </div>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}

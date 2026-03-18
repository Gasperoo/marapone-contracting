import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Globe, Shield, Cpu, Lock, Network, SearchCode, Fingerprint, Banknote, HardHat, Briefcase, ShoppingCart, Plane, Users, Handshake, Award, HeartHandshake } from 'lucide-react';
import RuixenAbout from '../components/RuixenAbout';

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
    <div className="min-h-screen relative overflow-hidden text-white" style={{ backgroundColor: '#0a0e1a' }} ref={containerRef}>

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
            className="inline-flex items-center justify-center p-4 rounded-full bg-white/5 border border-white/10 mb-8 w-24 h-24 shadow-xl relative backdrop-blur-md"
          >
            <Shield size={40} className="text-white relative z-10" />
            <div className="absolute inset-0 blur-2xl opacity-20 bg-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-8xl font-black tracking-tight text-white mb-8 leading-[1.05]"
          >
            We Are <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#FF6B00]">Marapone</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 font-medium leading-relaxed max-w-3xl mx-auto"
          >
            Marapone is a solo-led AI consultancy built for the industrial sectors that keep Canada moving. I build private, secure AI tools for construction GCs and logistics operators who are tired of manual delays and expensive oversight.
          </motion.p>
        </motion.div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 bg-[#0a0e1a] border-t border-white/5">

        {/* By the Numbers */}
        <div className="border-b border-white/5 bg-white/5 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-xs font-bold tracking-widest text-[#8B5CF6] uppercase">Enterprise Scale</span>
              <h2 className="text-3xl font-bold text-white mt-3">Uncompromising Performance</h2>
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
                  className="text-center p-8 rounded-3xl border border-white/10 bg-white/5 shadow-sm hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="text-4xl md:text-5xl font-black text-white mb-2 group-hover:text-[#FF6B00] transition-colors">{stat.value}</div>
                  <div className="text-sm font-bold text-gray-400 tracking-wide uppercase">{stat.label}</div>
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
                <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
                  Stop Leasing. Start Owning.
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed mb-6 font-medium">
                  The SaaS era taught enterprises to rent their tools and outsource their data. In the age of AI, this model is fundamentally broken. Sending your proprietary supply chain data, blueprints, financial burns, and strategic communications to public API endpoints is a critical security failure.
                </p>
                <p className="text-lg text-[#4b5563] leading-relaxed font-medium">
                  I started Marapone because I saw how traditional industries were being left behind by "SaaS" AI that doesn't respect operational reality. You shouldn't have to send your blueprints or shipping manifests to a public cloud just to get a report done. I build sovereign intelligence that stays on your servers.
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
              <div className="bg-white/5 p-10 rounded-[2rem] border border-white/10 shadow-sm hover:border-white/20 transition-all">
                <div className="w-14 h-14 bg-[#FF6B00]/20 rounded-2xl flex items-center justify-center text-[#FF6B00] mb-6">
                  <Fingerprint size={28} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Ownership of Results</h3>
                <p className="text-gray-400 font-medium leading-relaxed">
                  You don't lease your excavators or your trucks by the minute—you shouldn't lease your AI either. Once I build your tool, you own the code and the prompts. No per-seat tax, no subscription gatekeepers.
                </p>
              </div>

              <div className="bg-white/5 p-10 rounded-[2rem] border border-white/10 shadow-sm hover:border-white/20 transition-all">
                <div className="w-14 h-14 bg-[#0EA5E9]/20 rounded-2xl flex items-center justify-center text-[#0EA5E9] mb-6">
                  <SearchCode size={28} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">No Hallucinations</h3>
                <p className="text-gray-400 font-medium leading-relaxed">
                  In construction and logistics, "close enough" isn't good enough. My tools use Retrieval-Augmented Generation (RAG) to ensure every answer is backed by your actual documents, with clear links to the source file.
                </p>
              </div>

              <div className="bg-white/5 p-10 rounded-[2rem] border border-white/10 shadow-sm hover:border-white/20 transition-all">
                <div className="w-14 h-14 bg-[#8B5CF6]/20 rounded-2xl flex items-center justify-center text-[#8B5CF6] mb-6">
                  <Globe size={28} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Private Deployment</h3>
                <p className="text-gray-400 font-medium leading-relaxed">
                  Your sensitive data never leaves your environment. Whether on-premise or a secure private VPC, your blueprints, contracts, and financial burns stay completely under your control.
                </p>
              </div>

              <div className="bg-white/5 p-10 rounded-[2rem] border border-white/10 shadow-sm hover:border-white/20 transition-all">
                <div className="w-14 h-14 bg-[#10B981]/20 rounded-2xl flex items-center justify-center text-[#10B981] mb-6">
                  <Banknote size={28} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Fixed-Price Value</h3>
                <p className="text-gray-400 font-medium leading-relaxed">
                  Every engagement is a scoped project with a one-time fee. I partner with you to solve a specific problem, handover the results, and leave you with a permanent asset that saves you money daily.
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
                  <div className="w-10 h-10 rounded-full bg-[#FF6B00]/20 flex items-center justify-center text-[#FF6B00] mb-4">
                    <HardHat size={20} />
                  </div>
                  <h4 className="font-bold text-white mb-2">Construction</h4>
                  <p className="text-sm text-gray-400">Automated blueprint auditing, daily log analysis, and cost risk detection.</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm mt-0 sm:mt-8">
                  <div className="w-10 h-10 rounded-full bg-[#0EA5E9]/20 flex items-center justify-center text-[#0EA5E9] mb-4">
                    <Truck size={20} />
                  </div>
                  <h4 className="font-bold text-white mb-2">Logistics</h4>
                  <p className="text-sm text-gray-400">Shipment delay prediction, customs doc automation, and routing optimization.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Why Work With Marapone */}
          <section>
            <div className="text-center mb-16">
              <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-widest uppercase mb-6 inline-block text-white">Our Commitment</span>
              <h2 className="text-4xl font-black text-white mt-3">Why Work With Marapone</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto mt-4 leading-relaxed font-medium">
                We're not just a technology vendor — we're a strategic partner invested in your long-term success.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: <Users size={28} />, title: 'Dedicated Teams', desc: 'Every client gets an assigned project team with a direct communication channel — no support tickets, no chatbots.', color: '#FF6B00' },
                { icon: <Award size={28} />, title: 'Transparent Pricing', desc: 'No hidden fees, no surprise invoices. Our fixed-scope engagements mean you know exactly what you\'re paying for upfront.', color: '#8B5CF6' },
                { icon: <Shield size={28} />, title: 'On-Time Delivery', desc: 'We commit to milestones and deliver. Our structured engagement process ensures projects stay on track and on budget.', color: '#10B981' },
                { icon: <HeartHandshake size={28} />, title: 'Post-Launch Support', desc: 'Our partnership doesn\'t end at deployment. We provide full training, documentation, and ongoing technical support.', color: '#0EA5E9' },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="bg-white/5 p-8 rounded-3xl border border-white/10 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 group">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform" style={{ backgroundColor: `${item.color}10`, color: item.color }}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed font-medium">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>
          <section className="text-center max-w-4xl mx-auto">
            <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-widest uppercase mb-6 inline-block text-white">04 // Vision</span>
            <h2 className="text-4xl font-black text-white mb-8">Empowering The <br />Builders of Canada</h2>
            <p className="text-xl text-gray-300 leading-relaxed font-medium mb-12 max-w-3xl mx-auto">
              I bridge the gap between complex AI and the industrial sectors that keep the country running. No hype, just high-ROI tools that solve real operational friction.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
              <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10 shadow-xl flex flex-col items-center justify-center min-w-[250px] transition-transform hover:-translate-y-2">
                <img src="/logo.png" alt="Marapone Logo" className="h-[75px] w-auto mb-4 object-contain opacity-90 hover:opacity-100 transition-opacity" />
                <div className="text-sm font-bold text-white uppercase tracking-widest">Industrial AI Platform</div>
              </div>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}

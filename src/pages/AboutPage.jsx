import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { Shield, Cpu, Lock, Network, Search, Fingerprint, Banknote, HardHat, Truck, Link as LinkIcon, Users, Award, HeartHandshake, ArrowRight } from 'lucide-react';
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
            Industrial <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#F59E0B]">Intelligence</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 font-medium leading-relaxed max-w-3xl mx-auto"
          >
            Marapone is a AI consultancy built for the sectors that keep Canada moving. Marapone bridges the gap between complex data and operational reality.
          </motion.p>
        </motion.div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 bg-[#0a0e1a] border-t border-white/5">

        {/* The Model Section */}
        <div className="max-w-7xl mx-auto px-6 py-32 space-y-40">

          <section>
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-xs font-bold tracking-widest text-[#FF6B00] uppercase block mb-4">01 // The Model</span>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
                  No Monthly Fees. <br />No Data Ransom.
                </h2>
                <div className="space-y-6 text-gray-300 text-lg leading-relaxed font-medium">
                  <p>
                    Marapone was founded to fix what's broken in the AI industry. Most vendors want to sell you a subscription and trap your data on their servers.
                  </p>
                  <p>
                    Marapone doesn't do that. Marapone builds custom, private AI engines that you own. Once the project is done, Marapone hands over the keys. No seat taxes, no forced updates, and no vendor lock-in.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6B00]/10 rounded-bl-full" />
                <h3 className="text-2xl font-bold mb-6">Built for Sovereignty</h3>
                <div className="space-y-4">
                  {[
                    { icon: <Lock size={18} className="text-[#FF6B00]" />, text: "Private Deployment (VPC or On-Prem)" },
                    { icon: <Cpu size={18} className="text-[#FF6B00]" />, text: "Isolated Model Fine-Tuning" },
                    { icon: <Fingerprint size={18} className="text-[#FF6B00]" />, text: "100% Data Confidentiality" },
                    { icon: <LinkIcon size={18} className="text-[#FF6B00]" />, text: "Seamless ERP/Legacy Integration" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 text-gray-300">
                      {item.icon}
                      <span className="font-bold">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Core Values / Why Marapone */}
          <section>
            <div className="text-center mb-16">
              <span className="text-xs font-bold tracking-widest text-[#FF6B00] uppercase block mb-4">02 // The Approach</span>
              <h2 className="text-4xl font-black text-white">Why Marapone</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: <Users size={28} />, title: "One-on-One", desc: "You work directly with Marapone. No junior account managers. No support tickets.", color: "#FF6B00" },
                { icon: <Banknote size={28} />, title: "Fixed Price", desc: "You know the cost upfront. No surprise invoices or scope creep bills.", color: "#8B5CF6" },
                { icon: <Award size={28} />, title: "Industrial Focus", desc: "Marapone knows construction and logistics. Marapone speaks the language of ops.", color: "#10B981" },
                { icon: <HeartHandshake size={28} />, title: "Full Handover", desc: "Proprietary code and weights are yours forever at completion.", color: "#0EA5E9" },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 p-8 rounded-3xl border border-white/10 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 group">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform" style={{ backgroundColor: `${item.color}10`, color: item.color }}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* RuixenAbout Integration (Refined) */}
          <RuixenAbout />

          <section className="text-center pb-32">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8">Empowering The Builders.</h2>
            <p className="text-xl text-gray-400 leading-relaxed mb-12 max-w-3xl mx-auto">
              Marapone focuses on the foundational sectors that keep Canada running. No hype, just high-ROI results for the companies that move our cargo and build our infrastructure.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-10 py-5 bg-[#FF6B00] hover:bg-[#ea580c] text-white rounded-xl font-bold text-xl transition-all shadow-xl shadow-[#FF6B00]/20"
            >
              Start Your Evaluation <ArrowRight size={20} />
            </Link>
          </section>

        </div>
      </div>
    </div>
  );
}

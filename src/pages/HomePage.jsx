import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  HardHat, Truck, ArrowRight, ShieldCheck, Lock,
  Globe, BarChart3, FileText, ClipboardCheck,
  TrendingUp, Package, Layers, PhoneCall, Code, CheckCircle2,
  Zap, Brain, Sparkles, Cpu
} from 'lucide-react';

export default function HomePage() {
  const isMobile = typeof window !== 'undefined' && (
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
    window.innerWidth <= 768
  );

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white font-sans selection:bg-[#FF6B00]/30">

      {/* ═══════════════════════ HERO SECTION ═══════════════════════ */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-[#1a1a1a] to-transparent pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
          >
            <span className="text-[10px] font-black tracking-[0.2em] text-[#FF6B00] uppercase">Canadian Operations AI Consulting</span>
          </motion.div>

          {/* Pulsing Logo */}
          <motion.div
            className="flex justify-center mb-10 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
          >
            {/* Background Glow Pulse */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 bg-[#FF6B00]/30 rounded-full blur-[80px]"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Logo Image */}
            <motion.img
              src="/MaraponeLogo-1.png"
              alt="Marapone Logo"
              className="w-56 md:w-72 lg:w-[22rem] relative z-10 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              animate={{
                scale: [1, 1.03, 1],
              }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[1.1]"
          >
            Stop Renting Your AI.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#F59E0B]">
              Own The Engine.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12"
          >
            Marapone builds custom, private AI systems for construction GCs and logistics operators who are tired of manual delays, expensive oversight, and vendor lock-in. One-time project fee. Full code ownership. No subscriptions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link
              to="/contact"
              className="px-8 py-4 bg-[#FF6B00] hover:bg-[#ea580c] text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-[#FF6B00]/20 flex items-center justify-center gap-2"
            >
              Book a Free Discovery Call <ArrowRight size={20} />
            </Link>
            <Link
              to="/industries"
              className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/20 rounded-xl font-bold text-lg transition-all backdrop-blur-md"
            >
              See What Marapone Builds
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ THE PROBLEM (NO-BS) ═══════════════════════ */}
      <section className="py-24 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black mb-8 leading-tight">
                Stop Dealing With <span className="text-[#FF6B00]">Manual Oversight</span> And Delayed Data.
              </h2>
              <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                <p>
                  Generic AI tools are built for office work, not for construction sites or port terminals. Marapone fixes the gap between your operational reality and the data you need to make decisions.
                </p>
                <div className="flex gap-4 p-6 bg-black/30 rounded-2xl border border-white/10 border-l-[#FF6B00] border-l-4">
                  <p className="italic font-medium text-gray-300">
                    "Marapone builds tools that take your messy blueprints, shipping manifests, and financial burns, and turn them into an engine you own forever."
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "GC Operations", desc: "Automate blueprint auditing and daily log synthesis to catch rework before it starts." },
                { title: "Logistics Flow", desc: "Predict port bottlenecks and automate customs documentation using real-time AIS data." },
                { title: "Cost Control", desc: "AI-powered burn tracking that flags budget leaks in your ERP before payday." },
                { title: "Full Ownership", desc: "Your code. Your weights. No monthly subscriptions or vendor lock-in." }
              ].map((item, i) => (
                <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                  <h4 className="font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ TECH STACK (MODELS) ═══════════════════════ */}
      <section className="py-24 px-6 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Built on the Best.</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Marapone leverages world-class APIs and secure integrations to build your private engine.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Brain />, name: "Claude (Anthropic)", desc: "Advanced reasoning for complex contract review and blueprint analysis." },
              { icon: <Zap />, name: "Super Grok (xAI)", desc: "Real-time processing for volatile supply chain and port logistics data." },
              { icon: <Sparkles />, name: "Gemini (Google)", desc: "Multi-modal intelligence for cross-referencing site logs and drone scans." }
            ].map((tech, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 text-center">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-6 text-[#FF6B00]">
                  {tech.icon}
                </div>
                <h4 className="font-bold text-white mb-2">{tech.name}</h4>
                <p className="text-sm text-gray-400 leading-relaxed">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ TARGET SECTORS ═══════════════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Construction */}
            <motion.div
              whileHover={{ y: -5 }}
              className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-[#FF6B00]/30 transition-all flex flex-col h-full"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#FF6B00]/10 flex items-center justify-center text-[#FF6B00] mb-8">
                <HardHat size={32} />
              </div>
              <h3 className="text-3xl font-black mb-4">Construction GCs</h3>
              <p className="text-gray-400 text-lg mb-8 flex-grow">
                Manage mega-projects ($100k - $50M) without the manual coordination headaches.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  "Blueprint & RFI Automated Auditing",
                  "Daily Site Log Synthesis",
                  "Predictive Cash Flow Intelligence",
                  "Subcontractor Performance Tracking"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 size={18} className="text-[#FF6B00]" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="w-full py-4 text-center border border-[#FF6B00]/30 text-[#FF6B00] rounded-xl font-bold hover:bg-[#FF6B00] hover:text-white transition-all">
                Book Construction Discovery
              </Link>
            </motion.div>

            {/* Logistics */}
            <motion.div
              whileHover={{ y: -5 }}
              className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-[#0EA5E9]/30 transition-all flex flex-col h-full"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#0EA5E9]/10 flex items-center justify-center text-[#0EA5E9] mb-8">
                <Truck size={32} />
              </div>
              <h3 className="text-3xl font-black mb-4">Logistics & 3PLs</h3>
              <p className="text-gray-400 text-lg mb-8 flex-grow">
                Automate your customs desk and predict port delays before they hit your margin.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  "Customs Doc Automation",
                  "Real-time Port Delay Prediction",
                  "Dynamic Route & Inventory Forecasting",
                  "Unstructured Document Processing"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 size={18} className="text-[#0EA5E9]" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="w-full py-4 text-center border border-[#0EA5E9]/30 text-[#0EA5E9] rounded-xl font-bold hover:bg-[#0EA5E9] hover:text-white transition-all">
                Book Logistics Discovery
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ MARAPONE DIFFERENCE ═══════════════════════ */}
      <section className="py-24 px-6 bg-[#0c1221] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            <div>
              <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter text-[#FF6B00]">One-Time Fee.</h2>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-8">Permanent Assets.</p>
              <p className="text-gray-400 leading-relaxed">
                Marapone doesn't sell subscriptions. Marapone builds custom competitive moats that you own forever.
              </p>
            </div>

            <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">
              {[
                { icon: <Lock />, title: "Data Sovereignty", desc: "Private deployments on your own servers. Your sensitive data never leaves your control." },
                { icon: <TrendingUp />, title: "No Subscription Tax", desc: "Pay for the build, own the results. No per-seat licenses or monthly drain on your budget." },
                { icon: <Code />, title: "Full Handover", desc: "You receive the source code and model weights. It is your intellectual property from day one." },
                { icon: <ShieldCheck />, title: "SOC2 Aware", desc: "Built with enterprise-grade security practices for high-stakes operational data." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF6B00]">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ CTA FOOTER ═══════════════════════ */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#FF6B00]/5 blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
            Fix Your Ops. <br />
            <span className="text-[#FF6B00]">Own Your AI.</span>
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Let's cut through the noise. Book a 15-30 minute discovery call to see if your data is ready for a private engine.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/contact"
              className="px-10 py-5 bg-[#FF6B00] hover:bg-[#ea580c] text-white rounded-xl font-bold text-xl transition-all shadow-xl shadow-[#FF6B00]/20"
            >
              Book My Discovery Call
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

import React from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Ship, HardHat, ArrowRight, Zap, Database, Brain, Lock,
  ShieldCheck, Building2, Globe, BarChart3, FileText,
  Cpu, Network, CheckCircle2, Sparkles, ClipboardCheck
} from 'lucide-react';
import Particles from '../components/Particles/Particles';
import { getOptimizedSettings } from '../utils/detectWindows';

export default function HomePage() {
  const navigate = useNavigate();

  const isMobile = typeof window !== 'undefined' && (
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
    window.innerWidth <= 768
  );

  return (
    <div className="min-h-screen bg-[#F5F5F5] overflow-hidden text-[#1a1a1a] font-sans">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
        <Particles
          particleColors={['#FF6B00', '#F59E0B', '#1a1a1a']}
          particleCount={isMobile ? 80 : 200}
          particleSpread={20}
          speed={0.06}
          particleBaseSize={80}
          moveParticlesOnHover={true}
          alphaParticles={true}
          sizeRandomness={1.5}
          cameraDistance={25}
        />
      </div>

      <div className="relative z-10">

        {/* ═══════════════════════ HERO SECTION ═══════════════════════ */}
        <section className="pt-40 pb-24 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
          {/* Logo Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-black/10 bg-white/70 backdrop-blur-md mb-10 shadow-sm"
          >
            <img src="/logo.png" alt="Marapone" className="h-6 w-auto" />
            <span className="text-xs font-bold tracking-widest text-[#FF6B00] uppercase">Enterprise AI Solutions</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black text-[#1a1a1a] tracking-tight mb-8 leading-[1.05]"
          >
            Turning{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#F59E0B]">CHAOS</span>
            <br />into{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9]">CLARITY</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-xl md:text-2xl text-[#4b5563] max-w-3xl mx-auto leading-relaxed mb-12 font-medium"
          >
            We build custom AI systems that simplify the most complex operations in construction, logistics, and heavy industry — so your team can make better decisions, faster.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Link to="/features" className="px-8 py-4 bg-[#FF6B00] hover:bg-[#ea580c] text-white rounded-xl font-bold text-lg shadow-[0_10px_30px_rgba(255,107,0,0.3)] hover:-translate-y-1 transition-all flex items-center justify-center group">
              Explore Platform <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/contact" className="px-8 py-4 bg-white border border-black/10 hover:bg-black/5 text-[#1a1a1a] rounded-xl font-bold text-lg shadow-sm transition-all flex items-center justify-center">
              Get in Touch
            </Link>
          </motion.div>
        </section>

        {/* ═══════════════════════ TRUST BAR ═══════════════════════ */}
        <section className="py-8 px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 py-6 px-8 rounded-2xl bg-white/60 backdrop-blur-md border border-black/5 shadow-sm"
          >
            <div className="flex items-center gap-2 text-sm font-bold text-[#4b5563]">
              <ShieldCheck size={18} className="text-[#10B981]" /> SOC2 Compliant
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-[#4b5563]">
              <Lock size={18} className="text-[#8B5CF6]" /> End-to-End Encryption
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-[#4b5563]">
              <Globe size={18} className="text-[#0EA5E9]" /> International Operations
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-[#4b5563]">
              <Cpu size={18} className="text-[#FF6B00]" /> Custom AI Models
            </div>
          </motion.div>
        </section>

        {/* ═══════════════════════ WHAT WE DO (SIMPLE) ═══════════════════════ */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm font-bold tracking-widest text-[#FF6B00] uppercase mb-4 block"
            >
              What We Do
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-[#1a1a1a] tracking-tight"
            >
              AI That Actually <span className="text-[#FF6B00]">Works</span> For You
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-lg text-[#6b7280] max-w-2xl mx-auto mt-4 leading-relaxed"
            >
              No buzzwords. No fluff. We take your messy data and turn it into clear, actionable intelligence that helps you save time, cut costs, and avoid expensive mistakes.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <FileText />, title: "Smart Document Reading", desc: "Upload contracts, blueprints, invoices — our AI reads and understands them in seconds, pulling out the key information you need.", color: "#8B5CF6" },
              { icon: <BarChart3 />, title: "Predict Problems Early", desc: "See delays, budget overruns, and supply issues before they happen. Our AI analyzes patterns in your data to warn you ahead of time.", color: "#FF6B00" },
              { icon: <ClipboardCheck />, title: "Automate the Boring Stuff", desc: "Compliance reports, material orders, daily logs — let AI handle the repetitive work so your team focuses on what matters.", color: "#10B981" },
              { icon: <Network />, title: "Connect Everything", desc: "Your tools, spreadsheets, and systems all in one place. Our AI bridges the gaps between departments so nothing falls through the cracks.", color: "#0EA5E9" },
              { icon: <ShieldCheck />, title: "Your Data Stays Yours", desc: "We build private AI models that live inside your own systems. Your sensitive business data never leaves your control.", color: "#6D28D9" },
              { icon: <Building2 />, title: "Better Project Management", desc: "For construction teams: smarter scheduling, accurate cost estimates, real-time site monitoring, and blueprint analysis powered by AI.", color: "#F59E0B" },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group p-8 rounded-3xl bg-white border border-black/5 hover:border-transparent hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full -z-0 transition-transform duration-500 group-hover:scale-125 opacity-10" style={{ backgroundColor: f.color }} />
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 relative z-10 shadow-sm" style={{ backgroundColor: `${f.color}12`, color: f.color, border: `1px solid ${f.color}25` }}>
                  {f.icon}
                </div>
                <h4 className="text-xl font-bold text-[#1a1a1a] mb-3 relative z-10">{f.title}</h4>
                <p className="text-[#6b7280] leading-relaxed relative z-10">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════ DOMAINS SECTION ═══════════════════════ */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-bold tracking-widest text-[#8B5CF6] uppercase mb-4 block">Our Platforms</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#1a1a1a] tracking-tight">Two Industries. <span className="text-[#8B5CF6]">One Intelligence.</span></h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Logistics Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="uiverse-neo-card group relative p-10 rounded-3xl bg-white/80 backdrop-blur-xl border border-black/5 overflow-hidden shadow-xl cursor-pointer hover:-translate-y-1 transition-all duration-300"
              onClick={() => navigate('/gasper')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#0EA5E9]/5 to-transparent pointer-events-none" />
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-16 h-16 rounded-2xl bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 flex items-center justify-center mb-8 shadow-sm">
                  <Ship className="text-[#0EA5E9] w-8 h-8" />
                </div>
                <h2 className="text-3xl font-black text-[#1a1a1a] mb-4">Logistics <span className="text-[#0EA5E9]">OS</span></h2>
                <p className="text-[#4b5563] text-lg leading-relaxed mb-6 flex-grow">
                  Track shipments in real time, predict port delays, and automate customs paperwork. Our AI watches global trade routes so you don't have to.
                </p>
                <ul className="space-y-2 mb-8 text-sm text-[#6b7280]">
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#0EA5E9]" /> Real-time shipment tracking</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#0EA5E9]" /> Automated customs compliance</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#0EA5E9]" /> Geopolitical risk alerts</li>
                </ul>
                <div className="flex items-center text-[#0EA5E9] font-bold text-lg group-hover:text-[#38BDF8] transition-colors">
                  Launch Command Center <ArrowRight size={20} className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </motion.div>

            {/* Construction Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="uiverse-neo-card group relative p-10 rounded-3xl bg-white/80 backdrop-blur-xl border border-black/5 overflow-hidden shadow-xl cursor-pointer hover:-translate-y-1 transition-all duration-300"
              onClick={() => navigate('/gasper/construction')}
            >
              <div className="absolute inset-0 bg-gradient-to-bl from-[#FF6B00]/5 to-transparent pointer-events-none" />
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-16 h-16 rounded-2xl bg-[#FF6B00]/10 border border-[#FF6B00]/20 flex items-center justify-center mb-8 shadow-sm">
                  <HardHat className="text-[#F59E0B] w-8 h-8" />
                </div>
                <h2 className="text-3xl font-black text-[#1a1a1a] mb-4">Construction <span className="text-[#FF6B00]">AI</span></h2>
                <p className="text-[#4b5563] text-lg leading-relaxed mb-6 flex-grow">
                  Read blueprints instantly, predict project delays, and manage costs in real time. AI-powered project management that keeps builds on time and on budget.
                </p>
                <ul className="space-y-2 mb-8 text-sm text-[#6b7280]">
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#FF6B00]" /> AI blueprint analysis & takeoffs</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#FF6B00]" /> Predictive schedule optimization</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#FF6B00]" /> Real-time cost tracking</li>
                </ul>
                <div className="flex items-center text-[#FF6B00] font-bold text-lg group-hover:text-[#F59E0B] transition-colors">
                  Launch Command Center <ArrowRight size={20} className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════ POWERED BY SECTION ═══════════════════════ */}
        <section className="py-24 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="bg-[#1a1a1a] rounded-[2.5rem] p-12 md:p-20 relative overflow-hidden shadow-2xl">
              {/* Background effects */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#8B5CF6]/15 to-transparent rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#FF6B00]/10 to-transparent rounded-full -translate-x-1/3 translate-y-1/3 blur-3xl" />

              <div className="relative z-10">
                <div className="text-center mb-16">
                  <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
                    <Sparkles size={16} className="text-[#F59E0B]" />
                    <span className="text-sm font-bold tracking-widest text-white/80 uppercase">Powered by World-Class AI</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
                    Built on the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#FF6B00]">Best Foundations</span>
                  </h2>
                  <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                    GasperAI combines the world's most advanced AI models to deliver unmatched accuracy, speed, and reliability for your industry.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {/* Claude */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:bg-white/10 transition-all group"
                  >
                    <div className="w-14 h-14 rounded-xl bg-[#D97706]/10 border border-[#D97706]/20 flex items-center justify-center mb-6">
                      <Brain size={28} className="text-[#D97706]" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Claude</h3>
                    <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-3">by Anthropic</p>
                    <p className="text-gray-400 leading-relaxed">Advanced reasoning and analysis for complex document understanding, contract review, and strategic decision-making.</p>
                  </motion.div>

                  {/* Super Grok */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:bg-white/10 transition-all group"
                  >
                    <div className="w-14 h-14 rounded-xl bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center mb-6">
                      <Zap size={28} className="text-[#3B82F6]" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Super Grok</h3>
                    <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-3">by xAI</p>
                    <p className="text-gray-400 leading-relaxed">Real-time data processing and pattern recognition for live market conditions, supply chain disruptions, and risk assessment.</p>
                  </motion.div>

                  {/* Gemini */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:bg-white/10 transition-all group"
                  >
                    <div className="w-14 h-14 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center mb-6">
                      <Sparkles size={28} className="text-[#10B981]" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Gemini</h3>
                    <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-3">by Google</p>
                    <p className="text-gray-400 leading-relaxed">Multi-modal intelligence for blueprint analysis, image recognition, and cross-referencing data from multiple sources simultaneously.</p>
                  </motion.div>
                </div>

                <div className="text-center mt-12">
                  <Link to="/custom-llm" className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-xl font-bold transition-all backdrop-blur-md group">
                    Learn About GasperAI <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════ CORE TECH SECTION ═══════════════════════ */}
        <section className="py-24 px-6 max-w-7xl mx-auto relative border-t border-black/5">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-[#8B5CF6] uppercase mb-4">Core Technology</h2>
            <h3 className="text-4xl font-black text-[#1a1a1a]">Enterprise-Grade Infrastructure</h3>
            <p className="text-lg text-[#6b7280] max-w-2xl mx-auto mt-4 leading-relaxed">
              Everything we build is designed for the highest security and reliability standards your business demands.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <Database />, title: "Unified Data Hub", desc: "We connect all your systems — spreadsheets, accounting tools, project software — into one intelligent platform that sees your whole operation.", color: "text-[#3B82F6]" },
              { icon: <Brain />, title: "Custom AI Engine", desc: "Unlike generic AI tools, our models are trained specifically on your industry and your company's data. It understands your business.", color: "text-[#8B5CF6]" },
              { icon: <ShieldCheck />, title: "Bank-Level Security", desc: "Your data is protected with the same level of security used by banks and government agencies. We're SOC2 Type II compliant.", color: "text-[#10B981]" }
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-white border border-black/5 hover:border-[#8B5CF6]/20 transition-colors shadow-sm hover:shadow-md"
              >
                <div className={`w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-6 shadow-sm border border-black/5 ${f.color}`}>
                  {f.icon}
                </div>
                <h4 className="text-xl font-bold text-[#1a1a1a] mb-3">{f.title}</h4>
                <p className="text-[#6b7280] leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════ GASPER LOGO SECTION ═══════════════════════ */}
        <section className="py-16 px-6 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-4"
          >
            <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-white border border-black/5 shadow-sm">
              <img src="/images/gasper-logo-g.png" alt="Gasper" className="h-10 w-auto" />
              <div className="h-8 w-px bg-black/10" />
              <img src="/logo.png" alt="Marapone" className="h-10 w-auto" />
            </div>
            <p className="text-sm text-[#6b7280] font-medium">GasperAI — A Marapone Product</p>
          </motion.div>
        </section>

        {/* ═══════════════════════ CTA FOOTER ═══════════════════════ */}
        <section className="py-32 px-6 relative text-center">
          <div className="absolute inset-0 bg-[#1a1a1a] transform -skew-y-2 -z-10 origin-top-left" />
          <div className="max-w-4xl mx-auto relative z-10 py-12">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Ready to Simplify Your Operations?</h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Join industry leaders using Marapone AI to build faster, ship smarter, and operate with clarity — not chaos.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact" className="px-8 py-4 bg-[#FF6B00] hover:bg-[#ea580c] text-white rounded-xl font-bold text-lg transition-colors shadow-lg shadow-[#FF6B00]/20">
                Get in Touch
              </Link>
              <Link to="/about" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl font-bold text-lg transition-colors backdrop-blur-md">
                Learn About Us
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

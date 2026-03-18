import React from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Ship, HardHat, ArrowRight, Zap, Database, Brain, Lock,
  ShieldCheck, Building2, Globe, BarChart3, FileText,
  Cpu, Network, CheckCircle2, Sparkles, ClipboardCheck,
  Activity, Search, Award, DollarSign, PhoneCall, Code, Plug, Key, Shield, Check,
  Truck, TrendingUp, Package, Layers
} from 'lucide-react';
import Particles from '../components/Particles/Particles';
import { getOptimizedSettings } from '../utils/detectWindows';

export function BusinessIntegrationPanel() {
    const industries = [
        {
            id: 'construction',
            icon: <HardHat size={28} />,
            label: 'Construction',
            desc: 'Automate blueprint analysis & supply chain logistics.',
            color: '#FF6B00',
            bgGlow: 'rgba(255,107,0,0.15)'
        },
        {
            id: 'logistics',
            icon: <Truck size={28} />,
            label: 'Logistics',
            desc: 'Predictive routing and dynamic inventory forecasting.',
            color: '#0EA5E9',
            bgGlow: 'rgba(14,165,233,0.15)'
        },
        {
            id: 'marketing',
            icon: <TrendingUp size={28} />,
            label: 'Marketing',
            desc: 'Generative campaigns with hyper-targeted segmentation.',
            color: '#F59E0B',
            bgGlow: 'rgba(245,158,11,0.15)'
        },
        {
            id: 'ecommerce',
            icon: <Package size={28} />,
            label: 'E-Commerce',
            desc: 'Autonomous pricing agents and customer experience.',
            color: '#8B5CF6',
            bgGlow: 'rgba(139,92,246,0.15)'
        },
    ];

    return (
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} className="w-full max-w-5xl mx-auto my-16 px-6 relative z-10">

            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[120%] bg-gradient-to-r from-[#FF6B00]/10 via-[#8B5CF6]/10 to-[#0EA5E9]/10 blur-[80px] -z-10 pointer-events-none rounded-full" />

            <div className="relative rounded-[2.5rem] bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_30px_60px_rgba(0,0,0,0.08)] overflow-hidden">
                {/* Header section with gradient border base */}
                <div className="px-8 py-8 md:px-12 md:py-10 border-b border-black/[0.04] relative overflow-hidden">
                    <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/90 to-gray-50/50" />

                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="flex items-center gap-5">
                            <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] shadow-[0_8px_20px_rgba(0,0,0,0.2)]">
                                <div className="absolute inset-0 rounded-2xl border border-white/20 p-[1px]">
                                    <div className="w-full h-full rounded-[15px] bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                                </div>
                                <Layers size={28} className="text-[#FF6B00] filter drop-shadow-[0_0_8px_rgba(255,107,0,0.4)]" />
                            </div>
                            <div>
                                <h2 className="text-2xl md:text-3xl font-black text-[#1a1a1a] tracking-tight mb-1">
                                    Enterprise AI Integrations
                                </h2>
                                <p className="text-[15px] text-gray-500 font-medium tracking-wide">
                                    Bespoke autonomous systems across 4 primary sectors
                                </p>
                            </div>
                        </div>
                        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 border border-black/5 shadow-sm backdrop-blur-md self-start md:self-auto">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10b981]"></span>
                            </span>
                            <span className="text-[13px] font-bold text-[#10b981] uppercase tracking-wider">Systems Online</span>
                        </div>
                    </div>
                </div>

                {/* Grid Content */}
                <div className="p-8 md:p-12 relative bg-white/50">
                    <div className="absolute inset-0 bg-grid-slate-100/[0.4] bg-[bottom_1px_center] z-0" />

                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {industries.map((ind, i) => (
                            <Link to={`/industries/${ind.id}`} key={i} className="block w-full h-full">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + i * 0.1, duration: 0.7 }}
                                    className="group relative rounded-[2rem] p-6 lg:p-8 transition-all duration-500 cursor-pointer overflow-hidden z-20 flex flex-col h-full bg-white/95 border border-black/[0.04] shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1"
                                >
                                    {/* Hover background effect */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: `radial-gradient(circle at 100% 100%, ${ind.bgGlow}, transparent 70%)` }} />

                                    <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-12 -translate-y-12 rounded-full opacity-0 blur-[30px] transition-all duration-700 group-hover:opacity-20 group-hover:scale-150" style={{ background: ind.color }} />

                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="flex items-center justify-between mb-8">
                                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-sm border border-white" style={{ background: `${ind.color}15`, color: ind.color, boxShadow: `0 8px 20px ${ind.bgGlow}` }}>
                                                {ind.icon}
                                            </div>
                                            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 border border-black/[0.04] text-gray-400 group-hover:bg-[#1a1a1a] group-hover:text-white group-hover:-rotate-45 transition-all duration-300 shadow-sm">
                                                <ArrowRight size={18} />
                                            </div>
                                        </div>

                                        <h3 className="text-[#1a1a1a] font-extrabold text-xl mb-3 transition-colors duration-300" style={{ '--hover-color': ind.color }} onMouseEnter={e => e.currentTarget.style.color = ind.color} onMouseLeave={e => e.currentTarget.style.color = '#1a1a1a'}>
                                            {ind.label}
                                        </h3>
                                        <p className="text-[15px] font-medium leading-[1.7] text-gray-500 group-hover:text-gray-700 transition-colors">
                                            {ind.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

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

        {/* ═══════════════════════ INTEGRATION SECTION ═══════════════════════ */}
        <BusinessIntegrationPanel />


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

        {/* ═══════════════════════ ENTERPRISE CAPABILITIES ═══════════════════════ */}
        <section className="py-24 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                className="inline-flex items-center px-4 py-1.5 rounded-full border border-black/5 bg-white/80 text-xs font-bold tracking-widest uppercase mb-6 text-[#1a1a1a] shadow-sm">
                <Shield size={12} className="mr-2 text-[#FF6B00]" /> Enterprise Capabilities
              </motion.span>
              <motion.h2 initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="text-4xl md:text-5xl font-black text-[#1a1a1a] tracking-tight">
                Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#F59E0B]">Competitive Moats</span> with AI
              </motion.h2>
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                className="text-lg text-[#6b7280] max-w-2xl mx-auto mt-4 leading-relaxed">
                We don't sell software. We partner with industry leaders to engineer tailored AI solutions that operate as an extension of your existing workforce.
              </motion.p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: <Database size={24} />, title: "Proprietary Data Ingestion", desc: "We build secure data pipelines connecting to your ERPs, CRMs, and archives — transforming unstructured data into structured intelligence.", color: "#FF6B00" },
                { icon: <Lock size={24} />, title: "Sovereign AI Infrastructure", desc: "Enterprise-grade security with options for fully air-gapped or on-premise deployments. Your models, your data, your ownership.", color: "#10B981" },
                { icon: <Cpu size={24} />, title: "Bespoke Model Fine-Tuning", desc: "We architect and train isolated Large Language Models exclusively on your company's operational history and logic.", color: "#8B5CF6" },
                { icon: <Activity size={24} />, title: "Autonomous Workflow Agents", desc: "Deploy specialized AI agents that execute complex multi-day workflows as instant background processes.", color: "#0EA5E9" },
              ].map((f, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="group p-8 rounded-3xl bg-white border border-black/5 hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-black/5 shadow-sm transition-transform group-hover:scale-110" style={{ backgroundColor: `${f.color}10`, color: f.color }}>
                    {f.icon}
                  </div>
                  <h4 className="text-lg font-bold text-[#1a1a1a] mb-3">{f.title}</h4>
                  <p className="text-[#6b7280] leading-relaxed text-sm">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════ WHY PARTNER WITH US ═══════════════════════ */}
        <section className="py-24 px-6 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#FF6B00]/10 bg-[#FF6B00]/5 text-[#FF6B00] text-xs font-bold tracking-widest uppercase mb-6">
              <Award size={14} className="mr-2" /> The Marapone Advantage
            </motion.span>
            <motion.h2 initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-[#1a1a1a] tracking-tight">
              Why Enterprises <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#F59E0B]">Partner With Us</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-lg text-[#6b7280] max-w-2xl mx-auto mt-4 leading-relaxed">
              We don't sell software subscriptions. We build tailored competitive advantages that you own forever.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { value: 'Custom', label: 'One-Time Payment', desc: 'No subscriptions, no per-seat licenses. You own the integration.', icon: <DollarSign size={22} /> },
              { value: '100%', label: 'Data Ownership', desc: 'Deploy on your own servers or private cloud. Your data never leaves.', icon: <Lock size={22} /> },
              { value: 'Zero', label: 'Vendor Lock-in', desc: 'Full source code and model weights handed over at completion.', icon: <Zap size={22} /> },
            ].map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl p-8 text-center border border-black/5 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 group">
                <div className="w-14 h-14 rounded-2xl mx-auto mb-6 flex items-center justify-center bg-[#FF6B00]/5 text-[#FF6B00] border border-black/5 group-hover:scale-110 transition-transform">
                  {m.icon}
                </div>
                <div className="text-4xl font-black text-[#1a1a1a] mb-2">{m.value}</div>
                <div className="text-lg font-bold text-[#1a1a1a] mb-3">{m.label}</div>
                <p className="text-sm text-[#6b7280] leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════ ENGAGEMENT PROCESS ═══════════════════════ */}
        <section className="py-24 px-6 max-w-7xl mx-auto border-t border-black/5">
          <div className="text-center mb-16">
            <motion.h2 initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-[#1a1a1a] tracking-tight">Our Engagement Process</motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-lg text-[#6b7280] max-w-xl mx-auto mt-4 leading-relaxed">
              From initial audit to final deployment, we build tailored AI engines as an extension of your technical team.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { icon: <PhoneCall size={24} />, title: '1. Discovery', desc: 'Deep-dive audit of your workflows and data silos to pinpoint high-ROI AI opportunities.' },
              { icon: <Code size={24} />, title: '2. Custom Build', desc: 'We architect and train isolated models securely on your proprietary data.' },
              { icon: <Plug size={24} />, title: '3. Integration', desc: 'Seamless deployment into your existing tech stack and ERP systems.' },
              { icon: <Key size={24} />, title: '4. Handover', desc: 'You own the final product with zero subscriptions, plus full team onboarding.' },
            ].map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl p-8 text-center border border-black/5 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 group">
                <div className="w-14 h-14 rounded-2xl mx-auto mb-6 flex items-center justify-center bg-[#FF6B00]/5 text-[#FF6B00] border border-black/5 group-hover:scale-110 transition-transform">
                  {b.icon}
                </div>
                <h3 className="text-lg font-bold text-[#1a1a1a] mb-3">{b.title}</h3>
                <p className="text-sm text-[#6b7280] leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-[#1a1a1a] hover:bg-black text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:-translate-y-1 group">
              Start Your Evaluation <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
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

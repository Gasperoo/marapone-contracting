import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { Ship, HardHat, ArrowRight, Activity, Grid, Globe, Zap, Database, Brain, Lock, ShieldCheck, Building2 } from 'lucide-react';
import Particles from '../components/Particles/Particles';
import { getOptimizedSettings } from '../utils/detectWindows';
import FeatureCard from '../components/FeatureCard';

export default function HomePage() {
  const navigate = useNavigate();

  const isMobile = typeof window !== 'undefined' && (
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
    window.innerWidth <= 768
  );

  // Clean, professional theme colors
  const C = {
    primary: '#FF6B00',
    secondary: '#F59E0B',
    bg: '#F5F5F5',
    textPrimary: '#1a1a1a',
    textMuted: '#6b7280',
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] overflow-hidden text-[#1a1a1a] font-sans">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
        <Particles
          particleColors={[C.primary, C.secondary, '#1a1a1a']}
          particleCount={isMobile ? 100 : 250}
          particleSpread={20}
          speed={0.08}
          particleBaseSize={80}
          moveParticlesOnHover={true}
          alphaParticles={true}
          sizeRandomness={1.5}
          cameraDistance={25}
        />
      </div>

      <div className="relative z-10">

        {/* HERO SECTION */}
        <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/10 bg-white/60 backdrop-blur-md mb-8 text-sm font-bold text-[#FF6B00] uppercase tracking-widest shadow-sm"
          >
            <Zap size={14} /> The Operating System for Global Intelligence
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black text-[#1a1a1a] tracking-tight mb-8 leading-[1.1]"
          >
            Intelligence <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#F59E0B]">Engineered.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-[#4b5563] max-w-3xl mx-auto leading-relaxed mb-12"
          >
            Powering the world's most complex supply chains and extreme engineering projects with purpose-built AI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Link to="/features" className="px-8 py-4 bg-[#FF6B00] hover:bg-[#F59E0B] text-white rounded-xl font-bold text-lg shadow-[0_10px_30px_rgba(255,107,0,0.3)] hover:-translate-y-1 transition-all flex items-center justify-center group">
              Explore Platform <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/contact" className="px-8 py-4 bg-white border border-black/10 hover:bg-black/5 text-[#1a1a1a] rounded-xl font-bold text-lg shadow-sm transition-all flex items-center justify-center">
              Request Enterprise Demo
            </Link>
          </motion.div>
        </section>

        {/* DOMAINS SECTION */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">

            {/* Logistics Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="uiverse-neo-card group relative p-10 rounded-3xl bg-white/80 backdrop-blur-xl border border-black/5 overflow-hidden shadow-xl"
              onClick={() => navigate('/gasper')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#0EA5E9]/5 to-transparent pointer-events-none" />
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-16 h-16 rounded-2xl bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 flex items-center justify-center mb-8 shadow-sm">
                  <Ship className="text-[#0EA5E9] w-8 h-8" />
                </div>
                <h2 className="text-3xl font-black text-[#1a1a1a] mb-4">Logistics <span className="text-[#0EA5E9]">OS</span></h2>
                <p className="text-[#4b5563] text-lg leading-relaxed mb-10 flex-grow">
                  The digital nervous system for global trade. Predictive tracking, geopolitical risk overlays, and automated customs compliance.
                </p>
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
              className="uiverse-neo-card group relative p-10 rounded-3xl bg-white/80 backdrop-blur-xl border border-black/5 overflow-hidden shadow-xl"
              onClick={() => navigate('/gasper/construction')}
            >
              <div className="absolute inset-0 bg-gradient-to-bl from-[#FF6B00]/5 to-transparent pointer-events-none" />
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-16 h-16 rounded-2xl bg-[#FF6B00]/10 border border-[#FF6B00]/20 flex items-center justify-center mb-8 shadow-sm">
                  <HardHat className="text-[#F59E0B] w-8 h-8" />
                </div>
                <h2 className="text-3xl font-black text-[#1a1a1a] mb-4">Construction <span className="text-[#FF6B00]">AI</span></h2>
                <p className="text-[#4b5563] text-lg leading-relaxed mb-10 flex-grow">
                  Generative structural design, AI-powered blueprint takeoffs, and predictive project management for the built environment.
                </p>
                <div className="flex items-center text-[#FF6B00] font-bold text-lg group-hover:text-[#F59E0B] transition-colors">
                  Launch Command Center <ArrowRight size={20} className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* FOUNDATIONAL TECH MATRIX */}
        <section className="py-24 px-6 max-w-7xl mx-auto relative border-t border-black/5">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-[#FF6B00] uppercase mb-4">Core Infrastructure</h2>
            <h3 className="text-4xl font-black text-[#1a1a1a]">Built for Enterprise Scale</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <Database />, title: "Digital Twin Sync", desc: "Real-time ingestion of AIS, IoT, and ERP data into a unified graph database.", color: "text-[#3B82F6]" },
              { icon: <Brain />, title: "Custom LLM Engine", desc: "Fine-tuned language models trained exclusively on construction and supply chain corpora.", color: "text-[#8B5CF6]" },
              { icon: <ShieldCheck />, title: "Military-Grade Security", desc: "SOC 2 Type II compliant with end-to-end encryption for all operational data.", color: "text-[#10B981]" }
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-white border border-black/5 hover:border-[#FF6B00]/20 transition-colors shadow-sm"
              >
                <div className={`w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-6 shadow-sm border border-black/5 ${f.color}`}>
                  {f.icon}
                </div>
                <h4 className="text-xl font-bold text-[#1a1a1a] mb-3">{f.title}</h4>
                <p className="text-[#6b7280] leading-relaxed relative z-20 pointer-events-auto">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA FOOTER */}
        <section className="py-32 px-6 relative text-center">
          <div className="absolute inset-0 bg-[#1a1a1a] transform -skew-y-2 -z-10 origin-top-left" />
          <div className="max-w-4xl mx-auto relative z-10 py-12">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Ready to Transform Your Operations?</h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Join industry leaders leveraging Gasper AI to build faster, ship smarter, and operate with unprecedented intelligence.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/pricing" className="px-8 py-4 bg-[#FF6B00] hover:bg-[#F59E0B] text-white rounded-xl font-bold text-lg transition-colors shadow-lg shadow-[#FF6B00]/20">
                View Pricing
              </Link>
              <Link to="/contact" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl font-bold text-lg transition-colors backdrop-blur-md">
                Request Custom Demo
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

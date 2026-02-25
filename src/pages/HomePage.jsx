import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { Ship, HardHat, ArrowRight, Activity, Grid } from 'lucide-react';
import LiquidEther from '../components/LiquidEther';
import { getOptimizedSettings } from '../utils/detectWindows';
import '../styles/homepage.css';

export default function HomePage() {
  const navigate = useNavigate();
  const [hoveredDomain, setHoveredDomain] = useState(null); // 'logistics', 'construction', or null

  const isMobile = typeof window !== 'undefined' && (
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
    window.innerWidth <= 768
  );
  const settings = getOptimizedSettings(isMobile);

  // Dynamic colors for LiquidEther based on interaction
  const getEtherColors = () => {
    if (hoveredDomain === 'logistics') return ['#5227FF', '#22d3ee', '#1e1b4b'];
    if (hoveredDomain === 'construction') return ['#FF6B00', '#F59E0B', '#451a03'];
    return ['#5227FF', '#FF6B00', '#0a0a0a']; // Neutral mix
  };

  return (
    <div className="homepage-container overflow-hidden bg-[#050505]">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 transition-opacity duration-1000">
        <LiquidEther
          colors={getEtherColors()}
          mouseForce={isMobile ? 18 : 30}
          cursorSize={isMobile ? 80 : 120}
          isViscous
          viscous={30}
          iterationsViscous={settings.iterationsViscous}
          iterationsPoisson={settings.iterationsPoisson}
          resolution={settings.resolution}
          isBounce={false}
          autoDemo
          autoSpeed={settings.autoSpeed}
          autoIntensity={2.5}
          takeoverDuration={0.8}
          autoResumeDelay={2000}
          autoRampDuration={1.0}
        />
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-10" />
      </div>

      {/* Main Split Screen Content */}
      <div className="relative z-20 flex flex-col md:flex-row min-h-screen pt-20">

        {/* Logistics Side */}
        <motion.div
          className="flex-1 flex flex-col justify-center items-center p-8 md:p-16 border-b md:border-b-0 md:border-r border-white/10 group cursor-pointer relative overflow-hidden transition-all duration-700 ease-in-out"
          onMouseEnter={() => setHoveredDomain('logistics')}
          onMouseLeave={() => setHoveredDomain(null)}
          onClick={() => navigate('/gasper')} // Route to Logistics tool or specific anchor
          animate={{
            flexGrow: hoveredDomain === 'logistics' ? 1.5 : hoveredDomain === 'construction' ? 0.7 : 1,
            opacity: hoveredDomain === 'construction' ? 0.4 : 1
          }}
        >
          {/* Hover Glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#5227FF]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="relative z-10 text-center flex flex-col items-center">
            <motion.div
              className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#5227FF]/10 border border-[#5227FF]/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(82,39,255,0.3)] group-hover:scale-110 transition-transform duration-500"
            >
              <Ship className="text-[#22d3ee] w-10 h-10 md:w-12 md:h-12" strokeWidth={1.5} />
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              Gasper <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5227FF] to-[#22d3ee]">Logistics</span>
            </h2>
            <p className="text-slate-300 text-lg md:text-xl max-w-md mx-auto mb-8 font-light">
              The digital nervous system for global trade. Predictive tracking, routing, and risk intelligence.
            </p>

            <div className="flex items-center gap-2 text-[#22d3ee] font-semibold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
              Explore Logistics OS <ArrowRight size={20} />
            </div>
          </div>
        </motion.div>

        {/* Construction Side */}
        <motion.div
          className="flex-1 flex flex-col justify-center items-center p-8 md:p-16 group cursor-pointer relative overflow-hidden transition-all duration-700 ease-in-out"
          onMouseEnter={() => setHoveredDomain('construction')}
          onMouseLeave={() => setHoveredDomain(null)}
          onClick={() => navigate('/gasper/construction')} // Or scroll to construction section
          animate={{
            flexGrow: hoveredDomain === 'construction' ? 1.5 : hoveredDomain === 'logistics' ? 0.7 : 1,
            opacity: hoveredDomain === 'logistics' ? 0.4 : 1
          }}
        >
          {/* Hover Glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#FF6B00]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="relative z-10 text-center flex flex-col items-center">
            <motion.div
              className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,107,0,0.3)] group-hover:scale-110 transition-transform duration-500"
            >
              <HardHat className="text-[#F59E0B] w-10 h-10 md:w-12 md:h-12" strokeWidth={1.5} />
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              Gasper <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#F59E0B]">Construction</span>
            </h2>
            <p className="text-slate-300 text-lg md:text-xl max-w-md mx-auto mb-8 font-light">
              AI-powered blueprint takeoff, generative structural design, and predictive project management.
            </p>

            <div className="flex items-center gap-2 text-[#F59E0B] font-semibold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
              Explore Construction AI <ArrowRight size={20} />
            </div>
          </div>
        </motion.div>

      </div>

      {/* Global Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none"
        animate={{ opacity: hoveredDomain ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-slate-400 text-sm tracking-widest uppercase mb-2">Select Domain</span>
        <div className="w-px h-16 bg-gradient-to-b from-white/30 to-transparent" />
      </motion.div>

    </div>
  );
}

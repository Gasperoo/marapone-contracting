import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Layers, Zap, Cpu, Network } from 'lucide-react';
import RuixenAbout from '../components/RuixenAbout';
import '../components/LandingPage/LandingPage.css';
import NetworkMesh from '../components/AboutPage/NetworkMesh';


export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const timelineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="landing-container pt-20 relative overflow-hidden" ref={containerRef}>
      <NetworkMesh />

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title mb-6">
            About <span className="text-[#5227FF]">Marapone</span>
          </h1>
          <p className="hero-subtitle mx-auto max-w-3xl">
            We are a global ecosystem bridging the gap between advanced AI technology and real-world logistics operations.
          </p>
        </motion.div>
      </div>

      {/* Mission & Vision */}
      <section className="mb-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
          <p className="text-lg text-slate-300 leading-relaxed">
            To democratize access to enterprise-grade supply chain intelligence. We believe that every shipment tells a story, and by decoding that story with AI, we can build a more resilient, efficient, and sustainable global trade network.
          </p>
        </div>
      </section>

      {/* Strategic Overview */}
      <section className="mb-32 relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Marapone Column */}
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="mb-6 inline-flex p-3 rounded-2xl bg-[#5227FF]/10 text-[#5227FF] border border-[#5227FF]/20">
              <Layers size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">The Infrastructure</h3>
            <p className="text-slate-300 leading-relaxed mb-6">
              Marapone is the backbone. We build the digital highways that connect carriers, ports, and warehouses into a single, cohesive ecosystem. Our infrastructure handles millions of data points daily, ensuring that the physical world of logistics is perfectly mirrored in the digital realm.
            </p>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#5227FF]" />
                <span>Global Carrier Integrations</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#5227FF]" />
                <span>Real-Time Data Pipelines</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#5227FF]" />
                <span>Enterprise Security Architecture</span>
              </li>
            </ul>
          </div>

          {/* Gasper Column */}
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="mb-6 inline-flex p-3 rounded-2xl bg-cyan-400/10 text-cyan-400 border border-cyan-400/20">
              <Cpu size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">The Intelligence</h3>
            <p className="text-slate-300 leading-relaxed mb-6">
              Gasper is the brain. Built on top of Marapone's infrastructure, Gasper applies advanced machine learning and predictive analytics to make sense of the chaos. It doesn't just show you where your cargo is; it tells you where it should be and how to get it there faster.
            </p>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>Predictive Risk Analysis</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>Automated Decision Support</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>Generative Supply Chain Assistant</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="mb-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Core Values</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <ValueCard
              title="Innovation"
              description="We don't follow trends; we set them. Continuous improvement is in our DNA."
              icon={<Zap size={24} className="text-yellow-400" />}
            />
            <ValueCard
              title="Transparency"
              description="No black boxes. We believe in open data and clear, explainable AI."
              icon={<Globe size={24} className="text-blue-400" />}
            />
            <ValueCard
              title="Reliability"
              description="Global trade never stops, and neither do we. 99.99% uptime is our baseline."
              icon={<Layers size={24} className="text-green-400" />}
            />
            <ValueCard
              title="Sustainability"
              description="Optimizing routes isn't just about cost; it's about reducing our carbon footprint."
              icon={<Cpu size={24} className="text-emerald-400" />}
            />
          </div>
        </div>
      </section>

      {/* The Gasper Tool Section */}
      <section className="py-20 bg-white/5 border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5227FF]/10 text-[#c084fc] text-sm font-semibold mb-6 border border-[#5227FF]/20">
                <Zap size={14} />
                <span>Flagship Product</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-6">The Gasper Tool</h2>
              <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                The Gasper Tool is our premier SaaS platform, designed to be the "Digital Nervous System" for modern supply chains. It goes beyond simple tracking to provide predictive intelligence.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-slate-300">
                  <div className="mt-1 p-1 bg-green-500/20 rounded text-green-400"><Cpu size={16} /></div>
                  <span><strong>AI-Powered Analysis:</strong> Compliance and risk checks in milliseconds.</span>
                </li>
                <li className="flex items-start gap-3 text-slate-300">
                  <div className="mt-1 p-1 bg-blue-500/20 rounded text-blue-400"><Network size={16} /></div>
                  <span><strong>Digital Twin:</strong> Simulate disruptions before they happen.</span>
                </li>
                <li className="flex items-start gap-3 text-slate-300">
                  <div className="mt-1 p-1 bg-purple-500/20 rounded text-purple-400"><Globe size={16} /></div>
                  <span><strong>Global Vision:</strong> Real-time tracking across sea, air, and rail.</span>
                </li>
              </ul>
              <Link to="/gasper" className="btn-primary inline-flex items-center">
                Explore Gasper <ArrowRight className="ml-2" size={20} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Tool Visualization */}
              <div className="rounded-2xl border border-white/10 overflow-hidden shadow-[0_0_50px_rgba(82,39,255,0.2)] relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#5227FF]/20 to-transparent mix-blend-overlay"></div>
                <img
                  src="/global-trade.png"
                  alt="Gasper Intelligence Global Trade Map"
                  className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-bold">Gasper Intelligence</div>
                      <div className="text-[#c084fc] text-xs">v2.0 Live Network Feed</div>
                    </div>
                    <div className="px-2 py-1 bg-green-500/20 text-green-400 text-[10px] font-bold rounded animate-pulse">
                      ACTIVE
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Marapone Ecosystem / Ruixen Section */}
      <div className="py-12 relative z-10">
        <RuixenAbout />
      </div>

    </div>
  );
}



function ValueCard({ title, description, icon }) {
  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-400 text-sm">{description}</p>
    </div>
  );
}

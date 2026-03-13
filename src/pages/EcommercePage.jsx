import React from 'react';
import { motion } from 'motion/react';
import { Package, DollarSign, Bot, ShoppingCart, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const EcommercePage = () => {
    return (
        <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-24 text-[#1a1a1a]">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-16">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#8B5CF6]/10 bg-[#8B5CF6]/5 text-[#8B5CF6] text-xs font-semibold tracking-[0.15em] mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-pulse mr-2" />
                    RETAIL OPTIMIZATION AI
                </div>
                <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 leading-[1.05]">
                    Autonomous Commerce Operations
                </h1>
                <p className="text-xl text-gray-500 font-medium max-w-3xl leading-relaxed">
                    Maximize margin through algorithmic pricing, forecast inventory depletion with ML, and deploy autonomous AI agents that resolve 80% of L1 support tickets without human intervention.
                </p>
            </div>

            {/* Use Cases Section */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
                
                {/* Use Case 1: Dynamic Pricing */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-[2rem] border border-black/5 p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex flex-col md:flex-row gap-12 items-center">
                    <div className="md:w-1/2">
                        <div className="w-14 h-14 rounded-2xl bg-[#8B5CF6]/10 text-[#8B5CF6] flex items-center justify-center mb-6">
                            <DollarSign size={28} />
                        </div>
                        <h2 className="text-3xl font-extrabold tracking-tight mb-4">Algorithmic Dynamic Pricing</h2>
                        <p className="text-[15px] text-gray-500 leading-[1.7] mb-6 font-medium">
                            Protect and expand your gross margins. GasperAI continuously adjusts product pricing based on real-time competitor stock levels, your internal inventory health, and aggregated demand signals.
                        </p>
                        <ul className="space-y-3">
                            {['Increase prices when competitors stock out', 'Automate discount velocity to clear stale inventory', 'Sync instantly with Shopify, Magento, and BigCommerce'].map((item, i) => (
                                <li key={i} className="flex flex-start gap-3 text-[14px] font-bold text-gray-700">
                                    <CheckCircle2 size={18} className="text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="md:w-1/2 w-full aspect-[4/3] bg-gray-50 rounded-2xl border border-black/5 relative overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#8B5CF6 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }} />
                         {/* Mock UI */}
                         <div className="relative z-10 w-[80%] bg-white shadow-xl rounded-xl border border-[#8B5CF6]/20 p-5">
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 border-b border-black/5 pb-2">Active Pricing Modifiers</div>
                            
                            <div className="bg-[#8B5CF6]/5 border border-[#8B5CF6]/20 rounded-lg p-4 mb-3 flex items-center justify-between">
                                <div>
                                    <div className="font-bold text-sm">SKU: Ultra-Durable Work Boots</div>
                                    <div className="text-[10px] text-gray-500 uppercase tracking-wider">Competitor out of stock</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xl font-black text-[#1a1a1a]">$145.00</div>
                                    <div className="text-xs font-bold text-green-500">+$15.00 Margin</div>
                                </div>
                            </div>
                            
                            <div className="bg-gray-50 border border-black/5 rounded-lg p-4 flex items-center justify-between">
                                <div>
                                    <div className="font-bold text-sm">SKU: Fall Collection Jacket</div>
                                    <div className="text-[10px] text-gray-500 uppercase tracking-wider">High Inventory & Velocity Low</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xl font-black text-[#1a1a1a]">$89.99</div>
                                    <div className="text-xs font-bold text-gray-500">-$5.00 Discount</div>
                                </div>
                            </div>

                         </div>
                    </div>
                </motion.div>

                {/* Use Case 2: Autonomous Support */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-[2rem] border border-black/5 p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex flex-col md:flex-row-reverse gap-12 items-center">
                    <div className="md:w-1/2">
                        <div className="w-14 h-14 rounded-2xl bg-[#0EA5E9]/10 text-[#0EA5E9] flex items-center justify-center mb-6">
                            <Bot size={28} />
                        </div>
                        <h2 className="text-3xl font-extrabold tracking-tight mb-4">Autonomous L1 Support Agents</h2>
                        <p className="text-[15px] text-gray-500 leading-[1.7] mb-6 font-medium">
                            Deploy custom LLM agents trained on your returns policy, logistics database, and product catalog. Instantly resolve WISMO (Where Is My Order), sizing queries, and refund processing 24/7.
                        </p>
                        <ul className="space-y-3">
                            {['Deflect up to 80% of Tier 1 human support tickets', 'Execute API calls to refund or replace orders autonomously', 'Zero hallucination risk via strict deterministic constraints'].map((item, i) => (
                                <li key={i} className="flex flex-start gap-3 text-[14px] font-bold text-gray-700">
                                    <CheckCircle2 size={18} className="text-[#0EA5E9] flex-shrink-0 mt-0.5" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="md:w-1/2 w-full aspect-[4/3] bg-gray-50 rounded-2xl border border-black/5 relative overflow-hidden flex items-center justify-center">
                        {/* Mock UI */}
                        <div className="relative z-10 w-[80%] bg-white shadow-xl rounded-xl border border-black/5 p-5">
                             <div className="flex items-center justify-between mb-4 pb-2 border-b border-black/5">
                                 <div className="text-xs font-bold text-gray-500">Agent Interface</div>
                                 <div className="text-[10px] font-bold text-green-500 uppercase tracking-widest bg-green-50 px-2 py-0.5 rounded">Resolving Ticket...</div>
                             </div>
                             
                             <div className="space-y-4">
                                <div className="bg-gray-100 p-3 rounded-xl rounded-tr-sm text-sm self-end max-w-[85%] text-gray-700 ml-auto shadow-sm">
                                    "I received the wrong size on order #49281. Can I return this?"
                                </div>
                                <div className="flex flex-col gap-1 items-start">
                                    <div className="text-[9px] text-gray-400 font-mono">system.verify_purchase_window()</div>
                                    <div className="bg-[#0EA5E9]/10 text-[#0EA5E9] p-3 rounded-xl rounded-tl-sm text-sm self-start max-w-[90%] shadow-sm border border-[#0EA5E9]/20 relative">
                                        Yes, you are within the 30-day window! I have emailed you a prepaid return label via FedEx. Once scanned, your $42.50 refund will hit your original payment method.
                                        <div className="absolute -top-2 -left-2 w-5 h-5 bg-[#0EA5E9] rounded-full flex items-center justify-center border-2 border-white"><Bot size={10} className="text-white"/></div>
                                    </div>
                                </div>
                             </div>
                        </div>
                    </div>
                </motion.div>

                {/* Use Case 3: Supply Chain Visibility */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-[2rem] border border-black/5 p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex flex-col md:flex-row gap-12 items-center">
                    <div className="md:w-1/2">
                        <div className="w-14 h-14 rounded-2xl bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center mb-6">
                            <ShoppingCart size={28} />
                        </div>
                        <h2 className="text-3xl font-extrabold tracking-tight mb-4">Multi-Channel Fulfillment Optimization</h2>
                        <p className="text-[15px] text-gray-500 leading-[1.7] mb-6 font-medium">
                            Whether you ship from centralized 3PLs or utilize store-as-fulfillment center models, GasperAI orchestrates the most cost-effective shipping node for every cart transaction in milliseconds.
                        </p>
                        <ul className="space-y-3">
                            {['Reduce zone-skipping fees and last-mile costs', 'Balance inventory across physical and digital storefronts', 'Prevent split-shipments intelligently over multiple SKUs'].map((item, i) => (
                                <li key={i} className="flex flex-start gap-3 text-[14px] font-bold text-gray-700">
                                    <CheckCircle2 size={18} className="text-[#FF6B00] flex-shrink-0 mt-0.5" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="md:w-1/2 w-full aspect-[4/3] bg-gray-50 rounded-2xl border border-black/5 relative overflow-hidden flex items-center justify-center">
                        {/* Mock UI */}
                        <div className="relative z-10 w-[80%] bg-white shadow-xl rounded-xl border border-black/5 p-5">
                            <div className="flex items-center justify-between mb-4 border-b border-black/5 pb-2">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Routing Logic Engine</span>
                            </div>
                            <div className="space-y-3 relative">
                                {/* Routing Path visualization */}
                                <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gray-200 z-0" />

                                <div className="relative z-10 flex gap-4 items-start">
                                    <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-xs font-bold text-gray-400 border border-black/5 shrink-0">Order</div>
                                    <div className="bg-white p-2 border border-black/5 rounded shadow-sm w-full">
                                        <div className="text-xs text-gray-800 font-semibold mb-1">Dest: Zip 90210 (Los Angeles)</div>
                                    </div>
                                </div>
                                <div className="relative z-10 flex gap-4 items-start">
                                    <div className="w-12 h-12 bg-[#FF6B00]/10 rounded flex items-center justify-center text-xs font-bold text-[#FF6B00] border border-[#FF6B00]/20 shrink-0">Node</div>
                                    <div className="bg-[#FF6B00]/5 p-2 border border-[#FF6B00]/20 rounded shadow-sm w-full">
                                        <div className="text-xs text-[#FF6B00] font-bold mb-1">Selected: Store #14 (Santa Monica)</div>
                                        <div className="text-[10px] text-gray-600">Saved $12.50 vs NV Warehouse. Fast TTL.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
            
            <div className="max-w-7xl mx-auto px-6 mt-16 text-center">
                <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-[#1a1a1a] text-white font-bold rounded-xl hover:-translate-y-1 transition-transform shadow-[0_10px_20px_rgba(0,0,0,0.1)]">
                    Evaluate AI for E-Commerce <ArrowRight size={18} />
                </Link>
            </div>
        </div>
    );
};

export default EcommercePage;

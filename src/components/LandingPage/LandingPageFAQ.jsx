import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    {
        question: "How does Gasper integrate with my existing ERP?",
        answer: "Gasper offers plug-and-play connectors for major ERPs like SAP, Oracle, and Microsoft Dynamics. For custom systems, our robust REST API and EDI support ensures seamless data synchronization."
    },
    {
        question: "Is my supply chain data secure?",
        answer: "Absolutely. We are SOC 2 Type II compliant and use end-to-end AES-256 encryption. Your data is isolated in dedicated containers and never shared with unauthorized parties."
    },
    {
        question: "Can I try Gasper before committing?",
        answer: "Yes! We offer a 14-day free trial on our Scout plan for both Logistics and Construction tools. For enterprise needs, contact our sales team for a guided pilot program using your own historical data."
    },
    {
        question: "What makes your predictive AI different?",
        answer: "Unlike generic models, Gasper's AI is trained specifically on logistics and construction datasets. It ingests geopolitical news, weather data, and industry-specific signals to predict delays and failures with 85% higher accuracy than standard tools."
    },
    {
        question: "Can Gasper read my existing blueprints and plans?",
        answer: "Yes — Gasper's Blueprint AI supports PDF, DWG, and image formats. It uses computer vision to detect walls, doors, MEP systems, and dimensions with 99% accuracy, and can automatically generate material takeoffs."
    },
    {
        question: "Does the Construction tool integrate with BIM software?",
        answer: "Gasper supports IFC file import and can connect with Revit, ArchiCAD, and other BIM platforms via our API. The Generative Design module can also export design variants in standard formats."
    }
];

export function LandingPageFAQ() {
    return (
        <section className="py-24 max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <FAQItem key={index} question={faq.question} answer={faq.answer} />
                ))}
            </div>
        </section>
    );
}

function FAQItem({ question, answer }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="glass-panel overflow-hidden transition-all duration-300 hover:border-[#0EA5E9]/40 mb-4 group hover:shadow-[0_0_20px_rgba(14,165,233,0.15)]">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
            >
                <span className="text-lg font-medium text-white">{question}</span>
                <span className={`text-[#0EA5E9] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    {isOpen ? <Minus /> : <Plus />}
                </span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="p-6 pt-0 text-slate-400 leading-relaxed border-t border-white/5">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

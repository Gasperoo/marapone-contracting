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
        answer: "Yes! We offer a 14-day free trial on our Scout plan. For enterprise needs, contact our sales team for a guided pilot program using your own historical data."
    },
    {
        question: "What makes your predictive AI different?",
        answer: "Unlike generic models, Gasper's AI is trained specifically on logistics datasets. It ingests geopolitical news, local weather, and port congestion data to predict delays with 85% higher accuracy than standard ETAs."
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
        <div className="border border-white/10 rounded-2xl bg-white/5 overflow-hidden transition-colors hover:border-white/20">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
            >
                <span className="text-lg font-medium text-white">{question}</span>
                <span className={`text-[#5227FF] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
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

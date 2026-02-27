import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Twitter, Linkedin, Mail, Github } from 'lucide-react';

export default function ComingSoonFooter() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: Twitter, label: 'Twitter', href: '#' },
        { icon: Linkedin, label: 'LinkedIn', href: '#' },
        { icon: Mail, label: 'Email', href: '#' },
        { icon: Github, label: 'GitHub', href: '#' },
    ];

    return (
        <footer className="w-full relative mt-auto overflow-hidden">
            {/* Aurora gradient top border */}
            <div className="h-[2px] w-full" style={{
                background: 'linear-gradient(90deg, transparent, #0EA5E9, #22d3ee, #14B8A6, #0EA5E9, transparent)',
                opacity: 0.4,
            }} />

            {/* Frosted glass body */}
            <div className="backdrop-blur-xl bg-[#020008]/80 border-t border-white/[0.03]">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">

                        {/* Brand */}
                        <div className="text-center md:text-left">
                            <div className="text-xl font-bold mb-2" style={{
                                background: 'linear-gradient(135deg, #fff 40%, #0EA5E9)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}>
                                Gasper
                            </div>
                            <p className="text-sm text-slate-600">
                                &copy; {currentYear} Marapone Contracting Inc. All rights reserved.
                            </p>
                        </div>

                        {/* Social Links with ripple glow */}
                        <div className="flex items-center gap-5">
                            {socialLinks.map(({ icon: Icon, label, href }) => (
                                <motion.a
                                    key={label}
                                    href={href}
                                    className="relative w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:text-white transition-colors duration-300 group"
                                    aria-label={label}
                                    whileHover={{ scale: 1.15 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {/* Hover ripple glow */}
                                    <div className="absolute inset-0 rounded-full bg-[#0EA5E9]/0 group-hover:bg-[#0EA5E9]/15 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(14,165,233,0.3)]" />
                                    <Icon size={18} className="relative z-10" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Legal links with underline animation */}
                    <div className="mt-8 pt-8 border-t border-white/[0.04] flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-2 text-xs text-slate-600">
                        {[
                            { to: '/privacy', label: 'Privacy Policy' },
                            { to: '/terms', label: 'Terms of Service' },
                            { to: '/cookies', label: 'Cookie Policy' },
                        ].map(({ to, label }) => (
                            <Link
                                key={to}
                                to={to}
                                className="relative hover:text-slate-300 transition-colors duration-300 group"
                            >
                                {label}
                                <span className="absolute bottom-[-2px] left-0 w-0 h-[1px] bg-gradient-to-r from-[#0EA5E9] to-[#22d3ee] group-hover:w-full transition-all duration-300" />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

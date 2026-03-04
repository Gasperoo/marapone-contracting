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
            {/* Top border accent */}
            <div className="h-[2px] w-full" style={{
                background: 'linear-gradient(90deg, transparent, #FF6B00, #F59E0B, #FF6B00, transparent)',
                opacity: 0.3,
            }} />

            {/* White footer body */}
            <div className="bg-white border-t border-black/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">

                        {/* Brand */}
                        <div className="text-center md:text-left">
                            <div className="text-xl font-bold mb-2 text-[#1a1a1a]">
                                Gasper
                            </div>
                            <p className="text-sm text-[#6b7280]">
                                &copy; {currentYear} Marapone Contracting Inc. All rights reserved.
                            </p>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center gap-5">
                            {socialLinks.map(({ icon: Icon, label, href }) => (
                                <motion.a
                                    key={label}
                                    href={href}
                                    className="relative w-10 h-10 rounded-full flex items-center justify-center text-[#6b7280] hover:text-[#1a1a1a] transition-colors duration-300 group"
                                    aria-label={label}
                                    whileHover={{ scale: 1.15 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {/* Hover glow */}
                                    <div className="absolute inset-0 rounded-full bg-transparent group-hover:bg-black/5 transition-all duration-300" />
                                    <Icon size={18} className="relative z-10" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Legal links */}
                    <div className="mt-8 pt-8 border-t border-black/5 flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-2 text-xs text-[#6b7280]">
                        {[
                            { to: '/privacy', label: 'Privacy Policy' },
                            { to: '/terms', label: 'Terms of Service' },
                            { to: '/cookies', label: 'Cookie Policy' },
                        ].map(({ to, label }) => (
                            <Link
                                key={to}
                                to={to}
                                className="relative hover:text-[#1a1a1a] transition-colors duration-300 group"
                            >
                                {label}
                                <span className="absolute bottom-[-2px] left-0 w-0 h-[1px] bg-gradient-to-r from-[#FF6B00] to-[#F59E0B] group-hover:w-full transition-all duration-300" />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

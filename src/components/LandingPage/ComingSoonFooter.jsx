import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Mail, Github } from 'lucide-react';

export default function ComingSoonFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-white/5 bg-black/20 backdrop-blur-md mt-auto">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">

                    {/* Brand / Copyright */}
                    <div className="text-center md:text-left">
                        <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-2">
                            Gasper
                        </div>
                        <p className="text-sm text-slate-500">
                            &copy; {currentYear} Marapone Contracting Inc. All rights reserved.
                        </p>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-6">
                        <a
                            href="#"
                            className="text-slate-400 hover:text-[#5227FF] transition-colors duration-300"
                            aria-label="Twitter"
                        >
                            <Twitter size={20} />
                        </a>
                        <a
                            href="#"
                            className="text-slate-400 hover:text-[#5227FF] transition-colors duration-300"
                            aria-label="LinkedIn"
                        >
                            <Linkedin size={20} />
                        </a>
                        <a
                            href="#"
                            className="text-slate-400 hover:text-[#5227FF] transition-colors duration-300"
                            aria-label="Email"
                        >
                            <Mail size={20} />
                        </a>
                        <a
                            href="#"
                            className="text-slate-400 hover:text-[#5227FF] transition-colors duration-300"
                            aria-label="GitHub"
                        >
                            <Github size={20} />
                        </a>
                    </div>
                </div>

                {/* Secondary Links */}
                <div className="mt-8 pt-8 border-t border-white/5 flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-2 text-xs text-slate-600">
                    <Link to="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
                    <Link to="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
                    <Link to="/cookies" className="hover:text-slate-300 transition-colors">Cookie Policy</Link>
                </div>
            </div>
        </footer>
    );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './LandingPage/LandingPage.css';

/**
 * Simple layout for legal pages - no navbar, just a back button
 */
export default function LegalPageLayout({ children, title, effectiveDate }) {
    return (
        <div className="landing-container min-h-screen bg-[#0f172a]">
            <div className="max-w-4xl mx-auto px-6 py-16">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-[#22d3ee] hover:text-[#5227FF] transition-colors mb-8 group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium">Back to Home</span>
                </Link>

                <h1 className="text-5xl font-bold text-white mb-4">{title}</h1>
                {effectiveDate && (
                    <p className="text-slate-400 mb-12">Effective Date: {effectiveDate}</p>
                )}

                <div className="prose prose-invert prose-slate max-w-none">
                    {children}
                </div>
            </div>
        </div>
    );
}

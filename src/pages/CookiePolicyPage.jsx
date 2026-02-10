import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import '../components/LandingPage/LandingPage.css';

export default function CookiePolicyPage() {
    return (
        <div className="landing-container pt-20">
            <div className="max-w-4xl mx-auto px-6 py-16">
                <Link to="/" className="inline-flex items-center gap-2 text-[#c084fc] hover:text-[#5227FF] transition-colors mb-8">
                    <ArrowLeft size={20} />
                    <span>Back to Home</span>
                </Link>

                <h1 className="text-5xl font-bold text-white mb-4">Cookie Policy</h1>
                <p className="text-slate-400 mb-12">Effective Date: February 10, 2026</p>

                <div className="prose prose-invert prose-slate max-w-none">
                    <div className="text-slate-300 space-y-8">
                        <p>
                            Marapone Contracting Inc. ("Marapone," "we," "us," or "our") uses cookies and similar technologies on our website at www.marapone.com (the "Website") and AI-powered logistics platform, Gasper (the "Platform") (collectively, the "Services") to enhance user experience, analyze usage, and provide personalized features. This Cookie Policy explains our use of cookies. By using the Services, you consent to our use of cookies as described.
                        </p>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">1. What Are Cookies?</h2>
                            <p>
                                Cookies are small text files stored on your device. They help remember preferences, track usage, and enable features. We use session cookies (temporary) and persistent cookies (longer-lasting).
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">2. Types of Cookies We Use</h2>
                            <ul className="list-disc pl-6 space-y-3">
                                <li>
                                    <strong className="text-white">Essential Cookies:</strong> Necessary for core functionality, such as navigation, security, and waitlist sign-up. These cannot be disabled.
                                </li>
                                <li>
                                    <strong className="text-white">Performance Cookies:</strong> Collect anonymized data on usage (e.g., pages visited, errors) to improve Services. Tools may include Google Analytics.
                                </li>
                                <li>
                                    <strong className="text-white">Functional Cookies:</strong> Remember choices (e.g., language) for personalization.
                                </li>
                                <li>
                                    <strong className="text-white">Targeting Cookies:</strong> For marketing, tracking interactions to show relevant ads (e.g., via third-party networks). We do not currently use these extensively due to beta status.
                                </li>
                            </ul>
                            <p className="mt-4">
                                We do not use cookies for non-essential tracking without consent where required (e.g., under GDPR).
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">3. Third-Party Cookies</h2>
                            <p>
                                Partners like analytics providers may set cookies. Their policies apply (e.g., Google's at{' '}
                                <a
                                    href="https://policies.google.com/privacy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#c084fc] hover:text-[#5227FF] transition-colors"
                                >
                                    policies.google.com/privacy
                                </a>
                                ). We integrate with trusted sources but do not control their cookies.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">4. Managing Cookies</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>
                                    <strong className="text-white">Browser settings:</strong> Block or alert on cookies (may affect functionality).
                                </li>
                                <li>
                                    <strong className="text-white">Opt-Out:</strong> Use tools like{' '}
                                    <a
                                        href="https://www.aboutads.info/choices"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#c084fc] hover:text-[#5227FF] transition-colors"
                                    >
                                        www.aboutads.info/choices
                                    </a>
                                    {' '}or{' '}
                                    <a
                                        href="https://www.youronlinechoices.eu"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#c084fc] hover:text-[#5227FF] transition-colors"
                                    >
                                        www.youronlinechoices.eu
                                    </a>
                                    {' '}(EU).
                                </li>
                                <li>
                                    <strong className="text-white">Do Not Track:</strong> We honor DNT signals where applicable.
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">5. Changes to Policy</h2>
                            <p>
                                We may update this Policy. Continued use constitutes acceptance.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">6. Contact Us</h2>
                            <p>
                                For questions, contact us at <Link to="/contact" className="text-[#c084fc] hover:text-[#5227FF] transition-colors">our contact page</Link>.
                            </p>
                        </section>

                        <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-2xl">
                            <p className="text-sm">
                                <strong className="text-white">Note:</strong> Our Website and Platform emphasize data security (e.g., GDPR compliance), and cookie use is minimal during beta. If no cookies are detected, this policy serves as a proactive measure.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

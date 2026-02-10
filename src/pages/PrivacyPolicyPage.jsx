import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import '../components/LandingPage/LandingPage.css';

export default function PrivacyPolicyPage() {
    return (
        <div className="landing-container pt-20">
            <div className="max-w-4xl mx-auto px-6 py-16">
                <Link to="/" className="inline-flex items-center gap-2 text-[#c084fc] hover:text-[#5227FF] transition-colors mb-8">
                    <ArrowLeft size={20} />
                    <span>Back to Home</span>
                </Link>

                <h1 className="text-5xl font-bold text-white mb-4">Privacy Policy</h1>
                <p className="text-slate-400 mb-12">Effective Date: February 10, 2026</p>

                <div className="prose prose-invert prose-slate max-w-none">
                    <div className="text-slate-300 space-y-8">
                        <p>
                            Marapone Contracting Inc. ("Marapone," "we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard information when you visit our website at www.marapone.com (the "Website"), sign up for our waitlist, or use our AI-powered logistics platform, Gasper (the "Platform") (collectively, the "Services"). We comply with applicable laws, including GDPR.
                        </p>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong className="text-white">Personal Information:</strong> When you join the waitlist or create an account, we collect details such as your name, email, company name, role, and contact information.</li>
                                <li><strong className="text-white">Usage Data:</strong> Automatically collected data includes IP address, browser type, device information, pages visited, and interaction times.</li>
                                <li><strong className="text-white">Operational Data:</strong> For Platform users, we process shipment details, tracking data, compliance queries, and other inputs you provide. This may include data from integrated sources (e.g., AIS, APIs).</li>
                                <li><strong className="text-white">AI Interactions:</strong> Queries to the AI assistant and resulting insights. We do not collect sensitive personal data unless necessary for Services (e.g., for compliance screening).</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong className="text-white">Provide Services:</strong> To grant waitlist access, deliver Platform features (e.g., tracking, simulations, alerts), and respond to inquiries.</li>
                                <li><strong className="text-white">Improve Services:</strong> Analyze usage to enhance AI models, forecasts, and user experience.</li>
                                <li><strong className="text-white">Communications:</strong> Send updates, alerts, marketing (with opt-out), and support.</li>
                                <li><strong className="text-white">Compliance and Security:</strong> For risk detection, sanctions screening, and maintaining security.</li>
                                <li><strong className="text-white">Aggregated Data:</strong> Use anonymized data for research, market intelligence, and benchmarking.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">3. How We Share Your Information</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong className="text-white">Service Providers:</strong> With vendors for hosting (e.g., AWS), analytics, and support, bound by confidentiality.</li>
                                <li><strong className="text-white">Business Partners:</strong> For integrations (e.g., ERP systems), with your consent.</li>
                                <li><strong className="text-white">Legal Requirements:</strong> If required by law, subpoena, or to protect rights.</li>
                                <li><strong className="text-white">Business Transfers:</strong> In mergers, acquisitions, or asset sales. We do not sell your personal information.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
                            <p>
                                We use SOC 2 Type II, end-to-end encryption, GDPR-compliant practices, and ISO 27001 standards. Access is restricted, and we monitor for breaches. However, no transmission is 100% secure.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">5. Data Retention</h2>
                            <p>
                                We retain personal information as needed for Services, legal obligations, or disputes (typically 7 years for compliance data). Operational data may be retained indefinitely in anonymized form.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">6. Your Rights</h2>
                            <p className="mb-2">Under GDPR and similar laws:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Access, correct, or delete your data.</li>
                                <li>Object to processing or request restriction.</li>
                                <li>Withdraw consent (may affect Services).</li>
                                <li>Portability of data.</li>
                            </ul>
                            <p className="mt-4">Contact us to exercise rights. We respond within 30 days.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">7. International Transfers</h2>
                            <p>
                                Data may be processed in Canada or other countries with adequate protections. We use standard contractual clauses for transfers.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">8. Children's Privacy</h2>
                            <p>
                                Services are not for children under 18. We do not knowingly collect their data.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">9. Changes to Policy</h2>
                            <p>
                                We may update this Policy. Changes are posted here with updated effective date.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">10. Contact Us</h2>
                            <p>
                                For privacy questions, contact our Data Protection Officer at <Link to="/contact" className="text-[#c084fc] hover:text-[#5227FF] transition-colors">our contact page</Link>.
                            </p>
                        </section>

                        <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-2xl">
                            <p className="text-sm">
                                By using the Services, you acknowledge that you have read and understand this Privacy Policy.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

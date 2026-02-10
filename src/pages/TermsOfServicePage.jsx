import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import '../components/LandingPage/LandingPage.css';

export default function TermsOfServicePage() {
    return (
        <div className="landing-container pt-20">
            <div className="max-w-4xl mx-auto px-6 py-16">
                <Link to="/" className="inline-flex items-center gap-2 text-[#c084fc] hover:text-[#5227FF] transition-colors mb-8">
                    <ArrowLeft size={20} />
                    <span>Back to Home</span>
                </Link>

                <h1 className="text-5xl font-bold text-white mb-4">Terms of Service</h1>
                <p className="text-slate-400 mb-12">Effective Date: February 10, 2026</p>

                <div className="prose prose-invert prose-slate max-w-none">
                    <div className="text-slate-300 space-y-8">
                        <p>
                            Welcome to Marapone Contracting Inc. ("Marapone," "we," "us," or "our"). These Terms of Service ("Terms") govern your access to and use of our website at www.marapone.com (the "Website") and our AI-powered logistics platform, Gasper (the "Platform"), including any content, functionality, and services offered on or through the Website and Platform (collectively, the "Services"). By accessing or using the Services, including signing up for the waitlist or participating in the private beta, you agree to be bound by these Terms. If you do not agree, do not use the Services.
                        </p>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">1. Eligibility</h2>
                            <p>
                                You must be at least 18 years old and capable of forming a binding contract to use the Services. By using the Services, you represent that you meet these requirements. The Services are intended for business users in logistics, supply chain management, and related sectors, such as maritime, freight forwarding, retail, manufacturing, energy, commodities, and aerospace.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">2. Account Registration and Access</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong className="text-white">Waitlist and Beta Access:</strong> To join the waitlist for early access to Gasper, you must provide accurate information via the sign-up form. Upon approval, you may receive founding member benefits, including discounted pricing, priority support, and community access.</li>
                                <li><strong className="text-white">Account Creation:</strong> For full Platform use, you may need to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. Notify us immediately of any unauthorized use.</li>
                                <li><strong className="text-white">Beta Status:</strong> Gasper is currently in private beta. Features may change, and access is at our discretion. We may terminate beta access without notice.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">3. Use of the Services</h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-2">Permitted Use</h3>
                                    <p>You may use the Services for your internal business purposes, such as real-time tracking, digital twin simulations, compliance analysis, market intelligence, risk detection, green logistics calculations, cost optimization, and AI-assisted queries.</p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-2">Prohibitions</h3>
                                    <p>You agree not to:</p>
                                    <ul className="list-disc pl-6 space-y-2 mt-2">
                                        <li>Use the Services for illegal purposes or in violation of any law, including sanctions or export controls.</li>
                                        <li>Reverse engineer, decompile, or attempt to extract source code from the Platform.</li>
                                        <li>Upload harmful code, viruses, or data that could damage the Services.</li>
                                        <li>Misrepresent your identity or interfere with other users' access.</li>
                                        <li>Use automated tools to scrape data without permission.</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-2">Data Integration</h3>
                                    <p>The Platform integrates data from third-party sources (e.g., AIS, port APIs, weather data). We do not guarantee the accuracy of such data, and you use it at your own risk.</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">4. Intellectual Property</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong className="text-white">Ownership:</strong> All rights, title, and interest in the Services, including AI models, software, and content, belong to Marapone or our licensors. You are granted a limited, non-exclusive, revocable license to use the Services as permitted herein.</li>
                                <li><strong className="text-white">User Content:</strong> Any data you upload or input (e.g., shipment details) remains yours. You grant us a license to use it to provide and improve the Services, subject to our Privacy Policy.</li>
                                <li><strong className="text-white">Feedback:</strong> Any suggestions you provide may be used by us without compensation.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">5. Pricing and Payment</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong className="text-white">Beta Pricing:</strong> Early access may include founding member discounts (e.g., 40% off for life). Full pricing will be flat-rate, not per-shipment.</li>
                                <li><strong className="text-white">Payments:</strong> Upon public launch, fees will be detailed in your agreement. You agree to pay all fees promptly. We may suspend access for non-payment.</li>
                                <li><strong className="text-white">Taxes:</strong> You are responsible for applicable taxes.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">6. Data Security and Compliance</h2>
                            <p>
                                The Platform adheres to enterprise-grade standards, including SOC 2 Type II, end-to-end encryption, GDPR compliance, and ISO 27001. We implement reasonable measures to protect your data, but no system is infallible. Report security concerns to us immediately.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">7. Disclaimers and Limitations</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong className="text-white">As-Is Basis:</strong> The Services are provided "as is" without warranties. We disclaim implied warranties of merchantability, fitness, or non-infringement.</li>
                                <li><strong className="text-white">Accuracy:</strong> While we aim for high accuracy (e.g., 99% in HS code classification), predictions and data (e.g., ETAs, risks) are estimates only.</li>
                                <li><strong className="text-white">Limitation of Liability:</strong> In no event shall Marapone be liable for indirect, consequential, or punitive damages. Our total liability shall not exceed fees paid in the prior 12 months.</li>
                                <li><strong className="text-white">Indemnification:</strong> You agree to indemnify us against claims arising from your use of the Services or violation of these Terms.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">8. Termination</h2>
                            <p>
                                We may terminate or suspend your access at any time for violation of these Terms or other reasons. Upon termination, your right to use the Services ceases.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">9. Governing Law</h2>
                            <p>
                                These Terms are governed by the laws of Ontario, Canada, without regard to conflicts of law principles. Disputes shall be resolved in courts located in Toronto, Ontario.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">10. Changes to Terms</h2>
                            <p>
                                We may update these Terms. Continued use constitutes acceptance. Check periodically for changes.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">11. Contact Us</h2>
                            <p>
                                For questions, contact us at <Link to="/contact" className="text-[#c084fc] hover:text-[#5227FF] transition-colors">our contact page</Link>.
                            </p>
                        </section>

                        <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-2xl">
                            <p className="text-sm">
                                By using the Services, you acknowledge that you have read and agree to these Terms.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

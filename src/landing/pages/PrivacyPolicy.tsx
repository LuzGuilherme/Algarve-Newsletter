import React from 'react';
import Navbar from '../../shared/components/Navbar';
import Footer from '../../shared/components/Footer';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar theme="dark" />

            <main className="pt-32 pb-24 px-4">
                <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-sm">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 tracking-tight">Privacy Policy</h1>

                    <div className="prose prose-slate prose-lg max-w-none text-slate-600">
                        <p className="lead text-xl text-slate-500 mb-8">
                            Your privacy matters to us at Algarve Newsletter. This policy explains how we handle your personal information.
                        </p>

                        <h3 className="font-bold text-slate-900 text-xl mt-8 mb-4">1. Information We Collect</h3>
                        <p className="mb-6">
                            We collect your email address when you sign up for our newsletter. That's it. We don't ask for your name, phone number, or shoe size.
                        </p>

                        <h3 className="font-bold text-slate-900 text-xl mt-8 mb-4">2. How We Use Your Information</h3>
                        <p className="mb-6">
                            We use your email address solely to send you:
                        </p>
                        <ul className="list-disc pl-6 mb-6 space-y-2">
                            <li>Our weekly newsletter on Thursdays.</li>
                            <li>Occasional updates about important changes to our service.</li>
                        </ul>
                        <p className="mb-6">
                            We never sell, rent, or trade your email address to third parties. We hate spam as much as you do.
                        </p>

                        <h3 className="font-bold text-slate-900 text-xl mt-8 mb-4">3. Unsubscribing</h3>
                        <p className="mb-6">
                            You can unsubscribe at any time by clicking the "Unsubscribe" link at the bottom of any email we send you. Once you unsubscribe, your email is removed from our active list.
                        </p>

                        <h3 className="font-bold text-slate-900 text-xl mt-8 mb-4">4. Contact Us</h3>
                        <p className="mb-6">
                            If you have any questions about this privacy policy, please contact us at:
                            <br />
                            <a href="mailto:hello@algarvenewsletter.pt" className="text-cyan-600 font-bold hover:underline">
                                hello@algarvenewsletter.pt
                            </a>
                        </p>

                        <p className="text-sm text-slate-400 mt-12 pt-8 border-t border-slate-100">
                            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PrivacyPolicy;

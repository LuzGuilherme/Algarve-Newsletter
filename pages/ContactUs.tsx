import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { trackEvent } from '../services/analytics';

const ContactUs: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar theme="dark" />

            <main className="pt-32 pb-24 px-4">
                <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-sm">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 tracking-tight">Contact Us</h1>

                    <div className="prose prose-slate prose-lg max-w-none text-slate-600">
                        <p className="lead text-xl text-slate-500 mb-8">
                            We'd love to hear from you. Whether you have a question, a suggestion, or just want to say hi, here is how you can reach us.
                        </p>

                        <h3 className="font-bold text-slate-900 text-xl mt-8 mb-4">Get in Touch</h3>
                        <p className="mb-6">
                            The best way to reach us is via email. We read every message and try our best to respond within 48 hours.
                        </p>

                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm">
                                📬
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-1">Email Us</p>
                                <a
                                    href="mailto:hello@algarvenewsletter.pt"
                                    className="text-xl md:text-2xl font-black text-cyan-600 hover:text-cyan-700 transition-colors break-all"
                                    onClick={() => trackEvent('contact_click', 'contact', 'email_link')}
                                >
                                    hello@algarvenewsletter.pt
                                </a>
                            </div>
                        </div>

                        <h3 className="font-bold text-slate-900 text-xl mt-8 mb-4">Partnerships</h3>
                        <p className="mb-6">
                            Interested in partnering with Algarve Newsletter to reach thousands of locals and expats? We'd love to chat. Drop us a line at the email above with "Partnership" in the subject line.
                        </p>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ContactUs;

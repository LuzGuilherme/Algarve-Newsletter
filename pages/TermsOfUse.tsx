import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsOfUse: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar theme="dark" />

            <main className="pt-32 pb-24 px-4">
                <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-sm">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 tracking-tight">Terms of Use</h1>

                    <div className="prose prose-slate prose-lg max-w-none text-slate-600">
                        <p className="lead text-xl text-slate-500 mb-8">
                            Welcome to Algarve Newsletter. By subscribing to our newsletter, you agree to these simple terms.
                        </p>

                        <h3 className="font-bold text-slate-900 text-xl mt-8 mb-4">1. Acceptance of Terms</h3>
                        <p className="mb-6">
                            By accessing our website and subscribing to our newsletter, you agree to be bound by these Terms of Use and all applicable laws and regulations.
                        </p>

                        <h3 className="font-bold text-slate-900 text-xl mt-8 mb-4">2. Use of Our Content</h3>
                        <p className="mb-6">
                            The content we provide in our newsletter and on our website is for your personal, non-commercial use and enjoyment. You are welcome to share our newsletter with friends, but please do not republish our content as your own without permission.
                        </p>

                        <h3 className="font-bold text-slate-900 text-xl mt-8 mb-4">3. Accuracy of Information</h3>
                        <p className="mb-6">
                            We try our best to ensure all our tips and recommendations are accurate and up-to-date. However, businesses change their hours, prices, and policies. We recommend checking with the venue directly before planning your visit.
                        </p>

                        <h3 className="font-bold text-slate-900 text-xl mt-8 mb-4">4. Limitation of Liability</h3>
                        <p className="mb-6">
                            Algarve Newsletter is not responsible for any experiences you have at the places we recommend. We are just sharing what we love; your experience is your own adventure.
                        </p>

                        <h3 className="font-bold text-slate-900 text-xl mt-8 mb-4">5. Contact Us</h3>
                        <p className="mb-6">
                            If you have questions about these terms, please contact us at:
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

export default TermsOfUse;

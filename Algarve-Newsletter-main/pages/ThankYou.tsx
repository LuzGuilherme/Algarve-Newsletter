import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, Instagram, Facebook } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ThankYou: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar theme="dark" />

            <main className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-hidden py-32">
                {/* Decorative Background */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-y-1/2"></div>
                    <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-y-1/2"></div>
                </div>

                <div className="relative z-10 max-w-3xl w-full bg-white rounded-[40px] shadow-2xl p-8 md:p-16 text-center animate-fade-in-up border border-slate-100">
                    <div className="inline-flex justify-center items-center w-32 h-32 bg-white rounded-full mb-8 overflow-hidden p-0 animate-fade-in">
                        <img src="/logo-thankyou.png" className="w-full h-full object-contain" alt="Algarve Newsletter Logo" />
                    </div>

                    <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
                        You're In! <span className="text-emerald-600">Welcome.</span>
                    </h1>

                    <p className="text-xl text-slate-500 mb-10 leading-relaxed max-w-xl mx-auto">
                        Your first local secret is being polished and will arrive in your inbox shortly. Get ready to explore the real Algarve.
                    </p>

                    <div className="bg-amber-50 border border-amber-100 rounded-3xl p-8 mb-12 text-left shadow-sm">
                        <div className="flex gap-5">
                            <div className="shrink-0 pt-1">
                                <Mail className="w-8 h-8 text-amber-500" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 text-lg mb-2">Important Next Step</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    To ensure you don't miss our weekly gems, please check your <strong>Spam</strong> or <strong>Promotions</strong> folder.
                                    Found us there? Drag that email to your <strong>Primary</strong> inbox to whitelist us!
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-10">
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Join the Community</p>
                            <div className="flex justify-center gap-4">
                                <a href="https://www.instagram.com/algarve_newsletter/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center bg-slate-50 rounded-full text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 hover:scale-110 transition-all">
                                    <Instagram className="w-6 h-6" />
                                </a>
                                <a href="https://www.facebook.com/profile.php?id=61585564455250" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center bg-slate-50 rounded-full text-slate-400 hover:text-blue-600 hover:bg-blue-50 hover:scale-110 transition-all">
                                    <Facebook className="w-6 h-6" />
                                </a>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-slate-100">
                            <button
                                onClick={() => navigate('/')}
                                className="inline-flex items-center gap-2 text-slate-500 font-bold hover:text-emerald-600 transition-colors py-2"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Home Page
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ThankYou;

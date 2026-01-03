import React, { useState } from 'react';
import { Send, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { subscribeToNewsletter } from '../services/mailerLite';
import { trackLead } from '../services/analytics';

const NewsletterSignup: React.FC = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('submitting');
        try {
            await subscribeToNewsletter(email);
            // Track Lead event
            (window as any).fbq('track', 'Lead');
            trackLead('newsletter_signup');
            setStatus('success');
            setEmail('');
            setTimeout(() => {
                navigate('/thank-you');
                setStatus('idle');
            }, 1500);
        } catch (error) {
            console.error(error);
            setStatus('error');
            alert('Something went wrong. Please try again.');
        }
    };

    return (
        <section className="py-16 md:py-24 px-4 bg-white relative overflow-hidden">
            <div className="max-w-4xl mx-auto text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-6 md:mb-8">
                    <Mail className="w-3 h-3 md:w-4 md:h-4 text-emerald-600" />
                    <span className="text-emerald-800 text-xs md:text-sm font-bold tracking-wide uppercase">Join the Inner Circle</span>
                </div>

                <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 md:mb-6 tracking-tight">
                    Don't Miss the Next<br />
                    <span className="text-emerald-600">Hidden Gem</span> 💎
                </h2>

                <p className="text-slate-500 text-base md:text-lg mb-8 md:mb-10 max-w-xl mx-auto leading-relaxed">
                    Get our weekly curated list of secret spots, local events, and authentic experiences delivered straight to your inbox. No spam, just pure Algarve magic.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto relative">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="flex-1 px-6 py-4 rounded-full bg-slate-50 border-2 border-slate-100 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 text-slate-900 placeholder:text-slate-400 font-medium transition-all"
                        required
                    />
                    <button
                        type="submit"
                        className="px-8 py-4 rounded-full bg-emerald-600 text-white font-bold text-lg hover:bg-emerald-500 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-emerald-900/10 flex items-center justify-center gap-2"
                    >
                        <span>{status === 'submitting' ? 'Subscribing...' : 'Subscribe'}</span>
                        <Send className="w-5 h-5" />
                    </button>

                    {status === 'success' && (
                        <div className="absolute -bottom-12 left-0 w-full text-center text-emerald-600 font-bold animate-fade-in-up">
                            Thanks for joining! Welcome directly to your inbox. 🌊
                        </div>
                    )}
                </form>
            </div>

            {/* Decorative background elements matching the theme */}
            <div className="absolute top-1/2 left-10 w-64 h-64 bg-cyan-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -translate-y-1/2 hidden md:block"></div>
            <div className="absolute top-1/2 right-10 w-72 h-72 bg-emerald-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -translate-y-1/2 hidden md:block"></div>
        </section>
    );
};

export default NewsletterSignup;

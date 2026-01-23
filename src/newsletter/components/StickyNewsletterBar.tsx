import React, { useState, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import { useNewsletterForm } from '../hooks/useNewsletterForm';

interface StickyNewsletterBarProps {
    source?: string;
    scrollThreshold?: number;
}

const StickyNewsletterBar: React.FC<StickyNewsletterBarProps> = ({
    source = 'sticky_bar',
    scrollThreshold = 50
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);
    const { email, setEmail, status, handleSubmit } = useNewsletterForm({
        source,
        redirectDelay: 1000
    });

    useEffect(() => {
        // Check sessionStorage for dismissal
        try {
            const dismissed = sessionStorage.getItem('newsletter_bar_dismissed');
            if (dismissed) {
                setIsDismissed(true);
                return;
            }
        } catch {
            // sessionStorage not available (e.g., private mode)
        }

        const handleScroll = () => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            setIsVisible(scrollPercent >= scrollThreshold);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrollThreshold]);

    const handleDismiss = () => {
        setIsDismissed(true);
        try {
            sessionStorage.setItem('newsletter_bar_dismissed', 'true');
        } catch {
            // sessionStorage not available
        }
    };

    // Hide after successful submission
    useEffect(() => {
        if (status === 'success') {
            setTimeout(() => setIsDismissed(true), 1500);
        }
    }, [status]);

    if (isDismissed) return null;

    return (
        <div
            className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-out
                        ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}
        >
            <div className="bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]
                            px-4 py-3 md:py-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6">
                        {/* Text */}
                        <div className="flex-1 text-center md:text-left">
                            <p className="font-bold text-slate-900 text-sm md:text-base">
                                Get weekly Algarve tips
                            </p>
                            <p className="text-xs text-slate-500 hidden md:block">
                                Hidden gems, local events, and authentic experiences every Thursday.
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="flex gap-2 w-full md:w-auto">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                className="flex-1 md:w-64 px-4 py-3 rounded-lg bg-slate-50 border border-slate-200
                                         focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20
                                         outline-none transition-all text-sm text-slate-900"
                                required
                                disabled={status === 'submitting'}
                            />
                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className="px-5 py-3 rounded-lg bg-[#006D77] text-white font-bold text-sm
                                         hover:bg-[#004E55] transition-all flex items-center gap-2
                                         disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
                            >
                                {status === 'submitting' ? '...' : 'Subscribe'}
                                <Send className="w-4 h-4 hidden md:block" />
                            </button>
                        </form>

                        {/* Close button */}
                        <button
                            onClick={handleDismiss}
                            className="absolute top-2 right-2 md:relative md:top-auto md:right-auto
                                     p-2 text-slate-400 hover:text-slate-600 transition-colors"
                            aria-label="Dismiss newsletter bar"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Success message */}
                    {status === 'success' && (
                        <p className="mt-2 text-center text-sm text-emerald-600 font-semibold">
                            Welcome! Redirecting...
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StickyNewsletterBar;

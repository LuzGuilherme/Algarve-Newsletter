import React from 'react';
import { Mail, Send, Sparkles } from 'lucide-react';
import { useNewsletterForm } from '../../hooks/useNewsletterForm';

interface NewsletterInlineCTAProps {
    source?: string;
}

const NewsletterInlineCTA: React.FC<NewsletterInlineCTAProps> = ({
    source = 'beach_detail_inline'
}) => {
    const { email, setEmail, status, handleSubmit } = useNewsletterForm({ source });

    return (
        <section className="my-8 md:my-12">
            <div className="bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-50 border border-cyan-100 rounded-2xl p-6 md:p-8 relative overflow-hidden">
                {/* Decorative element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />

                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-5 h-5 text-cyan-600" />
                        <span className="text-cyan-700 text-sm font-bold uppercase tracking-wide">
                            Weekly Local Tips
                        </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
                        Discover More Hidden Gems
                    </h3>

                    <p className="text-slate-600 mb-6 max-w-xl">
                        Get weekly local tips, secret spots, and authentic experiences
                        delivered to your inbox every Thursday.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg">
                        <div className="flex-1 relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-slate-200
                                         focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20
                                         outline-none transition-all text-slate-900"
                                required
                                disabled={status === 'submitting'}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={status === 'submitting'}
                            className="px-6 py-3 rounded-xl bg-[#006D77] text-white font-bold
                                     hover:bg-[#004E55] transition-all flex items-center justify-center gap-2
                                     disabled:opacity-70 disabled:cursor-not-allowed
                                     shadow-lg shadow-teal-900/20"
                        >
                            {status === 'submitting' ? 'Joining...' : 'Subscribe Free'}
                            <Send className="w-4 h-4" />
                        </button>
                    </form>

                    {status === 'success' && (
                        <p className="mt-4 text-emerald-600 font-semibold">
                            Welcome aboard! Check your inbox soon.
                        </p>
                    )}

                    {status === 'error' && (
                        <p className="mt-4 text-red-600 font-semibold">
                            Something went wrong. Please try again.
                        </p>
                    )}

                    <p className="mt-4 text-xs text-slate-400">
                        Join 1,000+ subscribers. Free forever. No spam.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default NewsletterInlineCTA;

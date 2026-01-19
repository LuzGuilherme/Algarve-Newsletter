import React from 'react';
import { Send, Waves } from 'lucide-react';
import { useNewsletterForm } from '../../hooks/useNewsletterForm';

interface NewsletterBannerProps {
    source?: string;
}

const NewsletterBanner: React.FC<NewsletterBannerProps> = ({
    source = 'beach_finder_banner'
}) => {
    const { email, setEmail, status, handleSubmit } = useNewsletterForm({ source });

    return (
        <section className="mt-12 mb-8">
            <div className="bg-[#004E55] rounded-2xl p-8 md:p-12 relative overflow-hidden">
                {/* Decorative wave pattern */}
                <div className="absolute inset-0 opacity-10">
                    <Waves className="w-96 h-96 text-white absolute -top-20 -left-20" />
                    <Waves className="w-96 h-96 text-white absolute -bottom-20 -right-20 rotate-180" />
                </div>

                <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                    {/* Text Content */}
                    <div className="flex-1 text-center lg:text-left">
                        <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
                            Love Discovering New Beaches?
                        </h2>
                        <p className="text-white/70 max-w-md mx-auto lg:mx-0">
                            Subscribe to get weekly local tips, hidden gems, and the best
                            of the Algarve delivered to your inbox every Thursday.
                        </p>
                    </div>

                    {/* Form */}
                    <div className="w-full lg:w-auto">
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                className="flex-1 min-w-0 sm:min-w-[280px] px-5 py-4 rounded-xl bg-white/10
                                         border border-white/20 text-white placeholder:text-white/50
                                         focus:bg-white/20 focus:border-white/40 focus:outline-none
                                         transition-all"
                                required
                                disabled={status === 'submitting'}
                            />
                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className="px-8 py-4 rounded-xl bg-white text-[#004E55] font-bold
                                         hover:bg-cyan-50 transition-all flex items-center justify-center gap-2
                                         disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
                            >
                                {status === 'submitting' ? 'Joining...' : 'Join Free'}
                                <Send className="w-4 h-4" />
                            </button>
                        </form>

                        {status === 'success' && (
                            <p className="mt-3 text-emerald-300 font-semibold text-center lg:text-left">
                                Welcome! Check your inbox soon.
                            </p>
                        )}

                        {status === 'error' && (
                            <p className="mt-3 text-red-300 font-semibold text-center lg:text-left">
                                Something went wrong. Please try again.
                            </p>
                        )}

                        <p className="mt-3 text-xs text-white/50 text-center lg:text-left">
                            Join 1,000+ beach lovers. No spam, ever.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsletterBanner;

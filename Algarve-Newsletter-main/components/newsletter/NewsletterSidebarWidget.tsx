import React from 'react';
import { Mail, Send } from 'lucide-react';
import { useNewsletterForm } from '../../hooks/useNewsletterForm';

interface NewsletterSidebarWidgetProps {
    source?: string;
}

const NewsletterSidebarWidget: React.FC<NewsletterSidebarWidgetProps> = ({
    source = 'beach_detail_sidebar'
}) => {
    const { email, setEmail, status, handleSubmit } = useNewsletterForm({ source });

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-cyan-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                    Get Local Tips
                </h3>
            </div>

            <p className="text-sm text-slate-500 mb-4">
                Weekly curated guides to the real Algarve. Hidden spots, local events, authentic experiences.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200
                             focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20
                             outline-none transition-all text-slate-900 text-sm"
                    required
                    disabled={status === 'submitting'}
                />
                <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-3 rounded-xl bg-[#006D77] text-white font-bold text-sm
                             hover:bg-[#004E55] transition-all flex items-center justify-center gap-2
                             disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {status === 'submitting' ? 'Subscribing...' : 'Subscribe Free'}
                    <Send className="w-4 h-4" />
                </button>
            </form>

            {status === 'success' && (
                <p className="mt-3 text-sm text-emerald-600 font-semibold text-center">
                    You're in! Welcome aboard.
                </p>
            )}

            {status === 'error' && (
                <p className="mt-3 text-sm text-red-600 font-semibold text-center">
                    Please try again.
                </p>
            )}

            <p className="mt-3 text-xs text-slate-400 text-center">
                Free. Every Thursday.
            </p>
        </div>
    );
};

export default NewsletterSidebarWidget;

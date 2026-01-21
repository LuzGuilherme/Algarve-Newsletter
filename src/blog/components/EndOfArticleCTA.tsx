import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { subscribeToNewsletter } from '../../../services/mailerLite';
import { trackLead } from '../../../services/analytics';
import { useSubscription } from '../context/SubscriptionContext';

const EndOfArticleCTA: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const { isSubscribed, markAsSubscribed } = useSubscription();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('submitting');
    try {
      await subscribeToNewsletter(email);
      trackLead('blog_end_of_article');
      markAsSubscribed();
      setStatus('success');
      setEmail('');
    } catch (error) {
      console.error('Subscription error:', error);
      setStatus('error');
    }
  };

  if (isSubscribed && status !== 'success') {
    return null;
  }

  if (status === 'success') {
    return (
      <div className="mt-12 p-6 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl">
        <p className="text-emerald-800 font-medium">
          You're all set! Check your inbox for your first Algarve insider tips.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-12 p-6 md:p-8 bg-slate-50 border-l-4 border-[#004E55] rounded-r-xl shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-slate-900 mb-1">
            Enjoyed this article?
          </h3>
          <p className="text-slate-600">
            Get more local insights like this delivered every Thursday.
          </p>
          <p className="text-slate-400 text-sm mt-1">
            Free. Weekly. No spam.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 md:w-auto w-full">
          <div className="relative">
            <Send className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="w-full md:w-56 px-4 py-3 pl-10 rounded-lg bg-white border border-slate-200
                         text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#004E55]
                         focus:ring-2 focus:ring-[#004E55]/20 transition-all"
              required
            />
          </div>
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="px-6 py-3 rounded-lg bg-[#004E55] text-white font-semibold
                       hover:bg-[#003840] transition-all
                       disabled:opacity-70 disabled:cursor-not-allowed
                       whitespace-nowrap"
          >
            {status === 'submitting' ? 'Joining...' : 'Join the Newsletter'}
          </button>
        </form>
      </div>

      {status === 'error' && (
        <p className="mt-4 text-red-600 text-sm">
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
};

export default EndOfArticleCTA;

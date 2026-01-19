import React, { useState } from 'react';
import { Send, Mail } from 'lucide-react';
import { subscribeToNewsletter } from '../../../services/mailerLite';
import { trackLead } from '../../../services/analytics';
import { useSubscription } from '../context/SubscriptionContext';

const InlineSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const { markAsSubscribed } = useSubscription();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('submitting');
    try {
      await subscribeToNewsletter(email);
      // Track Facebook Pixel Lead event
      if ((window as any).fbq) {
        (window as any).fbq('track', 'Lead');
      }
      trackLead('blog_inline_signup');
      markAsSubscribed();
      setStatus('success');
      setEmail('');
    } catch (error) {
      console.error('Subscription error:', error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="my-12 p-8 bg-emerald-50 rounded-3xl text-center border border-emerald-100">
        <span className="text-5xl mb-4 block">🎉</span>
        <h3 className="text-2xl font-bold text-emerald-800 mb-2">
          You're in!
        </h3>
        <p className="text-emerald-700">
          Check your inbox for your first Algarve insider tips.
        </p>
      </div>
    );
  }

  return (
    <div className="my-12 p-8 md:p-10 bg-white rounded-3xl shadow-xl border border-gray-100">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-2 bg-[#004E55] rounded-lg">
          <Mail className="w-4 h-4 text-white" />
        </div>
        <span className="text-sm font-bold uppercase tracking-wide text-[#004E55]">
          Free Every Thursday
        </span>
      </div>

      <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-3">
        Skip the Tourist Traps
      </h3>
      <p className="text-gray-600 mb-6 text-lg leading-relaxed">
        Get the best of Algarve delivered to your inbox every Thursday. <span className="font-semibold text-gray-900">Join 1,000+ readers.</span>
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Send className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="w-full px-5 py-4 pl-12 rounded-xl bg-gray-50 border-2 border-gray-200
                       text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#004E55]
                       focus:ring-2 focus:ring-[#004E55]/20 transition-all text-lg"
            required
          />
        </div>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="px-8 py-4 rounded-xl bg-[#004E55] text-white font-bold text-lg
                     hover:bg-[#003840] transition-all flex items-center justify-center gap-2
                     disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-[#004E55]/30
                     hover:scale-[1.02] active:scale-95"
        >
          {status === 'submitting' ? 'Joining...' : 'Get Free Access'}
        </button>
      </form>

      {status === 'error' && (
        <p className="mt-4 text-red-600 text-sm font-medium">
          Something went wrong. Please try again.
        </p>
      )}

      <p className="mt-4 text-gray-500 text-sm">
        One email per week. Unsubscribe anytime.
      </p>
    </div>
  );
};

export default InlineSignup;

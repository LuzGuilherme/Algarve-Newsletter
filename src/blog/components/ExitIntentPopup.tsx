import React, { useState, useEffect, useCallback } from 'react';
import { X, Send } from 'lucide-react';
import { subscribeToNewsletter } from '../../shared/services/mailerLite';
import { trackLead, trackEvent } from '../../shared/services/analytics';
import { useSubscription } from '../context/SubscriptionContext';

const EXIT_POPUP_SHOWN_KEY = 'algarve_exit_popup_shown';

interface ExitIntentPopupProps {
  articleSlug: string;
}

const ExitIntentPopup: React.FC<ExitIntentPopupProps> = ({ articleSlug }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const { isSubscribed, justSubscribed, markAsSubscribed } = useSubscription();

  const canShowPopup = useCallback((): boolean => {
    if (typeof window === 'undefined') return false;
    if (isSubscribed || justSubscribed) return false;
    if (sessionStorage.getItem(EXIT_POPUP_SHOWN_KEY) === 'true') return false;
    return true;
  }, [isSubscribed, justSubscribed]);

  const showPopup = useCallback(() => {
    if (canShowPopup()) {
      setIsVisible(true);
      sessionStorage.setItem(EXIT_POPUP_SHOWN_KEY, 'true');
      trackEvent('exit_intent_shown', 'blog', articleSlug);
    }
  }, [canShowPopup, articleSlug]);

  const handleDismiss = () => {
    setIsVisible(false);
    trackEvent('exit_intent_dismissed', 'blog', articleSlug);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('submitting');
    try {
      await subscribeToNewsletter(email);
      trackLead('blog_exit_intent');
      markAsSubscribed();
      setStatus('success');
      setEmail('');
    } catch (error) {
      console.error('Subscription error:', error);
      setStatus('error');
    }
  };

  // Desktop: Mouse leave detection
  useEffect(() => {
    const isMobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
    if (isMobile) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        showPopup();
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [showPopup]);

  // Mobile: Scroll depth detection (85%)
  useEffect(() => {
    const isMobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
    if (!isMobile) return;

    let hasTriggered = false;

    const handleScroll = () => {
      if (hasTriggered) return;

      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (window.scrollY / scrollHeight) * 100;

      if (scrollPercent >= 85) {
        hasTriggered = true;
        showPopup();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showPopup]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleDismiss();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 animate-scale-in">
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600
                     hover:bg-slate-100 rounded-full transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {status === 'success' ? (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🎉</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              You're in!
            </h3>
            <p className="text-slate-600">
              Check your inbox for your first Algarve insider tips.
            </p>
            <button
              onClick={handleDismiss}
              className="mt-6 text-[#004E55] font-medium hover:underline"
            >
              Continue reading
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Before you go...
              </h3>
              <p className="text-slate-600">
                Join 1,000+ readers who get the best of Algarve every Thursday.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Send className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-5 py-4 pl-12 rounded-xl bg-slate-50 border border-slate-200
                             text-slate-900 placeholder:text-slate-400 focus:outline-none
                             focus:border-[#004E55] focus:ring-2 focus:ring-[#004E55]/20 transition-all"
                  required
                  autoFocus
                />
              </div>
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full px-6 py-4 rounded-xl bg-[#004E55] text-white font-bold
                           hover:bg-[#003840] transition-all
                           disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? 'Joining...' : 'Subscribe Free'}
              </button>
            </form>

            {status === 'error' && (
              <p className="mt-4 text-red-600 text-sm text-center">
                Something went wrong. Please try again.
              </p>
            )}

            <p className="text-slate-400 text-sm text-center mt-4">
              One email per week. Unsubscribe anytime.
            </p>

            <button
              onClick={handleDismiss}
              className="w-full mt-4 text-slate-400 text-sm hover:text-slate-600
                         hover:underline transition-colors"
            >
              No thanks, I'll explore on my own
            </button>
          </>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ExitIntentPopup;

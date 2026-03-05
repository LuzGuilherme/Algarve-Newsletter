import React, { useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { trackEvent } from '../../shared/services/analytics';

interface GYGBookingCTAProps {
  gygUrl: string;
  campaign: string;
  label?: string;
}

const GYGBookingCTA: React.FC<GYGBookingCTAProps> = ({
  gygUrl,
  campaign,
  label = 'Browse on GetYourGuide',
}) => {
  useEffect(() => {
    trackEvent('affiliate_impression', 'gyg', campaign);
  }, [campaign]);

  const handleClick = () => {
    trackEvent('affiliate_click', 'gyg', campaign);
  };

  return (
    <a
      href={gygUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      onClick={handleClick}
      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-cyan-600 text-white font-bold rounded-xl hover:bg-cyan-700 transition-colors shadow-md hover:shadow-lg"
    >
      {label}
      <ExternalLink className="w-4 h-4" />
    </a>
  );
};

export default GYGBookingCTA;

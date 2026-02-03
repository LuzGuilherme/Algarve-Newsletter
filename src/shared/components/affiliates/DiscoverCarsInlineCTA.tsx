import { Car, ExternalLink } from 'lucide-react';
import { trackEvent } from '@/shared/services/analytics';
import { DISCOVER_CARS } from '@/shared/constants/affiliates';

interface DiscoverCarsInlineCTAProps {
  source: string;
  headline?: string;
  description?: string;
  className?: string;
}

export function DiscoverCarsInlineCTA({
  source,
  headline = 'Need a Rental Car?',
  description = 'Compare prices from 50+ rental companies at Faro Airport. Free cancellation on most bookings.',
  className = '',
}: DiscoverCarsInlineCTAProps) {
  const affiliateLink = DISCOVER_CARS.buildLink(source, 'inline-cta');

  const handleClick = () => {
    trackEvent('affiliate_click', 'discover_cars', `${source}_inline`);
  };

  return (
    <div className={`my-8 ${className}`}>
      <div className="bg-slate-50 border-l-4 border-[#006D77] rounded-r-xl p-5 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Car className="w-5 h-5 text-[#006D77]" />
              <h3 className="font-bold text-slate-900">{headline}</h3>
            </div>
            <p className="text-slate-600 text-sm">
              {description}
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex-shrink-0">
            <a
              href={affiliateLink}
              target="_blank"
              rel="noopener noreferrer sponsored"
              onClick={handleClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#006D77] text-white font-semibold rounded-full hover:bg-[#005a63] transition-colors text-sm"
            >
              Compare Prices
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiscoverCarsInlineCTA;

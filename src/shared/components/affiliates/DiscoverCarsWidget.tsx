import { useEffect, useRef } from 'react';
import { Car } from 'lucide-react';
import { trackEvent } from '@/shared/services/analytics';

interface DiscoverCarsWidgetProps {
  source: string;
  context?: 'beach' | 'day-trip' | 'golf' | 'general';
  className?: string;
}

const contextContent = {
  beach: {
    headline: 'Need a Car to Explore the Beaches?',
    description: 'Many of the Algarve\'s best beaches require a car to reach. Compare prices from 50+ rental companies.',
  },
  'day-trip': {
    headline: 'Explore the Algarve at Your Own Pace',
    description: 'The best day trips need wheels. Compare car rental prices and find the perfect vehicle for your adventure.',
  },
  golf: {
    headline: 'Drive Between Courses with Ease',
    description: 'With golf courses spread across 100km of coastline, a rental car is essential. Compare 50+ providers.',
  },
  general: {
    headline: 'Rent a Car in the Algarve',
    description: 'Compare prices from 50+ rental companies. Free cancellation on most bookings.',
  },
};

export function DiscoverCarsWidget({
  source,
  context = 'general',
  className = ''
}: DiscoverCarsWidgetProps) {
  const content = contextContent[context];
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    trackEvent('affiliate_impression', 'discover_cars', source);
  }, [source]);

  // Build the iframe srcdoc with the exact widget embed code
  const widgetHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
      </style>
    </head>
    <body>
      <div>
        <script
          id="dchwidget"
          src="https://www.discovercars.com/widget.js?v1"
          data-dev-env="com"
          data-location="portugal"
          data-lang="en"
          data-currency="eur"
          data-utm-source="Algarve-Newsletter"
          data-utm-medium="widget"
          data-aff-code="a_aid"
          data-aff-channel="${source}"
          data-autocomplete="on"
          data-style-submit-bg-color="#006D77"
          data-style-submit-font-color="#ffffff"
          data-style-form-bg-color="#ffffff"
          data-style-form-font-color="#000000"
          data-style-submit-text="Search Cars"
          data-style-title-color="#000000"
          data-title-text=""
          async="async"
          data-style_rounded_corners="on"
          data-localization_currency_box="on"
          data-layout_benefits="on"
          data-layout_description="off"
          data-layout_title="off"
          data-layout_supplier_logos="on">
        </script>
      </div>
    </body>
    </html>
  `;

  return (
    <section className={`bg-slate-50 py-12 border-t border-slate-200 ${className}`}>
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-slate-200 mb-4">
            <Car className="w-4 h-4 text-[#006D77]" />
            <span className="text-[#006D77] font-semibold text-sm">Car Rental</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-3">
            {content.headline}
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            {content.description}
          </p>
        </div>

        {/* Widget in iframe */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <iframe
            ref={iframeRef}
            srcDoc={widgetHtml}
            title="Discover Cars Search Widget"
            className="w-full border-0 h-[680px] sm:h-[620px] md:h-[580px]"
            scrolling="no"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          />
        </div>

        {/* Benefits */}
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-slate-600">
          <span className="flex items-center gap-1">
            <span className="text-emerald-500">✓</span> Free cancellation
          </span>
          <span className="flex items-center gap-1">
            <span className="text-emerald-500">✓</span> No hidden fees
          </span>
          <span className="flex items-center gap-1">
            <span className="text-emerald-500">✓</span> Faro Airport pickup
          </span>
        </div>
      </div>
    </section>
  );
}

export default DiscoverCarsWidget;

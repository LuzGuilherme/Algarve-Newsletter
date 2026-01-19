import React, { useEffect, useRef } from 'react';

const GetYourGuideWidget: React.FC = () => {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GetYourGuide widget auto-initializes when the script loads
    // For SPA navigation, we need to trigger a re-scan of the DOM
    const gyg = (window as any).gyg_partner_widget;
    if (gyg && typeof gyg.scan === 'function') {
      gyg.scan();
    }
  }, []);

  return (
    <section className="bg-white py-16 border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2 text-center">
          Book Algarve Experiences
        </h2>
        <p className="text-slate-500 text-center mb-8 max-w-2xl mx-auto">
          Discover the best tours, activities, and hidden gems in the Algarve
        </p>
        <div
          ref={widgetRef}
          data-gyg-widget="auto"
          data-gyg-partner-id="YTNRNDJ"
          data-gyg-cmp="blog "
        ></div>
        <div className="text-center mt-8">
          <a
            href="https://www.getyourguide.com/pt-pt/algarve-l66?sort=rating&order=desc&partner_id=YTNRNDJ&utm_medium=online_publisher&cmp=button-blog"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-block px-6 py-3 bg-cyan-600 text-white font-semibold rounded-full hover:bg-cyan-700 transition-colors"
          >
            See More Activities
          </a>
        </div>
      </div>
    </section>
  );
};

export default GetYourGuideWidget;

import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import BeachFilter from '../components/BeachFilter';
import BeachGrid from '../components/BeachGrid';
import Footer from '../../shared/components/Footer';
import NewsletterBanner from '../../newsletter/components/NewsletterBanner';
import StickyNewsletterBar from '../../newsletter/components/StickyNewsletterBar';
import { Beach, BeachFilters } from '../types';
import { filterBeaches, getEmptyFilters, sortBeaches } from '../utils/filterBeaches';

interface BeachesData {
  beaches: Beach[];
}

// Map URL filter slugs to actual filter values
const URL_FILTER_MAP: Record<string, { category: keyof BeachFilters; value: string }> = {
  'surfing': { category: 'activities', value: 'surfing' },
  'swimming': { category: 'activities', value: 'swimming' },
  'snorkeling': { category: 'activities', value: 'snorkeling' },
  'kayaking': { category: 'activities', value: 'kayaking' },
  'photography': { category: 'activities', value: 'photography' },
  'family-friendly': { category: 'features', value: 'family-friendly' },
  'hidden-gems': { category: 'features', value: 'hidden-gem' },
  'western-algarve': { category: 'region', value: 'western' },
  'central-algarve': { category: 'region', value: 'central' },
  'eastern-algarve': { category: 'region', value: 'eastern' },
  'easy-access': { category: 'difficulty', value: 'easy' },
  'secluded': { category: 'crowdLevel', value: 'secluded' },
  'quiet': { category: 'crowdLevel', value: 'quiet' },
};

const BeachFinder: React.FC = () => {
  const { filter: urlFilter } = useParams<{ filter?: string }>();
  const [beachesData, setBeachesData] = useState<BeachesData | null>(null);
  const [filters, setFilters] = useState<BeachFilters>(getEmptyFilters());
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Load beach data
  useEffect(() => {
    fetch('/data/beaches.json')
      .then((res) => res.json())
      .then((data) => {
        setBeachesData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load beaches:', err);
        setLoading(false);
      });
  }, []);

  // Apply URL filter on load
  useEffect(() => {
    if (urlFilter && URL_FILTER_MAP[urlFilter]) {
      const { category, value } = URL_FILTER_MAP[urlFilter];
      setFilters((prev) => ({
        ...prev,
        [category]: [value],
      }));
    }
  }, [urlFilter]);

  const filteredBeaches = useMemo(() => {
    if (!beachesData) return [];
    const filtered = filterBeaches(beachesData.beaches, filters);
    return sortBeaches(filtered, 'name');
  }, [beachesData, filters]);

  const handleClearFilters = () => {
    setFilters(getEmptyFilters());
  };

  // Generate page title based on filter
  const getPageTitle = () => {
    if (urlFilter) {
      const titleMap: Record<string, string> = {
        'surfing': 'Best Surf Beaches in Algarve',
        'family-friendly': 'Family-Friendly Beaches in Algarve',
        'hidden-gems': 'Hidden Gem Beaches in Algarve',
        'western-algarve': 'Beaches in Western Algarve',
        'secluded': 'Secluded Beaches in Algarve',
      };
      return titleMap[urlFilter] || 'Algarve Beach Finder';
    }
    return 'Algarve Beach Finder';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500">Loading beaches...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{getPageTitle()} | Find Your Perfect Beach</title>
        <meta
          name="description"
          content="Discover the best beaches in the Algarve with our interactive beach finder. Filter by activities, difficulty, crowd level, and more."
        />
        <meta property="og:title" content={`${getPageTitle()} | Algarve Newsletter`} />
        <meta
          property="og:description"
          content="Discover the best beaches in the Algarve with our interactive beach finder."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`https://algarvenewsletter.pt/beaches${urlFilter ? `/${urlFilter}` : ''}`} />

        {/* ItemList Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: getPageTitle(),
            description: 'Best beaches in the Algarve, Portugal',
            numberOfItems: filteredBeaches.length,
            itemListElement: filteredBeaches.slice(0, 10).map((beach, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'Beach',
                name: beach.name,
                description: beach.description,
                url: `https://algarvenewsletter.pt/beaches/${beach.slug}`,
              },
            })),
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <header className="bg-[#004E55] text-white py-16 md:py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <Link to="/" className="inline-block mb-6">
              <img src="/logo-algarve-2.png" alt="Algarve Newsletter" className="h-48 object-contain" />
            </Link>
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
              {getPageTitle()}
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Discover {beachesData?.beaches.length || 0}+ beaches filtered by activities, difficulty, and crowd level.
              Find your perfect Algarve beach.
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden flex items-center justify-center gap-2 bg-white rounded-xl py-3 px-4 shadow-md font-semibold text-slate-700"
            >
              {showMobileFilters ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
            </button>

            {/* Sidebar Filters */}
            <aside
              className={`w-full lg:w-80 flex-shrink-0 ${
                showMobileFilters ? 'block mb-6' : 'hidden lg:block'
              }`}
            >
              <BeachFilter
                filters={filters}
                onChange={setFilters}
                onClear={handleClearFilters}
                totalBeaches={beachesData?.beaches.length || 0}
                filteredCount={filteredBeaches.length}
              />
            </aside>

            {/* Beach Grid */}
            <div className="flex-1">
              <BeachGrid beaches={filteredBeaches} />
            </div>
          </div>

          {/* Newsletter Banner */}
          <NewsletterBanner source="beach_finder_banner" />

          {/* FAQ Section for SEO */}
          <section className="mt-16 bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <FAQItem
                question="What is the best beach in Algarve?"
                answer="The 'best' beach depends on what you're looking for. For families, Praia da Luz offers calm waters and facilities. For surfers, Praia do Amado has the most consistent waves. For hidden gems, Praia da Boneca near Ponta da Piedade is spectacular but challenging to access."
              />
              <FAQItem
                question="Are Algarve beaches crowded?"
                answer="Popular beaches like Praia da Rocha and Praia do Camilo can be busy in summer (July-August). For quieter experiences, visit in May, June, or September, or explore hidden beaches like Praia do Canavial and Praia da Balança."
              />
              <FAQItem
                question="Which Algarve beaches have parking?"
                answer="Most main beaches have parking, though it can be limited and paid during summer. Use our filter to find beaches with parking. Remote hidden beaches often have free but limited parking at viewpoints."
              />
              <FAQItem
                question="What's the water temperature in the Algarve?"
                answer="Atlantic water temperatures range from 15-17°C in winter to 19-22°C in summer. The water is refreshing rather than warm. Many swimmers use wetsuits for extended time in the water, especially in spring and autumn."
              />
            </div>

            {/* FAQ Schema */}
            <script type="application/ld+json">
              {JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'What is the best beach in Algarve?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: "The 'best' beach depends on what you're looking for. For families, Praia da Luz offers calm waters and facilities. For surfers, Praia do Amado has the most consistent waves.",
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Are Algarve beaches crowded?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Popular beaches can be busy in summer (July-August). For quieter experiences, visit in shoulder season or explore hidden beaches.',
                    },
                  },
                ],
              })}
            </script>
          </section>
        </main>

        {/* Sticky Newsletter Bar */}
        <StickyNewsletterBar source="beach_finder_sticky" />

        <Footer />
      </div>
    </>
  );
};

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => (
  <div className="border-b border-slate-100 pb-6 last:border-0">
    <h3 className="text-lg font-semibold text-slate-900 mb-2">{question}</h3>
    <p className="text-slate-600">{answer}</p>
  </div>
);

export default BeachFinder;

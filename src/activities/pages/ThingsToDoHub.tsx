import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import CategoryGrid from '../components/CategoryGrid';
import Footer from '../../shared/components/Footer';
import NewsletterBanner from '../../newsletter/components/NewsletterBanner';
import StickyNewsletterBar from '../../newsletter/components/StickyNewsletterBar';
import GetYourGuideWidget from '../../blog/components/GetYourGuideWidget';
import { ActivitiesData } from '../types';

const ThingsToDoHub: React.FC = () => {
  const [data, setData] = useState<ActivitiesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadData = () => {
    setLoading(true);
    setError(false);
    fetch('/data/activities.json')
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load activities:', err);
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500">Loading activities...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-700 font-semibold mb-4">Failed to load activities.</p>
          <button
            onClick={loadData}
            className="px-6 py-3 bg-cyan-600 text-white font-bold rounded-xl hover:bg-cyan-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const categories = data?.categories || [];

  const faqItems = [
    {
      question: 'What are the best things to do in the Algarve?',
      answer:
        'The top experiences include boat tours to Benagil Cave and Ponta da Piedade, dolphin watching from Lagos or Albufeira, kayaking through sea caves, wine tasting at local vineyards, and surfing on the west coast. Sunset cruises and jeep safaris through the Monchique mountains are also highly recommended.',
    },
    {
      question: 'How much do activities cost in the Algarve?',
      answer:
        'Prices vary widely. Short boat tours and kayak trips start from around \u20AC20\u201330, while full-day experiences like wine tours and jeep safaris range from \u20AC50\u201390. Day trips to Seville or Lisbon are typically \u20AC60\u201395. Most activities offer good value compared to other European destinations.',
    },
    {
      question: 'Do I need to book activities in advance?',
      answer:
        'In July and August, popular activities like boat tours and dolphin watching can sell out days ahead \u2014 booking in advance is recommended. In shoulder season (May\u2013June, September\u2013October), booking 1\u20132 days ahead is usually sufficient. Winter has limited availability for water-based activities.',
    },
    {
      question: 'What activities are available year-round in the Algarve?',
      answer:
        'Cultural sightseeing, food tours, cooking classes, and wine tasting operate year-round. Surfing is available all year (the west coast has waves year-round). Boat tours and water sports run primarily from April/May to October, with limited winter options.',
    },
    {
      question: 'Are Algarve activities suitable for families?',
      answer:
        'Many activities are family-friendly, including catamaran boat tours, dolphin watching, kayaking, jeep safaris, and cultural walking tours. Check individual activity details for minimum age requirements \u2014 some speedboat tours and coasteering may have age restrictions.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Things to Do in Algarve 2026 | Best Tours, Activities & Experiences</title>
        <meta
          name="description"
          content="Discover the best things to do in the Algarve. Book boat tours, dolphin watching, kayaking, wine tasting, surfing & more. Curated local recommendations with prices."
        />
        <meta
          property="og:title"
          content="Things to Do in Algarve 2026 | Best Tours & Activities"
        />
        <meta
          property="og:description"
          content="Discover the best things to do in the Algarve. Book boat tours, dolphin watching, kayaking, wine tasting & more."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://algarvenewsletter.pt/things-to-do" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Things to Do in the Algarve',
            description:
              'Best tours, activities, and experiences in the Algarve, Portugal',
            numberOfItems: categories.length,
            itemListElement: categories.map((cat, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              item: {
                '@type': 'Thing',
                name: cat.name,
                description: cat.description,
                url: `https://algarvenewsletter.pt/things-to-do/${cat.slug}`,
              },
            })),
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://algarvenewsletter.pt',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Things to Do',
                item: 'https://algarvenewsletter.pt/things-to-do',
              },
            ],
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqItems.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
              },
            })),
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-slate-50">
        {/* Hero Header */}
        <header className="bg-[#004E55] text-white py-16 md:py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <Link to="/" className="inline-block mb-6">
              <img
                src="/logo-algarve-2.png"
                alt="Algarve Newsletter"
                className="h-48 object-contain"
              />
            </Link>
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
              Things to Do in the Algarve
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto mb-6">
              Curated tours, activities, and experiences handpicked by locals who know the Algarve
              best. From boat tours and dolphin watching to wine tasting and jeep safaris.
            </p>
            <a
              href="#categories"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#004E55] font-bold rounded-xl hover:bg-cyan-50 transition-colors shadow-lg text-lg"
            >
              Explore {categories.length} Activity Categories
            </a>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          {/* Breadcrumb */}
          <nav className="text-sm text-slate-500 mb-8">
            <Link to="/" className="hover:text-cyan-600">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900 font-medium">Things to Do</span>
          </nav>

          {/* Category Grid */}
          <section id="categories" className="mb-16 scroll-mt-8">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
              Explore by Category
            </h2>
            <p className="text-slate-500 mb-8">
              From boat tours to cultural sightseeing — find the perfect Algarve experience.
            </p>
            <CategoryGrid categories={categories} />
          </section>

          {/* GYG Widget */}
          <GetYourGuideWidget />

          {/* Newsletter Banner */}
          <NewsletterBanner
            source="things_to_do_hub"
            heading="Want the Best Algarve Tips?"
            subtitle="Get weekly insider recommendations on tours, activities, and hidden gems delivered to your inbox every Monday."
          />

          {/* FAQ Section */}
          <section className="mt-16 bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqItems.map((item, i) => (
                <FAQItem key={i} question={item.question} answer={item.answer} />
              ))}
            </div>
          </section>
        </main>

        <StickyNewsletterBar source="things_to_do_hub_sticky" />
        <Footer />
      </div>
    </>
  );
};

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => (
  <details className="border-b border-slate-100 pb-4 last:border-0 group">
    <summary className="flex items-center justify-between cursor-pointer list-none py-2 text-lg font-semibold text-slate-900 hover:text-cyan-700 transition-colors">
      <span>{question}</span>
      <span className="text-slate-400 group-open:rotate-180 transition-transform ml-4 flex-shrink-0">
        &#9662;
      </span>
    </summary>
    <p className="text-slate-600 mt-2 pb-2">{answer}</p>
  </details>
);

export default ThingsToDoHub;

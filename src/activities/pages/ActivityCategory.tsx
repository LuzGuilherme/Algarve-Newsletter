import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams, Navigate } from 'react-router-dom';
import {
  Clock,
  Euro,
  MapPin,
  Calendar,
  CheckCircle,
  Lightbulb,
  ExternalLink,
  Waves,
} from 'lucide-react';
import Footer from '../../shared/components/Footer';
import NewsletterBanner from '../../newsletter/components/NewsletterBanner';
import StickyNewsletterBar from '../../newsletter/components/StickyNewsletterBar';
import GetYourGuideWidget from '../../blog/components/GetYourGuideWidget';
import NewsletterSidebarWidget from '../../newsletter/components/NewsletterSidebarWidget';
import { ActivitiesData, ActivityCategory as CategoryType } from '../types';
import { trackEvent } from '../../shared/services/analytics';

const ActivityCategoryPage: React.FC = () => {
  const { category: categorySlug } = useParams<{ category: string }>();
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

  const category: CategoryType | undefined = useMemo(
    () => data?.categories.find((c) => c.slug === categorySlug),
    [data, categorySlug]
  );

  const relatedCategories = useMemo(
    () =>
      (data?.categories || []).filter((c) => category?.relatedCategories.includes(c.slug)),
    [data, category]
  );

  const campaign = `activities-${category?.slug || 'unknown'}`;

  useEffect(() => {
    if (category) {
      trackEvent('affiliate_impression', 'gyg', campaign);
    }
  }, [campaign, category]);

  const handleGYGClick = (position: string) => {
    trackEvent('affiliate_click', 'gyg', `${campaign}-${position}`);
  };

  const sectionIds = (category?.editorialSections || []).map((s) =>
    s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  );

  const [showMobileCTA, setShowMobileCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowMobileCTA(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-700 font-semibold mb-4">Failed to load activity data.</p>
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

  if (!category) {
    return <Navigate to="/things-to-do" replace />;
  }

  return (
    <>
      <Helmet>
        <title>{category.metaTitle}</title>
        <meta name="description" content={category.metaDescription} />
        <meta property="og:title" content={category.metaTitle} />
        <meta property="og:description" content={category.metaDescription} />
        <meta property="og:type" content="article" />
        <meta
          property="og:image"
          content={`https://algarvenewsletter.pt${category.image}`}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <link
          rel="canonical"
          href={`https://algarvenewsletter.pt/things-to-do/${category.slug}`}
        />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: category.metaTitle,
            description: category.metaDescription,
            image: `https://algarvenewsletter.pt${category.image}`,
            datePublished: '2026-03-01',
            dateModified: '2026-03-03',
            author: {
              '@type': 'Organization',
              name: 'Algarve Newsletter',
              url: 'https://algarvenewsletter.pt',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Algarve Newsletter',
              url: 'https://algarvenewsletter.pt',
              logo: {
                '@type': 'ImageObject',
                url: 'https://algarvenewsletter.pt/logo-algarve-2.png',
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://algarvenewsletter.pt/things-to-do/${category.slug}`,
            },
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
              {
                '@type': 'ListItem',
                position: 3,
                name: category.name,
                item: `https://algarvenewsletter.pt/things-to-do/${category.slug}`,
              },
            ],
          })}
        </script>

        {category.faq.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: category.faq.map((item) => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: item.answer,
                },
              })),
            })}
          </script>
        )}
      </Helmet>

      <div className="min-h-screen bg-slate-50 pb-20 lg:pb-0">
        {/* Hero Header */}
        <header className="relative bg-[#004E55] text-white">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="relative py-16 md:py-20 px-4">
            <div className="max-w-6xl mx-auto text-center">
              <Link to="/" className="inline-block mb-6">
                <img
                  src="/logo-algarve-2.png"
                  alt="Algarve Newsletter"
                  className="h-48 object-contain"
                />
              </Link>
              <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
                {category.name} in the Algarve
              </h1>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">{category.description}</p>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content Column */}
            <div className="lg:col-span-2">
              {/* Breadcrumb */}
              <nav className="text-sm text-slate-500 mb-8">
                <Link to="/" className="hover:text-cyan-600">
                  Home
                </Link>
                <span className="mx-2">/</span>
                <Link to="/things-to-do" className="hover:text-cyan-600">
                  Things to Do
                </Link>
                <span className="mx-2">/</span>
                <span className="text-slate-900 font-medium">{category.name}</span>
              </nav>

              {/* Quick Summary Box + Early CTA (mobile only — sidebar replaces on desktop) */}
              <section className="lg:hidden bg-white rounded-2xl shadow-md p-6 md:p-8 mb-10 border-l-4 border-cyan-600">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 flex-1">
                    <div className="flex items-start gap-2">
                      <Calendar className="w-5 h-5 text-cyan-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                          Best Time
                        </p>
                        <p className="text-sm font-bold text-slate-900">
                          {category.practicalInfo.bestTime}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Euro className="w-5 h-5 text-cyan-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                          Price
                        </p>
                        <p className="text-sm font-bold text-slate-900">
                          {category.practicalInfo.priceRange}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="w-5 h-5 text-cyan-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                          Duration
                        </p>
                        <p className="text-sm font-bold text-slate-900">
                          {category.practicalInfo.typicalDuration}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-5 h-5 text-cyan-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                          Departures
                        </p>
                        <p className="text-sm font-bold text-slate-900">
                          {category.practicalInfo.departures}
                        </p>
                      </div>
                    </div>
                  </div>
                  <a
                    href={category.gygSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    onClick={() => handleGYGClick('early')}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-cyan-600 text-white font-bold rounded-xl hover:bg-cyan-700 transition-colors shadow-md whitespace-nowrap"
                  >
                    Check Availability
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </section>

              {/* Hero Image */}
              <div className="rounded-2xl overflow-hidden shadow-md mb-10">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-64 md:h-80 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>

              {/* Table of Contents */}
              <nav className="bg-slate-50 rounded-2xl shadow-md p-6 mb-10">
                <p className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide">
                  In This Guide
                </p>
                <ul className="space-y-1.5">
                  {category.editorialSections.map((section, i) => (
                    <li key={i}>
                      <a
                        href={`#${sectionIds[i]}`}
                        className="text-sm text-cyan-600 hover:text-cyan-700 hover:underline"
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      href="#what-to-expect"
                      className="text-sm text-cyan-600 hover:text-cyan-700 hover:underline"
                    >
                      What to Expect
                    </a>
                  </li>
                  <li>
                    <a
                      href="#local-tips"
                      className="text-sm text-cyan-600 hover:text-cyan-700 hover:underline"
                    >
                      Local Tips
                    </a>
                  </li>
                  {category.relatedBeaches.length > 0 && (
                    <li>
                      <a
                        href="#related-beaches"
                        className="text-sm text-cyan-600 hover:text-cyan-700 hover:underline"
                      >
                        Related Beaches
                      </a>
                    </li>
                  )}
                  <li>
                    <a
                      href="#faq"
                      className="text-sm text-cyan-600 hover:text-cyan-700 hover:underline"
                    >
                      FAQ
                    </a>
                  </li>
                </ul>
              </nav>

              {/* Editorial Sections — continuous article style */}
              <article className="bg-white rounded-2xl shadow-md p-8 md:p-10 mb-10">
                {category.editorialSections.map((section, i) => (
                  <section
                    key={i}
                    id={sectionIds[i]}
                    className={`scroll-mt-8 ${i > 0 ? 'mt-10 pt-10 border-t border-slate-200' : ''}`}
                  >
                    <h2 className="text-2xl font-bold text-slate-900 mb-4 border-l-4 border-cyan-600 pl-4">{section.title}</h2>
                    <p className="text-slate-700 leading-relaxed text-lg">{section.content}</p>
                  </section>
                ))}
              </article>

              {/* Highlights */}
              <section
                id="what-to-expect"
                className="bg-cyan-50 border border-cyan-100 rounded-2xl shadow-md p-8 md:p-10 mb-10 scroll-mt-8"
              >
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-cyan-600" />
                  What to Expect
                </h2>
                <ul className="space-y-3">
                  {category.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-cyan-600 font-bold mt-0.5">&#10003;</span>
                      <span className="text-slate-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* GYG Booking CTA */}
              <section className="bg-gradient-to-br from-[#004E55] to-[#006D77] rounded-2xl shadow-lg p-8 md:p-10 mb-10 text-white text-center">
                <h2 className="text-2xl md:text-3xl font-black mb-3">Ready to Book?</h2>
                <p className="text-white/80 mb-6 max-w-lg mx-auto">
                  Browse all {category.name.toLowerCase()} available in the Algarve. Compare prices,
                  read reviews, and book instantly.
                </p>
                <a
                  href={category.gygSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  onClick={() => handleGYGClick('mid')}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#004E55] font-bold rounded-xl hover:bg-slate-100 transition-colors shadow-lg text-lg"
                >
                  See All {category.name} on GetYourGuide
                  <ExternalLink className="w-5 h-5" />
                </a>
              </section>

              {/* Local Tips */}
              {category.localTips.length > 0 && (
                <section
                  id="local-tips"
                  className="bg-amber-50 border border-amber-200 rounded-2xl p-8 md:p-10 mb-10 scroll-mt-8"
                >
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Lightbulb className="w-6 h-6 text-amber-500" />
                    Local Tips
                  </h2>
                  <ul className="space-y-3">
                    {category.localTips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-amber-500 font-bold mt-0.5">&#9679;</span>
                        <span className="text-slate-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Related Beaches */}
              {category.relatedBeaches.length > 0 && (
                <section id="related-beaches" className="mb-10 scroll-mt-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Waves className="w-6 h-6 text-cyan-600" />
                    Related Beaches
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {category.relatedBeaches.map((beach) => (
                      <Link
                        key={beach.slug}
                        to={`/beaches/${beach.slug}`}
                        className="group flex items-center gap-4 bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all"
                      >
                        <div className="w-16 h-16 rounded-xl bg-cyan-50 flex items-center justify-center flex-shrink-0">
                          <Waves className="w-6 h-6 text-cyan-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">
                            {beach.name}
                          </h3>
                          <p className="text-sm text-cyan-600">View beach guide &rarr;</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Related Categories (mobile only — sidebar replaces on desktop) */}
              {relatedCategories.length > 0 && (
                <section className="lg:hidden mb-10">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">You Might Also Like</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {relatedCategories.map((related) => (
                      <Link
                        key={related.slug}
                        to={`/things-to-do/${related.slug}`}
                        className="group flex items-center gap-4 bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all"
                      >
                        <img
                          src={related.image}
                          alt={related.name}
                          className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=200';
                          }}
                        />
                        <div>
                          <h3 className="font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">
                            {related.name}
                          </h3>
                          <p className="text-sm text-slate-500 line-clamp-1">{related.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Related Articles */}
              {category.relatedArticles.length > 0 && (
                <section className="mb-10">
                  <h2 className="text-xl font-bold text-slate-900 mb-4">Related Articles</h2>
                  <div className="flex flex-wrap gap-3">
                    {category.relatedArticles.map((slug) => (
                      <Link
                        key={slug}
                        to={`/blog/${slug}`}
                        className="text-sm text-cyan-600 hover:text-cyan-700 bg-cyan-50 px-4 py-2 rounded-full font-medium transition-colors"
                      >
                        {slug
                          .replace(/-/g, ' ')
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Newsletter Banner */}
              <NewsletterBanner
                source={`activities_${category.slug}`}
                heading="Get Local Algarve Tips Weekly"
                subtitle="Join 1,000+ readers who get curated recommendations on the best tours, restaurants, and hidden gems every Monday."
              />

              {/* FAQ Section */}
              {category.faq.length > 0 && (
                <section
                  id="faq"
                  className="mt-16 bg-slate-50 rounded-2xl shadow-lg p-8 md:p-12 scroll-mt-8"
                >
                  <h2 className="text-2xl font-bold text-slate-900 mb-8">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-6">
                    {category.faq.map((item, i) => (
                      <details key={i} className="border-b border-slate-200 pb-4 last:border-0 group">
                        <summary className="flex items-center justify-between cursor-pointer list-none py-2 text-lg font-semibold text-slate-900 hover:text-cyan-700 transition-colors">
                          <span>{item.question}</span>
                          <span className="text-slate-400 group-open:rotate-180 transition-transform ml-4 flex-shrink-0">
                            &#9662;
                          </span>
                        </summary>
                        <p className="text-slate-600 mt-2 pb-2">{item.answer}</p>
                      </details>
                    ))}
                  </div>
                </section>
              )}

              {/* Bottom GYG CTA (mobile only — sidebar replaces on desktop) */}
              <div className="lg:hidden mt-10 text-center">
                <a
                  href={category.gygSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  onClick={() => handleGYGClick('bottom')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-cyan-600 text-white font-bold rounded-xl hover:bg-cyan-700 transition-colors shadow-md hover:shadow-lg"
                >
                  Browse {category.name} on GetYourGuide
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:block">
              <div className="lg:sticky lg:top-4 space-y-6">
                {/* Quick Facts Card */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Facts</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-cyan-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                          Best Time
                        </p>
                        <p className="text-sm font-bold text-slate-900">
                          {category.practicalInfo.bestTime}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Euro className="w-5 h-5 text-cyan-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                          Price Range
                        </p>
                        <p className="text-sm font-bold text-slate-900">
                          {category.practicalInfo.priceRange}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-cyan-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                          Duration
                        </p>
                        <p className="text-sm font-bold text-slate-900">
                          {category.practicalInfo.typicalDuration}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-cyan-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                          Departures
                        </p>
                        <p className="text-sm font-bold text-slate-900">
                          {category.practicalInfo.departures}
                        </p>
                      </div>
                    </div>
                  </div>
                  <a
                    href={category.gygSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    onClick={() => handleGYGClick('sidebar')}
                    className="mt-5 w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-cyan-600 text-white font-bold rounded-xl hover:bg-cyan-700 transition-colors shadow-md"
                  >
                    Check Availability
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {/* Related Categories */}
                {relatedCategories.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-md p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">You Might Also Like</h3>
                    <div className="space-y-3">
                      {relatedCategories.map((related) => (
                        <Link
                          key={related.slug}
                          to={`/things-to-do/${related.slug}`}
                          className="group flex items-center gap-3 hover:bg-slate-50 rounded-xl p-2 -mx-2 transition-colors"
                        >
                          <img
                            src={related.image}
                            alt={related.name}
                            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=200';
                            }}
                          />
                          <span className="font-semibold text-sm text-slate-900 group-hover:text-cyan-700 transition-colors">
                            {related.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Newsletter Sidebar Widget */}
                <NewsletterSidebarWidget source={`activities_${category.slug}_sidebar`} />
              </div>
            </aside>
          </div>
        </main>

        {/* Full-width GYG Widget */}
        <GetYourGuideWidget />

        <StickyNewsletterBar source={`activities_${category.slug}_sticky`} />

        {/* Sticky Mobile GYG CTA */}
        {showMobileCTA && (
          <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-slate-200 shadow-[0_-4px_12px_rgba(0,0,0,0.1)] p-3">
            <a
              href={category.gygSearchUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              onClick={() => handleGYGClick('sticky-mobile')}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-cyan-600 text-white font-bold rounded-xl hover:bg-cyan-700 transition-colors"
            >
              Check {category.name} Availability
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}

        <Footer />
      </div>
    </>
  );
};

export default ActivityCategoryPage;

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowLeft,
  MapPin,
  Car,
  Clock,
  Users,
  Waves,
  Camera,
  ExternalLink,
  Video,
  Navigation,
  ChevronRight,
  ChevronDown,
  Thermometer,
  Sun,
  Leaf,
  Snowflake,
  CloudSun,
  AlertCircle,
  Lightbulb,
  MapPinned,
} from 'lucide-react';
import Footer from '../../shared/components/Footer';
import GetYourGuideWidget from '../../blog/components/GetYourGuideWidget';
import BeachMap from '../components/BeachMap';
import NewsletterInlineCTA from '../../newsletter/components/NewsletterInlineCTA';
import NewsletterSidebarWidget from '../../newsletter/components/NewsletterSidebarWidget';
import StickyNewsletterBar from '../../newsletter/components/StickyNewsletterBar';
import { Beach } from '../types';

interface BeachesData {
  beaches: Beach[];
}

const difficultyColors: Record<string, string> = {
  easy: 'bg-green-100 text-green-700',
  moderate: 'bg-yellow-100 text-yellow-700',
  challenging: 'bg-red-100 text-red-700',
};

const crowdLabels: Record<string, string> = {
  busy: 'Busy',
  moderate: 'Moderate',
  quiet: 'Quiet',
  secluded: 'Secluded',
};

const regionLabels: Record<string, string> = {
  western: 'Western Algarve',
  central: 'Central Algarve',
  eastern: 'Eastern Algarve',
};

const monthNames = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const BeachDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [beach, setBeach] = useState<Beach | null>(null);
  const [allBeaches, setAllBeaches] = useState<Beach[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    setError(null);

    fetch('/data/beaches.json')
      .then((res) => res.json())
      .then((data: BeachesData) => {
        const foundBeach = data.beaches.find((b) => b.slug === slug);
        if (foundBeach) {
          setBeach(foundBeach);
          setAllBeaches(data.beaches);
        } else {
          setError('Beach not found');
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load beach:', err);
        setError('Failed to load beach');
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500">Loading beach...</p>
        </div>
      </div>
    );
  }

  if (error || !beach) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">🏖️</p>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Beach not found</h1>
          <p className="text-slate-500 mb-6">The beach you're looking for doesn't exist.</p>
          <Link
            to="/beaches"
            className="inline-flex items-center gap-2 text-cyan-600 font-semibold hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Beach Finder
          </Link>
        </div>
      </div>
    );
  }

  const canonicalUrl = `https://algarvenewsletter.pt/beaches/${beach.slug}`;
  const googleMapsUrl = `https://www.google.com/maps?q=${beach.coordinates.lat},${beach.coordinates.lng}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${beach.coordinates.lat},${beach.coordinates.lng}`;

  // Get related beaches
  const relatedBeaches = allBeaches
    .filter((b) => beach.relatedBeaches.includes(b.slug))
    .slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{beach.metaTitle}</title>
        <meta name="description" content={beach.metaDescription} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={beach.metaTitle} />
        <meta property="og:description" content={beach.metaDescription} />
        <meta property="og:image" content={beach.image} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={beach.metaTitle} />
        <meta name="twitter:description" content={beach.metaDescription} />
        <meta name="twitter:image" content={beach.image} />

        {/* Beach Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Beach',
            name: beach.name,
            description: beach.description,
            url: canonicalUrl,
            image: beach.image,
            geo: {
              '@type': 'GeoCoordinates',
              latitude: beach.coordinates.lat,
              longitude: beach.coordinates.lng,
            },
            amenityFeature: beach.facilities.map((f) => ({
              '@type': 'LocationFeatureSpecification',
              name: f,
            })),
          })}
        </script>

        {/* Breadcrumb Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Beaches',
                item: 'https://algarvenewsletter.com/beaches',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: regionLabels[beach.region],
                item: `https://algarvenewsletter.com/beaches/${beach.region}-algarve`,
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: beach.name,
                item: canonicalUrl,
              },
            ],
          })}
        </script>

        {/* FAQ Schema */}
        {beach.faq && beach.faq.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: beach.faq.map((item) => ({
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

      <div className="min-h-screen bg-white">
        {/* Back navigation */}
        <nav className="absolute top-0 left-0 right-0 z-50 px-4 md:px-6 py-6 md:py-12">
          <div className="max-w-6xl mx-auto">
            <Link
              to="/beaches"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white
                         bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full
                         transition-colors text-sm font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Beaches
            </Link>
          </div>
        </nav>

        {/* Hero Image */}
        <div className="relative h-[50vh] md:h-[60vh] flex flex-col justify-end">
          <img
            src={beach.image}
            alt={beach.name}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Badges */}
          <div className="w-full px-4 md:px-6 py-6 md:py-12 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-wrap gap-2 mb-4">
                {beach.features.includes('hidden-gem') && (
                  <span className="bg-amber-500 text-white text-sm font-bold px-4 py-1.5 rounded-full">
                    Hidden Gem
                  </span>
                )}
                {beach.webcam?.available && (
                  <span className="bg-red-500 text-white text-sm font-bold px-4 py-1.5 rounded-full flex items-center gap-1">
                    <Video className="w-4 h-4" />
                    Live Cam
                  </span>
                )}
                <span
                  className={`text-sm font-bold px-4 py-1.5 rounded-full capitalize ${difficultyColors[beach.difficulty]}`}
                >
                  {beach.difficulty} access
              </span>
            </div>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-white/70 text-sm mb-2">
              <Link to="/beaches" className="hover:text-white">
                Beaches
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link
                to={`/beaches/${beach.region}-algarve`}
                className="hover:text-white"
              >
                {regionLabels[beach.region]}
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">{beach.name}</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
              {beach.name}
            </h1>
            <p className="text-white/80 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {beach.nearestTown} &bull; {beach.distanceFromTown}
            </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="w-full px-4 md:px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Column */}
              <div className="lg:col-span-2 space-y-8">
                {/* Description */}
                <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  About {beach.name}
                </h2>
                {beach.longDescription ? (
                  <div className="text-slate-600 text-lg leading-relaxed space-y-4">
                    {beach.longDescription.split('\n\n').map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-600 text-lg leading-relaxed">
                    {beach.description}
                  </p>
                )}
              </section>

              {/* Newsletter Inline CTA */}
              <NewsletterInlineCTA source={`beach_detail_inline_${beach.slug}`} />

              {/* Highlights */}
              {beach.highlights.length > 0 && (
                <section>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    Highlights
                  </h3>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {beach.highlights.map((highlight, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-3 bg-cyan-50 text-cyan-800 px-4 py-3 rounded-xl"
                      >
                        <span className="text-cyan-500">✓</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Live Webcam Section */}
              {beach.webcam?.available && (
                <section className="bg-slate-50 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                    <h3 className="text-xl font-bold text-slate-900">
                      Live Beach Cam
                    </h3>
                  </div>
                  <p className="text-slate-600 mb-4">
                    Check current beach conditions before you visit.
                  </p>
                  <a
                    href={beach.webcam.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-cyan-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-cyan-700 transition-colors"
                  >
                    <Video className="w-5 h-5" />
                    View Live Cam
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <p className="text-sm text-slate-400 mt-3">
                    Powered by {beach.webcam.provider}
                  </p>
                </section>
              )}

              {/* Location & Map */}
              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Location
                </h3>
                <div className="mb-4">
                  <BeachMap
                    lat={beach.coordinates.lat}
                    lng={beach.coordinates.lng}
                    name={beach.name}
                  />
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
                  >
                    <MapPin className="w-4 h-4" />
                    Open in Google Maps
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-cyan-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-cyan-700 transition-colors"
                  >
                    <Navigation className="w-4 h-4" />
                    Get Directions
                  </a>
                </div>
              </section>

              {/* How to Get There */}
              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  How to Get There
                </h3>
                <div className="bg-slate-50 rounded-2xl p-6 space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-700 mb-1">Access</h4>
                    <p className="text-slate-600">{beach.access}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-700 mb-1">Parking</h4>
                    <p className="text-slate-600">{beach.parking}</p>
                  </div>
                </div>
              </section>

              {/* Best Time to Visit */}
              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Best Time to Visit
                </h3>
                <div className="flex flex-wrap gap-2">
                  {monthNames.map((month, index) => {
                    const isGood = beach.bestMonths.includes(index + 1);
                    return (
                      <span
                        key={month}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                          isGood
                            ? 'bg-green-100 text-green-700'
                            : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        {month}
                      </span>
                    );
                  })}
                </div>
              </section>

              {/* Seasonal Guide */}
              {beach.seasonalGuide && (
                <section>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    Seasonal Guide
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <SeasonCard
                      icon={<Leaf className="w-5 h-5" />}
                      title="Spring"
                      months="March - May"
                      description={beach.seasonalGuide.spring}
                      color="green"
                    />
                    <SeasonCard
                      icon={<Sun className="w-5 h-5" />}
                      title="Summer"
                      months="June - August"
                      description={beach.seasonalGuide.summer}
                      color="amber"
                    />
                    <SeasonCard
                      icon={<CloudSun className="w-5 h-5" />}
                      title="Autumn"
                      months="September - November"
                      description={beach.seasonalGuide.autumn}
                      color="orange"
                    />
                    <SeasonCard
                      icon={<Snowflake className="w-5 h-5" />}
                      title="Winter"
                      months="December - February"
                      description={beach.seasonalGuide.winter}
                      color="blue"
                    />
                  </div>
                </section>
              )}

              {/* Water Conditions */}
              {beach.waterConditions && (
                <section>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    Water Conditions
                  </h3>
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <Thermometer className="w-5 h-5 text-cyan-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-slate-800">Temperature</h4>
                        <p className="text-slate-600">{beach.waterConditions.temperatureRange}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Waves className="w-5 h-5 text-cyan-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-slate-800">Currents</h4>
                        <p className="text-slate-600">{beach.waterConditions.currents}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-cyan-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-slate-800">Swimming Safety</h4>
                        <p className="text-slate-600">{beach.waterConditions.swimmingSafety}</p>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* FAQ Section */}
              {beach.faq && beach.faq.length > 0 && (
                <section>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    Frequently Asked Questions
                  </h3>
                  <div className="space-y-3">
                    {beach.faq.map((item, index) => (
                      <div
                        key={index}
                        className="border border-slate-200 rounded-xl overflow-hidden"
                      >
                        <button
                          onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                          className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-slate-50 transition-colors"
                        >
                          <span className="font-semibold text-slate-800 pr-4">{item.question}</span>
                          <ChevronDown
                            className={`w-5 h-5 text-slate-500 flex-shrink-0 transition-transform ${
                              openFaqIndex === index ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {openFaqIndex === index && (
                          <div className="px-4 pb-4 bg-slate-50">
                            <p className="text-slate-600">{item.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Photography Tips */}
              {beach.photographyTips && beach.photographyTips.length > 0 && (
                <section>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Camera className="w-5 h-5 text-cyan-600" />
                    Photography Tips
                  </h3>
                  <ul className="space-y-3">
                    {beach.photographyTips.map((tip, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 bg-amber-50 text-amber-900 px-4 py-3 rounded-xl"
                      >
                        <span className="text-amber-500 mt-0.5">📷</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Local Tips */}
              {beach.localTips && beach.localTips.length > 0 && (
                <section>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-cyan-600" />
                    Local Tips
                  </h3>
                  <ul className="space-y-3">
                    {beach.localTips.map((tip, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 bg-purple-50 text-purple-900 px-4 py-3 rounded-xl"
                      >
                        <span className="text-purple-500 mt-0.5">💡</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Nearby Attractions */}
              {beach.nearbyAttractions && beach.nearbyAttractions.length > 0 && (
                <section>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <MapPinned className="w-5 h-5 text-cyan-600" />
                    Nearby Attractions
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {beach.nearbyAttractions.map((attraction, index) => (
                      <div
                        key={index}
                        className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="font-semibold text-slate-900">{attraction.name}</h4>
                          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full whitespace-nowrap">
                            {attraction.distance}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600">{attraction.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Related Articles */}
              {beach.relatedArticles.length > 0 && (
                <section>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    From Our Blog
                  </h3>
                  <div className="space-y-3">
                    {beach.relatedArticles.map((articleSlug) => (
                      <Link
                        key={articleSlug}
                        to={`/blog/${articleSlug}`}
                        className="block bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                      >
                        <span className="text-cyan-600 font-semibold hover:underline">
                          {articleSlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                        </span>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
              {/* Quick Facts Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 lg:sticky lg:top-4">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  Quick Facts
                </h3>
                <div className="space-y-4">
                  <QuickFact
                    icon={<Users className="w-5 h-5" />}
                    label="Crowd Level"
                    value={crowdLabels[beach.crowdLevel]}
                  />
                  <QuickFact
                    icon={<Clock className="w-5 h-5" />}
                    label="Access"
                    value={`${beach.difficulty.charAt(0).toUpperCase() + beach.difficulty.slice(1)}`}
                  />
                  <QuickFact
                    icon={<MapPin className="w-5 h-5" />}
                    label="Region"
                    value={regionLabels[beach.region]}
                  />
                  {beach.features.includes('parking') && (
                    <QuickFact
                      icon={<Car className="w-5 h-5" />}
                      label="Parking"
                      value="Available"
                    />
                  )}
                </div>

                {/* Activities */}
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <h4 className="text-sm font-semibold text-slate-500 mb-3">
                    Activities
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {beach.activities.map((activity) => (
                      <span
                        key={activity}
                        className="text-sm bg-cyan-50 text-cyan-700 px-3 py-1 rounded-full capitalize"
                      >
                        {activity.replace(/-/g, ' ')}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Facilities */}
                {beach.facilities.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-slate-100">
                    <h4 className="text-sm font-semibold text-slate-500 mb-3">
                      Facilities
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {beach.facilities.map((facility) => (
                        <span
                          key={facility}
                          className="text-sm bg-slate-100 text-slate-600 px-3 py-1 rounded-full capitalize"
                        >
                          {facility}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Related Beaches */}
              {relatedBeaches.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">
                    Nearby Beaches
                  </h3>
                  <div className="space-y-3">
                    {relatedBeaches.map((relatedBeach) => (
                      <Link
                        key={relatedBeach.slug}
                        to={`/beaches/${relatedBeach.slug}`}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                      >
                        <img
                          src={relatedBeach.image}
                          alt={relatedBeach.name}
                          className="w-16 h-16 rounded-lg object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=200';
                          }}
                        />
                        <div>
                          <h4 className="font-semibold text-slate-900">
                            {relatedBeach.name}
                          </h4>
                          <p className="text-sm text-slate-500">
                            {relatedBeach.nearestTown}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Newsletter Sidebar Widget */}
              <NewsletterSidebarWidget source={`beach_detail_sidebar_${beach.slug}`} />
              </div>
            </div>
          </div>
        </main>

        {/* GetYourGuide Widget */}
        <GetYourGuideWidget />

        {/* Sticky Newsletter Bar */}
        <StickyNewsletterBar source={`beach_detail_sticky_${beach.slug}`} />

        <Footer />
      </div>
    </>
  );
};

interface QuickFactProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const QuickFact: React.FC<QuickFactProps> = ({ icon, label, value }) => (
  <div className="flex items-center gap-3">
    <div className="text-cyan-600">{icon}</div>
    <div>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="font-semibold text-slate-900">{value}</p>
    </div>
  </div>
);

interface SeasonCardProps {
  icon: React.ReactNode;
  title: string;
  months: string;
  description: string;
  color: 'green' | 'amber' | 'orange' | 'blue';
}

const seasonColors = {
  green: 'bg-green-50 border-green-200 text-green-700',
  amber: 'bg-amber-50 border-amber-200 text-amber-700',
  orange: 'bg-orange-50 border-orange-200 text-orange-700',
  blue: 'bg-blue-50 border-blue-200 text-blue-700',
};

const SeasonCard: React.FC<SeasonCardProps> = ({ icon, title, months, description, color }) => (
  <div className={`rounded-xl border p-4 ${seasonColors[color]}`}>
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <div>
        <h4 className="font-bold">{title}</h4>
        <p className="text-xs opacity-75">{months}</p>
      </div>
    </div>
    <p className="text-sm opacity-90">{description}</p>
  </div>
);

export default BeachDetail;

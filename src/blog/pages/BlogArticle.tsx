import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import ArticleHeader from '../components/ArticleHeader';
import ArticleContent from '../components/ArticleContent';
import RelatedArticles from '../components/RelatedArticles';
import ShareButtons from '../components/ShareButtons';
import InlineSignup from '../components/InlineSignup';
import EndOfArticleCTA from '../components/EndOfArticleCTA';
import ExitIntentPopup from '../components/ExitIntentPopup';
import GetYourGuideWidget from '../components/GetYourGuideWidget';
import Footer from '../../shared/components/Footer';
import { SubscriptionProvider } from '../context/SubscriptionContext';
import { BlogArticle as BlogArticleType, BlogArticleMeta } from '../types';
import { trackArticleView, trackScrollDepth } from '../../shared/services/blogAnalytics';
import type { Restaurant } from '../components/RestaurantMap';

// Lazy load the map component to avoid loading Leaflet for articles without maps
const RestaurantMap = lazy(() => import('../components/RestaurantMap'));

const BlogArticle: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<BlogArticleType | null>(null);
  const [allArticles, setAllArticles] = useState<BlogArticleMeta[]>([]);
  const [mapData, setMapData] = useState<Restaurant[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    setError(null);
    setMapData(null);

    // Check for pre-loaded article data (from SSR/prerender)
    const preloadedScript = document.getElementById('__PRELOADED_ARTICLE__');
    let preloadedArticle: BlogArticleType | null = null;
    if (preloadedScript) {
      try {
        preloadedArticle = JSON.parse(preloadedScript.textContent || '');
        // Remove the script after reading to prevent memory leaks
        preloadedScript.remove();
      } catch (e) {
        console.warn('Failed to parse preloaded article data');
      }
    }

    // Load article data (use preloaded if available and matches slug)
    const articlePromise = preloadedArticle && preloadedArticle.slug === slug
      ? Promise.resolve(preloadedArticle)
      : fetch(`/generated/articles/${slug}.json`).then(res => {
          if (!res.ok) throw new Error('Article not found');
          return res.json();
        });

    Promise.all([
      articlePromise,
      fetch('/generated/blog-index.json').then(res => res.json())
    ])
      .then(async ([articleData, indexData]) => {
        setArticle(articleData);
        setAllArticles(indexData.articles);

        // If article has map data, fetch it
        if (articleData.hasMap && articleData.mapDataFile) {
          try {
            const mapResponse = await fetch(`/data/${articleData.mapDataFile}`);
            if (mapResponse.ok) {
              const mapJson = await mapResponse.json();
              setMapData(mapJson.restaurants || []);
            }
          } catch (mapErr) {
            console.error('Failed to load map data:', mapErr);
          }
        }

        setLoading(false);
        trackArticleView(slug, articleData.title);
      })
      .catch(err => {
        console.error('Failed to load article:', err);
        setError('Article not found');
        setLoading(false);
      });
  }, [slug]);

  // Track scroll depth
  useEffect(() => {
    if (!slug || !article) return;
    const cleanup = trackScrollDepth(slug);
    return cleanup;
  }, [slug, article]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">😕</p>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Article not found</h1>
          <p className="text-slate-500 mb-6">The article you're looking for doesn't exist.</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-cyan-600 font-semibold hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const canonicalUrl = `https://algarvenewsletter.pt/blog/${article.slug}`;

  return (
    <>
      <Helmet>
        <title>{article.title} | Algarve Newsletter</title>
        <meta name="description" content={article.description} />
        <meta name="keywords" content={article.keywords.join(', ')} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.description} />
        <meta property="og:image" content={article.ogImage} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.description} />
        <meta name="twitter:image" content={article.ogImage} />

        {/* Article Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": article.title,
            "description": article.description,
            "image": article.ogImage,
            "datePublished": article.date,
            "dateModified": article.lastModified,
            "author": {
              "@type": "Organization",
              "name": article.author
            },
            "publisher": {
              "@type": "Organization",
              "name": "Algarve Newsletter",
              "logo": {
                "@type": "ImageObject",
                "url": "https://algarvenewsletter.com/logo.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": canonicalUrl
            }
          })}
        </script>
      </Helmet>

      <article className="min-h-screen bg-white">
        {/* Back navigation */}
        <nav className="absolute top-0 left-0 right-0 z-50 p-4 md:p-6">
          <div className="max-w-6xl mx-auto">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white
                         bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full
                         transition-colors text-sm font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
        </nav>

        <ArticleHeader article={article} />

        <div className="max-w-3xl mx-auto px-4 py-12">
          <ArticleContent content={article.content}>
            <InlineSignup />
          </ArticleContent>

          {/* Interactive Map for articles with location data */}
          {article.hasMap && mapData && mapData.length > 0 && (
            <div className="my-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">
                Interactive Map
              </h2>
              <p className="text-slate-600 mb-4">
                Click on the markers to see details and get directions to each location.
              </p>
              <Suspense fallback={
                <div className="h-80 bg-slate-100 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-8 h-8 border-3 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <p className="text-slate-500 text-sm">Loading map...</p>
                  </div>
                </div>
              }>
                <RestaurantMap restaurants={mapData} />
              </Suspense>
            </div>
          )}

          <ShareButtons
            url={`/blog/${article.slug}`}
            title={article.title}
          />

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="mt-8">
              <h4 className="text-sm font-semibold text-slate-500 mb-3">Tags:</h4>
              <div className="flex flex-wrap gap-2">
                {article.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* End of Article CTA */}
          <EndOfArticleCTA />
        </div>

        <GetYourGuideWidget />

        <RelatedArticles
          currentSlug={article.slug}
          categories={article.categories}
          tags={article.tags}
          allArticles={allArticles}
        />

        <Footer />
      </article>

      {/* Exit Intent Popup */}
      <ExitIntentPopup articleSlug={article.slug} />
    </>
  );
};

const BlogArticleWithProvider: React.FC = () => {
  return (
    <SubscriptionProvider>
      <BlogArticle />
    </SubscriptionProvider>
  );
};

export default BlogArticleWithProvider;

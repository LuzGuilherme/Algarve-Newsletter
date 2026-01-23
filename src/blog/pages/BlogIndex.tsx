import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import Footer from '../../shared/components/Footer';
import { BlogIndexData, BlogArticleMeta } from '../types';

type SortOption = 'date' | 'readingTime' | 'title';

const BlogIndex: React.FC = () => {
  const [blogData, setBlogData] = useState<BlogIndexData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('date');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load blog index data
    fetch('/generated/blog-index.json')
      .then(res => res.json())
      .then(data => {
        setBlogData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load blog index:', err);
        setLoading(false);
      });
  }, []);

  const filteredArticles = useMemo(() => {
    if (!blogData) return [];

    let results = blogData.articles;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(a =>
        a.title.toLowerCase().includes(query) ||
        a.description.toLowerCase().includes(query) ||
        a.tags.some(t => t.toLowerCase().includes(query)) ||
        a.categories.some(c => c.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      results = results.filter(a =>
        selectedCategories.some(cat => a.categories.includes(cat))
      );
    }

    // Sort
    results = [...results].sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'readingTime':
          return a.readingTime - b.readingTime;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return results;
  }, [blogData, searchQuery, selectedCategories, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500">Loading articles...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Algarve Travel Blog | Local Tips & Hidden Gems</title>
        <meta name="description" content="Discover the real Algarve through our curated travel guides. Hidden beaches, local restaurants, hiking trails, and insider tips from locals." />
        <meta property="og:title" content="Algarve Travel Blog | Local Tips & Hidden Gems" />
        <meta property="og:description" content="Discover the real Algarve through our curated travel guides. Hidden beaches, local restaurants, hiking trails, and insider tips." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://algarvenewsletter.pt/blog" />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-[#004E55] text-white py-16 md:py-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Link to="/" className="inline-block mb-8">
              <img src="/logo-algarve-2.png" alt="Algarve Newsletter" className="h-48 object-contain mx-auto" />
            </Link>
            <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
              Algarve Travel Blog
            </h1>
            <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto">
              Evergreen guides to the best kept secrets of southern Portugal.
              Written by locals, for explorers.
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 py-12">
          {/* Filters */}
          <div className="mb-10 space-y-4">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                className="w-full lg:w-96"
              />
              <div className="flex-1" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700
                           focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
              >
                <option value="date">Newest First</option>
                <option value="readingTime">Quick Reads</option>
                <option value="title">A-Z</option>
              </select>
            </div>

            {blogData && blogData.categories.length > 0 && (
              <CategoryFilter
                categories={blogData.categories}
                selected={selectedCategories}
                onChange={setSelectedCategories}
              />
            )}
          </div>

          {/* Results count */}
          <p className="text-slate-500 text-sm mb-6">
            {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
          </p>

          {/* Article Grid */}
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map(article => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-6xl mb-4">🔍</p>
              <h3 className="text-xl font-bold text-slate-700 mb-2">No articles found</h3>
              <p className="text-slate-500">
                Try adjusting your search or filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategories([]);
                }}
                className="mt-4 text-cyan-600 font-semibold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BlogIndex;

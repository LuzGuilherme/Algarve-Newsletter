import React, { useMemo } from 'react';
import ArticleCard from './ArticleCard';
import { BlogArticleMeta } from '../types';

interface RelatedArticlesProps {
  currentSlug: string;
  categories: string[];
  tags: string[];
  allArticles: BlogArticleMeta[];
  limit?: number;
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({
  currentSlug,
  categories,
  tags,
  allArticles,
  limit = 3
}) => {
  const relatedArticles = useMemo(() => {
    // Score each article based on shared taxonomy
    const scored = allArticles
      .filter(a => a.slug !== currentSlug)
      .map(article => {
        let score = 0;

        // Category matches (weighted higher)
        article.categories.forEach(cat => {
          if (categories.includes(cat)) score += 3;
        });

        // Tag matches
        article.tags.forEach(tag => {
          if (tags.includes(tag)) score += 1;
        });

        return { article, score };
      });

    // Sort by score descending, then by date
    scored.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.article.date).getTime() - new Date(a.article.date).getTime();
    });

    // Return top N articles with score > 0
    return scored
      .filter(s => s.score > 0)
      .slice(0, limit)
      .map(s => s.article);
  }, [currentSlug, categories, tags, allArticles, limit]);

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <section className="bg-slate-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-8 text-center">
          You Might Also Like
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {relatedArticles.map(article => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedArticles;

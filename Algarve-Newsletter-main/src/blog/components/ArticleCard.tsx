import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar } from 'lucide-react';
import { BlogArticleMeta } from '../types';

interface ArticleCardProps {
  article: BlogArticleMeta;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <Link
      to={`/blog/${article.slug}`}
      className="group block bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={article.ogImage}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800';
          }}
        />
        {article.featured && (
          <span className="absolute top-4 left-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-3">
          {article.categories.slice(0, 2).map(cat => (
            <span
              key={cat}
              className="text-xs font-bold text-cyan-700 bg-cyan-50 px-2 py-1 rounded-full capitalize"
            >
              {cat.replace(/-/g, ' ')}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-cyan-700 transition-colors line-clamp-2">
          {article.title}
        </h3>

        {/* Description */}
        <p className="text-slate-500 text-sm mb-4 line-clamp-2">
          {article.description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formattedDate}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {article.readingTime} min read
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;

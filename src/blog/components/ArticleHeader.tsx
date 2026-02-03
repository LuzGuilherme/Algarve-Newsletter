import React from 'react';
import { Clock, Calendar, User } from 'lucide-react';
import { BlogArticle } from '../types';

interface ArticleHeaderProps {
  article: BlogArticle;
}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({ article }) => {
  const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="relative">
      {/* Hero Image */}
      <div className="relative h-[40vh] min-h-[300px] md:h-[50vh] md:min-h-[400px]">
        <img
          src={article.ogImage}
          alt={article.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1600';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-3xl mx-auto">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-4">
              {article.categories.map(cat => (
                <span
                  key={cat}
                  className="text-xs font-bold text-white bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full capitalize"
                >
                  {cat.replace(/-/g, ' ')}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
              {article.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-white/80 text-sm">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {article.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {article.readingTime} min read
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ArticleHeader;

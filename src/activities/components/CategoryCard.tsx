import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Clock, Euro } from 'lucide-react';
import { ActivityCategory } from '../types';

interface CategoryCardProps {
  category: ActivityCategory;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link
      to={`/things-to-do/${category.slug}`}
      className="group block bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={category.image}
          alt={`${category.name} activities in the Algarve`}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white mb-1 group-hover:underline">
            {category.name}
          </h3>
        </div>
      </div>
      <div className="p-5">
        <p className="text-slate-500 text-sm line-clamp-2 mb-3">{category.description}</p>
        {category.highlights.length > 0 && (
          <p className="text-slate-700 text-sm font-medium mb-3 flex items-start gap-1.5">
            <span className="text-cyan-600 mt-0.5">&#10003;</span>
            <span className="line-clamp-1">{category.highlights[0]}</span>
          </p>
        )}
        <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
          <span className="flex items-center gap-1">
            <Euro className="w-3.5 h-3.5" />
            {category.practicalInfo.priceRange}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {category.practicalInfo.typicalDuration}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-cyan-600 group-hover:text-cyan-700 transition-colors">
            Explore
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
          <span className="text-xs text-slate-400">
            {category.editorialSections.length} guides &bull; {category.faq.length} FAQs
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;

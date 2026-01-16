import React from 'react';
import { CategoryCount } from '../types';

interface CategoryFilterProps {
  categories: CategoryCount[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selected, onChange }) => {
  const toggleCategory = (categorySlug: string) => {
    if (selected.includes(categorySlug)) {
      onChange(selected.filter(c => c !== categorySlug));
    } else {
      onChange([...selected, categorySlug]);
    }
  };

  const clearAll = () => onChange([]);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-semibold text-slate-500 mr-2">Filter:</span>

      {categories.map(cat => (
        <button
          key={cat.slug}
          onClick={() => toggleCategory(cat.slug)}
          className={`
            px-4 py-2 rounded-full text-sm font-semibold transition-all
            ${selected.includes(cat.slug)
              ? 'bg-cyan-600 text-white shadow-md'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }
          `}
        >
          {cat.name.replace(/-/g, ' ')}
          <span className="ml-1 opacity-60">({cat.count})</span>
        </button>
      ))}

      {selected.length > 0 && (
        <button
          onClick={clearAll}
          className="px-3 py-2 text-sm text-slate-500 hover:text-slate-700 underline"
        >
          Clear all
        </button>
      )}
    </div>
  );
};

export default CategoryFilter;

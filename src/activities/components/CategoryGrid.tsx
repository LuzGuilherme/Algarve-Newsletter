import React from 'react';
import { ActivityCategory } from '../types';
import CategoryCard from './CategoryCard';

interface CategoryGridProps {
  categories: ActivityCategory[];
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ categories }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <CategoryCard key={category.slug} category={category} />
      ))}
    </div>
  );
};

export default CategoryGrid;

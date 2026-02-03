import React from 'react';
import { Beach } from '../types';
import BeachCard from './BeachCard';

interface BeachGridProps {
  beaches: Beach[];
}

const BeachGrid: React.FC<BeachGridProps> = ({ beaches }) => {
  if (beaches.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🏖️</div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">No beaches found</h3>
        <p className="text-slate-500">
          Try adjusting your filters to find more beaches.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {beaches.map((beach) => (
        <BeachCard key={beach.id} beach={beach} />
      ))}
    </div>
  );
};

export default BeachGrid;

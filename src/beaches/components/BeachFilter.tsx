import React from 'react';
import { X } from 'lucide-react';
import {
  BeachFilters,
  ACTIVITY_OPTIONS,
  FEATURE_OPTIONS,
  DIFFICULTY_OPTIONS,
  REGION_OPTIONS,
  CROWD_OPTIONS,
} from '../types';

interface BeachFilterProps {
  filters: BeachFilters;
  onChange: (filters: BeachFilters) => void;
  onClear: () => void;
  totalBeaches: number;
  filteredCount: number;
}

const BeachFilter: React.FC<BeachFilterProps> = ({
  filters,
  onChange,
  onClear,
  totalBeaches,
  filteredCount,
}) => {
  const toggleFilter = (
    category: keyof BeachFilters,
    value: string
  ) => {
    const current = filters[category];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange({ ...filters, [category]: updated });
  };

  const hasActiveFilters =
    filters.activities.length > 0 ||
    filters.features.length > 0 ||
    filters.difficulty.length > 0 ||
    filters.region.length > 0 ||
    filters.crowdLevel.length > 0;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="text-sm text-cyan-600 hover:text-cyan-700 flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Clear all
          </button>
        )}
      </div>

      {/* Results count */}
      <div className="mb-6 pb-6 border-b border-slate-100">
        <p className="text-sm text-slate-500">
          Showing <span className="font-bold text-slate-900">{filteredCount}</span> of{' '}
          {totalBeaches} beaches
        </p>
      </div>

      {/* Activities */}
      <FilterSection title="Activities">
        {ACTIVITY_OPTIONS.map((option) => (
          <FilterChip
            key={option.value}
            label={option.label}
            isSelected={filters.activities.includes(option.value)}
            onClick={() => toggleFilter('activities', option.value)}
          />
        ))}
      </FilterSection>

      {/* Features */}
      <FilterSection title="Features">
        {FEATURE_OPTIONS.map((option) => (
          <FilterChip
            key={option.value}
            label={option.label}
            isSelected={filters.features.includes(option.value)}
            onClick={() => toggleFilter('features', option.value)}
          />
        ))}
      </FilterSection>

      {/* Difficulty */}
      <FilterSection title="Access Difficulty">
        {DIFFICULTY_OPTIONS.map((option) => (
          <FilterChip
            key={option.value}
            label={option.label}
            isSelected={filters.difficulty.includes(option.value)}
            onClick={() => toggleFilter('difficulty', option.value)}
          />
        ))}
      </FilterSection>

      {/* Region */}
      <FilterSection title="Region">
        {REGION_OPTIONS.map((option) => (
          <FilterChip
            key={option.value}
            label={option.label}
            isSelected={filters.region.includes(option.value)}
            onClick={() => toggleFilter('region', option.value)}
          />
        ))}
      </FilterSection>

      {/* Crowd Level */}
      <FilterSection title="Crowd Level">
        {CROWD_OPTIONS.map((option) => (
          <FilterChip
            key={option.value}
            label={option.label}
            isSelected={filters.crowdLevel.includes(option.value)}
            onClick={() => toggleFilter('crowdLevel', option.value)}
          />
        ))}
      </FilterSection>
    </div>
  );
};

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
}

const FilterSection: React.FC<FilterSectionProps> = ({ title, children }) => (
  <div className="mb-6 pb-6 border-b border-slate-100 last:border-0 last:mb-0 last:pb-0">
    <h4 className="text-sm font-semibold text-slate-700 mb-3">{title}</h4>
    <div className="flex flex-wrap gap-2">{children}</div>
  </div>
);

interface FilterChipProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const FilterChip: React.FC<FilterChipProps> = ({ label, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={`
      px-3 py-1.5 rounded-full text-sm font-medium transition-all
      ${
        isSelected
          ? 'bg-cyan-600 text-white shadow-md'
          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
      }
    `}
  >
    {label}
  </button>
);

export default BeachFilter;

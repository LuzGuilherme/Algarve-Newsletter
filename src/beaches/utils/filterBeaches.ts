import { Beach, BeachFilters } from '../types';

export const filterBeaches = (beaches: Beach[], filters: BeachFilters): Beach[] => {
  return beaches.filter((beach) => {
    // Activities filter
    if (filters.activities.length > 0) {
      const hasActivity = filters.activities.some((activity) =>
        beach.activities.includes(activity)
      );
      if (!hasActivity) return false;
    }

    // Features filter
    if (filters.features.length > 0) {
      const hasFeature = filters.features.some((feature) =>
        beach.features.includes(feature)
      );
      if (!hasFeature) return false;
    }

    // Difficulty filter
    if (filters.difficulty.length > 0) {
      if (!filters.difficulty.includes(beach.difficulty)) return false;
    }

    // Region filter
    if (filters.region.length > 0) {
      if (!filters.region.includes(beach.region)) return false;
    }

    // Crowd level filter
    if (filters.crowdLevel.length > 0) {
      if (!filters.crowdLevel.includes(beach.crowdLevel)) return false;
    }

    return true;
  });
};

export const getEmptyFilters = (): BeachFilters => ({
  activities: [],
  features: [],
  difficulty: [],
  region: [],
  crowdLevel: [],
});

export const sortBeaches = (
  beaches: Beach[],
  sortBy: 'name' | 'crowdLevel' | 'difficulty'
): Beach[] => {
  const sorted = [...beaches];

  switch (sortBy) {
    case 'name':
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'crowdLevel':
      const crowdOrder = ['secluded', 'quiet', 'moderate', 'busy'];
      sorted.sort(
        (a, b) => crowdOrder.indexOf(a.crowdLevel) - crowdOrder.indexOf(b.crowdLevel)
      );
      break;
    case 'difficulty':
      const difficultyOrder = ['easy', 'moderate', 'challenging'];
      sorted.sort(
        (a, b) =>
          difficultyOrder.indexOf(a.difficulty) - difficultyOrder.indexOf(b.difficulty)
      );
      break;
  }

  return sorted;
};

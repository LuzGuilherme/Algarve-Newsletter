export interface Beach {
  id: string;
  slug: string;
  name: string;
  alternativeNames: string[];

  // Location
  region: 'western' | 'central' | 'eastern';
  nearestTown: string;
  distanceFromTown: string;
  coordinates: {
    lat: number;
    lng: number;
  };

  // Discovery
  description: string;
  highlights: string[];

  // Filters
  activities: string[];
  features: string[];
  difficulty: 'easy' | 'moderate' | 'challenging';
  crowdLevel: 'busy' | 'moderate' | 'quiet' | 'secluded';
  bestMonths: number[];

  // Practical
  parking: string;
  access: string;
  facilities: string[];

  // Media
  image: string;
  images: string[];

  // Live Webcam
  webcam?: {
    available: boolean;
    url: string;
    provider: string;
  };

  // Linking
  relatedArticles: string[];
  relatedBeaches: string[];
  getYourGuideQuery: string;

  // SEO
  metaTitle: string;
  metaDescription: string;

  // Extended SEO Content (optional)
  longDescription?: string;

  faq?: Array<{
    question: string;
    answer: string;
  }>;

  seasonalGuide?: {
    spring: string;
    summer: string;
    autumn: string;
    winter: string;
  };

  waterConditions?: {
    temperatureRange: string;
    currents: string;
    swimmingSafety: string;
  };

  photographyTips?: string[];

  localTips?: string[];

  nearbyAttractions?: Array<{
    name: string;
    distance: string;
    description: string;
  }>;
}

export interface BeachFilters {
  activities: string[];
  features: string[];
  difficulty: string[];
  region: string[];
  crowdLevel: string[];
}

export const ACTIVITY_OPTIONS = [
  { value: 'swimming', label: 'Swimming' },
  { value: 'surfing', label: 'Surfing' },
  { value: 'snorkeling', label: 'Snorkeling' },
  { value: 'kayaking', label: 'Kayaking' },
  { value: 'photography', label: 'Photography' },
  { value: 'hiking', label: 'Hiking' },
  { value: 'cliff-jumping', label: 'Cliff Jumping' },
] as const;

export const FEATURE_OPTIONS = [
  { value: 'family-friendly', label: 'Family Friendly' },
  { value: 'hidden-gem', label: 'Hidden Gem' },
  { value: 'parking', label: 'Has Parking' },
  { value: 'restaurant', label: 'Has Restaurant' },
  { value: 'lifeguard', label: 'Lifeguard' },
  { value: 'sea-caves', label: 'Sea Caves' },
  { value: 'rock-pools', label: 'Rock Pools' },
  { value: 'nudist-friendly', label: 'Nudist Friendly' },
] as const;

export const DIFFICULTY_OPTIONS = [
  { value: 'easy', label: 'Easy Access' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'challenging', label: 'Challenging' },
] as const;

export const REGION_OPTIONS = [
  { value: 'western', label: 'Western Algarve' },
  { value: 'central', label: 'Central Algarve' },
  { value: 'eastern', label: 'Eastern Algarve' },
] as const;

export const CROWD_OPTIONS = [
  { value: 'busy', label: 'Busy' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'quiet', label: 'Quiet' },
  { value: 'secluded', label: 'Secluded' },
] as const;

import type { GuideBeach, BeachCategory } from '../types/guide';

// Type for the raw beach data from beaches.json
interface RawBeach {
  id: string;
  name: string;
  coordinates: { lat: number; lng: number };
  description: string;
  highlights: string[];
  features: string[];
  difficulty: 'easy' | 'moderate' | 'challenging';
  crowdLevel: 'busy' | 'moderate' | 'quiet' | 'secluded';
  bestMonths: number[];
  parking: string;
  access: string;
  facilities: string[];
  image: string;
  longDescription?: string;
  seasonalGuide?: {
    spring: string;
    summer: string;
    autumn: string;
    winter: string;
  };
  localTips?: string[];
  faq?: Array<{ question: string; answer: string }>;
}

// Curated beach selection with categories
// These are the best beaches for the guide, hand-picked for quality
export const CURATED_BEACHES: Record<BeachCategory, string[]> = {
  'hidden-coves': [
    'praia-do-pinhao',
    'praia-do-carvalho',
    'praia-da-ilha-da-fuseta',
    'praia-de-albandeira',
    'praia-do-paraiso',
    'praia-dos-caneiros',
  ],
  'family-friendly': [
    'praia-da-luz',
    'praia-da-coelha',
    'praia-de-salema',
    'praia-da-falesia',
    'praia-da-ingrina',
  ],
  'wild-dramatic': [
    'praia-do-castelejo',
    'praia-da-cordoama',
    'praia-do-amado',
    'praia-do-beliche',
    'praia-do-telheiro',
  ],
  'sunrise-sunset': [
    'praia-da-marinha',
    'benagil-beach',
    'praia-do-tonel',
    'ilha-deserta',
  ],
};

// Get all curated beach IDs as a flat array
export function getCuratedBeachIds(): string[] {
  return Object.values(CURATED_BEACHES).flat();
}

// Extract vibe line from description (first sentence or highlight summary)
function extractVibeLine(beach: RawBeach): string {
  // Use first sentence of description
  const firstSentence = beach.description.split('.')[0];
  if (firstSentence.length < 100) {
    return firstSentence + '.';
  }
  // If too long, use highlights
  return beach.highlights.slice(0, 3).join('. ') + '.';
}

// Extract best time from seasonal guide or generate from data
function extractBestTime(beach: RawBeach): string {
  if (beach.seasonalGuide?.summer) {
    // Extract the key timing advice from summer guide
    const summer = beach.seasonalGuide.summer;
    if (summer.includes('early') || summer.includes('before')) {
      return 'Arrive before 10am in summer to beat the crowds. Best months: May-September.';
    }
    if (summer.includes('afternoon')) {
      return 'Late afternoon offers pleasant shade. Best months: May-September.';
    }
  }

  // Generate based on crowd level
  switch (beach.crowdLevel) {
    case 'busy':
      return 'Arrive before 9am in summer. Off-season (Oct-Apr) offers peaceful visits.';
    case 'moderate':
      return 'Early morning or late afternoon in summer. Spring/autumn are ideal.';
    case 'quiet':
      return 'Flexible timing. Rarely crowded even in peak summer.';
    case 'secluded':
      return 'Any time works — this beach stays empty year-round.';
    default:
      return 'Best visited May-September. Morning hours recommended.';
  }
}

// Generate skip if advice based on beach characteristics
function deriveSkipIf(beach: RawBeach): string {
  const skipReasons: string[] = [];

  if (beach.difficulty === 'challenging') {
    skipReasons.push('you have mobility issues or young children');
  }

  if (beach.access?.toLowerCase().includes('stair') || beach.access?.toLowerCase().includes('climb')) {
    skipReasons.push('steep stairs are a problem');
  }

  if (beach.facilities.length === 0) {
    skipReasons.push('you need facilities (toilets, restaurants)');
  }

  if (beach.features?.includes('nudist-friendly')) {
    skipReasons.push('nudity makes you uncomfortable');
  }

  if (beach.crowdLevel === 'busy') {
    skipReasons.push('you hate crowds (unless visiting off-season or early morning)');
  }

  if (skipReasons.length === 0) {
    return 'No major caveats — this beach works for most visitors.';
  }

  return 'Skip if ' + skipReasons.join(' or ') + '.';
}

// Generate personal take from local tips or FAQ
function extractPersonalTake(beach: RawBeach): string {
  // Use first local tip if available
  if (beach.localTips && beach.localTips.length > 0) {
    return beach.localTips[0];
  }

  // Use first FAQ answer if available
  if (beach.faq && beach.faq.length > 0) {
    const bestFaq = beach.faq.find(
      (f) =>
        f.question.toLowerCase().includes('best time') ||
        f.question.toLowerCase().includes('recommend')
    );
    if (bestFaq) {
      return bestFaq.answer.split('.')[0] + '.';
    }
  }

  // Generate based on highlights
  return `One of my favorites for ${beach.highlights[0]?.toLowerCase() || 'the atmosphere'}. ${beach.highlights[1] ? 'The ' + beach.highlights[1].toLowerCase() + ' makes it special.' : ''}`;
}

// Transform a raw beach to guide format
export function transformBeachForGuide(
  beach: RawBeach,
  category: BeachCategory
): GuideBeach {
  return {
    id: beach.id,
    name: beach.name,
    category,
    coordinates: beach.coordinates,
    vibeLine: extractVibeLine(beach),
    bestTime: extractBestTime(beach),
    parking: beach.parking || 'Limited parking available',
    facilities: beach.facilities,
    personalTake: extractPersonalTake(beach),
    skipIf: deriveSkipIf(beach),
    image: beach.image,
  };
}

// Filter and transform beaches for the guide
export function selectBeachesForGuide(allBeaches: RawBeach[]): GuideBeach[] {
  const guideBeaches: GuideBeach[] = [];

  // Process each category
  for (const [category, beachIds] of Object.entries(CURATED_BEACHES) as [
    BeachCategory,
    string[],
  ][]) {
    for (const beachId of beachIds) {
      const beach = allBeaches.find((b) => b.id === beachId);
      if (beach) {
        guideBeaches.push(transformBeachForGuide(beach, category));
      }
    }
  }

  return guideBeaches;
}

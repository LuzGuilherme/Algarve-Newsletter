export interface FAQ {
  question: string;
  answer: string;
}

export interface PracticalInfo {
  bestTime: string;
  priceRange: string;
  typicalDuration: string;
  departures: string;
}

export interface EditorialSection {
  title: string;
  content: string;
}

export interface RelatedBeach {
  slug: string;
  name: string;
}

export interface ActivityCategory {
  slug: string;
  name: string;
  description: string;
  editorialSections: EditorialSection[];
  image: string;
  metaTitle: string;
  metaDescription: string;
  gygSearchUrl: string;
  highlights: string[];
  practicalInfo: PracticalInfo;
  localTips: string[];
  faq: FAQ[];
  relatedCategories: string[];
  relatedArticles: string[];
  relatedBeaches: RelatedBeach[];
}

export interface ActivitiesData {
  categories: ActivityCategory[];
}

// TypeScript interfaces for The Algarve Secret Guide PDF

// ============ GUIDE CONFIGURATION ============
export interface GuideConfig {
  version: string;
  lastUpdated: string;
  author: {
    name: string;
    bio: string;
  };
  curatedBeachIds: string[];
  howToUse: string[];
}

// ============ BEACH ============
export type BeachCategory = 'hidden-coves' | 'family-friendly' | 'wild-dramatic' | 'sunrise-sunset';

export interface GuideBeach {
  id: string;
  name: string;
  category: BeachCategory;
  coordinates: { lat: number; lng: number };
  vibeLine: string;
  bestTime: string;
  parking: string;
  facilities: string[];
  personalTake: string;
  skipIf: string;
  image?: string;
}

// ============ RESTAURANT ============
export type RestaurantCategory =
  | 'traditional'
  | 'seafood'
  | 'hidden-gem'
  | 'splurge'
  | 'quick-honest'
  | 'best-views';

export type PriceRange = '€' | '€€' | '€€€';
export type ReservationNeed = 'essential' | 'recommended' | 'not-needed';

export interface GuideRestaurant {
  id: string;
  name: string;
  category: RestaurantCategory;
  location: string;
  town: string;
  coordinates?: { lat: number; lng: number };
  knownFor: string;
  priceRange: PriceRange;
  reservations: ReservationNeed;
  bestFor: string[];
  whatToOrder: string[];
  whatToSkip: string[];
  insiderTip: string;
}

// ============ TOWN ============
export interface GuideTown {
  id: string;
  name: string;
  vibeLine: string;
  bestFor: string[];
  stayIf: string;
  skipIf: string;
  dontMiss: string[];
  whereToEat: string[];
  dayTripPotential: string;
  image?: string;
}

// ============ TOURIST TRAP ============
export type TrapType = 'restaurant' | 'attraction' | 'beach' | 'area' | 'tour';

export interface TouristTrap {
  id: string;
  name: string;
  type: TrapType;
  location: string;
  whyToSkip: string;
  betterAlternative: {
    name: string;
    why: string;
    location: string;
  };
}

// ============ TIMING ============
export type CrowdLevel = 'low' | 'medium' | 'high' | 'peak';

export interface MonthlyGuide {
  month: number;
  name: string;
  weather: string;
  crowds: CrowdLevel;
  bestFor: string[];
  avoid: string[];
  seasonalSecrets: string[];
  goldenHours: {
    sunrise: string;
    sunset: string;
  };
}

export interface TimingHack {
  id: string;
  title: string;
  description: string;
  tip: string;
}

// ============ ESSENTIALS ============
export interface PracticalEssentials {
  gettingAround: {
    rentalCars: string;
    publicTransport: string;
    taxis: string;
    parking: string;
    tips: string[];
  };
  money: {
    currency: string;
    tipping: string;
    cashVsCard: string;
    atms: string;
  };
  phrases: Array<{
    portuguese: string;
    english: string;
    pronunciation: string;
  }>;
  apps: Array<{
    name: string;
    purpose: string;
    tip: string;
  }>;
  emergency: {
    police: string;
    ambulance: string;
    hospitals: Array<{ name: string; location: string; phone: string }>;
    pharmacies: string;
  };
}

// ============ DAY TRIP ============
export interface DayTripStop {
  stop: string;
  duration: string;
  highlights: string[];
  tip: string;
}

export interface DayTrip {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  distance: string;
  startPoint: string;
  route: DayTripStop[];
  whereToEat: {
    lunch: string;
    coffee: string;
  };
  bestSeason: string;
  image?: string;
}

// ============ COMPLETE GUIDE DATA ============
export interface GuideData {
  config: GuideConfig;
  beaches: GuideBeach[];
  restaurants: GuideRestaurant[];
  towns: GuideTown[];
  traps: TouristTrap[];
  timing: MonthlyGuide[];
  timingHacks: TimingHack[];
  essentials: PracticalEssentials;
  dayTrips: DayTrip[];
}

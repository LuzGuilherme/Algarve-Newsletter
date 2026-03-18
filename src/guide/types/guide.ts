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

export type BeachAccessLevel = 'easy' | 'moderate' | 'challenging';

export interface GuideBeach {
  id: string;
  name: string;
  category: BeachCategory;
  accessLevel?: BeachAccessLevel;
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
  phone?: string;
  closedDay?: string;
  openingHours?: string;
  knownFor: string;
  priceRange: PriceRange;
  reservations: ReservationNeed;
  bestFor: string[];
  whatToOrder: string[];
  whatToSkip: string[];
  insiderTip: string;
  image?: string;
}

// ============ TOWN ============
export type AlgarveRegion = 'western' | 'central' | 'eastern' | 'inland';
export type PriceLevel = 'budget' | 'mid-range' | 'expensive';

export interface TownQuickStats {
  walkability: number;  // 1-5
  nightlife: number;    // 1-5
  beaches: number;      // 1-5
  foodScene: number;    // 1-5
  value: number;        // 1-5
}

export interface TownHighlight {
  name: string;
  description: string;
}

export interface TownEatery {
  name: string;
  cuisine: string;
}

export interface GuideTown {
  id: string;
  name: string;
  coordinates?: { lat: number; lng: number };
  region: AlgarveRegion;
  vibeLine: string;
  atmosphere: string;
  quickStats: TownQuickStats;
  airportDistance: string;
  priceLevel: PriceLevel;
  bestFor: string[];
  stayIf: string;
  skipIf: string;
  dontMiss: TownHighlight[];
  whereToEat: TownEatery[];
  dayTripPotential: string;
  image?: string;
}

// ============ TOURIST TRAP ============
export type TrapType = 'restaurant' | 'attraction' | 'beach' | 'area' | 'tour' | 'behavior';

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
export type TimingHackCategory = 'beach' | 'dining' | 'logistics' | 'planning';

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
  category: TimingHackCategory;
  description: string;
  tip: string;
}

// ============ ESSENTIALS ============
export interface PracticalEssentials {
  dining: {
    couvert: string;
    mealTimes: string;
    portions: string;
    waterAndWine: string;
  };
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

// ============ ACCOMMODATION ============
export type AccommodationType = 'hotel' | 'boutique' | 'guesthouse' | 'apartment' | 'villa';
export type AccommodationTier = 'budget' | 'mid-range' | 'splurge';

export interface GuideAccommodation {
  id: string;
  name: string;
  type: AccommodationType;
  tier: AccommodationTier;
  town: string;
  area: string;
  priceRange: string;
  description: string;
  bestFor: string[];
  insiderTip: string;
  highlights: string[];
  walkToBeach: string;
  walkToCenter: string;
  whyWeChoseIt: string;
  priceNote?: string;
  bookingUrl?: string;
}

// ============ ACTIVITY ============
export type ActivityCategory = 'water' | 'adventure' | 'cultural' | 'food-drink';
export type ActivityDifficulty = 'easy' | 'moderate' | 'challenging';
export type ActivityGroupSize = 'small' | 'medium' | 'large';

export interface GuideActivity {
  id: string;
  name: string;
  category: ActivityCategory;
  description: string;
  duration: string;
  priceRange: string;
  departurePoints: string[];
  bestSeason: string;
  insiderTip: string;
  bookingPlatform: string;
  bookingUrl?: string;
  difficultyLevel: ActivityDifficulty;
  groupSize: ActivityGroupSize;
  whatToBring: string[];
  skipIf: string;
  availableMonths: number[];
  peakMonths: number[];
  image?: string;
}

// ============ DAY TRIP ============
export type TripType = 'beach' | 'nature' | 'culture' | 'city';

export interface DayTripStop {
  stop: string;
  duration: string;
  highlights: string[];
  tip: string;
  coordinates?: { lat: number; lng: number };
}

export interface DayTrip {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  distance: string;
  startPoint: string;
  tripType: TripType;
  route: DayTripStop[];
  whereToEat: {
    lunch: string;
    coffee: string;
  };
  bestSeason: string;
  budgetEstimate?: string;
  image?: string;
}

// ============ COMPLETE GUIDE DATA ============
export interface GuideData {
  config: GuideConfig;
  beaches: GuideBeach[];
  restaurants: GuideRestaurant[];
  accommodations: GuideAccommodation[];
  towns: GuideTown[];
  traps: TouristTrap[];
  timing: MonthlyGuide[];
  timingHacks: TimingHack[];
  essentials: PracticalEssentials;
  activities: GuideActivity[];
  dayTrips: DayTrip[];
}

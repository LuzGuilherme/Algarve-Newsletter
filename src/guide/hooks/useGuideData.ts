import { useState, useEffect } from 'react';
import type { GuideData, GuideBeach, GuideConfig, GuideRestaurant, GuideAccommodation, GuideTown, TouristTrap, MonthlyGuide, TimingHack, PracticalEssentials, GuideActivity, DayTrip } from '../types/guide';

// Import all static data — no more auto-generation
import guideConfigData from '../data/guide-config.json';
import beachesData from '../data/beaches.json';
import restaurantsData from '../data/restaurants.json';
import townsData from '../data/towns.json';
import trapsData from '../data/tourist-traps.json';
import timingData from '../data/timing-hacks.json';
import essentialsData from '../data/essentials.json';
import accommodationsData from '../data/accommodations.json';
import activitiesData from '../data/activities.json';
import dayTripsData from '../data/day-trips.json';

interface UseGuideDataResult {
  data: GuideData | null;
  loading: boolean;
  error: Error | null;
}

export function useGuideData(): UseGuideDataResult {
  const [data, setData] = useState<GuideData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      const guideData: GuideData = {
        config: guideConfigData as GuideConfig,
        beaches: beachesData.beaches as GuideBeach[],
        restaurants: restaurantsData.restaurants as GuideRestaurant[],
        accommodations: accommodationsData.accommodations as GuideAccommodation[],
        towns: townsData.towns as GuideTown[],
        traps: trapsData.traps as TouristTrap[],
        timing: timingData.monthly as MonthlyGuide[],
        timingHacks: timingData.timingHacks as TimingHack[],
        essentials: essentialsData.essentials as PracticalEssentials,
        activities: activitiesData.activities as GuideActivity[],
        dayTrips: dayTripsData.dayTrips as DayTrip[],
      };

      setData(guideData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error loading guide data'));
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error };
}

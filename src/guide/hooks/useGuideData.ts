import { useState, useEffect } from 'react';
import type { GuideData, GuideBeach, GuideConfig, GuideRestaurant, GuideTown, TouristTrap, MonthlyGuide, TimingHack, PracticalEssentials, DayTrip } from '../types/guide';
import { selectBeachesForGuide } from '../utils/beachSelector';

// Import static data
import guideConfigData from '../data/guide-config.json';
import restaurantsData from '../data/restaurants.json';
import townsData from '../data/towns.json';
import trapsData from '../data/tourist-traps.json';
import timingData from '../data/timing-hacks.json';
import essentialsData from '../data/essentials.json';
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
    async function loadData() {
      try {
        setLoading(true);

        // Load beaches data from public folder
        const beachesResponse = await fetch('/data/beaches.json');
        if (!beachesResponse.ok) {
          throw new Error('Failed to load beaches data');
        }
        const beachesJson = await beachesResponse.json();

        // Transform beaches for guide
        const guideBeaches: GuideBeach[] = selectBeachesForGuide(beachesJson.beaches);

        // Assemble complete guide data
        const guideData: GuideData = {
          config: guideConfigData as GuideConfig,
          beaches: guideBeaches,
          restaurants: restaurantsData.restaurants as GuideRestaurant[],
          towns: townsData.towns as GuideTown[],
          traps: trapsData.traps as TouristTrap[],
          timing: timingData.monthly as MonthlyGuide[],
          timingHacks: timingData.timingHacks as TimingHack[],
          essentials: essentialsData.essentials as PracticalEssentials,
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
    }

    loadData();
  }, []);

  return { data, loading, error };
}

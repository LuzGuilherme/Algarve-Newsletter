import React from 'react';
import { Document, Font } from '@react-pdf/renderer';
import type { GuideData } from '../../types/guide';
import { CoverPage } from './CoverPage';
import { BeachesSection } from './BeachesSection';
import { RestaurantsSection } from './RestaurantsSection';
import { TownsSection } from './TownsSection';
import { TouristTrapsSection } from './TouristTrapsSection';
import { TimingHacksSection } from './TimingHacksSection';
import { EssentialsSection } from './EssentialsSection';
import { DayTripsSection } from './DayTripsSection';

// Hyphenation callback to prevent awkward word breaks
Font.registerHyphenationCallback((word) => [word]);

interface AlgarveGuideProps {
  data: GuideData;
}

export const AlgarveGuide: React.FC<AlgarveGuideProps> = ({ data }) => {
  return (
    <Document
      title="The Algarve Secret Guide"
      author={data.config.author.name}
      subject="Insider's guide to Portugal's Algarve region"
      keywords="Algarve, Portugal, beaches, travel guide, restaurants, local tips"
      creator="Algarve Newsletter"
      producer="@react-pdf/renderer"
    >
      {/* Section 1: Cover + Opening */}
      <CoverPage config={data.config} />

      {/* Section 2: Beaches */}
      <BeachesSection beaches={data.beaches} />

      {/* Section 3: Restaurants */}
      <RestaurantsSection restaurants={data.restaurants} />

      {/* Section 4: Towns */}
      <TownsSection towns={data.towns} />

      {/* Section 5: Tourist Traps */}
      <TouristTrapsSection traps={data.traps} />

      {/* Section 6: Timing Hacks */}
      <TimingHacksSection timing={data.timing} timingHacks={data.timingHacks} />

      {/* Section 7: Practical Essentials */}
      <EssentialsSection essentials={data.essentials} />

      {/* Section 8: Day Trips */}
      <DayTripsSection dayTrips={data.dayTrips} />
    </Document>
  );
};

export default AlgarveGuide;

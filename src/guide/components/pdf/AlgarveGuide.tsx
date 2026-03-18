import React from 'react';
import { Document, Font } from '@react-pdf/renderer';
import type { GuideData } from '../../types/guide';
import { CoverPage } from './CoverPage';
import { TableOfContents } from './TableOfContents';
import { VisualLegendPage } from './VisualLegendPage';
import { BestOfPage } from './BestOfPage';
import { SectionDivider } from './SectionDivider';
import { BeachesSection } from './BeachesSection';
import { RestaurantsSection } from './RestaurantsSection';
import { TownsSection } from './TownsSection';
import { AccommodationsSection } from './AccommodationsSection';
import { TouristTrapsSection } from './TouristTrapsSection';
import { TimingHacksSection } from './TimingHacksSection';
import { EssentialsSection } from './EssentialsSection';
import { ActivitiesSection } from './ActivitiesSection';
import { DayTripsSection } from './DayTripsSection';
import { QuickItinerariesPage } from './QuickItinerariesPage';
import { BudgetVsSplurgePage } from './BudgetVsSplurgePage';
import { EventsCalendarPage } from './EventsCalendarPage';
import { GlossaryPage } from './GlossaryPage';
import { PackingListPage } from './PackingListPage';
import { ClosingPage } from './ClosingPage';

// Register custom fonts via Google Fonts CDN
Font.register({
  family: 'Playfair Display',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/playfairdisplay/v40/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvUDQ.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/playfairdisplay/v40/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKeiukDQ.ttf', fontWeight: 700 },
    { src: 'https://fonts.gstatic.com/s/playfairdisplay/v40/nuFRD-vYSZviVYUb_rj3ij__anPXDTnCjmHKM4nYO7KN_qiTbtY.ttf', fontWeight: 400, fontStyle: 'italic' },
  ],
});

Font.register({
  family: 'Source Sans 3',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/sourcesans3/v19/nwpBtKy2OAdR1K-IwhWudF-R9QMylBJAV3Bo8Ky461EN.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/sourcesans3/v19/nwpBtKy2OAdR1K-IwhWudF-R9QMylBJAV3Bo8Kxm7FEN.ttf', fontWeight: 600 },
    { src: 'https://fonts.gstatic.com/s/sourcesans3/v19/nwpBtKy2OAdR1K-IwhWudF-R9QMylBJAV3Bo8Kxf7FEN.ttf', fontWeight: 700 },
    { src: 'https://fonts.gstatic.com/s/sourcesans3/v19/nwpDtKy2OAdR1K-IwhWudF-R3woAa8opPOrG97lwqLlO9C4.ttf', fontWeight: 400, fontStyle: 'italic' },
  ],
});

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
      {/* Cover + Opening */}
      <CoverPage
        config={data.config}
        stats={{
          beaches: data.beaches.length,
          restaurants: data.restaurants.length,
          towns: data.towns.length,
          accommodations: data.accommodations.length,
          traps: data.traps.length,
          activities: data.activities.length,
          dayTrips: data.dayTrips.length,
        }}
      />

      {/* Table of Contents */}
      <TableOfContents />

      {/* Visual Legend — How to Read This Guide */}
      <VisualLegendPage />

      {/* Best of Algarve — Quick Reference */}
      <BestOfPage />

      {/* Section 1: Beaches */}
      <SectionDivider number={1} title="The Beaches" teaser="Hidden coves, family spots, and wild coasts — with GPS coordinates and honest personal takes" bookmark="beaches" />
      <BeachesSection beaches={data.beaches} />

      {/* Section 2: Restaurants */}
      <SectionDivider number={2} title="Restaurants" teaser="Where locals actually eat — with hours, closing days, and what to order" bookmark="restaurants" />
      <RestaurantsSection restaurants={data.restaurants} />

      {/* Section 3: Towns */}
      <SectionDivider number={3} title="Town Profiles" teaser="Every town profiled — who it's best for and whether to base yourself there" bookmark="towns" />
      <TownsSection towns={data.towns} />

      {/* Section 4: Where to Stay */}
      <SectionDivider number={4} title="Where to Stay" teaser="Honest picks for every budget — from surfer hostels to converted convents" bookmark="accommodation" />
      <AccommodationsSection accommodations={data.accommodations} />

      {/* Section 5: Tourist Traps */}
      <SectionDivider number={5} title="Tourist Traps" teaser="The mistakes tourists make and the better alternatives we recommend instead" bookmark="traps" />
      <TouristTrapsSection traps={data.traps} />

      {/* Section 6: Timing Hacks */}
      <SectionDivider number={6} title="Timing Hacks" teaser="Month-by-month secrets — know exactly when to go where for the best experience" bookmark="timing" />
      <TimingHacksSection timing={data.timing} timingHacks={data.timingHacks} />

      {/* Section 7: Activities & Experiences */}
      <SectionDivider number={7} title="Activities" teaser="Water sports, food tours, cultural experiences — with booking links and insider tips" bookmark="activities" />
      <ActivitiesSection activities={data.activities} />

      {/* Section 8: Practical Essentials */}
      <SectionDivider number={8} title="Essentials" teaser="Transport, money, language, safety — everything you need to navigate like a local" bookmark="essentials" />
      <EssentialsSection essentials={data.essentials} />

      {/* Section 9: Day Trips */}
      <SectionDivider number={9} title="Day Trips" teaser="Complete stop-by-stop routes for the best day trips from anywhere in the Algarve" bookmark="daytrips" />
      <DayTripsSection dayTrips={data.dayTrips} />

      {/* Quick Itineraries (3/5/7 day plans) */}
      <QuickItinerariesPage />

      {/* Budget vs Splurge */}
      <BudgetVsSplurgePage />

      {/* Events Calendar */}
      <EventsCalendarPage />

      {/* Reference Pages */}
      <GlossaryPage />
      <PackingListPage />

      {/* Closing Page */}
      <ClosingPage config={data.config} />
    </Document>
  );
};

export default AlgarveGuide;

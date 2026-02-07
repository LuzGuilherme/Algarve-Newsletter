import React from 'react';
import { Page, View, Text } from '@react-pdf/renderer';
import { styles } from '../../utils/pdfStyles';
import { PDFHeader, PDFFooter, SectionTitle, DayTripCard } from './shared';
import type { DayTrip } from '../../types/guide';

interface DayTripsSectionProps {
  dayTrips: DayTrip[];
}

export const DayTripsSection: React.FC<DayTripsSectionProps> = ({ dayTrips }) => {
  return (
    <>
      {/* Section intro page */}
      <Page size="A4" style={styles.page}>
        <PDFHeader sectionName="Day Trips" />
        <SectionTitle
          number={7}
          title="Day Trips & Drives"
          subtitle="Curated itineraries to explore beyond your base"
        />
        <Text style={styles.introText}>
          The Algarve is compact enough to explore in day trips from almost anywhere.
          These are my favorite routes — tested many times with different visitors,
          refined to maximize great moments and minimize driving fatigue.
        </Text>
        <Text style={styles.introText}>
          Each itinerary includes timing recommendations, where to stop for food,
          and what to skip even if it looks tempting on the map.
        </Text>

        <View style={styles.tipBox}>
          <Text style={styles.tipLabel}>Driving Tips</Text>
          <Text style={styles.tipText}>
            • Start early (8-9am) to beat the crowds at popular spots
          </Text>
          <Text style={styles.tipText}>
            • The A22 toll road is worth it for long distances — saves 30-45 min
          </Text>
          <Text style={styles.tipText}>
            • Download offline maps (Google Maps) before heading to remote areas
          </Text>
          <Text style={styles.tipText}>
            • Fill up on gas in larger towns — petrol stations are sparse inland
          </Text>
        </View>
        <PDFFooter />
      </Page>

      {/* Day Trip pages */}
      {dayTrips.map((dayTrip) => (
        <Page key={dayTrip.id} size="A4" style={styles.page}>
          <PDFHeader sectionName={`Day Trips — ${dayTrip.title}`} />
          <DayTripCard dayTrip={dayTrip} />
          <PDFFooter />
        </Page>
      ))}
    </>
  );
};

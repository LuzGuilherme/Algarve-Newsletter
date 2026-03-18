import React from 'react';
import { Page, View, Text, Image } from '@react-pdf/renderer';
import { styles, colors } from '../../utils/pdfStyles';
import { PDFHeader, PDFFooter, SectionTitle, DayTripCard, PullQuote } from './shared';
import { TRIP_TYPE_CONFIG } from './shared/DayTripCard';
import type { DayTrip, TripType } from '../../types/guide';
import { buildStaticMapUrl } from '../../utils/mapUtils';

function resolveImageUrl(path: string): string {
  if (path.startsWith('http')) return path;
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  return `${origin}${path}`;
}

// One-liner summaries for the At a Glance grid
const GLANCE_SUMMARIES: Record<string, string> = {
  'western-coast': '~100km · Full day (8-10h) · €20-30pp',
  'ria-formosa-east': '~80km · Full day (7-9h) · €25-35pp',
  'mountain-escape': '~120km · Full day (6-8h) · €20-25pp',
  'secret-beaches': '~50km · Full day (6-8h) · €50-60pp',
  'seville-day-trip': '~320km · Long day (10-12h) · €80-100pp',
  'tavira-cacela-velha': '~90km · Full day (7-9h) · €20-30pp',
  'aljezur-costa-vicentina': '~130km · Full day (8-10h) · €15-25pp',
  'lisbon-day-trip': '~300km · Long day (12-14h) · €60-80pp',
};

const TRIP_TYPE_ORDER: TripType[] = ['beach', 'nature', 'culture', 'city'];

interface DayTripsSectionProps {
  dayTrips: DayTrip[];
}

export const DayTripsSection: React.FC<DayTripsSectionProps> = ({ dayTrips }) => {
  return (
    <>
      {/* ====== Page 1 — Intro ====== */}
      <Page size="A4" style={styles.page}>
        <PDFHeader sectionName="Day Trips" />
        <SectionTitle
          number={9}
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

        {/* Section hero image */}
        <View style={{ marginBottom: 16, borderRadius: 6, overflow: 'hidden' }}>
          <Image
            src={resolveImageUrl('/images/lagos/lagos-panoramic-coast.jpg')}
            style={{
              width: '100%',
              height: 140,
              objectFit: 'cover',
            }}
          />
        </View>

        <View style={styles.tipBox}>
          <Text style={styles.tipLabel}>Driving Tips</Text>
          <Text style={styles.tipText}>
            {'\u2022'} Start early (8-9am) to beat the crowds at popular spots
          </Text>
          <Text style={styles.tipText}>
            {'\u2022'} The A22 motorway is now toll-free — use it for long distances, saves 30-45 min
          </Text>
          <Text style={styles.tipText}>
            {'\u2022'} Download offline maps (Google Maps) before heading to remote areas
          </Text>
          <Text style={styles.tipText}>
            {'\u2022'} Fill up on gas in larger towns — petrol stations are sparse inland
          </Text>
        </View>
        <PDFFooter />
      </Page>

      {/* ====== Page 2 — Day Trips at a Glance ====== */}
      <Page size="A4" style={styles.page}>
        <PDFHeader sectionName="Day Trips — At a Glance" />
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 12, color: colors.accent, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 8, fontWeight: 'bold' }}>
            Quick Reference
          </Text>
          <Text style={{ fontSize: 26, fontFamily: 'Playfair Display', fontWeight: 'bold', color: colors.primary, marginBottom: 6 }}>
            Day Trips at a Glance
          </Text>
          <Text style={{ fontSize: 10, color: colors.textLight, lineHeight: 1.5 }}>
            All 8 curated day trips at a glance — trip type, distance, duration, and budget in one view.
          </Text>
        </View>

        {/* Grid: 2 columns, 4 rows (8 trips) */}
        {Array.from({ length: 4 }, (_, rowIdx) => (
          <View key={rowIdx} style={{ flexDirection: 'row', gap: 10, marginBottom: 8 }} wrap={false}>
            {dayTrips.slice(rowIdx * 2, rowIdx * 2 + 2).map((trip, colIdx) => {
              const typeConfig = TRIP_TYPE_CONFIG[trip.tripType];
              return (
                <View
                  key={trip.id}
                  style={{
                    flex: 1,
                    padding: 10,
                    backgroundColor: colIdx === 0 ? colors.backgroundAlt : colors.backgroundWarm,
                    borderRadius: 5,
                    borderLeftWidth: 3,
                    borderLeftColor: typeConfig.color,
                  }}
                >
                  <Text style={{
                    fontSize: 7,
                    color: typeConfig.color,
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    marginBottom: 3,
                  }}>
                    {typeConfig.label}
                  </Text>
                  <Text style={{ fontSize: 10, fontWeight: 'bold', color: colors.primary, marginBottom: 2 }}>
                    {trip.title}
                  </Text>
                  <Text style={{ fontSize: 8, color: colors.textLight, lineHeight: 1.4 }}>
                    {GLANCE_SUMMARIES[trip.id] || `${trip.distance} · ${trip.duration}`}
                  </Text>
                </View>
              );
            })}
          </View>
        ))}

        {/* Trip type legend */}
        <View style={{ flexDirection: 'row', gap: 16, marginTop: 16 }}>
          {TRIP_TYPE_ORDER.map((type) => {
            const config = TRIP_TYPE_CONFIG[type];
            return (
              <View key={type} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: config.color, marginRight: 4 }} />
                <Text style={{ fontSize: 8, color: colors.text }}>{config.label}</Text>
              </View>
            );
          })}
        </View>
        <PDFFooter />
      </Page>

      {/* ====== Pages 3+ — Trip Detail Pages ====== */}
      {dayTrips.map((dayTrip, tripIndex) => (
        <React.Fragment key={dayTrip.id}>
          {/* PullQuote before the Seville trip (index 4) */}
          {tripIndex === 4 && (
            <Page size="A4" style={styles.page}>
              <PDFHeader sectionName="Day Trips" />
              <PullQuote
                quote="The best day trips aren't about ticking off landmarks — they're about the unexpected detour, the village cafe where nobody speaks English, and the sunset you didn't plan for."
              />
              <PDFFooter />
            </Page>
          )}

          <Page size="A4" style={styles.page} wrap>
            <PDFHeader sectionName={`Day Trips — ${dayTrip.title}`} />

            {/* Route map */}
            {dayTrip.route.some((s) => s.coordinates) && (
              <View style={{ marginBottom: 12, borderRadius: 4, overflow: 'hidden' }} wrap={false}>
                <Image
                  src={buildStaticMapUrl(
                    dayTrip.route
                      .filter((s) => s.coordinates)
                      .map((s, i) => ({
                        lat: s.coordinates!.lat,
                        lng: s.coordinates!.lng,
                        label: String(i + 1),
                      })),
                    600,
                    200,
                  )}
                  style={{ width: '100%', height: 120, objectFit: 'cover' }}
                />
              </View>
            )}

            <DayTripCard dayTrip={dayTrip} />
            <PDFFooter />
          </Page>
        </React.Fragment>
      ))}
    </>
  );
};

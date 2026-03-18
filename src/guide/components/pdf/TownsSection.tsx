import React from 'react';
import { Page, View, Text, Image } from '@react-pdf/renderer';
import { styles, colors } from '../../utils/pdfStyles';
import { PDFHeader, PDFFooter, SectionTitle, TownCard, PullQuote } from './shared';
import type { GuideTown, AlgarveRegion, PriceLevel } from '../../types/guide';
import { buildStaticMapUrl } from '../../utils/mapUtils';

const PRICE_CONFIG: Record<PriceLevel, { label: string; color: string; bg: string }> = {
  budget: { label: 'Budget', color: '#065F46', bg: '#D1FAE5' },
  'mid-range': { label: 'Mid-Range', color: '#92400E', bg: '#FEF3C7' },
  expensive: { label: 'Premium', color: '#BE185D', bg: '#FCE7F3' },
};

const STAT_LABELS: Record<string, string> = {
  walkability: 'Walk',
  nightlife: 'Night',
  beaches: 'Beach',
  foodScene: 'Food',
  value: 'Value',
};

const StatDotsMini: React.FC<{ value: number }> = ({ value }) => (
  <View style={{ flexDirection: 'row', gap: 1 }}>
    {[1, 2, 3, 4, 5].map(i => (
      <View
        key={i}
        style={{
          width: 5,
          height: 5,
          borderRadius: 3,
          backgroundColor: i <= value ? colors.accent : '#E2E8F0',
        }}
      />
    ))}
  </View>
);

const TownOverviewRow: React.FC<{ town: GuideTown; regionColor: string; isLast: boolean }> = ({ town, regionColor, isLast }) => {
  const priceConfig = PRICE_CONFIG[town.priceLevel];
  return (
    <View style={{
      paddingVertical: 5,
      paddingHorizontal: 8,
      borderBottomWidth: isLast ? 0 : 1,
      borderBottomColor: '#E2E8F0',
    }}>
      {/* Town name + price badge + airport distance */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
        <Text style={{ fontSize: 10, fontFamily: 'Playfair Display', fontWeight: 'bold', color: regionColor, flex: 1 }}>
          {town.name}
        </Text>
        <View style={{ backgroundColor: priceConfig.bg, paddingVertical: 1, paddingHorizontal: 5, borderRadius: 3 }}>
          <Text style={{ fontSize: 6, fontWeight: 'bold', color: priceConfig.color }}>{priceConfig.label}</Text>
        </View>
        <Text style={{ fontSize: 6, color: colors.textLight, marginLeft: 6, width: 75, textAlign: 'right' }}>
          {town.airportDistance}
        </Text>
      </View>
      {/* Vibe line */}
      <Text style={{ fontSize: 7, fontStyle: 'italic', color: colors.textLight, marginBottom: 3, lineHeight: 1.3 }}>
        {town.vibeLine}
      </Text>
      {/* Stats + Best for on one row */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        {Object.entries(town.quickStats).map(([key, val]) => (
          <View key={key} style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
            <Text style={{ fontSize: 5, color: colors.textLight, textTransform: 'uppercase' }}>{STAT_LABELS[key] || key}</Text>
            <StatDotsMini value={val} />
          </View>
        ))}
        <View style={{ width: 1, height: 8, backgroundColor: '#E2E8F0', marginHorizontal: 2 }} />
        {town.bestFor.slice(0, 3).map(item => (
          <Text key={item} style={{
            fontSize: 5,
            color: regionColor,
            backgroundColor: '#F1F5F9',
            paddingVertical: 1,
            paddingHorizontal: 4,
            borderRadius: 6,
            textTransform: 'capitalize',
          }}>
            {item}
          </Text>
        ))}
      </View>
    </View>
  );
};

interface TownsSectionProps {
  towns: GuideTown[];
}

const REGION_ORDER: AlgarveRegion[] = ['western', 'central', 'eastern', 'inland'];

const REGION_CONFIG: Record<AlgarveRegion, { label: string; description: string; color: string }> = {
  western: {
    label: 'Western Algarve',
    description: 'Dramatic cliffs, surf culture, and the Algarve at its most wild and authentic',
    color: '#0369A1',
  },
  central: {
    label: 'Central Algarve',
    description: 'Resort towns, golden beaches, marina life, and the best variety of dining and nightlife',
    color: '#7C3AED',
  },
  eastern: {
    label: 'Eastern Algarve',
    description: 'Authentic fishing towns, Ria Formosa lagoons, and the charm of old Portugal',
    color: '#059669',
  },
  inland: {
    label: 'Inland Algarve',
    description: 'Mountains, markets, medieval history, and a completely different side of the region',
    color: '#92400E',
  },
};

const PULL_QUOTES: Record<AlgarveRegion, { quote: string; attribution: string }> = {
  western: {
    quote: "The western Algarve is where Portugal runs out of land and starts running on soul. The cliffs don't care if you're watching — they're spectacular regardless.",
    attribution: "Personal note",
  },
  central: {
    quote: "Central Algarve gives you options. That's its gift and its curse — you can find anything here, as long as you know where to look.",
    attribution: "Personal note",
  },
  eastern: {
    quote: "The eastern Algarve moves at the speed of a fishing boat. Once you adjust, you'll wonder why you ever rushed.",
    attribution: "Personal note",
  },
  inland: {
    quote: "Drive 30 minutes from the coast and the Algarve transforms. Mountains replace beaches, cork trees replace parasols, and suddenly you're the only tourist in the room.",
    attribution: "Personal note",
  },
};

export const TownsSection: React.FC<TownsSectionProps> = ({ towns }) => {
  // Build map from town coordinates
  const townMarkers = towns
    .filter(t => t.coordinates)
    .map(t => ({ lat: t.coordinates!.lat, lng: t.coordinates!.lng, label: t.name }));
  const townsMapUrl = townMarkers.length > 0 ? buildStaticMapUrl(townMarkers, 600, 280, 9) : null;

  // Group towns by region
  const townsByRegion = towns.reduce((acc, town) => {
    if (!acc[town.region]) acc[town.region] = [];
    acc[town.region].push(town);
    return acc;
  }, {} as Record<AlgarveRegion, GuideTown[]>);

  return (
    <>
      {/* Section intro page */}
      <Page size="A4" style={styles.page}>
        <PDFHeader sectionName="Towns" />
        <SectionTitle
          number={3}
          title="Towns by Vibe"
          subtitle="Find your perfect base in the Algarve"
        />
        <Text style={styles.introText}>
          The Algarve isn't one place — it's dozens of distinct towns, each with
          its own personality. Choose the wrong base and you'll spend half your
          trip in the car. Choose the right one and everything clicks into place.
        </Text>
        <Text style={styles.introText}>
          We've organized {towns.length} towns by region so you can quickly zero in on
          the area that matches your travel style. Each town gets an honest
          breakdown: who it's for, what not to miss, and where to eat.
        </Text>

        {/* Overview map */}
        {townsMapUrl && (
          <View style={{ marginBottom: 15 }} wrap={false}>
            <Image src={townsMapUrl} style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 4 }} />
            <Text style={{ fontSize: 8, color: colors.textMuted, marginTop: 4, textAlign: 'center' }}>
              Overview of {towns.length} towns covered in this guide
            </Text>
          </View>
        )}

        {/* Region quick reference */}
        <View style={styles.tipBox}>
          <Text style={styles.tipLabel}>Quick Region Guide</Text>
          {REGION_ORDER.map((region, index) => {
            const config = REGION_CONFIG[region];
            const regionTowns = townsByRegion[region] || [];
            return (
              <View key={region} style={{ flexDirection: 'row', marginBottom: index < REGION_ORDER.length - 1 ? 4 : 0, alignItems: 'flex-start' }}>
                <View style={{
                  width: 8, height: 8, borderRadius: 4,
                  backgroundColor: config.color, marginRight: 6, marginTop: 2,
                }} />
                <View style={{ flex: 1 }}>
                  <Text style={{ ...styles.tipText, fontWeight: 'bold', marginBottom: 0 }}>
                    {config.label} — {regionTowns.map(t => t.name).join(', ')}
                  </Text>
                  <Text style={{ fontSize: 8, color: colors.textLight }}>
                    {config.description}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
        <PDFFooter />
      </Page>

      {/* Town pages — one town per page */}
      <Page size="A4" style={styles.page} wrap>
        <PDFHeader sectionName="Towns" />

        {REGION_ORDER.flatMap((region, regionIndex) => {
          const regionTowns = townsByRegion[region] || [];
          if (regionTowns.length === 0) return [];

          const config = REGION_CONFIG[region];
          const pullQuote = PULL_QUOTES[region];
          const isFirstRegion = regionIndex === 0;

          return [
            /* Region divider page */
            <View key={`region-${region}`} break={!isFirstRegion}>
              <View style={{
                marginTop: 8,
                marginBottom: 16,
                paddingBottom: 10,
                borderBottomWidth: 3,
                borderBottomColor: config.color,
              }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                  <View style={{
                    width: 12, height: 12, borderRadius: 6,
                    backgroundColor: config.color, marginRight: 8,
                  }} />
                  <Text style={{
                    fontSize: 18, fontFamily: 'Playfair Display', fontWeight: 'bold',
                    color: config.color,
                  }}>
                    {config.label}
                  </Text>
                </View>
                <Text style={{ fontSize: 10, color: colors.textLight, marginLeft: 20 }}>
                  {config.description}
                </Text>
              </View>
              <PullQuote quote={pullQuote.quote} attribution={pullQuote.attribution} />

              {/* Town comparison overview */}
              <View style={{ marginTop: 12 }}>
                <Text style={{ fontSize: 9, fontWeight: 'bold', color: colors.text, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Towns at a Glance
                </Text>
                <View style={{
                  backgroundColor: colors.white,
                  borderRadius: 6,
                  borderWidth: 1,
                  borderColor: '#E2E8F0',
                  overflow: 'hidden',
                }}>
                  {regionTowns.map((town, i) => (
                    <TownOverviewRow
                      key={town.id}
                      town={town}
                      regionColor={config.color}
                      isLast={i === regionTowns.length - 1}
                    />
                  ))}
                </View>
              </View>
            </View>,
            /* Each town on its own page */
            ...regionTowns.map(town => (
              <View key={town.id} break>
                <TownCard town={town} />
              </View>
            )),
          ];
        })}

        <PDFFooter />
      </Page>
    </>
  );
};

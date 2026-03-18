import React from 'react';
import { Page, View, Text } from '@react-pdf/renderer';
import { styles, colors } from '../../utils/pdfStyles';

interface BestOfPick {
  category: string;
  pick: string;
  reason: string;
}

const bestOfPicks: BestOfPick[] = [
  {
    category: 'Best Hidden Beach',
    pick: 'Praia do Carvalho',
    reason: 'Hand-carved tunnel entrance, tiny cove, no crowds — pure magic.',
  },
  {
    category: 'Best Family Beach',
    pick: 'Praia da Luz',
    reason: 'Calm water, lifeguards, restaurants steps away, easy parking.',
  },
  {
    category: 'Best Budget Restaurant',
    pick: 'Tasca in Loulé backstreets',
    reason: 'Full meal with soup, main, drink, and coffee for under €15.',
  },
  {
    category: 'Best Splurge Restaurant',
    pick: 'Bon Bon (Michelin-starred)',
    reason: 'Tasting menu showcasing the finest Algarvian ingredients.',
  },
  {
    category: 'Best Town for Couples',
    pick: 'Tavira',
    reason: 'Elegant, unhurried, with a Roman bridge and golden-hour magic.',
  },
  {
    category: 'Best Town for Families',
    pick: 'Lagos',
    reason: 'Walkable old town, calm beaches, boat trips, and great restaurants.',
  },
  {
    category: 'Best Day Trip',
    pick: 'Ria Formosa & Eastern Algarve',
    reason: 'Island beaches, fishing villages, and the authentic Algarve in one day.',
  },
  {
    category: 'Best Activity',
    pick: 'Benagil Cave Kayak Tour (7:30am)',
    reason: 'An empty, sunlit sea cave — the Algarve\'s most iconic moment.',
  },
  {
    category: 'Best Sunset Spot',
    pick: 'Cape St. Vincent',
    reason: 'The southwestern tip of Europe. Dramatic cliffs, no buildings, just sky.',
  },
  {
    category: 'Best Rainy Day Activity',
    pick: 'Silves Castle & Medronho Tasting',
    reason: 'Explore Moorish history then warm up with local firewater in Monchique.',
  },
  {
    category: 'Best Free Experience',
    pick: 'Ponta da Piedade Cliff Walk',
    reason: 'World-class rock formations, zero entry fee, best at sunrise.',
  },
  {
    category: 'Best "Only Locals Know"',
    pick: 'Cacela Velha at Golden Hour',
    reason: 'Tiny cliffside hamlet with lagoon views. One cafe, zero tourists.',
  },
];

export const BestOfPage: React.FC = () => (
  <Page size="A4" style={styles.page}>
    {/* Header */}
    <View style={{ marginBottom: 16 }}>
      <Text style={{ fontSize: 12, color: colors.accent, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 8, fontWeight: 'bold' }}>
        Quick Reference
      </Text>
      <Text style={{ fontSize: 26, fontFamily: 'Playfair Display', fontWeight: 'bold', color: colors.primary, marginBottom: 6 }}>
        Best of the Algarve
      </Text>
      <Text style={{ fontSize: 10, color: colors.textLight, lineHeight: 1.5 }}>
        Our top picks at a glance — the single best choice in every category, based on years of living here.
      </Text>
    </View>

    {/* Grid: 2 columns, 6 rows */}
    {Array.from({ length: 6 }, (_, rowIdx) => (
      <View key={rowIdx} style={{ flexDirection: 'row', gap: 10, marginBottom: 8 }} wrap={false}>
        {bestOfPicks.slice(rowIdx * 2, rowIdx * 2 + 2).map((pick, colIdx) => (
          <View
            key={colIdx}
            style={{
              flex: 1,
              padding: 10,
              backgroundColor: colIdx === 0 ? colors.backgroundAlt : colors.backgroundWarm,
              borderRadius: 5,
              borderLeftWidth: 3,
              borderLeftColor: colIdx === 0 ? colors.primary : colors.accent,
            }}
          >
            <Text style={{ fontSize: 7, color: colors.accent, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 3 }}>
              {pick.category}
            </Text>
            <Text style={{ fontSize: 10, fontWeight: 'bold', color: colors.primary, marginBottom: 2 }}>
              {pick.pick}
            </Text>
            <Text style={{ fontSize: 8, color: colors.textLight, lineHeight: 1.4 }}>
              {pick.reason}
            </Text>
          </View>
        ))}
      </View>
    ))}

    {/* Footer tip */}
    <View style={{ marginTop: 8, padding: 10, backgroundColor: colors.primary, borderRadius: 5 }}>
      <Text style={{ fontSize: 9, color: colors.white, lineHeight: 1.5, textAlign: 'center' }}>
        These are starting points — the full guide dives deep into each category with alternatives, timing tips, and insider details.
      </Text>
    </View>
  </Page>
);

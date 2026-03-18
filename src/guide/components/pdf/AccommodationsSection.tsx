import React from 'react';
import { Page, View, Text } from '@react-pdf/renderer';
import { styles, colors } from '../../utils/pdfStyles';
import { PDFHeader, PDFFooter, SectionTitle, AccommodationCard } from './shared';
import type { GuideAccommodation, AccommodationType, AccommodationTier } from '../../types/guide';

interface AccommodationsSectionProps {
  accommodations: GuideAccommodation[];
}

const TOWN_ORDER = [
  'Lagos', 'Sagres', 'Aljezur', 'Portimão', 'Ferragudo', 'Carvoeiro',
  'Silves', 'Albufeira', 'Quarteira / Vilamoura', 'Loulé', 'Faro',
  'Olhão', 'Tavira', 'Monchique',
];

const TYPE_LABELS: Record<AccommodationType, string> = {
  'hotel': 'Hotel',
  'boutique': 'Boutique',
  'guesthouse': 'Guesthouse',
  'apartment': 'Apartment',
  'villa': 'Villa',
};

const TIER_LABELS: Record<AccommodationTier, string> = {
  'budget': 'Budget',
  'mid-range': 'Mid-Range',
  'splurge': 'Splurge',
};

const PICK_BY_NEED = [
  {
    category: 'Best for Families',
    name: 'Martinhal Sagres',
    reason: 'Kids\' club, multiple pools, on the beach — the gold standard for family holidays.',
  },
  {
    category: 'Best for Couples',
    name: 'O Castelo Guest House',
    reason: 'Private terrace breakfast above Carvoeiro Beach — the most romantic wake-up in the Algarve.',
  },
  {
    category: 'Best Budget Pick',
    name: 'Amazigh Hostel',
    reason: 'From €25/night with beach shuttle, castle-view rooftop, and modern design on the west coast.',
  },
  {
    category: 'Best Splurge',
    name: 'Bela Vista Hotel & Spa',
    reason: 'Relais & Châteaux clifftop castle with private beach — the Algarve\'s first and finest hotel.',
  },
  {
    category: 'Best Location',
    name: 'Infante Guesthouse',
    reason: 'Lagos Old Town\'s main square, 5 rooms, rooftop terrace — unbeatable location at budget prices.',
  },
  {
    category: 'Best Wellness',
    name: 'Villa Termal Monchique',
    reason: 'Roman-era thermal springs at 32°C, mountain forest setting, 8–10°C cooler than the coast.',
  },
];

function groupByTown(accommodations: GuideAccommodation[]): { town: string; items: GuideAccommodation[] }[] {
  const grouped = accommodations.reduce<Record<string, GuideAccommodation[]>>((acc, item) => {
    if (!acc[item.town]) acc[item.town] = [];
    acc[item.town].push(item);
    return acc;
  }, {});

  return TOWN_ORDER
    .filter(town => grouped[town])
    .map(town => ({ town, items: grouped[town] }));
}

// -- Sub-components --

const ComparisonTable: React.FC<{ accommodations: GuideAccommodation[] }> = ({ accommodations }) => {
  const headerCellStyle = {
    padding: 6,
    fontSize: 7,
    fontWeight: 'bold' as const,
    color: colors.background,
  };
  const cellStyle = {
    padding: 6,
    fontSize: 7,
    color: colors.text,
  };
  const cellAltStyle = {
    ...cellStyle,
    backgroundColor: colors.backgroundAlt,
  };

  return (
    <View style={{ ...styles.table, marginTop: 10 }}>
      {/* Header row */}
      <View style={{ ...styles.tableRow, ...styles.tableHeader }}>
        <Text style={{ ...headerCellStyle, flex: 2.5 }}>Name</Text>
        <Text style={{ ...headerCellStyle, flex: 1.5 }}>Town</Text>
        <Text style={{ ...headerCellStyle, flex: 1.2 }}>Type</Text>
        <Text style={{ ...headerCellStyle, flex: 1 }}>Tier</Text>
        <Text style={{ ...headerCellStyle, flex: 1.5 }}>Price</Text>
        <Text style={{ ...headerCellStyle, flex: 2.5 }}>Key Feature</Text>
      </View>
      {/* Data rows */}
      {accommodations.map((acc, i) => {
        const isAlt = i % 2 === 1;
        const cs = isAlt ? cellAltStyle : cellStyle;
        const isLast = i === accommodations.length - 1;
        const rowStyle = isLast ? styles.tableRowLast : styles.tableRow;
        return (
          <View key={acc.id} style={rowStyle}>
            <Text style={{ ...cs, flex: 2.5, fontWeight: 'bold' }}>{acc.name}</Text>
            <Text style={{ ...cs, flex: 1.5 }}>{acc.town}</Text>
            <Text style={{ ...cs, flex: 1.2 }}>{TYPE_LABELS[acc.type]}</Text>
            <Text style={{ ...cs, flex: 1 }}>{TIER_LABELS[acc.tier]}</Text>
            <Text style={{ ...cs, flex: 1.5 }}>{acc.priceRange}</Text>
            <Text style={{ ...cs, flex: 2.5 }}>{acc.highlights[0]}</Text>
          </View>
        );
      })}
    </View>
  );
};

const PickByNeedGrid: React.FC = () => (
  <View style={{ marginTop: 20 }}>
    <Text style={{
      fontSize: 14,
      fontFamily: 'Playfair Display',
      fontWeight: 'bold',
      color: colors.primary,
      marginBottom: 10,
    }}>
      Pick by Need
    </Text>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
      {PICK_BY_NEED.map(pick => (
        <View key={pick.category} style={{
          width: '48%',
          padding: 10,
          backgroundColor: colors.backgroundAlt,
          borderRadius: 6,
          borderLeftWidth: 3,
          borderLeftColor: colors.accent,
        }}>
          <Text style={{ fontSize: 7, fontWeight: 'bold', color: colors.accent, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 3 }}>
            {pick.category}
          </Text>
          <Text style={{ fontSize: 10, fontWeight: 'bold', color: colors.primary, marginBottom: 3 }}>
            {pick.name}
          </Text>
          <Text style={{ fontSize: 8, color: colors.textLight, lineHeight: 1.4 }}>
            {pick.reason}
          </Text>
        </View>
      ))}
    </View>
  </View>
);

const TownGroupHeader: React.FC<{ town: string; count: number }> = ({ town, count }) => (
  <View style={{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    paddingBottom: 6,
    borderBottomWidth: 2,
    borderBottomColor: colors.accent,
  }} wrap={false}>
    <Text style={{
      fontSize: 16,
      fontFamily: 'Playfair Display',
      fontWeight: 'bold',
      color: colors.secondary,
    }}>
      {town}
    </Text>
    <Text style={{
      fontSize: 8,
      color: colors.textLight,
      marginLeft: 8,
      backgroundColor: colors.backgroundAlt,
      paddingVertical: 2,
      paddingHorizontal: 8,
      borderRadius: 10,
    }}>
      {count} {count === 1 ? 'pick' : 'picks'}
    </Text>
  </View>
);

export const AccommodationsSection: React.FC<AccommodationsSectionProps> = ({ accommodations }) => {
  const townGroups = groupByTown(accommodations);

  return (
    <>
      {/* Page 1: Section title + intro + booking tips */}
      <Page size="A4" style={styles.page}>
        <PDFHeader sectionName="Where to Stay" />
        <SectionTitle
          number={4}
          title="Where to Stay"
          subtitle="Honest picks for every budget — from €25 guesthouses to boutique splurges"
        />
        <Text style={styles.introText}>
          The Algarve has everything from backpacker hostels to five-star cliff resorts.
          These are the places we'd book ourselves — each one chosen because it offers
          genuine value, a great location, or something you won't find in a chain hotel.
        </Text>
        <Text style={styles.introText}>
          We've organized picks by town so you can match your accommodation to
          the area that suits your trip style (see our Town Profiles section for
          detailed "stay if / skip if" guidance on each town).
        </Text>

        <View style={styles.tipBox}>
          <Text style={styles.tipLabel}>Booking Tips</Text>
          <Text style={styles.tipText}>
            • Book 3-4 months ahead for July/August — prices double and good places sell out
          </Text>
          <Text style={styles.tipText}>
            • Shoulder season (May-June, September-October) offers the best value — 30-50% less than peak
          </Text>
          <Text style={styles.tipText}>
            • Booking.com and Airbnb dominate in Portugal. Check both — prices vary significantly
          </Text>
          <Text style={styles.tipText}>
            • Always book direct with the property if possible — often 10-15% cheaper than platforms
          </Text>
        </View>
        <PDFFooter />
      </Page>

      {/* Page 2: Comparison table + Pick by Need */}
      <Page size="A4" style={styles.page}>
        <PDFHeader sectionName="Where to Stay" />
        <Text style={{
          fontSize: 14,
          fontFamily: 'Playfair Display',
          fontWeight: 'bold',
          color: colors.primary,
          marginBottom: 4,
        }}>
          At a Glance — All 20 Picks
        </Text>
        <Text style={{ fontSize: 9, color: colors.textLight, marginBottom: 4 }}>
          Quick comparison of every property in this guide. See individual cards below for full details.
        </Text>
        <ComparisonTable accommodations={accommodations} />
        <PickByNeedGrid />
        <PDFFooter />
      </Page>

      {/* Accommodation cards — grouped by town */}
      <Page size="A4" style={styles.page} wrap>
        <PDFHeader sectionName="Where to Stay" />
        {townGroups.map(group => (
          <View key={group.town}>
            <TownGroupHeader town={group.town} count={group.items.length} />
            {group.items.map(accommodation => (
              <AccommodationCard key={accommodation.id} accommodation={accommodation} />
            ))}
          </View>
        ))}
        <PDFFooter />
      </Page>
    </>
  );
};

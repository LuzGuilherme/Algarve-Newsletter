import React from 'react';
import { View, Text, Image } from '@react-pdf/renderer';
import { colors } from '../../../utils/pdfStyles';
import type { GuideTown, AlgarveRegion, PriceLevel } from '../../../types/guide';

interface TownCardProps {
  town: GuideTown;
}

function resolveImageUrl(path: string): string {
  if (path.startsWith('http')) return path;
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  return `${origin}${path}`;
}

const REGION_CONFIG: Record<AlgarveRegion, { label: string; color: string; bg: string }> = {
  western: { label: 'Western Algarve', color: '#0369A1', bg: '#E0F2FE' },
  central: { label: 'Central Algarve', color: '#7C3AED', bg: '#EDE9FE' },
  eastern: { label: 'Eastern Algarve', color: '#059669', bg: '#D1FAE5' },
  inland: { label: 'Inland Algarve', color: '#92400E', bg: '#FEF3C7' },
};

const PRICE_CONFIG: Record<PriceLevel, { label: string; color: string; bg: string }> = {
  budget: { label: 'Budget-Friendly', color: '#065F46', bg: '#D1FAE5' },
  'mid-range': { label: 'Mid-Range', color: '#92400E', bg: '#FEF3C7' },
  expensive: { label: 'Premium', color: '#BE185D', bg: '#FCE7F3' },
};

const STAT_LABELS: Record<string, string> = {
  walkability: 'Walkability',
  nightlife: 'Nightlife',
  beaches: 'Beaches',
  foodScene: 'Food Scene',
  value: 'Value',
};

// Deterministic color based on town ID for placeholder headers
const TOWN_HEADER_COLORS: Record<string, string> = {
  lagos: '#0369A1',
  tavira: '#059669',
  faro: '#7C3AED',
  monchique: '#2D6A4F',
  ferragudo: '#1B4965',
  vilamoura: '#7C3AED',
  aljezur: '#9D4EDD',
  quarteira: '#0369A1',
  silves: '#92400E',
  portimao: '#D97706',
  sagres: '#0E7490',
  olhao: '#059669',
  loule: '#92400E',
  carvoeiro: '#BE185D',
  albufeira: '#DC2626',
};

// -- Sub-components --

const StatDots: React.FC<{ value: number }> = ({ value }) => (
  <View style={{ flexDirection: 'row', gap: 2 }}>
    {[1, 2, 3, 4, 5].map(i => (
      <View
        key={i}
        style={{
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: i <= value ? colors.accent : '#E2E8F0',
        }}
      />
    ))}
  </View>
);

const QuickStatsBar: React.FC<{ stats: GuideTown['quickStats'] }> = ({ stats }) => (
  <View style={{
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 4,
    padding: 6,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  }}>
    {Object.entries(stats).map(([key, val]) => (
      <View key={key} style={{ alignItems: 'center', flex: 1 }}>
        <Text style={{ fontSize: 7, color: colors.textLight, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 3 }}>
          {STAT_LABELS[key] || key}
        </Text>
        <StatDots value={val} />
      </View>
    ))}
  </View>
);

const BestForChips: React.FC<{ items: string[] }> = ({ items }) => (
  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginBottom: 6 }}>
    {items.map(item => (
      <Text key={item} style={{
        fontSize: 7,
        color: colors.secondary,
        backgroundColor: '#E0F2FE',
        paddingVertical: 2,
        paddingHorizontal: 7,
        borderRadius: 10,
        textTransform: 'capitalize',
      }}>
        {item}
      </Text>
    ))}
  </View>
);

const DontMissItem: React.FC<{ index: number; name: string; description: string }> = ({ index, name, description }) => (
  <View style={{ flexDirection: 'row', marginBottom: 4, alignItems: 'flex-start' }}>
    <View style={{
      width: 14,
      height: 14,
      borderRadius: 7,
      backgroundColor: colors.accent,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 6,
      marginTop: 1,
    }}>
      <Text style={{ fontSize: 7, fontWeight: 'bold', color: colors.white }}>{index + 1}</Text>
    </View>
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 8, fontWeight: 'bold', color: colors.text, marginBottom: 1 }}>{name}</Text>
      <Text style={{ fontSize: 7, color: colors.textLight, lineHeight: 1.3 }}>{description}</Text>
    </View>
  </View>
);

const EateryItem: React.FC<{ name: string; cuisine: string }> = ({ name, cuisine }) => (
  <View style={{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  }}>
    <Text style={{ fontSize: 8, fontWeight: 'bold', color: colors.text }}>{name}</Text>
    <Text style={{ fontSize: 7, color: colors.textLight, fontStyle: 'italic' }}>{cuisine}</Text>
  </View>
);

const TownHeader: React.FC<{ town: GuideTown }> = ({ town }) => {
  const regionConfig = REGION_CONFIG[town.region];
  const bgColor = TOWN_HEADER_COLORS[town.id] || colors.primary;

  if (town.image) {
    return (
      <View style={{ width: '100%', height: 120, borderRadius: 6, marginBottom: 8, overflow: 'hidden', position: 'relative' }}>
        <Image src={resolveImageUrl(town.image)} style={{ width: '100%', height: 120, objectFit: 'cover' }} />
        {/* Gradient overlay */}
        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, backgroundColor: 'rgba(0,0,0,0.5)' }} />
        {/* Town name */}
        <Text style={{
          position: 'absolute', bottom: 22, left: 14,
          fontSize: 22, fontFamily: 'Playfair Display', fontWeight: 'bold', color: colors.white,
        }}>
          {town.name}
        </Text>
        {/* Region badge */}
        <View style={{
          position: 'absolute', bottom: 8, left: 14,
          backgroundColor: regionConfig.bg,
          paddingVertical: 2, paddingHorizontal: 8,
          borderRadius: 3,
        }}>
          <Text style={{ fontSize: 7, fontWeight: 'bold', color: regionConfig.color, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            {regionConfig.label}
          </Text>
        </View>
        {/* Airport distance */}
        <Text style={{
          position: 'absolute', bottom: 10, right: 14,
          fontSize: 7, color: colors.white, opacity: 0.85,
        }}>
          {town.airportDistance}
        </Text>
      </View>
    );
  }

  // Placeholder header
  return (
    <View style={{
      width: '100%', height: 120, borderRadius: 6, marginBottom: 8,
      backgroundColor: bgColor, justifyContent: 'center', alignItems: 'center',
      overflow: 'hidden', position: 'relative',
    }}>
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, backgroundColor: colors.accent }} />
      <Text style={{
        fontSize: 22, fontFamily: 'Playfair Display', fontWeight: 'bold',
        color: colors.white, textAlign: 'center', marginBottom: 4,
      }}>
        {town.name}
      </Text>
      {/* Region badge */}
      <View style={{
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingVertical: 2, paddingHorizontal: 8, borderRadius: 3,
      }}>
        <Text style={{ fontSize: 7, fontWeight: 'bold', color: colors.white, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          {regionConfig.label}
        </Text>
      </View>
      {/* Airport distance */}
      <Text style={{
        position: 'absolute', bottom: 10, right: 14,
        fontSize: 7, color: colors.white, opacity: 0.7,
      }}>
        {town.airportDistance}
      </Text>
    </View>
  );
};

// -- Main component --

export const TownCard: React.FC<TownCardProps> = ({ town }) => {
  const priceConfig = PRICE_CONFIG[town.priceLevel];

  return (
    <View style={{
      marginBottom: 10,
      padding: 10,
      backgroundColor: colors.backgroundAlt,
      borderRadius: 8,
      borderLeftWidth: 5,
      borderLeftColor: REGION_CONFIG[town.region].color,
    }}>
      {/* Header with image/placeholder + region badge */}
      <TownHeader town={town} />

      {/* Vibe line + Price badge on one row */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6, gap: 8 }}>
        <Text style={{
          fontSize: 10, fontStyle: 'italic', color: colors.textLight,
          lineHeight: 1.4, flex: 1,
        }}>
          {town.vibeLine}
        </Text>
        <View style={{
          backgroundColor: priceConfig.bg,
          paddingVertical: 2, paddingHorizontal: 7, borderRadius: 3,
        }}>
          <Text style={{ fontSize: 7, fontWeight: 'bold', color: priceConfig.color }}>
            {priceConfig.label}
          </Text>
        </View>
      </View>

      {/* Quick stats bar */}
      <QuickStatsBar stats={town.quickStats} />

      {/* Atmosphere paragraph */}
      <Text style={{
        fontSize: 8, color: colors.text, lineHeight: 1.4,
        marginBottom: 8, paddingLeft: 8,
        borderLeftWidth: 2, borderLeftColor: colors.accent,
      }}>
        {town.atmosphere}
      </Text>

      {/* Best For chips */}
      <Text style={{ fontSize: 8, fontWeight: 'bold', color: colors.text, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>
        Best For
      </Text>
      <BestForChips items={town.bestFor} />

      {/* Two-column layout: Don't Miss + Where to Eat */}
      <View style={{ flexDirection: 'row', gap: 10, marginBottom: 8 }}>
        {/* Don't Miss */}
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 8, fontWeight: 'bold', color: colors.text, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Don't Miss
          </Text>
          {town.dontMiss.map((item, i) => (
            <DontMissItem key={item.name} index={i} name={item.name} description={item.description} />
          ))}
        </View>

        {/* Where to Eat */}
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 8, fontWeight: 'bold', color: colors.text, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Where to Eat
          </Text>
          <View style={{ backgroundColor: colors.white, borderRadius: 4, overflow: 'hidden', borderWidth: 1, borderColor: '#E2E8F0' }}>
            {town.whereToEat.map(eatery => (
              <EateryItem key={eatery.name} name={eatery.name} cuisine={eatery.cuisine} />
            ))}
          </View>
        </View>
      </View>

      {/* Side-by-side Stay If / Skip If boxes */}
      <View style={{ flexDirection: 'row', gap: 8, marginBottom: 6 }}>
        {/* Stay If */}
        <View style={{ flex: 1, padding: 6, backgroundColor: '#D1FAE5', borderRadius: 4 }}>
          <Text style={{ fontSize: 7, fontWeight: 'bold', color: '#065F46', marginBottom: 2, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Stay If
          </Text>
          <Text style={{ fontSize: 7, color: '#065F46', lineHeight: 1.3 }}>{town.stayIf}</Text>
        </View>
        {/* Skip If */}
        <View style={{ flex: 1, padding: 6, backgroundColor: '#FEE2E2', borderRadius: 4 }}>
          <Text style={{ fontSize: 7, fontWeight: 'bold', color: '#991B1B', marginBottom: 2, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Skip If
          </Text>
          <Text style={{ fontSize: 7, color: '#7F1D1D', lineHeight: 1.3 }}>{town.skipIf}</Text>
        </View>
      </View>

      {/* Day trip connections */}
      <View style={{
        padding: 6,
        backgroundColor: colors.backgroundWarm,
        borderRadius: 4,
        borderLeftWidth: 3,
        borderLeftColor: colors.accent,
      }}>
        <Text style={{ fontSize: 7, fontWeight: 'bold', color: colors.accent, marginBottom: 2, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Day Trip Connections
        </Text>
        <Text style={{ fontSize: 7, color: colors.text, lineHeight: 1.3 }}>{town.dayTripPotential}</Text>
      </View>
    </View>
  );
};

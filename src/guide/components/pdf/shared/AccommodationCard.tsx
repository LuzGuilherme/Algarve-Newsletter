import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { colors } from '../../../utils/pdfStyles';
import type { GuideAccommodation, AccommodationType, AccommodationTier } from '../../../types/guide';

interface AccommodationCardProps {
  accommodation: GuideAccommodation;
}

const TYPE_LABELS: Record<AccommodationType, string> = {
  'hotel': 'Hotel',
  'boutique': 'Boutique Hotel',
  'guesthouse': 'Guesthouse',
  'apartment': 'Apartment',
  'villa': 'Villa',
};

const TIER_COLORS: Record<AccommodationTier, { bg: string; text: string }> = {
  'budget': { bg: '#D1FAE5', text: '#065F46' },
  'mid-range': { bg: '#FEF3C7', text: '#92400E' },
  'splurge': { bg: '#FCE7F3', text: '#BE185D' },
};

const TIER_LABELS: Record<AccommodationTier, string> = {
  'budget': 'Budget',
  'mid-range': 'Mid-Range',
  'splurge': 'Splurge',
};

const TYPE_COLORS: Record<AccommodationType, string> = {
  'hotel': '#0369A1',
  'boutique': '#7C3AED',
  'guesthouse': '#059669',
  'apartment': '#92400E',
  'villa': '#D97706',
};

const TYPE_BG: Record<AccommodationType, string> = {
  'hotel': '#E0F2FE',
  'boutique': '#EDE9FE',
  'guesthouse': '#D1FAE5',
  'apartment': '#FEF3C7',
  'villa': '#FEF3C7',
};

// -- Sub-components --

const AccommodationPlaceholder: React.FC<{ accommodation: GuideAccommodation }> = ({ accommodation }) => {
  const bgColor = TYPE_COLORS[accommodation.type];
  return (
    <View style={{
      width: '100%',
      height: 80,
      borderRadius: 4,
      marginBottom: 10,
      backgroundColor: bgColor,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    }}>
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, backgroundColor: colors.accent }} />
      <Text style={{ fontSize: 14, fontFamily: 'Playfair Display', fontWeight: 'bold', color: colors.white, textAlign: 'center', marginBottom: 3 }}>
        {accommodation.name}
      </Text>
      <Text style={{ fontSize: 8, color: colors.white, opacity: 0.8, textTransform: 'uppercase', letterSpacing: 2 }}>
        {TYPE_LABELS[accommodation.type]}
      </Text>
      <Text style={{ fontSize: 7, color: colors.white, opacity: 0.6, marginTop: 2 }}>
        {accommodation.town}
      </Text>
    </View>
  );
};

const HighlightChips: React.FC<{ items: string[] }> = ({ items }) => (
  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
    {items.map(item => (
      <Text key={item} style={{
        fontSize: 7,
        color: colors.secondary,
        backgroundColor: '#E0F2FE',
        paddingVertical: 2,
        paddingHorizontal: 7,
        borderRadius: 10,
      }}>
        {item}
      </Text>
    ))}
  </View>
);

const QuickInfoBar: React.FC<{ walkToBeach: string; walkToCenter: string }> = ({ walkToBeach, walkToCenter }) => (
  <View style={{
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F8FAFC',
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  }}>
    <View style={{ alignItems: 'center', flex: 1 }}>
      <Text style={{ fontSize: 7, color: colors.textLight, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 }}>
        Beach
      </Text>
      <Text style={{ fontSize: 8, color: colors.text, fontWeight: 'bold', textAlign: 'center' }}>
        {walkToBeach}
      </Text>
    </View>
    <View style={{ width: 1, backgroundColor: '#E2E8F0' }} />
    <View style={{ alignItems: 'center', flex: 1 }}>
      <Text style={{ fontSize: 7, color: colors.textLight, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 }}>
        Centre
      </Text>
      <Text style={{ fontSize: 8, color: colors.text, fontWeight: 'bold', textAlign: 'center' }}>
        {walkToCenter}
      </Text>
    </View>
  </View>
);

export const AccommodationCard: React.FC<AccommodationCardProps> = ({ accommodation }) => {
  const typeColor = TYPE_COLORS[accommodation.type];
  const tierStyle = TIER_COLORS[accommodation.tier];

  return (
    <View style={{
      marginBottom: 18,
      padding: 14,
      backgroundColor: colors.backgroundAlt,
      borderRadius: 8,
      borderLeftWidth: 5,
      borderLeftColor: typeColor,
    }} wrap={false}>
      {/* 1. Header strip */}
      <AccommodationPlaceholder accommodation={accommodation} />

      {/* 2. Badge row — Type + Tier + Price */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 }}>
        <Text style={{
          fontSize: 7,
          fontWeight: 'bold',
          color: TYPE_COLORS[accommodation.type],
          backgroundColor: TYPE_BG[accommodation.type],
          paddingVertical: 2,
          paddingHorizontal: 6,
          borderRadius: 3,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        }}>
          {TYPE_LABELS[accommodation.type]}
        </Text>
        <Text style={{
          fontSize: 7,
          fontWeight: 'bold',
          color: tierStyle.text,
          backgroundColor: tierStyle.bg,
          paddingVertical: 2,
          paddingHorizontal: 6,
          borderRadius: 3,
        }}>
          {TIER_LABELS[accommodation.tier]}
        </Text>
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: colors.success, marginLeft: 'auto' }}>
          {accommodation.priceRange}
        </Text>
      </View>

      {/* 3. Highlight chips */}
      <HighlightChips items={accommodation.highlights} />

      {/* 4. Quick Info bar — Beach + Centre */}
      <QuickInfoBar walkToBeach={accommodation.walkToBeach} walkToCenter={accommodation.walkToCenter} />

      {/* 5. Description — left-bordered paragraph */}
      <Text style={{
        fontSize: 9,
        color: colors.text,
        lineHeight: 1.5,
        marginBottom: 12,
        paddingLeft: 8,
        borderLeftWidth: 2,
        borderLeftColor: colors.accent,
      }}>
        {accommodation.description}
      </Text>

      {/* 6. "Why We Chose It" callout */}
      <View style={{
        padding: 10,
        backgroundColor: '#FFFBEB',
        borderRadius: 4,
        borderLeftWidth: 3,
        borderLeftColor: colors.accent,
        marginBottom: 10,
      }}>
        <Text style={{ fontSize: 7, fontWeight: 'bold', color: colors.accent, marginBottom: 3, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Why We Chose It
        </Text>
        <Text style={{ fontSize: 9, color: colors.text, lineHeight: 1.5, fontStyle: 'italic' }}>
          {accommodation.whyWeChoseIt}
        </Text>
      </View>

      {/* 7. Side-by-side boxes: Best For + Insider Tip */}
      <View style={{ flexDirection: 'row', gap: 10, marginBottom: accommodation.priceNote ? 8 : 0 }}>
        {/* Best For */}
        <View style={{ flex: 1, padding: 8, backgroundColor: '#D1FAE5', borderRadius: 4 }}>
          <Text style={{ fontSize: 7, fontWeight: 'bold', color: '#065F46', marginBottom: 3, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Best For
          </Text>
          <Text style={{ fontSize: 8, color: '#065F46', lineHeight: 1.4 }}>
            {accommodation.bestFor.join(', ')}
          </Text>
        </View>
        {/* Insider Tip */}
        <View style={{ flex: 1, padding: 8, backgroundColor: '#FEF3C7', borderRadius: 4 }}>
          <Text style={{ fontSize: 7, fontWeight: 'bold', color: '#92400E', marginBottom: 3, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Insider Tip
          </Text>
          <Text style={{ fontSize: 8, color: '#92400E', lineHeight: 1.4 }}>
            {accommodation.insiderTip}
          </Text>
        </View>
      </View>

      {/* 8. Price Note (if present) */}
      {accommodation.priceNote && (
        <Text style={{ fontSize: 8, color: colors.textMuted, fontStyle: 'italic', marginTop: 6 }}>
          {accommodation.priceNote}
        </Text>
      )}
    </View>
  );
};

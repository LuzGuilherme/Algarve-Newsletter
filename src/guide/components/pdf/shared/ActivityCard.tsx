import React from 'react';
import { View, Text, Link, Image } from '@react-pdf/renderer';
import { styles, colors } from '../../../utils/pdfStyles';
import type { GuideActivity, ActivityCategory, ActivityDifficulty, ActivityGroupSize } from '../../../types/guide';
import { TipBox } from './TipBox';

const CATEGORY_COLORS: Record<ActivityCategory, string> = {
  'water': '#0369A1',
  'adventure': '#7C3AED',
  'cultural': '#92400E',
  'food-drink': '#059669',
};

const CATEGORY_BG: Record<ActivityCategory, string> = {
  'water': '#E0F2FE',
  'adventure': '#EDE9FE',
  'cultural': '#FEF3C7',
  'food-drink': '#D1FAE5',
};

const CATEGORY_LABELS: Record<ActivityCategory, string> = {
  'water': 'Water',
  'adventure': 'Adventure',
  'cultural': 'Cultural',
  'food-drink': 'Food & Drink',
};

const DIFFICULTY_CONFIG: Record<ActivityDifficulty, { label: string; color: string; bg: string }> = {
  'easy': { label: 'Easy', color: '#065F46', bg: '#D1FAE5' },
  'moderate': { label: 'Moderate', color: '#92400E', bg: '#FEF3C7' },
  'challenging': { label: 'Challenging', color: '#991B1B', bg: '#FEE2E2' },
};

const GROUP_SIZE_CONFIG: Record<ActivityGroupSize, string> = {
  'small': 'Small Group (2–12)',
  'medium': 'Medium Group (12–30)',
  'large': 'Large Group (30+)',
};

interface ActivityCardProps {
  activity: GuideActivity;
}

// Resolve image path to full URL for react-pdf's renderer
function resolveImageUrl(path: string): string {
  if (path.startsWith('http')) return path;
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  return `${origin}${path}`;
}

const ActivityPlaceholder: React.FC<{ activity: GuideActivity }> = ({ activity }) => {
  const bgColor = CATEGORY_COLORS[activity.category];

  if (activity.image) {
    return (
      <Image src={resolveImageUrl(activity.image)} style={{
        width: '100%',
        height: 180,
        borderRadius: 4,
        marginBottom: 10,
        objectFit: 'cover',
      }} />
    );
  }

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
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, backgroundColor: colors.accent }} />
      <Text style={{ fontSize: 14, fontFamily: 'Playfair Display', fontWeight: 'bold', color: colors.white, textAlign: 'center', marginBottom: 3 }}>
        {activity.name}
      </Text>
      <Text style={{ fontSize: 8, color: colors.white, opacity: 0.8, textTransform: 'uppercase', letterSpacing: 2 }}>
        {CATEGORY_LABELS[activity.category]}
      </Text>
    </View>
  );
};

const WhatToBringChips: React.FC<{ items: string[] }> = ({ items }) => (
  <View style={{ marginTop: 8, marginBottom: 6 }}>
    <Text style={{ fontSize: 8, fontWeight: 'bold', color: colors.text, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>
      What to Bring
    </Text>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
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
  </View>
);

export const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  const catColor = CATEGORY_COLORS[activity.category];
  const diffConfig = DIFFICULTY_CONFIG[activity.difficultyLevel];

  return (
    <View style={{ ...styles.card, borderLeftColor: catColor }} wrap={false}>
      {/* Colored placeholder header */}
      <ActivityPlaceholder activity={activity} />

      {/* Header row: name + difficulty badge + category badge */}
      <View style={styles.cardHeader}>
        <Text style={{ ...styles.cardName, color: catColor, flex: 1 }}>{activity.name}</Text>
        <Text style={{
          ...styles.categoryBadge,
          color: diffConfig.color,
          backgroundColor: diffConfig.bg,
          marginRight: 4,
        }}>
          {diffConfig.label}
        </Text>
        <Text style={{
          ...styles.categoryBadge,
          color: CATEGORY_COLORS[activity.category],
          backgroundColor: CATEGORY_BG[activity.category],
        }}>
          {CATEGORY_LABELS[activity.category]}
        </Text>
      </View>

      {/* Group size */}
      <Text style={{ fontSize: 8, color: colors.textLight, marginBottom: 6 }}>
        {GROUP_SIZE_CONFIG[activity.groupSize]}
      </Text>

      {/* Description */}
      <Text style={styles.cardVibe}>{activity.description}</Text>

      {/* Detail rows */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Duration</Text>
          <Text style={styles.detailValue}>{activity.duration}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Price</Text>
          <Text style={styles.detailValue}>{activity.priceRange}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Departs From</Text>
          <Text style={styles.detailValue}>{activity.departurePoints.join(', ')}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Best Season</Text>
          <Text style={styles.detailValue}>{activity.bestSeason}</Text>
        </View>
        {activity.bookingUrl && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Book</Text>
            <Link src={activity.bookingUrl}>
              <Text style={{ ...styles.detailValue, color: colors.secondary, textDecoration: 'underline' }}>
                Book on {activity.bookingPlatform}
              </Text>
            </Link>
          </View>
        )}
      </View>

      {/* What to Bring chips */}
      {activity.whatToBring.length > 0 && (
        <WhatToBringChips items={activity.whatToBring} />
      )}

      {/* Insider Tip */}
      <TipBox label="Insider Tip" text={activity.insiderTip} />

      {/* Skip If warning box */}
      <TipBox label="Skip If" text={activity.skipIf} type="skip" />
    </View>
  );
};

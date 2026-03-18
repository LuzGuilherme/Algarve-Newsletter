import React from 'react';
import { View, Text, Image } from '@react-pdf/renderer';
import { styles, colors } from '../../../utils/pdfStyles';
import type { GuideBeach, BeachAccessLevel } from '../../../types/guide';
import { TipBox } from './TipBox';

const ACCESS_CONFIG: Record<BeachAccessLevel, { label: string; color: string; bg: string }> = {
  'easy': { label: 'Easy Access', color: '#065F46', bg: '#D1FAE5' },
  'moderate': { label: 'Moderate', color: '#92400E', bg: '#FEF3C7' },
  'challenging': { label: 'Challenging', color: '#991B1B', bg: '#FEE2E2' },
};

interface BeachCardProps {
  beach: GuideBeach;
  showImage?: boolean;
}

// Resolve image path to full URL for react-pdf's renderer
function resolveImageUrl(path: string): string {
  if (path.startsWith('http')) return path;
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  return `${origin}${path}`;
}

export const BeachCard: React.FC<BeachCardProps> = ({ beach, showImage = false }) => (
  <View style={styles.card} wrap={false}>
    {showImage && beach.image && (
      <Image src={resolveImageUrl(beach.image)} style={styles.image} />
    )}

    <View style={styles.cardHeader}>
      <Text style={styles.cardName}>{beach.name}</Text>
      {beach.accessLevel && (
        <Text style={{
          ...styles.categoryBadge,
          color: ACCESS_CONFIG[beach.accessLevel].color,
          backgroundColor: ACCESS_CONFIG[beach.accessLevel].bg,
        }}>
          {ACCESS_CONFIG[beach.accessLevel].label}
        </Text>
      )}
    </View>

    <Text style={styles.gps}>
      {beach.coordinates.lat.toFixed(4)}, {beach.coordinates.lng.toFixed(4)}
    </Text>

    <Text style={styles.cardVibe}>{beach.vibeLine}</Text>

    <View style={styles.detailsContainer}>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Best Time</Text>
        <Text style={styles.detailValue}>{beach.bestTime}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Parking</Text>
        <Text style={styles.detailValue}>{beach.parking}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Facilities</Text>
        <Text style={styles.detailValue}>
          {beach.facilities.length === 0
            ? 'None — bring everything you need'
            : beach.facilities.join(', ')}
        </Text>
      </View>
    </View>

    <TipBox label="My Take" text={beach.personalTake} />

    <TipBox label="Skip If" text={beach.skipIf} type="skip" />
  </View>
);

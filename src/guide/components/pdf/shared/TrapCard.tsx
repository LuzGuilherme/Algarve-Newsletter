import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles, colors } from '../../../utils/pdfStyles';
import type { TouristTrap, TrapType } from '../../../types/guide';

interface TrapCardProps {
  trap: TouristTrap;
}

const TYPE_LABELS: Record<TrapType, string> = {
  restaurant: 'RESTAURANT',
  attraction: 'ATTRACTION',
  beach: 'BEACH',
  area: 'AREA',
  tour: 'TOUR',
  behavior: 'MISTAKE',
};

const TYPE_COLORS: Record<TrapType, { bg: string; text: string }> = {
  restaurant: { bg: '#FEF3C7', text: '#92400E' },
  attraction: { bg: '#FEE2E2', text: '#991B1B' },
  beach: { bg: '#E0F2FE', text: '#0369A1' },
  area: { bg: '#FCE7F3', text: '#BE185D' },
  tour: { bg: '#EDE9FE', text: '#7C3AED' },
  behavior: { bg: '#FEF3C7', text: '#92400E' },
};

export const TrapCard: React.FC<TrapCardProps> = ({ trap }) => {
  const typeStyle = TYPE_COLORS[trap.type];

  return (
    <View style={styles.card} wrap={false}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardName}>{trap.name}</Text>
        <Text style={{
          ...styles.cardBadge,
          backgroundColor: typeStyle.bg,
          color: typeStyle.text,
        }}>
          {TYPE_LABELS[trap.type]}
        </Text>
      </View>

      <Text style={styles.gps}>{trap.location}</Text>

      <View style={styles.skipBox}>
        <Text style={styles.skipLabel}>Why to Skip</Text>
        <Text style={styles.skipText}>{trap.whyToSkip}</Text>
      </View>

      <View style={styles.successBox}>
        <Text style={{ ...styles.tipLabel, color: colors.successText }}>Do This Instead</Text>
        <Text style={{ ...styles.successText, fontWeight: 'bold' }}>
          {trap.betterAlternative.name}
        </Text>
        <Text style={styles.successText}>{trap.betterAlternative.why}</Text>
        <Text style={{ ...styles.successText, fontStyle: 'italic', marginTop: 4 }}>
          Location: {trap.betterAlternative.location}
        </Text>
      </View>
    </View>
  );
};

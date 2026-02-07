import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../../../utils/pdfStyles';
import type { TouristTrap } from '../../../types/guide';

interface TrapCardProps {
  trap: TouristTrap;
}

export const TrapCard: React.FC<TrapCardProps> = ({ trap }) => (
  <View style={styles.card} wrap={false}>
    <View style={styles.cardHeader}>
      <Text style={styles.cardName}>{trap.name}</Text>
      <Text style={styles.cardBadge}>{trap.type.toUpperCase()}</Text>
    </View>

    <Text style={styles.gps}>{trap.location}</Text>

    <View style={styles.skipBox}>
      <Text style={styles.skipLabel}>Why to Skip</Text>
      <Text style={styles.skipText}>{trap.whyToSkip}</Text>
    </View>

    <View style={styles.successBox}>
      <Text style={{ ...styles.tipLabel, color: '#065F46' }}>Do This Instead</Text>
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

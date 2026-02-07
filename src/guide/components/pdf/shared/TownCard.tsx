import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../../../utils/pdfStyles';
import type { GuideTown } from '../../../types/guide';
import { TipBox } from './TipBox';

interface TownCardProps {
  town: GuideTown;
}

export const TownCard: React.FC<TownCardProps> = ({ town }) => (
  <View style={styles.card} wrap={false}>
    <View style={styles.cardHeader}>
      <Text style={styles.cardName}>{town.name}</Text>
    </View>

    <Text style={styles.cardVibe}>{town.vibeLine}</Text>

    <View style={styles.detailsContainer}>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Best For</Text>
        <Text style={styles.detailValue}>{town.bestFor.join(', ')}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Stay If</Text>
        <Text style={styles.detailValue}>{town.stayIf}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Don't Miss</Text>
        <Text style={styles.detailValue}>{town.dontMiss.join(', ')}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Where to Eat</Text>
        <Text style={styles.detailValue}>{town.whereToEat.join(', ')}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Day Trips</Text>
        <Text style={styles.detailValue}>{town.dayTripPotential}</Text>
      </View>
    </View>

    <TipBox label="Skip If" text={town.skipIf} type="skip" />
  </View>
);

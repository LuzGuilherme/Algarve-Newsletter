import React from 'react';
import { View, Text, Image } from '@react-pdf/renderer';
import { styles } from '../../../utils/pdfStyles';
import type { GuideBeach } from '../../../types/guide';
import { TipBox } from './TipBox';

interface BeachCardProps {
  beach: GuideBeach;
  showImage?: boolean;
}

export const BeachCard: React.FC<BeachCardProps> = ({ beach, showImage = false }) => (
  <View style={styles.card} wrap={false}>
    {showImage && beach.image && (
      <Image src={beach.image} style={styles.image} />
    )}

    <View style={styles.cardHeader}>
      <Text style={styles.cardName}>{beach.name}</Text>
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

      {beach.facilities.length > 0 && (
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Facilities</Text>
          <Text style={styles.detailValue}>{beach.facilities.join(', ')}</Text>
        </View>
      )}

      {beach.facilities.length === 0 && (
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Facilities</Text>
          <Text style={styles.detailValue}>None - bring everything you need</Text>
        </View>
      )}
    </View>

    <TipBox label="My Take" text={beach.personalTake} />

    <TipBox label="Skip If" text={beach.skipIf} type="skip" />
  </View>
);

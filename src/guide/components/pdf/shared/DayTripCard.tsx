import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../../../utils/pdfStyles';
import type { DayTrip } from '../../../types/guide';

interface DayTripCardProps {
  dayTrip: DayTrip;
}

export const DayTripCard: React.FC<DayTripCardProps> = ({ dayTrip }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <Text style={styles.cardName}>{dayTrip.title}</Text>
    </View>

    <Text style={styles.cardVibe}>{dayTrip.subtitle}</Text>

    <View style={styles.detailsContainer}>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Duration</Text>
        <Text style={styles.detailValue}>{dayTrip.duration}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Distance</Text>
        <Text style={styles.detailValue}>{dayTrip.distance}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Start From</Text>
        <Text style={styles.detailValue}>{dayTrip.startPoint}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Best Season</Text>
        <Text style={styles.detailValue}>{dayTrip.bestSeason}</Text>
      </View>
    </View>

    <Text style={{ ...styles.detailLabel, marginTop: 12, marginBottom: 8 }}>Route:</Text>

    {dayTrip.route.map((stop, index) => (
      <View key={index} style={styles.listItem}>
        <Text style={styles.listBullet}>{index + 1}.</Text>
        <View style={{ flex: 1 }}>
          <Text style={{ ...styles.listText, fontWeight: 'bold' }}>
            {stop.stop} ({stop.duration})
          </Text>
          <Text style={styles.listText}>{stop.highlights.join(', ')}</Text>
          {stop.tip && (
            <Text style={{ ...styles.listText, fontStyle: 'italic', marginTop: 2 }}>
              Tip: {stop.tip}
            </Text>
          )}
        </View>
      </View>
    ))}

    <View style={{ ...styles.tipBox, marginTop: 12 }}>
      <Text style={styles.tipLabel}>Where to Eat</Text>
      <Text style={styles.tipText}>Lunch: {dayTrip.whereToEat.lunch}</Text>
      <Text style={styles.tipText}>Coffee: {dayTrip.whereToEat.coffee}</Text>
    </View>
  </View>
);

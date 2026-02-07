import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../../../utils/pdfStyles';
import type { GuideRestaurant } from '../../../types/guide';
import { TipBox } from './TipBox';

interface RestaurantCardProps {
  restaurant: GuideRestaurant;
}

const RESERVATION_LABELS = {
  'essential': 'Essential - book ahead',
  'recommended': 'Recommended on weekends',
  'not-needed': 'Walk-ins welcome',
};

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => (
  <View style={styles.card} wrap={false}>
    <View style={styles.cardHeader}>
      <Text style={styles.cardName}>{restaurant.name}</Text>
      <Text style={styles.price}>{restaurant.priceRange}</Text>
    </View>

    <Text style={styles.gps}>{restaurant.location}</Text>

    <Text style={styles.cardVibe}>{restaurant.knownFor}</Text>

    <View style={styles.detailsContainer}>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Reservations</Text>
        <Text style={styles.detailValue}>{RESERVATION_LABELS[restaurant.reservations]}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Best For</Text>
        <Text style={styles.detailValue}>{restaurant.bestFor.join(', ')}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Order This</Text>
        <Text style={styles.detailValue}>{restaurant.whatToOrder.join(', ')}</Text>
      </View>

      {restaurant.whatToSkip.length > 0 && (
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Skip</Text>
          <Text style={styles.detailValue}>{restaurant.whatToSkip.join(', ')}</Text>
        </View>
      )}
    </View>

    <TipBox label="Insider Tip" text={restaurant.insiderTip} />
  </View>
);

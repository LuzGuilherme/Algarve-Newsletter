import React from 'react';
import { View, Text, Image } from '@react-pdf/renderer';
import { styles, colors } from '../../../utils/pdfStyles';
import type { GuideRestaurant, RestaurantCategory } from '../../../types/guide';
import { TipBox } from './TipBox';

function resolveImageUrl(path: string): string {
  if (path.startsWith('http')) return path;
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  return `${origin}${path}`;
}

interface RestaurantCardProps {
  restaurant: GuideRestaurant;
}

const RESERVATION_LABELS = {
  'essential': 'Essential - book ahead',
  'recommended': 'Recommended on weekends',
  'not-needed': 'Walk-ins welcome',
};

const RESERVATION_COLORS = {
  'essential': colors.error,
  'recommended': colors.warning,
  'not-needed': colors.success,
};

const CATEGORY_COLORS: Record<RestaurantCategory, string> = {
  'traditional': '#92400E',
  'seafood': '#0369A1',
  'hidden-gem': '#7C3AED',
  'splurge': '#BE185D',
  'quick-honest': '#059669',
  'best-views': '#D97706',
};

const CATEGORY_BG: Record<RestaurantCategory, string> = {
  'traditional': '#FEF3C7',
  'seafood': '#E0F2FE',
  'hidden-gem': '#EDE9FE',
  'splurge': '#FCE7F3',
  'quick-honest': '#D1FAE5',
  'best-views': '#FEF3C7',
};

const CATEGORY_LABELS: Record<RestaurantCategory, string> = {
  'traditional': 'Traditional',
  'seafood': 'Seafood',
  'hidden-gem': 'Hidden Gem',
  'splurge': 'Fine Dining',
  'quick-honest': 'Quick Bite',
  'best-views': 'Best Views',
};

const PRICE_COLORS: Record<string, { bg: string; text: string }> = {
  '€': { bg: '#D1FAE5', text: '#065F46' },
  '€€': { bg: '#FEF3C7', text: '#92400E' },
  '€€€': { bg: '#FCE7F3', text: '#BE185D' },
};

const RestaurantPlaceholder: React.FC<{ restaurant: GuideRestaurant }> = ({ restaurant }) => {
  const bgColor = CATEGORY_COLORS[restaurant.category];
  return (
    <View style={{
      width: '100%',
      height: 110,
      borderRadius: 4,
      marginBottom: 10,
      backgroundColor: bgColor,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    }}>
      {/* Decorative top strip */}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, backgroundColor: colors.accent }} />
      <Text style={{ fontSize: 16, fontFamily: 'Playfair Display', fontWeight: 'bold', color: colors.white, textAlign: 'center', marginBottom: 4 }}>
        {restaurant.name}
      </Text>
      <Text style={{ fontSize: 9, color: colors.white, opacity: 0.8, textTransform: 'uppercase', letterSpacing: 2 }}>
        {CATEGORY_LABELS[restaurant.category]}
      </Text>
      <Text style={{ fontSize: 8, color: colors.white, opacity: 0.6, marginTop: 4 }}>
        {restaurant.town}
      </Text>
    </View>
  );
};

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const catColor = CATEGORY_COLORS[restaurant.category];
  const priceStyle = PRICE_COLORS[restaurant.priceRange] || PRICE_COLORS['€€'];

  return (
    <View style={{ ...styles.card, borderLeftColor: catColor }} wrap={false}>
      {/* Restaurant image or placeholder */}
      {restaurant.image ? (
        <Image src={resolveImageUrl(restaurant.image)} style={{ width: '100%', height: 110, objectFit: 'cover', borderRadius: 4, marginBottom: 10 }} />
      ) : (
        <RestaurantPlaceholder restaurant={restaurant} />
      )}

      {/* Header row: name + badges */}
      <View style={styles.cardHeader}>
        <Text style={{ ...styles.cardName, color: catColor }}>{restaurant.name}</Text>
        <View style={styles.badgeRow}>
          <Text style={{
            ...styles.categoryBadge,
            color: CATEGORY_COLORS[restaurant.category],
            backgroundColor: CATEGORY_BG[restaurant.category],
          }}>
            {CATEGORY_LABELS[restaurant.category]}
          </Text>
          <Text style={{
            ...styles.price,
            color: priceStyle.text,
            backgroundColor: priceStyle.bg,
            paddingVertical: 2,
            paddingHorizontal: 5,
            borderRadius: 3,
            fontSize: 9,
          }}>
            {restaurant.priceRange}
          </Text>
        </View>
      </View>

      {/* Location line with town badge */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
        <Text style={styles.gps}>
          {restaurant.location}
          {restaurant.coordinates && ` · ${restaurant.coordinates.lat.toFixed(4)}, ${restaurant.coordinates.lng.toFixed(4)}`}
        </Text>
        <Text style={styles.townBadge}>{restaurant.town}</Text>
      </View>

      <Text style={styles.cardVibe}>{restaurant.knownFor}</Text>

      <View style={styles.detailsContainer}>
        {/* Reservation row with color indicator */}
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Reservations</Text>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', flex: 1 }}>
            <View style={{
              ...styles.reservationDot,
              backgroundColor: RESERVATION_COLORS[restaurant.reservations],
            }} />
            <Text style={styles.detailValue}>
              {RESERVATION_LABELS[restaurant.reservations]}
              {restaurant.phone && ` · ${restaurant.phone}`}
            </Text>
          </View>
        </View>

        {(restaurant.openingHours || restaurant.closedDay) && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Hours</Text>
            <Text style={styles.detailValue}>
              {restaurant.openingHours}
              {restaurant.closedDay && ` · Closed ${restaurant.closedDay}`}
            </Text>
          </View>
        )}

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
};

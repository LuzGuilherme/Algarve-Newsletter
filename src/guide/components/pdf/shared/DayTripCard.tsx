import React from 'react';
import { View, Text, Image } from '@react-pdf/renderer';
import { colors } from '../../../utils/pdfStyles';
import type { DayTrip, TripType, DayTripStop } from '../../../types/guide';

// ============ CONSTANTS ============

function resolveImageUrl(path: string): string {
  if (path.startsWith('http')) return path;
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  return `${origin}${path}`;
}

export const TRIP_TYPE_CONFIG: Record<TripType, { label: string; color: string; bg: string }> = {
  beach: { label: 'Beach & Coast', color: '#0369A1', bg: '#E0F2FE' },
  nature: { label: 'Nature & Hiking', color: '#059669', bg: '#D1FAE5' },
  culture: { label: 'Culture & History', color: '#92400E', bg: '#FEF3C7' },
  city: { label: 'City Escape', color: '#7C3AED', bg: '#EDE9FE' },
};

const TRIP_HEADER_COLORS: Record<string, string> = {
  'western-coast': '#0369A1',
  'ria-formosa-east': '#059669',
  'mountain-escape': '#2D6A4F',
  'secret-beaches': '#1B4965',
  'seville-day-trip': '#7C3AED',
  'tavira-cacela-velha': '#92400E',
  'aljezur-costa-vicentina': '#0E7490',
  'lisbon-day-trip': '#9D4EDD',
};

// ============ SUB-COMPONENTS ============

interface DayTripHeaderProps {
  dayTrip: DayTrip;
}

const DayTripHeader: React.FC<DayTripHeaderProps> = ({ dayTrip }) => {
  const typeConfig = TRIP_TYPE_CONFIG[dayTrip.tripType];
  const bgColor = TRIP_HEADER_COLORS[dayTrip.id] || colors.primary;

  if (dayTrip.image) {
    return (
      <View style={{ width: '100%', height: 120, borderRadius: 6, marginBottom: 12, overflow: 'hidden', position: 'relative' }}>
        <Image src={resolveImageUrl(dayTrip.image)} style={{ width: '100%', height: 120, objectFit: 'cover' }} />
        {/* Gradient overlay */}
        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, backgroundColor: 'rgba(0,0,0,0.5)' }} />
        {/* Trip title */}
        <Text style={{
          position: 'absolute', bottom: 22, left: 14,
          fontSize: 22, fontFamily: 'Playfair Display', fontWeight: 'bold', color: colors.white,
        }}>
          {dayTrip.title}
        </Text>
        {/* Trip type badge */}
        <View style={{
          position: 'absolute', bottom: 8, left: 14,
          backgroundColor: typeConfig.bg,
          paddingVertical: 2, paddingHorizontal: 8,
          borderRadius: 3,
        }}>
          <Text style={{ fontSize: 7, fontWeight: 'bold', color: typeConfig.color, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            {typeConfig.label}
          </Text>
        </View>
        {/* Distance */}
        <Text style={{
          position: 'absolute', bottom: 10, right: 14,
          fontSize: 7, color: colors.white, opacity: 0.85,
        }}>
          {dayTrip.distance}
        </Text>
      </View>
    );
  }

  // Placeholder header (no image)
  return (
    <View style={{
      width: '100%', height: 120, borderRadius: 6, marginBottom: 12,
      backgroundColor: bgColor, justifyContent: 'center', alignItems: 'center',
      overflow: 'hidden', position: 'relative',
    }}>
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, backgroundColor: colors.accent }} />
      <Text style={{
        fontSize: 22, fontFamily: 'Playfair Display', fontWeight: 'bold',
        color: colors.white, textAlign: 'center', marginBottom: 4,
      }}>
        {dayTrip.title}
      </Text>
      {/* Trip type badge */}
      <View style={{
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingVertical: 2, paddingHorizontal: 8, borderRadius: 3,
      }}>
        <Text style={{ fontSize: 7, fontWeight: 'bold', color: colors.white, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          {typeConfig.label}
        </Text>
      </View>
      {/* Distance */}
      <Text style={{
        position: 'absolute', bottom: 10, right: 14,
        fontSize: 7, color: colors.white, opacity: 0.7,
      }}>
        {dayTrip.distance}
      </Text>
    </View>
  );
};

interface RouteStopItemProps {
  index: number;
  stop: DayTripStop;
  typeColor: string;
}

const RouteStopItem: React.FC<RouteStopItemProps> = ({ index, stop, typeColor }) => (
  <View style={{ flexDirection: 'row', marginBottom: 6, alignItems: 'flex-start' }} wrap={false}>
    <View style={{
      width: 18,
      height: 18,
      borderRadius: 9,
      backgroundColor: typeColor,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 8,
      marginTop: 1,
    }}>
      <Text style={{ fontSize: 8, fontWeight: 'bold', color: colors.white }}>{index + 1}</Text>
    </View>
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 9, fontWeight: 'bold', color: colors.text, marginBottom: 1 }}>
        {stop.stop} <Text style={{ fontWeight: 'normal', color: colors.textLight }}>({stop.duration})</Text>
      </Text>
      <Text style={{ fontSize: 8, color: colors.textLight, lineHeight: 1.4 }}>
        {stop.highlights.join(', ')}
      </Text>
      {stop.tip && (
        <Text style={{ fontSize: 8, fontStyle: 'italic', color: typeColor, lineHeight: 1.4, marginTop: 1 }}>
          {stop.tip}
        </Text>
      )}
    </View>
  </View>
);

// ============ MAIN COMPONENT ============

interface DayTripCardProps {
  dayTrip: DayTrip;
}

export const DayTripCard: React.FC<DayTripCardProps> = ({ dayTrip }) => {
  const typeConfig = TRIP_TYPE_CONFIG[dayTrip.tripType];

  return (
    <View style={{
      marginBottom: 20,
      padding: 14,
      backgroundColor: colors.backgroundAlt,
      borderRadius: 8,
      borderLeftWidth: 5,
      borderLeftColor: typeConfig.color,
    }}>
      {/* Header with image/placeholder + trip type badge */}
      <DayTripHeader dayTrip={dayTrip} />

      {/* Subtitle as vibe line */}
      <Text style={{
        fontSize: 11, fontStyle: 'italic', color: colors.textLight,
        marginBottom: 6, lineHeight: 1.4,
      }}>
        {dayTrip.subtitle}
      </Text>

      {/* Badge row: trip type + duration + budget */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 6, flexWrap: 'wrap' }} wrap={false}>
        <View style={{
          backgroundColor: typeConfig.bg,
          paddingVertical: 2, paddingHorizontal: 7, borderRadius: 3,
        }}>
          <Text style={{ fontSize: 7, fontWeight: 'bold', color: typeConfig.color }}>
            {typeConfig.label}
          </Text>
        </View>
        <View style={{
          backgroundColor: '#E0F2FE',
          paddingVertical: 2, paddingHorizontal: 7, borderRadius: 3,
        }}>
          <Text style={{ fontSize: 7, fontWeight: 'bold', color: '#0369A1' }}>
            {dayTrip.duration}
          </Text>
        </View>
        {dayTrip.budgetEstimate && (
          <View style={{
            backgroundColor: '#D1FAE5',
            paddingVertical: 2, paddingHorizontal: 7, borderRadius: 3,
          }}>
            <Text style={{ fontSize: 7, fontWeight: 'bold', color: '#065F46' }}>
              {dayTrip.budgetEstimate}
            </Text>
          </View>
        )}
      </View>

      {/* Detail rows: Start From, Best Season */}
      <View style={{ marginBottom: 10 }} wrap={false}>
        <View style={{ flexDirection: 'row', marginBottom: 5, alignItems: 'flex-start' }}>
          <Text style={{ width: 85, fontSize: 9, fontWeight: 'bold', color: colors.text }}>Start From</Text>
          <Text style={{ flex: 1, fontSize: 9, color: colors.textLight, lineHeight: 1.4 }}>{dayTrip.startPoint}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 5, alignItems: 'flex-start' }}>
          <Text style={{ width: 85, fontSize: 9, fontWeight: 'bold', color: colors.text }}>Best Season</Text>
          <Text style={{ flex: 1, fontSize: 9, color: colors.textLight, lineHeight: 1.4 }}>{dayTrip.bestSeason}</Text>
        </View>
      </View>

      {/* Route section label */}
      <Text style={{
        fontSize: 8, fontWeight: 'bold', color: colors.text, marginBottom: 8,
        textTransform: 'uppercase', letterSpacing: 0.5,
      }}>
        Route ({dayTrip.route.length} Stops)
      </Text>

      {/* Route stops */}
      {dayTrip.route.map((stop, index) => (
        <RouteStopItem key={index} index={index} stop={stop} typeColor={typeConfig.color} />
      ))}

      {/* Where to Eat TipBox */}
      <View style={{
        marginTop: 12,
        padding: 10,
        backgroundColor: colors.backgroundWarm,
        borderRadius: 4,
        borderLeftWidth: 3,
        borderLeftColor: colors.accent,
      }} wrap={false}>
        <Text style={{
          fontSize: 8, fontWeight: 'bold', color: colors.accent,
          marginBottom: 3, textTransform: 'uppercase', letterSpacing: 0.5,
        }}>
          Where to Eat
        </Text>
        <Text style={{ fontSize: 9, color: colors.text, lineHeight: 1.5 }}>
          Lunch: {dayTrip.whereToEat.lunch}
        </Text>
        <Text style={{ fontSize: 9, color: colors.text, lineHeight: 1.5 }}>
          Coffee: {dayTrip.whereToEat.coffee}
        </Text>
      </View>
    </View>
  );
};

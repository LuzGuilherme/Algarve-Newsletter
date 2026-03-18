import React from 'react';
import { Page, View, Text } from '@react-pdf/renderer';
import { styles, colors } from '../../utils/pdfStyles';
import { PDFHeader, PDFFooter } from './shared';

// Restaurant category colors (from RestaurantCard)
const RESTAURANT_CATEGORIES = [
  { label: 'Traditional', color: '#92400E', bg: '#FEF3C7' },
  { label: 'Seafood', color: '#0369A1', bg: '#E0F2FE' },
  { label: 'Hidden Gem', color: '#7C3AED', bg: '#EDE9FE' },
  { label: 'Fine Dining', color: '#BE185D', bg: '#FCE7F3' },
  { label: 'Quick Bite', color: '#059669', bg: '#D1FAE5' },
  { label: 'Best Views', color: '#D97706', bg: '#FEF3C7' },
];

// Beach access levels (from BeachCard)
const ACCESS_LEVELS = [
  { label: 'Easy Access', color: '#065F46', bg: '#D1FAE5' },
  { label: 'Moderate', color: '#92400E', bg: '#FEF3C7' },
  { label: 'Challenging', color: '#991B1B', bg: '#FEE2E2' },
];

// Reservation indicators (from RestaurantCard)
const RESERVATIONS = [
  { label: 'Essential — book ahead', color: colors.error },
  { label: 'Recommended on weekends', color: colors.warning },
  { label: 'Walk-ins welcome', color: colors.success },
];

// Price ranges
const PRICE_RANGES = [
  { symbol: '€', label: 'Budget', color: '#065F46', bg: '#D1FAE5' },
  { symbol: '€€', label: 'Mid-Range', color: '#92400E', bg: '#FEF3C7' },
  { symbol: '€€€', label: 'Splurge', color: '#BE185D', bg: '#FCE7F3' },
];

// Accommodation tiers (from AccommodationCard)
const ACCOMMODATION_TIERS = [
  { label: 'Budget', color: '#065F46', bg: '#D1FAE5' },
  { label: 'Mid-Range', color: '#92400E', bg: '#FEF3C7' },
  { label: 'Splurge', color: '#BE185D', bg: '#FCE7F3' },
];

// Tip box types
const TIP_TYPES = [
  { label: 'Insider Tip', borderColor: colors.accent, bg: '#FFFBEB', textColor: colors.accent },
  { label: 'Skip If', borderColor: colors.error, bg: '#FEE2E2', textColor: '#991B1B' },
  { label: 'Do This Instead', borderColor: colors.success, bg: '#D1FAE5', textColor: '#065F46' },
];

export const VisualLegendPage: React.FC = () => (
  <Page size="A4" style={styles.page}>
    <PDFHeader sectionName="Legend" />

    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontSize: 12, color: colors.accent, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 8, fontWeight: 'bold' }}>
        Before You Start
      </Text>
      <Text style={{ fontSize: 24, fontFamily: 'Playfair Display', fontWeight: 'bold', color: colors.primary, marginBottom: 6 }}>
        How to Read This Guide
      </Text>
      <Text style={{ fontSize: 10, color: colors.textLight, lineHeight: 1.5, marginBottom: 15 }}>
        This guide uses a consistent visual coding system. Here's what the colors, badges, and symbols mean.
      </Text>
    </View>

    {/* Two-column layout */}
    <View style={{ flexDirection: 'row', gap: 18 }}>

      {/* Left column */}
      <View style={{ flex: 1 }}>
        {/* Restaurant Categories */}
        <View style={{ marginBottom: 18 }}>
          <Text style={{ fontSize: 11, fontFamily: 'Playfair Display', fontWeight: 'bold', color: colors.primary, marginBottom: 8 }}>
            Restaurant Categories
          </Text>
          {RESTAURANT_CATEGORIES.map((cat) => (
            <View key={cat.label} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <View style={{ width: 50, height: 14, backgroundColor: cat.color, borderRadius: 2, marginRight: 8 }} />
              <Text style={{ fontSize: 9, color: colors.text }}>{cat.label}</Text>
            </View>
          ))}
        </View>

        {/* Beach Access Levels */}
        <View style={{ marginBottom: 18 }}>
          <Text style={{ fontSize: 11, fontFamily: 'Playfair Display', fontWeight: 'bold', color: colors.primary, marginBottom: 8 }}>
            Beach Access Levels
          </Text>
          {ACCESS_LEVELS.map((level) => (
            <View key={level.label} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <Text style={{
                fontSize: 7,
                fontWeight: 'bold',
                color: level.color,
                backgroundColor: level.bg,
                paddingVertical: 2,
                paddingHorizontal: 6,
                borderRadius: 3,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                marginRight: 8,
              }}>
                {level.label}
              </Text>
              <Text style={{ fontSize: 9, color: colors.textLight }}>
                {level.label === 'Easy Access' ? 'Steps or ramp, suitable for most' :
                 level.label === 'Moderate' ? 'Stairs or uneven path' :
                 'Steep descent, proper footwear needed'}
              </Text>
            </View>
          ))}
        </View>

        {/* Reservation Indicators */}
        <View style={{ marginBottom: 18 }}>
          <Text style={{ fontSize: 11, fontFamily: 'Playfair Display', fontWeight: 'bold', color: colors.primary, marginBottom: 8 }}>
            Reservation Indicators
          </Text>
          {RESERVATIONS.map((res) => (
            <View key={res.label} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
              <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: res.color, marginRight: 8 }} />
              <Text style={{ fontSize: 9, color: colors.text }}>{res.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Right column */}
      <View style={{ flex: 1 }}>
        {/* Price Ranges */}
        <View style={{ marginBottom: 18 }}>
          <Text style={{ fontSize: 11, fontFamily: 'Playfair Display', fontWeight: 'bold', color: colors.primary, marginBottom: 8 }}>
            Price Ranges
          </Text>
          {PRICE_RANGES.map((price) => (
            <View key={price.symbol} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <Text style={{
                fontSize: 9,
                fontWeight: 'bold',
                color: price.color,
                backgroundColor: price.bg,
                paddingVertical: 2,
                paddingHorizontal: 6,
                borderRadius: 3,
                marginRight: 8,
                width: 30,
                textAlign: 'center',
              }}>
                {price.symbol}
              </Text>
              <Text style={{ fontSize: 9, color: colors.text }}>
                {price.symbol === '€' ? 'Under €15 per person' :
                 price.symbol === '€€' ? '€15–35 per person' :
                 '€35+ per person'}
              </Text>
            </View>
          ))}
        </View>

        {/* Accommodation Tiers */}
        <View style={{ marginBottom: 18 }}>
          <Text style={{ fontSize: 11, fontFamily: 'Playfair Display', fontWeight: 'bold', color: colors.primary, marginBottom: 8 }}>
            Accommodation Tiers
          </Text>
          {ACCOMMODATION_TIERS.map((tier) => (
            <View key={tier.label} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <Text style={{
                fontSize: 7,
                fontWeight: 'bold',
                color: tier.color,
                backgroundColor: tier.bg,
                paddingVertical: 2,
                paddingHorizontal: 6,
                borderRadius: 3,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                marginRight: 8,
              }}>
                {tier.label}
              </Text>
              <Text style={{ fontSize: 9, color: colors.textLight }}>
                {tier.label === 'Budget' ? 'Under €80/night' :
                 tier.label === 'Mid-Range' ? '€80–180/night' :
                 '€180+/night'}
              </Text>
            </View>
          ))}
        </View>

        {/* Tip Box Types */}
        <View style={{ marginBottom: 18 }}>
          <Text style={{ fontSize: 11, fontFamily: 'Playfair Display', fontWeight: 'bold', color: colors.primary, marginBottom: 8 }}>
            Tip Box Types
          </Text>
          {TIP_TYPES.map((tip) => (
            <View key={tip.label} style={{
              marginBottom: 6,
              padding: 6,
              backgroundColor: tip.bg,
              borderRadius: 3,
              borderLeftWidth: 3,
              borderLeftColor: tip.borderColor,
            }}>
              <Text style={{ fontSize: 7, fontWeight: 'bold', color: tip.textColor, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                {tip.label}
              </Text>
              <Text style={{ fontSize: 8, color: colors.textLight, marginTop: 2 }}>
                {tip.label === 'Insider Tip' ? 'Local knowledge you won\'t find elsewhere' :
                 tip.label === 'Skip If' ? 'Honest reasons this might not be for you' :
                 'A better alternative to a common tourist trap'}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>

    {/* GPS & Maps note at bottom */}
    <View style={{ backgroundColor: colors.backgroundAlt, borderRadius: 6, padding: 12, marginTop: 5 }}>
      <Text style={{ fontSize: 9, fontWeight: 'bold', color: colors.primary, marginBottom: 4 }}>GPS Coordinates & Maps</Text>
      <Text style={{ fontSize: 8, color: colors.textLight, lineHeight: 1.5 }}>
        Every beach and restaurant includes GPS coordinates in monospace font (e.g. 37.0944, -8.6680).
        Tap or copy these directly into Google Maps or Waze. Overview maps at the start of each section show all locations at a glance.
      </Text>
    </View>

    <PDFFooter />
  </Page>
);

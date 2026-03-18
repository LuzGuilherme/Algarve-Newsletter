import React from 'react';
import { Page, View, Text, Image } from '@react-pdf/renderer';
import { styles, colors } from '../../utils/pdfStyles';
import { PDFHeader, PDFFooter, SectionTitle, RestaurantCard, PullQuote } from './shared';
import type { GuideRestaurant, RestaurantCategory } from '../../types/guide';

function resolveImageUrl(path: string): string {
  if (path.startsWith('http')) return path;
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  return `${origin}${path}`;
}

interface RestaurantsSectionProps {
  restaurants: GuideRestaurant[];
}

const CATEGORY_CONFIG: Record<RestaurantCategory, { label: string; description: string }> = {
  'traditional': {
    label: 'Traditional Portuguese',
    description: 'The real thing, not tourist versions',
  },
  'seafood': {
    label: 'Seafood Done Right',
    description: 'Where to get proper fresh fish',
  },
  'hidden-gem': {
    label: 'Hidden Gems',
    description: 'Places tourists never find',
  },
  'splurge': {
    label: 'Worth the Splurge',
    description: 'Special occasions, fine dining',
  },
  'quick-honest': {
    label: 'Quick & Honest',
    description: 'Tasca, petiscos, no frills',
  },
  'best-views': {
    label: 'Best Views',
    description: 'When the setting matters',
  },
};

const CATEGORY_ORDER: RestaurantCategory[] = [
  'traditional',
  'seafood',
  'hidden-gem',
  'splurge',
  'quick-honest',
  'best-views',
];

export const RestaurantsSection: React.FC<RestaurantsSectionProps> = ({ restaurants }) => {
  // Group restaurants by category
  const restaurantsByCategory = restaurants.reduce((acc, restaurant) => {
    if (!acc[restaurant.category]) acc[restaurant.category] = [];
    acc[restaurant.category].push(restaurant);
    return acc;
  }, {} as Record<RestaurantCategory, GuideRestaurant[]>);

  return (
    <>
      {/* Section intro page */}
      <Page size="A4" style={styles.page}>
        <PDFHeader sectionName="Restaurants" />
        <SectionTitle
          number={2}
          title="Restaurants Locals Actually Go To"
          subtitle={`${restaurants.length} places where the food speaks for itself`}
        />
        <Text style={styles.introText}>
          Skip the restaurants with photos on the menu and English-speaking staff
          trying to pull you in from the street. These are the places where locals
          eat — many don't even have a proper website.
        </Text>
        <Text style={styles.introText}>
          I've included what to order (trust me on this) and honest notes about
          reservations. In summer, booking ahead is essential at most places.
        </Text>

        {/* Food hero image */}
        <View style={{ marginBottom: 16, borderRadius: 6, overflow: 'hidden', position: 'relative' }}>
          <Image
            src={resolveImageUrl('/images/piri-piri/piri-piri-meal-spread.jpg')}
            style={{
              width: '100%',
              height: 160,
              objectFit: 'cover',
            }}
          />
          <View style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 32,
            backgroundColor: 'rgba(0, 78, 85, 0.65)',
          }} />
          <Text style={{
            position: 'absolute',
            bottom: 8,
            left: 12,
            fontSize: 9,
            color: colors.white,
            opacity: 0.9,
            fontStyle: 'italic',
          }}>
            Piri-piri chicken, fresh seafood, and local wine — the Algarvian way
          </Text>
        </View>

        <View style={styles.tipBox}>
          <Text style={styles.tipLabel}>Price Guide</Text>
          <Text style={styles.tipText}>€ = Under €15 per person</Text>
          <Text style={styles.tipText}>€€ = €15-30 per person</Text>
          <Text style={styles.tipText}>€€€ = €30+ per person</Text>
        </View>
        <PDFFooter />
      </Page>

      {/* All restaurant categories in a single flowing page — react-pdf handles page breaks */}
      <Page size="A4" style={styles.page} wrap>
        <PDFHeader sectionName="Restaurants" />

        {CATEGORY_ORDER.map((category, catIndex) => {
          const categoryRestaurants = restaurantsByCategory[category] || [];
          if (categoryRestaurants.length === 0) return null;

          return (
            <View key={category}>
              {catIndex === 2 && (
                <PullQuote
                  quote="The best meal in the Algarve will cost you €12 and come on a paper tablecloth with the TV on in the background."
                  attribution="Personal note"
                />
              )}

              <View style={styles.sectionTitleContainer} wrap={false}>
                <Text style={styles.categoryTitle}>{CATEGORY_CONFIG[category].label}</Text>
                <Text style={{ ...styles.introText, marginBottom: 0 }}>
                  {CATEGORY_CONFIG[category].description}
                </Text>
              </View>

              {categoryRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </View>
          );
        })}

        <PDFFooter />
      </Page>
    </>
  );
};

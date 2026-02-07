import React from 'react';
import { Page, View, Text } from '@react-pdf/renderer';
import { styles } from '../../utils/pdfStyles';
import { PDFHeader, PDFFooter, SectionTitle, RestaurantCard } from './shared';
import type { GuideRestaurant, RestaurantCategory } from '../../types/guide';

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
          subtitle="25+ places where the food speaks for itself"
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

        <View style={styles.tipBox}>
          <Text style={styles.tipLabel}>Price Guide</Text>
          <Text style={styles.tipText}>€ = Under €15 per person</Text>
          <Text style={styles.tipText}>€€ = €15-30 per person</Text>
          <Text style={styles.tipText}>€€€ = €30+ per person</Text>
        </View>
        <PDFFooter />
      </Page>

      {/* Restaurant pages by category */}
      {CATEGORY_ORDER.map((category) => {
        const categoryRestaurants = restaurantsByCategory[category] || [];
        if (categoryRestaurants.length === 0) return null;

        return (
          <Page key={category} size="A4" style={styles.page}>
            <PDFHeader sectionName={`Restaurants — ${CATEGORY_CONFIG[category].label}`} />
            <Text style={styles.categoryTitle}>{CATEGORY_CONFIG[category].label}</Text>
            <Text style={{ ...styles.introText, marginBottom: 15 }}>
              {CATEGORY_CONFIG[category].description}
            </Text>

            {categoryRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}

            <PDFFooter />
          </Page>
        );
      })}
    </>
  );
};

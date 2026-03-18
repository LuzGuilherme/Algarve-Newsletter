import React from 'react';
import { Page, View, Text, Image } from '@react-pdf/renderer';
import { styles, colors } from '../../utils/pdfStyles';
import { PDFHeader, PDFFooter, SectionTitle, BeachCard, PullQuote } from './shared';
import type { GuideBeach, BeachCategory } from '../../types/guide';
import { buildStaticMapUrl } from '../../utils/mapUtils';

interface BeachesSectionProps {
  beaches: GuideBeach[];
}

const CATEGORY_CONFIG: Record<BeachCategory, { label: string; description: string }> = {
  'hidden-coves': {
    label: 'Hidden Coves',
    description: 'Small, hard to find, worth the effort',
  },
  'family-friendly': {
    label: 'Family-Friendly',
    description: 'Calm waters, easy access, nearby amenities',
  },
  'wild-dramatic': {
    label: 'Wild & Dramatic',
    description: 'Cliffs, waves, perfect for photographers',
  },
  'sunrise-sunset': {
    label: 'Best for Sunrise/Sunset',
    description: 'The most spectacular golden hour spots',
  },
};

const CATEGORY_ORDER: BeachCategory[] = [
  'hidden-coves',
  'family-friendly',
  'wild-dramatic',
  'sunrise-sunset',
];

export const BeachesSection: React.FC<BeachesSectionProps> = ({ beaches }) => {
  // Group beaches by category
  const beachesByCategory = beaches.reduce((acc, beach) => {
    if (!acc[beach.category]) acc[beach.category] = [];
    acc[beach.category].push(beach);
    return acc;
  }, {} as Record<BeachCategory, GuideBeach[]>);

  // Build map from beach coordinates
  const beachMarkers = beaches.map(b => ({ lat: b.coordinates.lat, lng: b.coordinates.lng, label: b.name }));
  const beachesMapUrl = beachMarkers.length > 0 ? buildStaticMapUrl(beachMarkers, 600, 280, 9) : null;

  return (
    <>
      {/* Section intro page */}
      <Page size="A4" style={styles.page}>
        <PDFHeader sectionName="Beaches" />
        <SectionTitle
          number={1}
          title="The Beaches"
          subtitle={`${beaches.length} hand-picked gems organized by what you're looking for`}
        />
        <Text style={styles.introText}>
          Forget the tourist-packed stretches. These are the beaches where locals
          actually go — from dramatic cliff coves to peaceful sunrise spots. Each
          one has been personally tested and approved.
        </Text>
        <Text style={styles.introText}>
          For each beach, I've included GPS coordinates so you can find them easily,
          plus honest notes about parking (the eternal Algarve struggle), when to
          go, and who should skip it.
        </Text>

        {/* Overview map */}
        {beachesMapUrl && (
          <View style={{ marginBottom: 15 }} wrap={false}>
            <Image src={beachesMapUrl} style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 4 }} />
            <Text style={{ fontSize: 8, color: colors.textMuted, marginTop: 4, textAlign: 'center' }}>
              Overview of {beaches.length} beaches covered in this guide
            </Text>
          </View>
        )}

        <View style={styles.tipBox}>
          <Text style={styles.tipLabel}>Quick Navigation</Text>
          {CATEGORY_ORDER.map((category, index) => (
            <Text key={category} style={styles.tipText}>
              {index + 1}. {CATEGORY_CONFIG[category].label} — {CATEGORY_CONFIG[category].description}
            </Text>
          ))}
        </View>
        <PDFFooter />
      </Page>

      {/* All beach categories flowing across pages */}
      <Page size="A4" style={styles.page} wrap>
        <PDFHeader sectionName="Beaches" />

        {CATEGORY_ORDER.map((category, catIndex) => {
          const categoryBeaches = beachesByCategory[category] || [];
          if (categoryBeaches.length === 0) return null;

          return (
            <View key={category}>
              {/* Pull quote between categories */}
              {catIndex === 1 && (
                <PullQuote
                  quote="The best beaches in the Algarve aren't the ones on the postcards — they're the ones you have to earn."
                  attribution="Personal note"
                />
              )}
              {catIndex === 3 && (
                <PullQuote
                  quote="Stay for the sunset. The Algarve's golden hour turns limestone cliffs into gold and the ocean into liquid amber."
                  attribution="Personal note"
                />
              )}

              <View style={styles.sectionTitleContainer} wrap={false}>
                <Text style={styles.categoryTitle}>{CATEGORY_CONFIG[category].label}</Text>
                <Text style={{ ...styles.introText, marginBottom: 0 }}>
                  {CATEGORY_CONFIG[category].description}
                </Text>
              </View>

              {categoryBeaches.map((beach) => (
                <BeachCard key={beach.id} beach={beach} showImage />
              ))}
            </View>
          );
        })}

        <PDFFooter />
      </Page>
    </>
  );
};

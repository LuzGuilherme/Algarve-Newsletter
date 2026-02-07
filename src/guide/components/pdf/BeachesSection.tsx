import React from 'react';
import { Page, View, Text } from '@react-pdf/renderer';
import { styles } from '../../utils/pdfStyles';
import { PDFHeader, PDFFooter, SectionTitle, BeachCard } from './shared';
import type { GuideBeach, BeachCategory } from '../../types/guide';

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

  return (
    <>
      {/* Section intro page */}
      <Page size="A4" style={styles.page}>
        <PDFHeader sectionName="Beaches" />
        <SectionTitle
          number={1}
          title="The Beaches"
          subtitle="15+ hand-picked gems organized by what you're looking for"
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

      {/* Beach pages by category */}
      {CATEGORY_ORDER.map((category) => {
        const categoryBeaches = beachesByCategory[category] || [];
        if (categoryBeaches.length === 0) return null;

        return (
          <Page key={category} size="A4" style={styles.page}>
            <PDFHeader sectionName={`Beaches — ${CATEGORY_CONFIG[category].label}`} />
            <Text style={styles.categoryTitle}>{CATEGORY_CONFIG[category].label}</Text>
            <Text style={{ ...styles.introText, marginBottom: 15 }}>
              {CATEGORY_CONFIG[category].description}
            </Text>

            {categoryBeaches.map((beach) => (
              <BeachCard key={beach.id} beach={beach} />
            ))}

            <PDFFooter />
          </Page>
        );
      })}
    </>
  );
};

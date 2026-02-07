import React from 'react';
import { Page, View, Text } from '@react-pdf/renderer';
import { styles } from '../../utils/pdfStyles';
import { PDFHeader, PDFFooter, SectionTitle, TownCard } from './shared';
import type { GuideTown } from '../../types/guide';

interface TownsSectionProps {
  towns: GuideTown[];
}

export const TownsSection: React.FC<TownsSectionProps> = ({ towns }) => {
  return (
    <>
      {/* Section intro page */}
      <Page size="A4" style={styles.page}>
        <PDFHeader sectionName="Towns" />
        <SectionTitle
          number={3}
          title="Towns by Vibe"
          subtitle="Find your perfect base in the Algarve"
        />
        <Text style={styles.introText}>
          The Algarve isn't one place — it's dozens of distinct towns, each with
          its own personality. Choose the wrong base and you'll spend half your
          trip in the car. Choose the right one and everything clicks into place.
        </Text>
        <Text style={styles.introText}>
          Here's my honest breakdown of the main towns: where to stay, who they're
          for, and what you shouldn't miss while you're there.
        </Text>

        <View style={styles.tipBox}>
          <Text style={styles.tipLabel}>Quick Rule of Thumb</Text>
          <Text style={styles.tipText}>
            Western Algarve (Lagos, Sagres) = Dramatic cliffs, surfers, backpackers
          </Text>
          <Text style={styles.tipText}>
            Central Algarve (Albufeira, Vilamoura) = Resorts, nightlife, golf
          </Text>
          <Text style={styles.tipText}>
            Eastern Algarve (Tavira, Olhão) = Authentic, quieter, Ria Formosa
          </Text>
        </View>
        <PDFFooter />
      </Page>

      {/* Town pages */}
      <Page size="A4" style={styles.page}>
        <PDFHeader sectionName="Towns" />

        {towns.map((town) => (
          <TownCard key={town.id} town={town} />
        ))}

        <PDFFooter />
      </Page>
    </>
  );
};

import React from 'react';
import { Page, View, Text } from '@react-pdf/renderer';
import { styles } from '../../utils/pdfStyles';
import { PDFHeader, PDFFooter, SectionTitle, TrapCard } from './shared';
import type { TouristTrap } from '../../types/guide';

interface TouristTrapsSectionProps {
  traps: TouristTrap[];
}

export const TouristTrapsSection: React.FC<TouristTrapsSectionProps> = ({ traps }) => {
  return (
    <>
      {/* Section intro page */}
      <Page size="A4" style={styles.page}>
        <PDFHeader sectionName="Tourist Traps" />
        <SectionTitle
          number={4}
          title="Tourist Traps to Skip"
          subtitle="Save your money and time for what's actually worth it"
        />
        <Text style={styles.introText}>
          This section might save you more money than the entire guide cost.
          These are the places that look great online, get recommended everywhere,
          and disappoint most visitors who actually go there.
        </Text>
        <Text style={styles.introText}>
          I'm not being negative — I just want you to have realistic expectations.
          For each trap, I've included a better alternative that gives you a
          similar experience without the crowds, inflated prices, or disappointment.
        </Text>

        <View style={styles.tipBox}>
          <Text style={styles.tipLabel}>A Note on "Traps"</Text>
          <Text style={styles.tipText}>
            These aren't necessarily bad places — some are genuinely beautiful.
            But the hype often exceeds reality, and there's usually something
            better nearby that 90% of tourists miss.
          </Text>
        </View>
        <PDFFooter />
      </Page>

      {/* Traps pages */}
      <Page size="A4" style={styles.page}>
        <PDFHeader sectionName="Tourist Traps" />

        {traps.map((trap) => (
          <TrapCard key={trap.id} trap={trap} />
        ))}

        <PDFFooter />
      </Page>
    </>
  );
};

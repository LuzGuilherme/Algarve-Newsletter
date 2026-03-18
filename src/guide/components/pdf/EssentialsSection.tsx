import React from 'react';
import { Page, View, Text } from '@react-pdf/renderer';
import { styles } from '../../utils/pdfStyles';
import { PDFHeader, PDFFooter, SectionTitle } from './shared';
import type { PracticalEssentials } from '../../types/guide';

interface EssentialsSectionProps {
  essentials: PracticalEssentials;
}

export const EssentialsSection: React.FC<EssentialsSectionProps> = ({ essentials }) => {
  return (
    <>
      {/* Section intro page */}
      <Page size="A4" style={styles.page}>
        <PDFHeader sectionName="Practical Essentials" />
        <SectionTitle
          number={8}
          title="Practical Essentials"
          subtitle="Everything you need to know before you go"
        />

        {/* Dining Culture */}
        <Text style={styles.categoryTitle}>Dining Culture</Text>

        <View style={styles.tipBox}>
          <Text style={styles.tipLabel}>The Couvert Warning</Text>
          <Text style={styles.tipText}>{essentials.dining.couvert}</Text>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Meal Times</Text>
            <Text style={styles.detailValue}>{essentials.dining.mealTimes}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Portions</Text>
            <Text style={styles.detailValue}>{essentials.dining.portions}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Water & Wine</Text>
            <Text style={styles.detailValue}>{essentials.dining.waterAndWine}</Text>
          </View>
        </View>

        {/* Getting Around */}
        <Text style={styles.categoryTitle}>Getting Around</Text>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Rental Cars</Text>
            <Text style={styles.detailValue}>{essentials.gettingAround.rentalCars}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Public Transport</Text>
            <Text style={styles.detailValue}>{essentials.gettingAround.publicTransport}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Taxis</Text>
            <Text style={styles.detailValue}>{essentials.gettingAround.taxis}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Parking</Text>
            <Text style={styles.detailValue}>{essentials.gettingAround.parking}</Text>
          </View>
        </View>

        <View style={styles.tipBox}>
          <Text style={styles.tipLabel}>Transport Tips</Text>
          {essentials.gettingAround.tips.map((tip, index) => (
            <Text key={index} style={styles.tipText}>• {tip}</Text>
          ))}
        </View>

        {/* Money */}
        <Text style={styles.categoryTitle}>Money Matters</Text>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Currency</Text>
            <Text style={styles.detailValue}>{essentials.money.currency}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Tipping</Text>
            <Text style={styles.detailValue}>{essentials.money.tipping}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Cash vs Card</Text>
            <Text style={styles.detailValue}>{essentials.money.cashVsCard}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>ATMs</Text>
            <Text style={styles.detailValue}>{essentials.money.atms}</Text>
          </View>
        </View>
        <PDFFooter />
      </Page>

      {/* Portuguese Phrases Page */}
      <Page size="A4" style={styles.page}>
        <PDFHeader sectionName="Portuguese Phrases" />
        <Text style={styles.categoryTitle}>Useful Portuguese Phrases</Text>
        <Text style={{ ...styles.introText, marginBottom: 15 }}>
          You don't need to speak Portuguese, but a few words go a long way.
          Locals appreciate the effort, and it makes interactions warmer.
        </Text>

        <View style={styles.table}>
          <View style={{ ...styles.tableRow, ...styles.tableHeader }}>
            <Text style={{ ...styles.tableHeaderCell, flex: 1.2 }}>English</Text>
            <Text style={{ ...styles.tableHeaderCell, flex: 1.2 }}>Portuguese</Text>
            <Text style={{ ...styles.tableHeaderCell, flex: 1 }}>Pronunciation</Text>
          </View>
          {essentials.phrases.map((phrase, index) => (
            <View
              key={index}
              style={index === essentials.phrases.length - 1 ? styles.tableRowLast : styles.tableRow}
            >
              <Text style={{ ...styles.tableCell, flex: 1.2 }}>{phrase.english}</Text>
              <Text style={{ ...styles.tableCell, flex: 1.2, fontWeight: 'bold' }}>
                {phrase.portuguese}
              </Text>
              <Text style={{ ...styles.tableCell, flex: 1, fontStyle: 'italic' }}>
                {phrase.pronunciation}
              </Text>
            </View>
          ))}
        </View>
        <PDFFooter />
      </Page>

      {/* Apps & Emergency Page */}
      <Page size="A4" style={styles.page}>
        <PDFHeader sectionName="Apps & Emergency" />
        <Text style={styles.categoryTitle}>Apps to Download</Text>

        {essentials.apps.map((app, index) => (
          <View key={index} style={styles.card} wrap={false}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardName}>{app.name}</Text>
            </View>
            <Text style={styles.cardVibe}>{app.purpose}</Text>
            <View style={styles.tipBox}>
              <Text style={styles.tipLabel}>Tip</Text>
              <Text style={styles.tipText}>{app.tip}</Text>
            </View>
          </View>
        ))}

        <Text style={styles.categoryTitle}>Emergency Information</Text>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Police</Text>
            <Text style={{ ...styles.detailValue, fontWeight: 'bold' }}>
              {essentials.emergency.police}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Ambulance</Text>
            <Text style={{ ...styles.detailValue, fontWeight: 'bold' }}>
              {essentials.emergency.ambulance}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Pharmacies</Text>
            <Text style={styles.detailValue}>{essentials.emergency.pharmacies}</Text>
          </View>
        </View>

        <Text style={{ ...styles.detailLabel, marginTop: 15, marginBottom: 8 }}>
          Main Hospitals:
        </Text>
        {essentials.emergency.hospitals.map((hospital, index) => (
          <View key={index} style={styles.listItem}>
            <Text style={styles.listBullet}>•</Text>
            <Text style={styles.listText}>
              <Text style={{ fontWeight: 'bold' }}>{hospital.name}</Text> — {hospital.location}
              {hospital.phone && ` (${hospital.phone})`}
            </Text>
          </View>
        ))}
        <PDFFooter />
      </Page>
    </>
  );
};

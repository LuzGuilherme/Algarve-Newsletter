import React from 'react';
import { Page, View, Text } from '@react-pdf/renderer';
import { styles } from '../../utils/pdfStyles';
import { PDFHeader, PDFFooter, SectionTitle, TipBox } from './shared';
import type { MonthlyGuide, TimingHack } from '../../types/guide';

interface TimingHacksSectionProps {
  timing: MonthlyGuide[];
  timingHacks: TimingHack[];
}

const CROWD_COLORS = {
  low: '#10B981',
  medium: '#F59E0B',
  high: '#EF4444',
  peak: '#991B1B',
};

export const TimingHacksSection: React.FC<TimingHacksSectionProps> = ({ timing, timingHacks }) => {
  return (
    <>
      {/* Section intro page */}
      <Page size="A4" style={styles.page}>
        <PDFHeader sectionName="Timing Hacks" />
        <SectionTitle
          number={5}
          title="Timing Hacks"
          subtitle="The secret knowledge that takes years to learn"
        />
        <Text style={styles.introText}>
          When you visit matters as much as where. The same beach can be paradise
          at 8am and hell at 2pm. The same restaurant can have a 2-hour wait on
          Saturday and empty tables on Tuesday.
        </Text>
        <Text style={styles.introText}>
          This section is my collection of timing hacks — the kind of knowledge
          you normally only get after living somewhere for years.
        </Text>
        <PDFFooter />
      </Page>

      {/* Monthly Calendar Page */}
      <Page size="A4" style={styles.page}>
        <PDFHeader sectionName="Timing — Monthly Guide" />
        <Text style={styles.categoryTitle}>Month-by-Month Guide</Text>

        <View style={styles.table}>
          <View style={{ ...styles.tableRow, ...styles.tableHeader }}>
            <Text style={{ ...styles.tableHeaderCell, flex: 0.8 }}>Month</Text>
            <Text style={{ ...styles.tableHeaderCell, flex: 1.2 }}>Weather</Text>
            <Text style={{ ...styles.tableHeaderCell, flex: 0.6 }}>Crowds</Text>
            <Text style={{ ...styles.tableHeaderCell, flex: 1.4 }}>Best For</Text>
          </View>
          {timing.map((month, index) => (
            <View
              key={month.month}
              style={index === timing.length - 1 ? styles.tableRowLast : styles.tableRow}
            >
              <Text style={{ ...styles.tableCell, flex: 0.8, fontWeight: 'bold' }}>
                {month.name}
              </Text>
              <Text style={{ ...styles.tableCell, flex: 1.2 }}>{month.weather}</Text>
              <Text
                style={{
                  ...styles.tableCell,
                  flex: 0.6,
                  color: CROWD_COLORS[month.crowds],
                  fontWeight: 'bold',
                }}
              >
                {month.crowds.toUpperCase()}
              </Text>
              <Text style={{ ...styles.tableCell, flex: 1.4 }}>
                {month.bestFor.slice(0, 2).join(', ')}
              </Text>
            </View>
          ))}
        </View>
        <PDFFooter />
      </Page>

      {/* Golden Hours & Timing Hacks Page */}
      <Page size="A4" style={styles.page}>
        <PDFHeader sectionName="Timing — Hacks" />
        <Text style={styles.categoryTitle}>Golden Hour Timing</Text>
        <Text style={{ ...styles.introText, marginBottom: 15 }}>
          Sunrise and sunset times for planning beach visits and photography:
        </Text>

        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
          {timing.slice(0, 4).map((month) => (
            <View key={month.month} style={{ flex: 1, marginRight: 10 }}>
              <Text style={{ fontSize: 10, fontWeight: 'bold' }}>{month.name}</Text>
              <Text style={{ fontSize: 8, color: '#F59E0B' }}>
                Rise: {month.goldenHours.sunrise}
              </Text>
              <Text style={{ fontSize: 8, color: '#EF4444' }}>
                Set: {month.goldenHours.sunset}
              </Text>
            </View>
          ))}
        </View>

        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
          {timing.slice(4, 8).map((month) => (
            <View key={month.month} style={{ flex: 1, marginRight: 10 }}>
              <Text style={{ fontSize: 10, fontWeight: 'bold' }}>{month.name}</Text>
              <Text style={{ fontSize: 8, color: '#F59E0B' }}>
                Rise: {month.goldenHours.sunrise}
              </Text>
              <Text style={{ fontSize: 8, color: '#EF4444' }}>
                Set: {month.goldenHours.sunset}
              </Text>
            </View>
          ))}
        </View>

        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
          {timing.slice(8, 12).map((month) => (
            <View key={month.month} style={{ flex: 1, marginRight: 10 }}>
              <Text style={{ fontSize: 10, fontWeight: 'bold' }}>{month.name}</Text>
              <Text style={{ fontSize: 8, color: '#F59E0B' }}>
                Rise: {month.goldenHours.sunrise}
              </Text>
              <Text style={{ fontSize: 8, color: '#EF4444' }}>
                Set: {month.goldenHours.sunset}
              </Text>
            </View>
          ))}
        </View>

        <Text style={styles.categoryTitle}>Insider Timing Hacks</Text>

        {timingHacks.map((hack) => (
          <View key={hack.id} style={styles.card}>
            <Text style={styles.cardName}>{hack.title}</Text>
            <Text style={styles.cardVibe}>{hack.description}</Text>
            <TipBox label="The Hack" text={hack.tip} />
          </View>
        ))}
        <PDFFooter />
      </Page>
    </>
  );
};

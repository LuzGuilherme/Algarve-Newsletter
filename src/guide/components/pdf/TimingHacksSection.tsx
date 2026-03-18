import React from 'react';
import { Page, View, Text } from '@react-pdf/renderer';
import { styles, colors } from '../../utils/pdfStyles';
import { PDFHeader, PDFFooter, SectionTitle, TipBox, PullQuote } from './shared';
import type { MonthlyGuide, TimingHack, TimingHackCategory } from '../../types/guide';

interface TimingHacksSectionProps {
  timing: MonthlyGuide[];
  timingHacks: TimingHack[];
}

// ============ CONSTANTS ============

const CROWD_COLORS: Record<string, { text: string; bg: string }> = {
  low: { text: '#065F46', bg: '#D1FAE5' },
  medium: { text: '#92400E', bg: '#FEF3C7' },
  high: { text: '#991B1B', bg: '#FEE2E2' },
  peak: { text: '#FFFFFF', bg: '#991B1B' },
};

const CATEGORY_CONFIG: Record<TimingHackCategory, { label: string; color: string; bg: string; description: string }> = {
  beach: { label: 'BEACH & WATER', color: '#0369A1', bg: '#E0F2FE', description: 'Tides, temperatures, and the best times to hit the sand' },
  dining: { label: 'FOOD & DRINK', color: '#92400E', bg: '#FEF3C7', description: 'When to eat, where to shop, and how to dodge the rush' },
  logistics: { label: 'GETTING AROUND', color: '#7C3AED', bg: '#EDE9FE', description: 'Parking, tolls, ferries, and market timing' },
  planning: { label: 'PLANNING', color: '#059669', bg: '#D1FAE5', description: 'Weekly rhythms, seasonal closures, and sunset strategy' },
};

const CATEGORY_ORDER: TimingHackCategory[] = ['beach', 'dining', 'logistics', 'planning'];

const GLANCE_RULES: Record<string, string> = {
  'benagil-timing': 'Book 7:30am kayak tour \u2014 cave nearly empty',
  'parking-strategy': 'Arrive before 9am or after 5pm for sunset',
  'restaurant-sweet-spot': 'Book 7pm or 9:30pm \u2014 skip the 8pm rush',
  'market-days': 'Loul\u00e9 market: arrive 8:30am, leave by 10:30am',
  'sunset-spots': 'Arrive 1.5 hours early for the best position',
  'ferry-schedules': 'Always check last return ferry before you go',
  'tide-dependent': 'Check tides before visiting \u2014 experiences shift dramatically',
  'weekly-rhythm': 'Tuesday\u2013Thursday is the sweet spot for everything',
  'seasonal-closures': 'Always call ahead in winter \u2014 many places close',
  'a22-toll-timing': 'A22 is now toll-free — use it for 30km+, N125 for short hops',
  'water-temperature': 'September = warmest water + fewest crowds',
  'supermarket-hack': '\u20AC15 cliff-top picnic beats most tourist restaurants',
};

// ============ HELPERS ============

function splitTipIntoPoints(hack: TimingHack): string[] {
  const { id, tip } = hack;

  // Weekly rhythm: split on day-of-week patterns
  if (id === 'weekly-rhythm') {
    const dayPattern = /(?=(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|Mid-week|Tuesday-Thursday)[:\s])/;
    const parts = tip.split(dayPattern).map(s => s.trim()).filter(Boolean);
    if (parts.length > 1) return parts;
  }

  // Long tips (>200 chars with 3+ sentences): split on sentence boundaries
  const sentences = tip.match(/[^.!]+[.!]+/g);
  if (tip.length > 200 && sentences && sentences.length >= 3) {
    return sentences.map(s => s.trim()).filter(Boolean);
  }

  // Short/simple tips: single paragraph
  return [tip];
}

// ============ SUB-COMPONENTS ============

const TimingHackCard: React.FC<{ hack: TimingHack }> = ({ hack }) => {
  const cat = CATEGORY_CONFIG[hack.category];
  const points = splitTipIntoPoints(hack);
  const isBulletList = points.length > 1;

  return (
    <View
      style={{
        marginBottom: 18,
        padding: 14,
        backgroundColor: colors.backgroundAlt,
        borderRadius: 6,
        borderLeftWidth: 4,
        borderLeftColor: cat.color,
      }}
      wrap={false}
    >
      {/* Header row — fixes overlay bug */}
      <View style={styles.cardHeader}>
        <Text style={{ ...styles.cardName, color: cat.color, flex: 1 }}>{hack.title}</Text>
        <Text
          style={{
            fontSize: 7,
            fontWeight: 'bold',
            color: cat.color,
            backgroundColor: cat.bg,
            paddingVertical: 2,
            paddingHorizontal: 6,
            borderRadius: 3,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
          }}
        >
          {cat.label}
        </Text>
      </View>

      {/* Description */}
      <Text style={styles.cardVibe}>{hack.description}</Text>

      {/* Structured tip */}
      <View style={styles.tipBox}>
        <Text style={styles.tipLabel}>The Hack</Text>
        {isBulletList ? (
          points.map((point, i) => (
            <View key={i} style={{ flexDirection: 'row', marginBottom: 3, alignItems: 'flex-start' }}>
              <Text style={{ ...styles.tipText, width: 12, color: colors.accent }}>&#x2022;</Text>
              <Text style={{ ...styles.tipText, flex: 1 }}>{point}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.tipText}>{points[0]}</Text>
        )}
      </View>
    </View>
  );
};

const CategorySubHeader: React.FC<{ category: TimingHackCategory }> = ({ category }) => {
  const cat = CATEGORY_CONFIG[category];
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 12 }} wrap={false}>
      <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: cat.color, marginRight: 8 }} />
      <Text style={{ fontSize: 16, fontFamily: 'Playfair Display', fontWeight: 'bold', color: cat.color, marginRight: 8 }}>
        {cat.label}
      </Text>
      <Text style={{ fontSize: 9, color: colors.textLight, fontStyle: 'italic', flex: 1 }}>
        {cat.description}
      </Text>
    </View>
  );
};

// ============ MAIN COMPONENT ============

export const TimingHacksSection: React.FC<TimingHacksSectionProps> = ({ timing, timingHacks }) => {
  // Group hacks by category
  const hacksByCategory: Record<TimingHackCategory, TimingHack[]> = {
    beach: [],
    dining: [],
    logistics: [],
    planning: [],
  };
  for (const hack of timingHacks) {
    hacksByCategory[hack.category].push(hack);
  }

  return (
    <>
      {/* ====== Page 1 — Intro ====== */}
      <Page size="A4" style={styles.page}>
        <PDFHeader sectionName="Timing Hacks" />
        <SectionTitle
          number={6}
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

      {/* ====== Page 2 — Month-by-Month Guide (enhanced) ====== */}
      <Page size="A4" style={styles.page}>
        <PDFHeader sectionName="Timing — Monthly Guide" />
        <Text style={styles.categoryTitle}>Month-by-Month Guide</Text>

        <View style={styles.table}>
          <View style={{ ...styles.tableRow, ...styles.tableHeader }}>
            <Text style={{ ...styles.tableHeaderCell, flex: 0.8 }}>Month</Text>
            <Text style={{ ...styles.tableHeaderCell, flex: 1.2 }}>Weather</Text>
            <Text style={{ ...styles.tableHeaderCell, flex: 0.6 }}>Crowds</Text>
            <Text style={{ ...styles.tableHeaderCell, flex: 1.8 }}>Best For</Text>
          </View>
          {timing.map((month, index) => (
            <View
              key={month.month}
              style={index === timing.length - 1 ? styles.tableRowLast : styles.tableRow}
              wrap={false}
            >
              <Text style={{ ...styles.tableCell, flex: 0.8, fontWeight: 'bold' }}>
                {month.name}
              </Text>
              <Text style={{ ...styles.tableCell, flex: 1.2 }}>{month.weather}</Text>
              <View style={{ flex: 0.6, padding: 8, justifyContent: 'center' }}>
                <Text
                  style={{
                    fontSize: 7,
                    fontWeight: 'bold',
                    color: CROWD_COLORS[month.crowds].text,
                    backgroundColor: CROWD_COLORS[month.crowds].bg,
                    paddingVertical: 2,
                    paddingHorizontal: 5,
                    borderRadius: 3,
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                  }}
                >
                  {month.crowds}
                </Text>
              </View>
              <Text style={{ ...styles.tableCell, flex: 1.8 }}>
                {month.bestFor.join(', ')}
              </Text>
            </View>
          ))}
        </View>
        <PDFFooter />
      </Page>

      {/* ====== Page 3 — Seasonal Secrets & What to Avoid (NEW) ====== */}
      <Page size="A4" style={styles.page} wrap>
        <PDFHeader sectionName="Timing — Seasonal Secrets" />
        <Text style={styles.categoryTitle}>Seasonal Secrets & What to Avoid</Text>
        <Text style={{ ...styles.introText, marginBottom: 12 }}>
          Every month in the Algarve has hidden gems and pitfalls. Here's what the guidebooks don't tell you.
        </Text>

        {timing.map((month) => (
          <View key={month.month} wrap={false} style={{ marginBottom: 12 }}>
            {/* Month name header */}
            <Text style={{
              fontSize: 12,
              fontFamily: 'Playfair Display',
              fontWeight: 'bold',
              color: colors.primary,
              marginBottom: 6,
            }}>
              {month.name}
            </Text>

            {/* Side-by-side green/red boxes */}
            <View style={{ flexDirection: 'row', gap: 10 }}>
              {/* Seasonal Secrets (green) */}
              <View style={{ flex: 1, padding: 8, backgroundColor: '#D1FAE5', borderRadius: 4 }}>
                <Text style={{
                  fontSize: 7,
                  fontWeight: 'bold',
                  color: '#065F46',
                  marginBottom: 4,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}>
                  Seasonal Secrets
                </Text>
                {month.seasonalSecrets.map((secret, i) => (
                  <View key={i} style={{ flexDirection: 'row', marginBottom: 2, alignItems: 'flex-start' }}>
                    <Text style={{ fontSize: 8, color: '#065F46', width: 10 }}>&#x2022;</Text>
                    <Text style={{ fontSize: 8, color: '#065F46', lineHeight: 1.4, flex: 1 }}>{secret}</Text>
                  </View>
                ))}
              </View>

              {/* What to Avoid (red) */}
              <View style={{ flex: 1, padding: 8, backgroundColor: '#FEE2E2', borderRadius: 4 }}>
                <Text style={{
                  fontSize: 7,
                  fontWeight: 'bold',
                  color: '#991B1B',
                  marginBottom: 4,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}>
                  What to Avoid
                </Text>
                {month.avoid.map((item, i) => (
                  <View key={i} style={{ flexDirection: 'row', marginBottom: 2, alignItems: 'flex-start' }}>
                    <Text style={{ fontSize: 8, color: '#7F1D1D', width: 10 }}>&#x2022;</Text>
                    <Text style={{ fontSize: 8, color: '#7F1D1D', lineHeight: 1.4, flex: 1 }}>{item}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        ))}
        <PDFFooter />
      </Page>

      {/* ====== Page 4 — Golden Hour Timing (minor fix) ====== */}
      <Page size="A4" style={styles.page}>
        <PDFHeader sectionName="Timing — Golden Hours" />
        <Text style={styles.categoryTitle}>Golden Hour Timing</Text>
        <Text style={{ ...styles.introText, marginBottom: 15 }}>
          Sunrise and sunset times for planning beach visits and photography.
          The Algarve faces south, so sunset over the ocean only happens on the west coast (Sagres, Castelejo, Cordoama).
        </Text>

        <View style={styles.table}>
          <View style={{ ...styles.tableRow, ...styles.tableHeader }}>
            <Text style={{ ...styles.tableHeaderCell, flex: 1.2 }}>Month</Text>
            <Text style={{ ...styles.tableHeaderCell, flex: 1 }}>Sunrise</Text>
            <Text style={{ ...styles.tableHeaderCell, flex: 1 }}>Sunset</Text>
            <Text style={{ ...styles.tableHeaderCell, flex: 1.2 }}>Daylight</Text>
          </View>
          {timing.map((month, index) => {
            const isEven = index % 2 === 0;
            return (
              <View
                key={month.month}
                style={{
                  ...(index === timing.length - 1 ? styles.tableRowLast : styles.tableRow),
                  backgroundColor: isEven ? colors.background : colors.backgroundAlt,
                }}
                wrap={false}
              >
                <Text style={{ ...styles.tableCell, flex: 1.2, fontWeight: 'bold' }}>
                  {month.name}
                </Text>
                <Text style={{ ...styles.tableCell, flex: 1, color: colors.accent }}>
                  {month.goldenHours.sunrise}
                </Text>
                <Text style={{ ...styles.tableCell, flex: 1, color: colors.error }}>
                  {month.goldenHours.sunset}
                </Text>
                <Text style={{ ...styles.tableCell, flex: 1.2, color: colors.textLight, fontSize: 7 }}>
                  {month.crowds === 'peak' ? 'Long days \u2014 14+ hrs' :
                   month.crowds === 'high' ? 'Long days \u2014 13+ hrs' :
                   month.crowds === 'low' ? 'Short days \u2014 9-10 hrs' :
                   'Moderate \u2014 11-12 hrs'}
                </Text>
              </View>
            );
          })}
        </View>

        <View style={{ ...styles.tipBox, marginTop: 20 }}>
          <Text style={styles.tipLabel}>Photography Tip</Text>
          <Text style={styles.tipText}>
            The best light for cliff photography is in the first and last hour of daylight.
            For Benagil Cave, the skylight illumination is best around midday (11am-1pm) when the sun is directly overhead.
            For Ponta da Piedade, sunrise is unbeatable — arrive 30 minutes before for the full show.
          </Text>
        </View>
        <PDFFooter />
      </Page>

      {/* ====== Page 5 — Timing at a Glance (NEW) ====== */}
      <Page size="A4" style={styles.page}>
        <PDFHeader sectionName="Timing — At a Glance" />
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 12, color: colors.accent, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 8, fontWeight: 'bold' }}>
            Quick Reference
          </Text>
          <Text style={{ fontSize: 26, fontFamily: 'Playfair Display', fontWeight: 'bold', color: colors.primary, marginBottom: 6 }}>
            Timing at a Glance
          </Text>
          <Text style={{ fontSize: 10, color: colors.textLight, lineHeight: 1.5 }}>
            One-line timing rules for every hack — tear out this page and keep it in your pocket.
          </Text>
        </View>

        {/* Grid: 2 columns, 6 rows */}
        {Array.from({ length: 6 }, (_, rowIdx) => (
          <View key={rowIdx} style={{ flexDirection: 'row', gap: 10, marginBottom: 8 }} wrap={false}>
            {timingHacks.slice(rowIdx * 2, rowIdx * 2 + 2).map((hack, colIdx) => {
              const cat = CATEGORY_CONFIG[hack.category];
              return (
                <View
                  key={hack.id}
                  style={{
                    flex: 1,
                    padding: 10,
                    backgroundColor: colIdx === 0 ? colors.backgroundAlt : colors.backgroundWarm,
                    borderRadius: 5,
                    borderLeftWidth: 3,
                    borderLeftColor: cat.color,
                  }}
                >
                  <Text style={{
                    fontSize: 7,
                    color: cat.color,
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    marginBottom: 3,
                  }}>
                    {cat.label}
                  </Text>
                  <Text style={{ fontSize: 10, fontWeight: 'bold', color: colors.primary, marginBottom: 2 }}>
                    {hack.title}
                  </Text>
                  <Text style={{ fontSize: 8, color: colors.textLight, lineHeight: 1.4 }}>
                    {GLANCE_RULES[hack.id] || hack.description}
                  </Text>
                </View>
              );
            })}
          </View>
        ))}
        <PDFFooter />
      </Page>

      {/* ====== Pages 6+ — Insider Timing Hacks (redesigned) ====== */}
      <Page size="A4" style={styles.page} wrap>
        <PDFHeader sectionName="Timing — Insider Hacks" />
        <Text style={styles.categoryTitle}>Insider Timing Hacks</Text>
        <Text style={{ ...styles.introText, marginBottom: 15 }}>
          The kind of knowledge you normally only get after living somewhere for years.
        </Text>

        {CATEGORY_ORDER.map((category, catIdx) => {
          const hacks = hacksByCategory[category];
          if (hacks.length === 0) return null;

          return (
            <React.Fragment key={category}>
              {/* PullQuote between logistics and planning */}
              {catIdx === 3 && (
                <PullQuote
                  quote="The Algarve rewards those who pay attention to timing. Arrive early, eat late, and let the rhythms of the region guide you."
                  attribution="Local wisdom"
                />
              )}

              <CategorySubHeader category={category} />
              {hacks.map((hack) => (
                <TimingHackCard key={hack.id} hack={hack} />
              ))}
            </React.Fragment>
          );
        })}
        <PDFFooter />
      </Page>
    </>
  );
};

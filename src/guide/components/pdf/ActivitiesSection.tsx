import React from 'react';
import { Page, View, Text } from '@react-pdf/renderer';
import { styles, colors } from '../../utils/pdfStyles';
import { PDFHeader, PDFFooter, SectionTitle, ActivityCard, PullQuote } from './shared';
import type { GuideActivity, ActivityCategory } from '../../types/guide';

interface ActivitiesSectionProps {
  activities: GuideActivity[];
}

// ============ CONSTANTS ============

const CATEGORY_CONFIG: Record<ActivityCategory, { label: string; color: string; bg: string; description: string }> = {
  water: { label: 'WATER ACTIVITIES', color: '#0369A1', bg: '#E0F2FE', description: 'Boats, kayaks, SUPs, and everything on the water' },
  adventure: { label: 'ADVENTURE & OUTDOORS', color: '#7C3AED', bg: '#EDE9FE', description: 'Surf, horses, jeeps, and trails' },
  'food-drink': { label: 'FOOD & DRINK', color: '#059669', bg: '#D1FAE5', description: 'Tastings, tours, and cooking classes' },
  cultural: { label: 'CULTURAL EXPERIENCES', color: '#92400E', bg: '#FEF3C7', description: 'Fado, cork, and Portuguese traditions' },
};

const CATEGORY_ORDER: ActivityCategory[] = ['water', 'adventure', 'food-drink', 'cultural'];

const MONTH_LABELS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

// One-liner summaries for the At a Glance grid
const GLANCE_SUMMARIES: Record<string, string> = {
  'benagil-cave-boat': '€25–45 · 1.5–2.5h',
  'dolphin-watching': '€35–55 · 2–3h',
  'kayak-coast-tour': '€35–50 · 2–3h',
  'surf-lesson': '€35–50 · 2–3h',
  'ria-formosa-boat': '€25–45 · 2–4h',
  'jeep-safari': '€50–75 · Full day',
  'wine-tasting': '€45–80 · 3–5h',
  'sup-tour': '€30–45 · 1.5–2.5h',
  'food-tour': '€55–85 · 3–4h',
  'sunset-cruise': '€30–55 · 1.5–2.5h',
  'catamaran-sunset-cruise': '€40–65 · 2–3h',
  'snorkeling-tour': '€30–50 · 2–3h',
  'jet-ski-rental': '€60–120 · 0.5–1.5h',
  'horseback-riding-beach': '€45–80 · 1.5–3h',
  'ecovia-cycling': '€15–80 · Half day+',
  'cooking-class': '€65–100 · 3–5h',
  'fado-night': '€40–70 · 2–3h',
  'cork-factory-tour': '€15–30 · 1.5–2.5h',
};

// ============ SUB-COMPONENTS ============

const CategorySubHeader: React.FC<{ category: ActivityCategory }> = ({ category }) => {
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

export const ActivitiesSection: React.FC<ActivitiesSectionProps> = ({ activities }) => {
  // Group activities by category
  const actsByCategory: Record<ActivityCategory, GuideActivity[]> = {
    water: [],
    adventure: [],
    'food-drink': [],
    cultural: [],
  };
  for (const act of activities) {
    actsByCategory[act.category].push(act);
  }

  return (
    <>
      {/* ====== Page 1 — Intro (enhanced) ====== */}
      <Page size="A4" style={styles.page}>
        <PDFHeader sectionName="Activities & Experiences" />
        <SectionTitle
          number={7}
          title="Activities & Experiences"
          subtitle="The best things to do in the Algarve — and how to book them right"
        />
        <Text style={styles.introText}>
          The Algarve isn't just beaches and restaurants. From paddling through
          sea caves to tasting wines that never leave the region, these are the
          experiences that turn a good holiday into an unforgettable one.
        </Text>
        <Text style={styles.introText}>
          Each activity includes honest pricing, the best departure points,
          seasonal advice, and the insider tips that most tourists learn too late.
        </Text>

        {/* Budget Guide box */}
        <View style={styles.tipBox}>
          <Text style={styles.tipLabel}>Budget Guide</Text>
          <Text style={styles.tipText}>€ Under €35 — Boat tours, bike rental, cork factory</Text>
          <Text style={styles.tipText}>€€ €35–60 — Kayak, surf, SUP, snorkeling, horseback</Text>
          <Text style={styles.tipText}>€€€ €60+ — Jet ski, cooking class, wine tasting, jeep safari</Text>
        </View>

        {/* Booking Tips box */}
        <View style={{ ...styles.tipBox, marginTop: 12 }}>
          <Text style={styles.tipLabel}>Booking Tips</Text>
          <Text style={styles.tipText}>
            • Book water activities 2-3 days ahead in summer — popular tours sell out
          </Text>
          <Text style={styles.tipText}>
            • Morning departures are almost always better (calmer seas, fewer crowds, better light)
          </Text>
          <Text style={styles.tipText}>
            • Check cancellation policies — weather cancellations are common and good operators offer full refunds
          </Text>
          <Text style={styles.tipText}>
            • Small-group tours (8-12 people) are worth the premium over large-group options (40+)
          </Text>
        </View>
        <PDFFooter />
      </Page>

      {/* ====== Page 2 — Activities at a Glance ====== */}
      <Page size="A4" style={styles.page}>
        <PDFHeader sectionName="Activities — At a Glance" />
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 12, color: colors.accent, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 8, fontWeight: 'bold' }}>
            Quick Reference
          </Text>
          <Text style={{ fontSize: 26, fontFamily: 'Playfair Display', fontWeight: 'bold', color: colors.primary, marginBottom: 6 }}>
            Activities at a Glance
          </Text>
          <Text style={{ fontSize: 10, color: colors.textLight, lineHeight: 1.5 }}>
            All 18 experiences at a glance — category, price, and duration in one view.
          </Text>
        </View>

        {/* Grid: 2 columns, 9 rows */}
        {Array.from({ length: 9 }, (_, rowIdx) => (
          <View key={rowIdx} style={{ flexDirection: 'row', gap: 10, marginBottom: 8 }} wrap={false}>
            {activities.slice(rowIdx * 2, rowIdx * 2 + 2).map((act, colIdx) => {
              const cat = CATEGORY_CONFIG[act.category];
              return (
                <View
                  key={act.id}
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
                    {act.name}
                  </Text>
                  <Text style={{ fontSize: 8, color: colors.textLight, lineHeight: 1.4 }}>
                    {GLANCE_SUMMARIES[act.id] || `${act.priceRange} · ${act.duration}`}
                  </Text>
                </View>
              );
            })}
          </View>
        ))}
        <PDFFooter />
      </Page>

      {/* ====== Page 3 — Seasonal Availability Matrix ====== */}
      <Page size="A4" style={styles.page}>
        <PDFHeader sectionName="Activities — Seasonal Guide" />
        <Text style={{ fontSize: 18, fontFamily: 'Playfair Display', fontWeight: 'bold', color: colors.secondary, marginBottom: 6 }}>
          Seasonal Availability
        </Text>
        <Text style={{ fontSize: 9, color: colors.textLight, marginBottom: 12, lineHeight: 1.5 }}>
          Plan ahead — not every activity runs year-round. Green = peak season, blue = available, white = not running.
        </Text>

        <View style={styles.table}>
          {/* Header row */}
          <View style={{ ...styles.tableRow, ...styles.tableHeader }}>
            <Text style={{ ...styles.tableHeaderCell, flex: 2.5, fontSize: 7 }}>Activity</Text>
            {MONTH_LABELS.map((m, i) => (
              <Text key={i} style={{ ...styles.tableHeaderCell, flex: 0.6, fontSize: 7, textAlign: 'center', padding: 4 }}>{m}</Text>
            ))}
          </View>

          {/* Activity rows grouped by category */}
          {CATEGORY_ORDER.map((category) => {
            const catActs = actsByCategory[category];
            if (catActs.length === 0) return null;
            const cat = CATEGORY_CONFIG[category];

            return (
              <React.Fragment key={category}>
                {/* Category divider row */}
                <View style={{ ...styles.tableRow, backgroundColor: cat.bg }} wrap={false}>
                  <Text style={{ flex: 2.5, padding: 4, fontSize: 7, fontWeight: 'bold', color: cat.color, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    {cat.label}
                  </Text>
                  {MONTH_LABELS.map((_, i) => (
                    <Text key={i} style={{ flex: 0.6, padding: 4 }}> </Text>
                  ))}
                </View>

                {/* Activity rows */}
                {catActs.map((act, actIdx) => (
                  <View
                    key={act.id}
                    style={actIdx === catActs.length - 1 && category === 'cultural' ? styles.tableRowLast : styles.tableRow}
                    wrap={false}
                  >
                    <Text style={{ flex: 2.5, padding: 4, fontSize: 7, color: colors.text }}>
                      {act.name}
                    </Text>
                    {MONTH_LABELS.map((_, monthIdx) => {
                      const month = monthIdx + 1;
                      const isPeak = act.peakMonths.includes(month);
                      const isAvailable = act.availableMonths.includes(month);
                      let bgColor = colors.white;
                      if (isPeak) bgColor = '#D1FAE5';
                      else if (isAvailable) bgColor = '#DBEAFE';

                      return (
                        <View key={monthIdx} style={{ flex: 0.6, padding: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: bgColor, borderRightWidth: monthIdx < 11 ? 0.5 : 0, borderRightColor: colors.border }}>
                          <Text style={{ fontSize: 6, color: isPeak ? '#065F46' : isAvailable ? '#1E40AF' : colors.border }}>
                            {isPeak ? '●' : isAvailable ? '●' : ''}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                ))}
              </React.Fragment>
            );
          })}
        </View>

        {/* Legend */}
        <View style={{ flexDirection: 'row', gap: 16, marginTop: 12 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 12, height: 12, backgroundColor: '#D1FAE5', borderRadius: 2, marginRight: 4 }} />
            <Text style={{ fontSize: 8, color: colors.text }}>Peak Season</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 12, height: 12, backgroundColor: '#DBEAFE', borderRadius: 2, marginRight: 4 }} />
            <Text style={{ fontSize: 8, color: colors.text }}>Available</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 12, height: 12, backgroundColor: colors.white, borderRadius: 2, marginRight: 4, borderWidth: 1, borderColor: colors.border }} />
            <Text style={{ fontSize: 8, color: colors.text }}>Not Running</Text>
          </View>
        </View>
        <PDFFooter />
      </Page>

      {/* ====== Pages 4+ — Grouped Activity Cards ====== */}
      <Page size="A4" style={styles.page} wrap>
        <PDFHeader sectionName="Activities & Experiences" />

        {CATEGORY_ORDER.map((category, catIdx) => {
          const catActs = actsByCategory[category];
          if (catActs.length === 0) return null;

          return (
            <React.Fragment key={category}>
              {/* PullQuote between adventure and food-drink */}
              {catIdx === 2 && (
                <PullQuote
                  quote="The best Algarve memories aren't from lying on a beach — they're from the morning you paddled into a sea cave, the afternoon you learned to make cataplana, or the evening fado left you speechless."
                  attribution="Personal note"
                />
              )}

              <CategorySubHeader category={category} />
              {catActs.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </React.Fragment>
          );
        })}
        <PDFFooter />
      </Page>
    </>
  );
};

import React from 'react';
import { Page, View, Text, Image } from '@react-pdf/renderer';
import { styles, colors } from '../../utils/pdfStyles';
import type { GuideConfig } from '../../types/guide';

interface CoverPageProps {
  config: GuideConfig;
  stats: {
    beaches: number;
    restaurants: number;
    towns: number;
    accommodations: number;
    traps: number;
    activities: number;
    dayTrips: number;
  };
}

function resolveImageUrl(path: string): string {
  if (path.startsWith('http')) return path;
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  return `${origin}${path}`;
}

export const CoverPage: React.FC<CoverPageProps> = ({ config, stats }) => (
  <>
    {/* ====== COVER PAGE ====== */}
    <Page size="A4" style={styles.coverPage}>
      {/* Background image */}
      <Image
        src={resolveImageUrl('/images/lagos/lagos-panoramic-coast.jpg')}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      {/* Dark overlay */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: colors.primary,
          opacity: 0.75,
        }}
      />

      {/* Content */}
      <View style={styles.coverContainer}>
        {/* Top accent line */}
        <View style={{ width: 60, height: 3, backgroundColor: colors.accent, marginBottom: 30 }} />

        <Text style={{ fontSize: 14, color: colors.accent, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 20, fontWeight: 'bold' }}>
          The Insider's Guide
        </Text>

        <Text style={styles.coverTitle}>The Algarve</Text>
        <Text style={styles.coverTitle}>Secret Guide</Text>

        {/* Decorative divider */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 25 }}>
          <View style={{ width: 40, height: 1, backgroundColor: colors.white, opacity: 0.4 }} />
          <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.accent, marginHorizontal: 12 }} />
          <View style={{ width: 40, height: 1, backgroundColor: colors.white, opacity: 0.4 }} />
        </View>

        <Text style={styles.coverSubtitle}>
          The places tourists miss and locals actually go
        </Text>

        <Text style={styles.coverTagline}>
          Curated by someone who lives here
        </Text>

        {/* Bottom section */}
        <View style={{ position: 'absolute', bottom: 60, left: 50, right: 50, alignItems: 'center' }}>
          <View style={{ width: 40, height: 1, backgroundColor: colors.accent, marginBottom: 20 }} />
          <Text style={{ fontSize: 11, color: colors.white, letterSpacing: 1, marginBottom: 6 }}>
            By {config.author.name}
          </Text>
          <Text style={{ fontSize: 9, color: colors.white, opacity: 0.6 }}>
            Version {config.version} — Updated {config.lastUpdated}
          </Text>
        </View>
      </View>
    </Page>

    {/* ====== WHAT'S INSIDE PAGE ====== */}
    <Page size="A4" style={styles.page}>
      <View style={{ marginBottom: 10 }}>
        <Text style={{ fontSize: 12, color: colors.accent, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 8, fontWeight: 'bold' }}>
          What's Inside
        </Text>
        <Text style={{ fontSize: 28, fontFamily: 'Playfair Display', fontWeight: 'bold', color: colors.primary, marginBottom: 6 }}>
          Your Algarve Cheat Sheet
        </Text>
        <Text style={{ fontSize: 11, color: colors.textLight, lineHeight: 1.5, marginBottom: 20 }}>
          Everything you need to experience the real Algarve, curated by locals who actually live here.
        </Text>
      </View>

      {/* Stats grid — 2 columns, 4 rows */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 25 }}>
        <View style={{ width: '50%', paddingRight: 8, marginBottom: 10 }}>
          <View style={{ backgroundColor: colors.backgroundAlt, borderRadius: 6, padding: 12, borderLeftWidth: 4, borderLeftColor: colors.secondary }}>
            <Text style={{ fontSize: 26, fontWeight: 'bold', color: colors.primary }}>{stats.beaches}</Text>
            <Text style={{ fontSize: 10, fontWeight: 'bold', color: colors.text, marginBottom: 2 }}>Secret Beaches</Text>
            <Text style={{ fontSize: 8, color: colors.textLight }}>GPS coords, parking, personal takes</Text>
          </View>
        </View>
        <View style={{ width: '50%', paddingLeft: 8, marginBottom: 10 }}>
          <View style={{ backgroundColor: colors.backgroundAlt, borderRadius: 6, padding: 12, borderLeftWidth: 4, borderLeftColor: colors.secondary }}>
            <Text style={{ fontSize: 26, fontWeight: 'bold', color: colors.primary }}>{stats.restaurants}</Text>
            <Text style={{ fontSize: 10, fontWeight: 'bold', color: colors.text, marginBottom: 2 }}>Local Restaurants</Text>
            <Text style={{ fontSize: 8, color: colors.textLight }}>What to order, hours, reservations</Text>
          </View>
        </View>
        <View style={{ width: '50%', paddingRight: 8, marginBottom: 10 }}>
          <View style={{ backgroundColor: colors.backgroundAlt, borderRadius: 6, padding: 12, borderLeftWidth: 4, borderLeftColor: colors.secondary }}>
            <Text style={{ fontSize: 26, fontWeight: 'bold', color: colors.primary }}>{stats.towns}</Text>
            <Text style={{ fontSize: 10, fontWeight: 'bold', color: colors.text, marginBottom: 2 }}>Towns Profiled</Text>
            <Text style={{ fontSize: 8, color: colors.textLight }}>Where to base yourself and why</Text>
          </View>
        </View>
        <View style={{ width: '50%', paddingLeft: 8, marginBottom: 10 }}>
          <View style={{ backgroundColor: colors.backgroundAlt, borderRadius: 6, padding: 12, borderLeftWidth: 4, borderLeftColor: colors.secondary }}>
            <Text style={{ fontSize: 26, fontWeight: 'bold', color: colors.primary }}>{stats.accommodations}</Text>
            <Text style={{ fontSize: 10, fontWeight: 'bold', color: colors.text, marginBottom: 2 }}>Places to Stay</Text>
            <Text style={{ fontSize: 8, color: colors.textLight }}>Hotels, guesthouses, apartments</Text>
          </View>
        </View>
        <View style={{ width: '50%', paddingRight: 8, marginBottom: 10 }}>
          <View style={{ backgroundColor: colors.backgroundAlt, borderRadius: 6, padding: 12, borderLeftWidth: 4, borderLeftColor: colors.accent }}>
            <Text style={{ fontSize: 26, fontWeight: 'bold', color: colors.accent }}>{stats.traps}</Text>
            <Text style={{ fontSize: 10, fontWeight: 'bold', color: colors.text, marginBottom: 2 }}>Tourist Traps Exposed</Text>
            <Text style={{ fontSize: 8, color: colors.textLight }}>What to skip and where to go instead</Text>
          </View>
        </View>
        <View style={{ width: '50%', paddingLeft: 8, marginBottom: 10 }}>
          <View style={{ backgroundColor: colors.backgroundAlt, borderRadius: 6, padding: 12, borderLeftWidth: 4, borderLeftColor: colors.secondary }}>
            <Text style={{ fontSize: 26, fontWeight: 'bold', color: colors.primary }}>{stats.activities}</Text>
            <Text style={{ fontSize: 10, fontWeight: 'bold', color: colors.text, marginBottom: 2 }}>Activities & Experiences</Text>
            <Text style={{ fontSize: 8, color: colors.textLight }}>What to do, book, and how to save</Text>
          </View>
        </View>
        <View style={{ width: '50%', paddingRight: 8, marginBottom: 10 }}>
          <View style={{ backgroundColor: colors.backgroundAlt, borderRadius: 6, padding: 12, borderLeftWidth: 4, borderLeftColor: colors.secondary }}>
            <Text style={{ fontSize: 26, fontWeight: 'bold', color: colors.primary }}>{stats.dayTrips}</Text>
            <Text style={{ fontSize: 10, fontWeight: 'bold', color: colors.text, marginBottom: 2 }}>Day Trip Routes</Text>
            <Text style={{ fontSize: 8, color: colors.textLight }}>Complete itineraries, stop by stop</Text>
          </View>
        </View>
        <View style={{ width: '50%', paddingLeft: 8, marginBottom: 10 }}>
          <View style={{ backgroundColor: colors.backgroundAlt, borderRadius: 6, padding: 12, borderLeftWidth: 4, borderLeftColor: colors.secondary }}>
            <Text style={{ fontSize: 26, fontWeight: 'bold', color: colors.primary }}>12</Text>
            <Text style={{ fontSize: 10, fontWeight: 'bold', color: colors.text, marginBottom: 2 }}>Month-by-Month Guide</Text>
            <Text style={{ fontSize: 8, color: colors.textLight }}>Best time to visit for anything</Text>
          </View>
        </View>
      </View>

      {/* Sections overview */}
      <View style={{ backgroundColor: colors.primary, borderRadius: 6, padding: 18 }}>
        <Text style={{ fontSize: 10, color: colors.accent, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12, fontWeight: 'bold' }}>
          Sections
        </Text>
        {[
          { num: '01', label: 'The Beaches', desc: 'Hidden coves, family spots, wild coasts — with access ratings' },
          { num: '02', label: 'Restaurants Locals Go To', desc: 'Hours, closing days, what to order, insider tips' },
          { num: '03', label: 'Town Profiles', desc: '15 towns — where to base yourself and why' },
          { num: '04', label: 'Where to Stay', desc: 'Hotels, guesthouses — honest picks for every budget' },
          { num: '05', label: 'Tourist Traps to Avoid', desc: 'Save money and time with honest warnings' },
          { num: '06', label: 'Timing Hacks', desc: 'Month-by-month guide and seasonal secrets' },
          { num: '07', label: 'Activities & Experiences', desc: 'Tours, water sports, food — with booking links' },
          { num: '08', label: 'Practical Essentials', desc: 'Transport, money, safety, language tips' },
          { num: '09', label: 'Day Trips & Itineraries', desc: 'Routes + 3/5/7-day plans ready to follow' },
          { num: '+', label: 'Budget vs Splurge', desc: 'Where to save and where to spend for the best value' },
          { num: '+', label: 'Events Calendar', desc: 'Month-by-month festivals and seasonal happenings' },
          { num: '+', label: 'Reference', desc: 'Food glossary, packing list, Portuguese phrases' },
        ].map((section) => (
          <View key={section.num} style={{ flexDirection: 'row', marginBottom: 8, alignItems: 'flex-start' }}>
            <Text style={{ fontSize: 10, color: colors.accent, fontWeight: 'bold', width: 28 }}>{section.num}</Text>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 10, color: colors.white, fontWeight: 'bold' }}>{section.label}</Text>
              <Text style={{ fontSize: 8, color: colors.white, opacity: 0.7 }}>{section.desc}</Text>
            </View>
          </View>
        ))}
      </View>
    </Page>

    {/* ====== ABOUT & HOW TO USE PAGE ====== */}
    <Page size="A4" style={styles.page}>
      {/* About the author */}
      <View style={{ marginBottom: 30 }}>
        <Text style={{ fontSize: 12, color: colors.accent, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 8, fontWeight: 'bold' }}>
          About This Guide
        </Text>
        <Text style={{ fontSize: 24, fontFamily: 'Playfair Display', fontWeight: 'bold', color: colors.primary, marginBottom: 14 }}>
          Written by Locals, for You
        </Text>
        <Text style={styles.introText}>{config.author.bio}</Text>
      </View>

      {/* How to Use */}
      <View style={{ marginBottom: 25 }}>
        <Text style={{ fontSize: 18, fontFamily: 'Playfair Display', fontWeight: 'bold', color: colors.primary, marginBottom: 14 }}>
          How to Use This Guide
        </Text>
        {config.howToUse.map((tip, index) => (
          <View key={index} style={{ flexDirection: 'row', marginBottom: 8, alignItems: 'flex-start' }}>
            <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', marginRight: 10, marginTop: 1 }}>
              <Text style={{ fontSize: 8, color: colors.white, fontWeight: 'bold' }}>{index + 1}</Text>
            </View>
            <Text style={{ flex: 1, fontSize: 10, color: colors.text, lineHeight: 1.5 }}>{tip}</Text>
          </View>
        ))}
      </View>

      {/* Personal note */}
      <View style={{ backgroundColor: colors.backgroundWarm, borderRadius: 6, padding: 18, borderLeftWidth: 4, borderLeftColor: colors.accent }}>
        <Text style={{ fontSize: 10, color: colors.accent, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>
          A Note From Us
        </Text>
        <Text style={{ fontSize: 10, color: colors.text, lineHeight: 1.6, fontStyle: 'italic' }}>
          This isn't a comprehensive travel guide — it's our personal cheat sheet.
          Every place here earned its spot because we've been there, loved it,
          and think you will too. We've left out the tourist traps and the "must-sees"
          that aren't actually that great. What's left is the real Algarve.
        </Text>
        <View style={{ height: 1, backgroundColor: colors.accent, opacity: 0.2, marginVertical: 10 }} />
        <Text style={{ fontSize: 9, color: colors.textLight, lineHeight: 1.5 }}>
          This guide is updated quarterly. If you spot something that's changed or have
          a suggestion, email us at hello@algarve-newsletter.com — we read every message.
        </Text>
      </View>
    </Page>
  </>
);

import React from 'react';
import { Page, View, Text, Image } from '@react-pdf/renderer';
import { styles, colors } from '../../utils/pdfStyles';
import type { GuideConfig } from '../../types/guide';

function resolveImageUrl(path: string): string {
  if (path.startsWith('http')) return path;
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  return `${origin}${path}`;
}

interface ClosingPageProps {
  config: GuideConfig;
}

export const ClosingPage: React.FC<ClosingPageProps> = ({ config }) => (
  <>
    {/* Thank You / CTA Page */}
    <Page size="A4" style={styles.coverPage}>
      {/* Background image — matching cover page for visual bookend */}
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
      {/* Dark overlay — slightly more opaque than cover for text readability */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: colors.primary,
          opacity: 0.82,
        }}
      />

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 60 }}>
        {/* Accent line */}
        <View style={{ width: 60, height: 3, backgroundColor: colors.accent, marginBottom: 30 }} />

        <Text style={{ fontSize: 28, fontFamily: 'Playfair Display', fontWeight: 'bold', color: colors.white, textAlign: 'center', marginBottom: 8 }}>
          You're Ready.
        </Text>
        <Text style={{ fontSize: 14, color: colors.white, textAlign: 'center', opacity: 0.85, lineHeight: 1.6, marginBottom: 25 }}>
          This guide is yours — forever. Now go discover{'\n'}the Algarve the way locals experience it.
        </Text>

        {/* Decorative divider */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 25 }}>
          <View style={{ width: 40, height: 1, backgroundColor: colors.white, opacity: 0.3 }} />
          <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.accent, marginHorizontal: 12 }} />
          <View style={{ width: 40, height: 1, backgroundColor: colors.white, opacity: 0.3 }} />
        </View>

        {/* Money saved calculator */}
        <View style={{
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          borderRadius: 8,
          padding: 20,
          width: '100%',
          marginBottom: 15,
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.12)',
        }}>
          <Text style={{ fontSize: 10, color: colors.accent, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 10, fontWeight: 'bold', textAlign: 'center' }}>
            What This Guide Saves You
          </Text>
          {[
            { item: 'Avoiding overpriced airport car rental', saving: '€50–100' },
            { item: 'Eating where locals eat vs tourist traps', saving: '€15–30/day' },
            { item: 'Booking activities direct vs hotel markup', saving: '€20–50' },
            { item: 'Knowing toll rules before you drive', saving: '€30–80 in fines' },
            { item: 'Using Uber/Bolt vs unmetered taxis', saving: '€10–20/ride' },
          ].map((row, i) => (
            <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4, paddingHorizontal: 5 }}>
              <Text style={{ fontSize: 9, color: colors.white, opacity: 0.8 }}>{row.item}</Text>
              <Text style={{ fontSize: 9, color: colors.accent, fontWeight: 'bold' }}>{row.saving}</Text>
            </View>
          ))}
          <View style={{ height: 1, backgroundColor: colors.accent, opacity: 0.3, marginVertical: 8 }} />
          <Text style={{ fontSize: 10, color: colors.accent, textAlign: 'center', fontWeight: 'bold' }}>
            A week in the Algarve? This guide pays for itself on day one.
          </Text>
        </View>

        {/* What's included with purchase */}
        <View style={{
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: 8,
          padding: 16,
          width: '100%',
          marginBottom: 15,
        }}>
          <Text style={{ fontSize: 10, color: colors.accent, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 }}>
            Your Purchase Includes
          </Text>
          <Text style={{ fontSize: 9, color: colors.white, opacity: 0.8, textAlign: 'center', lineHeight: 1.6 }}>
            Quarterly updates with new discoveries, price changes, and fresh tips{'\n'}
            — delivered straight to your inbox, no extra cost. This guide{'\n'}
            evolves with the Algarve, and so does your access.
          </Text>
        </View>

        {/* Stay connected + share */}
        <View style={{
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: 8,
          padding: 16,
          width: '100%',
          marginBottom: 15,
        }}>
          <Text style={{ fontSize: 10, color: colors.accent, fontWeight: 'bold', textAlign: 'center', marginBottom: 6 }}>
            Get Even More Tips Weekly
          </Text>
          <Text style={{ fontSize: 9, color: colors.white, opacity: 0.7, textAlign: 'center', lineHeight: 1.6 }}>
            Join the free weekly newsletter for seasonal updates and insider{'\n'}
            discoveries that didn't make it into this guide.
          </Text>
          <View style={{ height: 1, backgroundColor: colors.accent, opacity: 0.3, marginVertical: 8 }} />
          <Text style={{ fontSize: 11, color: colors.accent, textAlign: 'center', fontWeight: 'bold' }}>
            algarve-newsletter.com
          </Text>
        </View>

        {/* Contact */}
        <Text style={{ fontSize: 9, color: colors.white, opacity: 0.5, textAlign: 'center', lineHeight: 1.6, marginBottom: 5 }}>
          Found something that's changed? Have a recommendation?
        </Text>
        <Text style={{ fontSize: 10, color: colors.white, opacity: 0.7, textAlign: 'center' }}>
          hello@algarve-newsletter.com
        </Text>

        {/* Bottom section */}
        <View style={{ position: 'absolute', bottom: 50, left: 60, right: 60, alignItems: 'center' }}>
          <View style={{ width: 40, height: 1, backgroundColor: colors.accent, marginBottom: 15 }} />
          <Text style={{ fontSize: 9, color: colors.white, opacity: 0.5, textAlign: 'center' }}>
            The Algarve Secret Guide · Version {config.version}
          </Text>
          <Text style={{ fontSize: 8, color: colors.white, opacity: 0.35, textAlign: 'center', marginTop: 4 }}>
            © {new Date().getFullYear()} Algarve Newsletter. All rights reserved.
          </Text>
        </View>
      </View>
    </Page>
  </>
);

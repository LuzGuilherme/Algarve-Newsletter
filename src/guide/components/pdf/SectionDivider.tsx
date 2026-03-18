import React from 'react';
import { Page, View, Text } from '@react-pdf/renderer';
import { colors } from '../../utils/pdfStyles';

interface SectionDividerProps {
  number: number;
  title: string;
  teaser: string;
  bookmark?: string;
}

// Three visual variants that cycle across sections
const VARIANTS = [
  { bg: '#004E55', accentColor: colors.accent, numberBg: colors.accent, numberColor: '#004E55' },   // Classic teal + gold
  { bg: '#1B3A4B', accentColor: '#E0F2FE', numberBg: '#E0F2FE', numberColor: '#1B3A4B' },           // Deep navy + ice blue
  { bg: '#2D3A2E', accentColor: '#BBF7D0', numberBg: '#BBF7D0', numberColor: '#2D3A2E' },           // Forest green + mint
];

export const SectionDivider: React.FC<SectionDividerProps> = ({ number, title, teaser, bookmark }) => {
  const variant = VARIANTS[(number - 1) % VARIANTS.length];
  // Even sections: left-aligned. Odd sections: centered.
  const isLeftAligned = number % 2 === 0;

  return (
    <Page size="A4" style={{ padding: 0, fontFamily: 'Source Sans 3', backgroundColor: variant.bg }} bookmark={bookmark}>
      {/* Decorative corner accent — top-right for centered, top-left for left-aligned */}
      <View style={{
        position: 'absolute',
        top: 0,
        [isLeftAligned ? 'left' : 'right']: 0,
        width: 120,
        height: 120,
        backgroundColor: variant.accentColor,
        opacity: 0.08,
      }} />

      {/* Thin side accent bar */}
      <View style={{
        position: 'absolute',
        top: 80,
        bottom: 80,
        [isLeftAligned ? 'left' : 'right']: 0,
        width: 4,
        backgroundColor: variant.accentColor,
        opacity: 0.4,
      }} />

      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: isLeftAligned ? 'flex-start' : 'center',
        padding: 60,
        paddingLeft: isLeftAligned ? 70 : 60,
      }}>
        {/* Section number badge */}
        <View style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: variant.numberBg,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 24,
        }}>
          <Text style={{
            fontSize: 18,
            color: variant.numberColor,
            fontWeight: 'bold',
          }}>
            {String(number).padStart(2, '0')}
          </Text>
        </View>

        {/* Title */}
        <Text style={{
          fontSize: 42,
          fontFamily: 'Playfair Display',
          fontWeight: 'bold',
          color: colors.white,
          textAlign: isLeftAligned ? 'left' : 'center',
          marginBottom: 16,
          lineHeight: 1.2,
        }}>
          {title}
        </Text>

        {/* Accent line */}
        <View style={{
          width: 50,
          height: 3,
          backgroundColor: variant.accentColor,
          marginBottom: 20,
          alignSelf: isLeftAligned ? 'flex-start' : 'center',
        }} />

        {/* Teaser */}
        <Text style={{
          fontSize: 14,
          color: colors.white,
          opacity: 0.8,
          textAlign: isLeftAligned ? 'left' : 'center',
          lineHeight: 1.6,
          maxWidth: 380,
        }}>
          {teaser}
        </Text>
      </View>

      {/* Bottom accent */}
      <View style={{
        position: 'absolute',
        bottom: 50,
        left: 0,
        right: 0,
        alignItems: isLeftAligned ? 'flex-start' : 'center',
        paddingLeft: isLeftAligned ? 70 : 0,
      }}>
        <View style={{ width: 40, height: 1, backgroundColor: variant.accentColor, opacity: 0.4 }} />
      </View>
    </Page>
  );
};

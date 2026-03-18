import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { colors } from '../../../utils/pdfStyles';

interface SectionTitleProps {
  number: number;
  title: string;
  subtitle?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ number, title, subtitle }) => (
  <View style={{
    marginBottom: 30,
    marginHorizontal: -45,
    paddingHorizontal: 45,
    paddingTop: 30,
    paddingBottom: 25,
    backgroundColor: colors.primary,
  }}>
    {/* Accent line */}
    <View style={{ width: 40, height: 3, backgroundColor: colors.accent, marginBottom: 14 }} />

    <Text style={{
      fontSize: 11,
      color: colors.accent,
      fontWeight: 'bold',
      letterSpacing: 3,
      textTransform: 'uppercase',
      marginBottom: 8,
    }}>
      Section {String(number).padStart(2, '0')}
    </Text>

    <Text style={{
      fontSize: 30,
      fontFamily: 'Playfair Display',
      fontWeight: 'bold',
      color: colors.white,
      marginBottom: subtitle ? 8 : 0,
    }}>
      {title}
    </Text>

    {subtitle && (
      <Text style={{
        fontSize: 13,
        color: colors.white,
        opacity: 0.8,
        lineHeight: 1.5,
      }}>
        {subtitle}
      </Text>
    )}
  </View>
);

import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { colors } from '../../../utils/pdfStyles';

interface PullQuoteProps {
  quote: string;
  attribution?: string;
}

export const PullQuote: React.FC<PullQuoteProps> = ({ quote, attribution }) => (
  <View
    style={{
      marginVertical: 16,
      paddingVertical: 18,
      paddingHorizontal: 24,
      backgroundColor: colors.primary,
      borderRadius: 6,
    }}
    wrap={false}
  >
    {/* Opening quote mark */}
    <Text style={{
      fontSize: 36,
      fontFamily: 'Playfair Display',
      color: colors.accent,
      lineHeight: 0.8,
      marginBottom: 4,
    }}>
      {'\u201C'}
    </Text>
    <Text style={{
      fontSize: 13,
      fontFamily: 'Playfair Display',
      fontStyle: 'italic',
      color: colors.white,
      lineHeight: 1.6,
      textAlign: 'center',
      marginBottom: attribution ? 8 : 0,
    }}>
      {quote}
    </Text>
    {attribution && (
      <Text style={{
        fontSize: 8,
        color: colors.accent,
        textAlign: 'center',
        letterSpacing: 1,
        textTransform: 'uppercase',
      }}>
        — {attribution}
      </Text>
    )}
  </View>
);

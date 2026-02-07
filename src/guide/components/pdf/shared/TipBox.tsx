import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../../../utils/pdfStyles';

interface TipBoxProps {
  label: string;
  text: string;
  type?: 'tip' | 'skip' | 'success';
}

export const TipBox: React.FC<TipBoxProps> = ({ label, text, type = 'tip' }) => {
  if (type === 'skip') {
    return (
      <View style={styles.skipBox}>
        <Text style={styles.skipLabel}>{label}</Text>
        <Text style={styles.skipText}>{text}</Text>
      </View>
    );
  }

  if (type === 'success') {
    return (
      <View style={styles.successBox}>
        <Text style={styles.successText}>{text}</Text>
      </View>
    );
  }

  return (
    <View style={styles.tipBox}>
      <Text style={styles.tipLabel}>{label}</Text>
      <Text style={styles.tipText}>{text}</Text>
    </View>
  );
};

import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../../../utils/pdfStyles';

interface SectionTitleProps {
  number: number;
  title: string;
  subtitle?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ number, title, subtitle }) => (
  <View style={styles.sectionTitleContainer}>
    <Text style={styles.sectionNumber}>Section {number}</Text>
    <Text style={styles.sectionTitle}>{title}</Text>
    {subtitle && <Text style={styles.sectionSubtitle}>{subtitle}</Text>}
  </View>
);

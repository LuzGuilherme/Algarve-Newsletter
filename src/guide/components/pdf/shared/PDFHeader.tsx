import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../../../utils/pdfStyles';

interface PDFHeaderProps {
  sectionName: string;
}

export const PDFHeader: React.FC<PDFHeaderProps> = ({ sectionName }) => (
  <View style={styles.header} fixed>
    <Text style={styles.headerSection}>{sectionName}</Text>
    <Text style={styles.headerTitle}>The Algarve Secret Guide</Text>
  </View>
);

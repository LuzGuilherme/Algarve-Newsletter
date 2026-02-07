import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../../../utils/pdfStyles';

export const PDFFooter: React.FC = () => (
  <View style={styles.footer} fixed>
    <Text style={styles.footerText}>algarve-newsletter.com</Text>
    <Text
      style={styles.pageNumber}
      render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
    />
  </View>
);

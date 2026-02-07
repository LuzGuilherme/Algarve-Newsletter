import React from 'react';
import { Document, Page, Text, View, PDFViewer, StyleSheet } from '@react-pdf/renderer';

// Simple styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#004E55',
  },
  text: {
    fontSize: 12,
    marginBottom: 10,
  },
});

// Simple test PDF document
const TestDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View>
        <Text style={styles.title}>The Algarve Secret Guide</Text>
        <Text style={styles.text}>This is a test PDF to verify react-pdf is working.</Text>
        <Text style={styles.text}>If you can see this, the PDF renderer is functioning correctly.</Text>
      </View>
    </Page>
  </Document>
);

const GuideTest: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-teal-600 text-white p-4">
        <h1 className="text-xl font-bold">PDF Test Page</h1>
      </div>
      <PDFViewer style={{ width: '100%', height: 'calc(100vh - 64px)' }}>
        <TestDocument />
      </PDFViewer>
    </div>
  );
};

export default GuideTest;

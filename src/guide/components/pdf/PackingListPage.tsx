import React from 'react';
import { Page, View, Text } from '@react-pdf/renderer';
import { styles, colors } from '../../utils/pdfStyles';
import { PDFHeader, PDFFooter } from './shared';

const ESSENTIALS = [
  'SPF 50 sunscreen (reapply every 2 hours — the Algarve sun is deceptively strong)',
  'Wide-brimmed hat — essential May through September',
  'Refillable water bottle (tap water is safe throughout the Algarve)',
  'Comfortable walking shoes for cobblestone old towns',
  'Light jacket or cardigan for evening sea breezes',
  'Power adapter (Type F, European two-pin)',
  'Offline maps downloaded (Google Maps — cell signal drops on the west coast)',
  'Cash (€20-50 in small notes for markets, parking meters, and beach bars)',
];

const BEACH_KIT = [
  'Water shoes — rocky entries at most cove beaches',
  'Snorkelling mask — the water clarity rewards it',
  'Beach umbrella or pop-up shade (no natural shade on island beaches)',
  'Dry bag for phone/keys during kayak trips',
  'Reef-safe sunscreen (marine protected areas throughout the coast)',
  'Towel clips — the coastal wind is relentless',
];

const SUMMER = [
  'Light linen clothing (cotton sticks in humidity)',
  'Swimsuit you can wear under clothes — spontaneous beach stops happen',
  'Flip-flops AND proper sandals (cobblestones destroy cheap flip-flops)',
  'After-sun gel or aloe vera',
  'Insect repellent for evening terrace dining',
];

const SHOULDER_AND_WINTER = [
  'Light rain jacket (October-March — showers are brief but real)',
  'Layers — mornings can be 12°C, afternoons 20°C in winter',
  'Wetsuit if surfing (water is 15-18°C October through May)',
  'Warm fleece for Monchique mountain day trips',
  'Binoculars for Ria Formosa birdwatching (winter is peak season)',
];

interface ListSectionProps {
  title: string;
  items: string[];
  accent?: string;
}

const ListSection: React.FC<ListSectionProps> = ({ title, items, accent }) => {
  const checkColor = accent || colors.primary;
  return (
    <View style={{ marginBottom: 18 }} wrap={false}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <View style={{ width: 4, height: 16, backgroundColor: checkColor, borderRadius: 1, marginRight: 8 }} />
        <Text style={{ fontSize: 13, fontWeight: 'bold', color: checkColor }}>
          {title}
        </Text>
      </View>
      {items.map((item, index) => (
        <View key={index} style={{ flexDirection: 'row', marginBottom: 5, alignItems: 'flex-start' }}>
          <View style={{ width: 14, height: 14, borderRadius: 2, borderWidth: 1.5, borderColor: checkColor, marginRight: 8, marginTop: 1 }} />
          <Text style={{ flex: 1, fontSize: 9, color: colors.text, lineHeight: 1.5 }}>{item}</Text>
        </View>
      ))}
    </View>
  );
};

export const PackingListPage: React.FC = () => (
  <Page size="A4" style={styles.page}>
    <PDFHeader sectionName="Packing List" />

    <View style={{ marginBottom: 15 }}>
      <Text style={{ fontSize: 12, color: colors.accent, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 8, fontWeight: 'bold' }}>
        Reference
      </Text>
      <Text style={{ fontSize: 24, fontFamily: 'Playfair Display', fontWeight: 'bold', color: colors.primary, marginBottom: 6 }}>
        What to Pack
      </Text>
      <Text style={{ fontSize: 11, color: colors.textLight, lineHeight: 1.5, marginBottom: 10 }}>
        A printable checklist based on what we actually use living here.
      </Text>
    </View>

    <ListSection title="Essentials (Any Season)" items={ESSENTIALS} />
    <ListSection title="Beach Kit" items={BEACH_KIT} accent={colors.secondary} />
    <ListSection title="Summer Additions (Jun-Sep)" items={SUMMER} accent="#D97706" />
    <ListSection title="Shoulder Season & Winter (Oct-May)" items={SHOULDER_AND_WINTER} accent="#7C3AED" />

    <View style={styles.tipBox}>
      <Text style={styles.tipLabel}>Don't Bother Packing</Text>
      <Text style={styles.tipText}>{"• Formal clothes — even Michelin restaurants are \"smart casual\" at most"}</Text>
      <Text style={styles.tipText}>{"• Guidebooks — you're holding the only one you need"}</Text>
      <Text style={styles.tipText}>{"• Excessive toiletries — Portuguese pharmacies and supermarkets have everything"}</Text>
    </View>

    <PDFFooter />
  </Page>
);

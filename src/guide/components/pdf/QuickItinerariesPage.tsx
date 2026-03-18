import React from 'react';
import { Page, View, Text } from '@react-pdf/renderer';
import { styles, colors } from '../../utils/pdfStyles';
import { PDFHeader, PDFFooter } from './shared';

interface ItineraryDay {
  day: number;
  title: string;
  morning: string;
  lunch: string;
  afternoon: string;
  evening: string;
}

interface Itinerary {
  duration: string;
  subtitle: string;
  base: string;
  days: ItineraryDay[];
}

const THREE_DAY: Itinerary = {
  duration: '3 Days',
  subtitle: 'The Essential Highlights',
  base: 'Base yourself in Lagos',
  days: [
    {
      day: 1,
      title: 'Lagos & The Cliffs',
      morning: 'Ponta da Piedade at sunrise (beat the boats). Walk the clifftop trail.',
      lunch: 'O Sebastião in the old town — cataplana for two.',
      afternoon: 'Praia do Camilo or Praia do Pinhão. Old town wander.',
      evening: 'Sunset drinks at Mirandus above Porto de Mós.',
    },
    {
      day: 2,
      title: 'Benagil & The Central Coast',
      morning: '7:30am kayak to Benagil Cave (book ahead). Then Praia da Marinha.',
      lunch: 'Rei das Praias at Praia dos Caneiros — cliff-edge dining.',
      afternoon: 'Drive to Silves. Castle + cathedral. Café Inglês for coffee.',
      evening: 'Back to Lagos. Nah Nah Bah for the best bifana in town.',
    },
    {
      day: 3,
      title: 'Sagres & The Wild West',
      morning: 'Drive to Sagres Fortress. Cape St. Vincent — Europe\'s edge.',
      lunch: 'A Sagres for fresh fish in the village.',
      afternoon: 'Praia do Tonel for a walk (or surf lesson). Praia do Beliche if brave.',
      evening: 'Sunset at Cape St. Vincent. The last sunset in Europe.',
    },
  ],
};

const FIVE_DAY: Itinerary = {
  duration: '5 Days',
  subtitle: 'West Coast + East Coast',
  base: 'Split: 3 nights Lagos, 2 nights Tavira',
  days: [
    { day: 1, title: 'Lagos Essentials', morning: 'Ponta da Piedade at sunrise. Praia do Camilo.', lunch: 'O Sebastião for cataplana.', afternoon: 'Old town walls walk. Praia do Pinhão for a swim.', evening: 'Mirandus for sunset. Nah Nah Bah for late bifana.' },
    { day: 2, title: 'Benagil & Silves', morning: '7:30am Benagil Cave kayak. Praia da Marinha.', lunch: 'Rei das Praias on the cliff.', afternoon: 'Silves Castle + Café Inglês. O Barradas for dinner.', evening: 'Return to Lagos.' },
    { day: 3, title: 'Sagres & West Coast', morning: 'Sagres Fortress. Cape St. Vincent.', lunch: 'A Sagres for seafood.', afternoon: 'Praia do Amado or Carrapateira. Sítio do Forno for coffee.', evening: 'Drive to Tavira (1h45).' },
    { day: 4, title: 'Tavira & Islands', morning: 'Tavira old town. Roman Bridge. Camera Obscura tower.', lunch: 'Casa do Polvo in Santa Luzia — octopus capital.', afternoon: 'Ferry to Ilha de Tavira. Walk east for empty sand.', evening: 'Tertúlias do Cais for riverside wine and petiscos.' },
    { day: 5, title: 'Ria Formosa & Faro', morning: 'Ferry to Ilha Deserta from Faro. Beach + O Estamine lunch.', lunch: 'O Estamine — the only restaurant on a desert island.', afternoon: 'Faro Cidade Velha (walled old town). Bone Chapel.', evening: 'Dois Irmãos in Olhão for fresh fish. Saturday = market day.' },
  ],
};

const SEVEN_DAY: Itinerary = {
  duration: '7 Days',
  subtitle: 'The Complete Algarve',
  base: 'Move: 3 nights Lagos → 2 nights Tavira → 2 nights Loulé/Albufeira',
  days: [
    { day: 1, title: 'Lagos Arrival', morning: 'Settle in. Old town wander.', lunch: 'Nah Nah Bah for a quick bifana.', afternoon: 'Praia Dona Ana or Praia do Pinhão.', evening: 'O Sebastião for a proper first dinner.' },
    { day: 2, title: 'Ponta da Piedade & Beaches', morning: 'Ponta da Piedade at sunrise. Grotto boat trip.', lunch: 'Casa Velha for petiscos.', afternoon: 'Praia do Camilo. Walk to Porto de Mós.', evening: 'Mirandus sunset cocktails.' },
    { day: 3, title: 'Sagres & The Edge', morning: 'Sagres Fortress. Cape St. Vincent.', lunch: 'A Sagres for local fish.', afternoon: 'Praia do Tonel. Surf lesson or cliff walk.', evening: 'Sunset at Cape St. Vincent. Dinner in Sagres.' },
    { day: 4, title: 'Central Coast & Drive East', morning: '7:30am Benagil Cave kayak. Praia da Marinha.', lunch: 'Rei das Praias.', afternoon: 'Drive east to Tavira (1h45). Settle in. Evening walk.', evening: 'Noelia & Jerónimo for Michelin-starred seafood (book ahead).' },
    { day: 5, title: 'Tavira & Santa Luzia', morning: 'Tavira old town. Market. Camera Obscura.', lunch: 'Casa do Polvo in Santa Luzia.', afternoon: 'Ferry to Ilha de Tavira. Walk east for solitude.', evening: 'Pastelaria Rosa for pastries. Tertúlias do Cais for dinner.' },
    { day: 6, title: 'Inland Day: Loulé & Silves', morning: 'Drive to Loulé. Saturday market (if timing works).', lunch: 'Café Calcinha + A Venda for market lunch.', afternoon: 'Drive to Silves. Castle + cathedral. Café Inglês.', evening: 'O Barradas for Algarvian cataplana in Silves.' },
    { day: 7, title: 'Islands & Farewell', morning: 'Ferry to Ilha Deserta from Faro.', lunch: 'O Estamine on the desert island.', afternoon: 'Faro old town if time. Olhão market if Saturday.', evening: 'Dois Irmãos or Taberna da Maré in Olhão for farewell fish.' },
  ],
};

const ItinerarySection: React.FC<{ itinerary: Itinerary }> = ({ itinerary }) => (
  <Page size="A4" style={styles.page} wrap>
    <PDFHeader sectionName={`${itinerary.duration} Itinerary`} />

    <View style={{ marginBottom: 15 }} wrap={false}>
      <View style={{ flexDirection: 'row', alignItems: 'baseline', marginBottom: 4 }}>
        <Text style={{ fontSize: 22, fontFamily: 'Playfair Display', fontWeight: 'bold', color: colors.primary }}>{itinerary.duration}</Text>
        <Text style={{ fontSize: 12, color: colors.textLight, marginLeft: 10 }}>{itinerary.subtitle}</Text>
      </View>
      <View style={{ backgroundColor: colors.backgroundAlt, borderRadius: 4, padding: 8, marginTop: 6 }}>
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: colors.secondary }}>{itinerary.base}</Text>
      </View>
    </View>

    {itinerary.days.map((day) => (
      <View key={day.day} style={{ marginBottom: 12, padding: 12, backgroundColor: colors.backgroundAlt, borderRadius: 6, borderLeftWidth: 4, borderLeftColor: colors.accent }} wrap={false}>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', marginBottom: 6 }}>
          <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', marginRight: 8 }}>
            <Text style={{ fontSize: 10, color: colors.white, fontWeight: 'bold' }}>{day.day}</Text>
          </View>
          <Text style={{ fontSize: 12, fontWeight: 'bold', color: colors.primary }}>{day.title}</Text>
        </View>

        <View style={{ marginLeft: 32 }}>
          <View style={{ flexDirection: 'row', marginBottom: 3 }}>
            <Text style={{ fontSize: 8, fontWeight: 'bold', color: colors.accent, width: 55 }}>Morning</Text>
            <Text style={{ fontSize: 9, color: colors.text, flex: 1, lineHeight: 1.4 }}>{day.morning}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 3 }}>
            <Text style={{ fontSize: 8, fontWeight: 'bold', color: colors.accent, width: 55 }}>Lunch</Text>
            <Text style={{ fontSize: 9, color: colors.text, flex: 1, lineHeight: 1.4 }}>{day.lunch}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 3 }}>
            <Text style={{ fontSize: 8, fontWeight: 'bold', color: colors.accent, width: 55 }}>Afternoon</Text>
            <Text style={{ fontSize: 9, color: colors.text, flex: 1, lineHeight: 1.4 }}>{day.afternoon}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 8, fontWeight: 'bold', color: colors.accent, width: 55 }}>Evening</Text>
            <Text style={{ fontSize: 9, color: colors.text, flex: 1, lineHeight: 1.4 }}>{day.evening}</Text>
          </View>
        </View>
      </View>
    ))}

    <PDFFooter />
  </Page>
);

export const QuickItinerariesPage: React.FC = () => (
  <>
    {/* Intro page */}
    <Page size="A4" style={styles.page} bookmark="itineraries">
      <PDFHeader sectionName="Quick Itineraries" />

      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 12, color: colors.accent, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 8, fontWeight: 'bold' }}>
          If You Only Have...
        </Text>
        <Text style={{ fontSize: 28, fontFamily: 'Playfair Display', fontWeight: 'bold', color: colors.primary, marginBottom: 6 }}>
          Quick Itineraries
        </Text>
        <Text style={{ fontSize: 11, color: colors.textLight, lineHeight: 1.6, marginBottom: 20 }}>
          Not everyone has two weeks. These are our tested itineraries for making the most
          of 3, 5, or 7 days — with realistic timing, the right restaurant for each moment,
          and none of the tourist-trap detours.
        </Text>
      </View>

      <View style={{ flexDirection: 'row', gap: 12, marginBottom: 25 }}>
        {[
          { days: '3', focus: 'Western highlights', color: '#059669' },
          { days: '5', focus: 'West + East coast', color: '#0369A1' },
          { days: '7', focus: 'The complete Algarve', color: '#7C3AED' },
        ].map((plan) => (
          <View key={plan.days} style={{ flex: 1, backgroundColor: colors.backgroundAlt, borderRadius: 6, padding: 14, borderTopWidth: 4, borderTopColor: plan.color, alignItems: 'center' }}>
            <Text style={{ fontSize: 28, fontWeight: 'bold', color: plan.color }}>{plan.days}</Text>
            <Text style={{ fontSize: 10, fontWeight: 'bold', color: colors.text, marginBottom: 2 }}>Days</Text>
            <Text style={{ fontSize: 8, color: colors.textLight, textAlign: 'center' }}>{plan.focus}</Text>
          </View>
        ))}
      </View>

      <View style={styles.tipBox}>
        <Text style={styles.tipLabel}>Planning Tips</Text>
        <Text style={styles.tipText}>{"• These itineraries are tested routes — adjust based on weather and energy"}</Text>
        <Text style={styles.tipText}>{"• Book Benagil Cave kayak and Michelin restaurants 1-2 weeks ahead in summer"}</Text>
        <Text style={styles.tipText}>{"• A rental car is essential for all itineraries — public transport won't cut it"}</Text>
        <Text style={styles.tipText}>{"• Start each morning early (before 9am) to beat crowds at top spots"}</Text>
      </View>

      <PDFFooter />
    </Page>

    {/* Individual itineraries */}
    <ItinerarySection itinerary={THREE_DAY} />
    <ItinerarySection itinerary={FIVE_DAY} />
    <ItinerarySection itinerary={SEVEN_DAY} />
  </>
);

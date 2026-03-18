import React from 'react';
import { Page, View, Text } from '@react-pdf/renderer';
import { styles, colors } from '../../utils/pdfStyles';

interface CalendarEvent {
  month: string;
  events: Array<{
    name: string;
    location: string;
    note: string;
  }>;
}

const calendarData: CalendarEvent[] = [
  {
    month: 'January',
    events: [
      { name: 'New Year\'s Day Swims', location: 'Various beaches', note: 'Brave locals and tourists take a chilly dip — festive atmosphere at Praia da Rocha and Lagos.' },
      { name: 'Algarve Walking Season Begins', location: 'Via Algarviana', note: 'Cool weather makes January ideal for the 300km coast-to-coast trail and Seven Hanging Valleys walk.' },
    ],
  },
  {
    month: 'February',
    events: [
      { name: 'Loulé Carnival', location: 'Loulé', note: 'One of Portugal\'s biggest carnivals — parades, floats, and costumes. 3 days of street celebrations. Book accommodation early.' },
      { name: 'Almond Blossom Season', location: 'Interior Algarve', note: 'The hillsides turn white and pink with almond blossoms — stunning drives through the hinterland.' },
    ],
  },
  {
    month: 'March',
    events: [
      { name: 'Algarve Cup (Women\'s Football)', location: 'Various stadiums', note: 'Prestigious international women\'s football tournament with top national teams. Great atmosphere, cheap tickets.' },
      { name: 'Algarve Nature Week', location: 'Various', note: 'Birdwatching, nature walks, and wildlife experiences across the region. Spring migration begins.' },
    ],
  },
  {
    month: 'April',
    events: [
      { name: 'Easter Processions', location: 'Tavira, Loulé, São Brás', note: 'Traditional religious processions with flower carpets on the streets. São Brás de Alportel\'s Mãe Soberana festival is the biggest.' },
      { name: 'Wildflower Season Peaks', location: 'Costa Vicentina', note: 'The west coast explodes with wildflowers. Best hiking month — orchids, rock roses, and lavender.' },
    ],
  },
  {
    month: 'May',
    events: [
      { name: 'Festival Med', location: 'Loulé', note: 'World music festival in Loulé\'s old town — stages in castle courtyards and narrow streets. A genuinely special atmosphere.' },
      { name: 'Algarve Bike Challenge', location: 'Various', note: 'Mountain biking event through the Algarve\'s interior trails.' },
      { name: 'Seafood Season Opens', location: 'Coastal towns', note: 'Percebes (goose barnacles) and sea urchin season. Restaurants start outdoor terrace service.' },
    ],
  },
  {
    month: 'June',
    events: [
      { name: 'Santos Populares (Popular Saints)', location: 'Everywhere', note: 'Portugal\'s biggest party month. Sardine grills on every corner, street decorations, music. June 13 (Santo António) and June 24 (São João) are the main nights.' },
      { name: 'FATACIL — Algarve International Fair', location: 'Lagoa', note: 'Craft fair, food, wine, music — a good window into Algarve culture and local products.' },
      { name: 'Patron Saint Festivals', location: 'Various villages', note: 'Virtually every village celebrates its patron saint with processions, fireworks, and live music. Ask locals for the nearest one.' },
    ],
  },
  {
    month: 'July',
    events: [
      { name: 'Concentração de Motos (Motorcycle Rally)', location: 'Faro', note: 'Europe\'s largest free motorcycle rally — tens of thousands of bikers descend on Faro. Love it or avoid it.' },
      { name: 'Festival F', location: 'Faro', note: 'Urban music and culture festival in Faro\'s historic centre. Good lineup in an atmospheric setting.' },
      { name: 'Al-Mutamid Festival', location: 'Silves', note: 'Celebration of Arabic heritage with music, food, and crafts. Honouring the Algarve\'s Moorish history.' },
    ],
  },
  {
    month: 'August',
    events: [
      { name: 'Silves Medieval Festival', location: 'Silves', note: 'The castle and old town transform into a medieval market for 10 days. Jousting, craft stalls, period costumes, and roasted meats. The best festival in the Algarve.' },
      { name: 'Sardine Festival', location: 'Portimão', note: '5 days of grilled sardines, music, and seafood along the waterfront. Arrive hungry — entire streets are turned into open-air grills.' },
      { name: 'Banho 29', location: 'Various beaches', note: 'August 29 tradition — the last bath of summer. Locals hit the beach for one final celebration.' },
    ],
  },
  {
    month: 'September',
    events: [
      { name: 'Grape Harvest Season', location: 'Lagoa, Lagos, Silves', note: 'Visit vineyards during harvest — many offer special tasting events and harvest participation experiences.' },
      { name: 'Algarve Nature Festival (Sagres Birdwatching)', location: 'Sagres', note: 'Birdwatching festival timed with autumn migration. Sagres is a major flyway for raptors heading to Africa.' },
      { name: 'Surf Season Begins', location: 'West Coast', note: 'Atlantic swells return. Surf competitions at Arrifana and Amado beaches through autumn.' },
    ],
  },
  {
    month: 'October',
    events: [
      { name: 'Sweet Potato Festival', location: 'Aljezur', note: 'Aljezur celebrates its famous sweet potatoes — tastings, cooking competitions, and live music in the town centre.' },
      { name: 'Fado Nights', location: 'Various', note: 'Special fado performances in intimate venues across the region as autumn cultural season begins.' },
      { name: 'Seafood Festival', location: 'Olhão', note: 'Olhão\'s waterfront hosts a festival celebrating Ria Formosa shellfish — clams, oysters, and cockles fresh from the lagoon.' },
    ],
  },
  {
    month: 'November',
    events: [
      { name: 'Medronho Season', location: 'Monchique, Serra do Caldeirão', note: 'Medronho (local firewater) distillation season. Visit small distilleries in the hills — many offer tastings and tours.' },
      { name: 'Magusto (Chestnut Festival)', location: 'Various', note: 'November 11 tradition — roasted chestnuts, new wine (água-pé), and bonfires. Best in the mountain villages.' },
    ],
  },
  {
    month: 'December',
    events: [
      { name: 'Christmas Markets', location: 'Loulé, Faro, Lagos', note: 'Modest but charming Christmas markets with local crafts, food, and mulled wine. Loulé\'s is the most festive.' },
      { name: 'New Year\'s Eve', location: 'Various', note: 'Fireworks over the marina in Vilamoura, Lagos, and Faro. Albufeira\'s old town has the biggest street party.' },
    ],
  },
];

export const EventsCalendarPage: React.FC = () => (
  <>
    <Page size="A4" style={styles.page} bookmark="events">
      {/* Header */}
      <View style={{ marginBottom: 18 }}>
        <Text style={{ fontSize: 12, color: colors.accent, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 8, fontWeight: 'bold' }}>
          Seasonal Guide
        </Text>
        <Text style={{ fontSize: 26, fontFamily: 'Playfair Display', fontWeight: 'bold', color: colors.primary, marginBottom: 6 }}>
          Festivals & Events Calendar
        </Text>
        <Text style={{ fontSize: 10, color: colors.textLight, lineHeight: 1.5 }}>
          The Algarve comes alive with festivals year-round. Time your visit to catch one of these.
        </Text>
      </View>

      {/* Calendar entries — first 6 months (Jan-Jun) */}
      {calendarData.slice(0, 6).map((month) => (
        <View key={month.month} style={{ marginBottom: 10 }} wrap={false}>
          {/* Month header */}
          <View style={{
            backgroundColor: colors.primary,
            paddingVertical: 4,
            paddingHorizontal: 10,
            borderRadius: 3,
            marginBottom: 6,
          }}>
            <Text style={{ fontSize: 10, color: colors.white, fontWeight: 'bold', letterSpacing: 1 }}>
              {month.month}
            </Text>
          </View>

          {/* Events */}
          {month.events.map((event, j) => (
            <View key={j} style={{ flexDirection: 'row', marginBottom: 5, paddingLeft: 10 }}>
              <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: colors.accent, marginRight: 8, marginTop: 4 }} />
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 1 }}>
                  <Text style={{ fontSize: 9, color: colors.text, fontWeight: 'bold' }}>
                    {event.name}
                  </Text>
                  <Text style={{ fontSize: 7, color: colors.textMuted, marginLeft: 6 }}>
                    {event.location}
                  </Text>
                </View>
                <Text style={{ fontSize: 8, color: colors.textLight, lineHeight: 1.4 }}>
                  {event.note}
                </Text>
              </View>
            </View>
          ))}
        </View>
      ))}
    </Page>

    <Page size="A4" style={styles.page}>
      {/* Header for page 2 */}
      <View style={{ marginBottom: 18 }}>
        <Text style={{ fontSize: 18, fontFamily: 'Playfair Display', fontWeight: 'bold', color: colors.primary, marginBottom: 6 }}>
          Festivals & Events (continued)
        </Text>
      </View>

      {/* Calendar entries — remaining months (Jul-Dec) */}
      {calendarData.slice(6).map((month) => (
        <View key={month.month} style={{ marginBottom: 10 }} wrap={false}>
          <View style={{
            backgroundColor: colors.primary,
            paddingVertical: 4,
            paddingHorizontal: 10,
            borderRadius: 3,
            marginBottom: 6,
          }}>
            <Text style={{ fontSize: 10, color: colors.white, fontWeight: 'bold', letterSpacing: 1 }}>
              {month.month}
            </Text>
          </View>

          {month.events.map((event, j) => (
            <View key={j} style={{ flexDirection: 'row', marginBottom: 5, paddingLeft: 10 }}>
              <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: colors.accent, marginRight: 8, marginTop: 4 }} />
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 1 }}>
                  <Text style={{ fontSize: 9, color: colors.text, fontWeight: 'bold' }}>
                    {event.name}
                  </Text>
                  <Text style={{ fontSize: 7, color: colors.textMuted, marginLeft: 6 }}>
                    {event.location}
                  </Text>
                </View>
                <Text style={{ fontSize: 8, color: colors.textLight, lineHeight: 1.4 }}>
                  {event.note}
                </Text>
              </View>
            </View>
          ))}
        </View>
      ))}

      {/* Pro tip box */}
      <View style={{
        marginTop: 15,
        padding: 14,
        backgroundColor: colors.backgroundWarm,
        borderRadius: 6,
        borderLeftWidth: 3,
        borderLeftColor: colors.accent,
      }}>
        <Text style={{ fontSize: 8, fontWeight: 'bold', color: colors.accent, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>
          Pro Tip
        </Text>
        <Text style={{ fontSize: 9, color: colors.text, lineHeight: 1.5 }}>
          Festival dates shift slightly each year. Check local tourism websites before booking around a specific event.
          The Silves Medieval Festival and Loulé Carnival are worth planning your entire trip around — they're genuinely extraordinary.
          For Santos Populares (June), every town has its own celebrations — just follow the smell of grilled sardines.
        </Text>
      </View>
    </Page>
  </>
);

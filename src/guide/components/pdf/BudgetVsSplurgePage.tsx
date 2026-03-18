import React from 'react';
import { Page, View, Text } from '@react-pdf/renderer';
import { styles, colors } from '../../utils/pdfStyles';

interface Comparison {
  category: string;
  budget: { option: string; cost: string; note: string };
  splurge: { option: string; cost: string; note: string };
  verdict: string;
}

const comparisons: Comparison[] = [
  {
    category: 'Beach Day',
    budget: {
      option: 'Pack a cooler, park free at Praia da Bordeira',
      cost: '\u20AC5\u201310',
      note: 'Bring sandwiches, fruit, water from the tap. Free parking at west coast beaches.',
    },
    splurge: {
      option: 'Sunbeds at Praia dos Caneiros + beach restaurant lunch',
      cost: '\u20AC60\u201390',
      note: 'Reserved sunbeds, cocktail service, fresh grilled fish lunch with sea views.',
    },
    verdict: 'Both are excellent \u2014 depends on your mood. The Algarve\'s best beaches are free.',
  },
  {
    category: 'Dinner Out',
    budget: {
      option: 'Tasca in Loul\u00E9 or Olh\u00E3o backstreets',
      cost: '\u20AC12\u201318 per person',
      note: 'Prato do dia (daily special) with soup, main, drink, and coffee. Huge portions.',
    },
    splurge: {
      option: 'Vila Joya or Bon Bon (Michelin-starred)',
      cost: '\u20AC80\u2013150 per person',
      note: 'Tasting menus showcasing the Algarve\'s finest ingredients. Book weeks ahead.',
    },
    verdict: 'The \u20AC15 tasca meal is honestly just as satisfying. Splurge once for the experience.',
  },
  {
    category: 'Boat Tour',
    budget: {
      option: 'Olh\u00E3o public ferry to Ilha da Armona',
      cost: '\u20AC3\u20135 return',
      note: 'Same barrier island beaches as \u20AC40 boat tours. Runs every 30 minutes in summer.',
    },
    splurge: {
      option: 'Private sailboat sunset cruise from Lagos',
      cost: '\u20AC200\u2013350 (for 2\u20134 people)',
      note: 'Private boat, drinks included, Ponta da Piedade at golden hour. Unforgettable.',
    },
    verdict: 'The ferry is the smarter move 9/10 times. But that private sunset cruise is special.',
  },
  {
    category: 'Wine Tasting',
    budget: {
      option: 'Buy 3 Algarve wines at a local garrafeira (wine shop)',
      cost: '\u20AC15\u201325 total',
      note: 'Ask the shop owner for recommendations. Quinta dos Vales and Morgado do Quint\u00E3o are excellent.',
    },
    splurge: {
      option: 'Guided vineyard tour with tastings and lunch',
      cost: '\u20AC50\u201380 per person',
      note: 'Visit 2\u20133 wineries, meet the winemakers, taste 8-12 wines paired with local cheeses.',
    },
    verdict: 'The guided tour is worth it once \u2014 you learn the story behind the wines.',
  },
  {
    category: 'Accommodation',
    budget: {
      option: 'Guesthouse in Loul\u00E9 or Olh\u00E3o',
      cost: '\u20AC55\u201390/night',
      note: 'Clean, central, breakfast included. You\'re paying for location, not luxury.',
    },
    splurge: {
      option: 'Converted convent in Tavira or cliff hotel in Carvoeiro',
      cost: '\u20AC150\u2013300/night',
      note: 'Historic buildings, pools, spas, breakfast terraces with views.',
    },
    verdict: 'Base yourself budget, splurge for 1\u20132 special nights. Best of both worlds.',
  },
  {
    category: 'Day Trip Transport',
    budget: {
      option: 'Regional train + local buses',
      cost: '\u20AC5\u201315/day',
      note: 'The Lagos-Faro train line covers the south coast. Buses fill gaps. Slow but scenic.',
    },
    splurge: {
      option: 'Rental car for full freedom',
      cost: '\u20AC20\u201335/day (pre-booked)',
      note: 'Essential for west coast and interior. Book 2-4 weeks ahead for best rates.',
    },
    verdict: 'A rental car transforms the trip. Budget on everything else, splurge on transport.',
  },
  {
    category: 'Coffee & Pastry',
    budget: {
      option: 'Neighbourhood pastelaria',
      cost: '\u20AC2\u20133',
      note: 'Bica (espresso) + pastel de nata at the counter. Standing is cheaper than sitting at some places.',
    },
    splurge: {
      option: 'Boutique caf\u00E9 or hotel terrace',
      cost: '\u20AC8\u201312',
      note: 'Specialty coffee, artisan pastries, sea views. Lagos and Faro have a growing scene.',
    },
    verdict: 'The pastelaria is an essential Portuguese ritual. Splurge cafes are nice but not necessary.',
  },
  {
    category: 'Nightlife & Drinks',
    budget: {
      option: 'Local tasca or esplanada',
      cost: '\u20AC3\u20135 per drink',
      note: 'Imperial (draft beer) or house wine on a terrace. The social hub of every town.',
    },
    splurge: {
      option: 'Rooftop bar or cocktail lounge',
      cost: '\u20AC12\u201315 per drink',
      note: 'Craft cocktails, sunset views, curated playlists. Albufeira and Vilamoura have the best.',
    },
    verdict: 'A \u20AC3 imperial at sunset is hard to beat. Save the cocktail bars for one special night.',
  },
  {
    category: 'Souvenirs',
    budget: {
      option: 'Weekly market ceramics & local products',
      cost: '\u20AC5\u201315',
      note: 'Hand-painted tiles, cork products, local honey, and medronho at outdoor markets.',
    },
    splurge: {
      option: 'Artisan shops & galleries',
      cost: '\u20AC30\u201380',
      note: 'Hand-crafted cataplana pots, original azulejo art, designer cork bags. Unique pieces.',
    },
    verdict: 'Market finds are authentic and affordable. For a statement piece, visit Loul\u00E9\'s artisan shops.',
  },
];

const ComparisonCard: React.FC<{ comparison: Comparison }> = ({ comparison: c }) => (
  <View
    style={{
      marginBottom: 12,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: 'hidden',
    }}
    wrap={false}
  >
    {/* Category header */}
    <View style={{ backgroundColor: colors.primary, paddingVertical: 5, paddingHorizontal: 10 }}>
      <Text style={{ fontSize: 10, color: colors.white, fontWeight: 'bold', letterSpacing: 1 }}>
        {c.category}
      </Text>
    </View>

    {/* Two columns */}
    <View style={{ flexDirection: 'row' }}>
      {/* Budget column */}
      <View style={{ flex: 1, padding: 8, borderRightWidth: 1, borderRightColor: colors.border }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
          <Text style={{ fontSize: 8, color: colors.success, backgroundColor: '#D1FAE5', paddingVertical: 1, paddingHorizontal: 5, borderRadius: 2, fontWeight: 'bold' }}>
            BUDGET
          </Text>
          <Text style={{ fontSize: 9, color: colors.success, fontWeight: 'bold', marginLeft: 6 }}>
            {c.budget.cost}
          </Text>
        </View>
        <Text style={{ fontSize: 8, color: colors.text, fontWeight: 'bold', marginBottom: 2 }}>
          {c.budget.option}
        </Text>
        <Text style={{ fontSize: 7, color: colors.textLight, lineHeight: 1.4 }}>
          {c.budget.note}
        </Text>
      </View>

      {/* Splurge column */}
      <View style={{ flex: 1, padding: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
          <Text style={{ fontSize: 8, color: '#92400E', backgroundColor: '#FEF3C7', paddingVertical: 1, paddingHorizontal: 5, borderRadius: 2, fontWeight: 'bold' }}>
            SPLURGE
          </Text>
          <Text style={{ fontSize: 9, color: '#92400E', fontWeight: 'bold', marginLeft: 6 }}>
            {c.splurge.cost}
          </Text>
        </View>
        <Text style={{ fontSize: 8, color: colors.text, fontWeight: 'bold', marginBottom: 2 }}>
          {c.splurge.option}
        </Text>
        <Text style={{ fontSize: 7, color: colors.textLight, lineHeight: 1.4 }}>
          {c.splurge.note}
        </Text>
      </View>
    </View>

    {/* Verdict */}
    <View style={{ backgroundColor: colors.backgroundWarm, paddingVertical: 4, paddingHorizontal: 10 }}>
      <Text style={{ fontSize: 7, color: colors.text, fontStyle: 'italic', lineHeight: 1.4 }}>
        Our take: {c.verdict}
      </Text>
    </View>
  </View>
);

export const BudgetVsSplurgePage: React.FC = () => (
  <>
    <Page size="A4" style={styles.page} bookmark="budget">
      {/* Header */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 12, color: colors.accent, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 8, fontWeight: 'bold' }}>
          Smart Spending
        </Text>
        <Text style={{ fontSize: 26, fontFamily: 'Playfair Display', fontWeight: 'bold', color: colors.primary, marginBottom: 6 }}>
          Budget vs Splurge
        </Text>
        <Text style={{ fontSize: 10, color: colors.textLight, lineHeight: 1.5 }}>
          Where to save and where to spend — because the best Algarve experiences aren't always the most expensive.
        </Text>
      </View>

      {/* First 5 comparisons */}
      {comparisons.slice(0, 5).map((c, i) => (
        <ComparisonCard key={i} comparison={c} />
      ))}
    </Page>

    <Page size="A4" style={styles.page}>
      {/* Page 2 header */}
      <View style={{ marginBottom: 18 }}>
        <Text style={{ fontSize: 18, fontFamily: 'Playfair Display', fontWeight: 'bold', color: colors.primary, marginBottom: 6 }}>
          Budget vs Splurge (continued)
        </Text>
      </View>

      {/* Remaining comparisons */}
      {comparisons.slice(5).map((c, i) => (
        <ComparisonCard key={i} comparison={c} />
      ))}

      {/* Summary tip */}
      <View style={{
        marginTop: 12,
        padding: 14,
        backgroundColor: colors.backgroundWarm,
        borderRadius: 6,
        borderLeftWidth: 3,
        borderLeftColor: colors.accent,
      }}>
        <Text style={{ fontSize: 8, fontWeight: 'bold', color: colors.accent, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>
          The Bottom Line
        </Text>
        <Text style={{ fontSize: 9, color: colors.text, lineHeight: 1.5 }}>
          The Algarve is one of the best-value destinations in Western Europe. A couple can eat extremely well for
          {' \u20AC'}30-40/day, and most of the best experiences (beaches, cliff walks, sunsets) are completely free.
          Save the splurges for a private boat trip, one Michelin dinner, and a rental car for the west coast.
        </Text>
      </View>
    </Page>
  </>
);

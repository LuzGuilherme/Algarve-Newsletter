import React from 'react';
import { Page, View, Text, Link } from '@react-pdf/renderer';
import { styles, colors } from '../../utils/pdfStyles';

interface TOCSection {
  number: string;
  title: string;
  description: string;
  highlights: string[];
  bookmark: string;
}

const sections: TOCSection[] = [
  {
    number: '01',
    title: 'The Beaches',
    description: 'Hidden coves, family spots, and dramatic wild coasts with GPS coordinates, parking details, and honest personal takes.',
    highlights: ['GPS coords for every beach', 'Access ratings', '"Skip If" warnings'],
    bookmark: '#beaches',
  },
  {
    number: '02',
    title: 'Restaurants Locals Go To',
    description: 'Where to eat, what to order, and what to skip — with hours, closing days, and reservation tips.',
    highlights: ['What to order at each spot', 'Closing days & hours', 'Price ranges'],
    bookmark: '#restaurants',
  },
  {
    number: '03',
    title: 'Town Profiles',
    description: 'Every major town profiled — who it\'s best for, what not to miss, and whether to base yourself there.',
    highlights: ['"Stay If / Skip If" for each', 'Where to eat in each town', 'Day trip potential'],
    bookmark: '#towns',
  },
  {
    number: '04',
    title: 'Where to Stay',
    description: 'Honest accommodation picks for every budget tier — from surfer hostels to converted convents.',
    highlights: ['Budget / Mid-range / Splurge', 'Insider booking tips', 'Neighbourhood context'],
    bookmark: '#accommodation',
  },
  {
    number: '05',
    title: 'Tourist Traps to Avoid',
    description: 'The mistakes tourists make and the better alternatives we recommend instead. This section alone could save you hundreds.',
    highlights: ['Money-saving warnings', 'Better alternatives', 'Behaviour tips'],
    bookmark: '#traps',
  },
  {
    number: '06',
    title: 'Timing Hacks',
    description: 'Month-by-month guide to weather, crowds, and seasonal secrets — know exactly when to go where.',
    highlights: ['12-month breakdown', 'Crowd levels', 'Seasonal secrets'],
    bookmark: '#timing',
  },
  {
    number: '07',
    title: 'Activities & Experiences',
    description: 'Water sports, food tours, cultural experiences, and adventures — with booking links and insider tips.',
    highlights: ['Direct booking links', 'Price comparisons', 'Best operators named'],
    bookmark: '#activities',
  },
  {
    number: '08',
    title: 'Practical Essentials',
    description: 'Transport, money, language, safety, and apps — everything you need to navigate the Algarve like a local.',
    highlights: ['Essential Portuguese phrases', 'Must-have apps', 'Money & tipping'],
    bookmark: '#essentials',
  },
  {
    number: '09',
    title: 'Day Trips & Itineraries',
    description: 'Complete stop-by-stop routes for the best day trips, plus ready-to-follow 3, 5, and 7-day itineraries.',
    highlights: ['Stop-by-stop routes', '3/5/7-day plans', 'Budget estimates'],
    bookmark: '#daytrips',
  },
  {
    number: '+',
    title: 'Bonus Sections',
    description: 'Budget vs Splurge comparisons, seasonal events calendar, food glossary, packing list, and more.',
    highlights: ['Events calendar', 'Budget comparisons', 'Portuguese food glossary'],
    bookmark: '#budget',
  },
];

export const TableOfContents: React.FC = () => (
  <Page size="A4" style={styles.page}>
    {/* Header */}
    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontSize: 12, color: colors.accent, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 8, fontWeight: 'bold' }}>
        Contents
      </Text>
      <Text style={{ fontSize: 28, fontFamily: 'Playfair Display', fontWeight: 'bold', color: colors.primary, marginBottom: 6 }}>
        What's Inside This Guide
      </Text>
      <Text style={{ fontSize: 11, color: colors.textLight, lineHeight: 1.5 }}>
        Click any section to jump directly to it. Every section is packed with insider knowledge you won't find in any other guide.
      </Text>
    </View>

    {/* TOC entries */}
    {sections.map((section) => (
      <Link key={section.number} src={section.bookmark} style={{ textDecoration: 'none' }}>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 10,
            paddingBottom: 10,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
          }}
          wrap={false}
        >
          {/* Section number */}
          <View style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: section.number === '+' ? colors.accent : colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 12,
            marginTop: 2,
          }}>
            <Text style={{ fontSize: 11, color: colors.white, fontWeight: 'bold' }}>
              {section.number}
            </Text>
          </View>

          {/* Content */}
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 3 }}>
              <Text style={{ fontSize: 13, fontFamily: 'Playfair Display', fontWeight: 'bold', color: colors.primary }}>
                {section.title}
              </Text>
              {/* Arrow indicator for clickability */}
              <Text style={{ fontSize: 10, color: colors.accent, marginLeft: 6 }}>
                {'\u2192'}
              </Text>
            </View>
            <Text style={{ fontSize: 9, color: colors.textLight, lineHeight: 1.4, marginBottom: 5 }}>
              {section.description}
            </Text>

            {/* Highlight chips */}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {section.highlights.map((h, i) => (
                <Text key={i} style={{
                  fontSize: 7,
                  color: colors.secondary,
                  backgroundColor: '#E0F7F8',
                  paddingVertical: 2,
                  paddingHorizontal: 6,
                  borderRadius: 3,
                  marginRight: 4,
                  marginBottom: 2,
                }}>
                  {h}
                </Text>
              ))}
            </View>
          </View>
        </View>
      </Link>
    ))}
  </Page>
);

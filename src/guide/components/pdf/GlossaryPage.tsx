import React from 'react';
import { Page, View, Text } from '@react-pdf/renderer';
import { styles, colors } from '../../utils/pdfStyles';
import { PDFHeader, PDFFooter } from './shared';

interface GlossaryTerm {
  portuguese: string;
  pronunciation: string;
  english: string;
}

const FOOD_TERMS: GlossaryTerm[] = [
  { portuguese: 'Cataplana', pronunciation: 'kah-tah-PLAH-nah', english: 'Copper clam-pot stew — the Algarve\'s signature dish.' },
  { portuguese: 'Percebes', pronunciation: 'per-SEH-besh', english: 'Goose barnacles. Expensive, weird-looking, addictive.' },
  { portuguese: 'Amêijoas à Bulhão Pato', pronunciation: 'ah-MAY-zhoh-ash', english: 'Clams in garlic, coriander, and white wine.' },
  { portuguese: 'Bifana', pronunciation: 'bee-FAH-nah', english: 'Marinated pork sandwich. Street food king. \u20AC3-4.' },
  { portuguese: 'Prego', pronunciation: 'PREH-goo', english: 'Steak sandwich in a crusty roll.' },
  { portuguese: 'Frango piri-piri', pronunciation: 'FRAHN-goo pee-ree PEE-ree', english: 'Charcoal-grilled spicy chicken. Guia is the capital.' },
  { portuguese: 'Polvo à lagareiro', pronunciation: 'POLE-voo', english: 'Octopus roasted with olive oil, garlic, potatoes.' },
  { portuguese: 'Arroz de marisco', pronunciation: 'ah-ROHZ deh mah-REESH-koo', english: 'Wet seafood rice. Paella\'s soupier cousin.' },
  { portuguese: 'Sardinhas assadas', pronunciation: 'sar-DEEN-yash', english: 'Charcoal-grilled sardines. Best June-September.' },
  { portuguese: 'Xerém', pronunciation: 'sheh-REM', english: 'Cornmeal porridge with clams. Nearly extinct.' },
  { portuguese: 'Conquilhas', pronunciation: 'kon-KEEL-yash', english: 'Tiny wedge clams. Ria Formosa delicacy.' },
  { portuguese: 'Petiscos', pronunciation: 'peh-TEESH-koosh', english: 'Portuguese tapas. Small sharing plates.' },
  { portuguese: 'Couvert', pronunciation: 'koo-VEHR', english: 'Bread, olives brought unasked. NOT free.' },
  { portuguese: 'Prato do dia', pronunciation: 'PRAH-too doo DEE-ah', english: 'Daily special. Best value and freshest.' },
  { portuguese: 'Dom Rodrigo', pronunciation: 'dom hoh-DREE-goo', english: 'Egg-and-almond sweet. Convent recipe.' },
  { portuguese: 'Açorda', pronunciation: 'ah-SOR-dah', english: 'Bread soup with garlic, coriander, poached egg.' },
  { portuguese: 'Caldeirada', pronunciation: 'kal-day-RAH-dah', english: 'Fish and potato stew. Every family\'s recipe.' },
  { portuguese: 'Tosta mista', pronunciation: 'TOSH-tah MEESH-tah', english: 'Ham and cheese toastie. Universal snack.' },
  { portuguese: 'Pastel de nata', pronunciation: 'pash-TEL deh NAH-tah', english: 'Custard tart. Flaky, caramelised. Order warm.' },
  { portuguese: 'Francesinha', pronunciation: 'fran-seh-ZEEN-yah', english: 'Porto\'s meat tower in beer sauce.' },
  { portuguese: 'Chouriço', pronunciation: 'sho-REE-soo', english: 'Smoked sausage. Often flambéed tableside.' },
  { portuguese: 'Queijo da Serra', pronunciation: 'KAY-zhoo dah SEH-rah', english: 'Creamy mountain cheese. Eat with a spoon.' },
  { portuguese: 'Caracóis', pronunciation: 'kah-rah-KOYSH', english: 'Snails in garlic broth. Summer bar snack.' },
];

const DRINK_TERMS: GlossaryTerm[] = [
  { portuguese: 'Bica / Café', pronunciation: 'BEE-kah', english: 'Espresso. The default coffee order. Strong and small.' },
  { portuguese: 'Galão', pronunciation: 'gah-LAOW', english: 'Milky coffee in a tall glass. Portugal\'s latte.' },
  { portuguese: 'Meia de leite', pronunciation: 'MAY-ah deh LAY-teh', english: 'Half coffee, half milk. In a cup, not a glass.' },
  { portuguese: 'Imperial / Fino', pronunciation: 'eem-peh-ree-AHL / FEE-noo', english: 'Draft beer. "Imperial" in the south, "fino" in the north.' },
  { portuguese: 'Medronho', pronunciation: 'meh-DRON-yoo', english: 'Arbutus berry firewater. Monchique\'s liquid fire. Sip slowly.' },
  { portuguese: 'Vinho da casa', pronunciation: 'VEEN-yoo dah KAH-zah', english: 'House wine. Almost always drinkable and incredibly cheap.' },
  { portuguese: 'Ginjinha', pronunciation: 'zheen-ZHEEN-yah', english: 'Sour cherry liqueur. Sweet, strong, traditional.' },
  { portuguese: 'Aguardente', pronunciation: 'ah-gwah-DEN-teh', english: 'Brandy/firewater. Generic term for strong spirits.' },
  { portuguese: 'Sumo natural', pronunciation: 'SOO-moo nah-too-RAHL', english: 'Fresh-squeezed juice. Orange is the default — \u20AC2 at most cafes.' },
  { portuguese: 'Mazagran', pronunciation: 'mah-zah-GRAHN', english: 'Iced espresso with lemon. Refreshing summer coffee.' },
  { portuguese: 'Cerveja artesanal', pronunciation: 'ser-VAY-zhah ar-teh-zah-NAHL', english: 'Craft beer. Growing scene in Lagos and Faro.' },
];

const CULTURE_TERMS: GlossaryTerm[] = [
  { portuguese: 'Feira', pronunciation: 'FAY-rah', english: 'Market or fair. Weekly open-air markets.' },
  { portuguese: 'Mercado', pronunciation: 'mer-KAH-doo', english: 'Indoor market. Fish, meat, fruit, flowers.' },
  { portuguese: 'Azulejos', pronunciation: 'ah-zoo-LAY-zhosh', english: 'Painted ceramic tiles. Portugal\'s signature art.' },
  { portuguese: 'Fado', pronunciation: 'FAH-doo', english: 'Portuguese soul music. Best heard live.' },
  { portuguese: 'Saudade', pronunciation: 'sow-DAH-deh', english: 'Untranslatable longing. Portuguese identity.' },
  { portuguese: 'Tasca', pronunciation: 'TASH-kah', english: 'Humble neighbourhood restaurant. Huge portions.' },
  { portuguese: 'Churrasqueira', pronunciation: 'shoo-rash-KAY-rah', english: 'Charcoal grill restaurant for meat.' },
  { portuguese: 'Marisqueira', pronunciation: 'mah-reesh-KAY-rah', english: 'Seafood restaurant with live shellfish.' },
];

const MENU_TERMS: GlossaryTerm[] = [
  { portuguese: 'Grelhado', pronunciation: 'greh-LYAH-doo', english: 'Grilled. The default for fresh fish.' },
  { portuguese: 'Assado', pronunciation: 'ah-SAH-doo', english: 'Roasted. Often in a wood-fired oven.' },
  { portuguese: 'Frito', pronunciation: 'FREE-too', english: 'Fried. "Camarões fritos" = fried prawns.' },
  { portuguese: 'Cozido', pronunciation: 'koo-ZEE-doo', english: 'Boiled/stewed. Massive meat boil-up.' },
  { portuguese: 'Estufado', pronunciation: 'esh-too-FAH-doo', english: 'Braised slowly. Rich, in a clay pot.' },
  { portuguese: 'Na brasa', pronunciation: 'nah BRAH-zah', english: 'Over charcoal. The gold standard.' },
  { portuguese: 'À Algarvia', pronunciation: 'ah al-GAR-vee-ah', english: 'Algarve-style: tomato, onion, coriander.' },
];

// Compact term rendering for 2-column layout
const CompactTerm: React.FC<{ term: GlossaryTerm; showBorder?: boolean }> = ({ term, showBorder = true }) => (
  <View style={{ marginBottom: 5, paddingBottom: 5, borderBottomWidth: showBorder ? 1 : 0, borderBottomColor: colors.border }}>
    <View style={{ flexDirection: 'row', alignItems: 'baseline', marginBottom: 1 }}>
      <Text style={{ fontSize: 9, fontWeight: 'bold', color: colors.primary }}>{term.portuguese}</Text>
      <Text style={{ fontSize: 6.5, fontStyle: 'italic', color: colors.textMuted, marginLeft: 4 }}>{term.pronunciation}</Text>
    </View>
    <Text style={{ fontSize: 7.5, color: colors.textLight, lineHeight: 1.3 }}>{term.english}</Text>
  </View>
);

// Standard single-column term rendering
const TermEntry: React.FC<{ term: GlossaryTerm; showBorder?: boolean }> = ({ term, showBorder = true }) => (
  <View style={{ marginBottom: 7, paddingBottom: 7, borderBottomWidth: showBorder ? 1 : 0, borderBottomColor: colors.border }} wrap={false}>
    <View style={{ flexDirection: 'row', alignItems: 'baseline', marginBottom: 2 }}>
      <Text style={{ fontSize: 10, fontWeight: 'bold', color: colors.primary }}>{term.portuguese}</Text>
      <Text style={{ fontSize: 7.5, fontStyle: 'italic', color: colors.textMuted, marginLeft: 6 }}>{term.pronunciation}</Text>
    </View>
    <Text style={{ fontSize: 8.5, color: colors.textLight, lineHeight: 1.4 }}>{term.english}</Text>
  </View>
);

const SectionHeader: React.FC<{ title: string; color?: string }> = ({ title, color }) => (
  <View style={{ marginTop: 14, marginBottom: 10, paddingBottom: 6, borderBottomWidth: 2, borderBottomColor: color || colors.accent }}>
    <Text style={{ fontSize: 14, fontFamily: 'Playfair Display', fontWeight: 'bold', color: color || colors.secondary }}>
      {title}
    </Text>
  </View>
);

export const GlossaryPage: React.FC = () => {
  const leftFoodTerms = FOOD_TERMS.slice(0, 12);
  const rightFoodTerms = FOOD_TERMS.slice(12);

  return (
    <>
      {/* Page 1: Food terms in 2 columns */}
      <Page size="A4" style={styles.page} bookmark="glossary">
        <PDFHeader sectionName="Food Glossary" />
        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 12, color: colors.accent, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 8, fontWeight: 'bold' }}>
            Reference
          </Text>
          <Text style={{ fontSize: 24, fontFamily: 'Playfair Display', fontWeight: 'bold', color: colors.primary, marginBottom: 6 }}>
            Portuguese Food Glossary
          </Text>
          <Text style={{ fontSize: 10, color: colors.textLight, lineHeight: 1.5 }}>
            The essential terms for navigating any Algarve menu with confidence.
          </Text>
        </View>

        <SectionHeader title="Food" color={colors.secondary} />

        {/* 2-column layout for food terms */}
        <View style={{ flexDirection: 'row', gap: 14 }}>
          <View style={{ flex: 1 }}>
            {leftFoodTerms.map((term, i) => (
              <CompactTerm key={i} term={term} showBorder={i < leftFoodTerms.length - 1} />
            ))}
          </View>
          <View style={{ width: 1, backgroundColor: colors.border }} />
          <View style={{ flex: 1 }}>
            {rightFoodTerms.map((term, i) => (
              <CompactTerm key={i} term={term} showBorder={i < rightFoodTerms.length - 1} />
            ))}
          </View>
        </View>
        <PDFFooter />
      </Page>

      {/* Page 2: Drinks + Culture */}
      <Page size="A4" style={styles.page}>
        <PDFHeader sectionName="Food Glossary" />

        <SectionHeader title="Drinks" color="#0369A1" />
        {DRINK_TERMS.map((term, i) => (
          <TermEntry key={i} term={term} showBorder={i < DRINK_TERMS.length - 1} />
        ))}

        <SectionHeader title="Market & Culture" color="#7C3AED" />
        {CULTURE_TERMS.map((term, i) => (
          <TermEntry key={i} term={term} showBorder={i < CULTURE_TERMS.length - 1} />
        ))}
        <PDFFooter />
      </Page>

      {/* Page 3: Menu Decoder + Tips */}
      <Page size="A4" style={styles.page}>
        <PDFHeader sectionName="Food Glossary" />

        <SectionHeader title="Menu Decoder" color="#92400E" />
        <Text style={{ fontSize: 9, color: colors.textLight, lineHeight: 1.5, marginBottom: 12 }}>
          The cooking terms you'll see on every menu. Know these and you'll never order blind.
        </Text>

        {/* Menu terms in 2 columns */}
        <View style={{ flexDirection: 'row', gap: 14, marginBottom: 20 }}>
          <View style={{ flex: 1 }}>
            {MENU_TERMS.slice(0, 4).map((term, i) => (
              <CompactTerm key={i} term={term} showBorder={i < 3} />
            ))}
          </View>
          <View style={{ width: 1, backgroundColor: colors.border }} />
          <View style={{ flex: 1 }}>
            {MENU_TERMS.slice(4).map((term, i) => (
              <CompactTerm key={i} term={term} showBorder={i < MENU_TERMS.slice(4).length - 1} />
            ))}
          </View>
        </View>

        <View style={{ ...styles.tipBox, marginTop: 10 }}>
          <Text style={styles.tipLabel}>Menu Survival Tips</Text>
          <Text style={styles.tipText}>{"• \"Dose\" = full portion · \"Meia dose\" = half portion (often enough for one)"}</Text>
          <Text style={styles.tipText}>{"• Fish is priced per kilo on many menus — ask \"quanto custa?\" before ordering"}</Text>
          <Text style={styles.tipText}>{"• \"É fresco?\" (\"Is it fresh?\") — locals ask this, and restaurants answer honestly"}</Text>
          <Text style={styles.tipText}>{"• Couvert (bread, olives, etc.) is charged extra — wave it away if you don't want it"}</Text>
        </View>
        <PDFFooter />
      </Page>
    </>
  );
};

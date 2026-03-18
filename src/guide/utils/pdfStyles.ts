import { StyleSheet } from '@react-pdf/renderer';

// Custom fonts: Playfair Display (headings) + Source Sans 3 (body)
// Registered in AlgarveGuide.tsx via Font.register()

// Color palette matching the Algarve Newsletter brand
export const colors = {
  primary: '#004E55',
  secondary: '#006D77',
  accent: '#F59E0B',
  white: '#FFFFFF',
  text: '#1E293B',
  textLight: '#64748B',
  textMuted: '#94A3B8',
  background: '#FFFFFF',
  backgroundAlt: '#F8FAFC',
  backgroundWarm: '#FFFBEB',
  border: '#E2E8F0',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  // Semantic colors for skip/warning boxes
  skipBg: '#FEE2E2',
  skipLabel: '#991B1B',
  skipText: '#7F1D1D',
  successBg: '#D1FAE5',
  successText: '#065F46',
};

export const styles = StyleSheet.create({
  // ============ PAGE LAYOUT ============
  page: {
    paddingTop: 70,
    paddingBottom: 60,
    paddingHorizontal: 45,
    fontFamily: 'Source Sans 3',
    fontSize: 10,
    color: colors.text,
    backgroundColor: colors.background,
  },

  coverPage: {
    padding: 0,
    fontFamily: 'Source Sans 3',
    backgroundColor: colors.primary,
  },

  // ============ HEADER ============
  header: {
    position: 'absolute',
    top: 25,
    left: 45,
    right: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  headerSection: {
    fontSize: 8,
    color: colors.textLight,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  headerTitle: {
    fontSize: 8,
    color: colors.primary,
    fontWeight: 'bold',
  },

  // ============ FOOTER ============
  footer: {
    position: 'absolute',
    bottom: 25,
    left: 45,
    right: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  footerText: {
    fontSize: 8,
    color: colors.textMuted,
  },

  pageNumber: {
    fontSize: 9,
    color: colors.textLight,
  },

  // ============ SECTION TITLES ============
  sectionTitleContainer: {
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 3,
    borderBottomColor: colors.primary,
  },

  sectionNumber: {
    fontSize: 12,
    color: colors.accent,
    fontWeight: 'bold',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },

  sectionTitle: {
    fontSize: 32,
    fontFamily: 'Playfair Display',
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
  },

  sectionSubtitle: {
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 1.5,
  },

  // ============ CATEGORY HEADERS ============
  categoryTitle: {
    fontSize: 18,
    fontFamily: 'Playfair Display',
    fontWeight: 'bold',
    color: colors.secondary,
    marginTop: 25,
    marginBottom: 15,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: colors.accent,
  },

  // ============ CARDS ============
  card: {
    marginBottom: 18,
    padding: 14,
    backgroundColor: colors.backgroundAlt,
    borderRadius: 6,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },

  cardName: {
    fontSize: 14,
    fontFamily: 'Playfair Display',
    fontWeight: 'bold',
    color: colors.primary,
    flex: 1,
  },

  cardBadge: {
    fontSize: 8,
    color: colors.background,
    backgroundColor: colors.accent,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 3,
  },

  cardVibe: {
    fontSize: 11,
    fontStyle: 'italic',
    color: colors.textLight,
    marginBottom: 10,
    lineHeight: 1.4,
  },

  // ============ DETAIL ROWS ============
  detailsContainer: {
    marginTop: 8,
  },

  detailRow: {
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'flex-start',
  },

  detailLabel: {
    width: 85,
    fontSize: 9,
    fontWeight: 'bold',
    color: colors.text,
  },

  detailValue: {
    flex: 1,
    fontSize: 9,
    color: colors.textLight,
    lineHeight: 1.4,
  },

  // ============ TIP BOXES ============
  tipBox: {
    marginTop: 10,
    padding: 10,
    backgroundColor: colors.backgroundWarm,
    borderRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
  },

  tipLabel: {
    fontSize: 8,
    fontWeight: 'bold',
    color: colors.accent,
    marginBottom: 3,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  tipText: {
    fontSize: 9,
    color: colors.text,
    lineHeight: 1.5,
  },

  // ============ SKIP/WARNING BOXES ============
  skipBox: {
    marginTop: 8,
    padding: 8,
    backgroundColor: colors.skipBg,
    borderRadius: 4,
  },

  skipLabel: {
    fontSize: 8,
    fontWeight: 'bold',
    color: colors.skipLabel,
    marginBottom: 2,
  },

  skipText: {
    fontSize: 9,
    color: colors.skipText,
    lineHeight: 1.4,
  },

  // ============ SUCCESS/GOOD BOXES ============
  successBox: {
    marginTop: 8,
    padding: 8,
    backgroundColor: colors.successBg,
    borderRadius: 4,
  },

  successText: {
    fontSize: 9,
    color: colors.successText,
    lineHeight: 1.4,
  },

  // ============ IMAGES ============
  image: {
    width: '100%',
    height: 140,
    objectFit: 'cover',
    borderRadius: 4,
    marginBottom: 10,
  },

  imageSmall: {
    width: 100,
    height: 70,
    objectFit: 'cover',
    borderRadius: 4,
  },

  // ============ LISTS ============
  list: {
    marginTop: 8,
  },

  listItem: {
    flexDirection: 'row',
    marginBottom: 4,
  },

  listBullet: {
    width: 15,
    fontSize: 9,
    color: colors.accent,
  },

  listText: {
    flex: 1,
    fontSize: 9,
    color: colors.textLight,
    lineHeight: 1.4,
  },

  // ============ TABLES ============
  table: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
  },

  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  tableRowLast: {
    flexDirection: 'row',
  },

  tableHeader: {
    backgroundColor: colors.primary,
  },

  tableHeaderCell: {
    flex: 1,
    padding: 8,
    fontSize: 9,
    fontWeight: 'bold',
    color: colors.background,
  },

  tableCell: {
    flex: 1,
    padding: 8,
    fontSize: 8,
    color: colors.text,
  },

  tableCellAlt: {
    flex: 1,
    padding: 8,
    fontSize: 8,
    color: colors.text,
    backgroundColor: colors.backgroundAlt,
  },

  // ============ RESTAURANT CATEGORY BADGES ============
  categoryBadge: {
    fontSize: 7,
    fontWeight: 'bold',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 3,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  townBadge: {
    fontSize: 7,
    color: colors.textLight,
    backgroundColor: colors.border,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 3,
    marginLeft: 6,
  },

  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  reservationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 5,
    marginTop: 2,
  },

  // ============ GPS COORDINATES ============
  gps: {
    fontSize: 8,
    color: colors.textMuted,
    fontFamily: 'Courier',
  },

  // ============ PRICE INDICATORS ============
  price: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.success,
  },

  // ============ INTRO TEXT ============
  introText: {
    fontSize: 11,
    color: colors.text,
    lineHeight: 1.6,
    marginBottom: 20,
  },

  // ============ DIVIDERS ============
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 15,
  },

  // ============ TWO COLUMN LAYOUT ============
  twoColumn: {
    flexDirection: 'row',
    gap: 15,
  },

  column: {
    flex: 1,
  },

  // ============ COVER PAGE SPECIFIC ============
  coverContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
  },

  coverTitle: {
    fontSize: 52,
    fontFamily: 'Playfair Display',
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 4,
    letterSpacing: 1,
  },

  coverSubtitle: {
    fontSize: 16,
    color: colors.white,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 1.5,
    opacity: 0.9,
  },

  coverTagline: {
    fontSize: 13,
    color: colors.accent,
    textAlign: 'center',
    fontStyle: 'italic',
    letterSpacing: 0.5,
  },
});

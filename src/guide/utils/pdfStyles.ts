import { StyleSheet, Font } from '@react-pdf/renderer';

// Register fonts (using system fonts that work cross-platform)
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'Helvetica' },
    { src: 'Helvetica-Bold', fontWeight: 'bold' },
    { src: 'Helvetica-Oblique', fontStyle: 'italic' },
  ],
});

// Color palette matching the Algarve Newsletter brand
export const colors = {
  primary: '#004E55',
  secondary: '#006D77',
  accent: '#F59E0B',
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
};

export const styles = StyleSheet.create({
  // ============ PAGE LAYOUT ============
  page: {
    paddingTop: 70,
    paddingBottom: 60,
    paddingHorizontal: 45,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: colors.text,
    backgroundColor: colors.background,
  },

  coverPage: {
    padding: 0,
    fontFamily: 'Helvetica',
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
    backgroundColor: '#FEE2E2',
    borderRadius: 4,
  },

  skipLabel: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#991B1B',
    marginBottom: 2,
  },

  skipText: {
    fontSize: 9,
    color: '#7F1D1D',
    lineHeight: 1.4,
  },

  // ============ SUCCESS/GOOD BOXES ============
  successBox: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#D1FAE5',
    borderRadius: 4,
  },

  successText: {
    fontSize: 9,
    color: '#065F46',
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
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.background,
    textAlign: 'center',
    marginBottom: 10,
  },

  coverSubtitle: {
    fontSize: 18,
    color: colors.backgroundAlt,
    textAlign: 'center',
    marginBottom: 40,
  },

  coverTagline: {
    fontSize: 14,
    color: colors.accent,
    textAlign: 'center',
    fontStyle: 'italic',
  },

  coverAuthor: {
    position: 'absolute',
    bottom: 50,
    fontSize: 12,
    color: colors.backgroundAlt,
  },

  coverVersion: {
    position: 'absolute',
    bottom: 30,
    fontSize: 10,
    color: colors.textMuted,
  },
});

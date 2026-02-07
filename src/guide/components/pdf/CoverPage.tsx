import React from 'react';
import { Page, View, Text } from '@react-pdf/renderer';
import { styles, colors } from '../../utils/pdfStyles';
import type { GuideConfig } from '../../types/guide';

interface CoverPageProps {
  config: GuideConfig;
}

export const CoverPage: React.FC<CoverPageProps> = ({ config }) => (
  <>
    {/* Cover Page */}
    <Page size="A4" style={styles.coverPage}>
      <View style={styles.coverContainer}>
        <Text style={styles.coverTitle}>The Algarve</Text>
        <Text style={styles.coverTitle}>Secret Guide</Text>
        <Text style={styles.coverSubtitle}>
          The places tourists miss and locals actually go
        </Text>
        <Text style={styles.coverTagline}>
          "Curated by someone who lives here"
        </Text>
        <Text style={styles.coverAuthor}>By {config.author.name}</Text>
        <Text style={styles.coverVersion}>
          Version {config.version} | Updated {config.lastUpdated}
        </Text>
      </View>
    </Page>

    {/* About & How to Use Page */}
    <Page size="A4" style={styles.page}>
      <View style={{ marginBottom: 30 }}>
        <Text style={{ ...styles.sectionTitle, fontSize: 24 }}>About This Guide</Text>
        <Text style={styles.introText}>{config.author.bio}</Text>
      </View>

      <View style={{ marginBottom: 30 }}>
        <Text style={{ ...styles.sectionTitle, fontSize: 24 }}>How to Use This Guide</Text>
        {config.howToUse.map((tip, index) => (
          <View key={index} style={styles.listItem}>
            <Text style={styles.listBullet}>•</Text>
            <Text style={styles.listText}>{tip}</Text>
          </View>
        ))}
      </View>

      <View style={styles.tipBox}>
        <Text style={styles.tipLabel}>A Note From Me</Text>
        <Text style={styles.tipText}>
          This isn't a comprehensive travel guide — it's my personal cheat sheet.
          Every place here earned its spot because I've been there, loved it,
          and think you will too. I've left out the tourist traps and the "must-sees"
          that aren't actually that great. What's left is the real Algarve.
        </Text>
      </View>
    </Page>
  </>
);

import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { findeBereichById, findeUebungById } from '../../data/uebungen';
import { useTheme } from '../../context/ThemeContext';
import { useFavoriten } from '../../context/FavoritenContext';
import { useVersion } from '../../context/VersionContext';

const SCHWIERIGKEIT_LABEL = ['', 'Leicht', 'Mittel', 'Anspruchsvoll'];
const SCHWIERIGKEIT_FARBE = ['', '#27AE60', '#E8832A', '#E74C3C'];

export default function UebungDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { resolved } = useTheme();
  const dark = resolved === 'dark';

  const { top } = useSafeAreaInsets();
  const { istFavorit, toggleFavorit } = useFavoriten();
  const { istUebungFrei } = useVersion();
  const uebung = findeUebungById(id ?? '');
  const bereich = uebung ? findeBereichById(uebung.bereichId) : undefined;

  const bg = dark ? '#1C1C1E' : '#F2F2F7';
  const cardBg = dark ? '#2C2C2E' : '#FFFFFF';
  const textPrimary = dark ? '#FFFFFF' : '#1A1A1E';
  const textSecondary = dark ? '#AEAEB2' : '#3A3A3C';
  const separator = dark ? '#3A3A3C' : '#E5E5EA';

  if (!uebung || !bereich) {
    return (
      <View style={[styles.notFound, { backgroundColor: bg }]}>
        <Text style={[styles.notFoundText, { color: textSecondary }]}>Übung nicht gefunden.</Text>
        <TouchableOpacity onPress={() => router.canGoBack() ? router.back() : router.replace('/(tabs)/uebungen')}>
          <Text style={styles.backLink}>← Zurück</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const schwFarbe = SCHWIERIGKEIT_FARBE[uebung.schwierigkeit];
  const schwLabel = SCHWIERIGKEIT_LABEL[uebung.schwierigkeit];

  if (!istUebungFrei(uebung.id)) {
    router.replace({ pathname: '/paywall', params: { titel: uebung.titel, farbe: bereich.farbe } });
    return null;
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: bg }]} contentContainerStyle={[styles.content, { paddingTop: top + 12 }]}>
      <Image source={require('../../assets/logo-lockup-dark-bg.png')} style={styles.logo} resizeMode="contain" />
      <View style={styles.topRow}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace('/(tabs)/uebungen');
            }
          }}
        >
          <Text style={[styles.backText, { color: bereich.farbe }]}>← {bereich.titel}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleFavorit(uebung.id)} hitSlop={8}>
          <Ionicons
            name={istFavorit(uebung.id) ? 'heart' : 'heart-outline'}
            size={26}
            color={istFavorit(uebung.id) ? '#E74C3C' : (dark ? '#AEAEB2' : '#8E8E93')}
          />
        </TouchableOpacity>
      </View>

      <View style={[styles.headerCard, { backgroundColor: cardBg, borderLeftColor: bereich.farbe }]}>
        <Text style={[styles.titel, { color: textPrimary }]}>{uebung.titel}</Text>
        <View style={styles.metaRow}>
          <View style={[styles.badge, { backgroundColor: schwFarbe + '22', borderColor: schwFarbe }]}>
            <Text style={[styles.badgeText, { color: schwFarbe }]}>{schwLabel}</Text>
          </View>
          {uebung.hilfsmittel !== 'Keine' && (
            <View style={[styles.badge, { backgroundColor: dark ? '#3A3A3C' : '#F0F0F5', borderColor: 'transparent' }]}>
              <Text style={[styles.badgeText, { color: textSecondary }]}>🎯 {uebung.hilfsmittel}</Text>
            </View>
          )}
        </View>
      </View>

      <Section titel="Ausgangsposition" dark={dark} cardBg={cardBg} textPrimary={textPrimary} textSecondary={textSecondary}>
        <Text style={[styles.bodyText, { color: textSecondary }]}>{uebung.ausgangsposition}</Text>
      </Section>

      <Section titel="Ausführung" dark={dark} cardBg={cardBg} textPrimary={textPrimary} textSecondary={textSecondary}>
        <Text style={[styles.bodyText, { color: textSecondary }]}>{uebung.ausfuehrung}</Text>
      </Section>

      <Section titel="Wiederholungen" dark={dark} cardBg={cardBg} textPrimary={textPrimary} textSecondary={textSecondary}>
        <Text style={[styles.bodyText, { color: bereich.farbe, fontWeight: '600' }]}>{uebung.wiederholungen}</Text>
      </Section>

      <Section titel="Wirkung" dark={dark} cardBg={cardBg} textPrimary={textPrimary} textSecondary={textSecondary}>
        <Text style={[styles.bodyText, { color: textSecondary }]}>{uebung.wirkung}</Text>
      </Section>

      <Section titel="Hinweise & Kontraindikationen" dark={dark} cardBg={cardBg} textPrimary={textPrimary} textSecondary={textSecondary}>
        {uebung.hinweise.map((h, i) => (
          <View key={i} style={[styles.hinweisZeile, i < uebung.hinweise.length - 1 && { borderBottomWidth: 0.5, borderBottomColor: separator }]}>
            <Text style={[styles.hinweisIcon, { color: '#E8A000' }]}>⚠</Text>
            <Text style={[styles.hinweisText, { color: textSecondary }]}>{h}</Text>
          </View>
        ))}
      </Section>

      <View style={[styles.disclaimer, { backgroundColor: dark ? '#0F2A3A' : '#E8F4FD' }]}>
        <Text style={[styles.disclaimerText, { color: dark ? '#7AB8D4' : '#1A5276' }]}>
          Diese Übung ersetzt keine ärztliche oder therapeutische Beratung. Bei Beschwerden bitte Rücksprache mit Ihrem Therapeuten halten.
        </Text>
      </View>
    </ScrollView>
  );
}

function Section({
  titel, children, dark, cardBg, textPrimary, textSecondary,
}: {
  titel: string;
  children: React.ReactNode;
  dark: boolean;
  cardBg: string;
  textPrimary: string;
  textSecondary: string;
}) {
  return (
    <View style={[styles.section, { backgroundColor: cardBg }]}>
      <Text style={[styles.sectionTitel, { color: textPrimary }]}>{titel}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 48 },
  logo: { height: 36, width: 180, marginBottom: 8 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  backButton: { flex: 1 },
  backText: { fontSize: 15, fontWeight: '600' },
  headerCard: {
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 5,
    marginBottom: 10,
  },
  titel: { fontSize: 22, fontWeight: '800', lineHeight: 30, marginBottom: 10 },
  metaRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
  },
  badgeText: { fontSize: 12, fontWeight: '600' },
  section: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  sectionTitel: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  bodyText: { fontSize: 15, lineHeight: 23 },
  hinweisZeile: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 8,
    alignItems: 'flex-start',
  },
  hinweisIcon: { fontSize: 14, marginTop: 2 },
  hinweisText: { flex: 1, fontSize: 14, lineHeight: 21 },
  disclaimer: {
    borderRadius: 8,
    padding: 12,
    marginTop: 6,
  },
  disclaimerText: { fontSize: 12, lineHeight: 18 },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  notFoundText: { fontSize: 16 },
  backLink: { fontSize: 15, color: '#1A6FA8', fontWeight: '600' },
});

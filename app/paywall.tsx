import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '../context/ThemeContext';

export default function PaywallScreen() {
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const { resolved } = useTheme();
  const dark = resolved === 'dark';

  const { titel, farbe } = useLocalSearchParams<{ titel?: string; farbe?: string }>();
  const akzent = farbe ?? '#1A6FA8';

  const bg = dark ? '#1C1C1E' : '#F2F2F7';
  const cardBg = dark ? '#2C2C2E' : '#FFFFFF';
  const textPrimary = dark ? '#FFFFFF' : '#1A1A1E';
  const textSecondary = dark ? '#AEAEB2' : '#3A3A3C';

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: bg }]}
      contentContainerStyle={[styles.content, { paddingTop: top + 12 }]}
    >
      <Image source={require('../assets/logo-lockup-dark-bg.png')} style={styles.logo} resizeMode="contain" />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.canGoBack() ? router.back() : router.replace('/(tabs)')}
      >
        <Text style={[styles.backText, { color: akzent }]}>← Zurück</Text>
      </TouchableOpacity>

      {titel && (
        <View style={[styles.kontextCard, { backgroundColor: cardBg, borderLeftColor: akzent }]}>
          <Text style={[styles.kontextTitel, { color: textPrimary }]}>{titel}</Text>
          <Text style={[styles.kontextMeta, { color: textSecondary }]}>Vollversion erforderlich</Text>
        </View>
      )}

      <View style={[styles.paywallCard, { backgroundColor: cardBg }]}>
        <Ionicons name="lock-closed" size={48} color={akzent} style={styles.lockIcon} />
        <Text style={[styles.paywallTitel, { color: textPrimary }]}>Nur in der Vollversion</Text>
        <Text style={[styles.paywallText, { color: textSecondary }]}>
          {titel
            ? `„${titel}" ist Teil der Vollversion von MyRehaGuide.`
            : 'Dieser Inhalt ist Teil der Vollversion von MyRehaGuide.'
          }
          {'\n\n'}
          In der kostenlosen Version stehen 3 Übungsbereiche mit je 3 Übungen zur Verfügung — eine leichte, eine mittelschwere und eine anspruchsvolle.
        </Text>

        <View style={[styles.vergleich, { borderColor: dark ? '#3A3A3C' : '#E5E5EA' }]}>
          <View style={styles.vergleichSpalte}>
            <Text style={[styles.vergleichTitel, { color: textSecondary }]}>Kostenlos</Text>
            {['3 Übungsbereiche', 'Je 3 Übungen', 'Signal for Help'].map(p => (
              <View key={p} style={styles.vergleichZeile}>
                <Ionicons name="checkmark-circle" size={16} color="#27AE60" />
                <Text style={[styles.vergleichPunkt, { color: textSecondary }]}>{p}</Text>
              </View>
            ))}
          </View>
          <View style={[styles.vergleichTrennlinie, { backgroundColor: dark ? '#3A3A3C' : '#E5E5EA' }]} />
          <View style={styles.vergleichSpalte}>
            <Text style={[styles.vergleichTitel, { color: akzent }]}>Vollversion</Text>
            {['13 Übungsbereiche', '196 Übungen', 'Signal for Help', 'Favoriten', 'Alle Inhalte'].map(p => (
              <View key={p} style={styles.vergleichZeile}>
                <Ionicons name="checkmark-circle" size={16} color={akzent} />
                <Text style={[styles.vergleichPunkt, { color: textSecondary }]}>{p}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View style={[styles.hinweisCard, { backgroundColor: dark ? '#0F2A3A' : '#E8F4FD' }]}>
        <Text style={[styles.hinweisText, { color: dark ? '#7AB8D4' : '#1A5276' }]}>
          Version wechseln: Einstellungen → VERSION → Vollversion
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 48 },
  logo: { height: 36, width: 180, marginBottom: 8 },
  backButton: { marginBottom: 12 },
  backText: { fontSize: 15, fontWeight: '600' },
  kontextCard: {
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 5,
    marginBottom: 10,
  },
  kontextTitel: { fontSize: 18, fontWeight: '800' },
  kontextMeta: { fontSize: 13, marginTop: 4 },
  paywallCard: {
    borderRadius: 12,
    padding: 24,
    marginBottom: 10,
    alignItems: 'center',
  },
  lockIcon: { marginBottom: 16 },
  paywallTitel: { fontSize: 22, fontWeight: '800', marginBottom: 12, textAlign: 'center' },
  paywallText: { fontSize: 14, lineHeight: 22, textAlign: 'center', marginBottom: 20 },
  vergleich: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
    width: '100%',
  },
  vergleichSpalte: { flex: 1, padding: 14, gap: 8 },
  vergleichTrennlinie: { width: 1 },
  vergleichTitel: { fontSize: 13, fontWeight: '700', marginBottom: 4 },
  vergleichZeile: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  vergleichPunkt: { fontSize: 13 },
  hinweisCard: { borderRadius: 8, padding: 12 },
  hinweisText: { fontSize: 13, lineHeight: 19, textAlign: 'center' },
});

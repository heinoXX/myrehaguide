import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useVersion, FREE_BEREICHE_IDS } from '../../context/VersionContext';
import Ionicons from '@expo/vector-icons/Ionicons';

const KATEGORIEN = [
  { id: 'ruecken',     titel: 'Rücken & LWS',    anzahl: 8,  farbe: '#4A90D9', verfuegbar: true },
  { id: 'knie',        titel: 'Knie',             anzahl: 8,  farbe: '#5BA05A', verfuegbar: true },
  { id: 'schulter',    titel: 'Schulter',          anzahl: 8,  farbe: '#E8832A', verfuegbar: true },
  { id: 'huefte',      titel: 'Hüfte',             anzahl: 8,  farbe: '#9B59B6', verfuegbar: true },
  { id: 'rumpf',       titel: 'Rumpf & Bauch',    anzahl: 12, farbe: '#E74C3C', verfuegbar: true },
  { id: 'atem',        titel: 'Atemübungen',       anzahl: 11, farbe: '#16A085', verfuegbar: true },
  { id: 'gleichgewicht', titel: 'Gleichgewicht',  anzahl: 10, farbe: '#D35400', verfuegbar: true },
  { id: 'knietep',     titel: 'Knie-TEP',          anzahl: 15, farbe: '#1ABC9C', verfuegbar: true },
  { id: 'huefttep',    titel: 'Hüft-TEP',          anzahl: 14, farbe: '#F39C12', verfuegbar: true },
  { id: 'wasser',      titel: 'Wassergymnastik',   anzahl: 23, farbe: '#3498DB', verfuegbar: true },
  { id: 'kinetik',     titel: 'Kinetik & Gehirn',  anzahl: 16, farbe: '#8E44AD', verfuegbar: true },
  { id: 'faszien',     titel: 'Faszientraining',   anzahl: 14, farbe: '#27AE60', verfuegbar: true },
  { id: 'dehnen',      titel: 'Dehnen',             anzahl: 14, farbe: '#2980B9', verfuegbar: true },
];

export default function HomeScreen() {
  const router = useRouter();
  const { resolved } = useTheme();
  const { istBereichFrei } = useVersion();
  const dark = resolved === 'dark';

  const bg = dark ? '#1C1C1E' : '#F2F2F7';
  const cardBg = dark ? '#2C2C2E' : '#FFFFFF';
  const textPrimary = dark ? '#FFFFFF' : '#1A1A1E';
  const textSecondary = dark ? '#AEAEB2' : '#8E8E93';

  return (
    <ScrollView style={[styles.container, { backgroundColor: bg }]} contentContainerStyle={styles.content}>
      <View style={[styles.hero, { backgroundColor: dark ? '#0F4F7A' : '#1A6FA8' }]}>
        <Image
          source={require('../../assets/logo-lockup.png')}
          style={styles.heroLogo}
          resizeMode="contain"
        />
        <Text style={styles.heroSubtitle}>Ihr persönlicher Rehasport-Begleiter</Text>
      </View>

      <TouchableOpacity
        style={[styles.signalBanner, { backgroundColor: dark ? '#3A2E00' : '#FFF3CD', borderLeftColor: '#E8A000' }]}
        onPress={() => router.push('/(tabs)/signal')}
        activeOpacity={0.85}
      >
        <Text style={styles.signalEmoji}>✋</Text>
        <View style={styles.signalText}>
          <Text style={[styles.signalTitle, { color: dark ? '#FFD060' : '#7A4800' }]}>Signal for Help</Text>
          <Text style={[styles.signalDesc, { color: dark ? '#C89A30' : '#A06000' }]}>Stiller Hilferuf — jetzt informieren</Text>
        </View>
        <Text style={[styles.signalArrow, { color: dark ? '#C89A30' : '#A06000' }]}>›</Text>
      </TouchableOpacity>

      <Text style={[styles.sectionTitle, { color: textPrimary }]}>Übungsbereiche</Text>

      <View style={styles.grid}>
        {KATEGORIEN.map((kat) => {
          const frei = kat.verfuegbar && istBereichFrei(kat.id);
          const gesperrt = kat.verfuegbar && !frei;
          return (
            <TouchableOpacity
              key={kat.id}
              style={[
                styles.karte,
                { backgroundColor: cardBg, borderLeftColor: frei ? kat.farbe : (dark ? '#3A3A3C' : '#D1D1D6') },
                !frei && styles.karteInaktiv,
              ]}
              activeOpacity={frei ? 0.75 : 0.6}
              onPress={() => {
                if (frei) {
                  router.push({ pathname: '/(tabs)/uebungen', params: { bereich: kat.id } });
                } else if (gesperrt) {
                  router.push({ pathname: '/paywall', params: { titel: kat.titel, farbe: kat.farbe } });
                }
              }}
            >
              <View style={styles.karteTitelZeile}>
                <Text style={[styles.karteTitel, { color: frei ? textPrimary : textSecondary, flex: 1 }]}>{kat.titel}</Text>
                {gesperrt && <Ionicons name="lock-closed" size={13} color={dark ? '#636366' : '#AEAEB2'} />}
              </View>
              <Text style={[styles.karteAnzahl, { color: textSecondary }]}>
                {!kat.verfuegbar ? 'Demnächst' : frei ? `${FREE_BEREICHE_IDS.includes(kat.id) ? 3 : kat.anzahl} Übungen` : 'Vollversion'}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingBottom: 32 },
  hero: { paddingHorizontal: 28, paddingTop: 5, paddingBottom: 16, alignItems: 'center' },
  heroLogo: { width: '80%', height: 70, marginBottom: 4 },
  heroSubtitle: { fontSize: 15, color: '#BFD9F0', marginTop: 6, textAlign: 'center' },
  signalBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 5,
    margin: 16,
    marginTop: 20,
    borderRadius: 10,
    padding: 14,
    gap: 12,
  },
  signalEmoji: { fontSize: 28 },
  signalText: { flex: 1 },
  signalTitle: { fontSize: 15, fontWeight: '700' },
  signalDesc: { fontSize: 13, marginTop: 2 },
  signalArrow: { fontSize: 22, fontWeight: '300' },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginHorizontal: 16,
    marginBottom: 10,
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12, gap: 8 },
  karte: {
    width: '47%',
    borderRadius: 10,
    padding: 14,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  karteInaktiv: { opacity: 0.55 },
  karteTitelZeile: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  karteTitel: { fontSize: 14, fontWeight: '600', lineHeight: 20 },
  karteAnzahl: { fontSize: 12, marginTop: 4 },
});

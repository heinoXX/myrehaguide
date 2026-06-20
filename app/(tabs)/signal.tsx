import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

const NOTRUFNUMMERN = [
  { name: 'Polizei', nummer: '110', info: '24/7' },
  { name: 'Notruf', nummer: '112', info: '24/7' },
  { name: 'Hilfetelefon Gewalt gegen Frauen', nummer: '116016', info: '24/7, kostenlos, anonym' },
  { name: 'Hilfetelefon Gewalt an Männern', nummer: '08001239900', info: '24/7, kostenlos' },
  { name: 'Telefonseelsorge', nummer: '08001110111', info: '24/7, kostenlos' },
  { name: 'Kinder- und Jugendtelefon', nummer: '116111', info: 'kostenlos' },
];

const SCHRITTE = [
  { nr: '1', text: 'Hand heben — Handfläche zeigt nach außen (zum Gegenüber)' },
  { nr: '2', text: 'Daumen in die Handinnenfläche einlegen (einklappen)' },
  { nr: '3', text: 'Vier Finger über den Daumen schließen — zur Faust falten' },
];

export default function SignalScreen() {
  const { resolved } = useTheme();
  const dark = resolved === 'dark';

  const bg = dark ? '#1C1C1E' : '#F2F2F7';
  const cardBg = dark ? '#2C2C2E' : '#FFFFFF';
  const textPrimary = dark ? '#FFFFFF' : '#1A1A1E';
  const textSecondary = dark ? '#AEAEB2' : '#3A3A3C';
  const separator = dark ? '#3A3A3C' : '#E5E5EA';
  const infoBoxBg = dark ? '#0F2A3A' : '#E8F4FD';
  const infoBoxText = dark ? '#7AB8D4' : '#1A5276';

  return (
    <ScrollView style={[styles.container, { backgroundColor: bg }]} contentContainerStyle={styles.content}>
      <Image source={require('../../assets/logo-lockup-dark-bg.png')} style={styles.logo} resizeMode="contain" />
      <View style={[styles.infoBox, { backgroundColor: infoBoxBg }]}>
        <Text style={[styles.infoText, { color: infoBoxText }]}>
          Diese Seite speichert keine Daten und ist ohne Login zugänglich — bewusst, damit auch Personen in kontrollierten Umgebungen diese Information lesen können.
        </Text>
      </View>

      <View style={[styles.card, { backgroundColor: cardBg }]}>
        <Text style={[styles.cardTitle, { color: textPrimary }]}>Das Handzeichen — Schritt für Schritt</Text>
        <Image
          source={require('../../assets/signal-for-help.png')}
          style={styles.signalBild}
          resizeMode="contain"
        />
        {SCHRITTE.map((s) => (
          <View key={s.nr} style={styles.schritt}>
            <View style={styles.nrBadge}>
              <Text style={styles.nrText}>{s.nr}</Text>
            </View>
            <Text style={[styles.schrittText, { color: textSecondary }]}>{s.text}</Text>
          </View>
        ))}
        <Text style={[styles.hinweis, { color: dark ? '#636366' : '#8E8E93' }]}>
          Das Zeichen wirkt wie eine harmlose Geste — für Außenstehende unauffällig, für Eingeweihte eindeutig.
        </Text>
      </View>

      <View style={[styles.card, { backgroundColor: cardBg }]}>
        <Text style={[styles.cardTitle, { color: textPrimary }]}>Wenn Sie das Zeichen sehen</Text>
        <Text style={[styles.cardText, { color: textSecondary }]}>
          1. Ruhig bleiben — keine Konfrontation{'\n'}
          2. Dezent nicken zur Bestätigung{'\n'}
          3. Polizei rufen: 110{'\n'}
          4. Nicht eskalieren{'\n'}
          5. Diskret handeln
        </Text>
      </View>

      <Text style={[styles.sectionTitle, { color: textPrimary }]}>Notrufnummern</Text>

      {NOTRUFNUMMERN.map((n, i) => (
        <TouchableOpacity
          key={n.nummer}
          style={[
            styles.notrufZeile,
            { backgroundColor: cardBg },
            i < NOTRUFNUMMERN.length - 1 && { marginBottom: 6 },
          ]}
          onPress={() => Linking.openURL(`tel:${n.nummer}`)}
          activeOpacity={0.7}
        >
          <View style={styles.notrufInfo}>
            <Text style={[styles.notrufName, { color: textPrimary }]}>{n.name}</Text>
            <Text style={[styles.notrufMeta, { color: dark ? '#636366' : '#8E8E93' }]}>{n.info}</Text>
          </View>
          <Text style={styles.notrufNummer}>{n.nummer.replace(/^(\d{3})(\d+)$/, '$1 $2')}</Text>
        </TouchableOpacity>
      ))}

      <Text style={[styles.quelle, { color: dark ? '#636366' : '#AEAEB2' }]}>
        Quelle: Canadian Women's Foundation (2020); Polizeiliche Kriminalprävention der Länder und des Bundes
      </Text>

      <View style={[styles.card, { backgroundColor: cardBg, marginTop: 4 }]}>
        <Text style={[styles.cardTitle, { color: textPrimary }]}>Was ist das Signal for Help?</Text>
        <Text style={[styles.cardText, { color: textSecondary }]}>
          Ein internationales Handzeichen für einen stillen Hilferuf — für Menschen, die nicht laut um Hilfe rufen können oder dürfen, weil eine gefährliche Person anwesend ist.{'\n\n'}
          Entwickelt 2020 von der Canadian Women's Foundation, heute weltweit von Polizei, Frauenhäusern und Schulen empfohlen.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 40 },
  logo: { height: 36, width: 180, marginBottom: 12 },
  signalBild: { width: '100%', height: 160, marginBottom: 16, borderRadius: 8 },
  infoBox: { borderRadius: 8, padding: 12, marginBottom: 16 },
  infoText: { fontSize: 12, lineHeight: 18 },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  cardTitle: { fontSize: 16, fontWeight: '700', marginBottom: 10 },
  cardText: { fontSize: 14, lineHeight: 22 },
  schritt: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12, gap: 10 },
  nrBadge: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: '#E8A000',
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  nrText: { color: '#FFFFFF', fontWeight: '700', fontSize: 13 },
  schrittText: { flex: 1, fontSize: 14, lineHeight: 21, paddingTop: 4 },
  hinweis: { fontSize: 13, fontStyle: 'italic', marginTop: 4, lineHeight: 19 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 10, marginTop: 4 },
  notrufZeile: {
    borderRadius: 10,
    padding: 14,
    marginBottom: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notrufInfo: { flex: 1 },
  notrufName: { fontSize: 14, fontWeight: '600' },
  notrufMeta: { fontSize: 12, marginTop: 2 },
  notrufNummer: { fontSize: 18, fontWeight: '700', color: '#1A6FA8' },
  quelle: { fontSize: 11, marginTop: 16, lineHeight: 16 },
});

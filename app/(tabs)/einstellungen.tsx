import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemePreference, useTheme } from '../../context/ThemeContext';

const THEME_OPTIONEN: { wert: ThemePreference; label: string }[] = [
  { wert: 'system', label: 'System' },
  { wert: 'light', label: 'Hell' },
  { wert: 'dark', label: 'Dunkel' },
];

const PROFIL_EINTRAEGE = [
  { label: 'Name', wert: 'Nicht angegeben' },
  { label: 'Diagnose / Bereich', wert: 'Nicht angegeben' },
  { label: 'Therapeut:in', wert: 'Nicht angegeben' },
];

const APP_EINTRAEGE = [
  { label: 'Version', wert: '1.0.0' },
  { label: 'App-Name', wert: 'MyRehaGuide' },
  { label: 'Datenschutz', wert: '›' },
  { label: 'Impressum', wert: '›' },
];

export default function EinstellungenScreen() {
  const { preference, setPreference, resolved } = useTheme();

  const dark = resolved === 'dark';
  const bg = dark ? '#1C1C1E' : '#F2F2F7';
  const cardBg = dark ? '#2C2C2E' : '#FFFFFF';
  const textPrimary = dark ? '#FFFFFF' : '#1A1A1E';
  const textSecondary = dark ? '#AEAEB2' : '#8E8E93';
  const separator = dark ? '#3A3A3C' : '#E5E5EA';
  const sectionLabel = dark ? '#8E8E93' : '#8E8E93';
  const activeBlue = '#1A6FA8';

  return (
    <ScrollView style={[styles.container, { backgroundColor: bg }]} contentContainerStyle={styles.content}>

      <Text style={[styles.abschnittTitel, { color: sectionLabel }]}>PROFIL</Text>
      <View style={[styles.karte, { backgroundColor: cardBg }]}>
        {PROFIL_EINTRAEGE.map((e, i) => (
          <TouchableOpacity
            key={e.label}
            style={[styles.zeile, i < PROFIL_EINTRAEGE.length - 1 && { borderBottomWidth: 0.5, borderBottomColor: separator }]}
            activeOpacity={0.6}
          >
            <Text style={[styles.zeileLabel, { color: textPrimary }]}>{e.label}</Text>
            <Text style={[styles.zeileWert, { color: textSecondary }]}>{e.wert}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[styles.abschnittTitel, { color: sectionLabel }]}>DARSTELLUNG</Text>
      <View style={[styles.karte, { backgroundColor: cardBg }]}>
        <View style={[styles.zeile, { borderBottomWidth: 0.5, borderBottomColor: separator }]}>
          <Text style={[styles.zeileLabel, { color: textPrimary }]}>Schriftgröße</Text>
          <Text style={[styles.zeileWert, { color: textSecondary }]}>Normal</Text>
        </View>
        <View style={styles.zeile}>
          <Text style={[styles.zeileLabel, { color: textPrimary }]}>Farbschema</Text>
        </View>
        <View style={styles.segmentContainer}>
          {THEME_OPTIONEN.map((opt) => {
            const aktiv = preference === opt.wert;
            return (
              <TouchableOpacity
                key={opt.wert}
                style={[
                  styles.segmentButton,
                  aktiv && { backgroundColor: activeBlue },
                  !aktiv && { backgroundColor: dark ? '#3A3A3C' : '#E5E5EA' },
                ]}
                onPress={() => setPreference(opt.wert)}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.segmentLabel,
                  { color: aktiv ? '#FFFFFF' : textSecondary },
                ]}>
                  {opt.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <Text style={[styles.abschnittTitel, { color: sectionLabel }]}>APP-INFORMATIONEN</Text>
      <View style={[styles.karte, { backgroundColor: cardBg }]}>
        {APP_EINTRAEGE.map((e, i) => (
          <TouchableOpacity
            key={e.label}
            style={[styles.zeile, i < APP_EINTRAEGE.length - 1 && { borderBottomWidth: 0.5, borderBottomColor: separator }]}
            activeOpacity={0.6}
          >
            <Text style={[styles.zeileLabel, { color: textPrimary }]}>{e.label}</Text>
            <Text style={[styles.zeileWert, { color: textSecondary }]}>{e.wert}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[styles.footer, { color: dark ? '#636366' : '#AEAEB2' }]}>
        MyRehaGuide — Ihr persönlicher Rehasport-Begleiter{'\n'}
        Alle Übungen dienen zur Unterstützung — kein Ersatz für ärztliche Beratung.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 40 },
  abschnittTitel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
    marginLeft: 4,
    marginTop: 20,
    letterSpacing: 0.5,
  },
  karte: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  zeile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    paddingHorizontal: 16,
  },
  zeileLabel: { fontSize: 15 },
  zeileWert: { fontSize: 15 },
  segmentContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 14,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  segmentLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 19,
    marginTop: 24,
  },
});

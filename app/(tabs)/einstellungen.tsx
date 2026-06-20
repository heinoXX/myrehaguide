import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemePreference, useTheme } from '../../context/ThemeContext';
import { AppVersion, useVersion, FREE_BEREICHE_IDS } from '../../context/VersionContext';

const VERSION_OPTIONEN: { wert: AppVersion; label: string }[] = [
  { wert: 'free', label: 'Kostenlos' },
  { wert: 'paid', label: 'Vollversion' },
];

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

const APP_LINKS: { label: string; url: string }[] = [
  { label: 'Datenschutzerklärung', url: 'https://heinoxx.github.io/myrehaguide/datenschutz.html' },
  { label: 'Impressum', url: 'https://heinoxx.github.io/myrehaguide/impressum.html' },
];

export default function EinstellungenScreen() {
  const { preference, setPreference, resolved } = useTheme();
  const { version, setVersion } = useVersion();

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

      <Text style={[styles.abschnittTitel, { color: sectionLabel }]}>VERSION</Text>
      <View style={[styles.karte, { backgroundColor: cardBg }]}>
        <View style={[styles.zeile, { borderBottomWidth: 0.5, borderBottomColor: separator }]}>
          <Text style={[styles.zeileLabel, { color: textPrimary }]}>App-Version</Text>
          <Text style={[styles.zeileWert, { color: version === 'paid' ? '#27AE60' : '#E8832A' }]}>
            {version === 'paid' ? 'Vollversion' : 'Kostenlos'}
          </Text>
        </View>
        <View style={[styles.zeile, { flexDirection: 'column', alignItems: 'flex-start', gap: 10 }]}>
          <Text style={[styles.zeileLabel, { color: textPrimary }]}>Version wechseln</Text>
          <View style={styles.segmentContainer}>
            {VERSION_OPTIONEN.map((opt) => {
              const aktiv = version === opt.wert;
              return (
                <TouchableOpacity
                  key={opt.wert}
                  style={[
                    styles.segmentButton,
                    aktiv && { backgroundColor: activeBlue },
                    !aktiv && { backgroundColor: dark ? '#3A3A3C' : '#E5E5EA' },
                  ]}
                  onPress={() => setVersion(opt.wert)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.segmentLabel, { color: aktiv ? '#FFFFFF' : textSecondary }]}>
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        {version === 'free' && (
          <View style={[styles.versionHinweis, { backgroundColor: dark ? '#0F2A3A' : '#E8F4FD' }]}>
            <Text style={[styles.versionHinweisText, { color: dark ? '#7AB8D4' : '#1A5276' }]}>
              Kostenlos: {FREE_BEREICHE_IDS.length} Bereiche, je 3 Übungen (leicht / mittel / schwer).{'\n'}Signal for Help immer verfügbar.
            </Text>
          </View>
        )}
      </View>

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
        <View style={[styles.zeile, { borderBottomWidth: 0.5, borderBottomColor: separator }]}>
          <Text style={[styles.zeileLabel, { color: textPrimary }]}>Version</Text>
          <Text style={[styles.zeileWert, { color: textSecondary }]}>1.0.0</Text>
        </View>
        <View style={[styles.zeile, { borderBottomWidth: 0.5, borderBottomColor: separator }]}>
          <Text style={[styles.zeileLabel, { color: textPrimary }]}>App-Name</Text>
          <Text style={[styles.zeileWert, { color: textSecondary }]}>MyRehaGuide</Text>
        </View>
        {APP_LINKS.map((link, i) => (
          <TouchableOpacity
            key={link.label}
            style={[styles.zeile, i < APP_LINKS.length - 1 && { borderBottomWidth: 0.5, borderBottomColor: separator }]}
            activeOpacity={0.6}
            onPress={() => Linking.openURL(link.url)}
          >
            <Text style={[styles.zeileLabel, { color: textPrimary }]}>{link.label}</Text>
            <Text style={[styles.zeileWert, { color: activeBlue }]}>›</Text>
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
  versionHinweis: { margin: 12, marginTop: 0, borderRadius: 8, padding: 10 },
  versionHinweisText: { fontSize: 12, lineHeight: 18 },
  footer: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 19,
    marginTop: 24,
  },
});

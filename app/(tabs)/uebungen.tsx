import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { BEREICHE, findeUebungById } from '../../data/uebungen';
import { useTheme } from '../../context/ThemeContext';
import { useFavoriten } from '../../context/FavoritenContext';

export default function UebungenScreen() {
  const { bereich: bereichParam } = useLocalSearchParams<{ bereich?: string }>();
  const [offen, setOffen] = useState<string | null>(null);
  const { resolved } = useTheme();
  const { favoriten, istFavorit } = useFavoriten();
  const router = useRouter();

  useEffect(() => {
    if (bereichParam) setOffen(bereichParam);
  }, [bereichParam]);
  const dark = resolved === 'dark';

  const bg = dark ? '#1C1C1E' : '#F2F2F7';
  const cardBg = dark ? '#2C2C2E' : '#FFFFFF';
  const textPrimary = dark ? '#FFFFFF' : '#1A1A1E';
  const textSecondary = dark ? '#AEAEB2' : '#8E8E93';
  const separator = dark ? '#3A3A3C' : '#E5E5EA';
  const hinweiseBg = dark ? '#0F2A3A' : '#E8F4FD';
  const hinweisText = dark ? '#7AB8D4' : '#1A5276';

  return (
    <ScrollView style={[styles.container, { backgroundColor: bg }]} contentContainerStyle={styles.content}>
      <Image source={require('../../assets/logo-lockup-dark-bg.png')} style={styles.logo} resizeMode="contain" />
      <Text style={[styles.hinweis, { backgroundColor: hinweiseBg, color: hinweisText }]}>
        Alle Übungen wurden aus fachlich geprüften Quellen zusammengestellt. Bitte vor der Nutzung mit Ihrem Therapeuten absprechen.
      </Text>

      {favoriten.length > 0 && (
        <View style={styles.bereichBlock}>
          <TouchableOpacity
            style={[styles.bereichHeader, { backgroundColor: cardBg, borderLeftColor: '#E74C3C' }]}
            onPress={() => setOffen(offen === '__favoriten' ? null : '__favoriten')}
            activeOpacity={0.75}
          >
            <Text style={[styles.bereichTitel, { color: textPrimary }]}>Meine Favoriten</Text>
            <Text style={[styles.bereichMeta, { color: textSecondary }]}>
              {favoriten.length} Übungen  {offen === '__favoriten' ? '▲' : '▼'}
            </Text>
          </TouchableOpacity>
          {offen === '__favoriten' && (
            <View style={[styles.uebungListe, { backgroundColor: cardBg }]}>
              {favoriten.map((fid) => {
                const u = findeUebungById(fid);
                if (!u) return null;
                return (
                  <TouchableOpacity
                    key={u.id}
                    style={[styles.uebungZeile, { borderBottomColor: separator }]}
                    activeOpacity={0.6}
                    onPress={() => router.push(`/uebung/${u.id}`)}
                  >
                    <Ionicons name="heart" size={16} color="#E74C3C" />
                    <Text style={[styles.uebungName, { color: textPrimary }]}>{u.titel}</Text>
                    <Text style={[styles.pfeil, { color: textSecondary }]}>›</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
      )}

      {BEREICHE.map((bereich) => (
        <View key={bereich.id} style={styles.bereichBlock}>
          <TouchableOpacity
            style={[styles.bereichHeader, { backgroundColor: cardBg, borderLeftColor: bereich.farbe }]}
            onPress={() => setOffen(offen === bereich.id ? null : bereich.id)}
            activeOpacity={0.75}
          >
            <Text style={[styles.bereichTitel, { color: textPrimary }]}>{bereich.titel}</Text>
            <Text style={[styles.bereichMeta, { color: textSecondary }]}>
              {bereich.uebungen.length} Übungen  {offen === bereich.id ? '▲' : '▼'}
            </Text>
          </TouchableOpacity>

          {offen === bereich.id && (
            <View style={[styles.uebungListe, { backgroundColor: cardBg }]}>
              {bereich.uebungen.map((u, i) => (
                <TouchableOpacity
                  key={u.id}
                  style={[styles.uebungZeile, { borderBottomColor: separator }]}
                  activeOpacity={0.6}
                  onPress={() => router.push(`/uebung/${u.id}`)}
                >
                  <View style={[styles.nummerBadge, { backgroundColor: bereich.farbe }]}>
                    <Text style={styles.nummerText}>{i + 1}</Text>
                  </View>
                  <Text style={[styles.uebungName, { color: textPrimary }]}>{u.titel}</Text>
                  {istFavorit(u.id) && <Ionicons name="heart" size={13} color="#E74C3C" />}
                  <Text style={[styles.schwierigkeitDot, {
                    color: u.schwierigkeit === 1 ? '#27AE60' : u.schwierigkeit === 2 ? '#E8832A' : '#E74C3C'
                  }]}>●</Text>
                  <Text style={[styles.pfeil, { color: textSecondary }]}>›</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 40 },
  logo: { height: 36, width: 180, marginBottom: 12 },
  hinweis: { borderRadius: 8, padding: 12, fontSize: 13, marginBottom: 16, lineHeight: 19 },
  bereichBlock: { marginBottom: 8 },
  bereichHeader: {
    borderRadius: 10,
    padding: 14,
    borderLeftWidth: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bereichTitel: { fontSize: 15, fontWeight: '700' },
  bereichMeta: { fontSize: 13 },
  uebungListe: { borderRadius: 10, marginTop: 2, overflow: 'hidden' },
  uebungZeile: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 0.5,
    gap: 10,
  },
  nummerBadge: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  nummerText: { color: '#FFFFFF', fontSize: 11, fontWeight: '700' },
  uebungName: { flex: 1, fontSize: 14 },
  schwierigkeitDot: { fontSize: 10 },
  pfeil: { fontSize: 18, fontWeight: '300' },
});

import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

type Bild = { front: ReturnType<typeof require>; seite: ReturnType<typeof require> };

interface Props {
  ausgang: Bild;
  endposition: Bild;
  dauer?: number;   // ms je Phase
  uebergang?: number; // ms für Crossfade
}

export function UebungAnimation({ ausgang, endposition, dauer = 1800, uebergang = 900 }: Props) {
  const opacity = useRef(new Animated.Value(0)).current; // 0 = Ausgang, 1 = End

  useEffect(() => {
    const schritt = () =>
      Animated.sequence([
        Animated.delay(dauer),
        Animated.timing(opacity, { toValue: 1, duration: uebergang, useNativeDriver: true }),
        Animated.delay(dauer),
        Animated.timing(opacity, { toValue: 0, duration: uebergang, useNativeDriver: true }),
      ]);

    Animated.loop(schritt()).start();
    return () => opacity.stopAnimation();
  }, []);

  const opacityEnd = opacity;
  const opacityAusgang = opacity.interpolate({ inputRange: [0, 1], outputRange: [1, 0] });

  return (
    <View style={styles.container}>
      {/* Ausgangsposition (squat) */}
      <Animated.View style={[styles.bildPaar, { opacity: opacityAusgang }]}>
        <Animated.Image source={ausgang.front} style={styles.bild} resizeMode="contain" />
        <Animated.Image source={ausgang.seite} style={styles.bild} resizeMode="contain" />
      </Animated.View>

      {/* Endposition (stehend) */}
      <Animated.View style={[styles.bildPaar, styles.ueberlagert, { opacity: opacityEnd }]}>
        <Animated.Image source={endposition.front} style={styles.bild} resizeMode="contain" />
        <Animated.Image source={endposition.seite} style={styles.bild} resizeMode="contain" />
      </Animated.View>

      {/* Labels */}
      <Animated.Text style={[styles.label, styles.labelLinks, { opacity: opacityAusgang }]}>
        Ausgangsposition
      </Animated.Text>
      <Animated.Text style={[styles.label, styles.labelLinks, { opacity: opacityEnd }]}>
        Endposition
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 220,
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F8F8F8',
  },
  bildPaar: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 28,
    gap: 8,
  },
  ueberlagert: {
    top: 0,
    left: 0,
  },
  bild: {
    flex: 1,
    height: '100%',
  },
  label: {
    position: 'absolute',
    bottom: 8,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: '#8E8E93',
    letterSpacing: 0.3,
  },
  labelLinks: {},
});

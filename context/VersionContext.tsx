import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { BEREICHE } from '../data/uebungen';

export type AppVersion = 'free' | 'paid';

// Die 3 Kategorien, die in der kostenlosen Version verfügbar sind
export const FREE_BEREICHE_IDS = ['ruecken', 'knie', 'schulter'];

// Pro freier Kategorie: je 1 Übung pro Schwierigkeitsgrad (leicht, mittel, schwer)
function berechneFreieUebungsIds(): Set<string> {
  const ids = new Set<string>();
  for (const bereich of BEREICHE) {
    if (!FREE_BEREICHE_IDS.includes(bereich.id)) continue;
    const leicht = bereich.uebungen.find(u => u.schwierigkeit === 1);
    const mittel = bereich.uebungen.find(u => u.schwierigkeit === 2);
    const schwer = bereich.uebungen.find(u => u.schwierigkeit === 3);
    [leicht, mittel, schwer].forEach(u => u && ids.add(u.id));
  }
  return ids;
}

const FREE_UEBUNGS_IDS = berechneFreieUebungsIds();

interface VersionContextValue {
  version: AppVersion;
  setVersion: (v: AppVersion) => void;
  istBereichFrei: (bereichId: string) => boolean;
  istUebungFrei: (uebungId: string) => boolean;
}

const VersionContext = createContext<VersionContextValue>({
  version: 'free',
  setVersion: () => {},
  istBereichFrei: () => false,
  istUebungFrei: () => false,
});

const STORAGE_KEY = 'app_version';

export function VersionProvider({ children }: { children: React.ReactNode }) {
  const [version, setVersionState] = useState<AppVersion>('free');

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((val) => {
      if (val === 'free' || val === 'paid') setVersionState(val);
    });
  }, []);

  const setVersion = useCallback((v: AppVersion) => {
    setVersionState(v);
    AsyncStorage.setItem(STORAGE_KEY, v);
  }, []);

  const istBereichFrei = useCallback((bereichId: string) => {
    if (version === 'paid') return true;
    return FREE_BEREICHE_IDS.includes(bereichId);
  }, [version]);

  const istUebungFrei = useCallback((uebungId: string) => {
    if (version === 'paid') return true;
    return FREE_UEBUNGS_IDS.has(uebungId);
  }, [version]);

  return (
    <VersionContext.Provider value={{ version, setVersion, istBereichFrei, istUebungFrei }}>
      {children}
    </VersionContext.Provider>
  );
}

export const useVersion = () => useContext(VersionContext);

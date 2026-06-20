import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'favoriten';

interface FavoritenContextValue {
  favoriten: string[];
  istFavorit: (id: string) => boolean;
  toggleFavorit: (id: string) => void;
}

const FavoritenContext = createContext<FavoritenContextValue>({
  favoriten: [],
  istFavorit: () => false,
  toggleFavorit: () => {},
});

export function FavoritenProvider({ children }: { children: React.ReactNode }) {
  const [favoriten, setFavoriten] = useState<string[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) {
        try { setFavoriten(JSON.parse(raw)); } catch {}
      }
    });
  }, []);

  const toggleFavorit = useCallback((id: string) => {
    setFavoriten((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const istFavorit = useCallback((id: string) => favoriten.includes(id), [favoriten]);

  return (
    <FavoritenContext.Provider value={{ favoriten, istFavorit, toggleFavorit }}>
      {children}
    </FavoritenContext.Provider>
  );
}

export const useFavoriten = () => useContext(FavoritenContext);

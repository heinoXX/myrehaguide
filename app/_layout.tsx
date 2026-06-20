import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { FavoritenProvider } from '../context/FavoritenContext';
import { VersionProvider } from '../context/VersionContext';

function RootNavigation() {
  const { resolved } = useTheme();
  return (
    <>
      <StatusBar style={resolved === 'dark' ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <FavoritenProvider>
        <VersionProvider>
          <RootNavigation />
        </VersionProvider>
      </FavoritenProvider>
    </ThemeProvider>
  );
}

import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '../../context/ThemeContext';

const BLUE = '#1A6FA8';
const GRAY = '#8E8E93';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

const TAB_ICONS: Record<string, { active: IoniconName; inactive: IoniconName }> = {
  index:          { active: 'home',        inactive: 'home-outline' },
  uebungen:       { active: 'body',        inactive: 'body-outline' },
  signal:         { active: 'hand-left',   inactive: 'hand-left-outline' },
  einstellungen:  { active: 'settings',    inactive: 'settings-outline' },
};

export default function TabLayout() {
  const { resolved } = useTheme();
  const dark = resolved === 'dark';

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: BLUE,
        tabBarInactiveTintColor: GRAY,
        tabBarStyle: {
          backgroundColor: dark ? '#1C1C1E' : '#FFFFFF',
          borderTopColor: dark ? '#3A3A3C' : '#E5E5EA',
          paddingBottom: Platform.OS === 'ios' ? 20 : 8,
          height: Platform.OS === 'ios' ? 80 : 60,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '500' },
        headerStyle: { backgroundColor: dark ? '#1C1C1E' : '#FFFFFF' },
        headerTintColor: dark ? '#FFFFFF' : '#1A1A1E',
        headerTitleStyle: { fontWeight: '700', fontSize: 17 },
        headerShadowVisible: false,
        tabBarIcon: ({ focused, color, size }) => {
          const icons = TAB_ICONS[route.name];
          if (!icons) return null;
          return (
            <Ionicons
              name={focused ? icons.active : icons.inactive}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tabs.Screen name="index"         options={{ title: 'Start',        headerTitle: '' }} />
      <Tabs.Screen name="uebungen"      options={{ title: 'Übungen',      headerTitle: 'Übungen' }} />
      <Tabs.Screen name="signal"        options={{ title: 'Prävention',   headerTitle: 'Signal for Help' }} />
      <Tabs.Screen name="einstellungen" options={{ title: 'Einstellungen', headerTitle: 'Einstellungen' }} />
    </Tabs>
  );
}

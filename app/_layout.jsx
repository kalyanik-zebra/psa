import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import UseColorScheme from '@/hooks/useColorScheme';
import { SOSProvider } from '@/components/Context/SendSOSContext';
import MainNav from './Navigations/mainNav';


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = UseColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SOSProvider>
        <MainNav />
      </SOSProvider>
    </ThemeProvider>
  );
}

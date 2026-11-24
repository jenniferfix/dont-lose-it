import "../global.css"
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider } from "@/components/ui/theme-provider"

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  return (
    <ThemeProvider defaultTheme="system">
      <AnimatedSplashOverlay />
      <AppTabs />
    </ThemeProvider>
  );
}

import "../global.css";
import * as SplashScreen from "expo-splash-screen";
import { ThemeProvider } from "@/components/ui/theme-provider";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import AppTabs from "@/components/app-tabs";
import { ApiProvider } from "@/lib/trpc";

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
	return (
		<ApiProvider>
			<ThemeProvider defaultTheme="system">
				<AnimatedSplashOverlay />
				<AppTabs />
			</ThemeProvider>
		</ApiProvider>
	);
}

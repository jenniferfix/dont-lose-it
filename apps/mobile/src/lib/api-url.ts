import Constants from "expo-constants";

// In dev, reuse the IP the Metro bundler is served from so physical devices can reach the API.
function getApiUrl() {
	if (process.env.EXPO_PUBLIC_API_URL) return process.env.EXPO_PUBLIC_API_URL;
	const host = Constants.expoConfig?.hostUri?.split(":")[0] ?? "localhost";
	return `http://${host}:3000`;
}

export const API_URL = getApiUrl();

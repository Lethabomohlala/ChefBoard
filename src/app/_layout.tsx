import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Boldonse: require("../../assets/fonts/Boldonse-Regular.ttf"),

    PlusJakartaSans: require("../../assets/fonts/static/PlusJakartaSans-Regular.ttf"),
    PlusJakartaSansBold: require("../../assets/fonts/static/PlusJakartaSans-Bold.ttf"),
    PlusJakartaSansExtraBold: require("../../assets/fonts/static/PlusJakartaSans-ExtraBold.ttf"),
    PlusJakartaSansSemiBoldItalic: require("../../assets/fonts/static/PlusJakartaSans-SemiBoldItalic.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  );
}
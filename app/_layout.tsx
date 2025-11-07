import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function doAsyncStuff() {
      try {
        // do something async here
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    doAsyncStuff();
  }, []);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hide();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }
  return (
    <>
      <StatusBar hidden={true} />

      <Stack screenOptions={{ animation: "fade" }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="movies" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}

import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import "../global.css";



export default function RootLayout() {
  
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

import { Stack } from "expo-router";
import React from "react";

const MoviesLayout = () => {
  return (
    <Stack screenOptions={{ title: "Movie Detais", headerShown: false }} />
  );
};

export default MoviesLayout;

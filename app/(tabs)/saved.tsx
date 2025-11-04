import SavedCard from "@/components/SavedCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { getMoviesSaved } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useFocusEffect } from "expo-router";
import React, { useCallback } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const EmptyState = () => {
  return (
    <>
      <View className="flex-1 flex-col gap-2 items-center justify-center ">
        <View className="bg-dark-100 p-8 rounded-full">
          <Image source={icons.save} className="size-10" tintColor="#A8B5DB" />
        </View>
        <View className="flex-col flex items-center justify-center gap-5">
          <Text className="text-white font-bold text-lg">
            No movies saved yet
          </Text>
          <Text
            className="font-bold text-light-200 text-sm text-center px-10"
            numberOfLines={2}
          >
            Start saving your favorite movies to see them here. Tap the save
            icon on any movie to add it to your collection
          </Text>
        </View>
      </View>
    </>
  );
};

const SavedScreen = () => {
  const {
    data: savedMovies,
    loading: savedMoviesLoading,
    refetch: refetchSavedMovies,
    error,
  } = useFetch(() => getMoviesSaved());

  // update component when a movie is un-saved
  useFocusEffect(
    useCallback(() => {
      const update = async () => {
        await refetchSavedMovies();
      };
      update();
    }, [])
  );

  if (error) {
    Alert.alert("testing: " + error.message);
  }

  return (
    <SafeAreaView className="bg-primary flex-1 relative ">
      <Image source={images.bg} className="absolute w-full z-0 " />

      <ScrollView
        className="flex-1 px-5 "
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
        }}
      >
        <View className="flex items-center justify-center mt-16">
          <Image source={icons.logo} className="w-12 h-10" />
        </View>

        <View className="mt-10 flex-col gap-1 items-start justify-center ">
          <Text className="text-white font-bold text-2xl">My Saved Movies</Text>
          <Text className="text-light-100 text-sm">
            Your personal collection
          </Text>
        </View>

        <View className="flex-1 mt-5 ">
          {savedMoviesLoading ? (
            <View className="flex-1 items-center justify-center ">
              <ActivityIndicator size={"large"} color={"#fff"} />
            </View>
          ) : (
            <>
              {savedMovies?.length! > 0 ? (
                <FlatList
                  scrollEnabled={false}
                  data={savedMovies}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item) => item.$id}
                  renderItem={({ item }) => (
                    <SavedCard
                      movie_id={item.movie_id}
                      poster_url={item.poster_url}
                      title={item.title}
                    />
                  )}
                  numColumns={3}
                  columnWrapperStyle={{
                    gap: 20,
                    marginBottom: 10,
                  }}
                />
              ) : (
                <EmptyState />
              )}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default SavedScreen;

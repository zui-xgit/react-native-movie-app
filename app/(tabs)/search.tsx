import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { updateSearchCount } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: movies,
    loading,
    error,
    refetch,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  useEffect(() => {
    // debouncing
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await refetch();
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  useEffect(() => {
    const func = async () => {
      if (movies?.length && movies?.[0]) {
        try {
          await updateSearchCount(searchQuery, movies[0]);
        } catch (err: any) {
          Alert.alert(err.message);
        }
      }
    };
    func();
  }, [movies]);

  // applying focus on the search Bar when the search.tsx screen has focus
  const inputRef = useRef<TextInput>(null);
  useFocusEffect(
    useCallback(() => {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }, [])
  );

  return (
    <SafeAreaView className="flex-1 bg-primary" edges={["top"]}>
      <Image source={images.bg} className="absolute w-full z-0" />
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MovieCard {...item} />}
        numColumns={3}
        columnWrapperClassName="gap-5 left-1 mb-8  px-4"
        contentContainerClassName="pb-32 "
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>

            <View className="my-5 px-5">
              <SearchBar
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search for a movie"
                inputRef={inputRef}
              />
            </View>

            {loading && (
              <ActivityIndicator
                size={"large"}
                color={"#0000ff"}
                className="my-3"
              />
            )}

            {error && (
              <Text className="text-red-500 font-bold self-center px-5 my-3">
                Error: {error?.message}
              </Text>
            )}

            {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
              <View className="px-5 py-4">
                <Text className="text-xl text-white font-bold">
                  Search Results for {""}
                  <Text className="text-accent">{searchQuery}</Text>
                </Text>
              </View>
            )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                {searchQuery.trim() ? "No movies found" : "Search for a movie"}
              </Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
};

export default SearchScreen;

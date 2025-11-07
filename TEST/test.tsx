import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";

import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();

  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const {
    data: trendingMovies,
    loading: trendingMoviesLoading,
    error: trendingMoviesError,
    refetch: refetchTrendingMovies,
  } = useFetch(getTrendingMovies);

  if (trendingMoviesError) {
    console.log(trendingMoviesError);
  }

  // refetch the trending movies whenever it is focused
  useFocusEffect(
    useCallback(() => {
      const refetch = async () => {
        // console.log("The home page is focused");
        await refetchTrendingMovies();
      };
      refetch();
    }, [])
  );

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: moviesRefetch,
  } = useFetch(() => fetchMovies({}));

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await moviesRefetch();
    setIsRefreshing(false);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
        }}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={["#fff"]}
            progressBackgroundColor={"#221f3d"}
          />
        }
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mx-auto " />

        <View className="flex-1 mt-5">
          <SearchBar
            onPress={() => router.push("/search")}
            placeholder="Search for a movie"
          />
          <View className="mt-5">
            <Text className="font-bold mb-3 text-white text-lg">
              Trending Movies
            </Text>

            {trendingMoviesLoading ? (
              <>
                <View className="items-center justify-center  py-4">
                  <ActivityIndicator size={"large"} color={"blue"} />
                </View>
              </>
            ) : trendingMoviesError ? (
              <>
                <View className=" py-4 items-center justify-center">
                  <Text className="text-white mt-2 self-center">
                    Error: {trendingMoviesError?.message}
                  </Text>
                </View>
              </>
            ) : (
              <>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                  className="mb-4 mt-3 "
                  data={trendingMovies}
                  keyExtractor={(item) => item.$id}
                  contentContainerClassName="gap-10"
                  renderItem={({ item, index }) => (
                    // <TrendingCard movie={item} index={index} />
                    <TrendingCard
                      movie_id={item.movie_id}
                      poster_url={item.poster_url}
                      title={item.title}
                      index={index}
                    />
                  )}
                />
              </>
            )}
          </View>

          <View className="flex-1 mt-5 ">
            <Text className="text-lg text-white font-bold mb-3">
              Latest Movies
            </Text>

            {moviesLoading ? (
              <>
                <View className=" flex-1 items-center justify-center">
                  <ActivityIndicator size={"large"} color={"blue"} />
                </View>
              </>
            ) : moviesError ? (
              <>
                <View className=" flex-1 items-center justify-center">
                  <Text className="text-white mt-2 self-center">
                    Error: {moviesError?.message}
                  </Text>
                </View>
              </>
            ) : (
              <>
                <FlatList
                  data={movies}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => <MovieCard {...item} />}
                  numColumns={3}
                  columnWrapperStyle={{
                    justifyContent: "flex-start",
                    gap: 20,
                    paddingRight: 5,
                    marginBottom: 10,
                  }}
                  className="mt-2 pb-32"
                  scrollEnabled={false}
                />
              </>
            )}
          </View>
        </View>
      </ScrollView>

      {/* <FlatList data={[1, 2, 3, 4, 5]} renderItem={() => <Text>Boy</Text>} /> */}
    </SafeAreaView>
  );
}

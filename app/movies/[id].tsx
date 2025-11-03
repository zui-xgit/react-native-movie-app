import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import {
  getMovieSavedRowId,
  isMovieSaved,
  removeSavedMovie,
  saveMovie,
} from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { router, useLocalSearchParams } from "expo-router";
import { Bookmark } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => {
  return (
    <>
      <View className="flex-col items-start justify-center mt-5">
        <Text className="text-light-200 font-normal">{label}</Text>
        <Text className="text-light-100 font-bold mt-2 text-base">
          {value || "N/A"}
        </Text>
      </View>
    </>
  );
};

const LoadingMovieDetails = () => {
  return (
    <>
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size={"large"} color={"#AB8BFF"} />
      </View>
    </>
  );
};

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [checkSavedStatusLoading, setCheckSavedSatusLoading] =
    useState<boolean>(false);

  const toast = (msg: string) => {
    if (Platform.OS === "android") {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    }
  };

  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string)
  );

  // useEffect hook for checking if the movie is saved
  useEffect(() => {
    if (!movie) {
      return;
    }
    const checkSavedStatus = async () => {
      try {
        setCheckSavedSatusLoading(true);
        const result = await isMovieSaved(movie!);
        if (result) {
          setIsSaved(true);
        } else {
          setIsSaved(false);
        }
      } catch (err: any) {
        Alert.alert("CheckSavedStatus: " + err.message);
      } finally {
        setCheckSavedSatusLoading(false);
      }
    };
    checkSavedStatus();
  }, [movie]);

  const handleSave = async () => {
    try {
      setCheckSavedSatusLoading(true);

      if (!isSaved) {
        await saveMovie(movie!);
        toast("saved");
        setIsSaved(true);
      } else {
        const rowId = await getMovieSavedRowId(movie!);
        await removeSavedMovie(rowId!);
        setIsSaved(false);
        toast("Removed from saved");
      }
    } catch (err: any) {
      Alert.alert("HandleSave error:  " + err.message);
    } finally {
      setCheckSavedSatusLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-primary relative">
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[560px]"
            resizeMode="cover"
          />
        </View>

        {loading ? (
          <>
            <LoadingMovieDetails />
          </>
        ) : (
          <>
            <View className="flex-col items-start justify-center mt-5 px-5  ">
              <View className=" w-full relative">
                <Text className="text-white font-bold text-xl  w-10/12">
                  {movie?.title}
                </Text>
                <TouchableOpacity
                  className=" absolute p-5 bg-dark-100 rounded-full right-0 top-0"
                  onPress={handleSave}
                >
                  {checkSavedStatusLoading ? (
                    <ActivityIndicator size={"small"} color={"#fff"} />
                  ) : (
                    <Bookmark
                      size={30}
                      color={"#fff"}
                      fill={isSaved ? "#AB8BFF" : "none"}
                    />
                  )}
                </TouchableOpacity>
              </View>
              <View className="flex-row  items-center gap-x-2 mt-2">
                <Text className="text-light-200 text-sm">
                  {movie?.release_date.split("-")[0]}
                </Text>
                <Text className="text-light-200 text-sm">
                  {movie?.runtime}m
                </Text>
              </View>
              <View className=" flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1  mt-2">
                <Image source={icons.star} className="size-4" />
                <Text className="text-white font-bold text-xs">
                  {Math.round(movie?.vote_average ?? 0)} / 10
                </Text>
                <Text className="text-light-200 text-sm ml-3">
                  {movie?.vote_count}-votes
                </Text>
              </View>

              {/* overview */}
              <MovieInfo label="Overview" value={movie?.overview} />
              {/* genre */}
              <MovieInfo
                label="Genre"
                value={
                  movie?.genres.map((genre) => genre.name).join(" - ") || "N/A"
                }
              />
              <View className="flex flex-row justify-between w-1/2 ">
                {/* budget */}

                <MovieInfo
                  label="Budget"
                  value={`$ ${(movie?.budget ?? 0) / 1_000_000} Million`}
                />
                {/* revenue */}
                <MovieInfo
                  label="Revenue"
                  value={`$ ${Math.round((movie?.revenue ?? 0) / 1_000_000)} Million`}
                />
              </View>

              {/* production companies */}
              <MovieInfo
                label="Production Companies"
                value={
                  movie?.production_companies
                    .map((company) => company.name)
                    .join(" - ") || "N/A"
                }
              />
            </View>
          </>
        )}
      </ScrollView>
      <View className="absolute bottom-7 w-full items-center jusitfy-center ">
        <TouchableOpacity
          className="bg-accent w-11/12 py-3.5 rounded-lg z-50 flex-row items-center justify-center "
          onPress={router.back}
        >
          <Image
            source={icons.arrow}
            className="rotate-180 size-5 mr-1 mt-0.5"
            tintColor={"#fff"}
          />
          <Text className="text-white font-semibold text-base">Go back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MovieDetails;

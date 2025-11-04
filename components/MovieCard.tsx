import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-[30%] relative">
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${poster_path}` }}
          className="w-full aspect-[2/3] rounded-lg"
          resizeMode="cover"
        />

        <Text className="text-white font-bold text-sm mt-2" numberOfLines={1}>
          {title}
        </Text>
        <View className="flex-row items-center justify-start gap-1">
          <Image source={icons.star} className="size-4 " />
          <Text className="text-white tex-xs font-bold uppercase">
            {Math.round(vote_average)}
          </Text>
        </View>
        <View className="flex-row items-center justify-between mt-1">
          <Text className="text-light-300 text-xs  font-medium ">
            {release_date?.split("-")[0]}
          </Text>
          <Text className="text-light-300 text-xs font-medium">Movie</Text>
        </View>
      </TouchableOpacity>
    </Link>

    // By using an aspect ratio, the image's height is always calculated
    // relative to the width, which is reliably set to w−full.
    //  This prevents the height from ever becoming 0 or invalid.
    // Corrected Code Snippet:
    // By switching to aspect-[2/3], you ensure that the image always
    //  has a valid height that scales perfectly with the 30% width you
    //  defined on the parent TouchableOpacity.
  );
};

export default MovieCard;

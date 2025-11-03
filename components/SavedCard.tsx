import { Link } from "expo-router";

import { Image, Text, TouchableOpacity } from "react-native";

interface SavedCardProps {
  movie_id: number;
  poster_url: string;
  title: string;
}

const SavedCard = ({ movie_id, poster_url, title }: SavedCardProps) => {
  return (
    <>
      <Link href={`/movies/${movie_id}`} asChild className="z-0">
        <TouchableOpacity className="w-[30%]  ">
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${poster_url}` }}
            resizeMode="cover"
            className=" w-full rounded-lg aspect-[2/3]"
          />
          <Text className="text-white font-bold text-sm mt-2" numberOfLines={1}>
            {title}
          </Text>
        </TouchableOpacity>
      </Link>
    </>
  );
};

export default SavedCard;

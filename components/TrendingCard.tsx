import { images } from "@/constants/images";
import MaskedView from "@react-native-masked-view/masked-view";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface Props {
  movie_id: number;
  poster_url: string;
  title: string;
  index: number;
}

const TrendingCard = ({ movie_id, poster_url, title, index }: Props) => {
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const handleSave = () => {
    setIsSaved(!isSaved);
  };
  return (
    <Link href={`/movies/${movie_id}`} asChild>
      <TouchableOpacity className="w-32 relative  ">
        <Image
          source={{ uri: poster_url }}
          className="w-40 h-56 rounded-lg"
          resizeMode="cover"
        />

        <View className="absolute bottom-12 -left-5 px-2 rounded-full">
          <MaskedView
            maskElement={
              <Text className="text-white font-bold text-6xl ">
                {index + 1}
              </Text>
            }
          >
            <Image
              source={images.rankingGradient}
              className="size-14"
              resizeMode="cover"
            />
          </MaskedView>
        </View>

        <Text
          className="text-sm font-bold mt-2 text-light-200 "
          numberOfLines={2}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;

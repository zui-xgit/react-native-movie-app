import { icons } from "@/constants/icons";
import React, { Ref } from "react";
import { Image, TextInput, View } from "react-native";

interface Props {
  placeholder: string;
  onPress?: () => void;
  value?: string;
  onChangeText?: (searchQuery: string) => void;
  inputRef?: Ref<TextInput>;
}

const SearchBar = ({
  value,
  onChangeText,
  onPress,
  placeholder,
  inputRef,
}: Props) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image
        source={icons.search}
        className="size-5"
        // resizeMode="contain"
        tintColor={"#ab8bff"}
      />

      <TextInput
        ref={inputRef}
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={"#a8b5db"}
        className="flex-1 ml-2 text-white"
      />
    </View>
  );
};

export default SearchBar;

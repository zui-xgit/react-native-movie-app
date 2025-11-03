import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { User } from "lucide-react-native";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const ProfileScreen = () => {
  return (
    <>
      <View className="flex-1 bg-primary relative">
        <Image source={images.bg} className="absolute w-full z-0" />
        <ScrollView
          className="flex-1 px-5 flex-col"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            minHeight: "100%",
            paddingBottom: 24,
          }}
        >
          <Image source={icons.logo} className=" w-12 h-10 mx-auto mt-16" />

          <View className="rounded-full mx-auto mt-5 w-28 h-28 bg-accent/20 flex items-center justify-center">
            <User size={40} color={"#fff"} className="bg-white" />
          </View>

          <View className=" mt-5 flex-col items-center justify-center">
            <Text className="font-bold text-light-200 text-xl">Guest User</Text>
            <Text className="text-light-100 text-sm">guest@example.com</Text>
          </View>

          <View className=" flex-row  w-full mt-5 gap-5">
            <View className="bg-accent/20 flex-1 py-4 rounded-md  flex-col items-center justify-center">
              <Text className="font-bold text-light-200 text-2xl">0</Text>
              <Text className="text-light-100 text-xs">Saved</Text>
            </View>
            <View className="bg-accent/20 flex-1 py-4 rounded-md  flex-col items-center justify-center">
              <Text className="font-bold text-light-200 text-2xl">0</Text>
              <Text className="text-light-100 text-xs">Watched</Text>
            </View>
            <View className="bg-accent/20 flex-1 py-4 rounded-md  flex-col items-center justify-center">
              <Text className="font-bold text-light-200 text-2xl">0</Text>
              <Text className="text-light-100 text-xs">Reviews</Text>
            </View>
          </View>

          <Text className="text-white mt-5 text-left font-bold  text-lg">
            Quick Action
          </Text>

          <View className="mt-3 flex-col gap-2">
            <TouchableOpacity className="bg-accent rounded-md py-3 items-center">
              <Text className="text-white font-bold">Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-dark-200 rounded-md py-3 items-center">
              <Text className="text-white font-bold">Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-dark-200 rounded-md py-3 items-center">
              <Text className="text-white font-bold">Edit Profile</Text>
            </TouchableOpacity>
          </View>

          <Text className="text-white mt-5 text-left font-bold  text-lg">
            Recenty Viewed
          </Text>
          <View className="mt-3 flex-row gap-2">
            <View className="w-24 aspect-[2/3] bg-dark-100 rounded-md"></View>
            <View className="w-24 aspect-[2/3] bg-dark-100 rounded-md"></View>
            <View className="w-24 aspect-[2/3] bg-dark-100 rounded-md"></View>
          </View>

          <View className="mt-5">
            <TouchableOpacity className="bg-dark-200 py-3 rounded-md items-center">
              <Text className="font-bold text-white">Log Out</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
};
export default ProfileScreen;

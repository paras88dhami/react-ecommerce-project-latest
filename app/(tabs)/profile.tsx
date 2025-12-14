import { User } from "@/types/type";
import { useQueryClient } from "@tanstack/react-query";
import { Text, View } from "react-native";

export default function Profile() {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(["loggedUser"]);

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-xl font-bold">
        Welcome, {user?.firstName} {user?.lastName}
      </Text>
    </View>
  );
}

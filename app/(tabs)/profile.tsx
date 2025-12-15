import { User } from "@/types/type";
import { useQueryClient } from "@tanstack/react-query";
import { Text, View } from "react-native";
import { router, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import  Button  from "@/components/button"; 

export default function Profile() {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(["loggedUser"]);
 const handleLogout = async () => {
    
    await AsyncStorage.removeItem("token");

    
    queryClient.removeQueries({ queryKey: ["loggedUser"] });
     router.replace("/(auth)/login");
    
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-xl font-bold">
        Welcome, {user?.firstName} {user?.lastName}
      </Text>
      <Button
       title="log out"
      onPress={handleLogout}
      className="w-half"
      />
    </View>
  );
}

import { View, Text, ActivityIndicator } from "react-native";
import SearchableDropdown from "@/components/SearchableDropdown";
import useGetHook from "@/hook/useGetHook";
import { UsersResponse } from "@/types/type";

export default function Home() {
  const { data, isLoading } = useGetHook<UsersResponse>({
    queryKey: ["users"],
    url: "/users",
  });


const dropdownUsers =
  data?.users?.map((user) => ({
    id: user.id,
    label: `${user.firstName} ${user.lastName}`,
  })) ?? [];


  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
        <Text className="mt-4 text-gray-600">Loading users list...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-4">
      <Text className="mb-2 font-semibold">Select User</Text>

      <SearchableDropdown
        data={dropdownUsers}
        placeholder="Choose a user"
        onSelect={(item) => {
          console.log("Selected dropdown item:", item);

      
       
        }}
      />
    </View>
  );
}

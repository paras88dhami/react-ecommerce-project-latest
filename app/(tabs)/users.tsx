import { GET_USERS } from "@/graphql/query";
import { GetUsersData, GetUsersVars } from "@/types/apolloTypes";
import { useQuery } from "@apollo/client/react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";



export default function UsersScreen() {
  const { data, loading, error } = useQuery<GetUsersData, GetUsersVars>(
    GET_USERS,
    {
      variables: { limit: 10 }, 
    }
  );

  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} />;
  if (error) return <Text>Error: {error.message}</Text>;
  if (!data) return <Text>No users found</Text>;

  return (
    <FlatList
      data={data.users.data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{ padding: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>
            {item.name}
          </Text>
          <Text style={{ color: "gray" }}>
            @{item.username}
          </Text>
          <Text>{item.email}</Text>
        </View>
      )}
    />
  );
}

import { DataTable } from "@/components/DataTable";
import useGetHook from "@/hook/useGetHook";
import { User, UsersResponse } from "@/types/type";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const usertable = () => {
  const { data, isLoading } = useGetHook<UsersResponse>({
    queryKey: ["users"],
    url: "/users",
    
  });
  


  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
        <Text className="mt-4 text-gray-600">Loading users list...</Text>
      </View>
    );
  }

const columns: ColumnDef<User>[] = [
  { header: "Id", accessorKey: "id" },
  { header: "Name", accessorKey: "name" },
  { header: "Email", accessorKey: "email" },
  { header: "Password", accessorKey: "password" },
  { header: "Role", accessorKey: "role" },
  { header: "Avatar", accessorKey: "avatar" },
];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="items-center mt-4">
        <Text className="font-bold text-xl">Users Table</Text>
      </View>

      {data?.users?.length === 0 ? (
        <Text className="text-center mt-4">No users found.</Text>
      ) : (
        <DataTable data={data?.users??[]} columns={columns} />
      )}
    </SafeAreaView>
  );
};

export default usertable;

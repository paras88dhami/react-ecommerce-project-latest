import { DataTable } from "@/components/dataTable";
import { searchVar } from "@/components/localState/search/Cache";
import { SearchInput } from "@/components/localState/search/searchInput";

import useGetHook from "@/hook/useGetHook";
import { User, UsersResponse } from "@/types/type";

import { useReactiveVar } from "@apollo/client";
import { ColumnDef } from "@tanstack/react-table";
import React, { useMemo } from "react";

import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const UserTable = () => {
  const searchText = useReactiveVar(searchVar);

  const { data, isLoading } = useGetHook<UsersResponse>({
    queryKey: ["users"],
    url: "/users",
  });

  const columns: ColumnDef<User>[] = [
    { header: "Id", accessorKey: "id" },
    { header: "Name", accessorKey: "name" },
    { header: "Email", accessorKey: "email" },
    { header: "Password", accessorKey: "password" },
    { header: "Role", accessorKey: "role" },
    { header: "Avatar", accessorKey: "avatar" },
  ];

  const filteredUsers = useMemo(() => {
    if (!searchText) return data?.users ?? [];

    const query = searchText.toLowerCase();

    return (data?.users ?? []).filter((user) =>
      user.firstName?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query) ||
      user.role?.toLowerCase().includes(query)
    );
  }, [data?.users, searchText]);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
        <Text className="mt-4 text-gray-600">Loading users list...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="px-4 mt-4">
        <SearchInput
          value={searchText}
          placeholder="Search users..."
          onChange={(text: string) => searchVar(text)}
        />
      </View>

      <View className="items-center mt-4">
        <Text className="font-bold text-xl">Users Table</Text>
      </View>

      {filteredUsers.length === 0 ? (
        <Text className="text-center mt-6 text-gray-500">
          No users found.
        </Text>
      ) : (
        <DataTable data={filteredUsers} columns={columns} />
      )}
    </SafeAreaView>
  );
};

export default UserTable;

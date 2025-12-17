import React, { useState } from "react";
import {
  FlatList,
  ActivityIndicator,
  Text,
  View,
  Pressable,
} from "react-native";
import { useForm } from "react-hook-form";

import { useUsers } from "@/hook/apolloMutation/useUsers";
import { useCreateUser } from "@/hook/apolloMutation/useCreateUser";
import { useUpdateUser } from "@/hook/apolloMutation/useUpdateUser";
import { useDeleteUser } from "@/hook/apolloMutation/useDeleteUser";

import UserForm from "@/components/useForm";
import UserRow from "@/components/userRow";
import { UserItem } from "@/types/apolloTypes";

export default function UsersScreen() {
  const { data, loading, error } = useUsers();
  const [createUser] = useCreateUser();
  const [updateUser] = useUpdateUser();
  const [deleteUser] = useDeleteUser();

  const form = useForm();
  const [editingUser, setEditingUser] = useState<UserItem | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  if (loading)
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );

  if (error)
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-500">Error loading users</Text>
      </View>
    );

  return (
    <FlatList
      data={data?.users.data ?? []}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingBottom: 40 }}
      className="bg-gray-100"
      ListHeaderComponent={
        <View className="p-4">
          {/* TITLE */}
          <Text className="text-2xl font-bold mb-4 text-gray-800">
            Users
          </Text>

          {/* CREATE BUTTON */}
          {!editingUser && (
            <Pressable
              onPress={() => {
                setShowCreateForm((prev) => !prev);
                form.reset();
              }}
              className={`rounded-xl py-3 mb-4 ${
                showCreateForm ? "bg-gray-400" : "bg-blue-600"
              }`}
            >
              <Text className="text-white text-center font-semibold">
                {showCreateForm ? "Cancel" : "Create User"}
              </Text>
            </Pressable>
          )}

          {/* CREATE FORM */}
          {showCreateForm && !editingUser && (
            <View className="bg-white rounded-xl p-4 mb-6 shadow">
              <Text className="text-lg font-semibold mb-3 text-gray-700">
                New User
              </Text>

              <UserForm
                control={form.control}
                submitLabel="Create User"
                onSubmit={form.handleSubmit(async (values) => {
                  await createUser({
                    variables: {
                      input: {
                        ...values,
                        address: {
                          street: "Test Street",
                          city: "Kathmandu",
                          zipcode: "44600",
                        },
                      },
                    },
                  });

                  form.reset();
                  setShowCreateForm(false);
                })}
              />
            </View>
          )}

          {/* EDIT FORM */}
          {editingUser && (
            <View className="bg-white rounded-xl p-4 mb-6 shadow">
              <Text className="text-lg font-semibold mb-3 text-gray-700">
                Edit User
              </Text>

              <UserForm
                control={form.control}
                submitLabel="Save Changes"
                onSubmit={form.handleSubmit(async (values) => {
                  await updateUser({
                    variables: {
                      id: editingUser.id,
                      input: {
                        name: values.name,
                        username: values.username,
                        email: values.email,
                      },
                    },
                  });

                  setEditingUser(null);
                  form.reset();
                })}
              />

              <Pressable
                onPress={() => {
                  setEditingUser(null);
                  form.reset();
                }}
                className="mt-3"
              >
                <Text className="text-gray-500 text-center">
                  Cancel Edit
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      }
      renderItem={({ item }) => (
        <View className="px-4">
          <View className="bg-white rounded-xl mb-3 shadow-sm">
            <UserRow
              user={item}
              onEdit={() => {
                setEditingUser(item);
                setShowCreateForm(false);

                form.reset({
                  name: item.name,
                  username: item.username,
                  email: item.email,
                });
              }}
              onDelete={() =>
                deleteUser({
                  variables: { id: item.id },
                })
              }
            />
          </View>
        </View>
      )}
    />
  );
}

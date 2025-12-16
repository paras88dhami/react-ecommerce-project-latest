import React, { useState } from "react";
import { FlatList, ActivityIndicator, Text, View, Pressable } from "react-native";
import { useForm } from "react-hook-form";

import { useUsers } from "@/hook/apolloMutation/useUsers";
import { useCreateUser } from "@/hook/apolloMutation/useCreateUser";
import { useUpdateUser } from "@/hook/apolloMutation/useUpdateUser";
import { useDeleteUser } from "@/hook/apolloMutation/useDeleteUser";

import UserForm from "@/components/useForm";
import UserRow from "@/components/UserRow";
import { UserItem } from "@/types/apolloTypes";

export default function UsersScreen() {
  const { data, loading, error } = useUsers();
  const [createUser] = useCreateUser();
  const [updateUser] = useUpdateUser();
  const [deleteUser] = useDeleteUser();

  const form = useForm();
  const [editingUser, setEditingUser] = useState<UserItem | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error loading users</Text>;

  return (
    <FlatList
      data={data?.users.data ?? []}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 16 }}
      ListHeaderComponent={
        <>
          {/* CREATE BUTTON */}
          {!editingUser && (
            <Pressable
              onPress={() => {
                setShowCreateForm((prev) => !prev);
                form.reset();
              }}
              style={{
                backgroundColor: "#2563eb",
                padding: 12,
                borderRadius: 8,
                marginBottom: 12,
              }}
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                {showCreateForm ? "Cancel" : "Create User"}
              </Text>
            </Pressable>
          )}

          {/* CREATE FORM */}
          {showCreateForm && !editingUser && (
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
          )}

          {/* EDIT FORM */}
          {editingUser && (
            <View>
              <Text style={{ fontWeight: "700", marginBottom: 8 }}>
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
              >
                <Text style={{ color: "gray", marginTop: 8 }}>Cancel Edit</Text>
              </Pressable>
            </View>
          )}
        </>
      }
      renderItem={({ item }) => (
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
      )}
    />
  );
}

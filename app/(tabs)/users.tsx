import React from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useQuery, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";

import { GET_USERS } from "@/graphql/query";
import { CREATE_USER } from "@/graphql/mutation";
import { GetUsersData, GetUsersVars } from "@/types/apolloTypes";
import UserForm from "@/components/useForm";

export default function UsersScreen() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data, loading, error, refetch } = useQuery<
    GetUsersData,
    GetUsersVars
  >(GET_USERS, {
    variables: { limit: 10 },
  });

  const [createUser, { loading: creating }] = useMutation(CREATE_USER, {
    onCompleted: () => {
      refetch();
      reset();
    },
  });

  const onCreateUser = async (formData: any) => {
    await createUser({
      variables: {
        input: {
          name: formData.name,
          username: formData.username,
          email: formData.email,
          address: {
            street: "Test Street",
            city: "Kathmandu",
            zipcode: "44600",
          },
        },
      },
    });
  };

  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} />;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <FlatList
      data={data?.users.data}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 16 }}
      ListHeaderComponent={
        <View>
          <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 12 }}>
            Create User
          </Text>

          <UserForm
            control={control}
            errors={errors}
            loading={creating}
            submitLabel="Create User"
            onSubmit={handleSubmit(onCreateUser)}
            fields={[
              { name: "name", label: "Name", placeholder: "Full name" },
              { name: "username", label: "Username", placeholder: "Username" },
              {
                name: "email",
                label: "Email",
                placeholder: "Email",
                keyboardType: "email-address",
              },
            ]}
          />

          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              marginVertical: 16,
            }}
          >
            Users
          </Text>
        </View>
      }
      renderItem={({ item }) => (
        <View style={{ paddingVertical: 10 }}>
          <Text style={{ fontWeight: "600" }}>{item.name}</Text>
          <Text style={{ color: "gray" }}>@{item.username}</Text>
          <Text>{item.email}</Text>
        </View>
      )}
    />
  );
}

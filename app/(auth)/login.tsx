import React from "react";
import { View, Text } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";

import RegisterForm from "../../components/RegisterForm";
import { userSchema, UserInputs } from "../../utils/userSchema";

export default function Login() {
  const { control, handleSubmit, formState: { errors } } =
    useForm<UserInputs>({
      resolver: zodResolver(userSchema),
    });

  const onSubmit = (data: UserInputs) => {
    console.log("Form submitted:", data);
    router.replace("../(tabs)/products");

  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-100">
      <Text className="text-3xl font-bold text-center text-blue-600 mb-6">
        Login
      </Text>
      <RegisterForm
        control={control}
        errors={errors}
        onSubmit={handleSubmit(onSubmit)}
      />
    </View>
  );
}

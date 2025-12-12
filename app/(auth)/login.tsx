import usePostHook from "@/hook/usePostHook";
import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import RegisterForm from "../../components/RegisterForm";
import { UserInputs, userSchema } from "../../utils/userSchema";



export default function Login() {
  const router = useRouter();
  const [loginError, setLoginError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInputs>({
    resolver: zodResolver(userSchema),
  });

  const { mutateAsync, isError, isLoading } =
    usePostHook<{ token?: string; accessToken?: string; access_token?: string; refreshToken?: string }>({
      url: "/auth/login",
    });

  const onSubmit = async (data: UserInputs) => {
    console.log(data)
    try {
      const res = await mutateAsync({
        username: data.email,
        email: data.email,
        password: data.password,
      });
      console.log("Login successful:", res);
      const token = res?.token ?? res?.accessToken ?? res?.access_token ?? res?.refreshToken;
      if (token) {
        await AsyncStorage.setItem("token", token);
      }
      // Navigate to products already if mutation succeeded
      router.replace("/(tabs)/products");
      setLoginError(null);

    } catch (err: any) {
      console.log("Login failed:", err);
      setLoginError(err?.message ?? "Login failed");
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-100">
      <Text className="text-3xl font-bold text-blue-600 mb-6">
        Login
      </Text>

      <RegisterForm
        control={control}
        errors={errors}
        onSubmit={handleSubmit(onSubmit)}
        loading={isLoading}
      />

      {loginError && (
        <Text className="text-red-500 mt-3">{loginError}</Text>
      )}
    </View>
  );
}



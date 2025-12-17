import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import RegisterForm from "../../components/registerForm";
import { UserInputs, userSchema } from "../../utils/userSchema";
import useGetHook from "@/hook/useGetHook";
import { UsersResponse } from "@/types/type";

export default function Login() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [loginError, setLoginError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInputs>({
    resolver: zodResolver(userSchema),
  });

 
 

  const { data: usersData, isLoading } = useGetHook<UsersResponse>({
    queryKey: ["users"],
    url: "/users",
  });

  const onSubmit = async (data: UserInputs) => {
    
    if (!usersData?.users) return;

    
  const foundUser = usersData?.users.find(
  (user) =>
    user.email === data.email &&
    user.password === data.password
);

  
    if (!foundUser) {
      setLoginError("Invalid email or password");
      return;
    }


    await AsyncStorage.setItem("token", "fake-token");

  
    queryClient.setQueryData(["loggedUser"], foundUser);


  router.replace("/(tabs)/products");

    setLoginError(null);
  };

  return (
    <View className="flex-1 justify-center items-center w-full h-full bg-gray-100">
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
        <Text className="text-red-500 mt-3">
          {loginError}
        </Text>
      )}
    </View>
  );
}



























































// export default function Login() {

//   const router = useRouter();
//   const [loginError, setLoginError] = useState<string | null>(null);
//   const queryClient = useQueryClient();

//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<UserInputs>({
//     resolver: zodResolver(userSchema),
//   });

//   const { mutateAsync, isError, isLoading } =
//     usePostHook<{ token?: string; accessToken?: string; access_token?: string; refreshToken?: string }>({
//       url: "/auth/login",
//     });
  

//   const onSubmit = async (data: UserInputs) => {
//     console.log(data)
//     try {
//       const res = await mutateAsync({
//         username: data.email,
//         email: data.email,
//         password: data.password,
//       });
//       console.log("Login successful:", res);
//       const token = res?.token ?? res?.accessToken ?? res?.access_token ?? res?.refreshToken;
//       if (token) {
//         await AsyncStorage.setItem("token", token);
//       }
//       const loggedUser = res?.user ?? {
//       name: data.email.split("@")[0], 
//       email: data.email,
//     };

//     queryClient.setQueryData(["loggedUser"], loggedUser);
      
//       router.replace("/(tabs)/products");
//       setLoginError(null);

//     } catch (err: any) {
//       console.log("Login failed:", err);
//       setLoginError(err?.message ?? "Login failed");
//     }
//   };





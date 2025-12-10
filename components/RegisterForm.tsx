import React from "react";
import { View, Text, TextInput } from "react-native";
import { Controller } from "react-hook-form";
import Button from "./button"; 

interface RegisterFormProps {
  control: any;
  errors: any;
  onSubmit: () => void;
}

export default function RegisterForm({ control, errors, onSubmit }: RegisterFormProps) {
  return (
    <View className="px-6 py-8 bg-white rounded-2xl shadow-lg mx-5">
      
      <Text className="text-gray-700 text-base mb-1">Email</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            placeholder="Email"
            keyboardType="email-address"
            className="border border-gray-300 rounded-lg px-4 py-2 mb-2 focus:border-blue-500"
          />
        )}
      />
      {errors.email && (
        <Text className="text-red-500 text-sm mb-2">{errors.email.message}</Text>
      )}

      
      <Text className="text-gray-700 text-base mb-1">Password</Text>
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            placeholder="Password"
            secureTextEntry
            className="border border-gray-300 rounded-lg px-4 py-2 mb-2 focus:border-blue-500"
          />
        )}
      />
      {errors.password && (
        <Text className="text-red-500 text-sm mb-2">{errors.password.message}</Text>
      )}

     
      <Text className="text-gray-700 text-base mb-1">Confirm Password</Text>
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            placeholder="Confirm Password"
            secureTextEntry
            className="border border-gray-300 rounded-lg px-4 py-2 mb-2 focus:border-blue-500"
          />
        )}
      />
      {errors.confirmPassword && (
        <Text className="text-red-500 text-sm mb-2">{errors.confirmPassword.message}</Text>
      )}

     
      <Button title="Submit" onPress={onSubmit} />
    </View>
  );
}

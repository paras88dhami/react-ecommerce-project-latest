import React from "react";
import { Controller } from "react-hook-form";
import { Text, TextInput, View } from "react-native";
import Button from "./button";

type Field = {
  name: string;
  label: string;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address";
};

interface UserFormProps {
  control: any;
  errors: any;
  onSubmit: () => void;
  loading?: boolean;
  fields: Field[];
  submitLabel?: string;
}

export default function UserForm({
  control,
  errors,
  onSubmit,
  loading = false,
  fields,
  submitLabel = "Submit",
}: UserFormProps) {
  return (
    <View className="px-6 py-8 bg-white rounded-2xl shadow-lg mx-5">
      {fields.map((field) => (
        <View key={field.name}>
          <Text className="text-gray-700 text-base mb-1">
            {field.label}
          </Text>

          <Controller
            control={control}
            name={field.name}
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder={field.placeholder}
                secureTextEntry={field.secureTextEntry}
                keyboardType={field.keyboardType || "default"}
                className="border border-gray-300 rounded-lg px-4 py-2 mb-2"
              />
            )}
          />

          {errors[field.name] && (
            <Text className="text-red-500 text-sm mb-2">
              {errors[field.name]?.message}
            </Text>
          )}
        </View>
      ))}

      <Button
        title={loading ? "Submitting..." : submitLabel}
        onPress={onSubmit}
        disabled={loading}
      />
    </View>
  );
}

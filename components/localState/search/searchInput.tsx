import React from "react";
import { TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
type SearchInputProps = {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
};

export function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
}: SearchInputProps) {
  return (
    // <View className="px-4 py-3 bg-gray-100 ">
      <View  className="flex-row items-center bg-white rounded-xl border border-blue-200 mx-4  px-4 shadow-sm">
        <Ionicons name="search" size={20} color="#021e4dff" />
      <TextInput
        defaultValue={value}
        placeholder={placeholder}
        onChangeText={onChange}
        className="flex-1 px-3 py-3  text-base text-gray-800"
      />
      {/* </View> */}
    </View>
  );
}
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { TextInput, View } from "react-native";

import { searchVar } from "@/components/localState/search/Cache";
import { useDebouncedValue } from "@/components/Debounceforsearch";

type SearchInputProps = {
  placeholder?: string;
  value: string;
  onChange: (text: string) => void;
};
export function SearchInput({
  placeholder = "Search...",
  value,
  onChange,
}: SearchInputProps) {
  const debouncedSearch = useDebouncedValue(value, 500);

  useEffect(() => {
    searchVar(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <View className="flex-row px-4 py-3 items-center m-2 border border-gray-300 rounded-lg bg-white">
      <AntDesign name="search" size={22} color="gray" />
      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={onChange}
        className="flex-1 h-7 ml-2"
      />
    </View>
  );
}

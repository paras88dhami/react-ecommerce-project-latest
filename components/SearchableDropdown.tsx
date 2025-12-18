import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  Keyboard,
} from "react-native";

type Item = {
  id: number;
  label: string;
};

interface Props {
  data: Item[];
  placeholder?: string;
  onSelect: (item: Item) => void;
}

export default function SearchableDropdown({
  data,
  placeholder = "Select item",
  onSelect,
}: Props) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const filteredData = data.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (item: Item) => {
    setQuery(item.label);
    setOpen(false);
    Keyboard.dismiss();
    onSelect(item);
  };

  return (
    <>
     
      {open && (
        <Pressable
    className="absolute inset-0 z-40"
    onPress={() => {
      setOpen(false);
      Keyboard.dismiss();
    }}
  />
)}

     
      <View className="relative z-50">
       
        <TextInput
          value={query}
          placeholder={placeholder}
          onFocus={() => setOpen(true)}
          onChangeText={(text) => {
            setQuery(text);
            setOpen(true);
          }}
          className="border border-gray-300 rounded-lg px-4 py-3 bg-white"
        />

    
        {open && (
          <View className="absolute top-14 left-0 right-0 bg-white border border-gray-300 rounded-lg max-h-48">
            <FlatList
              keyboardShouldPersistTaps="handled"
              data={filteredData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => handleSelect(item)}
                  className="px-4 py-3 border-b border-gray-200"
                >
                  <Text>{item.label}</Text>
                </Pressable>
              )}
              ListEmptyComponent={
                <Text className="px-4 py-3 text-gray-400">
                  No results
                </Text>
              }
            />
          </View>
        )}
      </View>
    </>
  );
}

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
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const filteredData = data.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (item: Item) => {
    setQuery(item.label);
    setSelectedId(item.id);
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
          className="
            border border-gray-300
            rounded-xl
            px-4 py-3
            text-base
            bg-white
            text-gray-900
            shadow-sm
            focus:border-blue-500
          "
        />


        {open && (
          <View
            className="
              absolute top-14 left-0 right-0
              bg-white
              border border-gray-200
              rounded-xl
              max-h-60
              shadow-lg
              overflow-hidden
            "
          >
            <FlatList
              keyboardShouldPersistTaps="handled"
              data={filteredData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => {
                const isSelected = item.id === selectedId;

                return (
                  <Pressable
                    onPress={() => handleSelect(item)}
                    className={`
                      px-4 py-3
                      ${isSelected ? "bg-blue-50" : "bg-white"}
                      active:bg-gray-100
                    `}
                  >
                    <Text
                      className={`
                        text-base
                        ${isSelected ? "text-blue-700 font-medium" : "text-gray-800"}
                      `}
                    >
                      {item.label}
                    </Text>
                  </Pressable>
                );
              }}
              ListEmptyComponent={
                <Text className="px-4 py-4 text-center text-gray-400 text-sm">
                  No matching results
                </Text>
              }
            />
          </View>
        )}
      </View>
    </>
  );
}

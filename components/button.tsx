import React from "react";
import { TouchableOpacity, Text,Alert } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  className?: string; 
}

export default function Button({ title, onPress, className = "" }: ButtonProps) {
  return (
    <TouchableOpacity
         onPress={() => {
        Alert.alert("Button clicked", title); 
        onPress(); 
      }}
      className={`bg-blue-600 py-4 px-8 rounded-2xl mt-4 shadow-lg ${className}`}
    >
      <Text className="text-white text-center font-semibold text-lg">{title}</Text>
    </TouchableOpacity>
  );
}

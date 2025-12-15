import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  className?: string;
  disabled?: boolean;
}

export default function Button({ title, onPress, className = "", disabled = false }: ButtonProps) {
  const handlePress = () => {
    if (disabled) return;
    try {
      
      onPress?.();
    } catch (err) {
      console.error("Button onPress error:", err);
    
    }
  };

  const combinedClassName = `${disabled ? "bg-gray-400" : "bg-blue-600"} py-4 px-8 rounded-2xl mt-4 shadow-lg ${className}`;

  return (
    <TouchableOpacity
      onPress={handlePress}
      accessibilityRole="button"
      testID="app-button"
      className={combinedClassName}
      activeOpacity={disabled ? 1 : 0.7}
      disabled={disabled}
    >
      <Text className="text-white text-center font-semibold text-lg">{title}</Text>
    </TouchableOpacity>
  );
}

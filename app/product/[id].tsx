import useProducts from "@/hook/useProducts";
import { Product, useCartStore } from "@/store/store";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import Button from "../../components/button";

export default function ProductDetails() {
  const { id } = useLocalSearchParams();

  const addToCart = useCartStore((state) => state.addToCart);

  const { data: product, isLoading, error } = useProducts<Product>({
    queryKey: ["product", id],
    url: `/products/${id}`,
  });

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading product...</Text>
      </View>
    );
  }

  if (error || !product) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Error loading product.</Text>
      </View>
    );
  }

  return (
    <ScrollView className="p-5 bg-gray-100">
      <Image
        source={{ uri: product.image }}
        className="w-full h-64 mb-4"
        resizeMode="contain"
      />

      <Text className="text-2xl font-bold mb-2">{product.title}</Text>
      <Text className="text-blue-600 font-bold mb-4">${product.price}</Text>

      <Text className="text-gray-700 mb-4">{product.description}</Text>

      <Button
        title="Add to Cart"
        onPress={() => addToCart(product)}
        className="w-full"
      />

      <Button title="Back" onPress={() => router.back()} className="w-full" />
    </ScrollView>
  );
}

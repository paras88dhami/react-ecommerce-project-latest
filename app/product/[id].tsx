import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

import { Product } from "../../store/store";
import Button from "../../components/button";
import { useCartStore } from "../../store/store";
import { useProducts } from "../../hook/useProducts";

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<Product | null>(null);

  const addToCart = useCartStore((state) => state.addToCart);

  const { data, isLoading, error, isFetching } = useProducts();


  useEffect(() => {
    if (data && id) {
      const found = data.find((p) => p.id.toString() === id);
      setProduct(found || null);
    }
  }, [data, id]);

  
  if (isLoading || isFetching || !product) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading product...</Text>
      </View>
    );
  }

  
  if (error) {
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

      <Button
        title="Back"
        onPress={() => router.back()}
        className="w-full mb-4"
      />
    </ScrollView>
  );
}

import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams, router } from "expo-router"; 
import { getSingleProduct } from "../../api/productapi";
import { Product } from "../store/store";
import Button from "../../components/button";
import { useCartStore } from "../store/store";

export default function ProductDetails() {
  const { id } = useLocalSearchParams(); 
  const [product, setProduct] = useState<Product | null>(null);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const res = await getSingleProduct(Number(id));
        setProduct(res);
        
        console.log("res", res);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product)
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading product...</Text>
      </View>
    );

  return (
    
    <ScrollView className="p-5 bg-gray-100">
      <Image
        source={{ uri: product.image }}
        className="w-full h-64 mb-4"
        resizeMode="contain"
      />
      <Text className="text-2xl font-bold mb-2">{product.title}</Text>
      <Text className="text-blue-600 font-bold mb-4">${product.price}</Text>
      <Text className="text-gray-700 mb-4">
       
      {product.description}
      </Text>

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

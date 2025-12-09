import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image } from "react-native";
import api from "../../api/api";
import { useCartStore, Product } from "../store/store";
import { router } from "expo-router";
import Button from "../../components/button"; 

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    api
      .get("/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const renderItem = ({ item }: { item: Product }) => (
    <View className="bg-white rounded-2xl shadow-md p-4 mb-4 mx-4 items-center">
      <Image
        source={{ uri: item.image }}
        className="w-32 h-32 mb-4 rounded-lg"
        resizeMode="contain"
      />
      <Text className="text-lg font-semibold text-gray-800 mb-1 text-center">
        {item.title}
      </Text>
      <Text className="text-blue-600 font-bold mb-4 text-center">${item.price}</Text>

      <Button
        title="Add to Cart"
        onPress={() => {
          addToCart(item);
          router.push("../(tabs)/cart"); 
        }}
      />
    </View>
  );

  if (loading)
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-gray-500 text-lg">Loading products...</Text>
      </View>
    );

  return (
    <FlatList
      contentContainerStyle={{ paddingVertical: 10 }}
      data={products}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      className="bg-gray-100"
    />
  );
}

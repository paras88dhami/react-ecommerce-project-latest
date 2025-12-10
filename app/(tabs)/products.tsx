import React, { useCallback, useState } from "react";
import { View, Text, FlatList, Image, RefreshControl } from "react-native";
import { useCartStore, Product } from "../../store/store";
import { router } from "expo-router";
import Button from "../../components/button";
import { useProducts } from "../../hook/useProducts";
import { Pressable } from "react-native"; 


export default function Products() {
  const addToCart = useCartStore((state) => state.addToCart);

  const { data: products, isLoading, error, refetch, isFetching } = useProducts();

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

 
  const renderItem = ({ item }: { item: Product }) => (
    <Pressable
    onPress={() => router.push({
  pathname: "/product/[id]",
  params: { id: item.id.toString() },
})} 
    
  >
    <View className="bg-white rounded-3x2 shadow-md p-4 mb-4 mx-4 items-center">
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
          
        }}
      />
    </View>
    </Pressable>
  );

  
  if (isLoading)
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-gray-500 text-lg">Loading products...</Text>
      </View>
    );

 
  if (error instanceof Error)
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-red-500 text-lg">{error.message}</Text>
        <Button title="Retry" onPress={() => refetch()} />
      </View>
    );

  return (
    <FlatList
      contentContainerStyle={{ paddingVertical: 10 }}
       data={products ?? []} 
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      className="bg-gray-100"
      refreshControl={
        <RefreshControl refreshing={refreshing || isFetching} onRefresh={handleRefresh} />
      }
    />
  );
}

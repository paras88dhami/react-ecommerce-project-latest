import Button from "@/components/button";
import useProducts from "@/hook/useProducts";
import { Product, useCartStore } from "@/store/store";
import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, Image, Pressable, RefreshControl, Text, View } from "react-native";

export default function Products() {
  const addToCart = useCartStore((state) => state.addToCart);

  const limit = 5; 
  const [page, setPage] = useState(1);

  const { data: products, isLoading, isFetching, error, refetch } = useProducts<Product[]>({
    queryKey: ["products"],
    url: "/products",
  });

  const [refreshing, setRefreshing] = useState(false);

 
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    setPage(1); 
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  
  const displayedProducts = products?.slice(0, page * limit) ?? [];

 
  const handleLoadMore = () => {
    if (products && displayedProducts.length < products.length) {
      setPage((prev) => prev + 1);
    }
  };

  const renderItem = ({ item }: { item: Product }) => (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/product/[id]",
          params: { id: item.id.toString() },
        })
      }
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

        <Button title="Add to Cart" onPress={() => addToCart(item)} />
      </View>
    </Pressable>
  );

  if (isLoading)
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" />
        <Text className="text-gray-500 text-lg mt-2">Loading products...</Text>
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
      data={displayedProducts}
      contentContainerStyle={{ paddingVertical: 10 }}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      className="bg-gray-100"
      refreshControl={
        <RefreshControl refreshing={refreshing || isFetching} onRefresh={handleRefresh} />
      }
      ListFooterComponent={
        <>
          {displayedProducts.length < (products?.length ?? 0) && (
            <View className="p-5 pt-0">
              <Button title="Load More" onPress={handleLoadMore} />
            </View>
          )}

          {displayedProducts.length >= (products?.length ?? 0) && products?.length > 0 && (
            <Text className="text-center text-gray-500 py-6">
              That's all bro...💀💀💀
            </Text>
          )}
        </>
      }
      ListEmptyComponent={
        <Text className="text-center text-gray-500 py-10">No products found</Text>
      }
    />
  );
}

import Button from "@/components/button";
import useGethook from "@/hook/useGetHook";
import { Product, useCartStore } from "@/store/store";
import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  Text,
  View,
} from "react-native";

export default function Products() {
  const addToCart = useCartStore((state) => state.addToCart);

  const limit = 5;
  const [page, setPage] = useState(1);

  const skip = (page - 1) * limit;

   const [allProducts, setAllProducts] = useState<Product[]>([]);

  const {
    data: productsResponse,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGethook<{ products: Product[]; total: number; skip?: number; limit?: number }>({
    queryKey: ["products", page, limit],
    url: `/products?limit=${limit}&skip=${skip}`,
  });

  const [refreshing, setRefreshing] = useState(false);

  const products = productsResponse?.products ?? [];

  
  useEffect(() => {
    if (products) {
      setAllProducts((prev) => (page === 1 ? products : [...prev, ...products]));
    }
  }, [products, page]);

 
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    setPage(1);
    await refetch();
    setRefreshing(false);
  }, [refetch]);


  const handleLoadMore = () => {
    if (!isFetching && productsResponse && allProducts.length < (productsResponse.total ?? 0)) {
      setPage((prev) => prev + 1);
    }
  };

 
  const hasMore = !!productsResponse && allProducts.length < (productsResponse.total ?? 0);

  const renderItem = ({ item }: { item: Product }) => {
    const imageUri = item.thumbnail ?? item.image ?? item.images?.[0];
    const source = imageUri
      ? { uri: imageUri }
      : require("../../assets/images/partial-react-logo.png");

    return (
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
          source={source}
          className="w-32 h-32 mb-4 rounded-lg"
          resizeMode="contain"
        />
        <Text className="text-lg font-semibold text-gray-800 mb-1 text-center">
          {item.title}
        </Text>
        <Text className="text-blue-600 font-bold mb-4 text-center">
          ${item.price}
        </Text>

        <Button title="Add to Cart" onPress={() => addToCart(item)} />
      </View>
    </Pressable>
  );
  };

  // Loading Screen
  if (isLoading && page === 1)
    return (        
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" />
        <Text className="text-gray-500 text-lg mt-2">Loading products...</Text>
      </View>
    );

  // Error Screen
  if (error && error instanceof Error)
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-red-500 text-lg">{error?.message}</Text>
        <Button title="Retry" onPress={() => refetch()} />
      </View>
    );

  return (
    <FlatList
      data={allProducts}
      contentContainerStyle={{ paddingVertical: 10 }}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      className="bg-gray-100"
      refreshControl={
        <RefreshControl
          refreshing={refreshing || isFetching}
          onRefresh={handleRefresh}
        />
      }
      ListFooterComponent={
        <>
          {/* Load More button */}
          {!isFetching && hasMore && allProducts.length > 0 && (
            <View className="p-5 pt-0">
              <Button title="Load More" onPress={handleLoadMore} disabled={isFetching} />
            </View>
          )}

          {/* No more products */}
          {!hasMore && allProducts.length > 0 && (
            <Text className="text-center text-gray-500 py-6">
              That's all the products we have!
            </Text>
          )}
        </>
      }
      ListEmptyComponent={
        <Text className="text-center text-gray-500 py-10">
          No products found
        </Text>
      }
    />
  );
}

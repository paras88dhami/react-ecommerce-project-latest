import Button from "@/components/button";
import useGethook from "@/hook/useGetHook";
import { Product, useCartStore } from "@/store/store";
import { useReactiveVar } from "@apollo/client";
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

import { searchVar } from "@/components/localState/search/Cache";
import { debouncedWriteSearch } from "@/components/localState/search/debouncedSearch";
import { SearchInput } from "@/components/localState/search/searchInput";

export default function Products() {
  const addToCart = useCartStore((state) => state.addToCart);
  const searchText = useReactiveVar(searchVar);

  const limit = 6;
  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  /* Reset page when search changes */
  useEffect(() => {
    setPage(1);
  }, [searchText]);

  /* Fetch products */
  const {
    data: productsResponse,
    isFetching,
    refetch,
  } = useGethook<{ products: Product[]; total: number }>({
    queryKey: ["products", page, limit, searchText],
    url: searchText ? "/products/search" : "/products",
    params: {
      limit,
      skip: (page - 1) * limit,
      q: searchText,
    },
  });

  /* Merge products for pagination */
  useEffect(() => {
    if (!productsResponse?.products) return;

    setAllProducts((prev) => {
      if (page === 1) return productsResponse.products;

      const ids = new Set(prev.map((p) => p.id));
      const newItems = productsResponse.products.filter(
        (p) => !ids.has(p.id)
      );

      return [...prev, ...newItems];
    });
  }, [productsResponse, page]);

  /* Pull to refresh */
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    setPage(1);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  /* Infinite scroll */
  const handleLoadMore = () => {
    const total = productsResponse?.total ?? 0;
    if (!isFetching && allProducts.length < total) {
      setPage((prev) => prev + 1);
    }
  };

  /* Product card */
  const renderItem = ({ item }: { item: Product }) => {
    const imageUri = item.thumbnail ?? item.image ?? item.images?.[0];

    return (
      <Pressable
        onPress={() =>
          router.push({
            pathname: "/product/[id]",
            params: { id: item.id.toString() },
          })
        }
        className="flex-1 m-2"
      >
        <View className="bg-white rounded-2xl shadow-sm p-3">
          <Image
            source={{ uri: imageUri }}
            className="w-full h-28 rounded-xl mb-2"
            resizeMode="contain"
          />

          <Text
            numberOfLines={2}
            className="text-sm font-semibold text-gray-800"
          >
            {item.title}
          </Text>

          <Text className="text-blue-600 font-bold my-1">
            ${item.price}
          </Text>

         <Button
        title="Add to Cart"
         onPress={() => addToCart(item)}
/>
          
        </View>
      </Pressable>
    );
  };

  return (
    <View className="flex-1 bg-gray-100">
      {/* Search */}
      <SearchInput
        value={searchText}
        placeholder="Search products..."
        onChange={debouncedWriteSearch}
      />

      {/* Products Grid */}
      <FlatList
        data={allProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{ paddingHorizontal: 8 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListFooterComponent={
          isFetching ? (
            <View className="py-6">
              <ActivityIndicator />
            </View>
          ) : null
        }
        ListEmptyComponent={
          !isFetching ? (
            <Text className="text-center text-gray-500 py-10">
              No products found
            </Text>
          ) : null
        }
      />
    </View>
  );
}

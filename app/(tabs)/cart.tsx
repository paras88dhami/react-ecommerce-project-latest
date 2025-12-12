import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import Button from "../../components/button";
import { useCartStore } from "../../store/store";

export default function Cart() {
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);


  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <View className="flex-1 p-5 bg-gray-100">
      <Text className="text-2xl mb-3 font-bold text-center">Cart Page</Text>

      {cart.length === 0 ? (
        <Text className="text-gray-600 text-center">Your cart is empty.</Text>
      ) : (
        <>
          
          <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
            {cart.map((item, index) => (
              <View
                key={`${item.id}-${index}`}
                className="bg-white rounded-3xl shadow-md p-4 mb-4 mx-4 items-center"
              >
                <Image
                  source={
                    item.thumbnail ?? item.image ?? item.images?.[0]
                      ? { uri: item.thumbnail ?? item.image ?? item.images?.[0] }
                      : require("../../assets/images/partial-react-logo.png")
                  }
                  className="w-16 h-16 rounded mr-3"
                />
                <Text className="text-base">{item.title}</Text>
                <Text className="text-blue-600 font-semibold">${item.price}</Text>
              </View>
            ))}
          </ScrollView>

          
          <Text className="text-lg font-bold text-center mb-4">
            Total: ${totalPrice.toFixed(2)}
          </Text>
        </>
      )}

  
      <Button
        title="Clear Cart"
        onPress={clearCart}
        className="w-40 mx-auto mt-2"
      />
    </View>
  );
}

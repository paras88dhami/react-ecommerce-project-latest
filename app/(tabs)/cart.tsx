import React from "react";
import { View, Text,  } from "react-native";
import { useCartStore } from "../store/store";
import Button from "../../components/button";

export default function Cart() {
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  return (
    <View className="p-5 mb-2 items-center">
      <Text className="text-2xl mb-3 font-bold">Cart Page</Text>

      {cart.length === 0 ? (
        <Text className="text-gray-600">Your cart is empty.</Text>
      ) : (
        cart.map((item) => (
          <View key={item.id} className="mb-3" >
            <Text className="text-base">{item.title}</Text>
            <Text className="text-blue-600 font-semibold">${item.price}</Text>
          </View>
        ))
      )}

      
        <Button title="Clear Cart" 
        onPress={clearCart}
         className="w-40 mx-auto" />
         
      </View>
    
  );
}

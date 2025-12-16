
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#1D4ED8",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="products"
        options={{
          title: "Products",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="pricetags-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
      name="usertable"
      options={{
        title:"usertable",
        tabBarIcon:({color,size}) =>(
            <Ionicons name="information-circle-outline" color={color} size={size}/>
        ),
      }}
      />
    

     <Tabs.Screen
      name="users"
      options={{
        title:"users",
        tabBarIcon:({color,size}) =>(
            <Ionicons name="information-circle-outline" color={color} size={size}/>
        ),
      }}
      />
    </Tabs>
  );
}































































// import { Tabs } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import { View, Text } from "react-native";
// import { useCartStore } from "../store/store";

// export default function TabsLayout() {
//   const cart = useCartStore((state) => state.cart); // get cart items

//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: "#1D4ED8",
//         tabBarInactiveTintColor: "gray",
//         headerShown: false,
//       }}
//     >
//       <Tabs.Screen
//         name="products"
//         options={{
//           title: "Products",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="pricetags-outline" color={color} size={size} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="cart"
//         options={{
//           title: "Cart",
//           tabBarIcon: ({ color, size }) => (
//             <View className="relative">
//               <Ionicons name="cart-outline" color={color} size={size} />
//               {cart.length > 0 && (
//                 <View className="absolute -top-1 -right-2 bg-red-600 w-4 h-4 rounded-full items-center justify-center">
//                   <Text className="text-white text-xs font-bold">{cart.length}</Text>
//                 </View>
//               )}
//             </View>
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="about"
//         options={{
//           title: "About",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="information-circle-outline" color={color} size={size} />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }

import { Stack } from "expo-router";
import "./global.css"
import { SafeAreaView,SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient();
export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)/login" />
      <Stack.Screen name="(tabs)/products" />   
    </Stack>
  </SafeAreaView>
    </SafeAreaProvider>
    </QueryClientProvider>
  );
}

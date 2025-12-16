import { apolloClient } from "@/api/apolloClient";
import { ApolloProvider } from "@apollo/client/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "./global.css";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <ApolloProvider client={apolloClient}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <Stack screenOptions={{ headerShown: false }}>
             
            </Stack>
          </SafeAreaView>
        </SafeAreaProvider>
      </QueryClientProvider>
    </ApolloProvider>
  );
}

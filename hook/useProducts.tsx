import { useQuery } from "@tanstack/react-query";
import api from "../api/api";



import { Product } from "../store/store";

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await api.get("/products"); 
      return response.data; 
    },
  });
};
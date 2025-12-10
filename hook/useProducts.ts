
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/productapi";
import { Product } from "../app/store/store";

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 5, 
  });
};

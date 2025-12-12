import { type QueryKey } from "@tanstack/react-query";
import { create } from "zustand";
export type PostApiParams<T> = {
  url: string;
  formData: T;
};


export type Product = {
  id: number;
  title: string;
  price: number;
  image?: string; 
  thumbnail?: string;
  images?: string[];
  description: string;
  uid?: string;
};


export interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  rounded?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export interface UseGetHooksProps<T> {
  queryKey: QueryKey;
  url: string;
  params?: any;
  enabled?: boolean;
}

export interface PostHookProps<T> {
  url: string;
 
}
type CartStore = {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (uid: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  cart: [],

  addToCart: (product: Product) =>
    set((state) => ({
      cart: [...state.cart, { ...product, uid: Date.now().toString() + Math.random() }],
    })),

  removeFromCart: (uid: string) =>
    set((state) => ({ cart: state.cart.filter((item) => item.uid !== uid) })),

  clearCart: () => set({ cart: [] }),
}));

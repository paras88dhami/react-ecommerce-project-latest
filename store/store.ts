import { Product } from "@/types/type";
import { create } from "zustand";

export type CartStore = {
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
export { Product };


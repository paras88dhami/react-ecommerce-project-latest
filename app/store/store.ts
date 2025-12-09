import { create } from "zustand";

export type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

type CartStore = {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  cart: [],
  addToCart: (product: Product) =>
    set((state: CartStore) => ({ cart: [...state.cart, product] })),
  removeFromCart: (id: number) =>
    set((state: CartStore) => ({ cart: state.cart.filter((item) => item.id !== id) })),
  clearCart: () => set({ cart: [] }),
}));

import { create } from "zustand";

export type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  uid?: string; 
};

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

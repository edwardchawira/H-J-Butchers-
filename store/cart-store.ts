"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { products } from "@/data/products";

export type CartItem = {
  productId: string;
  quantity: number;
  weight: string;
};

type CartState = {
  items: CartItem[];
  wishlistIds: string[];
  drawerOpen: boolean;
  hasHydrated: boolean;
  discountCode: string;
  addItem: (productId: string, weight?: string, quantity?: number) => void;
  removeItem: (productId: string, weight: string) => void;
  updateQuantity: (productId: string, weight: string, quantity: number) => void;
  toggleWishlist: (productId: string) => void;
  setDrawerOpen: (open: boolean) => void;
  applyDiscount: (code: string) => boolean;
  clearCart: () => void;
  setHasHydrated: (hydrated: boolean) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      wishlistIds: [],
      drawerOpen: false,
      hasHydrated: false,
      discountCode: "",
      addItem: (productId, weight, quantity = 1) =>
        set((state) => {
          const product = products.find((entry) => entry.id === productId);
          if (!product?.inStock) return state;
          const selection = weight ?? product.weight;
          const existing = state.items.find(
            (item) => item.productId === productId && item.weight === selection,
          );
          const items = existing
            ? state.items.map((item) =>
                item === existing ? { ...item, quantity: item.quantity + quantity } : item,
              )
            : [...state.items, { productId, weight: selection, quantity }];
          return { items, drawerOpen: true };
        }),
      removeItem: (productId, weight) =>
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.productId === productId && item.weight === weight),
          ),
        })),
      updateQuantity: (productId, weight, quantity) =>
        set((state) => ({
          items:
            quantity < 1
              ? state.items.filter(
                  (item) => !(item.productId === productId && item.weight === weight),
                )
              : state.items.map((item) =>
                  item.productId === productId && item.weight === weight
                    ? { ...item, quantity }
                    : item,
                ),
        })),
      toggleWishlist: (productId) =>
        set((state) => ({
          wishlistIds: state.wishlistIds.includes(productId)
            ? state.wishlistIds.filter((id) => id !== productId)
            : [...state.wishlistIds, productId],
        })),
      setDrawerOpen: (drawerOpen) => set({ drawerOpen }),
      applyDiscount: (code) => {
        const accepted = code.trim().toUpperCase() === "WELCOME10";
        set({ discountCode: accepted ? "WELCOME10" : "" });
        return accepted;
      },
      clearCart: () => set({ items: [], discountCode: "" }),
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
    }),
    {
      name: "meat-man-basket",
      partialize: (state) => ({
        items: state.items,
        wishlistIds: state.wishlistIds,
        discountCode: state.discountCode,
      }),
      onRehydrateStorage: () => (state) => state?.setHasHydrated(true),
    },
  ),
);

export function cartSubtotal(items: CartItem[]) {
  return items.reduce((total, item) => {
    const product = products.find((entry) => entry.id === item.productId);
    return total + (product?.price ?? 0) * item.quantity;
  }, 0);
}

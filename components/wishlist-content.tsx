"use client";

import { Heart } from "lucide-react";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { useCartStore } from "@/store/cart-store";

export function WishlistContent() {
  const { wishlistIds, hasHydrated } = useCartStore();
  const wishedProducts = hasHydrated ? products.filter((product) => wishlistIds.includes(product.id)) : [];

  return (
    <div className="container-site pb-20 pt-8">
      <p className="eyebrow">Saved for later</p>
      <h1 className="section-title mt-3 mb-10">Your wishlist</h1>
      {wishedProducts.length === 0 ? (
        <div className="rounded-sm bg-white p-16 text-center">
          <Heart className="mx-auto h-10 w-10 text-gold" />
          <h2 className="mt-5 text-2xl">No favourites saved yet</h2>
          <Button asChild className="mt-7"><Link href="/shop">Explore products</Link></Button>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {wishedProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      )}
    </div>
  );
}

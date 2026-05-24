"use client";

import { Heart, Minus, Plus, Truck } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/data/products";
import { formatMoney } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { ReviewStars } from "@/components/review-stars";
import { StockBadge } from "@/components/stock-badge";

export function ProductActions({ product }: { product: Product }) {
  const [weight, setWeight] = useState(product.weightOptions[0]);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useCartStore((state) => state.toggleWishlist);
  const wished = useCartStore((state) => state.hasHydrated && state.wishlistIds.includes(product.id));

  return (
    <div>
      <StockBadge level={product.stockLevel} />
      <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">{product.name}</h1>
      <div className="mt-4"><ReviewStars rating={product.rating} count={product.reviewCount} /></div>
      <p className="mt-6 text-3xl font-bold text-oxblood">{formatMoney(product.price)}</p>
      <p className="mt-5 leading-7 text-muted">{product.description}</p>
      <fieldset className="mt-8">
        <legend className="mb-3 text-xs font-bold uppercase tracking-widest">Choose size</legend>
        <div className="flex flex-wrap gap-3">
          {product.weightOptions.map((option) => (
            <label key={option} className={`cursor-pointer rounded-sm border px-5 py-3 text-sm ${weight === option ? "border-oxblood bg-oxblood text-white" : "border-soft-border bg-white"}`}>
              <input type="radio" className="sr-only" name="weight" value={option} checked={weight === option} onChange={() => setWeight(option)} />
              {option}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="mt-8 flex flex-wrap gap-3">
        <div className="flex h-12 items-center border border-soft-border bg-white">
          <button type="button" aria-label="Decrease quantity" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-4"><Minus className="h-4 w-4" /></button>
          <span className="min-w-9 text-center">{quantity}</span>
          <button type="button" aria-label="Increase quantity" onClick={() => setQuantity(quantity + 1)} className="p-4"><Plus className="h-4 w-4" /></button>
        </div>
        <Button disabled={!product.inStock} className="h-12 flex-1" onClick={() => addItem(product.id, weight, quantity)}>Add to cart</Button>
        <button type="button" onClick={() => toggleWishlist(product.id)} aria-label="Add to wishlist" className="h-12 border border-soft-border bg-white px-4 text-oxblood">
          <Heart fill={wished ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="mt-7 flex gap-3 rounded-sm border border-soft-border bg-white p-4 text-sm">
        <Truck className="h-5 w-5 shrink-0 text-oxblood" />
        <p><strong>Next-day delivery available.</strong><br /><span className="text-muted">Order before 2pm, Monday to Thursday.</span></p>
      </div>
    </div>
  );
}

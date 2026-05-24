"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Eye, Heart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import { formatMoney } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { ReviewStars } from "@/components/review-stars";
import { StockBadge } from "@/components/stock-badge";

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useCartStore((state) => state.toggleWishlist);
  const wished = useCartStore((state) => state.hasHydrated && state.wishlistIds.includes(product.id));

  return (
    <article className="card-lift group overflow-hidden rounded-sm border border-soft-border bg-warm-white">
      <div className="relative">
        <Link href={`/products/${product.slug}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            width={600}
            height={600}
            className="aspect-square w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </Link>
        <div className="absolute left-3 top-3">
          <StockBadge level={product.stockLevel} />
        </div>
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-label={`${wished ? "Remove" : "Add"} ${product.name} ${wished ? "from" : "to"} wishlist`}
          className="absolute right-3 top-3 rounded-full bg-white p-2 shadow-sm transition hover:text-oxblood"
        >
          <Heart className="h-4 w-4" fill={wished ? "currentColor" : "none"} />
        </button>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-sm bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider opacity-0 shadow-md transition group-hover:opacity-100 focus:opacity-100">
              <Eye className="h-4 w-4" /> Quick view
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-charcoal/60" />
            <Dialog.Content className="fixed left-1/2 top-1/2 z-50 grid w-[min(94vw,54rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-sm bg-white shadow-2xl md:grid-cols-2">
              <Dialog.Title className="sr-only">{product.name}</Dialog.Title>
              <Image src={product.images[0]} alt={product.name} width={600} height={650} className="h-full max-h-96 w-full object-cover md:max-h-none" />
              <div className="relative p-7">
                <Dialog.Close className="absolute right-5 top-5 p-1" aria-label="Close quick view"><X className="h-5 w-5" /></Dialog.Close>
                <StockBadge level={product.stockLevel} />
                <h2 className="mt-5 pr-6 text-3xl">{product.name}</h2>
                <ReviewStars rating={product.rating} count={product.reviewCount} />
                <p className="my-5 text-sm leading-7 text-muted">{product.description}</p>
                <p className="mb-5 text-2xl font-bold text-oxblood">{formatMoney(product.price)} <span className="text-sm font-normal text-muted">/ {product.weight}</span></p>
                <Button disabled={!product.inStock} className="w-full" onClick={() => addItem(product.id)}>
                  Add to basket
                </Button>
                <Dialog.Close asChild>
                  <Link href={`/products/${product.slug}`} className="mt-5 block text-center text-sm font-semibold text-oxblood underline">
                    View full details
                  </Link>
                </Dialog.Close>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
      <div className="p-4 sm:p-5">
        <ReviewStars rating={product.rating} count={product.reviewCount} />
        <Link href={`/products/${product.slug}`} className="mt-3 block min-h-12 font-display text-lg font-semibold leading-snug hover:text-oxblood">
          {product.name}
        </Link>
        <p className="mb-4 mt-1 text-xs text-muted">{product.weight}</p>
        <div className="flex items-center justify-between gap-3">
          <span className="text-lg font-bold text-oxblood">{formatMoney(product.price)}</span>
          <Button className="h-10 px-3 text-[11px]" disabled={!product.inStock} onClick={() => addItem(product.id)}>
            Add
          </Button>
        </div>
      </div>
    </article>
  );
}

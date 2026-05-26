"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import { cn, deliveryCost, formatMoney, FREE_DELIVERY_THRESHOLD } from "@/lib/utils";
import { cartSubtotal, useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const { drawerOpen, setDrawerOpen, items, updateQuantity, removeItem, hasHydrated } =
    useCartStore();
  const shownItems = hasHydrated ? items : [];
  const subtotal = cartSubtotal(shownItems);
  const remaining = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);

  return (
    <Dialog.Root open={drawerOpen} onOpenChange={setDrawerOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-charcoal/55" />
        <Dialog.Content className="fixed right-0 top-0 z-50 flex h-dvh w-full max-w-md flex-col bg-warm-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-soft-border px-6 py-5">
            <Dialog.Title className="flex items-center gap-2 text-2xl">
              <ShoppingBag className="h-5 w-5 text-oxblood" /> Your Basket
            </Dialog.Title>
            <Dialog.Close aria-label="Close basket" className="rounded-sm p-2 hover:bg-cream">
              <X className="h-5 w-5" />
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">
            Products currently in your shopping basket.
          </Dialog.Description>
          {remaining > 0 && shownItems.length > 0 && (
            <p className="border-b border-soft-border bg-white px-6 py-3 text-center text-sm">
              Spend <strong>{formatMoney(remaining)}</strong> more for free delivery.
            </p>
          )}
          <div className="flex-1 space-y-5 overflow-auto px-6 py-5">
            {shownItems.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <ShoppingBag className="mb-4 h-10 w-10 text-gold" />
                <h3 className="text-2xl">Your basket is empty</h3>
                <p className="mt-2 text-sm text-muted">Discover expertly prepared cuts for your next meal.</p>
                <Button asChild className="mt-7" onClick={() => setDrawerOpen(false)}>
                  <Link href="/shop">Shop meat</Link>
                </Button>
              </div>
            ) : (
              shownItems.map((item) => {
                const product = products.find((entry) => entry.id === item.productId);
                if (!product) return null;
                return (
                  <div key={`${item.productId}-${item.weight}`} className="flex gap-4">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      width={88}
                      height={88}
                      className={cn("h-22 w-22 rounded-sm", product.imageFit === "contain" ? "bg-white object-contain p-1" : "object-cover")}
                    />
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/products/${product.slug}`}
                        onClick={() => setDrawerOpen(false)}
                        className="font-semibold hover:text-oxblood"
                      >
                        {product.name}
                      </Link>
                      <p className="text-xs text-muted">{item.weight}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center border border-soft-border">
                          <button
                            type="button"
                            aria-label={`Reduce ${product.name} quantity`}
                            onClick={() => updateQuantity(item.productId, item.weight, item.quantity - 1)}
                            className="p-1.5 hover:text-oxblood"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="min-w-7 text-center text-sm">{item.quantity}</span>
                          <button
                            type="button"
                            aria-label={`Increase ${product.name} quantity`}
                            onClick={() => updateQuantity(item.productId, item.weight, item.quantity + 1)}
                            className="p-1.5 hover:text-oxblood"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <span className="font-semibold">{formatMoney(product.price * item.quantity)}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      aria-label={`Remove ${product.name}`}
                      onClick={() => removeItem(item.productId, item.weight)}
                      className="self-start text-muted hover:text-oxblood"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                );
              })
            )}
          </div>
          {shownItems.length > 0 && (
            <div className="border-t border-soft-border bg-cream p-6">
              <div className="mb-2 flex justify-between text-sm text-muted">
                <span>Delivery</span>
                <span>{deliveryCost(subtotal) === 0 ? "Free" : formatMoney(deliveryCost(subtotal))}</span>
              </div>
              <div className="mb-5 flex justify-between text-lg font-bold">
                <span>Subtotal</span>
                <span>{formatMoney(subtotal)}</span>
              </div>
              <Button asChild className="w-full" onClick={() => setDrawerOpen(false)}>
                <Link href="/cart">View basket</Link>
              </Button>
              <Button asChild variant="outline" className="mt-3 w-full" onClick={() => setDrawerOpen(false)}>
                <Link href="/checkout">Checkout</Link>
              </Button>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

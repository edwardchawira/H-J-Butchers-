"use client";

import { Minus, Plus, ShoppingBag, Trash2, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { cn, deliveryCost, formatMoney, FREE_DELIVERY_THRESHOLD } from "@/lib/utils";
import { cartSubtotal, useCartStore } from "@/store/cart-store";

export function CartPageContent() {
  const { items, hasHydrated, updateQuantity, removeItem, discountCode, applyDiscount } = useCartStore();
  const [code, setCode] = useState(discountCode);
  const [message, setMessage] = useState("");
  const displayedItems = hasHydrated ? items : [];
  const subtotal = cartSubtotal(displayedItems);
  const discount = discountCode === "WELCOME10" ? subtotal * 0.1 : 0;
  const shipping = deliveryCost(subtotal - discount);
  const total = subtotal - discount + shipping;

  function submitDiscount(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const success = applyDiscount(code);
    setMessage(success ? "WELCOME10 applied: 10% off your order." : "That code is not recognised. Try WELCOME10.");
  }

  if (displayedItems.length === 0) {
    return (
      <div className="container-site flex flex-col items-center py-24 text-center">
        <ShoppingBag className="h-12 w-12 text-gold" />
        <h1 className="mt-6 text-4xl">Your basket is empty</h1>
        <p className="mt-3 text-muted">Fill it with beautifully prepared cuts and family favourites.</p>
        <Button asChild className="mt-8"><Link href="/shop">Continue shopping</Link></Button>
      </div>
    );
  }

  return (
    <div className="container-site grid gap-10 pb-20 pt-10 lg:grid-cols-[1fr_390px]">
      <section>
        <h1 className="section-title mb-8">Your basket</h1>
        <div className="divide-y divide-soft-border border-y border-soft-border">
          {displayedItems.map((item) => {
            const product = products.find((entry) => entry.id === item.productId);
            if (!product) return null;
            return (
              <article key={`${item.productId}-${item.weight}`} className="flex gap-4 py-6 sm:gap-6">
                <Image src={product.images[0]} alt={product.name} width={132} height={132} className={cn("h-26 w-26 rounded-sm sm:h-32 sm:w-32", product.imageFit === "contain" ? "bg-white object-contain p-1" : "object-cover")} />
                <div className="flex flex-1 flex-col justify-between gap-3 sm:flex-row">
                  <div>
                    <Link href={`/products/${product.slug}`} className="font-display text-xl font-semibold hover:text-oxblood">{product.name}</Link>
                    <p className="mt-1 text-sm text-muted">{item.weight}</p>
                    <button type="button" onClick={() => removeItem(item.productId, item.weight)} className="mt-4 flex items-center gap-1 text-xs text-muted hover:text-oxblood">
                      <Trash2 className="h-3.5 w-3.5" /> Remove
                    </button>
                  </div>
                  <div className="flex items-center gap-5 sm:flex-col sm:items-end">
                    <strong className="text-lg">{formatMoney(product.price * item.quantity)}</strong>
                    <div className="flex items-center border border-soft-border bg-white">
                      <button type="button" aria-label="Reduce quantity" onClick={() => updateQuantity(item.productId, item.weight, item.quantity - 1)} className="p-2"><Minus className="h-4 w-4" /></button>
                      <span className="w-9 text-center">{item.quantity}</span>
                      <button type="button" aria-label="Increase quantity" onClick={() => updateQuantity(item.productId, item.weight, item.quantity + 1)} className="p-2"><Plus className="h-4 w-4" /></button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <Button asChild variant="ghost" className="mt-7"><Link href="/shop">Continue shopping</Link></Button>
      </section>
      <aside className="h-fit rounded-sm bg-white p-6 shadow-sm sm:p-8">
        <h2 className="mb-6 text-2xl">Order summary</h2>
        <form onSubmit={submitDiscount} className="mb-7">
          <label htmlFor="discount" className="mb-2 block text-xs font-bold uppercase tracking-wider">Discount code</label>
          <div className="flex">
            <input id="discount" value={code} onChange={(event) => setCode(event.target.value)} placeholder="WELCOME10" className="h-11 min-w-0 flex-1 border border-soft-border px-3 text-sm uppercase" />
            <Button type="submit" variant="outline" className="h-11 px-4">Apply</Button>
          </div>
          {message && <p className="mt-2 text-xs text-muted" aria-live="polite">{message}</p>}
        </form>
        <dl className="space-y-4 border-b border-soft-border pb-6 text-sm">
          <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatMoney(subtotal)}</dd></div>
          {discount > 0 && <div className="flex justify-between text-oxblood"><dt>Discount</dt><dd>-{formatMoney(discount)}</dd></div>}
          <div className="flex justify-between"><dt>Delivery</dt><dd>{shipping === 0 ? "Free" : formatMoney(shipping)}</dd></div>
        </dl>
        <div className="flex justify-between py-6 text-xl font-bold"><span>Total</span><span>{formatMoney(total)}</span></div>
        {shipping > 0 && (
          <p className="mb-6 flex gap-2 rounded-sm border border-soft-border bg-white p-3 text-xs text-muted">
            <Truck className="h-4 w-4 shrink-0 text-oxblood" /> Spend {formatMoney(FREE_DELIVERY_THRESHOLD - (subtotal - discount))} more for free delivery.
          </p>
        )}
        <Button asChild className="w-full"><Link href="/checkout">Proceed to checkout</Link></Button>
      </aside>
    </div>
  );
}

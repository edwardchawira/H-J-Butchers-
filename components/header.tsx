"use client";

import { Heart, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { products } from "@/data/products";
import { useCartStore } from "@/store/cart-store";
import { CartDrawer } from "@/components/cart-drawer";

const links = [
  { name: "Shop", href: "/shop" },
  { name: "Beef", href: "/category/beef" },
  { name: "Chicken", href: "/category/chicken" },
  { name: "BBQ", href: "/category/bbq" },
  { name: "Beverages", href: "/category/beverages" },
  { name: "About", href: "/about" },
  { name: "Recipes", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { items, wishlistIds, hasHydrated, setDrawerOpen } = useCartStore();
  const totalItems = hasHydrated ? items.reduce((amount, item) => amount + item.quantity, 0) : 0;
  const wishlistCount = hasHydrated ? wishlistIds.length : 0;
  const suggestions =
    search.trim().length > 1
      ? products
          .filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))
          .slice(0, 4)
      : [];

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-soft-border bg-cream/95 backdrop-blur">
        <div className="container-site flex h-20 items-center justify-between gap-5">
          <button
            type="button"
            className="p-2 lg:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-label="Open navigation menu"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
          <Link href="/" className="shrink-0 text-center text-oxblood" aria-label="H&J Butchers home">
            <span className="font-display block text-3xl font-bold leading-none">H&amp;J Butchers</span>
          </Link>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold uppercase tracking-wider transition hover:text-oxblood"
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-1 sm:gap-3">
            <div className="relative hidden xl:block">
              <form action="/shop" role="search">
                <label className="sr-only" htmlFor="desktop-search">
                  Search products
                </label>
                <input
                  id="desktop-search"
                  name="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search cuts..."
                  autoComplete="off"
                  className="h-10 w-52 rounded-full border border-soft-border bg-white pl-4 pr-10 text-sm focus:border-gold"
                />
                <Search className="absolute right-3 top-3 h-4 w-4 text-muted" />
              </form>
              {suggestions.length > 0 && (
                <div className="absolute right-0 top-12 w-80 rounded-sm border border-soft-border bg-white p-2 shadow-xl">
                  {suggestions.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      onClick={() => setSearch("")}
                      className="block rounded-sm px-3 py-2 text-sm hover:bg-cream hover:text-oxblood"
                    >
                      {product.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/wishlist" aria-label={`Wishlist with ${wishlistCount} items`} className="relative p-2 hover:text-oxblood">
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && <span className="absolute right-0 top-0 h-4 min-w-4 rounded-full bg-gold text-center text-[10px] font-bold">{wishlistCount}</span>}
            </Link>
            <Link href="/checkout" aria-label="Checkout account details" className="hidden p-2 hover:text-oxblood sm:block">
              <UserRound className="h-5 w-5" />
            </Link>
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="relative p-2 hover:text-oxblood"
              aria-label={`Open basket with ${totalItems} items`}
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && <span className="absolute right-0 top-0 h-4 min-w-4 rounded-full bg-oxblood text-center text-[10px] font-bold text-white">{totalItems}</span>}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <nav className="border-t border-soft-border bg-warm-white px-5 pb-5 pt-3 lg:hidden" aria-label="Mobile navigation">
            <form action="/shop" className="relative mb-3" role="search">
              <input name="search" aria-label="Search products" placeholder="Search cuts..." className="h-11 w-full rounded-sm border border-soft-border bg-white px-4 pr-10 text-sm" />
              <Search className="absolute right-4 top-3.5 h-4 w-4 text-muted" />
            </form>
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block border-b border-soft-border py-3 text-sm font-semibold uppercase tracking-wider">
                {link.name}
              </Link>
            ))}
          </nav>
        )}
      </header>
      <CartDrawer />
    </>
  );
}

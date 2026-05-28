"use client";

import { SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { products } from "@/data/products";
import { FilterSidebar, type Filters } from "@/components/filter-sidebar";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";

export function ShopCatalogue({ initialCategory, initialSearch = "" }: { initialCategory?: string; initialSearch?: string }) {
  const [filters, setFilters] = useState<Filters>({
    categories: initialCategory ? [initialCategory] : [],
    maxPrice: 55,
    tags: [],
    weights: [],
  });
  const [sort, setSort] = useState("popular");
  const [mobileFilters, setMobileFilters] = useState(false);
  const [shown, setShown] = useState(12);

  const filtered = useMemo(() => {
    const search = initialSearch.toLowerCase();
    return products
      .filter((product) => !search || product.name.toLowerCase().includes(search) || product.category.includes(search))
      .filter((product) => filters.categories.length === 0 || filters.categories.includes(product.category))
      .filter((product) => product.price <= filters.maxPrice)
      .filter((product) => filters.tags.length === 0 || filters.tags.every((tag) => product.tags.includes(tag)))
      .filter((product) => filters.weights.length === 0 || filters.weights.some((weight) => product.weight.includes(weight) || product.weightOptions.includes(weight)))
      .sort((a, b) => {
        if (sort === "price-low") return a.price - b.price;
        if (sort === "price-high") return b.price - a.price;
        if (sort === "newest") return Number(Boolean(b.newArrival)) - Number(Boolean(a.newArrival));
        return b.reviewCount - a.reviewCount;
      });
  }, [filters, initialSearch, sort]);

  return (
    <div className="container-site grid gap-9 pb-20 lg:grid-cols-[250px_1fr]">
      <div className={mobileFilters ? "block" : "hidden lg:block"}>
        <FilterSidebar filters={filters} setFilters={(next) => { setFilters(next); setShown(12); }} />
      </div>
      <section aria-label="Products">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4 border-b border-soft-border pb-5">
          <p className="text-sm text-muted">{filtered.length} products</p>
          <div className="flex gap-3">
            <button type="button" className="flex items-center gap-2 border border-soft-border px-4 py-2 text-sm lg:hidden" onClick={() => setMobileFilters((open) => !open)}>
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </button>
            <label className="sr-only" htmlFor="sort">Sort products</label>
            <select id="sort" value={sort} onChange={(event) => setSort(event.target.value)} className="rounded-sm border border-soft-border bg-white px-4 py-2 text-sm">
              <option value="popular">Popularity</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
        {filtered.length === 0 ? (
          <div className="rounded-sm bg-white p-12 text-center">
            <h2 className="text-2xl">No products match your selection</h2>
            <p className="mt-2 text-muted">Try clearing filters or browsing another category.</p>
          </div>
        ) : (
          <>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.slice(0, shown).map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
            {shown < filtered.length && (
              <div className="mt-12 text-center">
                <Button variant="outline" onClick={() => setShown((amount) => amount + 12)}>Load more</Button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

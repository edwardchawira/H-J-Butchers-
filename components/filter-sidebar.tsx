"use client";

import { categories } from "@/data/categories";

export type Filters = {
  categories: string[];
  maxPrice: number;
  tags: string[];
  weights: string[];
};

export function FilterSidebar({
  filters,
  setFilters,
}: {
  filters: Filters;
  setFilters: (filters: Filters) => void;
}) {
  const toggle = (key: "categories" | "tags" | "weights", value: string) => {
    const collection = filters[key];
    setFilters({
      ...filters,
      [key]: collection.includes(value)
        ? collection.filter((entry) => entry !== value)
        : [...collection, value],
    });
  };

  return (
    <aside className="space-y-8 border-soft-border lg:border-r lg:pr-8" aria-label="Filter products">
      <div>
        <h2 className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.2em]">Category</h2>
        <div className="space-y-3">
          {categories.map((category) => (
            <label key={category.slug} className="flex cursor-pointer items-center gap-3 text-sm">
              <input type="checkbox" checked={filters.categories.includes(category.slug)} onChange={() => toggle("categories", category.slug)} className="accent-oxblood" />
              {category.name}
            </label>
          ))}
        </div>
      </div>
      <div>
        <h2 className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.2em]">Price range</h2>
        <input
          type="range"
          aria-label="Maximum price"
          min="5"
          max="55"
          value={filters.maxPrice}
          onChange={(event) => setFilters({ ...filters, maxPrice: Number(event.target.value) })}
          className="w-full accent-oxblood"
        />
        <p className="mt-2 text-sm text-muted">Up to £{filters.maxPrice}</p>
      </div>
      <div>
        <h2 className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.2em]">Dietary & sourcing</h2>
        {["Free Range", "Grass fed", "High protein", "Gluten free"].map((tag) => (
          <label key={tag} className="mb-3 flex cursor-pointer items-center gap-3 text-sm">
            <input type="checkbox" checked={filters.tags.includes(tag)} onChange={() => toggle("tags", tag)} className="accent-oxblood" />
            {tag}
          </label>
        ))}
      </div>
      <div>
        <h2 className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.2em]">Weight</h2>
        {["500g", "1kg", "Family Pack"].map((weight) => (
          <label key={weight} className="mb-3 flex cursor-pointer items-center gap-3 text-sm">
            <input type="checkbox" checked={filters.weights.includes(weight)} onChange={() => toggle("weights", weight)} className="accent-oxblood" />
            {weight}
          </label>
        ))}
      </div>
      <button type="button" onClick={() => setFilters({ categories: [], maxPrice: 55, tags: [], weights: [] })} className="text-sm font-semibold text-oxblood underline">
        Clear filters
      </button>
    </aside>
  );
}

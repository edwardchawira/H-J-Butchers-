import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/data/categories";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="card-lift group relative block overflow-hidden rounded-sm bg-charcoal"
    >
      <Image
        src={category.image}
        alt={category.name}
        width={600}
        height={500}
        className="h-52 w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-60"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-5 pt-14 text-white">
        <h3 className="text-2xl">{category.name}</h3>
        <p className="mt-1 text-xs text-white/80">{category.description}</p>
      </div>
    </Link>
  );
}

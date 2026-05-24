import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/breadcrumb";
import { ShopCatalogue } from "@/components/shop-catalogue";
import { categories, getCategory } from "@/data/categories";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const category = getCategory((await params).slug);
  return category ? { title: `${category.name} Delivery`, description: category.description } : {};
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const category = getCategory((await params).slug);
  if (!category) notFound();
  return (
    <>
      <Breadcrumb items={[{ label: "Shop", href: "/shop" }, { label: category.name }]} />
      <section className="container-site mb-12">
        <div className="relative overflow-hidden rounded-sm bg-charcoal px-8 py-16 text-white sm:px-14">
          <Image src={category.image} alt="" fill className="object-cover opacity-35" />
          <div className="relative max-w-lg">
            <p className="eyebrow">Butcher&apos;s selection</p>
            <h1 className="mt-3 text-5xl">{category.name}</h1>
            <p className="mt-4 text-white/80">{category.description} Delivered chilled and ready for your kitchen.</p>
          </div>
        </div>
      </section>
      <ShopCatalogue initialCategory={category.slug} />
    </>
  );
}

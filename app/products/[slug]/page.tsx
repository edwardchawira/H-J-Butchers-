import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Accordion } from "@/components/accordion";
import { Breadcrumb } from "@/components/breadcrumb";
import { ProductActions } from "@/components/product-actions";
import { ProductCard } from "@/components/product-card";
import { ProductGallery } from "@/components/product-gallery";
import { ReviewStars } from "@/components/review-stars";
import { getProduct, products, productsByCategory } from "@/data/products";
import { reviews } from "@/data/reviews";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return { title: product.name, description: product.description };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const related = productsByCategory(product.category).filter((entry) => entry.id !== product.id).slice(0, 3);
  const nutrition = product.nutritionalInfo;
  const isBeverage = product.category === "beverages";

  return (
    <>
      <Breadcrumb items={[{ label: "Shop", href: "/shop" }, { label: product.name }]} />
      <section className="container-site grid gap-10 pb-14 lg:grid-cols-2 lg:gap-14">
        <ProductGallery images={product.images} name={product.name} imageFit={product.imageFit} />
        <ProductActions product={product} />
      </section>
      <section className="border-y border-soft-border bg-white py-14">
        <div className="container-site grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">The detail</p>
            <h2 className="mt-3 text-3xl">{isBeverage ? "Serving notes" : "Butcher's notes"}</h2>
            <p className="mt-5 leading-8 text-muted">
              {isBeverage
                ? "Serve ice cold for a refreshing drink with your meal. Store in a cool, dry place and refrigerate before serving."
                : "Cut and packed on the day of dispatch. Store refrigerated below 5°C and consume within the use-by date, or freeze on receipt."}
            </p>
          </div>
          <Accordion items={[
            { title: nutrition ? "Nutritional information (per 100g)" : "Nutritional information", content: nutrition ? `${nutrition.calories} kcal | Protein ${nutrition.protein}g | Fat ${nutrition.fat}g | Carbohydrate ${nutrition.carbs}g.` : "Please see product packaging for current nutritional information." },
            { title: isBeverage ? "Product information" : "Provenance & preparation", content: isBeverage ? `Tags: ${product.tags.join(", ")}.` : `Tags: ${product.tags.join(", ")}. Prepared in our butcher shop by trained craftspeople.` },
            { title: "Delivery & storage", content: isBeverage ? "Delivered securely with your order. Store in a cool, dry place and refrigerate before serving." : "Arrives in temperature-controlled packaging. Refrigerate immediately or freeze on delivery for later enjoyment." },
          ]} />
        </div>
      </section>
      <section className="container-site py-16">
        <h2 className="section-title mb-9">You may also like</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((entry) => <ProductCard key={entry.id} product={entry} />)}
        </div>
      </section>
      <section className="border-t border-soft-border bg-white py-16">
        <div className="container-site">
          <div className="mb-9 flex flex-wrap items-center justify-between gap-4">
            <h2 className="section-title">Customer reviews</h2>
            <ReviewStars rating={product.rating} count={product.reviewCount} />
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {reviews.slice(0, 2).map((review) => (
              <blockquote key={review.id} className="rounded-sm border border-soft-border p-7">
                <ReviewStars rating={review.rating} />
                <p className="my-4 leading-7 text-muted">&ldquo;{review.quote}&rdquo;</p>
                <footer className="font-semibold">{review.customer}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { Award, CalendarClock, Leaf, ShieldCheck, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CategoryCard } from "@/components/category-card";
import { HeroCarousel } from "@/components/hero-carousel";
import { Newsletter } from "@/components/newsletter";
import { ProductCard } from "@/components/product-card";
import { ReviewStars } from "@/components/review-stars";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blog";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { reviews } from "@/data/reviews";

export const metadata: Metadata = {
  title: "Premium British Meat Delivered",
  description: "Shop expertly prepared steaks, roasting joints, BBQ boxes and family favourites delivered chilled to your door.",
};

const reasons = [
  { icon: Leaf, title: "Responsibly sourced", text: "Trusted British farms selected for welfare and flavour." },
  { icon: ShieldCheck, title: "Butcher prepared", text: "Every cut is trimmed and packed by trained hands." },
  { icon: CalendarClock, title: "Fresh to schedule", text: "Choose your delivery day for effortless meal planning." },
  { icon: Truck, title: "Chilled delivery", text: "Insulated, recyclable packaging protects every order." },
];

const heroSlides = ["lamb", "chicken", "burgers", "pork", "sausages", "beverages", "snacks-confectionery"].flatMap((slug) => {
  const category = categories.find((entry) => entry.slug === slug);
  return category ? [{ image: category.image, name: category.name }] : [];
});

export default function Home() {
  const featured = products.filter((product) => product.featured).slice(0, 4);

  return (
    <>
      <HeroCarousel slides={heroSlides} />

      <section className="border-b border-soft-border bg-warm-white">
        <div className="container-site grid gap-4 py-7 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Free Delivery", "On orders over £75"],
            ["Next Day Delivery", "Order before 2pm"],
            ["Great Quality Meat", "Craft butcher standards"],
            ["Independent Butchers", "A flexible demo storefront"],
          ].map(([title, text]) => (
            <div key={title} className="flex items-center justify-center gap-4 text-center lg:border-r lg:border-soft-border last:border-r-0">
              <Award className="h-7 w-7 shrink-0 text-gold" />
              <div className="text-left">
                <p className="font-semibold">{title}</p>
                <p className="text-xs text-muted">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-site py-16 sm:py-20">
        <div className="mb-10 text-center">
          <p className="eyebrow">Browse the counter</p>
          <h2 className="section-title mt-3">Shop by category</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => <CategoryCard key={category.slug} category={category} />)}
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-site">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">Customer favourites</p>
              <h2 className="section-title mt-3">Best-selling cuts</h2>
            </div>
            <Link href="/shop" className="text-sm font-bold uppercase tracking-wider text-oxblood hover:underline">
              View all products
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>

      <section className="container-site py-16">
        <div className="relative overflow-hidden rounded-sm bg-oxblood px-7 py-12 text-cream sm:px-14">
          <Image
            src="https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=1200&q=80"
            alt=""
            fill
            className="object-cover opacity-20"
          />
          <div className="relative max-w-xl">
            <p className="eyebrow">Grill season selection</p>
            <h2 className="mt-3 text-4xl">The Weekend BBQ Feast Box</h2>
            <p className="mt-4 leading-7 text-white/80">
              Fire-ready steaks, handmade burgers, sausages and glazed ribs. Use <strong>WELCOME10</strong> for 10% off your basket.
            </p>
            <Button asChild variant="secondary" className="mt-7">
              <Link href="/category/bbq">Shop BBQ collection</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-y border-soft-border bg-white py-16 sm:py-20">
        <div className="container-site">
          <div className="mb-10 text-center">
            <p className="eyebrow">Just Butcher promise</p>
            <h2 className="section-title mt-3">Why choose us?</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {reasons.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-sm bg-warm-white p-7 text-center">
                <Icon className="mx-auto mb-5 h-8 w-8 text-oxblood" />
                <h3 className="text-xl">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site py-16 sm:py-20">
        <div className="mb-10 text-center">
          <p className="eyebrow">Rated excellent</p>
          <h2 className="section-title mt-3">From our customers</h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {reviews.map((review) => (
            <blockquote key={review.id} className="rounded-sm border border-soft-border bg-white p-8">
              <ReviewStars rating={review.rating} />
              <p className="my-5 font-display text-xl leading-8">&ldquo;{review.quote}&rdquo;</p>
              <footer className="text-sm font-semibold">{review.customer} <span className="font-normal text-muted">- {review.location}</span></footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="border-t border-soft-border bg-white py-16">
        <div className="container-site">
          <div className="mb-9 flex items-end justify-between">
            <div>
              <p className="eyebrow">Chef&apos;s corner</p>
              <h2 className="section-title mt-3">Recipes & inspiration</h2>
            </div>
            <Link href="/blog" className="hidden text-sm font-bold uppercase tracking-wider text-oxblood sm:block">All recipes</Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <Image src={post.image} alt="" width={600} height={390} className="mb-5 aspect-[1.55] w-full rounded-sm object-cover transition group-hover:opacity-85" />
                <p className="text-xs font-bold uppercase tracking-wider text-gold">{post.category} / {post.date}</p>
                <h3 className="mt-2 text-2xl transition group-hover:text-oxblood">{post.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Newsletter />
    </>
  );
}

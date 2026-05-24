import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { Newsletter } from "@/components/newsletter";
import { blogPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Recipes & Guides",
  description: "Butcher-approved recipes, steak tips and seasonal cooking inspiration.",
};

export default function BlogPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Recipes & guides" }]} />
      <header className="container-site mb-12 max-w-3xl text-center">
        <p className="eyebrow">Kitchen journal</p>
        <h1 className="mt-3 text-5xl">Recipes & inspiration</h1>
        <p className="mt-5 text-muted">Practical advice from our counter to help exceptional ingredients shine.</p>
      </header>
      <section className="container-site grid gap-7 pb-20 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <article key={post.slug} className="overflow-hidden rounded-sm border border-soft-border bg-white">
            <Link href={`/blog/${post.slug}`}>
              <Image src={post.image} alt="" width={650} height={430} className="aspect-[1.5] w-full object-cover" />
            </Link>
            <div className="p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-gold">{post.category} / {post.date}</p>
              <h2 className="mt-3 text-2xl"><Link className="hover:text-oxblood" href={`/blog/${post.slug}`}>{post.title}</Link></h2>
              <p className="mt-3 text-sm leading-7 text-muted">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="mt-5 inline-block text-sm font-bold uppercase tracking-wider text-oxblood">Read more</Link>
            </div>
          </article>
        ))}
      </section>
      <Newsletter />
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/breadcrumb";
import { Newsletter } from "@/components/newsletter";
import { blogPosts, getBlogPost } from "@/data/blog";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getBlogPost((await params).slug);
  return post ? { title: post.title, description: post.excerpt } : {};
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getBlogPost((await params).slug);
  if (!post) notFound();
  return (
    <>
      <Breadcrumb items={[{ label: "Recipes", href: "/blog" }, { label: post.title }]} />
      <article className="container-site max-w-4xl pb-20">
        <header className="mb-9 text-center">
          <p className="eyebrow">{post.category} / {post.date} / {post.readTime}</p>
          <h1 className="mx-auto mt-5 max-w-3xl text-5xl leading-tight">{post.title}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted">{post.excerpt}</p>
        </header>
        <Image src={post.image} alt="" width={1200} height={700} className="mb-12 aspect-[1.75] w-full rounded-sm object-cover" />
        <div className="mx-auto max-w-2xl text-base leading-8">
          <p className="mb-9 text-lg text-muted">{post.introduction}</p>
          {post.sections.map((section) => (
            <section key={section.heading} className="mb-10">
              <h2 className="mb-4 text-3xl">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph} className="mb-4 text-muted">{paragraph}</p>)}
            </section>
          ))}
        </div>
      </article>
      <Newsletter />
    </>
  );
}

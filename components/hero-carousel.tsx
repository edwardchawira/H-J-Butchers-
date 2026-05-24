"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type HeroSlide = {
  image: string;
  name: string;
};

export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || slides.length < 2) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative isolate min-h-[min(72vh,690px)] overflow-hidden bg-charcoal">
      {slides.map((slide, index) => (
        <Image
          key={slide.name}
          src={slide.image}
          alt=""
          fill
          priority={index === 0}
          sizes="100vw"
          className={`object-cover object-center transition-opacity duration-1000 motion-reduce:transition-none ${index === activeSlide ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/72 via-charcoal/28 to-transparent" />
      <div className="container-site relative flex min-h-[min(72vh,690px)] items-center py-16">
        <div className="animate-rise max-w-2xl text-cream">
          <p className="eyebrow">The nation&apos;s local butcher</p>
          <h1 className="mt-4 text-5xl font-bold leading-[1.08] sm:text-6xl lg:text-7xl">
            Premium meat,<br />delivered fresh.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-white/80 sm:text-lg">
            Hand-selected British cuts, prepared by expert butchers and delivered chilled for remarkable meals at home.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button asChild variant="secondary" className="h-13 px-8">
              <Link href="/shop">Shop now</Link>
            </Button>
            <Button asChild variant="outline" className="h-13 border-white px-8 text-white hover:bg-white hover:text-charcoal">
              <Link href="/about">Our story</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-7 right-5 z-10 flex gap-2 sm:right-10" aria-label="Select featured category image">
        {slides.map((slide, index) => (
          <button
            key={slide.name}
            type="button"
            aria-label={`Show ${slide.name} image`}
            aria-current={index === activeSlide}
            onClick={() => setActiveSlide(index)}
            className={`h-2.5 rounded-full transition-all ${index === activeSlide ? "w-8 bg-gold" : "w-2.5 bg-white/65 hover:bg-white"}`}
          />
        ))}
      </div>
    </section>
  );
}

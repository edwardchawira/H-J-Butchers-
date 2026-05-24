import type { Metadata } from "next";
import { Award, Axe, Heart } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us",
  description: "Meet H&J Butchers founders Heath Vermaak and Wai Yee Chan and discover our passion for quality meat and expert service.",
};

const values = [
  {
    icon: Award,
    title: "Premium Quality",
    description: "We source the finest meat and prepare it with care.",
  },
  {
    icon: Axe,
    title: "Expert Butchers",
    description: "Skilled craftspeople with years of experience.",
  },
  {
    icon: Heart,
    title: "Local & Trusted",
    description: "Proud to be part of the community we serve.",
  },
];

export default function AboutPage() {
  return (
    <article className="bg-[#fbf8f3]">
      <section className="grid lg:grid-cols-[37.3%_62.7%]">
        <div className="flex flex-col justify-center px-7 py-12 sm:px-14 sm:py-16 lg:min-h-[585px] lg:px-[clamp(2.5rem,4vw,3.8rem)]">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-oxblood">About us</p>
          <span className="mt-5 block h-px w-12 bg-oxblood" aria-hidden="true" />
          <h1 className="mt-7 text-[clamp(2.6rem,4.15vw,4.05rem)] font-bold leading-[1.07] tracking-[-0.035em] text-oxblood">
            Passion for
            <br />
            quality. Pride in
            <br />
            every cut.
          </h1>
          <div className="mt-7 h-px w-36 bg-[#d4bda6]" aria-hidden="true" />
          <p className="mt-6 max-w-md text-[0.96rem] leading-7 text-charcoal">
            At H&amp;J Butchers, we&apos;ve been serving our community with the finest quality meat and exceptional service. Founded by Heath Vermaak and Wai Yee Chan.
          </p>
          <p className="mt-4 max-w-md text-[0.96rem] leading-7 text-charcoal">
            Our expert butchers take pride in every cut, sourcing responsibly and preparing everything to the highest standards. It&apos;s our passion for quality and our commitment to you that sets us apart.
          </p>
          <p className="mt-7 text-sm font-bold text-oxblood">
            Quality you can taste. Service you can trust.
          </p>
        </div>
        <div className="about-photo about-hero-photo min-h-[380px] lg:min-h-[585px]">
          <Image
            src="/images/about-us-showcase.jpg"
            alt="A butcher cutting a marbled joint of beef at the counter"
            width={1536}
            height={1024}
            className="about-hero-image"
            sizes="(min-width: 1024px) 63vw, 100vw"
            priority
          />
        </div>
      </section>

      <section className="grid gap-1 bg-white p-1 sm:h-[clamp(220px,20.7vw,316px)] sm:grid-cols-[5fr_5fr_6fr]" aria-label="H&J Butchers gallery">
        <div className="about-photo about-shop-photo aspect-[1.5] sm:aspect-auto">
          <Image src="/images/about-us-showcase.jpg" alt="H&J Butchers shop sign" width={1536} height={1024} sizes="(min-width: 640px) 32vw, 100vw" />
        </div>
        <div className="about-photo about-counter-photo aspect-[1.5] sm:aspect-auto">
          <Image src="/images/about-us-showcase.jpg" alt="Fresh steaks displayed at the butcher counter" width={1536} height={1024} sizes="(min-width: 640px) 32vw, 100vw" />
        </div>
        <div className="about-photo about-parcel-photo aspect-[1.5] sm:aspect-auto">
          <Image src="/images/about-us-showcase.jpg" alt="A carefully wrapped H&J Butchers parcel" width={1536} height={1024} sizes="(min-width: 640px) 38vw, 100vw" />
        </div>
      </section>

      <section className="px-7 py-8 sm:px-10 lg:px-16" aria-label="Our values">
        <div className="mx-auto grid max-w-5xl gap-7 md:grid-cols-3 md:gap-0">
          {values.map(({ icon: Icon, title, description }, index) => (
            <div
              key={title}
              className={`flex items-center gap-6 md:px-9 ${index > 0 ? "md:border-l md:border-[#ddcdbd]" : ""}`}
            >
              <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-oxblood text-oxblood">
                <Icon className="h-9 w-9" strokeWidth={1.6} aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-[#75463c]">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}

import type { Metadata } from "next";
import { Mail, MessageSquare, Store } from "lucide-react";
import { Accordion } from "@/components/accordion";
import { Breadcrumb } from "@/components/breadcrumb";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact the Just Butcher demo team about delivery, products or your order.",
};

const faqs = [
  { title: "When do you deliver?", content: "We offer selected next-day and nominated-day deliveries Monday to Saturday. Place next-day orders by 2pm." },
  { title: "How is my meat kept chilled?", content: "Your order is packed with recyclable insulation and frozen gel packs in a temperature-controlled box." },
  { title: "Can I freeze my order?", content: "Yes. Unless a label states otherwise, fresh items may be frozen immediately on arrival and used within three months." },
  { title: "Where do you source your meat?", content: "We prioritise British farms and publish sourcing tags against each product. Our team can answer questions about individual cuts." },
];

export default function ContactPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Contact" }]} />
      <header className="container-site mb-12 text-center">
        <p className="eyebrow">We are here to help</p>
        <h1 className="section-title mt-3">Contact the butchers</h1>
      </header>
      <section className="container-site grid gap-10 pb-16 lg:grid-cols-[1fr_1.35fr]">
        <aside className="rounded-sm bg-charcoal p-8 text-white sm:p-10">
          <h2 className="text-3xl">Demo contact</h2>
          <p className="mt-4 text-sm leading-7 text-white/70">Use this area to show how a butcher, farm shop or food retailer can handle common customer enquiries.</p>
          <div className="mt-9 space-y-7 text-sm">
            <p className="flex gap-4"><Store className="h-5 w-5 shrink-0 text-gold" />Independent food retail<br />Ecommerce demo storefront</p>
            <p className="flex gap-4"><MessageSquare className="h-5 w-5 text-gold" />Product, delivery and order enquiry flows</p>
            <p className="flex gap-4"><Mail className="h-5 w-5 text-gold" /><a href="mailto:demo@justbutcher.example">demo@justbutcher.example</a></p>
          </div>
          <h3 className="mt-12 text-xl">Demo coverage</h3>
          <p className="mt-4 leading-7 text-white/70">Catalogue, basket, checkout, contact and customer support journeys.</p>
        </aside>
        <ContactForm />
      </section>
      <section className="bg-white py-16">
        <div className="container-site max-w-3xl">
          <p className="eyebrow text-center">Good to know</p>
          <h2 className="section-title mb-9 mt-3 text-center">Frequently asked questions</h2>
          <Accordion items={faqs} />
        </div>
      </section>
    </>
  );
}

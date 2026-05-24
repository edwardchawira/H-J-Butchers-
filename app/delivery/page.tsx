import type { Metadata } from "next";
import { CalendarClock, PackageCheck, Truck } from "lucide-react";
import { Breadcrumb } from "@/components/breadcrumb";
import { Accordion } from "@/components/accordion";

export const metadata: Metadata = {
  title: "Delivery Information",
  description: "Chilled delivery times, pricing and packaging information for H&J Butchers orders.",
};

export default function DeliveryPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Delivery information" }]} />
      <header className="container-site pb-12 text-center">
        <p className="eyebrow">Fresh to your door</p>
        <h1 className="section-title mt-3">Chilled delivery you can trust</h1>
      </header>
      <section className="container-site grid gap-5 pb-14 md:grid-cols-3">
        {[
          { icon: Truck, title: "Free over £75", text: "Standard chilled delivery is £6.95, or complimentary for orders above £75." },
          { icon: CalendarClock, title: "Choose your day", text: "Select an available delivery slot at checkout, Monday through Saturday." },
          { icon: PackageCheck, title: "Packed cold", text: "Recyclable insulated packaging and gel packs protect fresh quality." },
        ].map(({ icon: Icon, title, text }) => (
          <article key={title} className="bg-white p-8 text-center">
            <Icon className="mx-auto mb-5 h-8 w-8 text-oxblood" />
            <h2 className="text-2xl">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-muted">{text}</p>
          </article>
        ))}
      </section>
      <section className="container-site max-w-3xl pb-20">
        <Accordion items={[
          { title: "Where can you deliver?", content: "This concept shop offers mainland UK delivery coverage. Certain remote postcodes may require an additional transit day." },
          { title: "What if I am not home?", content: "Select a safe place when arranging delivery. Chilled packaging is designed to protect the order until you can refrigerate it." },
          { title: "Can I amend my delivery date?", content: "Contact our team before dispatch and we will do our best to reschedule your order." },
        ]} />
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";

export const metadata: Metadata = { title: "Terms & Conditions", description: "Terms for ordering from H&J Butchers concept storefront." };

export default function TermsPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Terms & conditions" }]} />
      <article className="container-site max-w-3xl pb-20 pt-5">
        <h1 className="section-title mb-8">Terms & conditions</h1>
        <p className="mb-9 leading-8 text-muted">Last updated: 24 May 2026. This demonstration storefront uses mock products and payment interfaces; no payment is processed.</p>
        {[
          ["Orders", "Prices are displayed in pounds sterling. Product availability, delivery selection and discounts are demonstrated for the website experience."],
          ["Fresh goods", "In a live service, fresh or perishable goods require immediate refrigeration on delivery and are subject to applicable cancellation exclusions."],
          ["Delivery", "Delivery charges and free-shipping thresholds are shown at basket and checkout. Selected delivery slots are illustrative in this build."],
          ["Contact", "For enquiries about these terms, use the contact page to reach the customer services team."],
        ].map(([heading, content]) => (
          <section key={heading} className="mb-9">
            <h2 className="mb-3 text-2xl">{heading}</h2>
            <p className="leading-8 text-muted">{content}</p>
          </section>
        ))}
      </article>
    </>
  );
}

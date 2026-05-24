import type { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";

export const metadata: Metadata = { title: "Privacy Policy", description: "Privacy information for H&J Butchers concept storefront." };

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Privacy policy" }]} />
      <article className="container-site max-w-3xl pb-20 pt-5">
        <h1 className="section-title mb-8">Privacy policy</h1>
        <p className="mb-10 leading-8 text-muted">This is a front-end demonstration. Basket and wishlist selections are stored only in your browser using local storage. Forms do not send personal information to a server.</p>
        {[
          ["Data used in this demo", "Basket products, wishlist products and an applied discount code persist locally so the shopping experience remains usable after refresh."],
          ["Contact and checkout forms", "Submitted form details are used only to demonstrate validation and interface states; there is no backend collection or payment processing."],
          ["Your control", "You can clear locally saved store data through your browser site-storage controls at any time."],
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

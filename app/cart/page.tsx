import type { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";
import { CartPageContent } from "@/components/cart-page-content";

export const metadata: Metadata = {
  title: "Your Basket",
  description: "Review your selected cuts and arrange chilled delivery.",
};

export default function CartPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Basket" }]} />
      <CartPageContent />
    </>
  );
}

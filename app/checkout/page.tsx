import type { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";
import { CheckoutForm } from "@/components/checkout-form";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Select your chilled delivery slot and securely complete your order.",
};

export default function CheckoutPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Basket", href: "/cart" }, { label: "Checkout" }]} />
      <CheckoutForm />
    </>
  );
}

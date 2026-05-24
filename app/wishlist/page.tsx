import type { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";
import { WishlistContent } from "@/components/wishlist-content";

export const metadata: Metadata = { title: "Wishlist", description: "Your saved premium butcher selections." };

export default function WishlistPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Wishlist" }]} />
      <WishlistContent />
    </>
  );
}

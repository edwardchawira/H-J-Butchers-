import type { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";
import { ShopCatalogue } from "@/components/shop-catalogue";

export const metadata: Metadata = {
  title: "Shop Premium Meat",
  description: "Browse fresh steaks, joints, poultry, burgers and BBQ selections from Just Butcher.",
};

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ search?: string }> }) {
  const { search = "" } = await searchParams;
  return (
    <>
      <Breadcrumb items={[{ label: "Shop" }]} />
      <header className="container-site mb-10 border-b border-soft-border pb-8">
        <p className="eyebrow">Our butcher counter</p>
        <h1 className="section-title mt-3">{search ? `Results for "${search}"` : "Shop all meat"}</h1>
        <p className="mt-3 max-w-2xl text-muted">Prepared fresh, packed cold and delivered on the day that suits your kitchen.</p>
      </header>
      <ShopCatalogue initialSearch={search} />
    </>
  );
}

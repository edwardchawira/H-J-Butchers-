import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { DeliveryBanner } from "@/components/delivery-banner";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Butcher | Premium Meat Delivered",
    template: "%s | Butcher",
  },
  description:
    "Premium British meat, expertly prepared and chilled for next-day doorstep delivery.",
  openGraph: {
    type: "website",
    siteName: "Butcher",
    title: "Butcher | Premium Meat Delivered",
    description:
      "Premium British meat, expertly prepared and chilled for next-day doorstep delivery.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Butcher | Premium Meat Delivered",
    description:
      "Premium British meat, expertly prepared and chilled for next-day doorstep delivery.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <DeliveryBanner />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

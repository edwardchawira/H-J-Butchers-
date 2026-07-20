import { Camera, Globe, Mail, PlayCircle, Store } from "lucide-react";
import Link from "next/link";

const shopping = [
  ["Beef", "/category/beef"],
  ["Pork", "/category/pork"],
  ["Lamb", "/category/lamb"],
  ["Chicken", "/category/chicken"],
  ["BBQ", "/category/bbq"],
  ["Beverages", "/category/beverages"],
  ["Snacks and Confectionery", "/category/snacks-confectionery"],
];
const information = [
  ["About us", "/about"],
  ["Delivery information", "/delivery"],
  ["Recipes", "/blog"],
  ["Contact us", "/contact"],
  ["Terms & conditions", "/terms"],
  ["Privacy policy", "/privacy"],
];

export function Footer() {
  return (
    <footer className="bg-charcoal text-cream">
      <div className="container-site grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h2 className="text-3xl text-white">Butcher</h2>
          <p className="mt-4 max-w-xs text-sm leading-7 text-white/65">
            The nation&apos;s local butcher. Premium cuts, responsibly sourced and delivered chilled to your door.
          </p>
          <div className="mt-6 flex gap-4">
            <a href="https://www.instagram.com/" aria-label="Instagram" className="hover:text-gold"><Camera className="h-5 w-5" /></a>
            <a href="https://www.facebook.com/" aria-label="Facebook" className="hover:text-gold"><Globe className="h-5 w-5" /></a>
            <a href="https://www.youtube.com/" aria-label="YouTube" className="hover:text-gold"><PlayCircle className="h-5 w-5" /></a>
          </div>
        </div>
        <div>
          <h3 className="mb-5 font-sans text-xs font-bold uppercase tracking-[0.2em] text-gold">Shop</h3>
          <ul className="space-y-3 text-sm text-white/70">
            {shopping.map(([label, href]) => (
              <li key={href}><Link className="hover:text-white" href={href}>{label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-5 font-sans text-xs font-bold uppercase tracking-[0.2em] text-gold">Information</h3>
          <ul className="space-y-3 text-sm text-white/70">
            {information.map(([label, href]) => (
              <li key={href}><Link className="hover:text-white" href={href}>{label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-5 font-sans text-xs font-bold uppercase tracking-[0.2em] text-gold">Demo Contact</h3>
          <address className="space-y-4 text-sm not-italic text-white/70">
            <p className="flex gap-3"><Store className="mt-0.5 h-4 w-4 shrink-0 text-gold" />Independent food retail<br />Demo storefront</p>
            <p className="flex gap-3"><Mail className="h-4 w-4 text-gold" /><a href="mailto:demo@butcher.example">demo@butcher.example</a></p>
          </address>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/55 sm:flex-row">
          <p>Copyright © 2026 Butcher. Concept storefront.</p>
          <p className="tracking-widest">VISA &nbsp; MASTERCARD &nbsp; AMEX &nbsp; APPLE PAY &nbsp; PAYPAL</p>
        </div>
      </div>
    </footer>
  );
}

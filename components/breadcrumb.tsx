import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="container-site py-5 text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link className="transition hover:text-oxblood" href="/">
            Home
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-2">
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            {item.href ? (
              <Link className="transition hover:text-oxblood" href={item.href}>
                {item.label}
              </Link>
            ) : (
              <span className="text-charcoal" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

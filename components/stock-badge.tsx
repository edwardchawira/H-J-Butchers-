import type { StockLevel } from "@/data/products";
import { cn } from "@/lib/utils";

export function StockBadge({ level }: { level: StockLevel }) {
  const label = level === "high" ? "In stock" : level === "low" ? "Low stock" : "Out of stock";
  return (
    <span
      className={cn(
        "rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest",
        level === "high" && "bg-[#e8f2e8] text-[#286438]",
        level === "low" && "bg-[#fcf0d4] text-[#966c09]",
        level === "out" && "bg-[#f3dfdf] text-oxblood",
      )}
    >
      {label}
    </span>
  );
}

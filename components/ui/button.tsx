import { Slot } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  children: ReactNode;
};

export function Button({ asChild, className, variant = "primary", ...props }: ButtonProps) {
  const Component = asChild ? Slot : "button";
  return (
    <Component
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-sm px-5 text-sm font-semibold uppercase tracking-[0.12em] transition disabled:cursor-not-allowed disabled:opacity-45",
        variant === "primary" && "bg-oxblood text-white hover:bg-oxblood-dark",
        variant === "secondary" && "bg-gold text-charcoal hover:bg-[#b79438]",
        variant === "outline" && "border border-oxblood text-oxblood hover:bg-oxblood hover:text-white",
        variant === "ghost" && "text-charcoal hover:bg-[#efe7dc]",
        className,
      )}
      {...props}
    />
  );
}

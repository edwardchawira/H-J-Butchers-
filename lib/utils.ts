import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const FREE_DELIVERY_THRESHOLD = 75;
export const STANDARD_DELIVERY_FEE = 6.95;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMoney(amount: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(amount);
}

export function deliveryCost(subtotal: number) {
  return subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : STANDARD_DELIVERY_FEE;
}

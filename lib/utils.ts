import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  value: number,
  currency: string = "USD",
  locale: string = "en-US"
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
}
export function formatPercentage(change: number | null | undefined): string {
  if (change === null || change === undefined || isNaN(change)) {
    return "0.0%";
  }
  const formattedChange = change.toFixed(1);
  return `${formattedChange}%`;
}

export function trendingClasses(value: number) {
  const isTrendingUp = value > 0;

  return {
    textClass: isTrendingUp ? "text-green-400" : "text-red-400",
    bgClass: isTrendingUp ? "bg-green-500/10" : "bg-red-500/10",
    iconClass: isTrendingUp ? "icon-up" : "icon-down",
  };
}

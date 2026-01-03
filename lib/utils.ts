import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combine various class name inputs into a single Tailwind-merged class string.
 *
 * @param inputs - One or more class values (strings, arrays, or conditional values) to be combined
 * @returns A single class string with Tailwind classes merged and duplicate/conflicting entries resolved
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a numeric value as a localized currency string.
 *
 * @param value - The numeric amount to format
 * @param currency - The ISO 4217 currency code to use (e.g., "USD", "EUR")
 * @param locale - The BCP 47 locale tag controlling formatting rules (e.g., "en-US")
 * @returns The formatted currency string (for example, "$1,234.56")
 */
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
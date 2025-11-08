
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Product } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Dynamically determines the status of a medication based on its expiry date and current status.
 * @param product The medication product to check.
 * @returns 'Expired', 'Completed', or the original status.
 */
export function getDynamicStatus(product: Product): Product['status'] {
  if (product.expiry) {
    const expiryDate = new Date(product.expiry);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Compare dates only

    if (expiryDate < today) {
      return 'Expired';
    }
  }
  return product.status;
}

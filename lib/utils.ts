import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges Tailwind CSS class names, resolving conflicts correctly.
 * Standard shadcn/ui utility — used by all UI primitives.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

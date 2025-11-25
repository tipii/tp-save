import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUserInitials(name: string) {
  return name
    .split(' ')
    .map((name: string) => name.charAt(0))
    .join('');
}

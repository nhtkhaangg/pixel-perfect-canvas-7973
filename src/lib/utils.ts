import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formats an ISO date (yyyy-MM-dd…) as dd/MM/yyyy; returns input unchanged otherwise. */
export function vnDate(value: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})(.*)$/.exec(value);
  return m ? `${m[3]}/${m[2]}/${m[1]}${(m[4] ?? "").replace("T", " ")}` : value;
}

/** Formats a number as Vietnamese currency, e.g. 1.200.000 VNĐ. */
export function vnd(n: number) {
  return `${new Intl.NumberFormat("vi-VN").format(n)} VNĐ`;
}

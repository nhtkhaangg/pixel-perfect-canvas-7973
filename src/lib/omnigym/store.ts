import { useSyncExternalStore } from "react";
import {
  canonicalPackages,
  canonicalTrainers,
  canonicalFacilities,
  canonicalCustomers,
  canonicalExercises,
  canonicalStaff,
  canonicalManagers,
  canonicalBlogs,
  canonicalPayments,
  canonicalReviews,
  canonicalCheckIns,
  canonicalBookings,
  canonicalPurchased,
  type RecordRow,
} from "./data";
const initial: Record<string, RecordRow[]> = {
  purchased: canonicalPurchased,
  packages: canonicalPackages,
  trainers: canonicalTrainers,
  facilities: canonicalFacilities,
  customers: canonicalCustomers,
  exercises: canonicalExercises,
  staff: canonicalStaff,
  managers: canonicalManagers,
  blogs: canonicalBlogs,
  payments: canonicalPayments,
  "blog-reviews": canonicalReviews,
  "check-in": canonicalCheckIns,
  schedule: canonicalBookings,
};
const state = new Map(Object.entries(initial));
const listeners = new Set<() => void>();
const empty: RecordRow[] = [];
export const entityStore = {
  get: (key: string) => state.get(key) ?? empty,
  save(key: string, row: RecordRow) {
    const current = this.get(key);
    state.set(
      key,
      current.some((r) => r["id"] === row["id"])
        ? current.map((r) => (r["id"] === row["id"] ? row : r))
        : [...current, row],
    );
    listeners.forEach((l) => l());
  },
  remove(key: string, id: string) {
    state.set(
      key,
      this.get(key).filter((r) => r["id"] !== id),
    );
    listeners.forEach((l) => l());
  },
};
export function useEntities(key: string) {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => entityStore.get(key),
    () => initial[key] ?? empty,
  );
}

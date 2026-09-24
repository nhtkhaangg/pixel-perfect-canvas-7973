import { useSyncExternalStore } from "react";

/** Minimal shared in-memory collection store so list/detail pages stay in sync. */
export function createStore<T extends { id: string }>(seed: T[]) {
  let state = seed;
  const listeners = new Set<() => void>();
  const emit = () => listeners.forEach((l) => l());
  return {
    get: () => state,
    set(next: T[]) { state = next; emit(); },
    upsert(item: T) { state = state.some((x) => x.id === item.id) ? state.map((x) => (x.id === item.id ? item : x)) : [item, ...state]; emit(); },
    remove(id: string) { state = state.filter((x) => x.id !== id); emit(); },
    use() {
      return useSyncExternalStore((l) => { listeners.add(l); return () => listeners.delete(l); }, () => state, () => seed);
    },
  };
}

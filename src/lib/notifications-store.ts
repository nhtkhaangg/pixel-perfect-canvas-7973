import { useSyncExternalStore } from "react";
import { notifications as seed, type Notification } from "@/lib/mock/customer";

// Tiny in-memory store so list and detail pages share read/delete state.
let state: Notification[] = seed;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export const notificationStore = {
  remove(ids: string[]) { state = state.filter((n) => !ids.includes(n.id)); emit(); },
  markRead(ids: string[], read = true) { state = state.map((n) => (ids.includes(n.id) ? { ...n, read } : n)); emit(); },
};

export function useNotifications() {
  return useSyncExternalStore(
    (l) => { listeners.add(l); return () => listeners.delete(l); },
    () => state,
    () => seed,
  );
}

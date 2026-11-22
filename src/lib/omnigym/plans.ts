import { useSyncExternalStore } from "react";
import { plans as oldPlans, lessonPlans } from "@/lib/mock/trainer";
import { canonicalExercises } from "./data";
export type PlanDetail = {
  day_of_week: number;
  ex_id: string;
  target_sets: number;
  target_reps: string;
  target_weight_kg: number;
  rest_seconds: number;
};
export type Plan = {
  id: string;
  plan_name: string;
  goal: string;
  durationWeeks: number;
  cus_id: string;
  plan_type: string;
  status: "DRAFT" | "ACTIVE" | "ARCHIVED";
  is_ai_generated: boolean;
  version: number;
  details: PlanDetail[];
};
const initial: Plan[] = oldPlans.map((p) => ({
  id: p.id,
  plan_name: p.title,
  goal: p.goal,
  durationWeeks: p.durationWeeks,
  cus_id: p.clientId,
  plan_type: "TEMPLATE",
  status: p.status,
  is_ai_generated: p.isAiGenerated,
  version: p.version,
  details: (lessonPlans[0]?.blocks ?? []).map((b, i) => ({
    day_of_week: 1,
    ex_id: canonicalExercises[i]?.id ?? "ex_1",
    target_sets: b.sets,
    target_reps: b.reps.slice(0, 20),
    target_weight_kg: 85,
    rest_seconds: 60,
  })),
}));
let rows = initial;
const listeners = new Set<() => void>();
export function activatePlan(current: Plan[], id: string) {
  const selected = current.find((p) => p.id === id);
  if (!selected) return current;
  return current.map((p) =>
    p.id === id
      ? { ...p, status: "ACTIVE" as const }
      : selected.cus_id && p.cus_id === selected.cus_id && p.status === "ACTIVE"
        ? { ...p, status: "ARCHIVED" as const }
        : p,
  );
}
export const plansStore = {
  get: () => rows,
  save(p: Plan) {
    rows = rows.some((x) => x.id === p.id)
      ? rows.map((x) => (x.id === p.id ? p : x))
      : [...rows, p];
    listeners.forEach((l) => l());
  },
  activate(id: string) {
    rows = activatePlan(rows, id);
    listeners.forEach((l) => l());
  },
  archive(id: string) {
    rows = rows.map((p) => (p.id === id ? { ...p, status: "ARCHIVED" } : p));
    listeners.forEach((l) => l());
  },
};
export function usePlans() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => rows,
    () => initial,
  );
}

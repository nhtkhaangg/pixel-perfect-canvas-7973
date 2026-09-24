import { createFileRoute } from "@tanstack/react-router";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { seo } from "@/lib/seo";
import { clients, nutritionPlans } from "@/lib/mock/trainer";
import { toStatus } from "@/lib/mock/customer";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { FormField } from "@/components/shared/form-field";
import { Panel } from "@/components/customer/alerts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/trainer/nutrition")({
  head: () => seo("Nutrition plans", "Create diet and nutrition plans with macro targets for clients."),
  component: Nutrition,
});

function Nutrition() {
  const [list, setList] = useState(nutritionPlans);
  const [clientId, setClientId] = useState("cus_1088");
  const [cal, setCal] = useState("2000");
  const [pct, setPct] = useState({ protein: "30", carbs: "45", fat: "25" });
  const [meals, setMeals] = useState([{ name: "Breakfast", items: "Oats, whey, berries" }, { name: "Lunch", items: "Chicken, rice, vegetables" }, { name: "Dinner", items: "Salmon, potatoes, salad" }]);
  const [err, setErr] = useState<string>();
  const total = Number(pct.protein) + Number(pct.carbs) + Number(pct.fat);
  const g = (k: keyof typeof pct, kcal: number) => Math.round((Number(cal) * Number(pct[k])) / 100 / kcal);

  function save(status: "DRAFT" | "ACTIVE") {
    if (total !== 100) return setErr("Macros must add up to 100%");
    if (!(Number(cal) >= 1000 && Number(cal) <= 5000)) return setErr("Calories 1000–5000");
    setErr(undefined);
    const c = clients.find((x) => x.id === clientId)!;
    setList([{ id: `np_${Date.now()}`, client: c.name, calories: Number(cal), protein: g("protein", 4), carbs: g("carbs", 4), fat: g("fat", 9), status, updatedAt: "2026-09-24" }, ...list]);
    toast.success(status === "ACTIVE" ? `Nutrition plan published to ${c.name}` : "Saved as draft");
  }

  return (
    <>
      <PageHeader title="Nutrition plans" description="Set daily calories, macros and a sample day of meals." />
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <Panel title="Create diet plan">
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5"><Label>Client</Label><Select value={clientId} onValueChange={setClientId}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{clients.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent></Select></div>
              <FormField label="Daily calories (kcal)" error={err}>{(p) => <Input {...p} type="number" value={cal} onChange={(e) => setCal(e.target.value)} />}</FormField>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {(["protein", "carbs", "fat"] as const).map((k) => (
                <div key={k} className="rounded-md border border-border p-3">
                  <Label className="capitalize">{k} %</Label>
                  <Input className="mt-1.5" type="number" value={pct[k]} onChange={(e) => setPct({ ...pct, [k]: e.target.value })} />
                  <p className="mt-1 text-xs text-muted-foreground">{g(k, k === "fat" ? 9 : 4)} g/day</p>
                </div>
              ))}
            </div>
            <div className="flex h-2 overflow-hidden rounded-full bg-muted">
              <div className="bg-chart-1" style={{ width: `${pct.protein}%` }} /><div className="bg-chart-2" style={{ width: `${pct.carbs}%` }} /><div className="bg-chart-3" style={{ width: `${pct.fat}%` }} />
            </div>
            <p className={`text-xs ${total === 100 ? "text-muted-foreground" : "text-destructive"}`}>Total {total}%</p>
            <div className="space-y-2">
              <Label>Meals</Label>
              {meals.map((m, i) => (
                <div key={i} className="flex gap-2">
                  <Input className="w-32" value={m.name} onChange={(e) => setMeals(meals.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))} />
                  <Input className="flex-1" value={m.items} onChange={(e) => setMeals(meals.map((x, j) => (j === i ? { ...x, items: e.target.value } : x)))} />
                  <Button size="icon" variant="ghost" onClick={() => setMeals(meals.filter((_, j) => j !== i))}><Trash2 className="size-4" /></Button>
                </div>
              ))}
              <Button size="sm" variant="outline" onClick={() => setMeals([...meals, { name: "Snack", items: "" }])}><Plus className="size-4" /> Add meal</Button>
            </div>
            <FormField label="Notes">{(p) => <Textarea {...p} placeholder="Hydration, supplements, allergies…" />}</FormField>
            <div className="flex gap-2"><Button onClick={() => save("ACTIVE")}>Publish to client</Button><Button variant="outline" onClick={() => save("DRAFT")}>Save draft</Button></div>
          </div>
        </Panel>
        <Panel title="Existing plans">
          <ul className="space-y-3">
            {list.map((n) => (
              <li key={n.id} className="rounded-md border border-border p-3">
                <div className="flex items-center justify-between"><p className="font-medium">{n.client}</p><StatusBadge status={toStatus(n.status)} label={n.status} /></div>
                <p className="mt-1 text-sm">{n.calories} kcal · P {n.protein}g · C {n.carbs}g · F {n.fat}g</p>
                <p className="text-xs text-muted-foreground">Updated {n.updatedAt}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}

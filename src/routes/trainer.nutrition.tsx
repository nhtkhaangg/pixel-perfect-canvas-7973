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
  head: () => seo("Kế hoạch dinh dưỡng", "Xây dựng thực đơn và mục tiêu dinh dưỡng cho hội viên."),
  component: Nutrition,
});

const macroLabel: Record<string, string> = { protein: "Đạm", carbs: "Tinh bột", fat: "Chất béo" };

function Nutrition() {
  const [list, setList] = useState(nutritionPlans);
  const [clientId, setClientId] = useState("cus_1088");
  const [cal, setCal] = useState("2000");
  const [pct, setPct] = useState({ protein: "30", carbs: "45", fat: "25" });
  const [meals, setMeals] = useState([{ name: "Bữa sáng", items: "Yến mạch, whey, quả mọng" }, { name: "Bữa trưa", items: "Ức gà, cơm, rau củ" }, { name: "Bữa tối", items: "Cá hồi, khoai tây, salad" }]);
  const [err, setErr] = useState<string>();
  const total = Number(pct.protein) + Number(pct.carbs) + Number(pct.fat);
  const g = (k: keyof typeof pct, kcal: number) => Math.round((Number(cal) * Number(pct[k])) / 100 / kcal);

  function save(status: "DRAFT" | "ACTIVE") {
    if (total !== 100) return setErr("Tổng tỷ lệ dinh dưỡng phải bằng 100%");
    if (!(Number(cal) >= 1000 && Number(cal) <= 5000)) return setErr("Calo phải trong khoảng 1000–5000");
    setErr(undefined);
    const c = clients.find((x) => x.id === clientId)!;
    setList([{ id: `np_${Date.now()}`, client: c.name, calories: Number(cal), protein: g("protein", 4), carbs: g("carbs", 4), fat: g("fat", 9), status, updatedAt: "2026-09-24" }, ...list]);
    toast.success(status === "ACTIVE" ? `Đã gửi kế hoạch dinh dưỡng cho ${c.name}` : "Đã lưu bản nháp");
  }

  return (
    <>
      <PageHeader title="Kế hoạch dinh dưỡng" description="Thiết lập calo, tỷ lệ dinh dưỡng và thực đơn mẫu trong ngày." />
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <Panel title="Tạo kế hoạch ăn uống">
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5"><Label>Hội viên</Label><Select value={clientId} onValueChange={setClientId}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{clients.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent></Select></div>
              <FormField label="Calo mỗi ngày (kcal)" error={err}>{(p) => <Input {...p} type="number" value={cal} onChange={(e) => setCal(e.target.value)} />}</FormField>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {(["protein", "carbs", "fat"] as const).map((k) => (
                <div key={k} className="rounded-md border border-border p-3">
                  <Label>{macroLabel[k]} %</Label>
                  <Input className="mt-1.5" type="number" value={pct[k]} onChange={(e) => setPct({ ...pct, [k]: e.target.value })} />
                  <p className="mt-1 text-xs text-muted-foreground">{g(k, k === "fat" ? 9 : 4)} g/ngày</p>
                </div>
              ))}
            </div>
            <div className="flex h-2 overflow-hidden rounded-full bg-muted">
              <div className="bg-chart-1" style={{ width: `${pct.protein}%` }} /><div className="bg-chart-2" style={{ width: `${pct.carbs}%` }} /><div className="bg-chart-3" style={{ width: `${pct.fat}%` }} />
            </div>
            <p className={`text-xs ${total === 100 ? "text-muted-foreground" : "text-destructive"}`}>Tổng {total}%</p>
            <div className="space-y-2">
              <Label>Bữa ăn</Label>
              {meals.map((m, i) => (
                <div key={i} className="flex gap-2">
                  <Input className="w-32" value={m.name} onChange={(e) => setMeals(meals.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))} />
                  <Input className="flex-1" value={m.items} onChange={(e) => setMeals(meals.map((x, j) => (j === i ? { ...x, items: e.target.value } : x)))} />
                  <Button size="icon" variant="ghost" onClick={() => setMeals(meals.filter((_, j) => j !== i))}><Trash2 className="size-4" /></Button>
                </div>
              ))}
              <Button size="sm" variant="outline" onClick={() => setMeals([...meals, { name: "Bữa phụ", items: "" }])}><Plus className="size-4" /> Thêm bữa ăn</Button>
            </div>
            <FormField label="Ghi chú">{(p) => <Textarea {...p} placeholder="Nước uống, thực phẩm bổ sung, dị ứng…" />}</FormField>
            <div className="flex gap-2"><Button onClick={() => save("ACTIVE")}>Gửi cho hội viên</Button><Button variant="outline" onClick={() => save("DRAFT")}>Lưu bản nháp</Button></div>
          </div>
        </Panel>
        <Panel title="Kế hoạch hiện có">
          <ul className="space-y-3">
            {list.map((n) => (
              <li key={n.id} className="rounded-md border border-border p-3">
                <div className="flex items-center justify-between"><p className="font-medium">{n.client}</p><StatusBadge status={toStatus(n.status)} label={n.status} /></div>
                <p className="mt-1 text-sm">{n.calories} kcal · Đạm {n.protein}g · Tinh bột {n.carbs}g · Béo {n.fat}g</p>
                <p className="text-xs text-muted-foreground">Cập nhật {n.updatedAt}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}

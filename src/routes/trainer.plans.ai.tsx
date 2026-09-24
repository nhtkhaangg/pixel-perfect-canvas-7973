import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { RefreshCw, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { seo } from "@/lib/seo";
import { clients } from "@/lib/mock/trainer";
import { planStore } from "@/lib/trainer-stores";
import { PageHeader } from "@/components/shared/page-header";
import { Panel } from "@/components/customer/alerts";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/trainer/plans/ai")({
  head: () => seo("Đề xuất giáo án bằng AI", "Tạo giáo án tập luyện được AI đề xuất dựa trên đánh giá và chỉ số của hội viên."),
  component: AiPlan,
});

const templates: Record<string, { focus: string; sessions: string[] }[]> = {
  strength: [{ focus: "Kỹ thuật & nền tảng", sessions: ["Squat + bài bổ trợ", "Ngực + lưng", "Deadlift + bụng"] }, { focus: "Tăng tiến tuyến tính", sessions: ["Thân dưới nặng", "Thân trên nặng", "Toàn thân khối lượng"] }, { focus: "Đỉnh cao", sessions: ["Đơn nặng", "Ngày kiểm tra"] }],
  fatloss: [{ focus: "Thói quen & nền tảng", sessions: ["Circuit toàn thân", "Cardio Zone 2", "Sức mạnh toàn thân"] }, { focus: "Trao đổi chất", sessions: ["Interval", "Sức mạnh", "Circuit"] }, { focus: "Củng cố", sessions: ["Sức mạnh", "Thể lực"] }],
};

function AiPlan() {
  const navigate = useNavigate();
  const [clientId, setClientId] = useState("cus_1101");
  const [weeks, setWeeks] = useState("12");
  const [focus, setFocus] = useState("fatloss");
  const [state, setState] = useState<"idle" | "loading" | "ready">("idle");
  const c = clients.find((x) => x.id === clientId)!;
  const phases = templates[focus]!;

  function generate() { setState("loading"); setTimeout(() => setState("ready"), 1400); }
  function save() {
    const id = `wp_${Date.now()}`;
    const w = Number(weeks);
    planStore.upsert({
      id, clientId, client: c.name, title: `Giáo án ${focus === "strength" ? "sức mạnh" : "giảm mỡ"} (AI)`, goal: c.goal, durationWeeks: w, version: 1, isAiGenerated: true, status: "DRAFT", updatedAt: "2026-09-24",
      weeks: phases.map((p, i) => ({ week: 1 + Math.round((i * w) / phases.length), ...p })),
      milestones: [{ week: Math.round(w / 2), title: "Kiểm tra giữa chặng", target: "Đo lại chỉ số", status: "PENDING" }, { week: w, title: "Hoàn thành chặng", target: c.goal, status: "PENDING" }],
      versions: [{ version: 1, date: "2026-09-24", author: "Trợ lý AI", change: "Bản nháp do AI tạo", status: "DRAFT" }],
    });
    toast.success("Đã lưu dưới dạng bản nháp");
    navigate({ to: "/trainer/plans/$id", params: { id } });
  }

  return (
    <>
      <PageHeader title="Giáo án đề xuất bởi AI" description="Sử dụng đánh giá, chỉ số, thời gian rảnh và mức độ tuân thủ của hội viên." />
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <Panel title="Thông tin đầu vào">
          <div className="space-y-4">
            <div className="space-y-1.5"><Label>Hội viên</Label><Select value={clientId} onValueChange={setClientId}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{clients.map((x) => <SelectItem key={x.id} value={x.id}>{x.name}</SelectItem>)}</SelectContent></Select></div>
            <div className="space-y-1.5"><Label>Mục tiêu chính</Label><Select value={focus} onValueChange={setFocus}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="strength">Sức mạnh</SelectItem><SelectItem value="fatloss">Giảm mỡ</SelectItem></SelectContent></Select></div>
            <div className="space-y-1.5"><Label>Thời lượng (tuần)</Label><Input type="number" min={4} max={24} value={weeks} onChange={(e) => setWeeks(e.target.value)} /></div>
            <div className="rounded-md bg-muted p-3 text-xs text-muted-foreground">Mục tiêu: {c.goal}<br />Tuân thủ: {c.adherence}% · còn {c.sessionsLeft} buổi</div>
            <Button className="w-full" onClick={generate} disabled={state === "loading"}>{state === "loading" ? <RefreshCw className="size-4 animate-spin" /> : <Sparkles className="size-4" />} {state === "ready" ? "Tạo lại" : "Tạo giáo án"}</Button>
          </div>
        </Panel>
        {state === "idle" ? (
          <div className="flex min-h-72 flex-col items-center justify-center rounded-lg border border-dashed border-border text-center"><Sparkles className="size-8 text-primary" /><p className="mt-3 font-medium">Chọn hội viên và tạo giáo án</p><p className="text-sm text-muted-foreground">Bạn có thể chỉnh sửa mọi thứ trước khi xuất bản.</p></div>
        ) : state === "loading" ? (
          <div className="space-y-3">{[0, 1, 2].map((i) => <div key={i} className="h-28 animate-pulse rounded-lg bg-muted" />)}</div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 rounded-lg border border-primary/30 bg-accent px-4 py-3 text-sm text-accent-foreground"><Sparkles className="size-4" /> Đề xuất giáo án {weeks} tuần cho {c.name} · 3 buổi/tuần · độ tin cậy 87%</div>
            {phases.map((ph, i) => (
              <div key={ph.focus} className="rounded-lg border border-border bg-card p-5">
                <p className="text-xs text-muted-foreground">Giai đoạn {i + 1} · tuần {1 + Math.round((i * Number(weeks)) / phases.length)}–{Math.round(((i + 1) * Number(weeks)) / phases.length)}</p>
                <p className="font-semibold">{ph.focus}</p>
                <div className="mt-3 flex flex-wrap gap-2">{ph.sessions.map((s) => <span key={s} className="rounded-md bg-muted px-2.5 py-1 text-sm">{s}</span>)}</div>
              </div>
            ))}
            <div className="flex gap-2"><Button onClick={save}>Lưu bản nháp</Button><Button variant="outline" onClick={() => setState("idle")}>Hủy bỏ</Button></div>
          </div>
        )}
      </div>
    </>
  );
}

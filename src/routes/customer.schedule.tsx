import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { seo } from "@/lib/seo";
import { sessions, toStatus, type TrainingSession } from "@/lib/mock/customer";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { FormModal } from "@/components/shared/form-modal";
import { FormField } from "@/components/shared/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/customer/schedule")({
  head: () => seo("Lịch tập của tôi", "Lịch các buổi tập của bạn tại GymFit kèm yêu cầu đổi lịch."),
  component: Schedule,
});

const pad = (n: number) => String(n).padStart(2, "0");

function Schedule() {
  const [month, setMonth] = useState(new Date(2026, 8, 1));
  const [selected, setSelected] = useState<TrainingSession | null>(null);
  const [resched, setResched] = useState<TrainingSession | null>(null);
  const [f, setF] = useState({ date: "", time: "", reason: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const y = month.getFullYear(), m = month.getMonth();
  const offset = (new Date(y, m, 1).getDay() + 6) % 7;
  const daysIn = new Date(y, m + 1, 0).getDate();
  const cells = Array.from({ length: Math.ceil((offset + daysIn) / 7) * 7 }, (_, i) => i - offset + 1);
  const byDate = (d: number) => sessions.filter((s) => s.date === `${y}-${pad(m + 1)}-${pad(d)}`);

  function submit() {
    const errs: Record<string, string> = {};
    if (!f.date) errs["date"] = "Chọn ngày mới";
    if (!f.time) errs["time"] = "Chọn giờ";
    if (f.reason.trim().length < 5) errs["reason"] = "Nhập lý do ngắn gọn";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    toast.success("Đã gửi yêu cầu đổi lịch", { description: "Huấn luyện viên sẽ xác nhận sớm." });
    setResched(null);
  }

  return (
    <>
      <PageHeader title="Lịch tập" description="Các buổi tập PT của bạn. Nhấn vào buổi tập để xem chi tiết hoặc yêu cầu đổi giờ." actions={<Button variant="outline" asChild><Link to="/customer/reschedule">Yêu cầu đổi lịch</Link></Button>} />
      <div className="rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => setMonth(new Date(y, m - 1, 1))}><ChevronLeft className="size-4" /></Button>
          <p className="font-semibold">{month.toLocaleDateString("vi-VN", { month: "long", year: "numeric" })}</p>
          <Button variant="ghost" size="icon" onClick={() => setMonth(new Date(y, m + 1, 1))}><ChevronRight className="size-4" /></Button>
        </div>
        <div className="grid grid-cols-7 border-b border-border text-center text-xs font-medium text-muted-foreground">
          {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((d) => <div key={d} className="py-2">{d}</div>)}
        </div>
        <div className="grid grid-cols-7">
          {cells.map((d, i) => {
            const valid = d >= 1 && d <= daysIn;
            const isToday = valid && y === 2026 && m === 8 && d === 24;
            return (
              <div key={i} className={cn("min-h-24 border-r border-b border-border p-1.5 text-xs [&:nth-child(7n)]:border-r-0", !valid && "bg-muted/30")}>
                {valid ? (
                  <>
                    <span className={cn("inline-flex size-6 items-center justify-center rounded-full", isToday && "bg-primary text-primary-foreground")}>{d}</span>
                    <div className="mt-1 space-y-1">
                      {byDate(d).map((s) => (
                        <button key={s.id} type="button" onClick={() => setSelected(s)} className={cn("block w-full truncate rounded px-1.5 py-1 text-left", s.status === "COMPLETED" ? "bg-muted text-muted-foreground" : s.status === "MISSED" ? "bg-destructive/10 text-destructive" : "bg-primary/15 text-foreground")}>
                          {s.start} {s.focus}
                        </button>
                      ))}
                    </div>
                  </>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <FormModal
        open={!!selected}
        onOpenChange={(o) => !o && setSelected(null)}
        title={selected?.focus ?? ""}
        description={selected ? `${selected.date} · ${selected.start}–${selected.end} · ${selected.room}` : ""}
        footer={selected && (
          <>
            {selected.status === "UPCOMING" ? <Button variant="outline" onClick={() => { setResched(selected); setSelected(null); setF({ date: "", time: "", reason: "" }); }}>Yêu cầu đổi lịch</Button> : null}
            <Button asChild><Link to="/customer/sessions/$id" params={{ id: selected.id }}>Mở buổi tập</Link></Button>
          </>
        )}
      >
        {selected ? (
          <div className="space-y-3 text-sm">
            <StatusBadge status={toStatus(selected.status)} label={selected.status.replace("_", " ")} />
            <p>Huấn luyện viên: <span className="font-medium">{selected.trainer}</span></p>
            <ul className="list-inside list-disc text-muted-foreground">{selected.exercises.map((e) => <li key={e.name}>{e.name} — {e.sets}×{e.reps}</li>)}</ul>
          </div>
        ) : null}
      </FormModal>

      <FormModal open={!!resched} onOpenChange={(o) => !o && setResched(null)} title="Yêu cầu đổi lịch" description={resched ? `Hiện tại: ${resched.date} ${resched.start}` : ""} footer={<Button onClick={submit}>Gửi yêu cầu</Button>}>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Ngày mới" required error={errors["date"]}>{(p) => <Input {...p} type="date" value={f.date} onChange={(e) => setF({ ...f, date: e.target.value })} />}</FormField>
          <FormField label="Giờ mới" required error={errors["time"]}>{(p) => <Input {...p} type="time" value={f.time} onChange={(e) => setF({ ...f, time: e.target.value })} />}</FormField>
        </div>
        <FormField label="Lý do" required error={errors["reason"]}>{(p) => <Textarea {...p} value={f.reason} onChange={(e) => setF({ ...f, reason: e.target.value })} />}</FormField>
      </FormModal>
    </>
  );
}

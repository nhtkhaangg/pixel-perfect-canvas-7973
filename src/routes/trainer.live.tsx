import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Pause, Play, Plus, Square } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { seo } from "@/lib/seo";
import { bookings } from "@/lib/mock/trainer";
import { lessonStore } from "@/lib/trainer-stores";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Panel } from "@/components/customer/alerts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/trainer/live")({
  head: () => seo("Buổi tập trực tiếp", "Điều hành buổi tập trực tiếp: ghi lại các set theo thời gian thực kèm điểm RPE."),
  component: Live,
});

type LoggedSet = { exercise: string; reps: number; weight: number; rpe: number; time: string };
const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

function Live() {
  const lessons = lessonStore.use();
  const candidates = bookings.filter((b) => b.status === "IN_PROGRESS" || b.status === "UPCOMING");
  const [bookingId, setBookingId] = useState(candidates[0]!.id);
  const [lessonId, setLessonId] = useState(lessons[0]!.id);
  const [phase, setPhase] = useState<"setup" | "live" | "paused" | "done">("setup");
  const [elapsed, setElapsed] = useState(0);
  const [rest, setRest] = useState(0);
  const [log, setLog] = useState<LoggedSet[]>([]);
  const lesson = lessons.find((l) => l.id === lessonId)!;
  const booking = candidates.find((b) => b.id === bookingId)!;
  const [exercise, setExercise] = useState(lesson.blocks[0]?.exercise ?? "");
  const [reps, setReps] = useState("5");
  const [weight, setWeight] = useState("85");
  const [rpe, setRpe] = useState(7);

  useEffect(() => {
    if (phase !== "live") return;
    const t = setInterval(() => { setElapsed((e) => e + 1); setRest((r) => Math.max(0, r - 1)); }, 1000);
    return () => clearInterval(t);
  }, [phase]);

  function addSet() {
    if (!exercise || !Number(reps)) { toast.error("Nhập số reps"); return; }
    setLog([{ exercise, reps: Number(reps), weight: Number(weight), rpe, time: fmt(elapsed) }, ...log]);
    setRest(120);
    toast.success(`Đã ghi ${exercise} ${weight}×${reps} @ RPE ${rpe}`);
  }

  const volume = log.reduce((s, x) => s + x.reps * x.weight, 0);
  const avgRpe = log.length ? (log.reduce((s, x) => s + x.rpe, 0) / log.length).toFixed(1) : "—";

  if (phase === "setup")
    return (
      <>
        <PageHeader title="Buổi tập trực tiếp" description="Chọn buổi đặt lịch và giáo án buổi tập, sau đó bắt đầu đếm giờ." />
        <div className="max-w-xl space-y-4 rounded-lg border border-border bg-card p-6">
          <div className="space-y-1.5"><Label>Buổi đặt lịch</Label><Select value={bookingId} onValueChange={setBookingId}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{candidates.map((b) => <SelectItem key={b.id} value={b.id}>{b.date} {b.start} · {b.client}</SelectItem>)}</SelectContent></Select></div>
          <div className="space-y-1.5"><Label>Giáo án buổi tập</Label><Select value={lessonId} onValueChange={(v) => { setLessonId(v); setExercise(lessons.find((l) => l.id === v)?.blocks[0]?.exercise ?? ""); }}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{lessons.map((l) => <SelectItem key={l.id} value={l.id}>{l.title}</SelectItem>)}</SelectContent></Select></div>
          <Button className="w-full" size="lg" onClick={() => setPhase("live")}><Play className="size-4" /> Bắt đầu buổi tập</Button>
        </div>
      </>
    );

  if (phase === "done")
    return (
      <>
        <PageHeader title="Buổi tập hoàn tất" description={`${booking.client} · ${fmt(elapsed)}`} />
        <div className="grid gap-4 sm:grid-cols-3"><StatCard label="Số set đã ghi" value={log.length} /><StatCard label="Khối lượng" value={`${volume.toLocaleString("vi-VN")} kg`} /><StatCard label="RPE trung bình" value={avgRpe} /></div>
        <div className="flex gap-2"><Button asChild><Link to="/trainer/feedback">Viết nhận xét sau buổi tập</Link></Button><Button variant="outline" asChild><Link to="/trainer/verify">Xác nhận buổi tập</Link></Button></div>
      </>
    );

  return (
    <>
      <div className="flex flex-wrap items-center gap-4 rounded-lg bg-surface p-5 text-surface-foreground">
        <span className="flex items-center gap-2 text-xs font-semibold tracking-wider text-primary uppercase"><span className={cn("size-2 rounded-full bg-primary", phase === "live" && "animate-pulse")} /> {phase === "live" ? "Đang diễn ra" : "Tạm dừng"}</span>
        <div className="flex-1"><p className="font-semibold">{booking.client} · {lesson.title}</p><p className="text-xs text-surface-foreground/60">{booking.date} {booking.start}</p></div>
        <p className="font-mono text-3xl font-semibold">{fmt(elapsed)}</p>
        <Button variant="secondary" size="icon" onClick={() => setPhase(phase === "live" ? "paused" : "live")}>{phase === "live" ? <Pause className="size-4" /> : <Play className="size-4" />}</Button>
        <Button variant="destructive" onClick={() => { setPhase("done"); toast.success("Đã kết thúc buổi tập"); }}><Square className="size-4" /> Kết thúc</Button>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <Panel title="Giáo án">
            <ul className="space-y-2">
              {lesson.blocks.map((b) => {
                const done = log.filter((x) => x.exercise === b.exercise).length;
                return (
                  <li key={b.exercise}>
                    <button type="button" onClick={() => setExercise(b.exercise)} className={cn("flex w-full items-center justify-between rounded-md border p-3 text-left text-sm", exercise === b.exercise ? "border-primary bg-accent" : "border-border")}>
                      <span><span className="font-medium">{b.exercise}</span> <span className="text-muted-foreground">· {b.sets}×{b.reps}</span></span>
                      <span className={cn("flex items-center gap-1 text-xs", done >= b.sets ? "text-primary" : "text-muted-foreground")}>{done >= b.sets ? <CheckCircle2 className="size-4" /> : null}{done}/{b.sets}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Panel>
          <Panel title={`Nhật ký set (${log.length})`}>
            {log.length ? (
              <table className="w-full text-sm"><thead className="text-left text-xs text-muted-foreground"><tr><th className="pb-2">Thời gian</th><th>Bài tập</th><th>Kg × reps</th><th>RPE</th></tr></thead>
                <tbody className="divide-y divide-border">{log.map((s, i) => <tr key={i}><td className="py-2 font-mono text-xs">{s.time}</td><td>{s.exercise}</td><td>{s.weight} × {s.reps}</td><td><span className={cn("rounded px-1.5 py-0.5 text-xs font-medium", s.rpe >= 9 ? "bg-destructive/10 text-destructive" : s.rpe >= 7 ? "bg-warning/20" : "bg-accent")}>{s.rpe}</span></td></tr>)}</tbody>
              </table>
            ) : <p className="text-sm text-muted-foreground">Chưa có set nào.</p>}
          </Panel>
        </div>
        <div className="space-y-4">
          <Panel title="Ghi lại một set">
            <div className="space-y-4">
              <p className="text-sm font-medium">{exercise}</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5"><Label>Khối lượng (kg)</Label><Input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} /></div>
                <div className="space-y-1.5"><Label>Số reps</Label><Input type="number" value={reps} onChange={(e) => setReps(e.target.value)} /></div>
              </div>
              <div>
                <Label>Điểm RPE</Label>
                <div className="mt-2 grid grid-cols-5 gap-1.5">
                  {[6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10].concat([]).map((n) => (
                    <button key={n} type="button" onClick={() => setRpe(n)} className={cn("rounded-md border py-2 text-sm", rpe === n ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-muted")}>{n}</button>
                  ))}
                </div>
              </div>
              <Button className="w-full" onClick={addSet} disabled={phase !== "live"}><Plus className="size-4" /> Ghi set</Button>
            </div>
          </Panel>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-lg border border-border bg-card p-3"><p className="text-xs text-muted-foreground">Nghỉ</p><p className={cn("font-mono text-lg font-semibold", rest > 0 && "text-primary")}>{fmt(rest)}</p></div>
            <div className="rounded-lg border border-border bg-card p-3"><p className="text-xs text-muted-foreground">Khối lượng</p><p className="text-lg font-semibold">{volume}</p></div>
            <div className="rounded-lg border border-border bg-card p-3"><p className="text-xs text-muted-foreground">RPE trung bình</p><p className="text-lg font-semibold">{avgRpe}</p></div>
          </div>
        </div>
      </div>
    </>
  );
}

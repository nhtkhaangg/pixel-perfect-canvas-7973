import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { seo } from "@/lib/seo";
import { bookings, clients, sessionFeedback } from "@/lib/mock/trainer";
import { PageHeader } from "@/components/shared/page-header";
import { FormField } from "@/components/shared/form-field";
import { Panel } from "@/components/customer/alerts";
import { Stars } from "@/components/public/cards";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/trainer/feedback")({
  head: () => seo("Nhận xét sau buổi tập", "Ghi nhận xét của huấn luyện viên sau buổi tập và xem phản hồi từ hội viên."),
  component: Feedback,
});

const labels: Record<string, string> = { technique: "Kỹ thuật", effort: "Nỗ lực", progress: "Tiến bộ" };

function Feedback() {
  const recent = bookings.filter((b) => b.status === "COMPLETED" || b.status === "IN_PROGRESS" || b.status === "AWAITING");
  const [booking, setBooking] = useState(recent[0]!.id);
  const [scores, setScores] = useState({ technique: [8], effort: [9], progress: [7] });
  const [summary, setSummary] = useState("");
  const [next, setNext] = useState("");
  const [err, setErr] = useState<string>();
  const [list, setList] = useState(sessionFeedback);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (summary.trim().length < 15) return setErr("Vui lòng nhập ít nhất 15 ký tự");
    setErr(undefined);
    toast.success("Đã gửi nhận xét cho hội viên", { description: "Nhận xét sẽ hiển thị trong lịch sử buổi tập của họ." });
    setSummary(""); setNext("");
  }

  return (
    <>
      <PageHeader title="Nhận xét sau buổi tập" description="Hội viên sẽ thấy nhận xét và các bước tiếp theo ngay sau buổi tập." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Viết nhận xét">
          <form onSubmit={submit} className="space-y-5">
            <div className="space-y-1.5"><Label>Buổi tập</Label><Select value={booking} onValueChange={setBooking}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{recent.map((b) => <SelectItem key={b.id} value={b.id}>{b.date} · {b.client} · {b.focus}</SelectItem>)}</SelectContent></Select></div>
            {(Object.keys(scores) as (keyof typeof scores)[]).map((k) => (
              <div key={k}><Label>{labels[k]}: <span className="text-primary">{scores[k][0]}</span>/10</Label><Slider className="mt-3" min={1} max={10} value={scores[k]} onValueChange={(v) => setScores({ ...scores, [k]: v })} /></div>
            ))}
            <FormField label="Tóm tắt" required error={err}>{(p) => <Textarea {...p} rows={3} value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Điều gì làm tốt, điều gì cần cải thiện…" />}</FormField>
            <FormField label="Trọng tâm buổi tiếp theo">{(p) => <Textarea {...p} rows={2} value={next} onChange={(e) => setNext(e.target.value)} />}</FormField>
            <Button type="submit">Gửi nhận xét</Button>
          </form>
        </Panel>
        <Panel title="Phản hồi của hội viên">
          <ul className="space-y-4">
            {list.map((f) => (
              <li key={f.id} className="rounded-md border border-border p-4">
                <div className="flex items-center justify-between"><p className="font-medium">{f.client}</p><Stars rating={f.rating} /></div>
                <p className="text-xs text-muted-foreground">{f.session} · RPE {f.rpe}</p>
                <p className="mt-2 text-sm">"{f.comment}"</p>
                {f.coachNote ? <p className="mt-2 rounded bg-muted p-2 text-xs"><span className="font-medium text-primary">Bạn:</span> {f.coachNote}</p> : (
                  <form className="mt-2 flex gap-2" onSubmit={(e) => { e.preventDefault(); const v = new FormData(e.currentTarget).get("n") as string; if (v) { setList(list.map((x) => (x.id === f.id ? { ...x, coachNote: v } : x))); toast.success("Đã thêm ghi chú"); } }}>
                    <input name="n" className="h-8 flex-1 rounded-md border border-input bg-background px-2 text-sm" placeholder="Thêm ghi chú…" />
                    <Button size="sm" type="submit">Trả lời</Button>
                  </form>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">{clients.filter((c) => c.status === "ACTIVE").length} hội viên đang hoạt động</p>
        </Panel>
      </div>
    </>
  );
}

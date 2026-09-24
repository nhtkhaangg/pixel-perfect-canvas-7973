import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { seo } from "@/lib/seo";
import { bookings, trainerReschedules } from "@/lib/mock/trainer";
import { toStatus } from "@/lib/mock/customer";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { FormModal } from "@/components/shared/form-modal";
import { FormField } from "@/components/shared/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/trainer/reschedule")({
  head: () => seo("Dời lịch buổi tập", "Xử lý và đề xuất dời lịch buổi tập với hội viên."),
  component: Reschedule,
});

type R = (typeof trainerReschedules)[number];

function Reschedule() {
  const [list, setList] = useState<R[]>(trainerReschedules);
  const [open, setOpen] = useState(false);
  const [f, setF] = useState({ booking: "", date: "", time: "", reason: "" });
  const [err, setErr] = useState<Record<string, string>>({});
  const upcoming = bookings.filter((b) => b.status === "UPCOMING");
  const act = (id: string, status: R["status"]) => { setList((l) => l.map((r) => (r.id === id ? { ...r, status } : r))); toast.success(status === "CONFIRMED" ? "Đã chấp thuận — lịch của hội viên đã được cập nhật" : "Đã từ chối — hội viên đã được thông báo"); };

  function create() {
    const e: Record<string, string> = {};
    if (!f.booking) e["booking"] = "Chọn một buổi tập";
    if (!f.date || !f.time) e["date"] = "Chọn ngày và giờ";
    if (f.reason.length < 5) e["reason"] = "Nhập lý do";
    setErr(e);
    if (Object.keys(e).length) return;
    const b = upcoming.find((x) => x.id === f.booking)!;
    setList([{ id: `rs_${Date.now()}`, client: b.client, from: `${b.date} ${b.start}`, to: `${f.date} ${f.time}`, reason: f.reason, requestedBy: "me", status: "REQUESTED" }, ...list]);
    setOpen(false); toast.success("Đã gửi yêu cầu cho hội viên");
  }

  const Card = ({ r }: { r: R }) => (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="flex items-center justify-between"><p className="font-semibold">{r.client}</p><StatusBadge status={toStatus(r.status)} label={r.status} /></div>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm"><span className="rounded bg-muted px-2 py-0.5 line-through">{r.from}</span><ArrowRight className="size-4 text-muted-foreground" /><span className="rounded bg-accent px-2 py-0.5 font-medium text-accent-foreground">{r.to}</span></div>
      <p className="mt-2 text-sm text-muted-foreground">"{r.reason}"</p>
      {r.status === "REQUESTED" && r.requestedBy === "client" ? (
        <div className="mt-4 flex gap-2"><Button size="sm" onClick={() => act(r.id, "CONFIRMED")}>Chấp thuận</Button><Button size="sm" variant="outline" onClick={() => act(r.id, "REJECTED")}>Từ chối</Button></div>
      ) : r.status === "REQUESTED" ? <p className="mt-3 text-xs text-muted-foreground">Đang chờ hội viên xác nhận</p> : null}
    </div>
  );

  return (
    <>
      <PageHeader title="Dời lịch buổi tập" description="Xử lý yêu cầu từ hội viên hoặc tự đề xuất thời gian mới." actions={<Button onClick={() => setOpen(true)}><Plus className="size-4" /> Đề xuất dời lịch</Button>} />
      <h2 className="text-sm font-semibold">Từ hội viên</h2>
      <div className="grid gap-4 lg:grid-cols-2">{list.filter((r) => r.requestedBy === "client").map((r) => <Card key={r.id} r={r} />)}</div>
      <h2 className="text-sm font-semibold">Do bạn gửi</h2>
      <div className="grid gap-4 lg:grid-cols-2">{list.filter((r) => r.requestedBy === "me").map((r) => <Card key={r.id} r={r} />)}</div>
      <FormModal open={open} onOpenChange={setOpen} title="Đề xuất dời lịch" footer={<Button onClick={create}>Gửi cho hội viên</Button>}>
        <div className="space-y-1.5"><Label>Buổi tập</Label>
          <Select value={f.booking} onValueChange={(v) => setF({ ...f, booking: v })}><SelectTrigger><SelectValue placeholder="Chọn buổi tập" /></SelectTrigger><SelectContent>{upcoming.map((b) => <SelectItem key={b.id} value={b.id}>{b.date} {b.start} · {b.client}</SelectItem>)}</SelectContent></Select>
          {err["booking"] ? <p className="text-xs text-destructive">{err["booking"]}</p> : null}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Ngày mới" error={err["date"]}>{(p) => <Input {...p} type="date" value={f.date} onChange={(e) => setF({ ...f, date: e.target.value })} />}</FormField>
          <FormField label="Giờ mới">{(p) => <Input {...p} type="time" value={f.time} onChange={(e) => setF({ ...f, time: e.target.value })} />}</FormField>
        </div>
        <FormField label="Lý do" error={err["reason"]}>{(p) => <Textarea {...p} value={f.reason} onChange={(e) => setF({ ...f, reason: e.target.value })} />}</FormField>
      </FormModal>
    </>
  );
}

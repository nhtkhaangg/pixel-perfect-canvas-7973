import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { seo } from "@/lib/seo";
import { bookings } from "@/lib/mock/trainer";
import { toStatus } from "@/lib/mock/customer";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/trainer/verify")({
  head: () => seo("Xác nhận buổi tập", "Xác nhận các buổi tập đã hoàn thành để trừ vào gói tập của hội viên."),
  component: Verify,
});

function Verify() {
  const [list, setList] = useState(bookings.filter((b) => b.status === "AWAITING" || b.status === "COMPLETED" || b.status === "MISSED").map((b) => ({ ...b, note: "", attended: true })));
  const pending = list.filter((b) => b.status === "AWAITING");
  const done = list.filter((b) => b.status !== "AWAITING");
  const set = (id: string, patch: Partial<(typeof list)[number]>) => setList((l) => l.map((b) => (b.id === id ? { ...b, ...patch } : b)));

  return (
    <>
      <PageHeader title="Xác nhận buổi tập đã hoàn thành" description="Mã buổi tập hôm nay (chia sẻ với hội viên): 4821" />
      {pending.length ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {pending.map((b) => (
            <div key={b.id} className="rounded-lg border border-border bg-card p-5">
              <div className="flex items-center justify-between"><p className="font-semibold">{b.client}</p><StatusBadge status="awaiting" label="AWAITING" /></div>
              <p className="text-sm text-muted-foreground">{b.date} · {b.start}–{b.end} · {b.focus}</p>
              <label className="mt-4 flex items-center gap-2 text-sm"><Checkbox checked={b.attended} onCheckedChange={(v) => set(b.id, { attended: v === true })} /> Hội viên đã tham gia đầy đủ buổi tập</label>
              <Textarea className="mt-3" placeholder="Ghi chú buổi tập (hội viên sẽ thấy)" value={b.note} onChange={(e) => set(b.id, { note: e.target.value })} />
              <div className="mt-4 flex gap-2">
                <Button size="sm" onClick={() => { set(b.id, { status: b.attended ? "COMPLETED" : "MISSED" }); toast.success(b.attended ? "Đã xác nhận buổi tập — trừ 1 buổi" : "Đã đánh dấu vắng mặt"); }}><CheckCircle2 className="size-4" /> {b.attended ? "Xác nhận hoàn thành" : "Đánh dấu vắng mặt"}</Button>
              </div>
            </div>
          ))}
        </div>
      ) : <EmptyState title="Đã xác nhận tất cả buổi tập" description="Không có buổi tập nào đang chờ xác nhận." />}
      <div className="rounded-lg border border-border bg-card">
        <p className="border-b border-border px-5 py-3 text-sm font-semibold">Đã xác nhận gần đây</p>
        <ul className="divide-y divide-border">
          {done.map((b) => <li key={b.id} className="flex items-center justify-between px-5 py-3 text-sm"><span>{b.date} · <span className="font-medium">{b.client}</span> · {b.focus}</span><StatusBadge status={toStatus(b.status)} label={b.status} /></li>)}
        </ul>
      </div>
    </>
  );
}

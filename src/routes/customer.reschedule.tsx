import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { seo } from "@/lib/seo";
import { reschedules, toStatus, type RescheduleRequest } from "@/lib/mock/customer";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/customer/reschedule")({
  head: () => seo("Yêu cầu đổi lịch", "Xác nhận, từ chối hoặc theo dõi các yêu cầu đổi lịch buổi tập."),
  component: Reschedules,
});

function Reschedules() {
  const [list, setList] = useState<RescheduleRequest[]>(reschedules);
  const act = (id: string, status: RescheduleRequest["status"]) => {
    setList((l) => l.map((r) => (r.id === id ? { ...r, status } : r)));
    toast.success(status === "CONFIRMED" ? "Đã xác nhận đổi lịch — lịch tập đã được cập nhật" : "Đã từ chối yêu cầu");
  };
  const incoming = list.filter((r) => r.requestedBy !== "Bạn" && r.status === "REQUESTED");
  const rest = list.filter((r) => !incoming.includes(r));

  const Card = ({ r, actions }: { r: RescheduleRequest; actions?: boolean }) => (
    <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs text-muted-foreground">{r.id} · yêu cầu bởi {r.requestedBy} vào {r.createdAt}</p>
        <StatusBadge status={toStatus(r.status)} label={r.status} />
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
        <span className="rounded-md bg-muted px-2.5 py-1 line-through decoration-muted-foreground/60">{r.from}</span>
        <ArrowRight className="size-4 text-muted-foreground" />
        <span className="rounded-md bg-accent px-2.5 py-1 font-medium text-accent-foreground">{r.to}</span>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">"{r.reason}"</p>
      {actions ? (
        <div className="mt-4 flex gap-2">
          <Button size="sm" onClick={() => act(r.id, "CONFIRMED")}>Xác nhận giờ mới</Button>
          <Button size="sm" variant="outline" onClick={() => act(r.id, "REJECTED")}>Từ chối</Button>
        </div>
      ) : r.requestedBy === "Bạn" && r.status === "REQUESTED" ? (
        <Button size="sm" variant="ghost" className="mt-3" onClick={() => { setList((l) => l.filter((x) => x.id !== r.id)); toast("Đã rút yêu cầu"); }}>Rút yêu cầu</Button>
      ) : null}
    </div>
  );

  return (
    <>
      <PageHeader title="Yêu cầu đổi lịch" description="Yêu cầu từ huấn luyện viên cần bạn xác nhận. Yêu cầu của bạn chờ huấn luyện viên phản hồi." actions={<Button variant="outline" asChild><Link to="/customer/schedule">Mở lịch tập</Link></Button>} />
      <section className="space-y-3">
        <h2 className="text-sm font-semibold">Cần bạn xử lý ({incoming.length})</h2>
        {incoming.length ? <div className="grid gap-4 lg:grid-cols-2">{incoming.map((r) => <Card key={r.id} r={r} actions />)}</div> : <EmptyState title="Không có gì cần xác nhận" description="Bạn đã xử lý xong tất cả." />}
      </section>
      <section className="space-y-3">
        <h2 className="text-sm font-semibold">Lịch sử</h2>
        <div className="grid gap-4 lg:grid-cols-2">{rest.map((r) => <Card key={r.id} r={r} />)}</div>
      </section>
    </>
  );
}

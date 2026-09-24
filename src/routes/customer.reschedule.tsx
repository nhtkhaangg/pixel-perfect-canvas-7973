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
  head: () => seo("Reschedule requests", "Confirm, decline or track session reschedule requests."),
  component: Reschedules,
});

function Reschedules() {
  const [list, setList] = useState<RescheduleRequest[]>(reschedules);
  const act = (id: string, status: RescheduleRequest["status"]) => {
    setList((l) => l.map((r) => (r.id === id ? { ...r, status } : r)));
    toast.success(status === "CONFIRMED" ? "Reschedule confirmed — calendar updated" : "Request declined");
  };
  const incoming = list.filter((r) => r.requestedBy !== "You" && r.status === "REQUESTED");
  const rest = list.filter((r) => !incoming.includes(r));

  const Card = ({ r, actions }: { r: RescheduleRequest; actions?: boolean }) => (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs text-muted-foreground">{r.id} · requested by {r.requestedBy} on {r.createdAt}</p>
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
          <Button size="sm" onClick={() => act(r.id, "CONFIRMED")}>Confirm new time</Button>
          <Button size="sm" variant="outline" onClick={() => act(r.id, "REJECTED")}>Decline</Button>
        </div>
      ) : r.requestedBy === "You" && r.status === "REQUESTED" ? (
        <Button size="sm" variant="ghost" className="mt-3" onClick={() => { setList((l) => l.filter((x) => x.id !== r.id)); toast("Request withdrawn"); }}>Withdraw</Button>
      ) : null}
    </div>
  );

  return (
    <>
      <PageHeader title="Reschedule requests" description="Requests from your coach need your confirmation. Yours wait for the coach." actions={<Button variant="outline" asChild><Link to="/customer/schedule">Open calendar</Link></Button>} />
      <section className="space-y-3">
        <h2 className="text-sm font-semibold">Needs your action ({incoming.length})</h2>
        {incoming.length ? <div className="grid gap-4 lg:grid-cols-2">{incoming.map((r) => <Card key={r.id} r={r} actions />)}</div> : <EmptyState title="Nothing to confirm" description="You're all caught up." />}
      </section>
      <section className="space-y-3">
        <h2 className="text-sm font-semibold">History</h2>
        <div className="grid gap-4 lg:grid-cols-2">{rest.map((r) => <Card key={r.id} r={r} />)}</div>
      </section>
    </>
  );
}

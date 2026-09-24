import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, TrendingDown } from "lucide-react";
import { seo } from "@/lib/seo";
import { bookings, clients, plans } from "@/lib/mock/trainer";
import { toStatus } from "@/lib/mock/customer";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { SimpleChart } from "@/components/shared/simple-chart";
import { StatusBadge } from "@/components/shared/status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { Panel } from "@/components/customer/alerts";
import { Avatar } from "@/components/public/cards";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/trainer/customers/$id")({
  head: () => seo("Client metrics", "Client body metrics, lifts and plan overview."),
  component: ClientDetail,
});

function ClientDetail() {
  const { id } = Route.useParams();
  const c = clients.find((x) => x.id === id);
  if (!c) return <EmptyState title="Client not found" action={<Button asChild><Link to="/trainer/customers">Back</Link></Button>} />;
  const f = c.metrics[0]!, l = c.metrics[c.metrics.length - 1]!;
  const plan = plans.find((p) => p.clientId === c.id && p.status !== "ARCHIVED");
  const hist = bookings.filter((b) => b.clientId === c.id);
  return (
    <>
      <Link to="/trainer/customers" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> My customers</Link>
      <div className="flex flex-wrap items-center gap-4">
        <Avatar name={c.name} size="lg" />
        <div className="flex-1"><PageHeader title={c.name} description={`${c.age} yrs · ${c.goal} · ${c.package}`} actions={<><Button variant="outline" asChild><Link to="/trainer/chat">Message</Link></Button><Button variant="outline" asChild><Link to="/trainer/nutrition">Nutrition plan</Link></Button><Button asChild><Link to="/trainer/plans/ai">AI plan</Link></Button></>} /></div>
      </div>
      {c.plateau ? (
        <div className="flex items-center gap-3 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm"><TrendingDown className="size-4 text-destructive" /><span className="flex-1"><span className="font-semibold">Plateau:</span> bench stuck at {l.bench} kg for 3 check-ins. Consider a deload + variation block.</span><Button size="sm" variant="outline" asChild><Link to="/trainer/exercises/$id" params={{ id: "ex_5" }}>Spoto press</Link></Button></div>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Weight" value={`${l.weight} kg`} delta={((l.weight - f.weight) / f.weight) * 100} />
        <StatCard label="Body fat" value={`${l.bodyFat}%`} delta={l.bodyFat - f.bodyFat} />
        <StatCard label="Bench" value={`${l.bench} kg`} delta={((l.bench - f.bench) / f.bench) * 100} />
        <StatCard label="Adherence" value={`${c.adherence}%`} hint={`${c.sessionsLeft} sessions left`} />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <SimpleChart title="Body composition" data={c.metrics} xKey="date" series={[{ key: "weight", label: "Weight (kg)" }, { key: "bodyFat", label: "Body fat (%)" }]} />
        <SimpleChart title="Main lifts" data={c.metrics} xKey="date" series={[{ key: "bench", label: "Bench" }, { key: "squat", label: "Squat" }]} />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Current plan">
          {plan ? (
            <div className="flex items-center justify-between"><div><p className="font-medium">{plan.title}</p><p className="text-xs text-muted-foreground">v{plan.version} · {plan.durationWeeks} weeks</p></div><div className="flex items-center gap-2"><StatusBadge status={toStatus(plan.status)} label={plan.status} /><Button size="sm" variant="outline" asChild><Link to="/trainer/plans/$id" params={{ id: plan.id }}>Open</Link></Button></div></div>
          ) : <p className="text-sm text-muted-foreground">No plan yet. <Link to="/trainer/plans/ai" className="text-primary">Generate one with AI</Link></p>}
        </Panel>
        <Panel title="Session history">
          <ul className="space-y-2 text-sm">{hist.map((b) => <li key={b.id} className="flex justify-between"><span>{b.date} · {b.focus}</span><StatusBadge status={toStatus(b.status)} label={b.status.replace("_", " ")} /></li>)}</ul>
        </Panel>
      </div>
    </>
  );
}

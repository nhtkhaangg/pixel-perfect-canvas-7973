import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, DollarSign, Star, Users } from "lucide-react";
import { seo } from "@/lib/seo";
import { bookings, clients, trainerKpis, trainerMe, trainerNotifications } from "@/lib/mock/trainer";
import { toStatus } from "@/lib/mock/customer";
import { formatCurrency } from "@/lib/mock/public";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { SimpleChart } from "@/components/shared/simple-chart";
import { Panel } from "@/components/customer/alerts";
import { TrainerPlateauAlert } from "@/components/trainer/plateau";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/trainer/")({
  head: () => seo("Trainer dashboard", "Today's sessions, client alerts and coaching KPIs."),
  component: Dashboard,
});

function Dashboard() {
  const today = bookings.filter((b) => b.date === "2026-09-24");
  const upcoming = bookings.filter((b) => b.status === "UPCOMING").slice(0, 5);
  const awaiting = bookings.filter((b) => b.status === "AWAITING").length;
  const last = trainerKpis[trainerKpis.length - 1]!;
  return (
    <>
      <PageHeader title={`Welcome back, ${trainerMe.name.split(" ")[0]}`} description={`${today.length} sessions today · ${awaiting} awaiting verification`} actions={<><Button variant="outline" asChild><Link to="/trainer/verify">Verify sessions</Link></Button><Button asChild><Link to="/trainer/live">Start live session</Link></Button></>} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active clients" value={clients.filter((c) => c.status === "ACTIVE").length} hint="+1 pending" icon={Users} />
        <StatCard label="Sessions this month" value={last.sessions} delta={-8} hint="vs August" icon={CalendarDays} />
        <StatCard label="Earnings (Sep)" value={formatCurrency(last.revenue)} delta={-8} icon={DollarSign} />
        <StatCard label="Rating" value={trainerMe.ratingAvg} hint="128 reviews" icon={Star} />
      </div>
      <TrainerPlateauAlert />
      <div className="grid gap-6 lg:grid-cols-3">
        <SimpleChart className="lg:col-span-2" type="bar" title="Sessions delivered" description="Last 6 months" data={trainerKpis} xKey="month" series={[{ key: "sessions", label: "Sessions" }]} />
        <Panel title="Today">
          <ul className="space-y-3">
            {today.map((b) => (
              <li key={b.id} className="flex items-center justify-between gap-2">
                <div><p className="text-sm font-medium">{b.start} · {b.client}</p><p className="text-xs text-muted-foreground">{b.focus}</p></div>
                <StatusBadge status={toStatus(b.status)} label={b.status.replace("_", " ")} />
              </li>
            ))}
          </ul>
        </Panel>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Upcoming bookings" action={<Button size="sm" variant="ghost" asChild><Link to="/trainer/schedule">Calendar</Link></Button>}>
          <ul className="divide-y divide-border">
            {upcoming.map((b) => <li key={b.id} className="flex justify-between py-2.5 text-sm first:pt-0"><span>{b.date} {b.start} · <span className="font-medium">{b.client}</span></span><span className="text-muted-foreground">{b.focus}</span></li>)}
          </ul>
        </Panel>
        <Panel title="Notifications" action={<Button size="sm" variant="ghost" asChild><Link to="/trainer/notifications">All</Link></Button>}>
          <ul className="space-y-3">
            {trainerNotifications.slice(0, 4).map((n) => <li key={n.id} className="text-sm">{!n.read ? <span className="mr-1.5 inline-block size-2 rounded-full bg-primary" /> : null}<span className="font-medium">{n.title}</span><p className="text-xs text-muted-foreground">{n.body}</p></li>)}
          </ul>
        </Panel>
      </div>
    </>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, Dumbbell, Flame, Scale } from "lucide-react";
import { seo } from "@/lib/seo";
import { bodyMetrics, customerPackages, me, notifications, sessions, toStatus } from "@/lib/mock/customer";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { SimpleChart } from "@/components/shared/simple-chart";
import { ExpiringPackageBanner, Panel, PlateauAlertCard } from "@/components/customer/alerts";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/customer/")({
  head: () => seo("Member dashboard", "Your GymFit overview: packages, upcoming sessions, body progress and alerts."),
  component: Dashboard,
});

function Dashboard() {
  const pt = customerPackages.find((p) => p.type === "PT" && p.status === "ACTIVE")!;
  const upcoming = sessions.filter((s) => s.status === "UPCOMING" || s.status === "IN_PROGRESS").slice(0, 4);
  const first = bodyMetrics[0]!, last = bodyMetrics[bodyMetrics.length - 1]!;
  return (
    <>
      <PageHeader
        title={`Good evening, ${me.name.split(" ")[0]}`}
        description={`Goal: ${me.goal}`}
        actions={<><Button variant="outline" asChild><Link to="/customer/check-in">My QR code</Link></Button><Button asChild><Link to="/customer/sessions/$id" params={{ id: "s_18" }}>Today's session</Link></Button></>}
      />
      <ExpiringPackageBanner />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Weight" value={`${last.weight} kg`} delta={-(((first.weight - last.weight) / first.weight) * 100)} hint="since June" icon={Scale} />
        <StatCard label="Body fat" value={`${last.bodyFat}%`} delta={-(first.bodyFat - last.bodyFat)} hint="pts since June" icon={Flame} />
        <StatCard label="PT sessions left" value={(pt.totalSessions ?? 0) - pt.usedSessions} hint={`of ${pt.totalSessions} · ${pt.name}`} icon={Dumbbell} />
        <StatCard label="Visits this month" value={14} delta={16} hint="vs August" icon={CalendarDays} />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <SimpleChart className="lg:col-span-2" title="Body progress" description="Weight (kg) and body fat (%)" data={bodyMetrics} xKey="date" series={[{ key: "weight", label: "Weight" }, { key: "bodyFat", label: "Body fat" }]} />
        <PlateauAlertCard />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Upcoming sessions" className="lg:col-span-2" action={<Button size="sm" variant="ghost" asChild><Link to="/customer/schedule">Calendar</Link></Button>}>
          <ul className="divide-y divide-border">
            {upcoming.map((s) => (
              <li key={s.id} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                <div className="w-16 text-center">
                  <p className="text-xs text-muted-foreground">{new Date(s.date).toLocaleDateString("en-US", { weekday: "short" })}</p>
                  <p className="font-semibold">{s.start}</p>
                </div>
                <div className="flex-1">
                  <Link to="/customer/sessions/$id" params={{ id: s.id }} className="font-medium hover:text-primary">{s.focus}</Link>
                  <p className="text-xs text-muted-foreground">{s.trainer} · {s.room}</p>
                </div>
                <StatusBadge status={toStatus(s.status)} label={s.status.replace("_", " ")} />
              </li>
            ))}
          </ul>
        </Panel>
        <div className="space-y-6">
          <Panel title="PT package">
            <p className="font-medium">{pt.name}</p>
            <p className="text-xs text-muted-foreground">with {pt.trainer} · ends {pt.endDate}</p>
            <Progress value={(pt.usedSessions / (pt.totalSessions ?? 1)) * 100} className="mt-4 h-2" />
            <p className="mt-2 text-xs text-muted-foreground">{pt.usedSessions} of {pt.totalSessions} sessions used</p>
          </Panel>
          <Panel title="Latest notifications" action={<Button size="sm" variant="ghost" asChild><Link to="/customer/notifications">All</Link></Button>}>
            <ul className="space-y-3">
              {notifications.slice(0, 3).map((n) => (
                <li key={n.id}>
                  <Link to="/customer/notifications/$id" params={{ id: n.id }} className="block text-sm hover:text-primary">
                    {!n.read ? <span className="mr-1.5 inline-block size-2 rounded-full bg-primary" /> : null}
                    {n.title}
                  </Link>
                  <p className="text-xs text-muted-foreground">{n.date}</p>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </>
  );
}

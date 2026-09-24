import { createFileRoute, Link } from "@tanstack/react-router";
import { Dumbbell, ArrowRight } from "lucide-react";
import { roleAreas } from "@/lib/nav-config";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { SimpleChart } from "@/components/shared/simple-chart";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/hub")({
  head: () => ({
    meta: [
      { title: "GymFit — Role Hub" },
      {
        name: "description",
        content:
          "Development hub for the GymFit gym-management UI: jump into the Guest, Customer, Trainer, Staff, Manager and Admin areas.",
      },
      { property: "og:title", content: "GymFit — Role Hub" },
      {
        property: "og:description",
        content: "Navigate every role area of the GymFit gym-management prototype.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RoleHub,
});

const revenue = [
  { month: "Jan", members: 420, checkins: 3100 },
  { month: "Feb", members: 468, checkins: 3320 },
  { month: "Mar", members: 505, checkins: 3610 },
  { month: "Apr", members: 540, checkins: 3890 },
  { month: "May", members: 588, checkins: 4210 },
  { month: "Jun", members: 631, checkins: 4530 },
];

function RoleHub() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 lg:px-6 lg:py-16">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Dumbbell className="size-4" />
            </span>
            <span className="font-semibold tracking-tight text-surface-foreground">GymFit</span>
            <StatusBadge status="draft" label="dev hub" className="ml-2" />
          </div>
          <h1 className="mt-6 max-w-2xl text-3xl font-semibold tracking-tight text-surface-foreground lg:text-4xl">
            Gym management platform UI
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-surface-foreground/70 lg:text-base">
            Frontend-only prototype with mock data. Pick a role area below, or use the floating
            navigator on any page to jump between screens.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            <Button asChild>
              <Link to="/">View public site</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link to="/manager">Open manager dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl space-y-10 px-4 py-10 lg:px-6 lg:py-14">
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {roleAreas.map((area) => (
            <div
              key={area.key}
              className="flex flex-col rounded-lg border border-border bg-card p-5"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-card-foreground">{area.name}</h2>
                <span className="text-xs text-muted-foreground">{area.items.length} pages</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{area.tagline}</p>
              <ul className="mt-4 flex-1 space-y-1">
                {area.items.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <item.icon className="size-4" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                to={area.home}
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                Enter {area.name.toLowerCase()} area
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          ))}
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Design system preview</h2>
            <p className="text-sm text-muted-foreground">
              Shared building blocks used across every role area.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Active members" value="631" delta={7.2} hint="vs last month" />
            <StatCard label="Check-ins today" value="184" delta={-2.4} hint="vs yesterday" />
            <StatCard label="Classes this week" value="42" hint="6 trainers" />
            <StatCard label="Revenue (MTD)" value="$38,420" delta={4.1} hint="vs last month" />
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <SimpleChart
              title="Membership growth"
              description="Active members per month"
              data={revenue}
              xKey="month"
              series={[{ key: "members", label: "Members" }]}
            />
            <SimpleChart
              type="bar"
              title="Check-in volume"
              description="Total gym check-ins"
              data={revenue}
              xKey="month"
              series={[{ key: "checkins", label: "Check-ins" }]}
            />
          </div>
          <div className="flex flex-wrap gap-2 rounded-lg border border-border bg-card p-5">
            <StatusBadge status="active" />
            <StatusBadge status="approved" />
            <StatusBadge status="completed" />
            <StatusBadge status="pending" />
            <StatusBadge status="rejected" />
            <StatusBadge status="failed" />
            <StatusBadge status="locked" />
            <StatusBadge status="draft" />
            <StatusBadge status="expired" />
          </div>
        </section>
      </main>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Activity, CalendarCheck, Dumbbell, Trophy } from "lucide-react";
import { seo } from "@/lib/seo";
import { bodyMetrics, strengthProgress, weeklyVolume } from "@/lib/mock/customer";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { SimpleChart } from "@/components/shared/simple-chart";
import { PlateauAlertCard, Panel } from "@/components/customer/alerts";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/customer/progress")({
  head: () => seo("Training progress", "Strength, volume, attendance and body-composition progress dashboard."),
  component: ProgressPage,
});

const goals = [
  { label: "Bench 100 kg", current: 85, target: 100, unit: "kg" },
  { label: "Lose 6 kg", current: 4.2, target: 6, unit: "kg" },
  { label: "Body fat 18%", current: 20.7, target: 18, start: 24.1, unit: "%" },
];

function ProgressPage() {
  const s0 = strengthProgress[0]!, s1 = strengthProgress[strengthProgress.length - 1]!;
  return (
    <>
      <PageHeader title="Training progress" description="10 weeks of data from your logged sessions and body scans." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Squat top set" value={`${s1.squat} kg`} delta={((s1.squat - s0.squat) / s0.squat) * 100} icon={Trophy} />
        <StatCard label="Deadlift top set" value={`${s1.deadlift} kg`} delta={((s1.deadlift - s0.deadlift) / s0.deadlift) * 100} icon={Dumbbell} />
        <StatCard label="Attendance" value="92%" hint="22 of 24 planned sessions" icon={CalendarCheck} />
        <StatCard label="Avg RPE" value="7.4" hint="last 4 weeks" icon={Activity} />
      </div>
      <PlateauAlertCard />
      <div className="grid gap-6 lg:grid-cols-2">
        <SimpleChart title="Main lifts" description="Top set (kg) per week" data={strengthProgress} xKey="week" series={[{ key: "bench", label: "Bench" }, { key: "squat", label: "Squat" }, { key: "deadlift", label: "Deadlift" }]} />
        <SimpleChart type="bar" title="Weekly volume" description="Tonnes lifted" data={weeklyVolume} xKey="week" series={[{ key: "volume", label: "Volume (t)" }]} />
        <SimpleChart title="Weight" description="kg" data={bodyMetrics} xKey="date" series={[{ key: "weight", label: "Weight" }]} />
        <SimpleChart title="Body fat" description="%" data={bodyMetrics} xKey="date" series={[{ key: "bodyFat", label: "Body fat", color: "var(--chart-2)" }]} />
      </div>
      <Panel title="Goals">
        <div className="grid gap-6 md:grid-cols-3">
          {goals.map((g) => {
            const pct = g.start ? ((g.start - g.current) / (g.start - g.target)) * 100 : (g.current / g.target) * 100;
            return (
              <div key={g.label}>
                <div className="flex justify-between text-sm"><span className="font-medium">{g.label}</span><span className="text-muted-foreground">{g.current}{g.unit}</span></div>
                <Progress value={pct} className="mt-2 h-2" />
                <p className="mt-1 text-xs text-muted-foreground">{Math.round(pct)}% of the way</p>
              </div>
            );
          })}
        </div>
      </Panel>
    </>
  );
}

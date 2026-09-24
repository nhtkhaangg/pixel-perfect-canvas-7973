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
  head: () => seo("Tiến độ tập luyện", "Bảng theo dõi sức mạnh, khối lượng, chuyên cần và chỉ số cơ thể."),
  component: ProgressPage,
});

const goals = [
  { label: "Đẩy ngực 100 kg", current: 85, target: 100, unit: "kg" },
  { label: "Giảm 6 kg", current: 4.2, target: 6, unit: "kg" },
  { label: "Tỷ lệ mỡ 18%", current: 20.7, target: 18, start: 24.1, unit: "%" },
];

function ProgressPage() {
  const s0 = strengthProgress[0]!, s1 = strengthProgress[strengthProgress.length - 1]!;
  return (
    <>
      <PageHeader title="Tiến độ tập luyện" description="10 tuần dữ liệu từ các buổi tập và chỉ số cơ thể đã ghi nhận." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Squat mức tạ cao nhất" value={`${s1.squat} kg`} delta={((s1.squat - s0.squat) / s0.squat) * 100} icon={Trophy} />
        <StatCard label="Deadlift mức tạ cao nhất" value={`${s1.deadlift} kg`} delta={((s1.deadlift - s0.deadlift) / s0.deadlift) * 100} icon={Dumbbell} />
        <StatCard label="Tỷ lệ chuyên cần" value="92%" hint="22/24 buổi theo kế hoạch" icon={CalendarCheck} />
        <StatCard label="RPE trung bình" value="7.4" hint="4 tuần gần nhất" icon={Activity} />
      </div>
      <PlateauAlertCard />
      <div className="grid gap-6 lg:grid-cols-2">
        <SimpleChart title="Các bài tập chính" description="Mức tạ cao nhất (kg) mỗi tuần" data={strengthProgress} xKey="week" series={[{ key: "bench", label: "Đẩy ngực" }, { key: "squat", label: "Squat" }, { key: "deadlift", label: "Deadlift" }]} />
        <SimpleChart type="bar" title="Khối lượng tập mỗi tuần" description="Tấn tạ đã nâng" data={weeklyVolume} xKey="week" series={[{ key: "volume", label: "Khối lượng (tấn)" }]} />
        <SimpleChart title="Cân nặng" description="kg" data={bodyMetrics} xKey="date" series={[{ key: "weight", label: "Cân nặng" }]} />
        <SimpleChart title="Tỷ lệ mỡ" description="%" data={bodyMetrics} xKey="date" series={[{ key: "bodyFat", label: "Tỷ lệ mỡ", color: "var(--chart-2)" }]} />
      </div>
      <Panel title="Mục tiêu">
        <div className="grid gap-6 md:grid-cols-3">
          {goals.map((g) => {
            const pct = g.start ? ((g.start - g.current) / (g.start - g.target)) * 100 : (g.current / g.target) * 100;
            return (
              <div key={g.label}>
                <div className="flex justify-between text-sm"><span className="font-medium">{g.label}</span><span className="text-muted-foreground">{g.current}{g.unit}</span></div>
                <Progress value={pct} className="mt-2 h-2" />
                <p className="mt-1 text-xs text-muted-foreground">Đã hoàn thành {Math.round(pct)}%</p>
              </div>
            );
          })}
        </div>
      </Panel>
    </>
  );
}

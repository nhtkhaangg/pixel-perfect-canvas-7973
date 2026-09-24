import { createFileRoute } from "@tanstack/react-router";
import { Check, Circle, Loader } from "lucide-react";
import { seo } from "@/lib/seo";
import { roadmap, toStatus } from "@/lib/mock/customer";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/customer/roadmap")({
  head: () => seo("Lộ trình tập luyện", "Lộ trình tập luyện 14 tuần cùng huấn luyện viên, theo từng giai đoạn."),
  component: Roadmap,
});

const statusLabel: Record<string, string> = { COMPLETED: "Đã hoàn thành", IN_PROGRESS: "Đang diễn ra", UPCOMING: "Sắp diễn ra" };

function Roadmap() {
  const overall = Math.round(roadmap.reduce((s, p) => s + p.progress, 0) / roadmap.length);
  return (
    <>
      <PageHeader title="Lộ trình tập luyện" description="Kế hoạch 14 tuần tăng sức mạnh & tái cấu trúc vóc dáng do Nguyễn Minh Anh thiết kế." />
      <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
        <div className="flex items-center justify-between text-sm"><span className="font-medium">Tiến độ tổng thể</span><span className="text-muted-foreground">Tuần 11/14 · {overall}%</span></div>
        <Progress value={overall} className="mt-3 h-2" />
      </div>
      <ol className="relative space-y-6 border-l border-border pl-8">
        {roadmap.map((p) => {
          const Icon = p.status === "COMPLETED" ? Check : p.status === "IN_PROGRESS" ? Loader : Circle;
          return (
            <li key={p.phase} className="relative">
              <span className={cn("absolute top-5 -left-[45px] flex size-7 items-center justify-center rounded-full border-2 bg-background", p.status === "COMPLETED" ? "border-primary bg-primary text-primary-foreground" : p.status === "IN_PROGRESS" ? "border-primary text-primary" : "border-border text-muted-foreground")}>
                <Icon className="size-3.5" />
              </span>
              <div className={cn("rounded-lg border bg-card p-5 shadow-sm", p.status === "IN_PROGRESS" ? "border-primary" : "border-border")}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div><p className="text-xs text-muted-foreground">{p.phase} · {p.weeks}</p><p className="text-lg font-semibold">{p.title}</p></div>
                  <StatusBadge status={toStatus(p.status)} label={statusLabel[p.status] ?? p.status} />
                </div>
                <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-3">
                  {p.goals.map((g) => <li key={g} className="rounded-md bg-muted px-3 py-2">{g}</li>)}
                </ul>
                <Progress value={p.progress} className="mt-4 h-1.5" />
              </div>
            </li>
          );
        })}
      </ol>
    </>
  );
}

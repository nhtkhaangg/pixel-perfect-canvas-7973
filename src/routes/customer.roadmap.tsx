import { createFileRoute } from "@tanstack/react-router";
import { Check, Circle, Loader } from "lucide-react";
import { seo } from "@/lib/seo";
import { roadmap, toStatus } from "@/lib/mock/customer";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/customer/roadmap")({
  head: () => seo("Training roadmap", "Your 14-week coached training roadmap, phase by phase."),
  component: Roadmap,
});

function Roadmap() {
  const overall = Math.round(roadmap.reduce((s, p) => s + p.progress, 0) / roadmap.length);
  return (
    <>
      <PageHeader title="Training roadmap" description="14-week strength & recomposition plan designed by Maya Nguyen." />
      <div className="rounded-lg border border-border bg-card p-5">
        <div className="flex items-center justify-between text-sm"><span className="font-medium">Overall progress</span><span className="text-muted-foreground">Week 11 of 14 · {overall}%</span></div>
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
              <div className={cn("rounded-lg border bg-card p-5", p.status === "IN_PROGRESS" ? "border-primary" : "border-border")}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div><p className="text-xs text-muted-foreground">{p.phase} · {p.weeks}</p><p className="text-lg font-semibold">{p.title}</p></div>
                  <StatusBadge status={toStatus(p.status)} label={p.status.replace("_", " ")} />
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

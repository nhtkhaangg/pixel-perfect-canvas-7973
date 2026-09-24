import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { seo } from "@/lib/seo";
import { defaultAvailability, timeSlots, weekDays } from "@/lib/mock/customer";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/customer/availability")({
  head: () => seo("Weekly availability", "Set the hours you're available to train so your coach can schedule sessions."),
  component: Availability,
});

function Availability() {
  const [grid, setGrid] = useState<Record<string, boolean>>(defaultAvailability);
  const count = Object.values(grid).filter(Boolean).length;
  const toggle = (k: string) => setGrid((g) => ({ ...g, [k]: !g[k] }));

  return (
    <>
      <PageHeader
        title="Weekly availability"
        description="Click slots to mark when you can train. Your coach books sessions only in these windows."
        actions={<><Button variant="outline" onClick={() => setGrid({})}>Clear</Button><Button onClick={() => toast.success("Availability saved", { description: `${count} hourly slots shared with Maya Nguyen` })}>Save availability</Button></>}
      />
      <div className="overflow-x-auto rounded-lg border border-border bg-card p-4">
        <table className="w-full min-w-[640px] border-separate border-spacing-1.5">
          <thead>
            <tr>
              <th className="w-16" />
              {weekDays.map((d) => (
                <th key={d} className="text-xs font-medium text-muted-foreground">
                  <button type="button" className="hover:text-foreground" onClick={() => setGrid((g) => { const all = timeSlots.every((t) => g[`${d}-${t}`]); const n = { ...g }; timeSlots.forEach((t) => (n[`${d}-${t}`] = !all)); return n; })}>{d}</button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((t) => (
              <tr key={t}>
                <td className="pr-2 text-right text-xs text-muted-foreground">{t}</td>
                {weekDays.map((d) => {
                  const k = `${d}-${t}`;
                  return (
                    <td key={k}>
                      <button
                        type="button"
                        aria-pressed={!!grid[k]}
                        aria-label={`${d} ${t}`}
                        onClick={() => toggle(k)}
                        className={cn("h-10 w-full rounded-md border text-xs transition-colors", grid[k] ? "border-primary bg-primary text-primary-foreground" : "border-border bg-muted/40 hover:bg-muted")}
                      >
                        {grid[k] ? "Free" : ""}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center gap-6 text-sm text-muted-foreground">
        <span className="flex items-center gap-2"><span className="size-3 rounded-sm bg-primary" /> Available</span>
        <span className="flex items-center gap-2"><span className="size-3 rounded-sm border border-border bg-muted/40" /> Unavailable</span>
        <span className="ml-auto font-medium text-foreground">{count} hours / week</span>
      </div>
    </>
  );
}

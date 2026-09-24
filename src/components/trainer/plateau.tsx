import { Link } from "@tanstack/react-router";
import { TrendingDown } from "lucide-react";
import { clients } from "@/lib/mock/trainer";
import { Button } from "@/components/ui/button";

/** Lists clients whose main lift stalled for 3+ check-ins. */
export function TrainerPlateauAlert() {
  const stalled = clients.filter((c) => c.plateau);
  if (!stalled.length) return null;
  return (
    <div className="rounded-lg border border-destructive/30 bg-card p-5">
      <div className="flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-destructive/10 text-destructive"><TrendingDown className="size-4" /></span>
        <div className="flex-1">
          <p className="font-semibold">Training plateau alert · {stalled.length} clients</p>
          <ul className="mt-2 space-y-2 text-sm">
            {stalled.map((c) => {
              const last = c.metrics.slice(-3).map((m) => m.bench);
              return (
                <li key={c.id} className="flex flex-wrap items-center justify-between gap-2">
                  <span><span className="font-medium">{c.name}</span> <span className="text-muted-foreground">— bench flat at {last[last.length - 1]} kg for 3 check-ins</span></span>
                  <Button size="sm" variant="outline" asChild><Link to="/trainer/customers/$id" params={{ id: c.id }}>Review</Link></Button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

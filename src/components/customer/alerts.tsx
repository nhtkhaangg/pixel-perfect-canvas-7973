import { Link } from "@tanstack/react-router";
import { AlertTriangle, TrendingDown, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ExpiringPackageBanner({ days = 6, name = "Standard Monthly" }: { days?: number; name?: string }) {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-lg border border-warning/40 bg-warning/10 px-4 py-3">
      <AlertTriangle className="size-5 shrink-0 text-warning-foreground" />
      <p className="flex-1 text-sm">
        <span className="font-semibold">{name} expires in {days} days.</span>{" "}
        <span className="text-muted-foreground">Renew now to keep your access and class bookings.</span>
      </p>
      <Button size="sm" asChild>
        <Link to="/customer/purchase">Renew</Link>
      </Button>
      <Button size="icon" variant="ghost" className="size-8" onClick={() => setOpen(false)} aria-label="Dismiss">
        <X className="size-4" />
      </Button>
    </div>
  );
}

export function PlateauAlertCard() {
  return (
    <div className="rounded-lg border border-destructive/30 bg-card p-5">
      <div className="flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-destructive/10 text-destructive">
          <TrendingDown className="size-4" />
        </span>
        <div className="flex-1">
          <p className="font-semibold">Training plateau detected</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Bench press has stayed at <span className="font-medium text-foreground">85 kg</span> for 4 weeks. Try a
            deload week, then a 3-week variation block (paused bench, close-grip).
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button size="sm" variant="outline" asChild>
              <Link to="/customer/chat">Ask your coach</Link>
            </Button>
            <Button size="sm" variant="ghost" asChild>
              <Link to="/customer/progress">View progress</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Panel({ title, action, children, className }: { title: string; action?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg border border-border bg-card ${className ?? ""}`}>
      <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
        <h3 className="text-sm font-semibold">{title}</h3>
        {action}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

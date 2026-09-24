import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Compass, X } from "lucide-react";
import { roleAreas } from "@/lib/nav-config";
import { Button } from "@/components/ui/button";

/** Floating dev-only navigator so every page is reachable during review. */
export function DevPanel() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>("customer");

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed right-4 bottom-4 z-[60] inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2.5 text-sm font-medium text-surface-foreground shadow-lg transition-colors hover:bg-surface/90"
      >
        <Compass className="size-4" />
        Điều hướng kiểm thử
      </button>
    );
  }

  return (
    <div className="fixed right-4 bottom-4 z-[60] flex max-h-[70vh] w-72 flex-col overflow-hidden rounded-lg border border-border bg-card shadow-xl">
      <div className="flex items-center justify-between border-b border-border px-3 py-2.5">
        <p className="text-sm font-semibold">Chuyển khu vực giao diện</p>
        <Button variant="ghost" size="icon" className="size-7" onClick={() => setOpen(false)}>
          <X className="size-4" />
        </Button>
      </div>
      <div className="overflow-y-auto p-2">
        <Link
          to="/hub"
          className="mb-1 block rounded-md px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          Trang tổng hợp khu vực
        </Link>
        {roleAreas.map((area) => (
          <div key={area.key} className="border-t border-border/70 py-1 first:border-t-0">
            <button
              type="button"
              onClick={() => setExpanded((prev) => (prev === area.key ? null : area.key))}
              className="flex w-full items-center justify-between rounded-md px-2.5 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              {area.name}
              <ChevronDown
                className={`size-4 text-muted-foreground transition-transform ${
                  expanded === area.key ? "rotate-180" : ""
                }`}
              />
            </button>
            {expanded === area.key ? (
              <div className="mt-0.5 space-y-0.5 pl-2">
                {area.items.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    activeOptions={{ exact: item.to === area.home }}
                    className="block rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground data-[status=active]:bg-accent data-[status=active]:text-accent-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

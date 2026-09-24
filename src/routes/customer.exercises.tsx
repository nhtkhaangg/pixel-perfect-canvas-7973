import { createFileRoute } from "@tanstack/react-router";
import { Play, Search } from "lucide-react";
import { useState } from "react";
import { seo } from "@/lib/seo";
import { exerciseGuides } from "@/lib/mock/customer";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { FormModal } from "@/components/shared/form-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/customer/exercises")({
  head: () => seo("Exercise guides", "Video guides and coaching cues for every exercise in your programme."),
  component: Exercises,
});

type Guide = (typeof exerciseGuides)[number];
const muscles = ["All", ...new Set(exerciseGuides.map((e) => e.muscle))];

function Exercises() {
  const [q, setQ] = useState("");
  const [m, setM] = useState("All");
  const [open, setOpen] = useState<Guide | null>(null);
  const list = exerciseGuides.filter((e) => (m === "All" || e.muscle === m) && e.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <PageHeader title="Exercise guides" description="Short technique videos recorded by GymFit coaches." />
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative w-64"><Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" /><Input className="pl-9" placeholder="Search exercise…" value={q} onChange={(e) => setQ(e.target.value)} /></div>
        <div className="flex flex-wrap gap-2">{muscles.map((x) => <Button key={x} size="sm" variant={x === m ? "default" : "outline"} onClick={() => setM(x)}>{x}</Button>)}</div>
      </div>
      {list.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((e) => (
            <button key={e.id} type="button" onClick={() => setOpen(e)} className="group overflow-hidden rounded-lg border border-border bg-card text-left transition-colors hover:border-primary">
              <div className="relative flex aspect-video items-center justify-center bg-surface">
                <span className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:scale-110"><Play className="size-5 fill-current" /></span>
                <span className="absolute right-2 bottom-2 rounded bg-surface-foreground/15 px-1.5 py-0.5 text-xs text-surface-foreground">{e.duration}</span>
              </div>
              <div className="p-4">
                <p className="font-medium">{e.name}</p>
                <div className="mt-2 flex gap-2"><Badge variant="secondary">{e.muscle}</Badge><Badge variant="outline">{e.level}</Badge></div>
              </div>
            </button>
          ))}
        </div>
      ) : <EmptyState title="No exercises found" />}
      <FormModal open={!!open} onOpenChange={(o) => !o && setOpen(null)} title={open?.name ?? ""} description={open ? `${open.muscle} · ${open.level} · ${open.equipment}` : ""}>
        {open ? (
          <>
            <div className="flex aspect-video items-center justify-center rounded-md bg-surface text-sm text-surface-foreground/60"><Play className="mr-2 size-5" /> Video preview ({open.duration})</div>
            <div><p className="text-sm font-semibold">Coaching cues</p><ol className="mt-2 list-inside list-decimal space-y-1 text-sm text-muted-foreground">{open.cues.map((c) => <li key={c}>{c}</li>)}</ol></div>
          </>
        ) : null}
      </FormModal>
    </>
  );
}

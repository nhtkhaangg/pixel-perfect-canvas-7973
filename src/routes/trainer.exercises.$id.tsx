import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Play } from "lucide-react";
import { useState } from "react";
import { seo } from "@/lib/seo";
import { exerciseStore, lessonStore } from "@/lib/trainer-stores";
import { PageHeader } from "@/components/shared/page-header";
import { DetailPanel } from "@/components/shared/detail-panel";
import { EmptyState } from "@/components/shared/empty-state";
import { ExerciseFormModal } from "@/components/trainer/forms";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/trainer/exercises/$id")({
  head: () => seo("Exercise detail", "Exercise details, video and usage."),
  component: ExerciseDetail,
});

function ExerciseDetail() {
  const { id } = Route.useParams();
  const e = exerciseStore.use().find((x) => x.id === id);
  const lessons = lessonStore.use();
  const [open, setOpen] = useState(false);
  if (!e) return <EmptyState title="Exercise not found" action={<Button asChild><Link to="/trainer/exercises">Back</Link></Button>} />;
  const usedIn = lessons.filter((l) => l.blocks.some((b) => b.exercise === e.name));
  return (
    <>
      <Link to="/trainer/exercises" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> Exercises</Link>
      <PageHeader title={e.name} description={e.description} actions={e.custom ? <Button onClick={() => setOpen(true)}>Edit</Button> : <Badge variant="secondary">Library exercise</Badge>} />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="flex aspect-video flex-col items-center justify-center rounded-lg bg-surface text-surface-foreground">
          <span className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground"><Play className="size-6 fill-current" /></span>
          <p className="mt-3 max-w-[90%] truncate text-xs text-surface-foreground/60">{e.videoUrl || "No video"}</p>
        </div>
        <DetailPanel title="Details" fields={[
          { label: "Muscle group", value: e.muscleGroup },
          { label: "Equipment", value: e.equipment },
          { label: "Source", value: e.custom ? "Custom (yours)" : "GymFit library" },
          { label: "Used in", value: usedIn.length ? usedIn.map((l) => <Link key={l.id} to="/trainer/lessons/$id" params={{ id: l.id }} className="mr-2 text-primary">{l.title}</Link>) : "Not used yet" },
        ]} />
      </div>
      <ExerciseFormModal open={open} onOpenChange={setOpen} initial={e} />
    </>
  );
}

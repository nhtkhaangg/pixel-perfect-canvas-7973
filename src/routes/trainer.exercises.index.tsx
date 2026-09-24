import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useState } from "react";
import { seo } from "@/lib/seo";
import type { Exercise } from "@/lib/mock/trainer";
import { exerciseStore } from "@/lib/trainer-stores";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { ExerciseFormModal } from "@/components/trainer/forms";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/trainer/exercises/")({
  head: () => seo("Exercise library", "Browse the exercise library and manage your custom exercises."),
  component: Exercises,
});

function Exercises() {
  const list = exerciseStore.use();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<Exercise | undefined>();
  const opts = (k: "muscleGroup" | "equipment") => [...new Set(list.map((e) => e[k]))].map((v) => ({ label: v, value: v }));
  return (
    <>
      <PageHeader title="Exercises" description="GymFit library plus your own custom exercises." actions={<Button onClick={() => { setEdit(undefined); setOpen(true); }}><Plus className="size-4" /> Custom exercise</Button>} />
      <DataTable
        data={list}
        rowKey={(r) => r.id}
        searchPlaceholder="Search exercises…"
        filters={[{ key: "muscleGroup", label: "Muscle group", options: opts("muscleGroup") }, { key: "equipment", label: "Equipment", options: opts("equipment") }, { key: "source", label: "Source", options: [{ label: "Custom", value: "custom" }, { label: "Library", value: "library" }] }]}
        filterValue={(r, k) => (k === "source" ? (r.custom ? "custom" : "library") : k === "muscleGroup" ? r.muscleGroup : r.equipment)}
        columns={[
          { key: "name", header: "Exercise", sortable: true, cell: (r) => <div className="flex items-center gap-2"><span className="font-medium">{r.name}</span>{r.custom ? <Badge>Custom</Badge> : null}</div> },
          { key: "muscleGroup", header: "Muscle group", sortable: true },
          { key: "equipment", header: "Equipment", sortable: true },
          { key: "videoUrl", header: "Video", cell: (r) => r.videoUrl ? <span className="text-xs text-primary">Has video</span> : <span className="text-xs text-muted-foreground">—</span> },
        ]}
        rowActions={[
          { label: "View", onSelect: (r) => navigate({ to: "/trainer/exercises/$id", params: { id: r.id } }) },
          { label: "Edit", onSelect: (r) => { setEdit(r); setOpen(true); } },
        ]}
      />
      <ExerciseFormModal open={open} onOpenChange={setOpen} {...(edit ? { initial: edit } : {})} />
    </>
  );
}

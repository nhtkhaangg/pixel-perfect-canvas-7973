import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { seo } from "@/lib/seo";
import { clients, type LessonPlan } from "@/lib/mock/trainer";
import { lessonStore } from "@/lib/trainer-stores";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { LessonFormModal } from "@/components/trainer/forms";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/trainer/lessons/")({
  head: () => seo("Lesson plans", "Create and manage per-session lesson plans."),
  component: Lessons,
});

function Lessons() {
  const list = lessonStore.use();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<LessonPlan | undefined>();
  const clientName = (id: string | null) => clients.find((c) => c.id === id)?.name;
  return (
    <>
      <PageHeader title="Lesson plans" description="Session-by-session plans you run with clients." actions={<Button onClick={() => { setEdit(undefined); setOpen(true); }}><Plus className="size-4" /> New lesson plan</Button>} />
      <DataTable
        data={list}
        rowKey={(r) => r.id}
        searchPlaceholder="Search lesson plans…"
        columns={[
          { key: "title", header: "Title", sortable: true, cell: (r) => <span className="font-medium">{r.title}</span> },
          { key: "client", header: "Client", value: (r) => clientName(r.clientId) ?? "Template", cell: (r) => clientName(r.clientId) ?? <Badge variant="secondary">Template</Badge> },
          { key: "focus", header: "Focus" },
          { key: "durationMin", header: "Duration", sortable: true, cell: (r) => `${r.durationMin} min` },
          { key: "blocks", header: "Blocks", value: (r) => r.blocks.length },
          { key: "updatedAt", header: "Updated", sortable: true },
        ]}
        rowActions={[
          { label: "View", onSelect: (r) => navigate({ to: "/trainer/lessons/$id", params: { id: r.id } }) },
          { label: "Edit", onSelect: (r) => { setEdit(r); setOpen(true); } },
          { label: "Delete", destructive: true, onSelect: (r) => { lessonStore.remove(r.id); toast.success("Deleted"); } },
        ]}
      />
      <LessonFormModal open={open} onOpenChange={setOpen} {...(edit ? { initial: edit } : {})} />
    </>
  );
}

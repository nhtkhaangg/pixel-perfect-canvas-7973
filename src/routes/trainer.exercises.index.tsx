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
  head: () => seo("Thư viện bài tập", "Duyệt thư viện bài tập và quản lý bài tập tự tạo của bạn."),
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
      <PageHeader title="Bài tập" description="Thư viện GymFit cùng với các bài tập tự tạo của bạn." actions={<Button onClick={() => { setEdit(undefined); setOpen(true); }}><Plus className="size-4" /> Bài tập tự tạo</Button>} />
      <DataTable
        data={list}
        rowKey={(r) => r.id}
        searchPlaceholder="Tìm bài tập…"
        filters={[{ key: "muscleGroup", label: "Nhóm cơ", options: opts("muscleGroup") }, { key: "equipment", label: "Dụng cụ", options: opts("equipment") }, { key: "source", label: "Nguồn", options: [{ label: "Tự tạo", value: "custom" }, { label: "Thư viện", value: "library" }] }]}
        filterValue={(r, k) => (k === "source" ? (r.custom ? "custom" : "library") : k === "muscleGroup" ? r.muscleGroup : r.equipment)}
        columns={[
          { key: "name", header: "Bài tập", sortable: true, cell: (r) => <div className="flex items-center gap-2"><span className="font-medium">{r.name}</span>{r.custom ? <Badge>Tự tạo</Badge> : null}</div> },
          { key: "muscleGroup", header: "Nhóm cơ", sortable: true },
          { key: "equipment", header: "Dụng cụ", sortable: true },
          { key: "videoUrl", header: "Video", cell: (r) => r.videoUrl ? <span className="text-xs text-primary">Có video</span> : <span className="text-xs text-muted-foreground">—</span> },
        ]}
        rowActions={[
          { label: "Xem chi tiết", onSelect: (r) => navigate({ to: "/trainer/exercises/$id", params: { id: r.id } }) },
          { label: "Chỉnh sửa", onSelect: (r) => { setEdit(r); setOpen(true); } },
        ]}
      />
      <ExerciseFormModal open={open} onOpenChange={setOpen} {...(edit ? { initial: edit } : {})} />
    </>
  );
}

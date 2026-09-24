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
  head: () => seo("Chi tiết bài tập", "Chi tiết bài tập, video và mức độ sử dụng."),
  component: ExerciseDetail,
});

function ExerciseDetail() {
  const { id } = Route.useParams();
  const e = exerciseStore.use().find((x) => x.id === id);
  const lessons = lessonStore.use();
  const [open, setOpen] = useState(false);
  if (!e) return <EmptyState title="Không tìm thấy bài tập" action={<Button asChild><Link to="/trainer/exercises">Quay lại</Link></Button>} />;
  const usedIn = lessons.filter((l) => l.blocks.some((b) => b.exercise === e.name));
  return (
    <>
      <Link to="/trainer/exercises" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> Bài tập</Link>
      <PageHeader title={e.name} description={e.description} actions={e.custom ? <Button onClick={() => setOpen(true)}>Chỉnh sửa</Button> : <Badge variant="secondary">Bài tập thư viện</Badge>} />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="flex aspect-video flex-col items-center justify-center rounded-lg bg-surface text-surface-foreground">
          <span className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground"><Play className="size-6 fill-current" /></span>
          <p className="mt-3 max-w-[90%] truncate text-xs text-surface-foreground/60">{e.videoUrl || "Chưa có video"}</p>
        </div>
        <DetailPanel title="Chi tiết" fields={[
          { label: "Nhóm cơ", value: e.muscleGroup },
          { label: "Dụng cụ", value: e.equipment },
          { label: "Nguồn", value: e.custom ? "Tự tạo (của bạn)" : "Thư viện GymFit" },
          { label: "Được dùng trong", value: usedIn.length ? usedIn.map((l) => <Link key={l.id} to="/trainer/lessons/$id" params={{ id: l.id }} className="mr-2 text-primary">{l.title}</Link>) : "Chưa được sử dụng" },
        ]} />
      </div>
      <ExerciseFormModal open={open} onOpenChange={setOpen} initial={e} />
    </>
  );
}

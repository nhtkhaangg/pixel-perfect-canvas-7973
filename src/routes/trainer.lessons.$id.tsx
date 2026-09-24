import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { seo } from "@/lib/seo";
import { clients } from "@/lib/mock/trainer";
import { lessonStore } from "@/lib/trainer-stores";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { DetailPanel } from "@/components/shared/detail-panel";
import { LessonFormModal } from "@/components/trainer/forms";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/trainer/lessons/$id")({
  head: () => seo("Giáo án", "Chi tiết giáo án tập luyện."),
  component: LessonDetail,
});

function LessonDetail() {
  const { id } = Route.useParams();
  const l = lessonStore.use().find((x) => x.id === id);
  const [open, setOpen] = useState(false);
  if (!l) return <EmptyState title="Không tìm thấy giáo án" action={<Button asChild><Link to="/trainer/lessons">Quay lại</Link></Button>} />;
  const client = clients.find((c) => c.id === l.clientId);
  return (
    <>
      <Link to="/trainer/lessons" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> Giáo án</Link>
      <PageHeader title={l.title} description={`${l.focus} · ${l.durationMin} phút · cập nhật ${l.updatedAt}`} actions={<><Button variant="outline" asChild><Link to="/trainer/live">Chạy buổi tập trực tiếp</Link></Button><Button onClick={() => setOpen(true)}>Chỉnh sửa</Button></>} />
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left text-xs text-muted-foreground"><tr><th className="px-4 py-2.5">#</th><th className="py-2.5">Bài tập</th><th className="py-2.5">Sets</th><th className="py-2.5">Reps</th><th className="py-2.5">Nghỉ</th></tr></thead>
            <tbody className="divide-y divide-border">
              {l.blocks.map((b, i) => <tr key={i}><td className="px-4 py-3 text-muted-foreground">{i + 1}</td><td className="py-3 font-medium">{b.exercise}</td><td>{b.sets}</td><td>{b.reps}</td><td>{b.rest}</td></tr>)}
            </tbody>
          </table>
        </div>
        <DetailPanel title="Chi tiết" fields={[
          { label: "Hội viên", value: client ? <Link to="/trainer/customers/$id" params={{ id: client.id }} className="text-primary">{client.name}</Link> : "Mẫu giáo án" },
          { label: "Khởi động", value: l.warmup || "—" },
          { label: "Ghi chú", value: l.notes || "—" },
        ]} />
      </div>
      <LessonFormModal open={open} onOpenChange={setOpen} initial={l} />
    </>
  );
}

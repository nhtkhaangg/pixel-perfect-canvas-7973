import { createFileRoute } from "@tanstack/react-router";
import { Clock, Dumbbell } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { seo } from "@/lib/seo";
import { sampleWorkouts } from "@/lib/mock/customer";
import { imageFor } from "@/lib/images";
import { PageHeader } from "@/components/shared/page-header";
import { FormModal } from "@/components/shared/form-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/customer/workouts")({
  head: () => seo("Giáo án mẫu", "Xem trước các giáo án tập luyện dựng sẵn cho sức mạnh, giảm mỡ, phục hồi và hơn thế."),
  component: Workouts,
});

type W = (typeof sampleWorkouts)[number];

function Workouts() {
  const [open, setOpen] = useState<W | null>(null);
  return (
    <>
      <PageHeader title="Giáo án mẫu" description="Các buổi tập dựng sẵn cho những ngày bạn tự tập một mình." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sampleWorkouts.map((w) => (
          <div key={w.id} className="flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm">
            <div className="h-28 w-full overflow-hidden"><img src={imageFor(w.id)} alt={w.name} className="h-full w-full object-cover" /></div>
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center justify-between"><Badge>{w.goal}</Badge><span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="size-3.5" />{w.duration} phút</span></div>
              <p className="mt-3 font-semibold">{w.name}</p>
              <p className="text-xs text-muted-foreground">{w.level}</p>
              <ul className="mt-3 flex-1 space-y-1 text-sm text-muted-foreground">
                {w.exercises.slice(0, 3).map((e) => <li key={e} className="flex gap-2"><Dumbbell className="mt-0.5 size-3.5 text-primary" />{e}</li>)}
                {w.exercises.length > 3 ? <li className="text-xs">+{w.exercises.length - 3} bài khác</li> : null}
              </ul>
              <Button variant="outline" size="sm" className="mt-4" onClick={() => setOpen(w)}>Xem trước</Button>
            </div>
          </div>
        ))}
      </div>
      <FormModal open={!!open} onOpenChange={(o) => !o && setOpen(null)} title={open?.name ?? ""} description={open ? `${open.duration} phút · ${open.level} · ${open.goal}` : ""} footer={<Button onClick={() => { toast.success("Đã thêm vào lịch tập thứ Bảy"); setOpen(null); }}>Thêm vào lịch tập</Button>}>
        <ol className="space-y-2">{open?.exercises.map((e, i) => <li key={e} className="flex items-center gap-3 rounded-md border border-border p-3 text-sm"><span className="flex size-6 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">{i + 1}</span>{e}</li>)}</ol>
      </FormModal>
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Play, Search } from "lucide-react";
import { useState } from "react";
import { seo } from "@/lib/seo";
import { exerciseGuides } from "@/lib/mock/customer";
import { imageFor } from "@/lib/images";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { FormModal } from "@/components/shared/form-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/customer/exercises")({
  head: () => seo("Thư viện bài tập", "Video hướng dẫn kỹ thuật và lưu ý huấn luyện cho từng bài tập trong giáo án của bạn."),
  component: Exercises,
});

type Guide = (typeof exerciseGuides)[number];
const muscles = ["Tất cả", ...new Set(exerciseGuides.map((e) => e.muscle))];

function Exercises() {
  const [q, setQ] = useState("");
  const [m, setM] = useState("Tất cả");
  const [open, setOpen] = useState<Guide | null>(null);
  const list = exerciseGuides.filter((e) => (m === "Tất cả" || e.muscle === m) && e.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <PageHeader title="Thư viện bài tập" description="Video hướng dẫn kỹ thuật ngắn được huấn luyện viên GymFit ghi hình." />
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative w-64"><Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" /><Input className="pl-9" placeholder="Tìm bài tập…" value={q} onChange={(e) => setQ(e.target.value)} /></div>
        <div className="flex flex-wrap gap-2">{muscles.map((x) => <Button key={x} size="sm" variant={x === m ? "default" : "outline"} onClick={() => setM(x)}>{x}</Button>)}</div>
      </div>
      {list.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((e) => (
            <button key={e.id} type="button" onClick={() => setOpen(e)} className="group overflow-hidden rounded-lg border border-border bg-card text-left shadow-sm transition-colors hover:border-primary">
              <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-surface">
                <img src={imageFor(e.id)} alt={e.name} className="absolute inset-0 size-full object-cover opacity-70 transition-opacity group-hover:opacity-90" />
                <span className="relative flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-110"><Play className="size-5 fill-current" /></span>
                <span className="absolute right-2 bottom-2 rounded bg-surface-foreground/70 px-1.5 py-0.5 text-xs text-surface">{e.duration}</span>
              </div>
              <div className="p-4">
                <p className="font-medium">{e.name}</p>
                <div className="mt-2 flex gap-2"><Badge variant="secondary">{e.muscle}</Badge><Badge variant="outline">{e.level}</Badge></div>
              </div>
            </button>
          ))}
        </div>
      ) : <EmptyState title="Không tìm thấy bài tập" />}
      <FormModal open={!!open} onOpenChange={(o) => !o && setOpen(null)} title={open?.name ?? ""} description={open ? `${open.muscle} · ${open.level} · ${open.equipment}` : ""}>
        {open ? (
          <>
            <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-md bg-surface text-sm text-surface-foreground/60">
              <img src={imageFor(open.id)} alt={open.name} className="absolute inset-0 size-full object-cover opacity-60" />
              <span className="relative flex items-center gap-2 rounded bg-surface-foreground/70 px-3 py-1.5 text-surface"><Play className="size-4" /> Xem trước video ({open.duration})</span>
            </div>
            <div><p className="text-sm font-semibold">Lưu ý kỹ thuật</p><ol className="mt-2 list-inside list-decimal space-y-1 text-sm text-muted-foreground">{open.cues.map((c) => <li key={c}>{c}</li>)}</ol></div>
          </>
        ) : null}
      </FormModal>
    </>
  );
}

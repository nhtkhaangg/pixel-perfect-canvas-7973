import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { clients, type Exercise, type LessonPlan } from "@/lib/mock/trainer";
import { exerciseStore, lessonStore } from "@/lib/trainer-stores";
import { FormModal } from "@/components/shared/form-modal";
import { FormField } from "@/components/shared/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const emptyLesson = (): LessonPlan => ({ id: "", title: "", clientId: null, focus: "", durationMin: 60, updatedAt: "", warmup: "", blocks: [{ exercise: "", sets: 3, reps: "10", rest: "60 giây" }], notes: "" });

export function LessonFormModal({ open, onOpenChange, initial }: { open: boolean; onOpenChange: (o: boolean) => void; initial?: LessonPlan }) {
  const [f, setF] = useState<LessonPlan>(initial ?? emptyLesson());
  const [err, setErr] = useState<Record<string, string>>({});
  useEffect(() => { if (open) { setF(initial ?? emptyLesson()); setErr({}); } }, [open, initial]);
  const exList = exerciseStore.use();

  function save() {
    const e: Record<string, string> = {};
    if (f.title.trim().length < 3) e["title"] = "Vui lòng nhập tiêu đề";
    if (!f.focus) e["focus"] = "Vui lòng nhập trọng tâm buổi tập";
    if (!f.blocks.length || f.blocks.some((b) => !b.exercise)) e["blocks"] = "Mỗi phần cần chọn một bài tập";
    setErr(e);
    if (Object.keys(e).length) return;
    lessonStore.upsert({ ...f, id: f.id || `lp_${Date.now()}`, updatedAt: "2026-09-24" });
    toast.success(initial ? "Đã cập nhật giáo án buổi tập" : "Đã tạo giáo án buổi tập");
    onOpenChange(false);
  }
  const setBlock = (i: number, patch: Partial<LessonPlan["blocks"][number]>) => setF({ ...f, blocks: f.blocks.map((b, j) => (j === i ? { ...b, ...patch } : b)) });

  return (
    <FormModal open={open} onOpenChange={onOpenChange} variant="drawer" title={initial ? "Chỉnh sửa giáo án buổi tập" : "Giáo án buổi tập mới"} footer={<Button className="w-full" onClick={save}>{initial ? "Lưu thay đổi" : "Tạo giáo án"}</Button>}>
      <div className="space-y-4">
        <FormField label="Tiêu đề" required error={err["title"]}>{(p) => <Input {...p} value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} />}</FormField>
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Trọng tâm" required error={err["focus"]}>{(p) => <Input {...p} value={f.focus} onChange={(e) => setF({ ...f, focus: e.target.value })} />}</FormField>
          <FormField label="Thời lượng (phút)">{(p) => <Input {...p} type="number" value={f.durationMin} onChange={(e) => setF({ ...f, durationMin: Number(e.target.value) })} />}</FormField>
        </div>
        <div className="space-y-1.5"><Label>Hội viên</Label>
          <Select value={f.clientId ?? "none"} onValueChange={(v) => setF({ ...f, clientId: v === "none" ? null : v })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent><SelectItem value="none">Mẫu dùng chung (không gán hội viên)</SelectItem>{clients.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <FormField label="Khởi động">{(p) => <Input {...p} value={f.warmup} onChange={(e) => setF({ ...f, warmup: e.target.value })} />}</FormField>
        <div className="space-y-2">
          <Label>Các phần bài tập</Label>
          {f.blocks.map((b, i) => (
            <div key={i} className="space-y-2 rounded-md border border-border p-3">
              <div className="flex gap-2">
                <Select value={b.exercise} onValueChange={(v) => setBlock(i, { exercise: v })}>
                  <SelectTrigger className="flex-1"><SelectValue placeholder="Chọn bài tập" /></SelectTrigger>
                  <SelectContent>{[...new Set([...exList.map((x) => x.name), ...(b.exercise ? [b.exercise] : [])])].map((n) => <SelectItem key={n} value={n}>{n}</SelectItem>)}</SelectContent>
                </Select>
                <Button type="button" size="icon" variant="ghost" onClick={() => setF({ ...f, blocks: f.blocks.filter((_, j) => j !== i) })}><Trash2 className="size-4" /></Button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Input type="number" value={b.sets} onChange={(e) => setBlock(i, { sets: Number(e.target.value) })} aria-label="Số hiệp" />
                <Input value={b.reps} onChange={(e) => setBlock(i, { reps: e.target.value })} aria-label="Số lần lặp" />
                <Input value={b.rest} onChange={(e) => setBlock(i, { rest: e.target.value })} aria-label="Nghỉ" />
              </div>
            </div>
          ))}
          {err["blocks"] ? <p className="text-xs text-destructive">{err["blocks"]}</p> : null}
          <Button type="button" size="sm" variant="outline" onClick={() => setF({ ...f, blocks: [...f.blocks, { exercise: "", sets: 3, reps: "10", rest: "60 giây" }] })}><Plus className="size-4" /> Thêm phần bài tập</Button>
        </div>
        <FormField label="Ghi chú của huấn luyện viên">{(p) => <Textarea {...p} value={f.notes} onChange={(e) => setF({ ...f, notes: e.target.value })} />}</FormField>
      </div>
    </FormModal>
  );
}

const muscleGroups = ["Ngực", "Lưng", "Chân", "Vai", "Tay", "Bụng", "Chuỗi cơ sau", "Toàn thân"];
const equipmentList = ["Thanh đòn", "Tạ đơn", "Kettlebell", "Máy tập", "Cáp", "Xà đơn", "Trọng lượng cơ thể", "Dây kháng lực"];
const emptyEx = (): Exercise => ({ id: "", name: "", muscleGroup: "", equipment: "", videoUrl: "", description: "", custom: true });

export function ExerciseFormModal({ open, onOpenChange, initial }: { open: boolean; onOpenChange: (o: boolean) => void; initial?: Exercise }) {
  const [f, setF] = useState<Exercise>(initial ?? emptyEx());
  const [err, setErr] = useState<Record<string, string>>({});
  useEffect(() => { if (open) { setF(initial ?? emptyEx()); setErr({}); } }, [open, initial]);

  function save() {
    const e: Record<string, string> = {};
    if (f.name.trim().length < 3) e["name"] = "Vui lòng nhập tên bài tập";
    if (!f.muscleGroup) e["muscleGroup"] = "Chọn nhóm cơ";
    if (!f.equipment) e["equipment"] = "Chọn dụng cụ";
    if (f.videoUrl && !/^https?:\/\/.+/.test(f.videoUrl)) e["videoUrl"] = "Nhập đường dẫn hợp lệ";
    setErr(e);
    if (Object.keys(e).length) return;
    exerciseStore.upsert({ ...f, id: f.id || `ex_${Date.now()}`, custom: true });
    toast.success(initial ? "Đã cập nhật bài tập" : "Đã tạo bài tập tuỳ chỉnh");
    onOpenChange(false);
  }
  const sel = (k: "muscleGroup" | "equipment", label: string, opts: string[]) => (
    <div className="space-y-1.5"><Label>{label}<span className="text-destructive">*</span></Label>
      <Select value={f[k]} onValueChange={(v) => setF({ ...f, [k]: v })}><SelectTrigger><SelectValue placeholder="Chọn…" /></SelectTrigger><SelectContent>{opts.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select>
      {err[k] ? <p className="text-xs text-destructive">{err[k]}</p> : null}
    </div>
  );
  return (
    <FormModal open={open} onOpenChange={onOpenChange} title={initial ? "Chỉnh sửa bài tập" : "Bài tập tuỳ chỉnh mới"} footer={<Button onClick={save}>Lưu bài tập</Button>}>
      <FormField label="Tên bài tập" required error={err["name"]}>{(p) => <Input {...p} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />}</FormField>
      <div className="grid grid-cols-2 gap-4">{sel("muscleGroup", "Nhóm cơ", muscleGroups)}{sel("equipment", "Dụng cụ", equipmentList)}</div>
      <FormField label="Đường dẫn video" error={err["videoUrl"]} hint="Liên kết MP4 hoặc YouTube">{(p) => <Input {...p} value={f.videoUrl} onChange={(e) => setF({ ...f, videoUrl: e.target.value })} placeholder="https://" />}</FormField>
      <FormField label="Mô tả">{(p) => <Textarea {...p} value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} />}</FormField>
    </FormModal>
  );
}

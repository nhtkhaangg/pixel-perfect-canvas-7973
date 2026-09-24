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

const emptyLesson = (): LessonPlan => ({ id: "", title: "", clientId: null, focus: "", durationMin: 60, updatedAt: "", warmup: "", blocks: [{ exercise: "", sets: 3, reps: "10", rest: "60 s" }], notes: "" });

export function LessonFormModal({ open, onOpenChange, initial }: { open: boolean; onOpenChange: (o: boolean) => void; initial?: LessonPlan }) {
  const [f, setF] = useState<LessonPlan>(initial ?? emptyLesson());
  const [err, setErr] = useState<Record<string, string>>({});
  useEffect(() => { if (open) { setF(initial ?? emptyLesson()); setErr({}); } }, [open, initial]);
  const exList = exerciseStore.use();

  function save() {
    const e: Record<string, string> = {};
    if (f.title.trim().length < 3) e["title"] = "Title is required";
    if (!f.focus) e["focus"] = "Focus is required";
    if (!f.blocks.length || f.blocks.some((b) => !b.exercise)) e["blocks"] = "Every block needs an exercise";
    setErr(e);
    if (Object.keys(e).length) return;
    lessonStore.upsert({ ...f, id: f.id || `lp_${Date.now()}`, updatedAt: "2026-09-24" });
    toast.success(initial ? "Lesson plan updated" : "Lesson plan created");
    onOpenChange(false);
  }
  const setBlock = (i: number, patch: Partial<LessonPlan["blocks"][number]>) => setF({ ...f, blocks: f.blocks.map((b, j) => (j === i ? { ...b, ...patch } : b)) });

  return (
    <FormModal open={open} onOpenChange={onOpenChange} variant="drawer" title={initial ? "Edit lesson plan" : "New lesson plan"} footer={<Button className="w-full" onClick={save}>{initial ? "Save changes" : "Create plan"}</Button>}>
      <div className="space-y-4">
        <FormField label="Title" required error={err["title"]}>{(p) => <Input {...p} value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} />}</FormField>
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Focus" required error={err["focus"]}>{(p) => <Input {...p} value={f.focus} onChange={(e) => setF({ ...f, focus: e.target.value })} />}</FormField>
          <FormField label="Duration (min)">{(p) => <Input {...p} type="number" value={f.durationMin} onChange={(e) => setF({ ...f, durationMin: Number(e.target.value) })} />}</FormField>
        </div>
        <div className="space-y-1.5"><Label>Client</Label>
          <Select value={f.clientId ?? "none"} onValueChange={(v) => setF({ ...f, clientId: v === "none" ? null : v })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent><SelectItem value="none">Template (no client)</SelectItem>{clients.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <FormField label="Warm-up">{(p) => <Input {...p} value={f.warmup} onChange={(e) => setF({ ...f, warmup: e.target.value })} />}</FormField>
        <div className="space-y-2">
          <Label>Blocks</Label>
          {f.blocks.map((b, i) => (
            <div key={i} className="space-y-2 rounded-md border border-border p-3">
              <div className="flex gap-2">
                <Select value={b.exercise} onValueChange={(v) => setBlock(i, { exercise: v })}>
                  <SelectTrigger className="flex-1"><SelectValue placeholder="Exercise" /></SelectTrigger>
                  <SelectContent>{[...new Set([...exList.map((x) => x.name), ...(b.exercise ? [b.exercise] : [])])].map((n) => <SelectItem key={n} value={n}>{n}</SelectItem>)}</SelectContent>
                </Select>
                <Button type="button" size="icon" variant="ghost" onClick={() => setF({ ...f, blocks: f.blocks.filter((_, j) => j !== i) })}><Trash2 className="size-4" /></Button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Input type="number" value={b.sets} onChange={(e) => setBlock(i, { sets: Number(e.target.value) })} aria-label="Sets" />
                <Input value={b.reps} onChange={(e) => setBlock(i, { reps: e.target.value })} aria-label="Reps" />
                <Input value={b.rest} onChange={(e) => setBlock(i, { rest: e.target.value })} aria-label="Rest" />
              </div>
            </div>
          ))}
          {err["blocks"] ? <p className="text-xs text-destructive">{err["blocks"]}</p> : null}
          <Button type="button" size="sm" variant="outline" onClick={() => setF({ ...f, blocks: [...f.blocks, { exercise: "", sets: 3, reps: "10", rest: "60 s" }] })}><Plus className="size-4" /> Add block</Button>
        </div>
        <FormField label="Coach notes">{(p) => <Textarea {...p} value={f.notes} onChange={(e) => setF({ ...f, notes: e.target.value })} />}</FormField>
      </div>
    </FormModal>
  );
}

const muscleGroups = ["Chest", "Back", "Legs", "Shoulders", "Arms", "Core", "Posterior chain", "Full body"];
const equipmentList = ["Barbell", "Dumbbell", "Kettlebell", "Machine", "Cable", "Pull-up bar", "Bodyweight", "Bands"];
const emptyEx = (): Exercise => ({ id: "", name: "", muscleGroup: "", equipment: "", videoUrl: "", description: "", custom: true });

export function ExerciseFormModal({ open, onOpenChange, initial }: { open: boolean; onOpenChange: (o: boolean) => void; initial?: Exercise }) {
  const [f, setF] = useState<Exercise>(initial ?? emptyEx());
  const [err, setErr] = useState<Record<string, string>>({});
  useEffect(() => { if (open) { setF(initial ?? emptyEx()); setErr({}); } }, [open, initial]);

  function save() {
    const e: Record<string, string> = {};
    if (f.name.trim().length < 3) e["name"] = "Name is required";
    if (!f.muscleGroup) e["muscleGroup"] = "Choose a muscle group";
    if (!f.equipment) e["equipment"] = "Choose equipment";
    if (f.videoUrl && !/^https?:\/\/.+/.test(f.videoUrl)) e["videoUrl"] = "Enter a valid URL";
    setErr(e);
    if (Object.keys(e).length) return;
    exerciseStore.upsert({ ...f, id: f.id || `ex_${Date.now()}`, custom: true });
    toast.success(initial ? "Exercise updated" : "Custom exercise created");
    onOpenChange(false);
  }
  const sel = (k: "muscleGroup" | "equipment", label: string, opts: string[]) => (
    <div className="space-y-1.5"><Label>{label}<span className="text-destructive">*</span></Label>
      <Select value={f[k]} onValueChange={(v) => setF({ ...f, [k]: v })}><SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger><SelectContent>{opts.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select>
      {err[k] ? <p className="text-xs text-destructive">{err[k]}</p> : null}
    </div>
  );
  return (
    <FormModal open={open} onOpenChange={onOpenChange} title={initial ? "Edit exercise" : "New custom exercise"} footer={<Button onClick={save}>Save exercise</Button>}>
      <FormField label="Name" required error={err["name"]}>{(p) => <Input {...p} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />}</FormField>
      <div className="grid grid-cols-2 gap-4">{sel("muscleGroup", "Muscle group", muscleGroups)}{sel("equipment", "Equipment", equipmentList)}</div>
      <FormField label="Video URL" error={err["videoUrl"]} hint="MP4 or YouTube link">{(p) => <Input {...p} value={f.videoUrl} onChange={(e) => setF({ ...f, videoUrl: e.target.value })} placeholder="https://" />}</FormField>
      <FormField label="Description">{(p) => <Textarea {...p} value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} />}</FormField>
    </FormModal>
  );
}

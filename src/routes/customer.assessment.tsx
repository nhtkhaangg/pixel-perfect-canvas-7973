import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { seo } from "@/lib/seo";
import { PageHeader } from "@/components/shared/page-header";
import { FormField } from "@/components/shared/form-field";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";

export const Route = createFileRoute("/customer/assessment")({
  head: () => seo("Initial assessment", "Complete your initial fitness assessment so your coach can build your programme."),
  component: Assessment,
});

const goals = ["Lose fat", "Build muscle", "Get stronger", "Improve endurance", "Mobility / pain-free", "Sport performance"];
const conditions = ["Back pain", "Knee injury", "Shoulder injury", "High blood pressure", "Asthma", "None"];

function Assessment() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [sel, setSel] = useState<string[]>(["Lose fat", "Get stronger"]);
  const [cond, setCond] = useState<string[]>(["None"]);
  const [exp, setExp] = useState("intermediate");
  const [days, setDays] = useState([3]);
  const toggle = (arr: string[], set: (v: string[]) => void, v: string) => set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  const steps = ["Goals", "Health", "Baseline", "Lifestyle"];

  if (done)
    return (
      <>
        <PageHeader title="Initial assessment" description="Submitted to your coach Maya Nguyen." />
        <div className="max-w-xl rounded-lg border border-border bg-card p-6">
          <StatusBadge status="pending" label="Awaiting coach review" />
          <p className="mt-3 text-sm text-muted-foreground">Maya will review your answers and schedule a movement screen within 48 hours.</p>
          <Button className="mt-5" variant="outline" onClick={() => { setDone(false); setStep(0); }}>Edit answers</Button>
        </div>
      </>
    );

  return (
    <>
      <PageHeader title="Initial assessment" description="About 5 minutes. Helps your coach tailor your programme safely." />
      <div className="flex gap-2">
        {steps.map((s, i) => (
          <div key={s} className="flex-1">
            <div className={`h-1.5 rounded-full ${i <= step ? "bg-primary" : "bg-muted"}`} />
            <p className={`mt-2 text-xs ${i === step ? "font-medium" : "text-muted-foreground"}`}>{i + 1}. {s}</p>
          </div>
        ))}
      </div>
      <div className="max-w-3xl space-y-5 rounded-lg border border-border bg-card p-6">
        {step === 0 && (
          <>
            <Label>Primary goals</Label>
            <div className="grid gap-2 sm:grid-cols-3">
              {goals.map((g) => (
                <label key={g} className={`flex cursor-pointer items-center gap-2 rounded-md border p-3 text-sm ${sel.includes(g) ? "border-primary bg-accent" : "border-border"}`}>
                  <Checkbox checked={sel.includes(g)} onCheckedChange={() => toggle(sel, setSel, g)} /> {g}
                </label>
              ))}
            </div>
            <FormField label="Describe your goal in your own words">{(p) => <Textarea {...p} defaultValue="Lose 6 kg of fat and bench 100 kg by December." />}</FormField>
          </>
        )}
        {step === 1 && (
          <>
            <Label>Injuries or conditions</Label>
            <div className="grid gap-2 sm:grid-cols-3">
              {conditions.map((g) => (
                <label key={g} className="flex items-center gap-2 rounded-md border border-border p-3 text-sm">
                  <Checkbox checked={cond.includes(g)} onCheckedChange={() => toggle(cond, setCond, g)} /> {g}
                </label>
              ))}
            </div>
            <FormField label="Medications / notes" hint="Optional. Shared only with your coach.">{(p) => <Textarea {...p} />}</FormField>
          </>
        )}
        {step === 2 && (
          <div className="grid gap-4 sm:grid-cols-3">
            <FormField label="Height (cm)">{(p) => <Input {...p} type="number" defaultValue={178} />}</FormField>
            <FormField label="Weight (kg)">{(p) => <Input {...p} type="number" defaultValue={80} />}</FormField>
            <FormField label="Resting heart rate">{(p) => <Input {...p} type="number" defaultValue={62} />}</FormField>
            <FormField label="Push-ups (max)">{(p) => <Input {...p} type="number" defaultValue={28} />}</FormField>
            <FormField label="Plank hold (s)">{(p) => <Input {...p} type="number" defaultValue={90} />}</FormField>
            <FormField label="Bench 1RM estimate (kg)">{(p) => <Input {...p} type="number" defaultValue={85} />}</FormField>
            <div className="space-y-2 sm:col-span-3">
              <Label>Training experience</Label>
              <RadioGroup value={exp} onValueChange={setExp} className="flex flex-wrap gap-6">
                {["beginner", "intermediate", "advanced"].map((v) => (
                  <label key={v} className="flex items-center gap-2 text-sm capitalize"><RadioGroupItem value={v} /> {v}</label>
                ))}
              </RadioGroup>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-5">
            <div>
              <Label>Days per week you can train: <span className="text-primary">{days[0]}</span></Label>
              <Slider className="mt-3" min={1} max={7} step={1} value={days} onValueChange={setDays} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Average sleep (hours)">{(p) => <Input {...p} type="number" defaultValue={7} />}</FormField>
              <FormField label="Occupation">{(p) => <Input {...p} defaultValue="Software engineer (desk)" />}</FormField>
            </div>
          </div>
        )}
        <div className="flex justify-between border-t border-border pt-5">
          <Button variant="outline" disabled={step === 0} onClick={() => setStep(step - 1)}>Back</Button>
          {step < 3 ? (
            <Button onClick={() => setStep(step + 1)}>Continue</Button>
          ) : (
            <Button onClick={() => { setDone(true); toast.success("Assessment submitted"); }}>Submit assessment</Button>
          )}
        </div>
      </div>
    </>
  );
}

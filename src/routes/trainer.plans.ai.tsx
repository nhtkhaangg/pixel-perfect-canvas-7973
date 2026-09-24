import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { RefreshCw, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { seo } from "@/lib/seo";
import { clients } from "@/lib/mock/trainer";
import { planStore } from "@/lib/trainer-stores";
import { PageHeader } from "@/components/shared/page-header";
import { Panel } from "@/components/customer/alerts";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/trainer/plans/ai")({
  head: () => seo("AI plan suggestion", "Generate an AI-suggested workout plan from a client's assessment and metrics."),
  component: AiPlan,
});

const templates: Record<string, { focus: string; sessions: string[] }[]> = {
  strength: [{ focus: "Technique & base", sessions: ["Squat + accessories", "Bench + back", "Deadlift + core"] }, { focus: "Linear progression", sessions: ["Heavy lower", "Heavy upper", "Volume full body"] }, { focus: "Peak", sessions: ["Heavy singles", "Test day"] }],
  fatloss: [{ focus: "Habits & base", sessions: ["Full body circuit", "Zone 2 cardio", "Full body strength"] }, { focus: "Metabolic", sessions: ["Intervals", "Strength", "Circuit"] }, { focus: "Consolidate", sessions: ["Strength", "Conditioning"] }],
};

function AiPlan() {
  const navigate = useNavigate();
  const [clientId, setClientId] = useState("cus_1101");
  const [weeks, setWeeks] = useState("12");
  const [focus, setFocus] = useState("fatloss");
  const [state, setState] = useState<"idle" | "loading" | "ready">("idle");
  const c = clients.find((x) => x.id === clientId)!;
  const phases = templates[focus]!;

  function generate() { setState("loading"); setTimeout(() => setState("ready"), 1400); }
  function save() {
    const id = `wp_${Date.now()}`;
    const w = Number(weeks);
    planStore.upsert({
      id, clientId, client: c.name, title: `${focus === "strength" ? "Strength" : "Fat loss"} block (AI)`, goal: c.goal, durationWeeks: w, version: 1, isAiGenerated: true, status: "DRAFT", updatedAt: "2026-09-24",
      weeks: phases.map((p, i) => ({ week: 1 + Math.round((i * w) / phases.length), ...p })),
      milestones: [{ week: Math.round(w / 2), title: "Mid-block check", target: "Re-test metrics", status: "PENDING" }, { week: w, title: "Block complete", target: c.goal, status: "PENDING" }],
      versions: [{ version: 1, date: "2026-09-24", author: "AI Assistant", change: "AI-generated draft", status: "DRAFT" }],
    });
    toast.success("Saved as draft");
    navigate({ to: "/trainer/plans/$id", params: { id } });
  }

  return (
    <>
      <PageHeader title="AI-suggested plan" description="Uses the client's assessment, metrics, availability and adherence history." />
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <Panel title="Inputs">
          <div className="space-y-4">
            <div className="space-y-1.5"><Label>Client</Label><Select value={clientId} onValueChange={setClientId}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{clients.map((x) => <SelectItem key={x.id} value={x.id}>{x.name}</SelectItem>)}</SelectContent></Select></div>
            <div className="space-y-1.5"><Label>Primary focus</Label><Select value={focus} onValueChange={setFocus}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="strength">Strength</SelectItem><SelectItem value="fatloss">Fat loss</SelectItem></SelectContent></Select></div>
            <div className="space-y-1.5"><Label>Duration (weeks)</Label><Input type="number" min={4} max={24} value={weeks} onChange={(e) => setWeeks(e.target.value)} /></div>
            <div className="rounded-md bg-muted p-3 text-xs text-muted-foreground">Goal: {c.goal}<br />Adherence: {c.adherence}% · {c.sessionsLeft} sessions left</div>
            <Button className="w-full" onClick={generate} disabled={state === "loading"}>{state === "loading" ? <RefreshCw className="size-4 animate-spin" /> : <Sparkles className="size-4" />} {state === "ready" ? "Regenerate" : "Generate plan"}</Button>
          </div>
        </Panel>
        {state === "idle" ? (
          <div className="flex min-h-72 flex-col items-center justify-center rounded-lg border border-dashed border-border text-center"><Sparkles className="size-8 text-primary" /><p className="mt-3 font-medium">Pick a client and generate</p><p className="text-sm text-muted-foreground">You can edit everything before publishing.</p></div>
        ) : state === "loading" ? (
          <div className="space-y-3">{[0, 1, 2].map((i) => <div key={i} className="h-28 animate-pulse rounded-lg bg-muted" />)}</div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 rounded-lg border border-primary/30 bg-accent px-4 py-3 text-sm text-accent-foreground"><Sparkles className="size-4" /> Suggested {weeks}-week plan for {c.name} · 3 sessions/week · confidence 87%</div>
            {phases.map((ph, i) => (
              <div key={ph.focus} className="rounded-lg border border-border bg-card p-5">
                <p className="text-xs text-muted-foreground">Phase {i + 1} · weeks {1 + Math.round((i * Number(weeks)) / phases.length)}–{Math.round(((i + 1) * Number(weeks)) / phases.length)}</p>
                <p className="font-semibold">{ph.focus}</p>
                <div className="mt-3 flex flex-wrap gap-2">{ph.sessions.map((s) => <span key={s} className="rounded-md bg-muted px-2.5 py-1 text-sm">{s}</span>)}</div>
              </div>
            ))}
            <div className="flex gap-2"><Button onClick={save}>Save as draft</Button><Button variant="outline" onClick={() => setState("idle")}>Discard</Button></div>
          </div>
        )}
      </div>
    </>
  );
}

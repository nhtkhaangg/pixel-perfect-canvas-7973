import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Circle, History, Rocket, Sparkles, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { seo } from "@/lib/seo";
import { toStatus } from "@/lib/mock/customer";
import type { WorkoutPlan } from "@/lib/mock/trainer";
import { planStore } from "@/lib/trainer-stores";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { FormModal } from "@/components/shared/form-modal";
import { Panel } from "@/components/customer/alerts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/trainer/plans/$id")({
  head: () => seo("Workout plan", "Plan detail, milestones and version history."),
  component: PlanDetail,
});

type Milestone = WorkoutPlan["milestones"][number];

function PlanDetail() {
  const { id } = Route.useParams();
  const all = planStore.use();
  const p = all.find((x) => x.id === id);
  const [review, setReview] = useState<Milestone | null>(null);
  const [note, setNote] = useState("");
  if (!p) return <EmptyState title="Plan not found" action={<Button asChild><Link to="/trainer/plans">Back</Link></Button>} />;

  function publish() {
    all.filter((x) => x.clientId === p!.clientId && x.status === "ACTIVE" && x.id !== p!.id).forEach((x) => planStore.upsert({ ...x, status: "ARCHIVED" }));
    const version = p!.status === "DRAFT" ? p!.version : p!.version + 1;
    planStore.upsert({ ...p!, status: "ACTIVE", version, updatedAt: "2026-09-24", versions: [{ version, date: "2026-09-24", author: "Maya Nguyen", change: "Published & activated", status: "ACTIVE" as const }, ...p!.versions.filter((v) => v.version !== version).map((v) => ({ ...v, status: "ARCHIVED" as const }))] });
    toast.success(`Plan v${version} published & activated`, { description: `${p!.client} can now see it in their roadmap.` });
  }
  function saveReview(status: Milestone["status"]) {
    planStore.upsert({ ...p!, milestones: p!.milestones.map((m) => (m.week === review!.week ? { ...m, status, review: note } : m)) });
    setReview(null); toast.success("Milestone reviewed");
  }

  return (
    <>
      <Link to="/trainer/plans" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> Workout plans</Link>
      <PageHeader
        title={p.title}
        description={`${p.client} · ${p.goal} · ${p.durationWeeks} weeks`}
        actions={
          <>
            <StatusBadge status={p.status === "ARCHIVED" ? "expired" : toStatus(p.status)} label={`${p.status} · v${p.version}`} />
            {p.isAiGenerated ? <Badge variant="secondary"><Sparkles className="size-3" /> AI-generated</Badge> : null}
            {p.status !== "ACTIVE" ? (
              <AlertDialog>
                <AlertDialogTrigger asChild><Button><Rocket className="size-4" /> Publish & activate</Button></AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader><AlertDialogTitle>Publish this plan?</AlertDialogTitle><AlertDialogDescription>{p.client}'s current active plan will be archived and this one becomes ACTIVE immediately.</AlertDialogDescription></AlertDialogHeader>
                  <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={publish}>Publish</AlertDialogAction></AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : <Button variant="outline" onClick={() => { planStore.upsert({ ...p, status: "DRAFT", version: p.version + 1, versions: [{ version: p.version + 1, date: "2026-09-24", author: "Maya Nguyen", change: "New draft from v" + p.version, status: "DRAFT" }, ...p.versions] }); toast("New draft version created"); }}>Create new version</Button>}
          </>
        }
      />
      <Tabs defaultValue="plan">
        <TabsList><TabsTrigger value="plan">Plan</TabsTrigger><TabsTrigger value="milestones">Milestones</TabsTrigger><TabsTrigger value="history">Version history</TabsTrigger></TabsList>
        <TabsContent value="plan" className="mt-4 grid gap-4 md:grid-cols-2">
          {p.weeks.map((w) => (
            <div key={w.week} className="rounded-lg border border-border bg-card p-5">
              <p className="text-xs text-muted-foreground">From week {w.week}</p>
              <p className="font-semibold">{w.focus}</p>
              <ul className="mt-3 flex flex-wrap gap-2">{w.sessions.map((s) => <li key={s} className="rounded-md bg-muted px-2.5 py-1 text-sm">{s}</li>)}</ul>
            </div>
          ))}
        </TabsContent>
        <TabsContent value="milestones" className="mt-4">
          <Panel title="Milestone reviews">
            <ul className="divide-y divide-border">
              {p.milestones.map((m) => {
                const Icon = m.status === "COMPLETED" ? CheckCircle2 : m.status === "MISSED" ? XCircle : Circle;
                return (
                  <li key={m.week} className="flex flex-wrap items-start gap-3 py-4 first:pt-0 last:pb-0">
                    <Icon className={`mt-0.5 size-5 ${m.status === "COMPLETED" ? "text-primary" : m.status === "MISSED" ? "text-destructive" : "text-muted-foreground"}`} />
                    <div className="flex-1"><p className="font-medium">Week {m.week}: {m.title}</p><p className="text-sm text-muted-foreground">Target: {m.target}</p>{m.review ? <p className="mt-1 text-sm">Review: {m.review}</p> : null}</div>
                    <StatusBadge status={m.status === "MISSED" ? "missed" : toStatus(m.status)} label={m.status} />
                    <Button size="sm" variant="outline" onClick={() => { setReview(m); setNote(m.review ?? ""); }}>Review</Button>
                  </li>
                );
              })}
            </ul>
          </Panel>
        </TabsContent>
        <TabsContent value="history" className="mt-4">
          <ol className="space-y-3">
            {p.versions.map((v) => (
              <li key={v.version} className="flex items-center gap-4 rounded-lg border border-border bg-card p-4">
                <span className="flex size-9 items-center justify-center rounded-md bg-muted"><History className="size-4" /></span>
                <div className="flex-1"><p className="font-medium">v{v.version} · {v.change}</p><p className="text-xs text-muted-foreground">{v.date} · {v.author}</p></div>
                <StatusBadge status={v.status === "ARCHIVED" ? "expired" : toStatus(v.status)} label={v.status} />
                {v.status === "ARCHIVED" ? <Button size="sm" variant="ghost" onClick={() => toast(`Restored v${v.version} as a new draft`)}>Restore</Button> : null}
              </li>
            ))}
          </ol>
        </TabsContent>
      </Tabs>
      <FormModal open={!!review} onOpenChange={(o) => !o && setReview(null)} title={review ? `Review: ${review.title}` : ""} description={review ? `Week ${review.week} · target ${review.target}` : ""} footer={<><Button variant="outline" onClick={() => saveReview("MISSED")}>Mark missed</Button><Button onClick={() => saveReview("COMPLETED")}>Mark achieved</Button></>}>
        <Textarea rows={4} value={note} onChange={(e) => setNote(e.target.value)} placeholder="What happened? Any adjustments to the plan?" />
      </FormModal>
    </>
  );
}

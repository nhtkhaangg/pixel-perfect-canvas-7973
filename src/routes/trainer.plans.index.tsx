import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";
import { seo } from "@/lib/seo";
import { toStatus } from "@/lib/mock/customer";
import { planStore } from "@/lib/trainer-stores";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { StatusBadge } from "@/components/shared/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/trainer/plans/")({
  head: () => seo("Workout plans", "Client workout plans — drafts, active and archived."),
  component: Plans,
});

function Plans() {
  const list = planStore.use();
  const navigate = useNavigate();
  return (
    <>
      <PageHeader title="Workout plans" description="Only one plan per client can be ACTIVE. Publishing archives the previous one." actions={<Button asChild><Link to="/trainer/plans/ai"><Sparkles className="size-4" /> AI suggestion</Link></Button>} />
      <DataTable
        data={list}
        rowKey={(r) => r.id}
        searchPlaceholder="Search plans or clients…"
        filters={[{ key: "status", label: "Status", options: ["DRAFT", "ACTIVE", "ARCHIVED"].map((s) => ({ label: s, value: s })) }, { key: "ai", label: "Source", options: [{ label: "AI-generated", value: "ai" }, { label: "Manual", value: "manual" }] }]}
        filterValue={(r, k) => (k === "status" ? r.status : r.isAiGenerated ? "ai" : "manual")}
        columns={[
          { key: "title", header: "Plan", sortable: true, cell: (r) => <div><p className="flex items-center gap-2 font-medium">{r.title}{r.isAiGenerated ? <Badge variant="secondary"><Sparkles className="size-3" /> AI</Badge> : null}</p><p className="text-xs text-muted-foreground">{r.client}</p></div> },
          { key: "goal", header: "Goal" },
          { key: "durationWeeks", header: "Weeks", sortable: true },
          { key: "version", header: "Version", sortable: true, cell: (r) => `v${r.version}` },
          { key: "updatedAt", header: "Updated", sortable: true },
          { key: "status", header: "Status", cell: (r) => <StatusBadge status={r.status === "ARCHIVED" ? "expired" : toStatus(r.status)} label={r.status} /> },
        ]}
        rowActions={[
          { label: "Open", onSelect: (r) => navigate({ to: "/trainer/plans/$id", params: { id: r.id } }) },
          { label: "Archive", onSelect: (r) => { planStore.upsert({ ...r, status: "ARCHIVED" }); toast("Plan archived"); } },
        ]}
      />
    </>
  );
}

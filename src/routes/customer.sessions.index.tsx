import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { sessions, toStatus } from "@/lib/mock/customer";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { DataTable } from "@/components/shared/data-table";

export const Route = createFileRoute("/customer/sessions/")({
  head: () => seo("Training sessions", "All your PT sessions — log workouts, give feedback and finish sessions."),
  component: Sessions,
});

function Sessions() {
  const navigate = useNavigate();
  return (
    <>
      <PageHeader title="Training sessions" description="Open a session to log sets, leave feedback and verify completion with your coach." />
      <DataTable
        data={sessions}
        rowKey={(r) => r.id}
        searchPlaceholder="Search focus or room…"
        filters={[{ key: "status", label: "Status", options: ["UPCOMING", "IN_PROGRESS", "COMPLETED", "MISSED"].map((s) => ({ label: s.replace("_", " "), value: s })) }]}
        filterValue={(r) => r.status}
        columns={[
          { key: "date", header: "Date", sortable: true, cell: (r) => <div><p className="font-medium">{r.date}</p><p className="text-xs text-muted-foreground">{r.start}–{r.end}</p></div> },
          { key: "focus", header: "Focus", sortable: true },
          { key: "trainer", header: "Trainer" },
          { key: "room", header: "Room" },
          { key: "status", header: "Status", cell: (r) => <StatusBadge status={toStatus(r.status)} label={r.status.replace("_", " ")} /> },
        ]}
        rowActions={[{ label: "Open session", onSelect: (r) => navigate({ to: "/customer/sessions/$id", params: { id: r.id } }) }]}
      />
    </>
  );
}

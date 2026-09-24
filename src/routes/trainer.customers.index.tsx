import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { clients } from "@/lib/mock/trainer";
import { toStatus } from "@/lib/mock/customer";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { StatusBadge } from "@/components/shared/status-badge";
import { TrainerPlateauAlert } from "@/components/trainer/plateau";
import { Avatar } from "@/components/public/cards";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/trainer/customers/")({
  head: () => seo("My customers", "All clients on your PT packages."),
  component: Customers,
});

function Customers() {
  const navigate = useNavigate();
  return (
    <>
      <PageHeader title="My customers" description={`${clients.length} clients · ${clients.filter((c) => c.status === "ACTIVE").length} active`} />
      <TrainerPlateauAlert />
      <DataTable
        data={clients}
        rowKey={(r) => r.id}
        searchPlaceholder="Search clients…"
        filters={[{ key: "status", label: "Status", options: ["ACTIVE", "PENDING", "EXPIRED"].map((s) => ({ label: s, value: s })) }]}
        filterValue={(r) => r.status}
        columns={[
          { key: "name", header: "Client", sortable: true, cell: (r) => <div className="flex items-center gap-3"><Avatar name={r.name} /><div><p className="font-medium">{r.name}{r.plateau ? <span className="ml-2 text-xs text-destructive">plateau</span> : null}</p><p className="text-xs text-muted-foreground">{r.goal}</p></div></div> },
          { key: "package", header: "Package" },
          { key: "sessionsLeft", header: "Sessions left", sortable: true, cell: (r) => <div className="w-28"><Progress value={((r.totalSessions - r.sessionsLeft) / r.totalSessions) * 100} className="h-1.5" /><p className="mt-1 text-xs text-muted-foreground">{r.sessionsLeft} of {r.totalSessions} left</p></div> },
          { key: "adherence", header: "Adherence", sortable: true, cell: (r) => `${r.adherence}%` },
          { key: "lastSession", header: "Last session", sortable: true },
          { key: "status", header: "Status", cell: (r) => <StatusBadge status={toStatus(r.status)} label={r.status} /> },
        ]}
        rowActions={[
          { label: "View metrics", onSelect: (r) => navigate({ to: "/trainer/customers/$id", params: { id: r.id } }) },
          { label: "Message", onSelect: () => navigate({ to: "/trainer/chat" }) },
          { label: "AI plan suggestion", onSelect: () => navigate({ to: "/trainer/plans/ai" }) },
        ]}
      />
    </>
  );
}

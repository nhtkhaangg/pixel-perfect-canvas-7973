import { toast } from "sonner";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { SimpleChart, type ChartPoint } from "@/components/shared/simple-chart";
import { DataTable, type Column } from "@/components/shared/data-table";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { vnd } from "@/lib/utils";

export type OpsRow = Record<string, string | number>;

export type OpsConfig = {
  title: string;
  description: string;
  primaryAction?: string;
  stats: { label: string; value: string; hint?: string; delta?: number }[];
  charts: {
    title: string;
    description?: string;
    type?: "line" | "bar";
    xKey: string;
    series: { key: string; label: string }[];
    data: ChartPoint[];
  }[];
  table: {
    title: string;
    columns: { key: string; header: string; kind?: "status" | "money" | "percent" }[];
    rows: OpsRow[];
    filter?: { key: string; label: string; options: { label: string; value: string }[] };
    actions?: string[];
  };
};

export function OpsPage({ config }: { config: OpsConfig }) {
  const { table } = config;
  const columns: Column<OpsRow>[] = table.columns.map((c) => {
    const cell: Column<OpsRow>["cell"] =
      c.kind === "status"
        ? (row) => <StatusBadge status={String(row[c.key])} />
        : c.kind === "money"
          ? (row) => <span className="tabular-nums">{vnd(Number(row[c.key]))}</span>
          : c.kind === "percent"
            ? (row) => (
                <div className="flex min-w-28 items-center gap-2">
                  <div className="h-1.5 flex-1 rounded-full bg-muted">
                    <div className="h-1.5 rounded-full bg-primary" style={{ width: `${row[c.key]}%` }} />
                  </div>
                  <span className="text-xs tabular-nums text-muted-foreground">{row[c.key]}%</span>
                </div>
              )
            : undefined;
    return cell ? { key: c.key, header: c.header, cell } : { key: c.key, header: c.header };
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title={config.title}
        description={config.description}
        actions={
          <>
            <Button variant="outline" onClick={() => toast.success("Đã xuất báo cáo Excel (mẫu)")}>
              Xuất báo cáo
            </Button>
            {config.primaryAction ? (
              <Button onClick={() => toast.info(config.primaryAction!, { description: "Thao tác mẫu" })}>
                {config.primaryAction}
              </Button>
            ) : null}
          </>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {config.stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>
      {config.charts.length ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {config.charts.map((c) => (
            <SimpleChart key={c.title} {...c} />
          ))}
        </div>
      ) : null}
      <div className="space-y-3">
        <h2 className="text-base font-semibold">{table.title}</h2>
        <DataTable
          data={table.rows}
          columns={columns}
          rowKey={(r) => String(r["id"])}
          filters={table.filter ? [table.filter] : []}
          filterValue={(r, k) => String(r[k])}
          rowActions={(table.actions ?? ["Xem chi tiết", "Chỉnh sửa"]).map((label) => ({
            label,
            onSelect: (r: OpsRow) => toast.success(`${label}: ${r["name"] ?? r["id"]}`),
          }))}
        />
      </div>
    </div>
  );
}

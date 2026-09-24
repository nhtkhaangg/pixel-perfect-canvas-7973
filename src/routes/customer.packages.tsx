import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { formatCurrency } from "@/lib/mock/public";
import { customerPackages, toStatus, transactions } from "@/lib/mock/customer";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { DataTable } from "@/components/shared/data-table";
import { StatCard } from "@/components/shared/stat-card";
import { ExpiringPackageBanner } from "@/components/customer/alerts";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export const Route = createFileRoute("/customer/packages")({
  head: () => seo("My packages & transactions", "Your purchased GymFit packages and full payment history."),
  component: MyPackages,
});

const opts = (xs: string[]) => xs.map((x) => ({ label: x, value: x }));

function MyPackages() {
  const navigate = useNavigate();
  const spent = transactions.filter((t) => t.status === "PAID").reduce((s, t) => s + t.amount, 0);
  return (
    <>
      <PageHeader title="My packages" description="Everything you've bought and every payment made." actions={<><Button variant="outline" asChild><Link to="/customer/book-pt">Book PT</Link></Button><Button asChild><Link to="/customer/purchase">Buy membership</Link></Button></>} />
      <ExpiringPackageBanner />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Active packages" value={customerPackages.filter((p) => p.status === "ACTIVE").length} />
        <StatCard label="Pending activation" value={customerPackages.filter((p) => p.status === "PENDING").length} />
        <StatCard label="Total paid" value={formatCurrency(spent)} hint="lifetime" />
      </div>
      <Tabs defaultValue="packages">
        <TabsList>
          <TabsTrigger value="packages">Packages ({customerPackages.length})</TabsTrigger>
          <TabsTrigger value="transactions">Transactions ({transactions.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="packages" className="mt-4">
          <DataTable
            data={customerPackages}
            rowKey={(r) => r.id}
            searchPlaceholder="Search packages…"
            filters={[{ key: "status", label: "Status", options: opts(["PENDING", "ACTIVE", "EXPIRED", "CANCELLED"]) }, { key: "type", label: "Type", options: opts(["MEMBERSHIP", "PT"]) }]}
            filterValue={(r, k) => (k === "status" ? r.status : r.type)}
            columns={[
              { key: "name", header: "Package", sortable: true, cell: (r) => <div><p className="font-medium">{r.name}</p><p className="text-xs text-muted-foreground">{r.id}{r.trainer ? ` · ${r.trainer}` : ""}</p></div> },
              { key: "type", header: "Type" },
              { key: "startDate", header: "Period", sortable: true, cell: (r) => <span className="text-sm">{r.startDate} → {r.endDate}</span> },
              { key: "usage", header: "Usage", value: (r) => r.usedSessions, cell: (r) => r.totalSessions ? <div className="w-28"><Progress value={(r.usedSessions / r.totalSessions) * 100} className="h-1.5" /><p className="mt-1 text-xs text-muted-foreground">{r.usedSessions}/{r.totalSessions} sessions</p></div> : <span className="text-xs text-muted-foreground">{r.usedSessions} visits</span> },
              { key: "price", header: "Price", sortable: true, cell: (r) => formatCurrency(r.price) },
              { key: "status", header: "Status", cell: (r) => <StatusBadge status={toStatus(r.status)} label={r.status} /> },
            ]}
            rowActions={[
              { label: "Renew", onSelect: () => navigate({ to: "/customer/purchase" }) },
              { label: "Request refund", onSelect: () => navigate({ to: "/customer/refund" }) },
              { label: "Cancel", destructive: true, onSelect: (r) => toast.error(r.status === "PENDING" ? `${r.name} cancelled` : "Only pending packages can be cancelled") },
            ]}
          />
        </TabsContent>
        <TabsContent value="transactions" className="mt-4">
          <DataTable
            data={transactions}
            rowKey={(r) => r.id}
            searchPlaceholder="Search reference or package…"
            filters={[{ key: "method", label: "Method", options: opts(["VNPAY", "PAYOS", "CASH"]) }, { key: "status", label: "Status", options: opts(["PAID", "FAILED", "REFUNDED"]) }]}
            filterValue={(r, k) => (k === "method" ? r.method : r.status)}
            columns={[
              { key: "id", header: "Transaction", cell: (r) => <div><p className="font-medium">{r.id}</p><p className="text-xs text-muted-foreground">{r.reference}</p></div> },
              { key: "description", header: "Description", sortable: true },
              { key: "date", header: "Date", sortable: true },
              { key: "method", header: "Method" },
              { key: "amount", header: "Amount", sortable: true, cell: (r) => formatCurrency(r.amount) },
              { key: "status", header: "Status", cell: (r) => <StatusBadge status={toStatus(r.status)} label={r.status} /> },
            ]}
            rowActions={[{ label: "Download receipt", onSelect: (r) => toast.success(`Receipt ${r.id} downloaded`) }]}
          />
        </TabsContent>
      </Tabs>
    </>
  );
}

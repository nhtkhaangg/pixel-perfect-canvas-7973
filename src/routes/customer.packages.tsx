import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { vnd } from "@/lib/utils";
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
  head: () => seo("Gói tập & giao dịch của tôi", "Tất cả gói tập bạn đã mua và lịch sử thanh toán đầy đủ."),
  component: MyPackages,
});

const opts = (xs: string[]) => xs.map((x) => ({ label: x, value: x }));

function MyPackages() {
  const navigate = useNavigate();
  const spent = transactions.filter((t) => t.status === "PAID").reduce((s, t) => s + t.amount, 0);
  return (
    <>
      <PageHeader title="Gói tập của tôi" description="Toàn bộ gói bạn đã mua và mọi khoản thanh toán đã thực hiện." actions={<><Button variant="outline" asChild><Link to="/customer/book-pt">Đặt lịch PT</Link></Button><Button asChild><Link to="/customer/purchase">Mua gói hội viên</Link></Button></>} />
      <ExpiringPackageBanner />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Gói đang hoạt động" value={customerPackages.filter((p) => p.status === "ACTIVE").length} />
        <StatCard label="Chờ kích hoạt" value={customerPackages.filter((p) => p.status === "PENDING").length} />
        <StatCard label="Tổng đã thanh toán" value={vnd(spent)} hint="tính đến hiện tại" />
      </div>
      <Tabs defaultValue="packages">
        <TabsList>
          <TabsTrigger value="packages">Gói tập ({customerPackages.length})</TabsTrigger>
          <TabsTrigger value="transactions">Giao dịch ({transactions.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="packages" className="mt-4">
          <DataTable
            data={customerPackages}
            rowKey={(r) => r.id}
            searchPlaceholder="Tìm gói tập…"
            filters={[{ key: "status", label: "Trạng thái", options: opts(["PENDING", "ACTIVE", "EXPIRED", "CANCELLED"]) }, { key: "type", label: "Loại", options: [{ label: "Hội viên", value: "MEMBERSHIP" }, { label: "PT", value: "PT" }] }]}
            filterValue={(r, k) => (k === "status" ? r.status : r.type)}
            columns={[
              { key: "name", header: "Gói tập", sortable: true, cell: (r) => <div><p className="font-medium">{r.name}</p><p className="text-xs text-muted-foreground">{r.id}{r.trainer ? ` · ${r.trainer}` : ""}</p></div> },
              { key: "type", header: "Loại", cell: (r) => r.type === "MEMBERSHIP" ? "Hội viên" : "PT" },
              { key: "startDate", header: "Thời hạn", sortable: true, cell: (r) => <span className="text-sm">{r.startDate} → {r.endDate}</span> },
              { key: "usage", header: "Mức sử dụng", value: (r) => r.usedSessions, cell: (r) => r.totalSessions ? <div className="w-28"><Progress value={(r.usedSessions / r.totalSessions) * 100} className="h-1.5" /><p className="mt-1 text-xs text-muted-foreground">{r.usedSessions}/{r.totalSessions} buổi</p></div> : <span className="text-xs text-muted-foreground">{r.usedSessions} lượt</span> },
              { key: "price", header: "Giá", sortable: true, cell: (r) => vnd(r.price) },
              { key: "status", header: "Trạng thái", cell: (r) => <StatusBadge status={toStatus(r.status)} label={r.status} /> },
            ]}
            rowActions={[
              { label: "Gia hạn", onSelect: () => navigate({ to: "/customer/purchase" }) },
              { label: "Yêu cầu hoàn tiền", onSelect: () => navigate({ to: "/customer/refund" }) },
              { label: "Hủy gói", destructive: true, onSelect: (r) => toast.error(r.status === "PENDING" ? `${r.name} đã bị hủy` : "Chỉ có thể hủy gói đang chờ kích hoạt") },
            ]}
          />
        </TabsContent>
        <TabsContent value="transactions" className="mt-4">
          <DataTable
            data={transactions}
            rowKey={(r) => r.id}
            searchPlaceholder="Tìm mã giao dịch hoặc gói tập…"
            filters={[{ key: "method", label: "Phương thức", options: opts(["VNPAY", "PAYOS", "CASH"]) }, { key: "status", label: "Trạng thái", options: opts(["PAID", "FAILED", "REFUNDED"]) }]}
            filterValue={(r, k) => (k === "method" ? r.method : r.status)}
            columns={[
              { key: "id", header: "Giao dịch", cell: (r) => <div><p className="font-medium">{r.id}</p><p className="text-xs text-muted-foreground">{r.reference}</p></div> },
              { key: "description", header: "Nội dung", sortable: true },
              { key: "date", header: "Ngày", sortable: true },
              { key: "method", header: "Phương thức", cell: (r) => r.method === "CASH" ? "Tiền mặt" : r.method },
              { key: "amount", header: "Số tiền", sortable: true, cell: (r) => vnd(r.amount) },
              { key: "status", header: "Trạng thái", cell: (r) => <StatusBadge status={toStatus(r.status)} label={r.status} /> },
            ]}
            rowActions={[{ label: "Tải hóa đơn", onSelect: (r) => toast.success(`Đã tải hóa đơn ${r.id}`) }]}
          />
        </TabsContent>
      </Tabs>
    </>
  );
}

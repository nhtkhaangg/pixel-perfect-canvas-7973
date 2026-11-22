import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { MapPin, Bell, CheckCircle2, XCircle, Salad } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { SimpleChart } from "@/components/shared/simple-chart";
import { DataTable } from "@/components/shared/data-table";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  canonicalMetrics,
  canonicalPurchased,
  canonicalPayments,
  canonicalCheckIns,
  canonicalGym,
  demoCustomer,
} from "@/lib/omnigym/data";
import { gymImages } from "@/lib/images";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { RefundPanel } from "./refund-panel";
import { useEntities } from "@/lib/omnigym/store";
import { EntityWorkspace } from "./entity-workspace";
import { Dashboard } from "./dashboard-page";
import { OpsPage } from "@/components/shared/ops-page";
import { opsPages } from "@/lib/mock/operations";
import { vnd } from "@/lib/utils";
export function OperationsDashboard() {
  return <OpsPage config={opsPages.managerIndex} />;
}
export function MetricsPage() {
  const last = canonicalMetrics.at(-1);
  return (
    <>
      <PageHeader
        title="Chỉ số cơ thể"
        description="Lịch sử InBody và tiến độ của Nguyễn Minh Anh."
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Cân nặng" value={`${last?.weightKg} kg`} />
        <StatCard label="Tỷ lệ mỡ" value={`${last?.body_fat_percentage}%`} />
        <StatCard label="BMI" value={last?.bmi ?? "—"} />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <SimpleChart
          title="Cân nặng"
          data={canonicalMetrics}
          xKey="recordedDate"
          series={[{ key: "weightKg", label: "Cân nặng (kg)" }]}
        />
        <SimpleChart
          title="Tỷ lệ mỡ"
          data={canonicalMetrics}
          xKey="recordedDate"
          series={[{ key: "body_fat_percentage", label: "Tỷ lệ mỡ (%)" }]}
        />
      </div>
      <DataTable
        data={canonicalMetrics}
        rowKey={(r) => r.id}
        columns={[
          { key: "recordedDate", header: "Ngày đo" },
          { key: "weightKg", header: "Cân nặng (kg)" },
          { key: "heightCm", header: "Chiều cao (cm)" },
          { key: "body_fat_percentage", header: "Tỷ lệ mỡ (%)" },
          { key: "muscleMassKg", header: "Khối lượng cơ (kg)" },
          { key: "bmi", header: "BMI" },
        ]}
      />
    </>
  );
}
export function TransactionsPage() {
  const purchased = useEntities("purchased");
  return (
    <>
      <PageHeader title="Gói đã mua & giao dịch" />
      <Tabs defaultValue="packages">
        <TabsList>
          <TabsTrigger value="packages">Gói đã mua</TabsTrigger>
          <TabsTrigger value="payments">Giao dịch</TabsTrigger>
        </TabsList>
        <TabsContent value="packages">
          <DataTable
            data={purchased}
            rowKey={(r) => String(r["id"])}
            columns={[
              { key: "pkg_id", header: "Gói" },
              { key: "actual_price", header: "Giá", cell: (r) => vnd(Number(r["actual_price"])) },
              { key: "start_date", header: "Bắt đầu" },
              { key: "end_date", header: "Kết thúc" },
              { key: "remaining_sessions", header: "Buổi còn lại" },
              {
                key: "status",
                header: "Trạng thái",
                cell: (r) => <StatusBadge status={String(r["status"])} />,
              },
            ]}
          />
          <div className="mt-6">
            <RefundPanel />
          </div>
        </TabsContent>
        <TabsContent value="payments">
          <EntityWorkspace entity="payments" />
        </TabsContent>
      </Tabs>
    </>
  );
}
export function CheckInHistoryPage() {
  return (
    <>
      <PageHeader title="Lịch sử check-in" />
      <DataTable
        data={canonicalCheckIns}
        rowKey={(r) => r.id}
        columns={[
          { key: "checkInTime", header: "Giờ vào" },
          { key: "checkOutTime", header: "Giờ ra" },
          { key: "method", header: "Phương thức" },
          {
            key: "status",
            header: "Trạng thái",
            cell: (r) => <StatusBadge status={String(r["status"])} />,
          },
        ]}
      />
    </>
  );
}
export function NutritionPage() {
  return (
    <>
      <PageHeader title="Chế độ dinh dưỡng" description="Giáo án dinh dưỡng đang áp dụng." />
      <div className="flex items-center gap-3 border-b border-border pb-6">
        <Salad className="size-9 text-primary" />
        <div>
          <h2 className="text-xl font-semibold">Dinh dưỡng giảm mỡ</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Nguyễn Minh Anh · Huấn luyện viên Nguyễn Minh Anh
          </p>
        </div>
        <StatusBadge className="ml-auto" status="ACTIVE" />
      </div>
      <StatCard label="Năng lượng hàng ngày" value="2.250 kcal" />
      <p className="text-sm text-muted-foreground">Chưa có chi tiết bữa ăn được chỉ định.</p>
    </>
  );
}
export function BranchesPage() {
  const [q, setQ] = useState("");
  return (
    <>
      <PageHeader title="Chi nhánh OmniGym" />
      <Input
        placeholder="Tìm chi nhánh…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="max-w-sm"
      />
      {canonicalGym.name.toLowerCase().includes(q.toLowerCase()) && (
        <Link
          to="/branches/$id"
          params={{ id: "gym-1" }}
          className="block overflow-hidden rounded-xl border border-border bg-card"
        >
          <img src={gymImages.hero} alt="OmniGym" className="aspect-[3/1] w-full object-cover" />
          <div className="p-5">
            <h2 className="text-lg font-semibold">OmniGym — Nguyễn Huệ</h2>
            <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-4" />
              {canonicalGym.address}
            </p>
          </div>
        </Link>
      )}
    </>
  );
}
export function BranchDetail() {
  return (
    <>
      <img
        src={gymImages.hero}
        alt="Không gian OmniGym"
        className="aspect-[3/1] w-full rounded-xl object-cover"
      />
      <PageHeader title="OmniGym — Nguyễn Huệ" description={canonicalGym.address} />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Diện tích" value={canonicalGym.totalArea} />
        <StatCard label="Sức chứa" value={canonicalGym.capacity} />
        <StatCard label="Hotline" value={canonicalGym.hotline} />
      </div>
      <Button asChild>
        <Link to="/gym-info">Thông tin phòng gym</Link>
      </Button>
    </>
  );
}
export function PaymentResult({ cancel = false }: { cancel?: boolean }) {
  return (
    <div className="mx-auto max-w-lg py-12 text-center">
      {cancel ? (
        <XCircle className="mx-auto size-14 text-warning" />
      ) : (
        <CheckCircle2 className="mx-auto size-14 text-primary" />
      )}
      <h1 className="mt-5 text-2xl font-semibold">
        {cancel ? "Đã hủy thanh toán" : "Thanh toán hoàn tất"}
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        {cancel
          ? "Bạn có thể quay lại để tiếp tục đặt mua gói tập."
          : "Gói tập của bạn đã được cập nhật trong lịch sử giao dịch."}
      </p>
      <div className="mt-7 flex justify-center gap-3">
        <Button asChild>
          <Link to={cancel ? "/payment/checkout" : "/transaction-history"}>
            {cancel ? "Thử lại" : "Xem giao dịch"}
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/">Trang chủ</Link>
        </Button>
      </div>
    </div>
  );
}
export function InternalProfile() {
  return (
    <>
      <PageHeader title="Hồ sơ nội bộ" />
      <div className="space-y-3 border-t border-border pt-5">
        <p className="font-semibold">Trần Thanh Phong</p>
        <p className="text-muted-foreground">manager@omnigym.vn</p>
        <p className="text-sm">MGR-0001</p>
      </div>
    </>
  );
}
export function OperationsNotifications() {
  return (
    <>
      <PageHeader title="Thông báo vận hành" />
      <ul className="divide-y divide-border">
        {[
          "5 chứng chỉ huấn luyện viên đang chờ duyệt",
          "Máy tập cần bảo trì trong tuần",
          "Có yêu cầu hoàn tiền mới",
        ].map((t) => (
          <li key={t} className="flex gap-4 py-5">
            <Bell className="size-5 text-primary" />
            <div>
              <p className="font-medium">{t}</p>
              <p className="mt-1 text-xs text-muted-foreground">22/11/2026 09:00</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
export { Dashboard, demoCustomer };

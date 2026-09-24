import { createFileRoute } from "@tanstack/react-router";
import { QRCodeSVG } from "qrcode.react";
import { RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { seo } from "@/lib/seo";
import { checkIns, me, toStatus } from "@/lib/mock/customer";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/customer/check-in")({
  head: () => seo("Check-in của tôi", "Đưa mã QR cá nhân tại cổng vào GymFit và xem lại lịch sử check-in."),
  component: CheckIn,
});

function CheckIn() {
  const [token, setToken] = useState(() => "GF-1042-A7K9");
  const [left, setLeft] = useState(60);
  useEffect(() => {
    const t = setInterval(() => setLeft((l) => (l <= 1 ? (setToken(`GF-1042-${Math.random().toString(36).slice(2, 6).toUpperCase()}`), 60) : l - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <PageHeader title="Check-in" description="Quét mã này tại cổng xoay hoặc quầy lễ tân. Mã sẽ tự làm mới sau mỗi 60 giây." />
      <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
        <div className="rounded-lg bg-surface p-6 text-center text-surface-foreground shadow-sm">
          <p className="text-xs tracking-wider text-surface-foreground/60 uppercase">Thẻ hội viên</p>
          <p className="mt-1 font-semibold">{me.name}</p>
          <div className="mx-auto mt-5 w-fit rounded-lg bg-card p-4">
            <QRCodeSVG value={`gymfit://checkin/${me.id}/${token}`} size={200} fgColor="currentColor" className="text-foreground" />
          </div>
          <p className="mt-4 font-mono text-sm tracking-widest">{token}</p>
          <p className="mt-1 text-xs text-surface-foreground/60">Làm mới sau {left} giây</p>
          <Button variant="secondary" size="sm" className="mt-4" onClick={() => setLeft(1)}><RefreshCw className="size-4" /> Làm mới ngay</Button>
        </div>
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard label="Trong tháng này" value={checkIns.filter((c) => c.status === "CHECKED_IN").length} delta={16} hint="so với tháng trước" />
            <StatCard label="Chuỗi tuần liên tiếp" value="3 tuần" hint="từ 3 buổi/tuần trở lên" />
            <StatCard label="Khung giờ hay đến" value="18:00" hint="Khu tạ tự do" />
          </div>
          <DataTable
            data={checkIns}
            rowKey={(r) => r.id}
            pageSize={6}
            searchPlaceholder="Tìm khu vực…"
            filters={[{ key: "zone", label: "Khu vực", options: [...new Set(checkIns.map((c) => c.zone))].map((b) => ({ label: b, value: b })) }]}
            filterValue={(r) => r.zone}
            columns={[
              { key: "date", header: "Ngày", sortable: true },
              { key: "time", header: "Giờ" },
              { key: "zone", header: "Khu vực", sortable: true },
              { key: "method", header: "Phương thức" },
              { key: "status", header: "Trạng thái", cell: (r) => <StatusBadge status={toStatus(r.status)} label={r.status === "CHECKED_IN" ? "Đã check-in" : "Thất bại"} /> },
            ]}
          />
        </div>
      </div>
    </>
  );
}

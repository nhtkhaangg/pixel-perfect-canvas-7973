import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { sessions, toStatus } from "@/lib/mock/customer";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { DataTable } from "@/components/shared/data-table";

export const Route = createFileRoute("/customer/sessions/")({
  head: () => seo("Buổi tập luyện", "Tất cả buổi tập PT của bạn — ghi lại nhật ký tập, gửi phản hồi và hoàn tất buổi tập."),
  component: Sessions,
});

const statusLabel: Record<string, string> = { UPCOMING: "Sắp diễn ra", IN_PROGRESS: "Đang diễn ra", COMPLETED: "Hoàn thành", MISSED: "Đã lỡ" };

function Sessions() {
  const navigate = useNavigate();
  return (
    <>
      <PageHeader title="Buổi tập luyện" description="Mở một buổi tập để ghi lại số set, để lại phản hồi và xác nhận hoàn tất với huấn luyện viên." />
      <DataTable
        data={sessions}
        rowKey={(r) => r.id}
        searchPlaceholder="Tìm theo trọng tâm hoặc phòng tập…"
        filters={[{ key: "status", label: "Trạng thái", options: ["UPCOMING", "IN_PROGRESS", "COMPLETED", "MISSED"].map((s) => ({ label: statusLabel[s] ?? s, value: s })) }]}
        filterValue={(r) => r.status}
        columns={[
          { key: "date", header: "Ngày", sortable: true, cell: (r) => <div><p className="font-medium">{r.date}</p><p className="text-xs text-muted-foreground">{r.start}–{r.end}</p></div> },
          { key: "focus", header: "Trọng tâm", sortable: true },
          { key: "trainer", header: "Huấn luyện viên" },
          { key: "room", header: "Phòng tập" },
          { key: "status", header: "Trạng thái", cell: (r) => <StatusBadge status={toStatus(r.status)} label={r.status.replace("_", " ")} /> },
        ]}
        rowActions={[{ label: "Mở buổi tập", onSelect: (r) => navigate({ to: "/customer/sessions/$id", params: { id: r.id } }) }]}
      />
    </>
  );
}

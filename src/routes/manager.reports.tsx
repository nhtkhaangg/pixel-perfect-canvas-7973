import { createFileRoute } from "@tanstack/react-router";
import { OpsPage } from "@/components/shared/ops-page";
import { opsPages } from "@/lib/mock/operations";

export const Route = createFileRoute("/manager/reports")({
  head: () => ({
    meta: [
      { title: "Báo cáo — Quản lý — GymFit" },
      { name: "description", content: "Báo cáo doanh thu, điểm danh và duy trì hội viên." },
      { property: "og:title", content: "Báo cáo — Quản lý — GymFit" },
      { property: "og:description", content: "Báo cáo doanh thu, điểm danh và duy trì hội viên." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ManagerReportsPage,
});

function ManagerReportsPage() {
  return <OpsPage config={opsPages.managerReports} />;
}

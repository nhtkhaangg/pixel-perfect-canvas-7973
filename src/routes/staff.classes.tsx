import { createFileRoute } from "@tanstack/react-router";
import { OpsPage } from "@/components/shared/ops-page";
import { opsPages } from "@/lib/mock/operations";

export const Route = createFileRoute("/staff/classes")({
  head: () => ({
    meta: [
      { title: "Lớp học — Nhân viên — GymFit" },
      { name: "description", content: "Quản lý danh sách lớp học và điểm danh." },
      { property: "og:title", content: "Lớp học — Nhân viên — GymFit" },
      { property: "og:description", content: "Quản lý danh sách lớp học và điểm danh." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StaffClassesPage,
});

function StaffClassesPage() {
  return <OpsPage config={opsPages.staffClasses} />;
}

import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldPage } from "@/components/shared/scaffold-page";

export const Route = createFileRoute("/manager/staff")({
  head: () => ({
    meta: [
      { title: "Nhân viên — Quản lý — GymFit" },
      { name: "description", content: "Hồ sơ nhân viên, huấn luyện viên, ca làm và phê duyệt." },
      { property: "og:title", content: "Nhân viên — Quản lý — GymFit" },
      { property: "og:description", content: "Hồ sơ nhân viên, huấn luyện viên, ca làm và phê duyệt." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ManagerStaffPage,
});

function ManagerStaffPage() {
  return <ScaffoldPage title="Nhân viên" description="Hồ sơ nhân viên, huấn luyện viên, ca làm và phê duyệt." />;
}

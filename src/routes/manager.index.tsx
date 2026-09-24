import { createFileRoute } from "@tanstack/react-router";
import { OpsPage } from "@/components/shared/ops-page";
import { opsPages } from "@/lib/mock/operations";

export const Route = createFileRoute("/manager/")({
  head: () => ({
    meta: [
      { title: "Tổng quan — Quản lý — GymFit" },
      { name: "description", content: "Hiệu suất phòng gym, nhân sự và xu hướng hội viên." },
      { property: "og:title", content: "Tổng quan — Quản lý — GymFit" },
      { property: "og:description", content: "Hiệu suất phòng gym, nhân sự và xu hướng hội viên." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ManagerIndexPage,
});

function ManagerIndexPage() {
  return <OpsPage config={opsPages.managerIndex} />;
}

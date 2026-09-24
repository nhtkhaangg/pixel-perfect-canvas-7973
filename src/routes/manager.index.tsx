import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldPage } from "@/components/shared/scaffold-page";

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
  return <ScaffoldPage title="Tổng quan" description="Hiệu suất phòng gym, nhân sự và xu hướng hội viên." />;
}

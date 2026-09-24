import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldPage } from "@/components/shared/scaffold-page";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Tổng quan — Quản trị viên — GymFit" },
      { name: "description", content: "Tình trạng hệ thống, mức sử dụng và hoạt động quản trị gần đây." },
      { property: "og:title", content: "Tổng quan — Quản trị viên — GymFit" },
      { property: "og:description", content: "Tình trạng hệ thống, mức sử dụng và hoạt động quản trị gần đây." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminIndexPage,
});

function AdminIndexPage() {
  return <ScaffoldPage title="Tổng quan" description="Tình trạng hệ thống, mức sử dụng và hoạt động quản trị gần đây." />;
}

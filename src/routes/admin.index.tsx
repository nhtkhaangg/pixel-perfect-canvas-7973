import { createFileRoute } from "@tanstack/react-router";
import { OpsPage } from "@/components/shared/ops-page";
import { opsPages } from "@/lib/mock/operations";

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
  return <OpsPage config={opsPages.adminIndex} />;
}

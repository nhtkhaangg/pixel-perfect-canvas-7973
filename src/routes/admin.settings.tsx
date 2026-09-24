import { createFileRoute } from "@tanstack/react-router";
import { OpsPage } from "@/components/shared/ops-page";
import { opsPages } from "@/lib/mock/operations";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({
    meta: [
      { title: "Cài đặt — Quản trị viên — GymFit" },
      { name: "description", content: "Cấu hình hệ thống và tích hợp." },
      { property: "og:title", content: "Cài đặt — Quản trị viên — GymFit" },
      { property: "og:description", content: "Cấu hình hệ thống và tích hợp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminSettingsPage,
});

function AdminSettingsPage() {
  return <OpsPage config={opsPages.adminSettings} />;
}

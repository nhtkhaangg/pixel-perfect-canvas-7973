import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldPage } from "@/components/shared/scaffold-page";

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
  return <ScaffoldPage title="Cài đặt" description="Cấu hình hệ thống và tích hợp." />;
}

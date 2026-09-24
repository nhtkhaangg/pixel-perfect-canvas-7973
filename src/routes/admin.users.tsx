import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldPage } from "@/components/shared/scaffold-page";

export const Route = createFileRoute("/admin/users")({
  head: () => ({
    meta: [
      { title: "Người dùng — Quản trị viên — GymFit" },
      { name: "description", content: "Toàn bộ tài khoản người dùng trong hệ thống." },
      { property: "og:title", content: "Người dùng — Quản trị viên — GymFit" },
      { property: "og:description", content: "Toàn bộ tài khoản người dùng trong hệ thống." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminUsersPage,
});

function AdminUsersPage() {
  return <ScaffoldPage title="Người dùng" description="Toàn bộ tài khoản người dùng trong hệ thống." />;
}

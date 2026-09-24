import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldPage } from "@/components/shared/scaffold-page";

export const Route = createFileRoute("/admin/roles")({
  head: () => ({
    meta: [
      { title: "Vai trò — Quản trị viên — GymFit" },
      { name: "description", content: "Định nghĩa vai trò và tập quyền hạn." },
      { property: "og:title", content: "Vai trò — Quản trị viên — GymFit" },
      { property: "og:description", content: "Định nghĩa vai trò và tập quyền hạn." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminRolesPage,
});

function AdminRolesPage() {
  return <ScaffoldPage title="Vai trò" description="Định nghĩa vai trò và tập quyền hạn." />;
}

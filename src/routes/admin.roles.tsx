import { createFileRoute } from "@tanstack/react-router";
import { OpsPage } from "@/components/shared/ops-page";
import { opsPages } from "@/lib/mock/operations";

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
  return <OpsPage config={opsPages.adminRoles} />;
}

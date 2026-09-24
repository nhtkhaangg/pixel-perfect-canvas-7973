import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldPage } from "@/components/shared/scaffold-page";

export const Route = createFileRoute("/admin/roles")({
  head: () => ({
    meta: [
      { title: "Roles — Admin — GymFit" },
      { name: "description", content: "Role definitions and permission sets." },
      { property: "og:title", content: "Roles — Admin — GymFit" },
      { property: "og:description", content: "Role definitions and permission sets." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminRolesPage,
});

function AdminRolesPage() {
  return <ScaffoldPage title="Roles" description="Role definitions and permission sets." />;
}

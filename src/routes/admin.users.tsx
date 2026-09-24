import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldPage } from "@/components/shared/scaffold-page";

export const Route = createFileRoute("/admin/users")({
  head: () => ({
    meta: [
      { title: "Users — Admin — GymFit" },
      { name: "description", content: "All platform accounts across every branch." },
      { property: "og:title", content: "Users — Admin — GymFit" },
      { property: "og:description", content: "All platform accounts across every branch." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminUsersPage,
});

function AdminUsersPage() {
  return <ScaffoldPage title="Users" description="All platform accounts across every branch." />;
}

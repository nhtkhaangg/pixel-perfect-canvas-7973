import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldPage } from "@/components/shared/scaffold-page";

export const Route = createFileRoute("/admin/branches")({
  head: () => ({
    meta: [
      { title: "Branches — Admin — GymFit" },
      { name: "description", content: "Gym locations, opening hours and capacity." },
      { property: "og:title", content: "Branches — Admin — GymFit" },
      { property: "og:description", content: "Gym locations, opening hours and capacity." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminBranchesPage,
});

function AdminBranchesPage() {
  return <ScaffoldPage title="Branches" description="Gym locations, opening hours and capacity." />;
}

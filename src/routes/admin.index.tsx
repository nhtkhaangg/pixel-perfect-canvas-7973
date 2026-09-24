import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldPage } from "@/components/shared/scaffold-page";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Admin — GymFit" },
      { name: "description", content: "System-wide health, usage and recent administrative activity." },
      { property: "og:title", content: "Dashboard — Admin — GymFit" },
      { property: "og:description", content: "System-wide health, usage and recent administrative activity." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminIndexPage,
});

function AdminIndexPage() {
  return <ScaffoldPage title="Dashboard" description="System-wide health, usage and recent administrative activity." />;
}

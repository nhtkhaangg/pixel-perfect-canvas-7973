import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldPage } from "@/components/shared/scaffold-page";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Admin — GymFit" },
      { name: "description", content: "Platform configuration and integrations." },
      { property: "og:title", content: "Settings — Admin — GymFit" },
      { property: "og:description", content: "Platform configuration and integrations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminSettingsPage,
});

function AdminSettingsPage() {
  return <ScaffoldPage title="Settings" description="Platform configuration and integrations." />;
}

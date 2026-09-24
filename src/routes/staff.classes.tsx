import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldPage } from "@/components/shared/scaffold-page";

export const Route = createFileRoute("/staff/classes")({
  head: () => ({
    meta: [
      { title: "Classes — Staff — GymFit" },
      { name: "description", content: "Manage class rosters and attendance." },
      { property: "og:title", content: "Classes — Staff — GymFit" },
      { property: "og:description", content: "Manage class rosters and attendance." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StaffClassesPage,
});

function StaffClassesPage() {
  return <ScaffoldPage title="Classes" description="Manage class rosters and attendance." />;
}

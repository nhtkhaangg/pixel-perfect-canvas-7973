import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldPage } from "@/components/shared/scaffold-page";

export const Route = createFileRoute("/staff/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Staff — GymFit" },
      { name: "description", content: "Front-desk overview: check-ins, walk-ins and open tasks." },
      { property: "og:title", content: "Dashboard — Staff — GymFit" },
      { property: "og:description", content: "Front-desk overview: check-ins, walk-ins and open tasks." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StaffIndexPage,
});

function StaffIndexPage() {
  return <ScaffoldPage title="Dashboard" description="Front-desk overview: check-ins, walk-ins and open tasks." />;
}

import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldPage } from "@/components/shared/scaffold-page";

export const Route = createFileRoute("/manager/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Manager — GymFit" },
      { name: "description", content: "Branch performance, staffing and membership trends." },
      { property: "og:title", content: "Dashboard — Manager — GymFit" },
      { property: "og:description", content: "Branch performance, staffing and membership trends." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ManagerIndexPage,
});

function ManagerIndexPage() {
  return <ScaffoldPage title="Dashboard" description="Branch performance, staffing and membership trends." />;
}

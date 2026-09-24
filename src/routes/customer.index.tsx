import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldPage } from "@/components/shared/scaffold-page";

export const Route = createFileRoute("/customer/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Customer — GymFit" },
      { name: "description", content: "Overview of your membership, upcoming classes and recent activity." },
      { property: "og:title", content: "Dashboard — Customer — GymFit" },
      { property: "og:description", content: "Overview of your membership, upcoming classes and recent activity." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CustomerIndexPage,
});

function CustomerIndexPage() {
  return <ScaffoldPage title="Dashboard" description="Overview of your membership, upcoming classes and recent activity." />;
}

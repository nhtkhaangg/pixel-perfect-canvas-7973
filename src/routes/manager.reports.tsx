import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldPage } from "@/components/shared/scaffold-page";

export const Route = createFileRoute("/manager/reports")({
  head: () => ({
    meta: [
      { title: "Reports — Manager — GymFit" },
      { name: "description", content: "Revenue, attendance and retention reporting." },
      { property: "og:title", content: "Reports — Manager — GymFit" },
      { property: "og:description", content: "Revenue, attendance and retention reporting." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ManagerReportsPage,
});

function ManagerReportsPage() {
  return <ScaffoldPage title="Reports" description="Revenue, attendance and retention reporting." />;
}

import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldPage } from "@/components/shared/scaffold-page";

export const Route = createFileRoute("/trainer/schedule")({
  head: () => ({
    meta: [
      { title: "Schedule — Trainer — GymFit" },
      { name: "description", content: "Your session calendar and class assignments." },
      { property: "og:title", content: "Schedule — Trainer — GymFit" },
      { property: "og:description", content: "Your session calendar and class assignments." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TrainerSchedulePage,
});

function TrainerSchedulePage() {
  return <ScaffoldPage title="Schedule" description="Your session calendar and class assignments." />;
}

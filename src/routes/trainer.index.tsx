import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldPage } from "@/components/shared/scaffold-page";

export const Route = createFileRoute("/trainer/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Trainer — GymFit" },
      { name: "description", content: "Today's sessions, client highlights and coaching tasks." },
      { property: "og:title", content: "Dashboard — Trainer — GymFit" },
      { property: "og:description", content: "Today's sessions, client highlights and coaching tasks." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TrainerIndexPage,
});

function TrainerIndexPage() {
  return <ScaffoldPage title="Dashboard" description="Today's sessions, client highlights and coaching tasks." />;
}

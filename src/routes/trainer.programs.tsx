import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldPage } from "@/components/shared/scaffold-page";

export const Route = createFileRoute("/trainer/programs")({
  head: () => ({
    meta: [
      { title: "Programs — Trainer — GymFit" },
      { name: "description", content: "Training programmes and templates you manage." },
      { property: "og:title", content: "Programs — Trainer — GymFit" },
      { property: "og:description", content: "Training programmes and templates you manage." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TrainerProgramsPage,
});

function TrainerProgramsPage() {
  return <ScaffoldPage title="Programs" description="Training programmes and templates you manage." />;
}

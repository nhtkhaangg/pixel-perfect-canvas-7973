import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldPage } from "@/components/shared/scaffold-page";

export const Route = createFileRoute("/trainer/clients")({
  head: () => ({
    meta: [
      { title: "Clients — Trainer — GymFit" },
      { name: "description", content: "Clients you coach, with progress and notes." },
      { property: "og:title", content: "Clients — Trainer — GymFit" },
      { property: "og:description", content: "Clients you coach, with progress and notes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TrainerClientsPage,
});

function TrainerClientsPage() {
  return <ScaffoldPage title="Clients" description="Clients you coach, with progress and notes." />;
}

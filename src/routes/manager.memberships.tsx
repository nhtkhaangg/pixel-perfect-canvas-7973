import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldPage } from "@/components/shared/scaffold-page";

export const Route = createFileRoute("/manager/memberships")({
  head: () => ({
    meta: [
      { title: "Memberships — Manager — GymFit" },
      { name: "description", content: "Plans, pricing and membership approvals." },
      { property: "og:title", content: "Memberships — Manager — GymFit" },
      { property: "og:description", content: "Plans, pricing and membership approvals." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ManagerMembershipsPage,
});

function ManagerMembershipsPage() {
  return <ScaffoldPage title="Memberships" description="Plans, pricing and membership approvals." />;
}

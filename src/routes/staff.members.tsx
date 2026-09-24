import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldPage } from "@/components/shared/scaffold-page";

export const Route = createFileRoute("/staff/members")({
  head: () => ({
    meta: [
      { title: "Members — Staff — GymFit" },
      { name: "description", content: "Look up member records and membership status." },
      { property: "og:title", content: "Members — Staff — GymFit" },
      { property: "og:description", content: "Look up member records and membership status." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StaffMembersPage,
});

function StaffMembersPage() {
  return <ScaffoldPage title="Members" description="Look up member records and membership status." />;
}

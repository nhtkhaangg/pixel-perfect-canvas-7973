import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldPage } from "@/components/shared/scaffold-page";

export const Route = createFileRoute("/manager/staff")({
  head: () => ({
    meta: [
      { title: "Staff — Manager — GymFit" },
      { name: "description", content: "Staff and trainer records, shifts and approvals." },
      { property: "og:title", content: "Staff — Manager — GymFit" },
      { property: "og:description", content: "Staff and trainer records, shifts and approvals." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ManagerStaffPage,
});

function ManagerStaffPage() {
  return <ScaffoldPage title="Staff" description="Staff and trainer records, shifts and approvals." />;
}

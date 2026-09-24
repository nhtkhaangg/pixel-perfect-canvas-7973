import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldPage } from "@/components/shared/scaffold-page";

export const Route = createFileRoute("/staff/check-in")({
  head: () => ({
    meta: [
      { title: "Check-in — Staff — GymFit" },
      { name: "description", content: "Scan or search members to record a gym check-in." },
      { property: "og:title", content: "Check-in — Staff — GymFit" },
      { property: "og:description", content: "Scan or search members to record a gym check-in." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StaffCheckInPage,
});

function StaffCheckInPage() {
  return <ScaffoldPage title="Check-in" description="Scan or search members to record a gym check-in." />;
}

import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldPage } from "@/components/shared/scaffold-page";

export const Route = createFileRoute("/customer/profile")({
  head: () => ({
    meta: [
      { title: "Profile — Customer — GymFit" },
      { name: "description", content: "Personal details, goals and notification preferences." },
      { property: "og:title", content: "Profile — Customer — GymFit" },
      { property: "og:description", content: "Personal details, goals and notification preferences." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CustomerProfilePage,
});

function CustomerProfilePage() {
  return <ScaffoldPage title="Profile" description="Personal details, goals and notification preferences." />;
}

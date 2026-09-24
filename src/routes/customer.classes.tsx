import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldPage } from "@/components/shared/scaffold-page";

export const Route = createFileRoute("/customer/classes")({
  head: () => ({
    meta: [
      { title: "Classes — Customer — GymFit" },
      { name: "description", content: "Browse and book classes from the weekly schedule." },
      { property: "og:title", content: "Classes — Customer — GymFit" },
      { property: "og:description", content: "Browse and book classes from the weekly schedule." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CustomerClassesPage,
});

function CustomerClassesPage() {
  return <ScaffoldPage title="Classes" description="Browse and book classes from the weekly schedule." />;
}

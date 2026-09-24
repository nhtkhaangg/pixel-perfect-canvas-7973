import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldPage } from "@/components/shared/scaffold-page";

export const Route = createFileRoute("/customer/membership")({
  head: () => ({
    meta: [
      { title: "Membership — Customer — GymFit" },
      { name: "description", content: "Your plan, invoices and renewal details." },
      { property: "og:title", content: "Membership — Customer — GymFit" },
      { property: "og:description", content: "Your plan, invoices and renewal details." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CustomerMembershipPage,
});

function CustomerMembershipPage() {
  return <ScaffoldPage title="Membership" description="Your plan, invoices and renewal details." />;
}

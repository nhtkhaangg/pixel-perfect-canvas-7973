import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { CheckoutFlow } from "@/components/customer/checkout";
import { ExpiringPackageBanner } from "@/components/customer/alerts";

export const Route = createFileRoute("/customer/purchase")({
  head: () => seo("Buy a membership", "Choose a GymFit membership and pay with VNPAY, PayOS or cash."),
  component: () => (
    <>
      <ExpiringPackageBanner />
      <CheckoutFlow type="MEMBERSHIP" title="Buy a membership" description="Pick a plan, choose how to pay and you're in." />
    </>
  ),
});

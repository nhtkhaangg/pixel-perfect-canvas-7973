import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/status-badge";

export const Route = createFileRoute("/guest/pricing")({
  head: () => ({
    meta: [
      { title: "Memberships & Pricing — GymFit" },
      {
        name: "description",
        content: "Compare GymFit membership plans: flexible monthly, annual and all-access tiers.",
      },
      { property: "og:title", content: "Memberships & Pricing — GymFit" },
      {
        property: "og:description",
        content: "Flexible monthly, annual and all-access GymFit membership plans.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GuestPricing,
});

const plans = [
  {
    name: "Flex",
    price: "$29",
    cadence: "/ month",
    features: ["Gym floor access", "2 classes per month", "Cancel anytime"],
    featured: false,
  },
  {
    name: "Standard",
    price: "$49",
    cadence: "/ month",
    features: ["Unlimited classes", "Guest pass each month", "Progress tracking"],
    featured: true,
  },
  {
    name: "All-access",
    price: "$89",
    cadence: "/ month",
    features: ["All branches", "4 PT sessions", "Recovery suite"],
    featured: false,
  },
];

function GuestPricing() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-14 lg:px-6">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">Memberships</h1>
        <p className="mt-2 text-muted-foreground">
          No joining fee. Switch or pause your plan whenever you need to.
        </p>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`flex flex-col rounded-lg border bg-card p-6 ${
              plan.featured ? "border-primary" : "border-border"
            }`}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-card-foreground">{plan.name}</h2>
              {plan.featured ? <StatusBadge status="active" label="popular" /> : null}
            </div>
            <p className="mt-4 flex items-baseline gap-1">
              <span className="text-3xl font-semibold tracking-tight">{plan.price}</span>
              <span className="text-sm text-muted-foreground">{plan.cadence}</span>
            </p>
            <ul className="mt-5 flex-1 space-y-2 text-sm text-muted-foreground">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="size-4 text-primary" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              className="mt-6"
              variant={plan.featured ? "default" : "outline"}
              onClick={() => toast.success(`${plan.name} plan selected`)}
            >
              Choose {plan.name}
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}

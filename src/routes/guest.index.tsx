import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, Dumbbell, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/guest/")({
  head: () => ({
    meta: [
      { title: "GymFit — Train with purpose" },
      {
        name: "description",
        content:
          "GymFit is a modern gym with coached classes, personal training and flexible memberships.",
      },
      { property: "og:title", content: "GymFit — Train with purpose" },
      {
        property: "og:description",
        content: "Coached classes, personal training and flexible memberships at GymFit.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GuestHome,
});

const features = [
  {
    icon: Dumbbell,
    title: "Fully equipped floors",
    body: "Strength, conditioning and recovery zones open from 5am to 11pm every day.",
  },
  {
    icon: CalendarDays,
    title: "60+ classes a week",
    body: "Book a spot in seconds and manage your schedule from your member dashboard.",
  },
  {
    icon: Users,
    title: "Certified trainers",
    body: "Work one-on-one with a coach who tracks your programme and progress.",
  },
];

function GuestHome() {
  return (
    <>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 lg:px-6 lg:py-24">
          <p className="text-xs font-semibold tracking-wider text-primary uppercase">
            Now open — downtown branch
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-surface-foreground lg:text-5xl">
            Train with purpose, track every rep
          </h1>
          <p className="mt-4 max-w-xl text-surface-foreground/70">
            Memberships, classes and coaching in one place. Join today and manage everything from
            your member dashboard.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/guest/pricing">See memberships</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link to="/guest/classes">Browse classes</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-14 lg:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-lg border border-border bg-card p-6">
              <span className="flex size-9 items-center justify-center rounded-md bg-accent text-accent-foreground">
                <feature.icon className="size-4" />
              </span>
              <h2 className="mt-4 text-base font-semibold text-card-foreground">{feature.title}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">{feature.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

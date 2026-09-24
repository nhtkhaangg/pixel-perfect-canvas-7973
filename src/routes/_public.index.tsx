import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, MapPin, Phone } from "lucide-react";
import { articles, gymInfo, packages, reviews, trainers } from "@/lib/mock/public";
import { seo } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/shared/stat-card";
import {
  ArticleCard,
  MoreLink,
  PackageCard,
  ReviewCard,
  SectionHeading,
  Stars,
  TrainerCard,
} from "@/components/public/cards";

export const Route = createFileRoute("/_public/")({
  head: () =>
    seo(
      "Train with purpose",
      "GymFit: four San Francisco gyms with certified trainers, 64 weekly classes, flexible memberships and personal training packages.",
    ),
  component: HomePage,
});

function HomePage() {
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  return (
    <>
      <section className="bg-surface">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 lg:grid-cols-[1.3fr_1fr] lg:px-6 lg:py-24">
          <div>
            <p className="text-xs font-semibold tracking-wider text-primary uppercase">
              Riverside anniversary week · 1–7 Oct
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-surface-foreground lg:text-6xl">
              Train with purpose.
              <br />
              <span className="text-primary">Track every rep.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-surface-foreground/70">
              Four fully equipped gyms, 38 certified coaches and a member app that keeps your plan,
              bookings and progress in one place.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link to="/packages">Explore packages</Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link to="/tools/fitness-calculator">Calculate your TDEE</Link>
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-3 text-sm text-surface-foreground/70">
              <Stars rating={avg} />
              <span>
                {avg.toFixed(1)} from {reviews.length * 180}+ member reviews
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 self-center">
            {gymInfo.stats.map((s) => (
              <div key={s.label} className="rounded-lg border border-surface-foreground/10 p-5">
                <p className="text-3xl font-semibold text-primary">{s.value}</p>
                <p className="mt-1 text-sm text-surface-foreground/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 lg:px-6">
        <SectionHeading
          eyebrow="Packages"
          title="Find the plan that fits your week"
          description="No joining fee. Freeze or upgrade any time from your member area."
          action={<MoreLink to="/packages">All packages</MoreLink>}
        />
        <div className="grid gap-4 md:grid-cols-3">
          {packages.filter((p) => p.featured || p.id === "flex-monthly").map((p) => (
            <PackageCard key={p.id} pkg={p} />
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 lg:px-6">
          <SectionHeading
            eyebrow="Coaches"
            title="Meet our top-rated trainers"
            action={<MoreLink to="/trainers">All trainers</MoreLink>}
          />
          <div className="grid gap-4 md:grid-cols-3">
            {[...trainers].sort((a, b) => b.ratingAvg - a.ratingAvg).slice(0, 3).map((t) => (
              <TrainerCard key={t.id} trainer={t} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 lg:px-6">
        <SectionHeading
          eyebrow="Journal"
          title="Latest from the blog"
          action={<MoreLink to="/articles">All articles</MoreLink>}
        />
        <div className="grid gap-4 md:grid-cols-3">
          {articles.slice(0, 3).map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-16 lg:grid-cols-[1fr_1.4fr] lg:px-6">
          <div>
            <SectionHeading
              eyebrow="Visit us"
              title="Four branches across the city"
              description="Every branch has free weights, a cardio deck, a group studio and recovery facilities."
            />
            <div className="space-y-3 text-sm">
              <p className="flex items-center gap-2"><Phone className="size-4 text-primary" /> {gymInfo.phone}</p>
              <p className="flex items-center gap-2"><Clock className="size-4 text-primary" /> Open from 5:00 every weekday</p>
            </div>
            <Button className="mt-6" variant="outline" asChild>
              <Link to="/gym-info">Full gym info</Link>
            </Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {gymInfo.branches.map((b) => (
              <div key={b.name} className="rounded-lg border border-border bg-card p-5">
                <p className="font-semibold">{b.name}</p>
                <p className="mt-2 flex gap-2 text-sm text-muted-foreground">
                  <MapPin className="mt-0.5 size-4 shrink-0" /> {b.address}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">{b.hours}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 lg:px-6">
        <SectionHeading
          eyebrow="Reviews"
          title="What members say"
          action={<MoreLink to="/reviews">All reviews</MoreLink>}
        />
        <div className="grid gap-4 md:grid-cols-3">
          {reviews.filter((r) => r.rating === 5).slice(0, 3).map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
        <div className="mt-12 grid gap-4 rounded-lg bg-surface p-8 text-surface-foreground md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-2xl font-semibold">Your first day is on us.</p>
            <p className="mt-1 text-surface-foreground/70">Create an account and grab a free day pass for any branch.</p>
          </div>
          <Button size="lg" asChild>
            <Link to="/register">Create free account</Link>
          </Button>
        </div>
      </section>
      <div className="hidden">
        <StatCard label="" value="" />
      </div>
    </>
  );
}

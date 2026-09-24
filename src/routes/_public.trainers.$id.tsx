import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Award, MapPin, Star, Timer } from "lucide-react";
import { packages, reviews, trainers } from "@/lib/mock/public";
import { seo } from "@/lib/seo";
import { StatCard } from "@/components/shared/stat-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Avatar, PackageCard, ReviewCard } from "@/components/public/cards";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_public/trainers/$id")({
  loader: ({ params }) => {
    const trainer = trainers.find((t) => t.id === params.id);
    if (!trainer) throw notFound();
    return { trainer };
  },
  head: ({ loaderData }) =>
    loaderData
      ? seo(`${loaderData.trainer.name} — ${loaderData.trainer.specialization}`, loaderData.trainer.bio)
      : { meta: [{ title: "Trainer not found — GymFit" }, { name: "robots", content: "noindex" }] },
  notFoundComponent: TrainerNotFound,
  component: TrainerProfile,
});

function TrainerNotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20">
      <EmptyState title="Trainer not found" action={<Button asChild><Link to="/trainers">All trainers</Link></Button>} />
    </div>
  );
}

function TrainerProfile() {
  const { trainer } = Route.useLoaderData();
  const trainerReviews = reviews.filter((r) => r.branch === trainer.branch).slice(0, 2);
  const pt = packages.filter((p) => p.type === "PT");

  return (
    <>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 lg:px-6">
          <Link to="/trainers" className="inline-flex items-center gap-1.5 text-sm text-surface-foreground/60 hover:text-surface-foreground">
            <ArrowLeft className="size-4" /> All trainers
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-6">
            <Avatar name={trainer.name} size="xl" />
            <div className="flex-1">
              <h1 className="text-3xl font-semibold tracking-tight text-surface-foreground">{trainer.name}</h1>
              <p className="mt-1 text-primary">{trainer.specialization}</p>
              <p className="mt-2 flex items-center gap-1.5 text-sm text-surface-foreground/60">
                <MapPin className="size-4" /> {trainer.branch} branch
              </p>
            </div>
            <Button size="lg" asChild>
              <Link to="/register">Book a session</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1fr_320px] lg:px-6">
        <div>
          <div className="grid gap-3 sm:grid-cols-3">
            <StatCard label="Rating" value={trainer.ratingAvg.toFixed(2)} hint={`${trainer.reviewCount} reviews`} icon={Star} />
            <StatCard label="Experience" value={`${trainer.experienceYears} yrs`} hint="Coaching professionally" icon={Timer} />
            <StatCard label="Certificates" value={trainer.certificates.length} hint="Verified by GymFit" icon={Award} />
          </div>
          <h2 className="mt-10 text-lg font-semibold">About</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">{trainer.bio}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {trainer.tags.map((t) => <Badge key={t} variant="secondary">{t}</Badge>)}
          </div>
          <h2 className="mt-10 text-lg font-semibold">Recent reviews</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {trainerReviews.map((r) => <ReviewCard key={r.id} review={r} />)}
          </div>
        </div>
        <aside className="h-fit rounded-lg border border-border bg-card p-6">
          <p className="font-semibold">Certificates</p>
          <ul className="mt-4 space-y-3">
            {trainer.certificates.map((c) => (
              <li key={c} className="flex items-center gap-3 text-sm">
                <span className="flex size-8 items-center justify-center rounded-md bg-accent text-accent-foreground">
                  <Award className="size-4" />
                </span>
                {c}
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="border-t border-border bg-muted/40">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 lg:px-6">
          <h2 className="mb-6 text-xl font-semibold">Train with {trainer.name.split(" ")[0]}</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {pt.map((p) => <PackageCard key={p.id} pkg={p} />)}
          </div>
        </div>
      </section>
    </>
  );
}

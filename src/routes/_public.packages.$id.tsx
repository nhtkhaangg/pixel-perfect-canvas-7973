import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Check, DollarSign, Dumbbell } from "lucide-react";
import { toast } from "sonner";
import { formatCurrency, gymInfo, packages } from "@/lib/mock/public";
import { seo } from "@/lib/seo";
import { StatCard } from "@/components/shared/stat-card";
import { PackageCard } from "@/components/public/cards";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";

export const Route = createFileRoute("/_public/packages/$id")({
  loader: ({ params }) => {
    const pkg = packages.find((p) => p.id === params.id);
    if (!pkg) throw notFound();
    return { pkg };
  },
  head: ({ loaderData }) =>
    loaderData
      ? seo(loaderData.pkg.name, loaderData.pkg.description)
      : { meta: [{ title: "Package not found — GymFit" }, { name: "robots", content: "noindex" }] },
  notFoundComponent: PackageNotFound,
  component: PackageDetail,
});

function PackageNotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20">
      <EmptyState
        title="Package not found"
        description="This package may have been retired."
        action={<Button asChild><Link to="/packages">Browse packages</Link></Button>}
      />
    </div>
  );
}

function PackageDetail() {
  const { pkg } = Route.useLoaderData();
  const perSession = pkg.totalSessions ? pkg.price / pkg.totalSessions : null;
  const related = packages.filter((p) => p.type === pkg.type && p.id !== pkg.id).slice(0, 3);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 lg:px-6">
      <Link to="/packages" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> All packages
      </Link>
      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div>
          <Badge>{pkg.type}</Badge>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight lg:text-4xl">{pkg.name}</h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{pkg.description}</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <StatCard label="Price" value={formatCurrency(pkg.price)} icon={DollarSign} hint={perSession ? `${formatCurrency(perSession)} per session` : `${formatCurrency(pkg.price / (pkg.durationDays / 30))} / month`} />
            <StatCard label="Duration" value={`${pkg.durationDays} days`} icon={CalendarDays} hint={`≈ ${Math.round(pkg.durationDays / 7)} weeks`} />
            <StatCard label="Sessions" value={pkg.totalSessions ?? "Unlimited"} icon={Dumbbell} hint={pkg.totalSessions ? "1-on-1 with your coach" : "Gym & class visits"} />
          </div>

          <h2 className="mt-10 text-lg font-semibold">What's included</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {pkg.perks.map((p) => (
              <li key={p} className="flex gap-2 rounded-md border border-border bg-card p-3 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" /> {p}
              </li>
            ))}
          </ul>

          <h2 className="mt-10 text-lg font-semibold">Good to know</h2>
          <div className="mt-4 divide-y divide-border rounded-lg border border-border bg-card">
            {gymInfo.faqs.slice(1).map((f) => (
              <div key={f.q} className="p-4">
                <p className="text-sm font-medium">{f.q}</p>
                <p className="mt-1 text-sm text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="h-fit rounded-lg border border-border bg-card p-6 lg:sticky lg:top-24">
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="text-4xl font-semibold tracking-tight">{formatCurrency(pkg.price)}</p>
          <p className="mt-1 text-sm text-muted-foreground">Valid {pkg.durationDays} days from activation</p>
          <Button className="mt-6 w-full" size="lg" onClick={() => toast.success("Create an account to purchase", { description: pkg.name })} asChild>
            <Link to="/register">Get this package</Link>
          </Button>
          <Button className="mt-2 w-full" variant="outline" asChild>
            <Link to="/gym-info">Visit a branch first</Link>
          </Button>
          <p className="mt-4 text-xs text-muted-foreground">No joining fee · Cancel before renewal any time</p>
        </aside>
      </div>

      {related.length ? (
        <div className="mt-16">
          <h2 className="mb-6 text-xl font-semibold">Similar packages</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {related.map((p) => <PackageCard key={p.id} pkg={p} />)}
          </div>
        </div>
      ) : null}
    </section>
  );
}

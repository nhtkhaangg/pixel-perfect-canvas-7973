import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { packages, type PackageType } from "@/lib/mock/public";
import { seo } from "@/lib/seo";
import { PackageCard, PageHero } from "@/components/public/cards";
import { EmptyState } from "@/components/shared/empty-state";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/_public/packages/")({
  head: () =>
    seo("Packages & pricing", "Compare GymFit memberships and personal training packages — prices, duration and included sessions."),
  component: PackagesPage,
});

type Filter = "ALL" | PackageType;

function PackagesPage() {
  const [filter, setFilter] = useState<Filter>("ALL");
  const [sort, setSort] = useState("price-asc");
  const list = useMemo(() => {
    const l = packages.filter((p) => filter === "ALL" || p.type === filter);
    return [...l].sort((a, b) =>
      sort === "price-asc" ? a.price - b.price : sort === "price-desc" ? b.price - a.price : a.durationDays - b.durationDays,
    );
  }, [filter, sort]);

  return (
    <>
      <PageHero
        eyebrow="Packages"
        title="Memberships and personal training"
        description="Pick a membership for gym and class access, or a PT package for one-on-one coaching. No joining fee on any plan."
      />
      <section className="mx-auto w-full max-w-6xl px-4 py-10 lg:px-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Tabs value={filter} onValueChange={(v) => setFilter(v as Filter)}>
            <TabsList>
              <TabsTrigger value="ALL">All ({packages.length})</TabsTrigger>
              <TabsTrigger value="MEMBERSHIP">Membership</TabsTrigger>
              <TabsTrigger value="PT">Personal training</TabsTrigger>
            </TabsList>
          </Tabs>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="price-asc">Price: low to high</SelectItem>
              <SelectItem value="price-desc">Price: high to low</SelectItem>
              <SelectItem value="duration">Shortest duration</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {list.length ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => <PackageCard key={p.id} pkg={p} />)}
          </div>
        ) : (
          <EmptyState title="No packages" description="Try another filter." />
        )}
      </section>
    </>
  );
}

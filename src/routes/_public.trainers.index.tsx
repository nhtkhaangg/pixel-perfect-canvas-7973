import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { trainers } from "@/lib/mock/public";
import { seo } from "@/lib/seo";
import { PageHero, TrainerCard } from "@/components/public/cards";
import { EmptyState } from "@/components/shared/empty-state";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/_public/trainers/")({
  head: () => seo("Our trainers", "Browse GymFit's certified personal trainers by specialization, experience and member rating."),
  component: TrainersPage,
});

function TrainersPage() {
  const [q, setQ] = useState("");
  const [branch, setBranch] = useState("all");
  const [sort, setSort] = useState("rating");
  const branches = [...new Set(trainers.map((t) => t.branch))];

  const list = useMemo(() => {
    const term = q.toLowerCase();
    return trainers
      .filter((t) => branch === "all" || t.branch === branch)
      .filter((t) => !term || [t.name, t.specialization, ...t.tags].join(" ").toLowerCase().includes(term))
      .sort((a, b) => (sort === "rating" ? b.ratingAvg - a.ratingAvg : b.experienceYears - a.experienceYears));
  }, [q, branch, sort]);

  return (
    <>
      <PageHero
        eyebrow="Trainers"
        title="Coaches who know their craft"
        description="Every GymFit trainer is certified, insured and reviewed by members. Find the right fit for your goal."
      />
      <section className="mx-auto w-full max-w-6xl px-4 py-10 lg:px-6">
        <div className="mb-6 flex flex-wrap gap-3">
          <div className="relative min-w-60 flex-1">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search name, specialty or goal…" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <Select value={branch} onValueChange={setBranch}>
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All branches</SelectItem>
              {branches.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Highest rated</SelectItem>
              <SelectItem value="experience">Most experienced</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {list.length ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {list.map((t) => <TrainerCard key={t.id} trainer={t} />)}
          </div>
        ) : (
          <EmptyState title="No trainers match" description="Try a different search or branch." />
        )}
      </section>
    </>
  );
}

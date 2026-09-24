import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { seo } from "@/lib/seo";
import { reviewStore } from "@/lib/trainer-stores";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { Avatar, Stars } from "@/components/public/cards";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/trainer/reviews/")({
  head: () => seo("My reviews", "Client reviews of your coaching and your replies."),
  component: Reviews,
});

function Reviews() {
  const list = reviewStore.use();
  const [tab, setTab] = useState("all");
  const shown = list.filter((r) => tab === "all" || (tab === "unanswered" ? !r.reply : !!r.reply));
  const avg = list.reduce((s, r) => s + r.rating, 0) / list.length;
  return (
    <>
      <PageHeader title="My reviews" description="Replying publicly builds trust with future clients." />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Average rating" value={avg.toFixed(2)} />
        <StatCard label="Reviews" value={list.length} />
        <StatCard label="Awaiting reply" value={list.filter((r) => !r.reply).length} />
      </div>
      <Tabs value={tab} onValueChange={setTab}><TabsList><TabsTrigger value="all">All</TabsTrigger><TabsTrigger value="unanswered">Unanswered</TabsTrigger><TabsTrigger value="replied">Replied</TabsTrigger></TabsList></Tabs>
      <div className="grid gap-4 md:grid-cols-2">
        {shown.map((r) => (
          <Link key={r.id} to="/trainer/reviews/$id" params={{ id: r.id }} className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary">
            <div className="flex items-center justify-between"><Stars rating={r.rating} /><StatusBadge status={r.reply ? "completed" : "pending"} label={r.reply ? "Replied" : "Needs reply"} /></div>
            <p className="mt-3 font-semibold">{r.title}</p>
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{r.body}</p>
            <div className="mt-4 flex items-center gap-2 text-sm"><Avatar name={r.client} /><div><p className="font-medium">{r.client}</p><p className="text-xs text-muted-foreground">{r.date}</p></div></div>
          </Link>
        ))}
      </div>
    </>
  );
}

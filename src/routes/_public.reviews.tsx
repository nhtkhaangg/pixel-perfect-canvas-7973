import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { reviews } from "@/lib/mock/public";
import { seo } from "@/lib/seo";
import { PageHero, ReviewCard, Stars } from "@/components/public/cards";
import { EmptyState } from "@/components/shared/empty-state";
import { FormModal } from "@/components/shared/form-modal";
import { FormField } from "@/components/shared/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/_public/reviews")({
  head: () => seo("Member reviews", "Read honest reviews from GymFit members across our Downtown, Riverside, Northgate and Eastside branches."),
  component: ReviewsPage,
});

function ReviewsPage() {
  const [stars, setStars] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  const list = reviews.filter((r) => stars === null || r.rating === stars);

  return (
    <>
      <PageHero eyebrow="Reviews" title="Rated 4.8 by our members" description="Unfiltered feedback from people who train with us every week." />
      <section className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[280px_1fr] lg:px-6">
        <aside className="h-fit rounded-lg border border-border bg-card p-6">
          <p className="text-5xl font-semibold tracking-tight">{avg.toFixed(1)}</p>
          <Stars rating={avg} className="mt-2" />
          <p className="mt-1 text-sm text-muted-foreground">{reviews.length} reviews shown</p>
          <div className="mt-6 space-y-2">
            {[5, 4, 3, 2, 1].map((n) => {
              const count = reviews.filter((r) => r.rating === n).length;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => setStars(stars === n ? null : n)}
                  className={`flex w-full items-center gap-3 rounded-md px-2 py-1 text-sm hover:bg-muted ${stars === n ? "bg-muted" : ""}`}
                >
                  <span className="w-3">{n}</span>
                  <Progress value={(count / reviews.length) * 100} className="h-2 flex-1" />
                  <span className="w-4 text-right text-muted-foreground">{count}</span>
                </button>
              );
            })}
          </div>
          <Button className="mt-6 w-full" onClick={() => setOpen(true)}>Write a review</Button>
        </aside>
        <div>
          {list.length ? (
            <div className="grid gap-4 md:grid-cols-2">
              {list.map((r) => <ReviewCard key={r.id} review={r} />)}
            </div>
          ) : (
            <EmptyState title={`No ${stars}-star reviews yet`} />
          )}
        </div>
      </section>
      <ReviewModal open={open} onOpenChange={setOpen} />
    </>
  );
}

function ReviewModal({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  return (
    <FormModal
      open={open}
      onOpenChange={onOpenChange}
      title="Write a review"
      description="Only verified members can publish reviews. Log in after submitting to confirm."
      onSubmit={() => {
        toast.success("Thanks! Your review is pending moderation.");
        onOpenChange(false);
      }}
    >
      <FormField label="Title" required>{(p) => <Input {...p} placeholder="Summarise your experience" />}</FormField>
      <FormField label="Review" required>{(p) => <Textarea {...p} rows={4} placeholder="What did you like?" />}</FormField>
    </FormModal>
  );
}

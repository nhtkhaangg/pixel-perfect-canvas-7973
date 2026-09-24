import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Clock, Mail, MapPin, Phone, Ruler } from "lucide-react";
import { gymInfo } from "@/lib/mock/public";
import { seo } from "@/lib/seo";
import { PageHero } from "@/components/public/cards";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_public/gym-info")({
  head: () => seo("Gym information", "GymFit branch addresses, opening hours, amenities, contact details and FAQs."),
  component: GymInfoPage,
});

function GymInfoPage() {
  return (
    <>
      <PageHero eyebrow="Gym info" title="Everything you need before your first visit" description="Branches, hours, facilities and answers to common questions." />
      <section className="mx-auto w-full max-w-6xl px-4 py-10 lg:px-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {gymInfo.stats.map((s) => (
            <div key={s.label} className="rounded-lg border border-border bg-card p-5">
              <p className="text-3xl font-semibold text-primary">{s.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-12 text-xl font-semibold">Branches</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {gymInfo.branches.map((b) => (
            <div key={b.name} className="rounded-lg border border-border bg-card p-6">
              <p className="text-lg font-semibold">{b.name}</p>
              <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                <p className="flex gap-2"><MapPin className="mt-0.5 size-4 shrink-0 text-primary" /> {b.address}</p>
                <p className="flex gap-2"><Clock className="mt-0.5 size-4 shrink-0 text-primary" /> {b.hours}</p>
                <p className="flex gap-2"><Ruler className="mt-0.5 size-4 shrink-0 text-primary" /> {b.sizeSqm.toLocaleString()} m² training space</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold">Amenities</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {gymInfo.amenities.map((a) => (
                <li key={a} className="flex gap-2 rounded-md border border-border bg-card p-3 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" /> {a}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold">FAQ</h2>
            <Accordion type="single" collapsible className="mt-4 rounded-lg border border-border bg-card px-4">
              {gymInfo.faqs.map((f) => (
                <AccordionItem key={f.q} value={f.q}>
                  <AccordionTrigger>{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        <div className="mt-12 grid gap-6 rounded-lg bg-surface p-8 text-surface-foreground md:grid-cols-[1fr_auto] md:items-center">
          <div className="space-y-2">
            <p className="text-xl font-semibold">Questions? Talk to us.</p>
            <p className="flex items-center gap-2 text-sm text-surface-foreground/70"><Phone className="size-4 text-primary" /> {gymInfo.phone}</p>
            <p className="flex items-center gap-2 text-sm text-surface-foreground/70"><Mail className="size-4 text-primary" /> {gymInfo.email}</p>
          </div>
          <Button size="lg" asChild><Link to="/register">Get a free day pass</Link></Button>
        </div>
      </section>
    </>
  );
}

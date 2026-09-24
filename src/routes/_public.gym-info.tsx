import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Clock, Mail, MapPin, Phone, Ruler } from "lucide-react";
import { gymInfo } from "@/lib/mock/public";
import { seo } from "@/lib/seo";
import { gymImages } from "@/lib/images";
import { PageHero } from "@/components/public/cards";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_public/gym-info")({
  head: () => seo("Thông tin phòng gym", "Địa chỉ, giờ mở cửa, tiện ích và câu hỏi thường gặp tại GymFit."),
  component: GymInfoPage,
});

function GymInfoPage() {
  return (
    <>
      <PageHero eyebrow="Thông tin phòng gym" title="Mọi điều bạn cần biết trước buổi tập đầu tiên" description="Địa chỉ, giờ mở cửa, khu vực chức năng và câu trả lời cho các câu hỏi thường gặp." />
      <section className="mx-auto w-full max-w-6xl px-4 py-10 lg:px-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {gymInfo.stats.map((s) => (
            <div key={s.label} className="rounded-lg border border-border bg-card p-5">
              <p className="text-3xl font-semibold text-primary">{s.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-stretch">
          <img
            src={gymImages.weights}
            alt="Không gian tập luyện GymFit"
            loading="lazy"
            width={720}
            height={480}
            className="h-full min-h-56 w-full rounded-lg object-cover"
          />
          <div className="rounded-lg border border-border bg-card p-6">
            <p className="text-lg font-semibold">{gymInfo.name}</p>
            <div className="mt-3 space-y-2 text-sm text-muted-foreground">
              <p className="flex gap-2"><MapPin className="mt-0.5 size-4 shrink-0 text-primary" /> {gymInfo.address}</p>
              <p className="flex gap-2"><Clock className="mt-0.5 size-4 shrink-0 text-primary" /> {gymInfo.hours}</p>
              <p className="flex gap-2"><Ruler className="mt-0.5 size-4 shrink-0 text-primary" /> {gymInfo.sizeSqm.toLocaleString("vi-VN")} m² diện tích tập luyện</p>
            </div>
            <div className="mt-6 flex h-40 items-center justify-center rounded-md border border-dashed border-border bg-muted text-sm text-muted-foreground">
              Bản đồ vị trí phòng gym
            </div>
          </div>
        </div>

        <h2 className="mt-12 text-xl font-semibold">Khu vực trong phòng gym</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {gymInfo.zones.map((z) => (
            <div key={z.name} className="rounded-lg border border-border bg-card p-6">
              <p className="text-lg font-semibold">{z.name}</p>
              <p className="mt-2 text-sm text-muted-foreground">{z.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold">Tiện ích</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {gymInfo.amenities.map((a) => (
                <li key={a} className="flex gap-2 rounded-md border border-border bg-card p-3 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" /> {a}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Câu hỏi thường gặp</h2>
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
            <p className="text-xl font-semibold">Còn thắc mắc? Liên hệ với chúng tôi.</p>
            <p className="flex items-center gap-2 text-sm text-surface-foreground/70"><Phone className="size-4 text-primary" /> {gymInfo.phone}</p>
            <p className="flex items-center gap-2 text-sm text-surface-foreground/70"><Mail className="size-4 text-primary" /> {gymInfo.email}</p>
          </div>
          <Button size="lg" asChild><Link to="/register">Nhận ngày trải nghiệm miễn phí</Link></Button>
        </div>
      </section>
    </>
  );
}

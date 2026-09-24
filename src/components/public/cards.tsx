import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Clock, Star } from "lucide-react";
import type { Article, GymPackage, Review, Trainer } from "@/lib/mock/public";
import { articleCategoryLabels, formatCurrency, formatDate, initials } from "@/lib/mock/public";
import { imageFor } from "@/lib/images";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} aria-label={`${rating} trên 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={cn("size-3.5", i <= Math.round(rating) ? "fill-primary text-primary" : "text-muted-foreground/40")}
        />
      ))}
    </span>
  );
}

export function Avatar({ name, size = "md" }: { name: string; size?: "md" | "lg" | "xl" }) {
  const s = { md: "size-10 text-sm", lg: "size-14 text-base", xl: "size-24 text-2xl" }[size];
  return (
    <span className={cn("flex shrink-0 items-center justify-center rounded-full bg-accent font-semibold text-accent-foreground", s)}>
      {initials(name)}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        {eyebrow ? <p className="text-xs font-semibold tracking-wider text-primary uppercase">{eyebrow}</p> : null}
        <h2 className="mt-2 text-2xl font-semibold tracking-tight lg:text-3xl">{title}</h2>
        {description ? <p className="mt-2 text-muted-foreground">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function PageHero({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 lg:px-6 lg:py-16">
        <p className="text-xs font-semibold tracking-wider text-primary uppercase">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-surface-foreground lg:text-4xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-surface-foreground/70">{description}</p>
      </div>
    </section>
  );
}

export function PackageCard({ pkg }: { pkg: GymPackage }) {
  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-lg border bg-card transition-shadow hover:shadow-md",
        pkg.featured ? "border-primary ring-1 ring-primary" : "border-border",
      )}
    >
      <img
        src={imageFor(pkg.id)}
        alt={pkg.name}
        loading="lazy"
        width={480}
        height={160}
        className="h-32 w-full object-cover"
      />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-2">
          <Badge variant={pkg.type === "PT" ? "default" : "secondary"}>{pkg.type === "PT" ? "Huấn luyện cá nhân" : "Hội viên"}</Badge>
          {pkg.featured ? <span className="text-xs font-semibold text-primary">Phổ biến nhất</span> : null}
        </div>
        <h3 className="mt-4 text-lg font-semibold">{pkg.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{pkg.description}</p>
        <p className="mt-5 text-3xl font-semibold tracking-tight">
          {formatCurrency(pkg.price)}
          <span className="ml-1 text-sm font-normal text-muted-foreground">/ {pkg.durationDays} ngày</span>
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          {pkg.totalSessions ? `${pkg.totalSessions} buổi huấn luyện đi kèm` : "Ra vào không giới hạn"}
        </p>
        <ul className="mt-5 flex-1 space-y-2 text-sm">
          {pkg.perks.slice(0, 4).map((p) => (
            <li key={p} className="flex gap-2">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" />
              {p}
            </li>
          ))}
        </ul>
        <Button className="mt-6" variant={pkg.featured ? "default" : "outline"} asChild>
          <Link to="/packages/$id" params={{ id: pkg.id }}>
            Xem chi tiết
          </Link>
        </Button>
      </div>
    </div>
  );
}

export function TrainerCard({ trainer }: { trainer: Trainer }) {
  return (
    <Link
      to="/trainers/$id"
      params={{ id: trainer.id }}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-primary hover:shadow-md"
    >
      <img
        src={imageFor(trainer.id)}
        alt={trainer.name}
        loading="lazy"
        width={480}
        height={140}
        className="h-28 w-full object-cover"
      />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-4">
          <Avatar name={trainer.name} size="lg" />
          <div className="min-w-0">
            <p className="font-semibold">{trainer.name}</p>
            <p className="truncate text-sm text-muted-foreground">{trainer.specialization}</p>
          </div>
        </div>
        <p className="mt-4 line-clamp-3 flex-1 text-sm text-muted-foreground">{trainer.bio}</p>
        <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-sm">
          <span className="flex items-center gap-1.5">
            <Star className="size-4 fill-primary text-primary" />
            <span className="font-medium">{trainer.ratingAvg.toFixed(2)}</span>
            <span className="text-muted-foreground">({trainer.reviewCount})</span>
          </span>
          <span className="text-muted-foreground">{trainer.experienceYears} năm kinh nghiệm</span>
        </div>
      </div>
    </Link>
  );
}

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      to="/articles/$id"
      params={{ id: article.id }}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-primary hover:shadow-md"
    >
      <img
        src={imageFor(article.id)}
        alt={article.title}
        loading="lazy"
        width={480}
        height={160}
        className="h-32 w-full object-cover"
      />
      <div className="flex flex-1 flex-col p-5">
        <Badge variant="secondary" className="w-fit">{articleCategoryLabels[article.category]}</Badge>
        <h3 className="mt-3 font-semibold leading-snug group-hover:text-primary">{article.title}</h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted-foreground">{article.excerpt}</p>
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {article.author} · {formatDate(article.date)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="size-3" />
            {article.readMinutes} phút đọc
          </span>
        </div>
      </div>
    </Link>
  );
}

export function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex flex-col rounded-lg border border-border bg-card p-6">
      <Stars rating={review.rating} />
      <p className="mt-3 font-semibold">{review.title}</p>
      <p className="mt-2 flex-1 text-sm text-muted-foreground">"{review.body}"</p>
      <div className="mt-5 flex items-center gap-3">
        <Avatar name={review.author} />
        <div className="text-sm">
          <p className="font-medium">{review.author}</p>
          <p className="text-xs text-muted-foreground">
            {review.branch} · hội viên từ {review.memberSince}
          </p>
        </div>
      </div>
    </div>
  );
}

export function MoreLink({ to, children }: { to: "/packages" | "/trainers" | "/articles" | "/reviews"; children: React.ReactNode }) {
  return (
    <Button variant="ghost" asChild>
      <Link to={to}>
        {children} <ArrowRight className="size-4" />
      </Link>
    </Button>
  );
}

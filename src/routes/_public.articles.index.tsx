import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { articles, type Article } from "@/lib/mock/public";
import { seo } from "@/lib/seo";
import { ArticleCard, PageHero } from "@/components/public/cards";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_public/articles/")({
  head: () => seo("Articles", "Training, nutrition and recovery advice from GymFit coaches, plus community news."),
  component: ArticlesPage,
});

const categories: ("All" | Article["category"])[] = ["All", "Training", "Nutrition", "Recovery", "Community"];

function ArticlesPage() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const list = articles.filter((a) => cat === "All" || a.category === cat);
  return (
    <>
      <PageHero eyebrow="Journal" title="Advice from the gym floor" description="Practical, evidence-based articles written by our coaches." />
      <section className="mx-auto w-full max-w-6xl px-4 py-10 lg:px-6">
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((c) => (
            <Button key={c} size="sm" variant={c === cat ? "default" : "outline"} onClick={() => setCat(c)}>
              {c}
            </Button>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {list.map((a) => <ArticleCard key={a.id} article={a} />)}
        </div>
      </section>
    </>
  );
}

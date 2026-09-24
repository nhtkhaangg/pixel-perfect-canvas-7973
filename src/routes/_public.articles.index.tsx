import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { articles, articleCategoryLabels, type Article } from "@/lib/mock/public";
import { seo } from "@/lib/seo";
import { ArticleCard, PageHero } from "@/components/public/cards";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_public/articles/")({
  head: () => seo("Bài viết", "Kiến thức tập luyện, dinh dưỡng và phục hồi từ huấn luyện viên GymFit, cùng tin tức cộng đồng."),
  component: ArticlesPage,
});

const categories: ("All" | Article["category"])[] = ["All", "Training", "Nutrition", "Recovery", "Community"];

function ArticlesPage() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const list = articles.filter((a) => cat === "All" || a.category === cat);
  return (
    <>
      <PageHero eyebrow="Bài viết" title="Kiến thức từ sàn tập" description="Bài viết thực tế, dựa trên khoa học, được viết bởi huấn luyện viên của chúng tôi." />
      <section className="mx-auto w-full max-w-6xl px-4 py-10 lg:px-6">
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((c) => (
            <Button key={c} size="sm" variant={c === cat ? "default" : "outline"} onClick={() => setCat(c)}>
              {c === "All" ? "Tất cả" : articleCategoryLabels[c]}
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
